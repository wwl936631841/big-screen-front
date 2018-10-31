0<!-- 实时水质分析 -->
<template>
    <home-block title="实时水质分析"  width="595px">
        <div class="tp">
                    <div ><el-button   type="danger"    @click="getList('w01018');"></el-button>&nbsp; COD</div>
                    <div><el-button type="success"   @click="getList('w21003');"></el-button>&nbsp; 氨氮</div>
                    <div><el-button type="info"   @click="getList('w01003');"></el-button>&nbsp; 浊度</div>
                    <div><el-button type="warning"   @click="getList('w01009');"></el-button>&nbsp; 溶解度</div>
                </div>
         <e-charts :options="option" style="width:850px;height:420px;left:15px;"  />
    </home-block>
        
</template>

<script>
import echarts from "echarts";
import { getQualityRealtime } from "./api";
export default {
    routerDepth: 0,
    meta: { nvPermission: false },
    name:'RealtimeQuality',   
     data(){
        return {
            hours:[],
            days: [],
            option : {},
            data: []
        }

    },
    mounted(){
        this.getList();
    },
    methods:{
        getList(project){
            const self = this;
            getQualityRealtime({
                PROJECT_ID: project || 'w01018'
            }).then(({data}) => {
                var b = (JSON.stringify(data) != "{}");
                 if(b){  
                    self.hours = data.hours;
                    self.days = data.days;
                    //self.days.push('水质监测8#（桂畔海河与银涌河交界处）')
                    self.data = data.data;
                    /*self.data.push( [ 4, 0, 3 ])
                    self.data.push( [ 4, 1, 6 ])*/

                 }else{
                    self.hours = [];
                    self.days = [];
                    self.data = [];
                 }
                  this.getData();
            }).catch(err => {
               console.log(err);
            });

        },
        getData(){
                    //var hours = [];
            //var days = [];

            const self = this;
            self.option = {
                tooltip: {
                    position: 'top'
                },
                title: [],
                singleAxis: [],
                series: []
            }; 
            echarts.util.each(self.days, function (day, idx) {
                self.option.title.push({
                    textBaseline: 'middle',
                    top: (idx + 0.5) * 100 / 6 + 2 + '%', //左侧标题上下间距
                    text: day,
                    textStyle:{
                        fontSize:15,
                        height:20
                    }
                });
                self.option.singleAxis.push({
                    left: 80,
                    right: 100,
                    type: 'category',
                    boundaryGap: false,
                    data: self.hours,
                    top: (idx * 100 / 6 + 5) + '%', //X轴上下间距
                    height: (100 / 7 - 5) + '%', //圆形距X轴高度
                    axisLabel: {
                        interval: 1
                    }
                });
            self.option.series.push({
                    singleAxisIndex: idx,
                    coordinateSystem: 'singleAxis',
                    type: 'scatter',
                    data: [],
                    symbolSize: function (dataItem) {
                        return dataItem[1] * 1;
                    }
                });
            });

            echarts.util.each(self.data, function (dataItem) {
                self.option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
            });
        
    },
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
    button{
        width:60px;
        height:30px;
    }
    
</style>