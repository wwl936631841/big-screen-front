<template>
    <div style="display: flex;">
        <div id="leftEchart">
            <nv-liquidfill-echart id="liquidfill-echart1" style="width:260px;height:260px;" :option="option1" :data="[waterEvaluteScore.SCORE/100]" />
            <p>水质考核</p>
            <span>
                {{waterEvaluteScore.SCORE_YEAR}}年
                {{ waterEvaluteScore.SCORE_QUARTER }}
                水质考核得分：<i style="font-style:normal;font-size:14px;color:#3B8CFF">
                {{waterEvaluteScore.SCORE}}
                分</i> 
            </span>
        </div>
        <div id="rightEchart">
            <nv-liquidfill-echart id="liquidfill-echart2" style="width:260px;height:260px;"  :option="option2" :data="[runEvaluteScore.SCORE/100]" />
            <p>运营考核</p>
                <span>
                {{ runEvaluteScore.SCORE_YEAR }}年
                {{ runEvaluteScore.SCORE_QUARTER }}
                运营考核得分：<i style="font-style:normal;font-size:14px;color:#3B8CFF">
                {{runEvaluteScore.SCORE}}
                分</i> 
            </span>
        </div>
    </div>    
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
            option1:{
                series: [{
                    type: 'liquidFill',
                    data: [0.5],
                    radius: '90%',
                    label: {
                        normal: {
                            formatter: function(params) {
                                return   params.value*100  + '分';
                            },
                            textStyle: {
                                color: '#4C3895',
                                insideColor: 'yellow',
                                fontSize: 20
                            }
                        }
                    } , 
                    backgroundStyle: {
                        color: '#4F588A',
                        borderColor: '#858FAB',
                        borderWidth: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                    },
                    outline: {
                        show: false
                    },
                    color:['#4A7EFF'],
                }]            
            },
            option2:{
                series: [{
                    type: 'liquidFill',
                    data: [0.5],
                    radius: '90%',
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
                        
                        borderColor: '#66BEFF',
                        borderWidth: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                    
                    },
                    outline: {
                        show: false
                    },
                    color:['#66BEFF'],
                }]            
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
