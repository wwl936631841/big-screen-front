<template>
    <e-charts :options="options"/>
</template>

<script>

import { getPatrolStatisticsData } from "./api";
export default {
    routerDepth: 0,
    meta: { nvPermission: false },
    name:'PatrolStatistics',   
    data(){
        return {
            options: {
                "grid": {
                    borderWidth: 1,
                    x: '4% ',
                    x2: '1%',
                    y: '10%',
                    y2: '8%',
                },
                "legend": {
                    x2: '3%',
                    y: '2%',
                    textStyle: {
                        fontSize:16,
                        color: '#FFFFFF',
                    },
                    "data": ['正常', '异常', '总数']
                },
                "calculable": true,
                "xAxis": [{
                    "type": "category",
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,
                        textStyle: {
                            fontSize:16,
                            //color: '#fff'
                        }
                    },
                    "data": []
                }],
                "yAxis": [{
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,
                        textStyle: {
                            fontSize:16,
                            //color: '#fff'
                        }
                    },
                    "splitArea": {
                        "show": false
                    },

                }],
                "series": [{
                        "name": "正常",
                        "type": "bar",
                        "stack": "总量",
                        "barMaxWidth": 35,
                        "barGap": "10%",
                        "itemStyle": {
                            "normal": {
                                "color": "#07B6FC",
                                "label": {
                                    "show": true,
                                    "textStyle": {
                                        fontSize:16,
                                        "color": "#fff"
                                    },
                                    "position": "insideTop",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": []
                    },

                    {
                        "name": "异常",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": "#92E0FF",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    fontSize:16,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": []
                    }, {
                        "name": "总数",
                        "type": "line",
                        "stack": "总量",
                        symbolSize:10,
                        symbol:'circle',
                        "itemStyle": {
                            "normal": {
                                "color": "#07B6FC",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    fontSize:16,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": []
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
            getPatrolStatisticsData().then(({data}) => {
                 if(data){
					self.options.xAxis[0].data = data.monthData;
					self.options.series[0].data = data.normalData;
					self.options.series[1].data = data.abnormalData;
					self.options.series[2].data = data.ttlData;

                   //self.options.xAxis[0].data = ['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09','2018-10','2018-11','2018-12'];
                   //self.options.series[0].data = [31,22,11,44,21,66,77,88,99,10,11,12];
                   //self.options.series[1].data = [5,3,4,5,6,7,8,9,10,11,10,12];
                   //self.options.series[2].data = [36,25,15,49,27,73,85,97,109,21,21,24];
                 }
            }).catch(err => {
               console.log(err);
            });
        }
    }
}
</script>

