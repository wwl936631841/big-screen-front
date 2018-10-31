<template>
   <div ref="myEchart" style="width:100%;height:100%"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    routerDepth: 0,
    meta: { nvPermission: false },
    name:'PatrolAnalsis',  
    data(){
        return {
           //option:null
        }
    } ,
    created(){
    },
    mounted() {
       this.initchart();
    },
    methods:{
        initchart(){
            var XwByMapJson = {
                "type": "FeatureCollection",
                "features": [{
                        "type": "Feature",
                        "properties": {
                            "id": "33",
                            "name": "六桶镇",
                            "cp": [106.453754, 27.111663],
                            "childNum": 1
                        },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [106.460078, 27.197424],
                                    [106.461803, 27.193953],
                                    [106.47057, 27.192154],
                                    [106.477038, 27.1802],
                                    [106.473301, 27.157573],
                                    [106.482643, 27.149344],
                                    [106.497591, 27.147801],
                                    [106.503915, 27.153202],
                                    [106.507365, 27.150758],
                                    [106.506359, 27.139957],
                                    [106.494573, 27.124782],
                                    [106.504921, 27.115264],
                                    [106.501616, 27.110634],
                                    [106.505353, 27.108576],
                                    [106.504634, 27.101372],
                                    [106.509808, 27.097642],
                                    [106.518001, 27.099057],
                                    [106.531799, 27.082332],
                                    [106.526768, 27.077314],
                                    [106.508227, 27.070495],
                                    [106.510671, 27.061101],
                                    [106.510383, 27.06123],
                                    [106.504634, 27.059171],
                                    [106.49716, 27.058141],
                                    [106.491411, 27.063803],
                                    [106.489686, 27.074097],
                                    [106.472439, 27.076671],
                                    [106.462665, 27.078215],
                                    [106.46209, 27.072039],
                                    [106.455191, 27.062259],
                                    [106.445418, 27.052994],
                                    [106.441393, 27.058141],
                                    [106.436794, 27.058656],
                                    [106.438519, 27.066377],
                                    [106.436219, 27.069465],
                                    [106.429895, 27.068951],
                                    [106.417822, 27.065862],
                                    [106.417534, 27.065862],
                                    [106.418972, 27.070752],
                                    [106.400287, 27.102144],
                                    [106.401437, 27.118737],
                                    [106.412935, 27.137514],
                                    [106.41466, 27.149216],
                                    [106.424721, 27.158602],
                                    [106.44513, 27.162587],
                                    [106.45361, 27.193439],
                                    [106.460078, 27.197167],
                                    [106.460078, 27.197424]
                                ]
                            ]
                        }
                    },

                ]
            }

            // 随机0-1000的数
            function randomData() {
                return Math.round(Math.random() * 1000);
            }

            //中心点坐标
            var geoCoordMap = {
                "六桶镇": [106.453754, 27.111663],
            };

            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };


            var option = {
                cityId: {
                    '六桶镇': 0,
                },
                backgroundColor: '#404a59',
                title: {
                    text: '各种植园区灾害情况',
                    x: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                legend: {
                    textStyle: {
                        color: '#fff'
                    },
                    orient: 'horizontal',
                    top: '5%',
                    data: ['气象灾害', '地质灾害', '病害', '虫害', '其他']
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return params.seriesName + ' : ' + params.value[2];
                    }
                },
                geo: {
                    map: 'XW',
                    left: '8%',
                    right: '8%',
                    top: '12%',
                    bottom: '4%',
                    label: {
                        normal: {
                            show: false,
                            color: "#fff",
                            formatter: function(params, t) {
                                var cityName = params.name;
                                return "\n\n\n\n\n\n" + cityName + "\n\n ";
                            }
                        },
                        emphasis: {
                            show: true,
                            color: "#fff",
                            formatter: function(params, t) {
                                var cityName = params.name;
                                var cid = option.cityId[params.name],
                                    zs = option.series,
                                    len = zs.length;
                                var total = 0;
                                for (var i = 0; i < len; i++) {
                                    total += zs[i].data[cid].value[2];
                                }
                                return "\n\n\n\n\n\n受灾总面积：" + total;
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },

                series: [{
                        name: '气象灾害',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([{
                                name: '六桶镇',
                                value: randomData()
                            },
                        ]),
                        symbol: 'circle',
                        symbolSize: function(value, params) {
                            var r = value[2] / 50;
                            return r > 5 ? r > 20 ? 20 : r : 5;
                        },
                        symbolOffset: [0, 0],
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#f34a4a"
                            },
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '地质灾害',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([{
                                name: '六桶镇',
                                value: randomData()
                            },
                        ]),
                        symbol: 'circle',
                        symbolSize: function(value, params) {
                            var r = value[2] / 50;
                            return r > 5 ? r > 20 ? 20 : r : 5;
                        },
                        symbolOffset: ['-20px', '20px'],
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#ffd730"
                            },
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '病害',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([{
                                name: '六桶镇',
                                value: randomData()
                            },
                        ]),
                        symbol: 'circle',
                        symbolSize: function(value, params) {
                            var r = value[2] / 50;
                            return r > 5 ? r > 20 ? 20 : r : 5;
                        },
                        symbolOffset: ['10px', '-15px'],
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#8cffd1"
                            },
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '虫害',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([{
                                name: '六桶镇',
                                value: randomData()
                            },
                        ]),
                        symbol: 'circle',
                        symbolSize: function(value, params) {
                            var r = value[2] / 50;
                            return r > 5 ? r > 20 ? 20 : r : 5;
                        },
                        symbolOffset: ['-20px', '-10px'],
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#2a8abc"
                            },
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '其他',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([{
                                name: '六桶镇',
                                value: randomData()
                            },

                        ]),
                        symbol: 'circle',
                        symbolSize: function(value, params) {
                            var r = value[2] / 50;
                            return r > 5 ? r > 20 ? 20 : r : 5;
                        },
                        symbolOffset: ['15px', '15px'],
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#067311"
                            },
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([{
                                name: '六桶镇',
                                value: 0
                            },

                        ]),
                        symbol: 'circle',
                        symbolSize: 1,
                        symbolOffset: [0, 0],
                        label: {
                            normal: {
                                show: true,
                                color: "#fff",
                                offset: [30, 0],
                                formatter: function(params) {
                                    return params.name;
                                }
                            },
                            emphasis: {
                                show: true,
                                color: "#fff",
                                offset: [30, 0]
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#f34a4a"
                            },
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    }
                ]
            }

            echarts.registerMap('XW', XwByMapJson);
            this.chart = echarts.init(this.$refs.myEchart);
            this.chart.setOption(option);    
       }
    },
    watch: {
    }
}

</script>
