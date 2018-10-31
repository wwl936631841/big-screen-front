<!-- 监测指标分析 -->
<template>
    <e-charts :options="gauge" style="width:600px;height:360px;" />
</template>

<script>
import echarts from "echarts";
import {getQualityQuarterProject} from './api'
export default {
    meta: { nvPermission: false },
    name:'MonitorIndex',   
    data(){
        return {
            gauge:  {
                tooltip: {
                    trigger: 'axis'
                },
                
                radar: {
                    name: {
                        textStyle: {
                            //color: '#fff',
                            //backgroundColor: '#999',
                            //borderRadius: 3,
                            //padding: [1, 2],
                            fontSize: 22
                        }
                    },
                    indicator: [],
                    center: ['50%','50%'],
                    radius: 130
                },
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [
                            {
                                value: [],
                                name: ''
                            }
                        ]
                    }
                ]
            }
            

        }
    },
    created(){
        this.getQualityProject()
    },
    methods:{
        getQualityProject() {
             const self = this
             getQualityQuarterProject().then(({data}) => {
                 console.log(this.singleSerie)
                 if (data) {
                    self.gauge.radar.indicator = data.radar_indicator || null
                    self.gauge.series[0].data[0].value = data.series_data.value;
                    self.gauge.series[0].data[0].name = data.series_data.name;
                 }
             })
        }
    }
}
</script>

