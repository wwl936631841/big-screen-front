<template>
    <div class="left">
        <div class="nav">
            <div class="nav-item" :class="{active: currentItem === 'StationDistribution' }" @click="toggleStationDistribution()"><div class="nav-item-icon nav-item-icon-station"></div>点位分布</div>
            <div class="nav-item" :class="{active: currentItem === 'PersonTrace' }" @click="togglePersonTrace()"><div class="nav-item-icon nav-item-icon-trace"></div>人员轨迹</div>
            <div class="nav-item" :class="{active: currentItem === 'PatrolHeatmap' }" @click="togglePatrolHeatmap()"><div class="nav-item-icon nav-item-icon-patrol"></div>巡检热力图</div>
            <div class="nav-item" :class="{active: currentItem === 'ComplainHeatmap' }" @click="toggleComplainHeatmap()"><div class="nav-item-icon nav-item-icon-complain"></div>投诉热力图</div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import mapStore from '../MapFrame/store';

export default {
    data () {
        return{
            //当前选中项
            currentItem:'StationDistribution',
        }
    },
    methods: {
        toggleStationDistribution(){
            this.currentItem='StationDistribution';
        },
        togglePersonTrace(){
            this.currentItem='PersonTrace';
        },
        togglePatrolHeatmap(){
            this.currentItem='PatrolHeatmap';
        },
        toggleComplainHeatmap(){
            this.currentItem='ComplainHeatmap';
        },
      ...mapActions(mapStore.name, [
            'setBizLayerType'
      ]),        
    },
    computed: {
        ...mapState(mapStore.name, ['bizLayerType']),     
    },
    watch:{
        currentItem(val){
            this.setBizLayerType(val);
        }
    },
    beforeDestroy(){
        this.setBizLayerType('StationDistribution');
    },
}
</script>
<style lang="scss" scoped>
.left{
    flex-basis: 240px;
    height: 1040px;
    background-color: #134163;
    .nav{
        .nav-item{
            cursor: pointer;
            font-size: 28px;
            text-align: center;
            line-height: 128px;
            color: #fff;
            border-bottom: 1px solid #68bcd9;
            background:linear-gradient(180deg,rgba(14,41,76,1) 0%,rgba(20,47,82,1) 11%,rgba(3,30,65,1) 22%,rgba(6,33,67,1) 81%,rgba(2,29,63,1) 100%);
            // box-shadow:0px 1px 1px 0px rgba(104,188,217,1);
            &.active{
                background:linear-gradient(90deg,rgba(29,52,72,1) 0%,rgba(34,74,103,1) 26%,rgba(36,148,200,1) 61%,rgba(36,185,251,1) 87%,rgba(177,255,255,1) 100%);
            }
            &-icon{
                display: inline-block;
                width: 24px;
                height: 24px;
                margin-right: 10px;
                background-repeat: no-repeat;
                &-station{                  
                    background-image: url("../assets/img/station.png");
                }
                &-trace{
                    background-image: url("../assets/img/trace.png");
                }
                &-patrol{
                    background-image: url("../assets/img/patrol.png");
                }
                &-complain{ 
                    background-image: url("../assets/img/complain.png");
                }                
            }
        }
    }
}
</style>


