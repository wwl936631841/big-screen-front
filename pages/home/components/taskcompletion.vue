<template>
        <e-charts :options="options" />
</template>

<script>

import { taskCompletionStatistics } from "./api";
export default {
    name:'TaskCompletion',   
    data(){
        return {
            options: {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}%"
                    },

                    series: [
                        {
                            name: '任务',
                            type: 'gauge',
                            detail: {formatter:'{value}%'},
                            data: [{value: 75, name: '完成率'}]
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
            taskCompletionStatistics().then(({data}) => {
                 if(data){
                     this.options.series[0].data[0].value = data ;
                 }
               
            }).catch(err => {
               console.log(err);
            });
        }
    }
}
</script>

