<template>
    <!-- <div class="map-coordinates"  :class="{'white':!isBlack,'black':isBlack}"> -->
    <div class="map-coordinates white">
        <span class="coorsText">{{coorsDesc}}</span>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import mapStore from '../store';
import {loadModules} from 'esri-loader';

export default{
    name: 'MapCoordinates',
    data(){
        return{
            coorsDesc:'',
            mouseMoveHandler:null,
            mouseDragHandler:null,
            isBlack:true
        }
    },
    created(){
        let self=this;
        this.$bus.$on('toggle-coordinates-color',()=>{
            self.isBlack=!self.isBlack;
        });
        this.$bus.$on('map-init-finished',()=>{
            // console.log('this.mapInstance is ',self.mapInstance);
            // console.log('this.mapInstance.spatialReference.wkid is ',self.mapInstance.spatialReference.wkid);

            self.mouseMoveHandler=self.mapInstance.on("mouse-move",self.showCoords);
            self.mouseDragHandler=self.mapInstance.on("mouse-drag",self.showCoords);
        });
    },
    mounted(){
        // console.log('mapStore is ',mapStore);
        // console.log('this.mapInstance is ',this.mapInstance);
        // if(this.mapInstance){
        //     this.mouseMoveHandler=this.mapInstance.on("mouse-move",this.showCoords);
        //     this.mouseDragHandler=this.mapInstance.on("mouse-drag",this.showCoords);
        // }
    },
    beforeDestroy(){
        if(this.mouseMoveHandler){
            this.mouseMoveHandler.remove();
        }
        if(this.mouseDragHandler){
            this.mouseDragHandler.remove();
        }
    },
    computed:{
        ...mapState(mapStore.name, ['mapInstance'])
    },
    methods:{
        showCoords(evt) {
            if(!evt){
                return;
            }

            let mp = evt.mapPoint;

            if (this.mapInstance&&this.mapInstance.spatialReference&&this.mapInstance.spatialReference.wkid == 4326) {
                this.coorsDesc=`横坐标：${mp.x.toFixed(3)} 纵坐标：${mp.y.toFixed(3)}`;
            } else {
                let self=this;
                loadModules(["esri/geometry/webMercatorUtils"])
                .then(([webMercatorUtils])=>{
                    let lngLat = webMercatorUtils.xyToLngLat(mp.x, mp.y);
                    self.coorsDesc=`横坐标：${lngLat[0].toFixed(3)} 纵坐标：${lngLat[1].toFixed(3)}`;
                })
                .catch(
                    err => {console.error(err);}
                );
            }            
        }
    }
}
</script>
<style lang="scss" scoped>
.map-coordinates {
    z-index: 888;
    position: absolute; 
    // margin-left: 50%;
    // transform: translateX(-50%);
    bottom: 20px;
    width: 323px;
    height: auto;
    overflow: hidden;
    text-align: center;
}
.coorsText{
    font-size:14px;
    text-align:center;
    font-family:微软雅黑;
}
.white{
    color:#fff;
}
.black{
    color:#000;
}
</style>
