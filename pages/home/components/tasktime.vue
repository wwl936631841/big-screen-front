<template>
        <chart :options="options"  style="width:350px;height:300px;" />
</template>

<script>
import echarts from "echarts";
import VueECharts from "vue-echarts/components/ECharts";
Vue.component("chart", VueECharts);
import { taskTimeStatistics } from "./api";
export default {
    name:'taskTime',
    data(){
        return {
            options: {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'办理数量',
                        type:'bar',
                        barWidth: '60%',
                        data:[]
                    }
                ]
            }
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            taskTimeStatistics().then(({data}) => {
                 if(data){
                     this.options.xAxis[0].data = data.xAxisData ;
                     this.options.series[0].data = data.seriesData ;
                 }
               
            }).catch(err => {
               console.log(err);
            });
        }
    }
}
</script>

