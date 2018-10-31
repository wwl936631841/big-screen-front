<template>
   <div id="chart-panel" ref="myEchart" style="width:100%;height:100%"></div>
</template>
<script>
import { getPatrolAnalsisData } from "./api";
import echarts from 'echarts'
import './assets/js/world.js'
export default {
    routerDepth: 0,
    meta: { nvPermission: false },
    name:'PatrolAnalsis',  
    data(){
        return {
           totalPatrolCnt:0,
           option:null
        }
    } ,
    created(){
    },
    mounted() {
       this.initchart();
    },
    methods:{
        getList(){
            const self = this;
            getPatrolAnalsisData().then(({data}) => {
                if(data){
                    self.totalPatrolCnt = data.totalPatrolCnt;
                    self.option.angleAxis.data = data.chartData;
                    self.chart.setOption(self.option);
                }else{
                    self.option.angleAxis.data = [];
                    self.chart.setOption(self.option);
                }
            }).catch(err => {
                self.option.angleAxis.data = [];
                self.chart.setOption(self.option);
                console.log(err);
            });
        },
        initchart(){
                var dataArr = [
                    [
                        [20, 0],
                        [1300, 0]
                    ],
                    [
                        [30, 1],
                        [1300, 1]
                    ],
                    [
                        [40, 1.5],
                        [1300, 2]
                    ],
                    [
                        [10, 2.5],
                        [1300, 3]
                    ],
                    [
                        [20, 3.5],
                        [1300, 4]
                    ],
                    [
                        [20, 5.5],
                        [1300, 5]
                    ],
                    [
                        [40, 5.5],
                        [1300, 6]
                    ],
                    [
                        [20, 6.5],
                        [1300, 7]
                    ],
                    [
                        [60, 8],
                        [1300, 8]
                    ],
                    [
                        [20, 9],
                        [1300, 9]
                    ],
                    [
                        [30, 10],
                        [1300, 10]
                    ],
                    [
                        [40, 11],
                        [1300, 11]
                    ],
                    [
                        [50, 12],
                        [1300, 12]
                    ]
                ]
                var series = []
                for (var i = 0; i < dataArr.length; i++) {
                    series.push({
                        coordinateSystem: 'polar',
                        name: 'line',
                        type: 'line',
                        z: 20,
                        lineStyle: {
                            normal:{
                                color: '#0fe3ec',
                                width: 1
                            }
                        },
                        data: dataArr[i],
                        symbol: 'circle',
                        showSymbol:true,
                        symbolSize: 8,
                        itemStyle:{
                             normal:{
                                label:{
                                    show:false
                                },
                                color: '#fbbc5e'
                            },
                        }
                    })
                }

                this.option = {
                    //backgroundColor: '#22287a',
                    grid: {
                        left: '20%',
                        right: '20%'
                    },

                    angleAxis: {
                        interval: 1,
                        type: 'category',
                        data:[],
                        // data:["{a|总数: 1}\n{b|正常率：100%}\n管网巡检",
                        //       "{a|总数: 3}\n{b|正常率：66.67%}\n河涌巡检", 
                        //       "{a|总数: 2}\n{b|正常率：100%}\n河涌曝气装置巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n人工湿地巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n视频站点巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n水闸巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n河涌水质点巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n河涌水情点巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n管网监测点巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n污水提升泵站巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n排水泵站巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n调蓄池巡检", 
                        //       "{a|总数: 0}\n{b|正常率：-}\n污水处理站巡检"],
                        z: 10,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#1d51a3",
                                width: 10,
                                type: "dashed",
                                opacity: 0.7
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            show: true,
                            color: "#d5d5dd",
                            margin: 0,
                            fontSize: 16,
                            lineHeight: 20,
                            align: 'center',
                            rich: {
                                a: {
                                    align: 'center',
                                    fontSize: 16
                                },
                                b: {
                                    align: 'center',
                                    fontSize: 16
                                }
                            }
                        },
                        axisTick: {
                            show: true
                        }
                    },
                    radiusAxis: {
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#00c7ff",
                                width: 1,
                                type: "dashed"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#1d51a3",
                                width: 1,
                                type: "dashed",
                                opacity: 0.7
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: '#1d51a3',
                                opacity: 0.5
                            }
                        }
                    },
                    polar: {},
                    geo: {
                        map: 'world',
                        left: '30%',
                        right: '30%',
                        z: 15,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        mapType: 'world',
                        itemStyle: {
                            normal: {
                                areaColor: '#3dacdd',
                                borderColor: '#3dacdd'
                            },
                            emphasis: {
                                areaColor: '#3dacdd'
                            }
                        }
                    },
                    series: series
                };
            this.chart = echarts.init(this.$refs.myEchart);
            //this.chart.setOption(this.option);
            this.getList();
       }
    },
    watch: {
      totalPatrolCnt (val) {
        if (val) {
          this.$emit('setTotalPatrolCnt',val);
        }
      }
    }
}

</script>

<style lang="scss" scoped>
    #chart-panel:after {
        width: 100%;
        height: 100%;
        content: ' ';
        display: block;
        background: url("./assets/img/1.png");
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        -webkit-animation: radar-beam 3s infinite linear; /*匀速 循环*/
        z-index: 20;
        transform: translate(-50%,0);
	}
	@keyframes radar-beam {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}

</style>
