<template>
<div class="integrate">
    <div class="left">
        <div class="nav">
            <div class = "nav-item" :class="{active: nav.path === pageComponent }" @click="handleNav(nav.path)" v-for="nav in navs" :key="nav.path">
                {{ nav.name }} 
            </div>
        </div>
    </div>
    <div class="right">
        <component :is="pageComponent"/>
    </div>
</div>
</template>
<script>
import taskcompletion from './components/taskcompletion'
import taskproportion from './components/taskproportion'
import tasktime from './components/tasktime'
export default {
    meta: { nvPermission: false },
    routerDepth: 0,
    components: { taskcompletion, taskproportion, tasktime},
    data () {
        return {
            pageComponent:taskcompletion,
            navs: [
                {
                    name: "点位分布",
                    path: 'taskcompletion',
                    url:'../../static/img/Group1@2x.png'
                },
                {
                    name:"人员轨迹",
                    path:'taskproportion',
                    url:'../../static/img/Group Copy@2x.png'
                },
                {
                    name:"巡检热力图",
                    path:'tasktime',
                    url:'../../static/img/Group Copy 2@2x.png'
                }
            ]
        }
    },
    methods: {
        handleNav (path) {
            this.pageComponent=path
        }
    }
}
</script>
<style lang="scss" scoped>
    .integrate{
        //height: 100%;
        // margin: 0 auto;
        width: 3840px;
        height: 1040px;
        display: flex;
        justify-content: center;
        .left{
            flex-basis: 240px;
            height: 1040px;
            background-color: #134163;
            .nav{
                .nav-item{
                    font-size: 28px;
                    text-align: center;
                    line-height: 128px;
                    color: #fff;
                    border-bottom: 1px solid #68bcd9;
                    background:linear-gradient(180deg,rgba(14,41,76,1) 0%,rgba(20,47,82,1) 11%,rgba(3,30,65,1) 22%,rgba(6,33,67,1) 81%,rgba(2,29,63,1) 100%);
                    // box-shadow:0px 1px 1px 0px rgba(104,188,217,1);
                    &.active{
                        background:linear-gradient(90deg,rgba(29,52,72,1) 0%,rgba(34,74,103,1) 26%,rgba(36,148,200,1) 61%,rgba(36,185,251,1) 87%,rgba(177,255,255,1) 100%);
                    }
                }
            }
        }
        .right{
            flex: 1;
            height: 1040px;
            display: flex;
            position: relative;
            background-color: #fff;
        }
    }
</style>


