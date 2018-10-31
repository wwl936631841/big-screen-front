<template>
        <e-charts :options="options" style="width:350px;height:300px;"  />
</template>

<script>

import { taskProportionStatistics } from "./api";
export default {
    name:'TaskProportion',   
    data(){
        return {
            options: {
                    title : {
                        text: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",

                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                        
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: []
                    },
                   
                    series : [
                        {
                            name: '任务占比',  
                            type: 'pie',
                            radius : [40, 100],
                        //center : ['10%', '30%'],
                            roseType : 'radius',
                            data:[
                                
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ],
                    color: ['#FF812C','#FCC345','#1775F2','#FF46F4','#95DBED','#92FF33'],
                    
                }
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            taskProportionStatistics().then(({data}) => {
                 if(data){
                   //this.options.legend.data = data.legendData ;
                   this.options.series[0].data = data.seriesData ;
                 }
               
            }).catch(err => {
               console.log(err);
            });
        }
    }
}
</script>

