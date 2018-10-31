<template>
  <div>
    <el-collapse-transition>
      <div v-show="isShowTip">
        <poi-tip :style="{'left':tipLeft,'top':tipTop}" ref="poiTip" :currentPoi='currentPoiName'></poi-tip>
      </div>
    </el-collapse-transition>
    <search></search>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import store from '../MapFrame/store';
import { getLayerDetailsInSubject,getViewData,getSubjectList} from '../api';
import {createLayer,createRender,ZoomToExtent} from '../MapFrame/gisUtils';
import { loadModules } from 'esri-loader';
import subjectConfig from '../subjectConfig';
import PoiTip from '../common/poiTip';
import Search from './components/search';
import {GetStationInfo,GetMonitorAlarmStation} from './api';
import {CheckCoordinateExtent} from '../utils';
export default {
  name: 'station-distribution',
  meta: {
      showTool:true,
      nvPermission: false
  },
  components: {PoiTip,Search},
  data(){
    return{
        subjectId:'',
        //专题图层列表
        layerLists:[],
        //是否显示兴趣点提示框
        isShowTip:false,
        //当前poi名称
        currentPoiName:'',
        tipLeft:'10px',
        tipTop:'10px',
        //报警站点
        alarmSites:[],
        //setInterval的id
        timer:null,
    }
  },
  computed: {
      ...mapState(store.name, ['mapInstance']),
      ...mapState(store.name, ['subjectLayers']),
      ...mapState(store.name, ['alarmPms']),
      ...mapState(store.name, ['alarmLayer']),
      visibleLayers(){
        //从store中查找勾选的业务图层
        return this.subjectLayers.filter(v=>v.visible);
      }
  },
  created(){

  },
  mounted() {
    
    this.resetAlarmLayer();
     
    let self=this;

    self.getSubjectIdByName(subjectConfig['home-subject']).then(()=>{
      self.getSubjectlayerLists(self.subjectId)
          .then(()=>{
              self.$bus.$emit('configMap', () => {
                self.LoadSubjectLayers()
              })
          });
    });
  },
  beforeDestroy(){
    if(this.timer){
      clearInterval(this.timer);
    }

    //清除报警图层
    this.resetAlarmLayer(); 
  },
  methods:{
    fetchAlarmSites(){
      let self=this;
      GetMonitorAlarmStation().then(({data})=>{
        if(data.length>0){
          self.alarmSites=data;
        }
      });
    },
    startAlarmMonitor(){ 
      let self=this;
      self.timer=setInterval(()=>{
        self.fetchAlarmSites();
      },1000*3600*3);
      // 1000*3600*3
    },
      async getSubjectlayerLists(subjectId){
          const self = this;

          //先清空mapstore中的专题数组及地图中的专题图层
          self.clearSujectLayers();

          let json={SUBJECT_ID:self.subjectId};
          
         await getLayerDetailsInSubject(json).then(({data}) => {            
            self.layerLists = data.list.map(item => {
              return {
                "LAYER_TABLE":item.LAYER_TABLE,
                "MIN_SCALE": item.MIN_SCALE,
                "DEFAULT_VISIBLE":item.DEFAULT_VISIBLE==='1',
                "LAYER_ID":item.LAYER_ID,
                "JSON":JSON.parse(item.JSON),
                "IS_IMG_BASEMAP":item.IS_IMG_BASEMAP==='1',
                "TILE_URL":item.TILE_URL,
                "IS_MAP_LAYER":item.IS_MAP_LAYER==='1',
                "CONFIG_NAME":item.CONFIG_NAME,
                "FEATURE_TYPE":item.FEATURE_TYPE,
                "SUBJECT_ID":item.SUBJECT_ID,
                "SEQUENCE":item.SEQUENCE,
                "RENDER_ID": item.RENDER_ID,             
                "LAYER_TYPE":item.LAYER_TYPE,
                "ICON": item.ICON,
                "MAX_SCALE": item.MAX_SCALE,
                "IS_VEC_BASEMAP": item.IS_VEC_BASEMAP==='1',
                "TYPE": item.TYPE,
              }
            }); 
            
            //向mapStore写入专题图层信息
            let layerInfos=self.layerLists.map(item=>{
              return {
                icon:item.ICON,
                visible:item.DEFAULT_VISIBLE,
                id:item.CONFIG_NAME
              }
            });

            self.setSubjectLayers(layerInfos);
          }).catch(err=>{
            console.log(err);
          });
      },
      async getSubjectIdByName(subjectName){
          const self = this;
          const pageIndex=1;
          const pageSize=20;
          let json={pageIndex,pageSize};
         await getSubjectList(json).then(({data}) => {       
            let subject= data.list.find((item) => 
              item.NAME===subjectName
            );  
            if(subject){
                self.subjectId=subject.ID;
            }    
          }).catch(({msg})=>{
            self.$message.error(msg);
          });
      },
      async LoadSubjectLayers(){

        let modules = await loadModules(["esri/geometry/Point","esri/graphic","esri/graphicsUtils"])
                            .catch(err => {console.error(err);});

        let [Point,Graphic,graphicsUtils]=modules;

        let points=[];  

        for(let i=0;i<this.layerLists.length;i++){
            let layerInfo={
                    layer_table:this.layerLists[i].LAYER_TABLE,
                    feature_type:this.layerLists[i].FEATURE_TYPE,
                    layer_name:this.layerLists[i].CONFIG_NAME,
                    tile_url:this.layerLists[i].TILE_URL,
                    render_type:this.layerLists[i].TYPE,
                    render_json:this.layerLists[i].JSON,
                    default_visible:this.layerLists[i].DEFAULT_VISIBLE,
                    min_scale:this.layerLists[i].MIN_SCALE,
                    max_scale:this.layerLists[i].MAX_SCALE,
                    gdb_objcls_id:this.layerLists[i].GDB_OBJCLS_ID||null,
                    sequence:this.layerLists[i].SEQUENCE,
                    layer_type:this.layerLists[i].LAYER_TYPE,
                    icon:this.layerLists[i].ICON,
                  };
            let layer = await createLayer(layerInfo);
            layer.id=layerInfo.layer_name;            
            if(layer){
              this.mapInstance.addLayer(layer);
            }

            //视图数据
            if(this.layerLists[i].LAYER_TYPE==='6'){
              let self=this;
              await getViewData({viewName:this.layerLists[i].LAYER_TABLE})
                    .then(({data}) => { 
                      //如果有返回数据                     
                      if(!!data.list){
                        data.list.forEach(element => {                          
                          if(!!(element.LONGITUDE)&&!!(element.LATITUDE)){
                            let x=parseFloat(element.LONGITUDE);
                            let y=parseFloat(element.LATITUDE);
                            
                            //只加载指定范围内的站点
                            if(CheckCoordinateExtent(x,y)){
                              let geometry = new Point(x,y);
                              
                              let attr = {};
                              for (let key in element) {                              
                                attr[key] = element[key];
                              }

                              let graphic = new Graphic(geometry, null, attr, null);                          
                              layer.add(graphic); 

                              if(self.layerLists[i].DEFAULT_VISIBLE){
                                points.push(graphic);
                              }
                            }

                          }
                        });
                      }
                    })
                    .catch(err => {
                          console.error(err);
                    });
            }

            let self=this;

            //图层开关时，同步勾选图层复选框
            layer.on("visibility-change",function(evt){
              self.toggleLayerVisibility({layerId:layer.id,isVisible:evt.visible});
            });

            //添加鼠标悬浮提示
            layer.on("mouse-over", function (evt) {
              if(!!evt.graphic.attributes.NAME){

                let scrPt = evt.screenPoint;
                
                self.tipLeft=scrPt.x-16+'px';
                self.tipTop=scrPt.y-30+'px';

                self.currentPoiName=evt.graphic.attributes.NAME;
                self.isShowTip=true;

                self.mapInstance.setMapCursor("pointer");
              }
            });

            layer.on("mouse-out", function(evt){
              self.isShowTip=false;
              self.mapInstance.setMapCursor("default");
            });
        }

        //缩放至可见图层范围
        // ZoomToExtent(points,this.mapInstance);

        //获取报警站点信息
        this.fetchAlarmSites();
        //启动循环报警检测
        this.startAlarmMonitor();

      },
      ...mapActions(store.name, [
            'setSubjectLayers','clearSujectLayers','resetAlarmLayer','toggleLayerVisibility'
      ]),
      addAlarmPoint(layer,alarmPtIds,symblol,alarmLyr){
        alarmPtIds.forEach(ptId => {
          let graphic=layer.graphics.find(g=>{
            return g.attributes['ID']===ptId;
          });
          
          if(graphic){
            let self=this;          
            loadModules(['esri/graphic'])
            .then(([Graphic]) => {              
              let attr = {ID:graphic.attributes['ID'],REL_LAYER_ID:layer.id};
              let alarmGraphic = new Graphic(graphic.geometry, self.alarmPms, attr, null);                          
              alarmLyr.add(alarmGraphic); 
            })
            .catch(err => {
              console.error(err);
            });
          }
        });
      },
      refreshAlarmLayer(){
        //重置报警图层
        this.resetAlarmLayer();

        for(let i=0;i<this.visibleLayers.length;i++){
          let siteType='';
          let layer=this.visibleLayers[i];
          switch (layer.id){
            case '河涌自动站':
              siteType='RIVER_AUTO';
              break;     
            case '河涌人工站':
              siteType='RIVER_MANUL';
              break;     
            case '污水处理厂':
              siteType='SEWAGE_PLANT';
              break; 
            case '污水处理站':
              siteType='SEWAGE_STATION';
              break;  
            case '污水提升泵':
              siteType='WASTEPUMP';
              break;                                                
            case '水闸':
              siteType='WATER_GATE';
              break;
            case '泵站':
              siteType='PUMP';
              break;
            case '调蓄池':
              siteType='STORAGE';
              break;
            case '河涌水情点':
              siteType='WATER_RIVER';
              break;
            // case '人工湿地':
            //   siteType='WETLAND';
            //   break;
          }

          let currentAlarmPt=this.alarmSites.filter(v=>v.TYPE===siteType);
          
          if(currentAlarmPt.length>0){
            let alarmPtIds=currentAlarmPt.map(v=>{ return v.SITE_ID});
            let mapLayer=this.mapInstance.getLayer(layer.id);
            if(mapLayer){
              this.addAlarmPoint(mapLayer,alarmPtIds,this.alarmPms,this.alarmLayer);
            }
            
          }
        }
      }
  },
  watch:{
    alarmSites(val,oldVal){
      let changed=false;
      if(val.length!=oldVal.length){
          changed=true;
      }else{
        for(let i=0;i<val.length;i++){
          if(oldVal[i].SITE_ID!==val[i].SITE_ID){
            changed=true;
            break;
          }
        }
      }

      if(changed){
        this.refreshAlarmLayer();
      }
      
    },
    visibleLayers(){
      this.refreshAlarmLayer();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style>
</style>
