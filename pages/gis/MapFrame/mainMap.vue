<template>
    <div ref="map" class="map">
        <div ref="button"></div>
        <map-tool-strip ref="toolStrip" :displayedLayers='subjectLayers' v-show="bizLayerType==='StationDistribution'"/>
        <base-map-toggle></base-map-toggle>
        <map-coordinates></map-coordinates>
        <switcher></switcher>
        <station-distribution-map v-if="bizLayerType==='StationDistribution'"></station-distribution-map>
        <person-trace-map v-if="bizLayerType==='PersonTrace'"></person-trace-map>
        <complain-heatmap v-if="bizLayerType==='ComplainHeatmap'"></complain-heatmap>
        <patrol-heatmap v-if="bizLayerType==='PatrolHeatmap'"></patrol-heatmap>
    </div>
</template>
<script>
    import esriLoader,{ loadScript,loadModules,isLoaded } from 'esri-loader';
    import { mapActions, mapState } from 'vuex'
    import {getMapParas,getSubjectVectorBaseInfo,getSubjectImageBaseInfo} from './api'
    import MapToolStrip from './mapcontrol/mapToolstrip'
    import BaseMapToggle from './mapcontrol/basemapToggle'
    import MapCoordinates from './mapcontrol/mapCoordinates'
    import {createLayer} from './gisUtils'
    import mapStore from './store';
    import StationDistributionMap from '../stationDistribution/map'
    import PersonTraceMap from '../personTrace/map'
    import ComplainHeatmap from '../complainHeatmap/map'
    import PatrolHeatmap from '../patrolHeatmap/map'
    import Switcher from '../subjectSwitch/switcher'
    import Config from '../config'

    export default {
      routerDepth: 0,
      name: 'MainMap',
      meta: {nvPermission: false},
      components: { MapToolStrip,BaseMapToggle,MapCoordinates,StationDistributionMap,PersonTraceMap,ComplainHeatmap,PatrolHeatmap,Switcher}, 
      data () {
          return{
            mapLoaded: false,
            MapConfig:{
                mapInitParams:{},
                vecMap:{},
                imgMap:{}
            },
            cbs: [],
            // //报警点闪烁符号
            // alarmPms:null,            
          }          
      },
      computed: {
          ...mapState(mapStore.name, ['mapInstance']),
          ...mapState(mapStore.name, ['subjectLayers']),
          ...mapState(mapStore.name, ['bizLayerType']), 
        //   ...mapState(mapStore.name, ['alarmPms']),
      },
      created () {
        //   console.log('-----mainMap.vue created-----');
          let self=this;          
          this.$bus.$on('configMap', (cb) => {
              if (self.mapInstance) {
                  cb(self.mapInstance)
              } else {
                  self.cbs.push(cb) 
              }
          });
      },
      mounted(){
        // console.log('-----mainMap.vue mounted-----');
         this.loadMap ();
      },
      beforeDestroy(){
          this.$bus.$off('configMap');
          this.updateMapInstance(null);
      },
      methods: {
      async   loadMap () {
            const self = this;
            if (!this.mapLoaded) {

            //TODO:读取地图参数
            await  getMapParas().then(({data}) =>{                   
                    let extents = data.list[0].INITIAL_EXTENT.split(',');
                    self.MapConfig.mapInitParams.extent = {
                        xmin: Number(extents[0]),
                        ymin: Number(extents[1]),
                        xmax: Number(extents[2]),
                        ymax: Number(extents[3]),
                    };                
                    let fullExtent = data.list[0].FULL_EXTENT.split(',');
                    self.MapConfig.mapInitParams.fullExtent = {
                        xmin: Number(fullExtent[0]),
                        ymin: Number(fullExtent[1]),
                        xmax: Number(fullExtent[2]),
                        ymax: Number(fullExtent[3]),
                    };                    
                    let mapxy = data.list[0].MAPXY.split(',');
                    self.MapConfig.mapInitParams.center = {
                        x: Number(mapxy[0]),
                        y: Number(mapxy[1])
                    };                    
                    let reference = data.list[0].REFERENCE;
                    self.MapConfig.mapInitParams.spatialReference = {
                        wkid: Number(reference)
                    };                    
                    let zoom = data.list[0].ZOOM;
                    self.MapConfig.mapInitParams.zoom = Number(zoom);
                    
                    let tileType = data.list[0].TILE_TYPE;
                    self.MapConfig.mapInitParams.tileType = tileType; 
                }
                ).catch(({msg})=>{
                    console.log(msg);
                });    
                
                //TODO:读取电子地图图层信息
            await  getSubjectVectorBaseInfo().then(({data})=>{                    
                        let url = data.list[0].TILE_URL;
                        let feature_type = data.list[0].FEATURE_TYPE;
                        self.MapConfig.vecMap = {
                            // tile_url: url,
                            tile_url: Config.vecBasemapUrl,
                            feature_type: feature_type
                        };
                    }).catch(({msg})=>{
                        console.log(msg);
                    });

                //TODO:读取影像地图图层信息
            await  getSubjectImageBaseInfo().then(({data})=>{                    
                        let url = data.list[0].TILE_URL;
                        let feature_type = data.list[0].FEATURE_TYPE;
                        self.MapConfig.imgMap = {
                            tile_url: url,
                            feature_type: feature_type
                        };
                    }).catch(({msg})=>{
                        console.log(msg);
                    });

                
            
            let modules=await loadModules(['esri/map', 'esri/dijit/HomeButton',"esri/layers/ArcGISTiledMapServiceLayer","esri/geometry/Extent","esri/layers/GraphicsLayer","esri/symbols/PictureMarkerSymbol"])
                .catch(err => {
                    console.error(err);
                });
            let [Map,HomeButton,ArcGISTiledMapServiceLayer,Extent,GraphicsLayer,PictureMarkerSymbol]=modules;

            // create map with the given options
            const map = new Map(this.$refs.map, {   
                logo: false, 
                slider: true                   
            });

            //加载底图
            async function loadBaseMap(){
                //默认显示电子地图
                let vecLayer = await createLayer(self.MapConfig.vecMap);                
                vecLayer.id="vec";
                map.addLayer(vecLayer);   

                // //默认显示影像地图
                // let imgLayer = await createLayer(self.MapConfig.imgMap);
                // imgLayer.id="img";
                // map.addLayer(imgLayer);

                //创建报警图层
                let alarmLayer=new GraphicsLayer({id:'alarm-layer'});
                map.addLayer(alarmLayer);
                
                //创建报警符号
                let alarmPms=new PictureMarkerSymbol('static/img/blink.gif',20,20);
                alarmPms.setOffset(0,4);

                self.setAlarmPms(alarmPms);
                self.setAlarmLayer(alarmLayer);

                //创建图层，供其他系统绘制图形
                let invokeLayer=new GraphicsLayer({id:'invoke-layer'});
                map.addLayer(invokeLayer);
                self.setInvokeLayer(invokeLayer);
            }
            await loadBaseMap();

            //设置地图初始范围
            let initExtent = new Extent({
                xmin: self.MapConfig.mapInitParams.extent.xmin,
                ymin: self.MapConfig.mapInitParams.extent.ymin,
                xmax: self.MapConfig.mapInitParams.extent.xmax,
                ymax: self.MapConfig.mapInitParams.extent.ymax,
                spatialReference: self.MapConfig.mapInitParams.spatialReference
            });                    

            map.setExtent(initExtent);

            //initialize the locate button
            const button = new HomeButton({
                    map:map,
                    extent:initExtent
                    },
                this.$refs.button
                );
            button.startup();

            self.setMapConfig(self.MapConfig);

            self.updateMapInstance(map);

            //初始化地图工具条
            this.$refs.toolStrip.InitTool(map);
            
            let cb = self.cbs.pop()
            while (cb) {
                cb(map)
                cb = self.cbs.pop()
            }

            this.mapLoaded = true;

            //通知地图初始化已经完成
            self.$bus.$emit('map-init-finished');
            }; 
                       
        },
        ...mapActions(mapStore.name, ['updateMapInstance']),
        ...mapActions(mapStore.name, ['setAlarmPms']),
        ...mapActions(mapStore.name, ['setAlarmLayer']),
        ...mapActions(mapStore.name, ['setInvokeLayer']),
        ...mapActions(mapStore.name, ['setMapConfig'])
      },
      
      watch: {
        '$route' () {
            this.loadMap()
        },
      }
    }
</script>
<style lang="scss">
    /* global styles */
    .HomeButton {
        position: absolute;
        // top: 60px;
        // left: 5px;
        top: 75px;
        left: 250px;
        z-index: 99;
    }
    .map {
        // height: 100%;
        // width: 100%;
        width: 3840px;
        height: 1040px;
        display: flex;
        justify-content: center;        
    }
    .esriSimpleSliderTL {
        top: 56px;
        left: 20px;
        z-index: 99;
    }    
</style>
