<template>
    <e-charts :options="options"/>
</template>

<script>

import { getEvaluateStatisticsData } from "./api";
export default {
    routerDepth: 0,
    meta: { nvPermission: false },
    name:'EvaluateStatistics',   
    data(){
        return {
            waterEvaluteScore:{
                SCORE: 0,
                SCORE_QUARTER: "",
                SCORE_YEAR: ""
            },
            runEvaluteScore:{
                SCORE: 0,
                SCORE_QUARTER: "",
                SCORE_YEAR: ""
            },
            
            options:{
                backgroundColor: '#222939',
                series: (function() {
                    var highlight = '#03b7c9';
                    var result = [];
                    var evaluateData = [{ name: '', value: 0, unit: '分', pos: ['30%', '50%'], range: [0, 100] },
                                        { name: '', value: 0, unit: '分', pos: ['75%', '50%'], range: [0, 100] }];
                    evaluateData.forEach(function(item) {
                        result.push(
                            // 外围刻度
                            {
                                type: 'gauge',
                                center: item.pos,
                                radius: '40%',  // 1行3个
                                splitNumber: item.splitNum || 10,
                                min: item.range[0],
                                max: item.range[1],
                                startAngle: 225,
                                endAngle: -45,
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        width: 2,
                                        shadowBlur: 0,
                                        color: [
                                            [1, highlight]
                                        ]
                                    }
                                },
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: highlight,
                                        width: 1
                                    },
                                    length: -5,
                                    splitNumber: 10
                                },
                                splitLine: {
                                    show: true,
                                    length: -14,
                                    lineStyle: {
                                        color: highlight,
                                    }
                                },
                                axisLabel: {
                                    distance: -20,
                                    textStyle: {
                                        color: highlight,
                                        fontSize: '14',
                                        fontWeight: 'bold'
                                    }
                                },
                                pointer: {
                                    show: 0
                                },
                                detail: {
                                    show: 0
                                }
                            },
                            
                            // 内侧指针、数值显示
                            {
                                name: item.name,
                                type: 'gauge',
                                center: item.pos,
                                radius: '40%',
                                startAngle: 225,
                                endAngle: -45,
                                min: item.range[0],
                                max: item.range[1],
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        width: 16,
                                        color: [
                                            [1, 'rgba(255,255,255,.1)']
                                        ]
                                    }
                                },
                                axisTick: {
                                    show: 0,
                                },
                                splitLine: {
                                    show: 0,
                                },
                                axisLabel: {
                                    show: 0
                                },
                                pointer: {
                                    show: true,
                                    length: '105%'
                                },
                                detail: {
                                    show: true,
                                    offsetCenter: [0, '100%'],
                                    textStyle: {
                                        fontSize: 20,
                                        color: '#fff'
                                    },
                                    formatter: [
                                        '{value} ' + (item.unit || ''),
                                        '{name|' + item.name + '}'
                                    ].join('\n'),
                                    rich: {
                                        name: {
                                            fontSize: 14,
                                            lineHeight: 30,
                                            color: '#ddd'
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: highlight,
                                    }
                                },
                                data: [{
                                    value: item.value
                                }]
                            }
                        );
                    });
                    
                    return result;
                })()
            }
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            const self = this;
            getEvaluateStatisticsData().then(({data}) => {
                 if(data){
                    self.runEvaluteScore = data.runEvaluteScore;
                    self.waterEvaluteScore = data.waterEvaluteScore;
                 }
            }).catch(err => {
               console.log(err);
            });
        }
    }
}
</script>


<style lang="scss" scoped>
#leftEchart{
    text-align: center;
    margin-top: 69px;
    flex: 1;
    >p{
        font-size: 24px;
        margin: 0;
        color: #666;
    }
    span{
        display: block;
        margin: 34px auto;
        width: 179px;
        height: 56px;
        font-size: 14px;
        padding: 8px 10px;
        box-sizing: border-box;
        background: #DFEDFF;
        border: 1px solid #ccc;
        border-radius: 4px;
        line-height: 20px;
        color: #666;
    }
    >div{
        margin: 0 auto;
    }
}
#rightEchart{
    flex: 1;
    text-align: center;
    margin-top: 69px;
    >p{
        font-size: 12px;
        margin: 0;
        color: #666;
    }
    span{
        display: block;
        margin: 34px auto;
        width: 179px;
        height: 56px;
        font-size: 14px;
        padding: 8px 10px;
        box-sizing: border-box;
        background: #DFEDFF;
        border: 1px solid #ccc;
        border-radius: 4px;
        line-height: 20px;
        color: #666;
    }
    >div{
        margin: 0 auto;
    }
}
</style>
