<template>
    <el-menu mode="vertical" :default-active="$route.path">
        <e-sidebar-item :routes='routes'></e-sidebar-item>
    </el-menu>
</template>

<script>
    import ESidebarItem from './components/esidebaritem';
    export default {
      name: 'FrameSidebar',
      components: { ESidebarItem },
      props:{
        'routes':{
            type:Array,
            required:true
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
    min-height: 100%;
}

</style>
