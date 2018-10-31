<template>
  <div>
    <patrol-legend-panel></patrol-legend-panel>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import store from '../MapFrame/store';
import { getLayerDetailsInSubject,getViewData,getSubjectList} from '../api';
import {createLayer,createRender,ZoomToExtent} from '../MapFrame/gisUtils';
import { loadModules } from 'esri-loader';
import PatrolLegendPanel from './patrolLegendPanel';
import {GetHeatMapData} from './api';
import {CreateHeatMapLayer,Config,CheckCoordinateExtent,getNowFormatDate} from '../utils';

export default {
  name: 'patrol-heatmap',
  meta: {
      showTool:false,
      nvPermission: false
  },
  components: {PatrolLegendPanel},
  data(){
    return{
        heatmapPts:[],
        //当前选择图层
        currentLayer:'riverHeatmap',
        //当前热力图类型(RIVERWAY、DEVICE、MANAGEMENT、DRAINAGE_PIPE)
        type:'RIVERWAY',
        //热力图层
        heatMapLayer:null,
        heatLayerId:'巡检热力图',
    }
  },
  computed: {
      ...mapState(store.name, ['mapInstance']),
      ...mapState(store.name, ['subjectLayers']),
      ...mapState(store.name, ['patrolLayers']),
  },
  created(){
  },
  mounted() {    
    let self=this;

    self.$bus.$emit('configMap', () => {
      //先清空mapstore中的专题数组及地图中的专题图层
      self.clearSujectLayers();

      //初始化热力图
      self.initializeHeatMap();
    });
  },
  beforeDestroy(){
  },
  methods:{
    initializeHeatMap(){
      this.startDate=new Date().getFullYear()+'-01-01';
      this.endDate=getNowFormatDate();      
      this.drawHeatmap(this.type,this.startDate,this.endDate);      
    },
    drawHeatmap(type,startDate,endDate){
        let self=this;
        let paras={TYPE:type,BEGIN_TIME:startDate,END_TIME:endDate};
        GetHeatMapData(paras).then(({data})=>{
          if(data.length>0){
            let validPts=data.filter(v=>{
              return v.LONGITUDE&&v.LATITUDE&&CheckCoordinateExtent(v.LONGITUDE,v.LATITUDE);
            });

            if(!validPts||validPts.length==0){
              return;
            }

            // console.log('validPts:',validPts);

            self.heatmapPts=validPts.map(v=>{
                  return{LONGITUDE:v.LONGITUDE,LATITUDE:v.LATITUDE};
            });

            if(self.heatMapLayer){
                self.heatMapLayer.clear();//清除  
                self.heatMapLayer.redraw();
            }  
            else{  
              self.heatMapLayer=CreateHeatMapLayer(self.heatLayerId,self.mapInstance);  

              //向mapStore添加专题图层信息
              let iconStr="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACV0lEQVQ4T6XTXUhTYRgH8P//zKGR2sJNIvxYOkIvqgutTIQI8soggpAgb8S2c2hZ4lbmJJsQBblJGFlO6kq6MMgiJCmkKIvuC3IGYdaFceYHmBXNc55wpjlBb3xvn/f5wfNFbPBx3fwXwRT7aEYrIGcAKCQu6R7/zZU5awPBoGLfnt4L4CCFDULYAAnTau7Uay9MLCFrAvZI6CTA1iM/3h9vjr0OEOa9A05vFYSfJlXfrbUBEdp7Oqog6AJx+M2XrusAj0IkXJ7vHVNgZuqq/2oyIMKsSIdGSi3BvIWgiPTqqv/8aKDQAEkI2iqcmsMwlSdTWuNgEuCIhDpFUEOKprv9D0DK0odowPUMRCUh58rzTu+gwg+6u/FuEmCPhL4KlLMxT+PjaK5VJWQTyEkRybHUOIdNBS8BdO0r9IatcWMghowSqOrPBSTRRHskPE2rUfyqtcVP0vd/TDJbNB7PjLa4BJAZJc5dZS5vkQJD1W15J1BdbfwDQs8FCAxfCVwmULUEiMi7rDpb5XR8y2yiL5Bomswf2uusrwNo6B7ftUWgO3QKRMnbtuZuQ8ENEsUQ9G+WeOD3MdecmSkTAG0JWGSgrEC7aDGUwZjqy1ncg87OVEfan4+mSfek5htavZ0jLQWlEKUJlDGLwvv7c7VsRRiJqb785UWy3QnvsRKPhHhIYkhgJpokwjlajJFYXVOiDPT1WRwz408F/Bzz+LSkTUy/3Z6damE9gQqAK2IiEBogUiCyjaTN4HzplLvp2/rHtKqWrT3tuy3C8l9M6Z9zN3xfHuNGLvovC5TsEWaao3AAAAAASUVORK5CYII=";
              let layerInfo={icon:iconStr,visible:true,id:self.heatLayerId};
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
            
            // ZoomToExtent(points,self.mapInstance);
          }

        });

      },
    //清除热力图  
    clearHeatmap(){
      if(this.heatMapLayer){
        this.heatMapLayer.clear();
        this.heatMapLayer.redraw();
      }
    },  
    ...mapActions(store.name, [
          'setSubjectLayers','clearSujectLayers','addSubjectLayer'
    ]),
  },
  watch:{
  }
}
</script>

<style>
</style>
