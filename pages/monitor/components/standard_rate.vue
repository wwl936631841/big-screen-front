<!-- 水质目标达标率 -->
<template>
    <!--<e-charts :options="options" style="width:780px;height:340px;" />-->

    <home-block title="水质目标季度达标率"  width="595px">
        <div class="tp">
                   {{title}}
         </div>
         <e-charts :options="options" style="width:780px;height:300px;top:-10px;"   />
    </home-block>
</template>

<script>
import echarts from "echarts";
import {getTargetStandardRate} from './api'
export default {
    meta: { nvPermission: false },
    name:'StandardRate',   
    data(){
        return {
            title: '',
            options: {
                tooltip: {
                    show: false,
                },
                toolbox: {
                    show: false,
                },
                title: [],
                // color : ['#3dd4de','#b697cd','#a6f08f'],
                //backgroundColor: 'rgba(0,0,0,0.8)',
                series: []
            },
            title: {
                text: '桂畔海主河道',
                x: '20%',
                y: '73%',
                textAlign: 'center',
                textStyle: {
                    fontSize: 22
                }
            },
            singlePie: {
                name: 'Pie1',
                type: 'pie',
                clockWise: false,
                radius: [70, 85],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        shadowBlur: 40,
                        shadowColor: 'rgba(40, 40, 40, 0.5)',
                    }
                },
                hoverAnimation: false,
                center: ['25%', '50%'],
                roseType: false,
                data: [{
                    text:'aaa',
                    value: 33,
                    label: {
                        normal: {
                            formatter: '{d}%',
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'normal',
                                color: '#3dd4de'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#3dd4de',
                            shadowColor: '#3dd4de',
                            shadowBlur: 40
                        }
                    }
                }, {
                    value: 67,
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            //color: 'rgba(216,216,216,1)', // 未完成的圆环的颜色
                            color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        emphasis: {
                            color: 'rgba(216,216,216,1)' // 未完成的圆环的颜色
                        }
                    },
                }
            
                
                ],
            }
        }
    },
    created(){
        this.getStandarRate()
    },
    methods:{
        getStandarRate() {
            let series = [];
            let titles = [];
            getTargetStandardRate().then(({data}) => {
                let index = 0;
                let rates = data.rates;
                for (let item of data.names) {
                    let pie = JSON.parse(JSON.stringify(this.singlePie));
                    let singleTitle = JSON.parse(JSON.stringify(this.title));
                    let currentRate = rates[index]
                    pie.name = item
                    singleTitle.text = item
                    pie.data[0].name = item
                    pie.data[0].value = currentRate[0]
                    if (index == 0) {
                        singleTitle.x = '19%'
                        pie.center = ['20%', '43%']
                    } else if (index == 1) {
                        pie.center = ['50%', '43%']
                        singleTitle.x = '49%'
                    } else {
                        pie.center = ['80%', '43%']
                        singleTitle.x = '79%'
                    } 
                    
                    pie.data[1].value = currentRate[1]
                    series.push(pie)
                    titles.push(singleTitle)
                    index++;
                }
                this.options.series = series;
                this.options.title = titles;
                this.title = data.title;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.tp{
                    margin: 30px auto;
                    margin-bottom: 0;
                    width: 400px;
                    height: 40px;
                    //background-color: rgb(54, 54, 54);
                    display: flex;
                    justify-content: space-around;
                    >div{
                        color: #b7b2b2;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 25px;
                    }
                }
</style>