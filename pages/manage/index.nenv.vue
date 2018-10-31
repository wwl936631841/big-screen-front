<template>
    <div class="bg">
        <div class="left">
            <div class="top">
                <p class="title">
                    巡检统计
                </p>
                <patrol-statistics style="width:90%;height:80%; position: absolute;left: 65px;top: 70px;"/>
            </div>
            <div class="bottom">
                <div class="box1">
                    <div class="title">物资花费统计</div>
                    <materials-cost style="width:100%;height:85%; position: absolute;left: 15px;top: 65px;"/>
                </div>
                <div class="box2">
                    <div class="title">应急事件</div>
                    <emergency-statistics style="width:100%;height:80%; position: absolute;left: 0px;top: 75px;"/>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="title">
                巡检养护任务 共计：
                <span class="count">{{totalPatrolCnt}}</span>
                条
            </div>
            <patrol-analsis style="width:100%;height:92%; position: absolute;left: 0px;top: 80px;" @setTotalPatrolCnt="setTotalPatrolCnt"/>
        </div>
        <div class="right">
            <div class="top">
                <p class="title">
                    信访投诉
                </p>
                <complain-statistics style="width:85%;height:80%; position: absolute;left: 90px;top: 75px;"/>
            </div>
            <div class="bottom">
                <div class="box1">
                    <div class="title">绩效考核</div>
                    <evaluate-statistics style="width:100%;height:100%; position: absolute;left: 20px;top: 0px;"/>
                </div>
                <div class="box2">
                    <div class="title">管网缺陷分析</div>
                    <pipe-defect style="width:100%;height:80%; position: absolute;left: 0px;top: 75px;"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PatrolStatistics from './patrol-statistics.nenv'
import MaterialsCost from './materials-cost.nenv'
import EmergencyStatistics from './emergency-statistics.nenv'
import PatrolAnalsis from './patrol-analsis.nenv'
import ComplainStatistics from './complain-statistics.nenv'
import EvaluateStatistics from './evaluate-statistics.nenv'
import PipeDefect from './pipe-defect.nenv'

export default {
    routerDepth: 0,
    name:'ManageIndex',
    meta: { nvPermission: false },
    components:{PatrolStatistics,MaterialsCost,EmergencyStatistics,PatrolAnalsis,ComplainStatistics,EvaluateStatistics,PipeDefect},

    data(){
        return {
            totalPatrolCnt:0
        }
    },
    created() {
        //console.log(this.$refs.patrolAnalsis.name);
    },
    methods:{
        setTotalPatrolCnt(val){
            this.totalPatrolCnt = val || 0;
        }

    }
    
}
</script>
<style lang="scss" scoped>
    .bg{
        // position: relative;
        display: flex;
        justify-content: center;
        width: 3840px;//1920px; 
        height: 1040px;//570px;
        // background: url("../../static/img/Group@2x.png");
        background-size: cover;
        .left{
            // position: absolute;
            // bottom: 22px;
            // left: 50px;
            padding-top: 40px;
            .top,.bottom{
                width: 1232px;//616px;
                height: 472px;//236px;
            }
            .top{
                margin-bottom:24px;
                background: url('../../static/img/Group 2@2x.png');
                background-size: cover;
                position: relative;
                >p{
                    margin: 0;
                    position: absolute;
                    color: #fff;
                    font-size: 32px;
                    left: 60px;
                    top: 20px;
                }
            }
            .bottom{
                background: url('../../static/img/Path 392@2x.png');
                background-size: cover;
                display: flex;
                .box1,.box2{
                    flex:1;
                    width: 50%;
                    height: 100%;
                    position: relative;
                    .title{
                        width: 216px;//108px;
                        height: 64px;//32px;
                        background: url('../../static/img/Group 351@2x.png');
                        background-size: cover;
                        position: absolute;
                        font-size: 28px;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        left: 31px;
                        top: 13px;
                    }
                }
            }
        }
        .center{
            margin-top: 80px;
            width: 1204px;//602px;
            height: 922px;//461px;
            background: url('../../static/img/Path 391@2x.png');
            background-size: cover;
            position: relative;
            .title{
                width: 598px;//299px;
                height: 72px;//36px;
                margin-left: 50%;
                transform: translateX(-50%);
                background: url('../../static/img/Rectangle1@2x.png');
                background-size: cover;
                color: #fff;
                font-size: 28px;
                display: flex;
                justify-content: center;
                align-items: center;
                .count{
                    background: rgba(119, 227, 244,.5);
                    padding: 5px 10px;
                    margin: 0 30px;
                }
            }
        }
        .right{
            padding-top: 30px;
            .top,.bottom{
                width: 1272px;//636px;
                height: 474px;//237px;
            }
            .top{
                position: relative;
                margin-bottom:24px;
                background: url('../../static/img/Group 7@2x.png');
                background-size: cover;
                >p{
                    margin: 0;
                    position: absolute;
                    color: #fff;
                    font-size: 32px;
                    right: 60px;
                    top: 20px;
                }
            }
            .bottom{
                background: url('../../static/img/Path 39@2x.png');
                background-size: cover;
                display: flex;
                .box1,.box2{
                    flex:1;
                    width: 50%;
                    height: 100%;
                    position: relative;
                    .title{
                        width: 216px;//108px;
                        height: 64px;//32px;
                        background: url('../../static/img/Group 351@2x.png');
                        background-size: cover;
                        position: absolute;
                        font-size: 28px;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        left: 31px;
                        top: 13px;
                    }
                }
            }
        }
    }
</style>

