<template>
    <div class="BasemapToggle">
        <img class="vecType" :class="{'down':isVecType,'up':!isVecType}" @click="loadVecMap()"/>
        <img class="imgType" :class="{'down':!isVecType,'up':isVecType}" @click="loadImgMap()"/>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import mapStore from '../store';
import {createLayer} from '../gisUtils';

export default{
    name: 'BasemapToggle',
    data(){
        return{
            isVecType:true,
        }
    },
    computed: {
        ...mapState(mapStore.name, ['mapInstance']),
        ...mapState(mapStore.name, ['mapConfig']),
    },
    created () {

    },
    mounted(){

    },
    methods:{
        async loadVecMap(){
            //移除img底图
            let imgLayer=this.mapInstance.getLayer("img");
            if (imgLayer){
                this.mapInstance.removeLayer(imgLayer);
            }
            //加载vec底图
            let vecLayer = await createLayer(this.mapConfig.vecMap);                
            vecLayer.id="vec";
            this.mapInstance.addLayer(vecLayer,0);
            
            this.isVecType=true;
        },
        async loadImgMap(){
            //移除vec底图
            let vecLayer=this.mapInstance.getLayer("vec");
            if (vecLayer){
                this.mapInstance.removeLayer(vecLayer);
            }
            //加载img底图
            let imgLayer = await createLayer(this.mapConfig.imgMap);                
            imgLayer.id="img";
            this.mapInstance.addLayer(imgLayer,0);  

            this.isVecType=false;
        }
    },
    watch:{
        isVecType(){
            this.$bus.$emit('toggle-coordinates-color');
        }
    }
}
</script>
<style lang="scss" scoped>
.BasemapToggle {
    background-color: #00A1CB;
    cursor: pointer;
    position: absolute;
    // top: 50px;
    // right: 88px;
    // position: fixed;
    bottom: 60px;
    right: 25px;
    z-index: 99;
    align-items: flex-end;
    flex-direction: column;
    display: flex;
    img:hover {
        border: 1px solid #8fccff;
    }
}
.vecType {
    position: absolute;
    width: 56px;
    height: 38px;
    background: url('./img/indexImage.png') no-repeat -154px -202px;
}
.imgType {
    position: absolute;
    width: 56px;
    height: 38px;
    background: url('./img/indexImage.png') no-repeat -154px -155px;
}
.up{
    z-index:99;
}
.down{
    z-index: 98;
}
</style>
