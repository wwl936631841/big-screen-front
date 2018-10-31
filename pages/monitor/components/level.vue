<!-- 水质级别 -->
<template>
    <e-charts :options="options" style="width:600px;height:360px;" />
</template>

<script>
import echarts from "echarts";
import {getQualityQuarterRate} from './api'
export default {
    meta: { nvPermission: false },
    name:'WaterQualityLevel',   
    data(){
        return {
            options: {
                //backgroundColor: 'rgb(43, 51, 59)',
                toolbox: {
                },
                calculable: true,
                tooltip: {
                    trigger: "item",
                    formatter: "{a}<br/>{b}:{c}"
                },
                title: {
                    //text: "南丁格尔玫瑰图--PieHalfRose",
                    left: "center",
                    top: 20,
                    textStyle: {
                        color: "#ccc"
                    }
                },
                calculable: true,
                legend: {
                    icon: "circle",
                    x: "center",
                    y: "17%",
                    data: [],
                    textStyle: {
                        color: "#b7b2b2",
                        fontSize: 20
                    }
                },
                series: [{
                    name: "水质级别",
                    type: "pie",
                    radius: [
                        50,
                        200
                    ],
                    avoidLabelOverlap: false,
                    startAngle: 0,
                    center: [
                        "50%",
                        "35%"
                    ],
                    roseType: "area",
                    selectedMode: "single",
                    label: {
                        normal: {
                            show: false,
                            formatter: "{c}"
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                            smooth: false,
                            length: 20,
                            length2: 10
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: []
                }]
            },
            emptyPie: {
                name: "",
                itemStyle: {
                    normal: {
                        color: "#ad46f3"
                    }
                },
                value: 0
            }
        }
    },
    created(){
        this.getQualityLevel()
    },
    methods:{
        getQualityLevel() {
             getQualityQuarterRate().then(({data}) => {
                 if (data.series_data) {
                    this.options.legend.data = data.legend_data
                    this.options.series[0].data = data.series_data
                    let seriesData = data.series_data
                    //let forLen = 12 - seriesData.length
                    let forLen = seriesData.length
                    for (let index = 0; index < forLen; index++) {
                        seriesData.push(this.emptyPie)
                    }
                 }
             })
        }
    }
}
</script>

