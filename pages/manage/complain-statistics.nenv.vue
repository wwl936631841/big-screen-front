<template>
    <e-charts :options="options"/>
</template>

<script>
import echarts from "echarts";
import { getComplainStatisticsData } from "./api";
export default {
    routerDepth: 0,
    meta: { nvPermission: false },
    name:'ComplainStatistics',   
    data(){
        return {
            options: {
                //backgroundColor: "#111c4e",
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    formatter: function(prams) {
                        return "投诉数量：" + prams[0].data
                    }
                },
                grid: {
                    x: '3%',
                    x2: '0%',
                    y: '4%',
                    y2: '2%',
                    containLabel: true,
                    z: 22
                },
                xAxis: [{
                    type: 'category',
                    gridIndex: 0,
                    data: [],
                    splitLine:{
                        show:false
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#0c3b71'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: 'rgb(170,170,170)',
                        fontSize: 16
                    }
                }],
                yAxis: [{
                        show:false,
                        type: 'value',
                        gridIndex: 0,
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#0c3b71'
                            }
                        },
                        axisLabel: {
                            color: 'rgb(170,170,170)',
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        gridIndex: 0,
                        splitNumber: 12,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                            }
                        }
                    }
                ],
                series: [{
                        name: '投诉数量',
                        type: 'bar',
                        barWidth: '30%',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    color: "#ffc72b",
                                    fontSize: 20
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#00feff'
                                        },
                                        {
                                            offset: 0.5,
                                            color: '#027eff'
                                        },
                                        {
                                            offset: 1,
                                            color: '#0286ff'
                                        }
                                    ]
                                )
                            }
                        },
                        data: [],
                        zlevel: 11

                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: '50%',
                        xAxisIndex: 0,
                        yAxisIndex: 1,
                        barGap: '-135%',
                        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        zlevel: 9
                    },

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
            getComplainStatisticsData().then(({data}) => {
                 if(data){  
                    self.options.xAxis[0].data = data.townList;
                    self.options.series[0].data = data.complainList;
                 }
            }).catch(err => {
               console.log(err);
            });
        }
    }
}
</script>

