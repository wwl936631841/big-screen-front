<template>
    <el-dropdown @command="handleLayout" class="layout-selector" v-if="null && layouts.length > 1">
        <span class="el-dropdown-link">
            导航显示
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
                v-for="layout in layouts"
                :key="layout.name"
                :command="layout.name">
                {{ layout.label }}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
import { mapState, mapActions } from 'vuex'
//import 'index.scss'
export default {
    computed: {
        ...mapState('platform', ['layouts']),
    },
    methods: {
        handleLayout (name) {
            this.changePlatformLayout(name).then(() => {
                window.location.reload()
            })
        },
        ...mapActions('platform', ['changePlatformLayout']),
    }  
}
</script>
<style lang="scss" scoped>
    .layout-selector {
        .el-dropdown-link {
            color: #fff;
            margin-right: 10px;
        }
    }
</style>


