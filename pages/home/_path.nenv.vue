<template>
    <div class="bg">
        <header class="header">
            <div class="top">
                <div class="logo">
                    <img src="../../static/img/Group 30@2x.png" alt="">
                </div>
                <p class="title">桂畔海流域大数据监控平台</p>
            </div>
            <div class="nav">
                <div class = "nav-item" :class="{active: nav.path === pageComponent }" @click="handleNav(nav.path)" v-for="nav in navs" :key="nav.path">
                    {{ nav.name }} 
                </div>
            </div>
           
        </header>
        <!-- <div class="line"></div> -->
        <div class="wrapper">
            <component :is="pageComponent"/>
        </div>

    </div>

</template>
<script>
import Index from './index'
// import Integrate from './integrate'
import MainMap from '../gis/MapFrame/mainMap'
import manage from './manage'
import pic from './pic'
export default {
    meta: { nvPermission: false },
    routerDepth: 0,
    // components: { Index, Integrate, online, pic,MainMap},
    components: { Index, manage, pic,MainMap},
    data () {
        return {
            navs: [
                {
                    name:"在线监控",
                    path:'index'
                },
                {
                    name: "综合运营",
                    path: 'manage'
                },
                {
                    name:"视频监控",
                    path:'pic'
                },
                {
                    name: "一张图",
                    // path: 'integrate'
                    path: 'mainMap'
                }
            ]
        }
    },
    computed: {
        pageComponent () {
            return this.$route.params.path || 'index' ;
        }
    },
    methods: {
        handleNav (path) {
            if(path === 'index'){
                this.$router.push(`/home`);
            }else{
                this.$router.push(`/home/${path}`);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .bg{
        width: 3840px;
        position: relative;
        // background: url('./assets/bj.png') no-repeat;
        // min-width: 100vw;
        min-height: 100vh;
        background-size: 100% 100%;
    }
    .line{
        // position: absolute;
        // top: 130px;
        // border: 2px solid #0070c0;
        // left: 0px;
        // width: 3840px;
        // border-left: none;
        // border-right: none;
    }
    .header {
        background: url('../../static/img/Group 35@2x.png') no-repeat center;
        background-size: cover;
        height: 130px;
        // width: 66%;
        // min-width: 1280px;
        width: 3840px;
        position: absolute;
        margin-left: 50%;
        transform: translateX(-50%);
        .top{
            margin: 0 ;
            position: absolute;
            height: 75px;
            width: 600px;
            margin-left: 50%;
            transform: translateX(-50%);
            .logo{
                width: 45px;
                height: 45px;
                border-radius: 8px;
                position: absolute;
                top: 38px;
                left: 30px;
            }
            .title{
                position: absolute;
                top:3px;
                left: 94px;
                height:28px;
                font-size:40px;
                font-family:PingFangSC-Semibold;
                color:#fff;
                line-height:28px;
            }
        }
        .nav{
            width: 3840px;
            position: absolute;
            left: 30px;
            top: 10px;
            color:#fff;
            font-size: 36px;
            display: flex;
            .nav-item {
                &:first-child{
                    position: absolute;
                    left: 19%;
                    background: url('../../static/img/Rectangle Copy 3@2x.png') no-repeat center;
                    &.active{
                        background: url('../../static/img/Rectangle Copy 2@2x.png') no-repeat center;
                    }
                }
                &:nth-child(2){
                    position: absolute;
                    left: 28%;
                    background: url('../../static/img/Rectangle Copy 3@2x.png') no-repeat center;
                    &.active{
                        background: url('../../static/img/Rectangle Copy 2@2x.png') no-repeat center;
                    }
                }
                &:nth-child(3){
                    position: absolute;
                    left: 61%;
                    background: url('../../static/img/Rectangle@2x.png') no-repeat center;
                    &.active{
                        background: url('../../static/img/Rectangle Copy@2x.png') no-repeat center;
                    }
                }
                &:nth-child(4){
                    position: absolute;
                    left: 70%;
                    background: url('../../static/img/Rectangle@2x.png') no-repeat center;
                    &.active{
                        background: url('../../static/img/Rectangle Copy@2x.png') no-repeat center;
                    }
                }
                width: 364px;
                height: 90px;
                // background: url('../../static/img/Rectangle Copy 3@2x.png') no-repeat center;
                display: flex;
                justify-content: center;
                align-items: center;
                &.active{
                    // background-color:#0070C0;
                    color: #fff;
                }
                // display: inline-block;
                cursor: pointer;
                // padding:7px 28px;
            }
        }
    }

    .wrapper {
        position: absolute;
        top: 111px;
        // padding-top: 130px;
        // padding-bottom: 20px;
        background: url('../../static/img/Group@2x.png') no-repeat center;
        background-size: cover;
    }

</style>

