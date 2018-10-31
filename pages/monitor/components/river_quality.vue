<!-- 河涌水质月分析 -->
<template>
     <home-block title="实时水质分析"  width="595px">
          <div class="tp">
                    <div><el-button type="danger"    @click="getList('w01018');"></el-button>&nbsp; COD</div>
                    <div><el-button type="success"   @click="getList('w21003');"></el-button>&nbsp; 氨氮</div>
                    <div><el-button type="info"   @click="getList('w01003');"></el-button>&nbsp; 浊度</div>
                    <div><el-button type="warning"   @click="getList('w01009');"></el-button>&nbsp; 溶解度</div>
                </div>
                <span class="time">{{monitor_month}}</span>
        <e-charts :options="option" style="width:850px;height:400px;top:0px;right:30px;"  />
    
     </home-block>
</template>

<script>
import echarts from "echarts";  
import { getQualityMonth } from "./api";
export default {
    meta: { nvPermission: false },
    name:'RiverQuality',   
    data(){
        return {
            monitor_month: 'xx',
            option : {
                title: {
                    text: ''
                },
                legend: {
                    data: [],
                    align: 'left'
                },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                       /* magicType: {
                            type: ['stack', 'tiled']
                        },
                        dataView: {},
                        saveAsImage: {
                            pixelRatio: 9
                        }*/
                    }
                },
                tooltip: {},
                barMaxWidth: 40, //最大宽度
                xAxis: {
                    data: [],
                    silent: false,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                },
                series: [] 
            }
        }
    },
    created(){
         this.getList();
    },
    methods:{
         getList(project){
            const self = this;
            getQualityMonth({
                 PROJECT_ID: project || 'w01018'
            }).then(({data}) => {
                var b = (JSON.stringify(data) != "{}");
                 if(b){  
                    self.option.legend.data = data.legend;
                    self.option.xAxis.data = data.xAxisData;
                    self.option.series = data.series;
                    self.monitor_month = data.monitor_month;

                 }else{
                    self.option.legend.data = [];
                    self.option.xAxis.data = [];
                    self.option.series = []; 
                 }
            }).catch(err => {
               console.log(err);
            });

        }
    }
}
</script>
<style lang="scss" scoped>
.tp{
        margin: 15px auto;
        margin-bottom: 0;
        width: 500px;
        height: 40px;
        //background-color: rgb(54, 54, 54);
        display: flex;
        justify-content: space-around;
        >div{
            color: #b7b2b2;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            width: 120px;
        }
     }
 .time{
        position: absolute;
        right: 35px;
        top: 62px;
        color: #b7b2b2;
        font-size: 18px;
    }
     button{
        width:60px;
        height:30px;
    }
</style>
