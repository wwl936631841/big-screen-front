<!-- 站点分布 -->
<template>
     <e-charts :options="option" style="width:770px;height:550px;left:35px;"  />
</template>

<script>
import echarts from "echarts";
import * as d3 from 'd3';  
import { getQualitySites } from "./api";
export default {
    meta: { nvPermission: false },
    name:'Site',   
    data(){
        return {
            data : {
                name: "站点分布",
                children: []
            },


            baseArray : [],
            signArray : [],
            recordArray : [],

            option : {
                //backgroundColor: "#0c1b3e",
                title: {
                    text: "",
                    textStyle: {
                        color: "rgba(164, 159, 159, 0.21)",
                        fontSize: 32,
                        fontFamily: "微软雅黑",
                        fontWeight: "normal"
                    },
                    right: 10,
                    bottom: 10
                },
                xAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                tooltip: {
                    //backgroundColor: "rgba(50,50,50,0.95)",
                    formatter: function(params) {
                        var size = ("" + params.value[3]).replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,");
                        var add = ("" + params.value[4]).replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,");
                        var result = "<span>" + params.value[2] + "</span><br>" +
                            "<span style = 'line-height:30px;font-size : 25px; font-weight:bold;'>" + size + "</span></br>" +
                            "<div>" +
                            "<div style = 'float : left; padding-right:20px; border-right: solid 1px #4c4a4a;'>" +
                            "<span >正常</span></br>" +
                            "<span style = 'color : green; '>" + add + "</span>" +
                            "</div>" +
                            "<div style = 'float : right; margin-left:20px;'>" +
                            "<span style = 'width : 100px;'>异常</span></br>";
                        if (params.value[5] > 0) {
                            result += "<span style = 'color : red;  width : 100px;'>+" + params.value[5] + "</span>"
                        } else {
                            result += "<span style = 'color : red;  width : 100px;'>" + params.value[5] + "</span>"
                        }
                        result += "</div>" +
                            "</div>";
                        return result;
                    }
                },
                series: {
                    type: "custom",
                    renderItem: null,
                    data: null
                }
            }
        }
    },
    mounted(){
        this.getList();
        
    },
    methods:{
        getList(){
            const self = this;
            getQualitySites({
     
            }).then(({data}) => {
                 if(data){  
                    self.data.children = data.children;
                   self.baseArray = data.baseArray;
                   self.signArray = data.signArray;
                   self.recordArray = data.recordArray;
                   this.getData();
                 }
            }).catch(err => {
               console.log(err);
            });
            /*************/
            
        },

        getData(){
            const self = this;
            //配色
            var getFillColor = function(nodeName, isLeaf) {
            var fill = {};
            var baseArray = self.baseArray;
            var signArray = self.signArray;
            var recordArray = self.recordArray;


                if (baseArray.includes(nodeName)) {
                //if ($.inArray(nodeName, baseArray) != -1) {
                    if (isLeaf) {
                        fill.fillColor = {
                            type: "radial",
                            x: 10.9,
                            y: 10.9,
                            r: 10.9,
                            colorStops: [{
                                    offset: 0,
                                    color: "#626815" // 0% 处的颜色
                                },
                                /* {
                                                        offset: 0.7, color: "#7b8013" // 100% 处的颜色
                                                    },*/
                                {
                                    offset: 1,
                                    color: "#a9aa0e" // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        };
                        fill.borderColor = "rgba(182, 184,30, 1)";
                        fill.borderWidth = 2;

                        fill.emphasisFillColor = {
                            type: "radial",
                            x: 0.6,
                            y: 0.6,
                            r: 0.6,
                            colorStops: [{
                                offset: 0,
                                color: "#a7ac0e" // 0% 处的颜色
                            }, {
                                offset: 0.5,
                                color: "#babc0c" // 50% 处的颜色
                            }, {
                                offset: 1,
                                color: "#f6f701" // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        };
                        fill.emphasisBorderColor = "#f6f701";
                        fill.emphasisborderWidth = 2;
                    } else {
                        fill.fillColor = "rgba(156,156,14,0.1)";
                        fill.borderColor = "rgba(64,67,34,1)";
                        fill.borderWidth = 1;
                        fill.emphasisFillColor = "rgba(156,156,14,0.1)";
                        fill.emphasisBorderColor = "rgba(64,67,34,1)";
                        fill.emphasisborderWidth = 3;
                    }
                //} else if ($.inArray(nodeName, signArray) != -1) {
                  } else if (signArray.includes(nodeName)) {
                    if (isLeaf) {
                        fill.fillColor = {
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                    offset: 0,
                                    color: "#4e0435" // 0% 处的颜色
                                },
                                /* {
                                                        offset: 0.5, color: "#730c50" // 100% 处的颜色
                                                    },*/
                                {
                                    offset: 1,
                                    color: "#84085a" // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        };
                        fill.borderColor = "rgba(154, 14, 109, 1)";
                        fill.borderWidth = 2;
                        fill.emphasisFillColor = {
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0,
                                color: "#ae0876" // 0% 处的颜色
                            }, {
                                offset: 0.5,
                                color: "#cd0a8b" // 50% 处的颜色
                            }, {
                                offset: 1,
                                color: "#f505a4" // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        };
                        fill.emphasisBorderColor = "#f505a4";
                        fill.emphasisborderWidth = 3;
                    } else {
                        fill.fillColor = "rgba(130, 10, 88, 0.18)";
                        fill.borderColor = "rgba(77, 15, 75, 1)";
                        fill.borderWidth = 1;
                        fill.emphasisFillColor = "rgba(130, 10, 88, 0.18)";
                        fill.emphasisBorderColor = "rgba(77, 15, 75, 1)";
                        fill.emphasisborderWidth = 3;
                    }
                } else {
                    if (isLeaf) {
                        fill.fillColor = {
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0,
                                color: "#034e61" // 0% 处的颜色
                            }, {
                                offset: 0.7,
                                color: "#086b87" // 70% 处的颜色
                            }, {
                                offset: 1,
                                color: "#068ca3" // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        };
                        fill.borderColor = "#03a1b3";
                        fill.borderWidth = 2;
                        fill.emphasisFillColor = {
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0,
                                color: "#0a7998" // 0% 处的颜色
                            }, {
                                offset: 0.7,
                                color: "#0b9ec8" //70% 处的颜色
                            }, {
                                offset: 1,
                                color: "#09c2f6" // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        };
                        fill.emphasisBorderColor = "#09c2f6";
                        fill.emphasisborderWidth = 1;
                    } else {
                        fill.fillColor = "rgba(0, 252, 255, 0.1)";
                        fill.borderColor = "rgba(11, 72, 115, 1)";
                        fill.borderWidth = 1;
                        fill.emphasisFillColor = "rgba(0, 252, 255, 0.1)";
                        fill.emphasisBorderColor = "rgba(11, 72, 115, 1)";
                        fill.emphasisborderWidth = 3;
                    }
                }
                return fill;
            };

            //渲染函数
            self.option.series.renderItem = function(params, api) {
                var fillObj = getFillColor(api.value(2), api.value(9));
                var textPosition = "inside";
                if (!api.value(9)) {
                    if (api.value(1) == 1) {
                        if (api.value(6) > api.getWidth() / 2) {
                            textPosition = "right";
                        } else {
                            textPosition = "left";
                        }
                    } else {
                        textPosition = "top";
                    }
                }
                return {
                    type: "circle",
                    shape: {
                        cx: api.value(6),
                        cy: api.value(7),
                        r: api.value(8)
                    },
                    z2: api.value(1) * 2,
                    style: api.style({
                        stroke: fillObj.borderColor,
                        fill: fillObj.fillColor,
                        textPosition: textPosition,
                        lineWidth: fillObj.borderWidth
                            //text: nodeName,
                            // textFont: textFont,
                            // textDistance : itemLayout.r,
                    }),
                    styleEmphasis: api.style({
                        textPosition: textPosition,
                        stroke: fillObj.emphasisBorderColor,
                        fill: fillObj.emphasisFillColor,
                        lineWidth: fillObj.emphasisborderWidth
                    })
                };
            };

            var root = d3.hierarchy(self.data)
                .sum(function(d) {
                    return d.size;
                })
                .sort(function(a, b) {
                    return b.value - a.value;
                });
            d3.pack()
                .size([800 - 2, 480 - 2])
                .padding(0.5)(root);
            var maxDepth = 0;
            var nodeAll = root.descendants();
            var nodes = nodeAll.filter(function(it) {
                return it.parent;
            });

            //获取各圆相关数据
            self.option.series.data = nodes.map(function(node) {
                maxDepth = Math.max(maxDepth, node.depth);
                var color = "#ffffff";
                node.isLeaf = !node.children || !node.children.length;
                if (node.depth == 1) {
                    switch (node.data.name) {
                        case "工情站点":
                            color = "rgba(218, 22, 158, 1)";
                            break;
                        case "水雨情站点":
                            color = "rgba(156,156,14,1)";
                            break;
                        case "水质站点":
                            color = "rgba(14, 149, 156, 1)";
                            break;
                    }
                    return {
                        value: [
                            node.value,
                            node.depth,
                            node.data.name,
                            node.data.size,
                            node.data.add,
                            node.data.rate,
                            node.x,
                            node.y,
                            node.r,
                            node.isLeaf
                        ],
                        label: {
                            normal: {
                                show: true,
                                color: color,
                                formatter: function(params) {
                                    return "{type|" + params.value[2] + "}\n{numAll|" + params.value[3] + "}\n{rate|异常站点：" + params.value[5] + "}";
                                },
                                rich: {
                                    type: {
                                        fontSize: 14,
                                        color: color
                                    },
                                    numAll: {
                                        fontSize: 28,
                                        padding: [5, 0, 5, 0],
                                        color: color
                                    },
                                    add: {
                                        fontSize: 14,
                                        color: color
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (node.data.name == "工情站点" ) {
                        color = "rgba(222, 0, 155,1)";
                    }
                    return {
                        value: [
                            node.value,
                            node.depth,
                            node.data.name,
                            node.data.size,
                            node.data.add,
                            node.data.rate,
                            node.x,
                            node.y,
                            node.r,
                            node.isLeaf
                        ],
                        label: {
                            normal: {
                                show: true,
                                color: color,
                                position: "inside",
                                formatter: function(params) {
                                    var result = "";
                                    var nodeName = params.value[2];
                                    if (params.value[9]) {
                                        if (params.value[8] > 10) {
                                            var trunText = echarts.format.truncateText(nodeName, 2 * params.value[8], {
                                                fontSize: 14,
                                                fontFamily: "微软雅黑"
                                            }, '.');
                                            result += "{type|" + nodeName + "}";
                                            if (params.value[8] > 45) {
                                                result += "\n{num|" + params.value[3] + "}";
                                            }
                                        }
                                    } else {
                                        result += "{type|" + params.value[2] + "}";
                                    }
                                    return result;
                                },
                                rich: {
                                    type: {
                                        fontSize: 12,
                                        padding: [5, 0, 5, 0],
                                        color: color
                                    },
                                    num: {
                                        fontSize: 16,
                                        color: color
                                    }
                                }
                            }
                        }
                    }
                }
            });

        }
    }
}
</script>

