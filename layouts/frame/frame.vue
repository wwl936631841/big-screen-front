<template>
    <div class="frame-wrapper" :class="{'width-limited': isWithLimited, 'has-sidebar': hasSidebar}">
        <div class="frame__header-wrapper">
            <frame-header :menus = "menus" :active-top-menu="activeTopMenu || {}"/>
        </div>
        <div  class="frame__sidebar-wrapper" v-if="hasSidebar">
            <div class="frame_sidebar-inner">
            <frame-sidebar class="sidebar-container" :routes="activeTopMenu.childrens || []"/>
            </div>
        </div>
        <div class="frame__body" :class= "{'has-sidebar': hasSidebar } ">
            <!-- <div class="frame-container-wrapper"> -->
            <div class="frame-main-container" :class= "{'has-sidebar': hasSidebar } ">
                <frame-main />
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import store from './store'
import { frameHeader, frameMain, frameSidebar } from './components'
import vuex, { createNamespacedHelpers } from 'vuex'
const { mapState ,mapGetters, mapActions } = createNamespacedHelpers(store.name)


export default {
    name: 'Frame',
    components: {
        frameHeader,
        frameMain,
        frameSidebar,
    },
    computed: {
        ...vuex.mapState('platform', ['activeTopMenu']),
        ...vuex.mapGetters('platform', ['menus']),
        ...mapState(['isWithLimited']),
        hasSidebar () {
            const { childrens } = this.activeTopMenu
            return childrens && childrens.length > 0 && this.$route.query['nv-no-sidebar'] !== 'true'
        }
    },
    methods: {
        ...vuex.mapActions('platform', [
            'changeTitle'
        ])
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.frame-wrapper {
    position: absolute;
    top: 62px;
    //bottom: 0;
    left: 0;
    right: 0;
    min-height: calc(100vh - 62px);
    //min-width: 1280px;
    //overflow: hidden;
    //overflow-x: auto;

    &.width-limited {
        max-width: 1280px;
        margin: 0 auto;

        margin-top: 20px;
        .frame__sidebar-wrapper {
            padding-top: 20px;
            //top: 82px;
        }
    }
}

.frame__sidebar-wrapper {
    width: 190px;
    position: fixed;
    top: 62px;
    //padding-top: 20px;
    bottom: 0;
    z-index: 1001;
    background-color: #E8ECF0;
    overflow: auto;
    transition: all .28s ease-out;
}

.frame_sidebar-inner {
    width: 180px;
    height: 100%;
    box-shadow: 0 0 4px 0 #BFC4B6;
    overflow-x: hidden;
}

.frame__body {
    //position: absolute;
    //float: left;
    //padding-left: 200px;
    // max-width: calc(100vw - 200px);
    min-height: 100%;
    // width: 100%;
    top: 0;
    //margin-top: 82px;
    //padding-top: 20px;
    bottom: 0px;
    left: 196px;
    right: 0;
    margin: auto;
    overflow: hidden;
    &.has-sidebar {
        margin-left: 194px;
        width: calc(100% - 196px);
    }
    //overflow: auto;
    // overflow-x: auto;
    // overflow-y: scroll;


    .frame-main-container {
        transition: all .28s ease-out;
        position: relative;
        //position: absolute;
        // min-height: 100%;
        overflow: auto;
        height: calc(100vh - 62px);
        //top: 82px;
        //bottom: 0;
        //width: auto;
        //right: 0;
        //left: 0;
        //min-width: 1080px;
        //overflow-x: scroll;
        //overflow-y: auto;
        //border-radius: 4px;
        //box-shadow: 0 0 4px 0 #bfc4b6;

        &.has-sidebar {
           // margin-left: 200px;
        }
    }
}
</style>
