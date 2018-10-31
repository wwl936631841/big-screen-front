<template>
  <div>
    <complain-legend-panel></complain-legend-panel>
    <!-- <complain-date-select></complain-date-select> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import store from '../MapFrame/store';
import { getLayerDetailsInSubject,getViewData,getSubjectList} from '../api';
import {CreateHeatMapLayer,createLayer,ZoomToExtent} from '../MapFrame/gisUtils';
import { loadModules } from 'esri-loader';
import subjectConfig from '../subjectConfig';
import ComplainLegendPanel from '../patrolHeatmap/patrolLegendPanel';
import {GetComplainHeatMap} from './api';
import {Config,CheckCoordinateExtent,getNowFormatDate} from '../utils';
// import ComplainDateSelect from './complainDateSelect';

export default {
  name: 'complain-heatmap',
  meta: {
      // hasMap: true,
      showTool:false,
      // layerType:'complain',
      nvPermission: false
  },
  // components: {ComplainLegendPanel,ComplainDateSelect},
  components: {ComplainLegendPanel},
  data(){
    return{
        heatmapPts:[],
        heatMapLayer:null,
        startDate:null,
        endDate:null,
        //当前选择图层
        currentLayer:'投诉热力图',
    }
  },
  computed: {
      ...mapState(store.name, ['mapInstance']),
      ...mapState(store.name, ['subjectLayers'])
  },
  created(){
    // let self=this;

    // //注册事件：热力图渲染
    // this.$bus.$on('render-complain-heatmap',(selectedDates)=>{
    //   self.startDate=selectedDates[0];
    //   self.endDate=selectedDates[1];
    //   self.drawHeatmap(self.startDate,self.endDate);
    // });

    // //清空热力图
    // this.$bus.$on('clear-complain-heatmap',()=>{
    //   self.clearHeatmap();
    // });

    // //绑定当前选择图层
    // this.$bus.$on('change-current-layer',(layer)=>{
    //   self.currentLayer=layer;
    // });

  },
  mounted() {     
    let self=this;

    self.$bus.$emit('configMap', () => {
        //先清空mapstore中的专题数组及地图中的专题图层
        self.clearSujectLayers();	  

        // //置空时间控件
        // this.$bus.$emit('reset-complain-date');

        //初始化热力图
        self.intializeHeatMap();
    });
  },
  beforeDestroy(){

  },
  methods:{
    intializeHeatMap(){
      this.startDate=new Date().getFullYear()+'-01-01';
      this.endDate=getNowFormatDate(); 
      this.drawHeatmap(this.startDate,this.endDate);      
    },
    ...mapActions(store.name, [
          'setSubjectLayers','clearSujectLayers','addSubjectLayer'
    ]),
    drawHeatmap(startDate,endDate){
      let self=this;
      let paras={BEGIN_TIME:startDate,END_TIME:endDate};
      GetComplainHeatMap(paras).then(async ({data})=>{
        if(data.list.length>0){
          let validPts=data.list.filter(v=>{
            return v.LONGITUDE&&v.LATITUDE&&CheckCoordinateExtent(v.LONGITUDE,v.LATITUDE);
          });

          if(!validPts||validPts.length==0){
            return;
          }

          self.heatmapPts=validPts.map(v=>{
                return{LONGITUDE:v.LONGITUDE,LATITUDE:v.LATITUDE};
          });

          if(self.heatMapLayer){
              self.heatMapLayer.clear();//清除  
              self.heatMapLayer.redraw();
          }  
          else{  
              self.heatMapLayer=await CreateHeatMapLayer(Config.COMPLAIN_HEAT_LAYER_ID,self.mapInstance); 
              
              //向mapStore添加专题图层信息
              let iconStr="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACV0lEQVQ4T6XTXUhTYRgH8P//zKGR2sJNIvxYOkIvqgutTIQI8soggpAgb8S2c2hZ4lbmJJsQBblJGFlO6kq6MMgiJCmkKIvuC3IGYdaFceYHmBXNc55wpjlBb3xvn/f5wfNFbPBx3fwXwRT7aEYrIGcAKCQu6R7/zZU5awPBoGLfnt4L4CCFDULYAAnTau7Uay9MLCFrAvZI6CTA1iM/3h9vjr0OEOa9A05vFYSfJlXfrbUBEdp7Oqog6AJx+M2XrusAj0IkXJ7vHVNgZuqq/2oyIMKsSIdGSi3BvIWgiPTqqv/8aKDQAEkI2iqcmsMwlSdTWuNgEuCIhDpFUEOKprv9D0DK0odowPUMRCUh58rzTu+gwg+6u/FuEmCPhL4KlLMxT+PjaK5VJWQTyEkRybHUOIdNBS8BdO0r9IatcWMghowSqOrPBSTRRHskPE2rUfyqtcVP0vd/TDJbNB7PjLa4BJAZJc5dZS5vkQJD1W15J1BdbfwDQs8FCAxfCVwmULUEiMi7rDpb5XR8y2yiL5Bomswf2uusrwNo6B7ftUWgO3QKRMnbtuZuQ8ENEsUQ9G+WeOD3MdecmSkTAG0JWGSgrEC7aDGUwZjqy1ncg87OVEfan4+mSfek5htavZ0jLQWlEKUJlDGLwvv7c7VsRRiJqb785UWy3QnvsRKPhHhIYkhgJpokwjlajJFYXVOiDPT1WRwz408F/Bzz+LSkTUy/3Z6damE9gQqAK2IiEBogUiCyjaTN4HzplLvp2/rHtKqWrT3tuy3C8l9M6Z9zN3xfHuNGLvovC5TsEWaao3AAAAAASUVORK5CYII=";
              let layerInfo={icon:iconStr,visible:true,id:Config.COMPLAIN_HEAT_LAYER_ID};
              self.addSubjectLayer(layerInfo); 
          }
          
          let sr=new esri.SpatialReference({"wkid":4326}); 
          let symbol = new esri.symbol.SimpleMarkerSymbol();
          symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE);
          symbol.setSize(12);
          symbol.setColor(new esri.Color([255, 0, 0, 0.5]));
        
          let points=[]; 

          self.heatmapPts.forEach(item=>{
            if(item){
              let currentItem={  
                X:item.LONGITUDE,  
                Y:item.LATITUDE
              };
              let pt=new esri.geometry.Point(item.LONGITUDE,item.LATITUDE,sr);  
              let g= new esri.Graphic(pt,symbol,currentItem,null); 
              self.heatMapLayer.add(g); 

              points.push(g);
            }
          });

          //ZoomToExtent(points,self.mapInstance);
        }

      });

    },
    //清除热力图  
    clearHeatmap(){
      if(this.heatMapLayer){
        this.heatMapLayer.clear();
        this.heatMapLayer.redraw();
      }
    }
  },
}
</script>

<style>
</style>
