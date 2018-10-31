<template>
    <div class="bg">
        <div class="left">
            <div class="top" >
                <p class="title">
                     实时水质
                </p>
               <!-- <div class="tp">
                    <div><el-button type="primary" plain></el-button>&nbsp; COD</div>
                    <div><el-button type="success" plain></el-button>&nbsp; 氨氮</div>
                    <div><el-button type="info" plain></el-button>&nbsp; 浊度</div>
                    <div><el-button type="warning" plain></el-button>&nbsp; 溶解度</div>
                </div>-->
                <realtime-quality></realtime-quality>
            </div>
            <div class="bottom">
                <p class="title">
                   河涌水质月分析
                </p>
                <!--<div class="tp">
                    <div><el-button type="primary" plain></el-button>&nbsp; COD</div>
                    <div><el-button type="success" plain></el-button>&nbsp; 氨氮</div>
                    <div><el-button type="info" plain></el-button>&nbsp; 浊度</div>
                    <div><el-button type="warning" plain></el-button>&nbsp; 溶解度</div>
                </div>
                <span class="time">2018-10-18</span> -->
                 <river-quality></river-quality>
            </div>
        </div>
        <div class="center">
            <div class="top">
                <div class="left">
                    <p class="title">
                        水质级别
                    </p>
                    <div>
                        <level></level>
                    </div>
                </div>
                <div class="center">
                    <p class="title">
                        水质目标达标率
                    </p>
                    <div >
                        <standard-rate></standard-rate>
                    </div>
                </div>
                <div class="right">
                    <p class="title">
                        监测指标分析
                    </p>
                    <div>
                        <monitor-index></monitor-index>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <p class="title">
                        站点分布
                    </p>
                    <site></site>
                </div>
                <div class="right">
                    <p class="title">
                        报警分析
                    </p>
                    <alarm></alarm>
                   <!-- <img style=" position: absolute;width: 80%;height: 85%;left: 90px;top: 50px;" src="./assets/img/alarm.png" alt="">-->
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <p class="title">
                    河涌水质达标分析
                </p>
                <div>
                    <quality-standard></quality-standard>
                </div>
            </div>
            <div class="bottom">
                <p class="title">
                    实时水情
                </p>
                <realtime-water></realtime-water>
            </div>
        </div>
    </div>
</template>
<script>
import RealtimeQuality from './components/realtime_quality' //实时水质
import RiverQuality from './components/river_quality'  //河涌水质月分析
import StandardRate from './components/standard_rate' //水质目标季度达标
import QualityStandard from './components/quality_standard' //水质达标
import Level from './components/level' //水质达标
import MonitorIndex from './components/monitor_index' //监测指标
import Site from './components/site' //站点分布
import Alarm from './components/alarm' //报警分布
import RealtimeWater from './components/realtime_water' //实时水情
export default {
    routerDepth: 0,
    name:'Minotor',
    meta: { nvPermission: false },
    components: {
        RealtimeQuality,
        RiverQuality,
        StandardRate,
        QualityStandard,
        Level,
        MonitorIndex,
        Site,
        Alarm,
        RealtimeWater
    },
    data () {
        return {
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .bg{
        // position: relative;
        display: flex;
        justify-content: center;
        width: 3840px;
        height: 1140px;
        background: url("../../static/img/Group@2x.png");
        background-size: cover;
        >.left{
            // position: absolute;
            // bottom: 22px;
            // left: 50px;
            padding-top: 48px;
            .top,.bottom{
                width: 800px;
                height: 470px;
                p{
                    margin: 0;
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                    line-height: 36px;
                } 
                .tp{
                    margin: 15px auto;
                    margin-bottom: 0;
                    width: 400px;
                    height: 40px;
                    //background-color: rgb(54, 54, 54);
                    display: flex;
                    justify-content: space-around;
                    >div{
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 13px;
                    }
                }
            }
            .top{
                margin-bottom:24px;
                background: url('../../static/img/Group 5@2x.png');
                background-size: cover;
                position: relative;
            }
            .bottom{
                position: relative;
                background: url('../../static/img/Group 33@2x.png');
                background-size: cover;
                .time{
                    position: absolute;
                    right: 35px;
                    top: 62px;
                    color: #fff;
                    font-size: 18px;
                }
            }
        }
        >.center{
            margin: 52px 20px 0 20px;
            width: 2020px;
            height: 960px;
            >.top{
                display: flex;
                >.left,>.center,>.right{
                    position: relative;
                    color: #fff;
                    font-size: 16px;
                    p{
                        margin: 0;
                    }
                    &.left{
                        p{
                            position: absolute;
                            right: 50px;
                            top: 10px;
                        }
                    }
                    &.right{
                        p{
                            position: absolute;
                            left: 30px;
                            top: 10px;
                        }
                    }
                    &.center{
                        p{
                            text-align: center;
                            margin-top: 10px;
                        }
                    }
                }
                >.left{
                    width: 600px;
                    height: 360px;
                    background: url('../../static/img/Group 11@2x.png');
                    background-size: cover;
                    margin-right: 20px;
                }
                >.center{
                    width: 780px;
                    height: 360px;
                    background: url('../../static/img/Group 12@2x.png');
                    background-size: cover;
                    margin-right: 20px;                    
                }
                >.right{
                    width: 600px;
                    height: 360px;
                    background: url('../../static/img/Group 8@2x.png');
                    background-size: cover;
                }
            }
            >.bottom{
                display: flex;  
                margin-top: 20px;
                >.left{
                    position: relative;
                    width: 1000px;
                    height: 580px;
                    background: url('../../static/img/Group 31@2x.png');
                    background-size: cover;
                    margin-right: 20px;
                    >p{
                        margin: 0;
                        color: #fff;
                        font-size: 16px;
                        position: absolute;
                        right: 40px;
                        top: 10px;
                    }
                }
                >.right{
                    position: relative;
                    width: 1000px;
                    height: 580px;
                   background: url('../../static/img/Group 29@2x.png');
                   //background: url('assets/img/alarm.png') center no-repeat;
                    background-size: contain;
                    >p{
                        margin: 0;
                        color: #fff;
                        font-size: 16px;
                        position: absolute;
                        left: 40px;
                        top: 10px;
                    }
                }
            }
        }
        >.right{
            padding-top: 48px;
            >.top{
                width: 900px;
                height: 360px;
                position: relative;
                margin-bottom:24px;
                background: url('../../static/img/Group 22@2x.png');
                background-size: cover;
                >p{
                    margin: 0;
                    position: absolute;
                    color: #fff;
                    font-size: 16px;
                    left: 15px;
                    top: 10px
                }
            }
            >.bottom{
                position: relative;
                width: 900px;
                height: 580px;
                background: url('../../static/img/Group 20@2x.png');
                background-size: cover;
                >p{
                    margin: 0;
                    position: absolute;
                    color: #fff;
                    font-size: 16px;
                    left: 40px;
                    top: 10px
                }
            }
        }
    }
</style>

