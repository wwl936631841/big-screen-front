<template>
    <!--水滴球echart -->
    <div :id='id' style="width:110px;height:110px;" />
</template>
<script>
import nvInpterMixins from 'nenv/mixins/inputerMixins'
import Echart from 'echarts'
import 'echarts-liquidfill'
export default {
    name:'NvLiquidfillEchart',
    mixins: [nvInpterMixins],
    props:{
       option:{
           type:Object
       },
       id:{
           type:String,
           default:'echarts-liquidfill'
       },
       data:{
           type:Array
       }
    },
    mounted(){
        const self = this;
        let _chart = Echart.init(document.getElementById(this.id));
         
        if(!this.option){
            _chart.setOption({
                            series: [{
                                type: 'liquidFill',
                                data:self.data,
                                radius: '80%',
                                label: {

                                    normal: {
                                        formatter: function(params) {
                                            return   params.value*100  + '分';
                                        },
                                        textStyle: {
                                            //color: 'red',
                                            insideColor: 'yellow',
                                            fontSize: 20
                                        }
                                    }
                                } , 
                                backgroundStyle: {
                                    
                                    borderColor: '#2869FF',
                                    borderWidth: 5,
                                    shadowColor: 'rgba(0, 0, 0, 0.4)',
                                    shadowBlur: 10
                                },
                                outline: {
                                    show: false
                                },
                                color:['#2869FF','#2996FF'],
                            }]            
         });
        }else{
            this.option.series[0].data = this.data;
            _chart.setOption(this.option);
        }
        

    },

    watch:{
        data(val){
            if(val){
                const self = this;
                let _chart = Echart.init(document.getElementById(this.id));
                this.option.series[0].data = this.data;
                _chart.setOption(this.option);
            }
        }
    }
}
</script>
