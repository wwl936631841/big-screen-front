<template>
  <div>
    <el-collapse-transition>
      <div v-show="isShowTip">
        <poi-tip :style="{'left':tipLeft,'top':tipTop}" ref="poiTip" :currentPoi='currentPoiName'></poi-tip>
      </div>
    </el-collapse-transition>
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
import {CreateHeatMapLayer,Config,CheckCoordinateExtent} from '../utils';

export default {
  name: 'patrol-subject',
  meta: {
      // hasMap: true,
      // layerType:'patrol',
      showTool:true,
      nvPermission: false
  },
  components: {PoiTip},
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
        //setInterval的id
        timer:null,
        //当前热力图类型
        type:null,
        //巡检人员图层Id
        patrolLayerId:'巡检人员',
        //巡检人员图层
        patrolLayer:null,
        //巡检人员视图
        patrolLayerView:null,
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

    self.getSubjectIdByName(subjectConfig['patrol-subject']).then(()=>{
      self.getSubjectlayerLists(self.subjectId)
          .then(()=>{
                self.$bus.$emit('configMap', () => {
                self.LoadSubjectLayers()
            })
          });
    });

    // this.setPatrolLayers(this.layers);
  },
  beforeDestroy:function(){
    if(this.timer){
      clearInterval(this.timer);
    }
  },
  methods:{
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

      let modules = await loadModules(["esri/geometry/Point","esri/graphic"])
                          .catch(err => {console.error(err);});

      let [Point,Graphic]=modules;

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

          //保存巡检人员图层及视图
          if(layer.id===this.patrolLayerId){
            this.patrolLayer=layer;
            this.patrolLayerView=layerInfo.layer_table;
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
                      });
                    }
                  })
                  .catch(err => {
                        console.error(err);
                  });
          }

          let self=this;
          //添加鼠标悬浮提示
          layer.on("mouse-over", function (evt) {
            //显示NICK_NAME
            if(!!evt.graphic.attributes.NICK_NAME){

              let scrPt = evt.screenPoint;
              
              self.tipLeft=scrPt.x-16+'px';
              self.tipTop=scrPt.y-30+'px';

              self.currentPoiName=evt.graphic.attributes.NICK_NAME;
              self.isShowTip=true;

              self.mapInstance.setMapCursor("pointer");
            }
          });

          layer.on("mouse-out", function(evt){
            self.isShowTip=false;
            self.mapInstance.setMapCursor("default");
          });  
          
          // ZoomToExtent(points,self.mapInstance);
      }

      //启动刷新巡检功能
      this.startReloadMonitor();

    },  
    //刷新巡检人员图层
    reloadPatrolPerson(){
      if(this.patrolLayer&&this.patrolLayerView){
        //清空图形
        this.patrolLayer.clear();
        
        let self=this;

        loadModules(["esri/geometry/Point","esri/graphic"])
        .then(([Point,Graphic])=>{
            //重新读取数据
            getViewData({viewName:self.patrolLayerView})
            .then(({data}) => { 
              //如果有返回数据                     
              if(!!data.list){
                data.list.forEach(element => {                          
                  if(!!(element.LONGITUDE)&&!!(element.LATITUDE)){
                    let x=parseFloat(element.LONGITUDE);
                    let y=parseFloat(element.LATITUDE);
                    let geometry = new Point(x,y);
                    
                    let attr = {};
                    for (let key in element) {                              
                      attr[key] = element[key];
                    }

                    let graphic = new Graphic(geometry, null, attr, null);                          
                    self.patrolLayer.add(graphic); 
                  }
                });
              }
            });
        })
        .catch(err => {
              console.error(err);
        });
      }
    },  
    //启动刷新巡检功能
    startReloadMonitor(){ 
      let self=this;
      self.timer=setInterval(()=>{
        self.reloadPatrolPerson();
      },1000*60);
    },
    ...mapActions(store.name, [
          'setSubjectLayers','clearSujectLayers','setPatrolLayers','addSubjectLayer'
    ]),
  },
  watch:{
  }
}
</script>

<style>
</style>
