<template>
    <e-charts :options="options" style="width:750px;height:600px;"  />
</template>

<script>

import { getPipeDefectData } from "./api";
export default {
    routerDepth: 0,
    meta: { nvPermission: false },
    name:'PipeDefect',   
    data(){
        return {
            
            options: {
                //backgroundColor: "#031845",
                //color: ['#2edfa3', '#bce672', '#ff4777', '#70f3ff', '#4b5cc4', '#f47983', '#8d4bbb', '#6635EF', '#FFAFDA'],
                //color:['#0066EA','#00D6FF','#00C9D0','#FE5C00','#F9AB00','#FFE700'],
                //color:['#BBF1FF','#88E7FF','#11CFFF','#00B1DD','#8C8CFB','#DEDEFE','#8F8FB4','#52527A','#666699','#09F7F7'],
                //color:['#4A9AFF','#7082FF','#CE94FF','#FF8282','#FFCC6E','#EDFF9E','#9EFF79','#63FDD9','#8EDDFF','#11B7F9','FFB66E'],
                color:[ 'rgba(74,154,255,0.7)','rgba(112,130,255,0.7)','rgba(206,148,255,0.7)',
                        'rgba(255,130,130,0.7)','rgba(255,204,110,0.7)','rgba(237,255,158,0.7)',
                        'rgba(158,255,121,0.7)','rgba(99,253,217,0.7)','rgba(142,221,255,0.7)',
                        'rgba(17,183,249,0.7)','rgba(255,182,110,0.7)'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [{
                        name: '缺陷类型',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '68%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#fff',
                                    fontWeight: 'normal',
                                    fontSize: 16
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: []
                    },
                    {
                        name: '缺陷类型 ',
                        type: 'pie',
                        radius: ['70%', '72%'],
                        label: {
                            normal: {
                                formatter: '{b|{b}}\n{hr|}\n{d|{d}%}',
                                rich: {
                                    b: {
                                        fontSize: 16,
                                        color: '#fff',
                                        align: 'left',
                                        padding: 4
                                    },
                                    hr: {
                                        borderColor: '#12EABE',
                                        width: '100%',
                                        borderWidth: 2,
                                        height: 0
                                    },
                                    d: {
                                        fontSize: 16,
                                        color: '#fff',
                                        align: 'left',
                                        padding: 4
                                    },
                                    c: {
                                        fontSize: 16,
                                        color: '#fff',
                                        align: 'center',
                                        padding: 4
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 20,
                                length2: 20,
                                lineStyle: {
                                    type: 'dashed',
                                    width: 2
                                }
                            }
                        },
                        data: []
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
            getPipeDefectData().then(({data}) => {
                if(data){
                    self.options.series[0].data = data;
                    self.options.series[1].data = data;
                 }
            }).catch(err => {
               console.log(err);
            });
        }
    }
}
</script>

