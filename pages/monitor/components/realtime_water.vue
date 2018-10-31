<!-- 实时水情分析 -->
<template>
    <e-charts :options="option" style="width:890px;height:520px;left:5px;top:30px;"  />
</template>

<script>
import echarts from "echarts";  
import { getQualityWater } from "./api";
export default {
    meta: { nvPermission: false },
    name:'RealtimeWater',   
    data(){
        return {
            option:{
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(0,0,0,0.2)',
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            legend: {
                textStyle:{fontSize:15},
                data: [
                    "桂畔海枢纽5",
            "桂畔海枢纽4",
            "桂畔海枢纽3"
                ]
            },

            singleAxis: {
                top: 50,
                bottom: 50,
                axisTick: {},
                axisLabel: {},
                type: 'time',
                axisPointer: {
                    animation: true,
                    label: {
                        show: true
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        opacity: 0.2
                    }
                }
            },

            series: [
                {
                    type: 'themeRiver',
                     label:{fontSize:15},
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        }
                    },
                    data: [
                         [
                "2018/06/07",
                9,
                "桂畔海枢纽5"
            ],
            [
                "2018/06/08",
                11,
                "桂畔海枢纽5"
            ],
            [
                "2018/06/09",
                10,
                "桂畔海枢纽5"
            ],
            [
                "2018/06/10",
                9,
                "桂畔海枢纽5"
            ],
            [
                "2018/06/07",
                8,
                "桂畔海枢纽4"
            ],
            [
                "2018/06/08",
                8,
                "桂畔海枢纽4"
            ],
            [
                "2018/06/09",
                6,
                "桂畔海枢纽4"
            ],
            [
                "2018/06/10",
                9,
                "桂畔海枢纽4"
            ],
            [
                "2018/06/07",
                7,
                "桂畔海枢纽3"
            ],
            [
                "2018/06/08",
                6,
                "桂畔海枢纽3"
            ],
            [
                "2018/06/09",
                8,
                "桂畔海枢纽3"
            ],
            [
                "2018/06/10",
                12,
                "桂畔海枢纽3"
            ]

                    ]
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
            const self = this;
            getQualityWater({
       
            }).then(({data}) => {
                 if(data){  
                    /*self.option.series[0].data = data.series_data;
                    self.option.legend.data = data.legend_data;*/

                 }
            }).catch(err => {
               console.log(err);
            });

        }
    }
}
</script>

