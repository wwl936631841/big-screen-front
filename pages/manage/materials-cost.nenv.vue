<template>
    <e-charts :options="options"/>
</template>

<script>

import { getMaterialsCostData } from "./api";
export default {
    routerDepth: 0,
    meta: { nvPermission: false },
    name:'MaterialsCost',   
    data(){
        return {
            scale: 1,
            rich : {
                yellow: {
                    color: "#ffc72b",
                    fontSize: 16,
                    padding: [5, 4],
                    align: 'center'
                },
                total: {
                    color: "#ffc72b",
                    fontSize: 32 ,
                    align: 'center'
                },
                white: {
                    color: "#fff",
                    align: 'center',
                    fontSize: 16,
                    padding: [5, 0]
                },
                blue: {
                    color: '#49dff0',
                    fontSize: 16,
                    align: 'center'
                },
                hr: {
                    borderColor: '#0b5263',
                    width: '100%',
                    borderWidth: 1,
                    height: 0
                }
            },
            options: {}
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            const self = this;
            getMaterialsCostData().then(({data}) => {
                 if(data){
                     let echartData = data;
                     
                     self.options = {
                        //backgroundColor: '#031f2d',
                        title: {
                            text:'物资总花费',
                            left:'center',
                            top:'53%',
                            padding:[14,0],
                            textStyle:{
                                color:'#fff',
                                fontSize:18*this.scale,
                                align:'center'
                            }
                        },
                        legend: {
                            selectedMode:false,
                            formatter: function(name) {
                                var total = 0; 
                                var averagePercent; 
                                echartData.forEach(function(value, index, array) {
                                    total += value.value;
                                });
                                return '{total|' + total + '}';
                            },
                            data: [echartData[0].name],
                            left: 'center',
                            top: 'center',
                            icon: 'none',
                            align:'center',
                            textStyle: {
                                color: "#fff",
                                fontSize: 40,
                                rich: this.rich
                            },
                        },
                        series: [{
                            name: '总花费',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            hoverAnimation: false,
                            //color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
                            color:[ 'rgba(74,154,255,0.7)','rgba(112,130,255,0.7)','rgba(206,148,255,0.7)',
                                    'rgba(255,130,130,0.7)','rgba(255,204,110,0.7)','rgba(237,255,158,0.7)',
                                    'rgba(158,255,121,0.7)','rgba(99,253,217,0.7)','rgba(142,221,255,0.7)',
                                    'rgba(17,183,249,0.7)','rgba(255,182,110,0.7)'],
                            label: {
                                normal: {
                                    formatter: function(params, ticket, callback) {
                                        var total = 0; //花费
                                        var percent = 0; //占比
                                        echartData.forEach(function(value, index, array) {
                                            total += value.value;
                                        });
                                        percent = ((params.value / total) * 100).toFixed(1);
                                        return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                                    },
                                    rich: this.rich
                                },
                            },
                            labelLine: {
                                normal: {
                                    length: 40 * this.scale,
                                    length2: 0,
                                    lineStyle: {
                                        color: '#0b5263'
                                    }
                                }
                            },
                            data: echartData
                        }]
                    }
                 }
            }).catch(err => {
               console.log(err);
            });
        }
    }
}
</script>

