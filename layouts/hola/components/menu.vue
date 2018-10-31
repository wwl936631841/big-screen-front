<template>
    <aside class="sidebar">
        <el-menu class="halo-header-menu" router>
            <template v-for="menu in menus" >
                <template v-if = "menu.linkType === '1'">
                    <el-submenu  v-if = "menu.childrens && menu.childrens.length > 0" :key="menu.menuId" :index="menu.linkUrl">
                        <template slot="title"> {{ menu.menuName }} </template>
                        <template v-for="childMenu in menu.childrens">
                            <el-menu-item :key="childMenu.menuId" :index="childMenu.linkUrl"> {{ childMenu.menuName }}</el-menu-item>
                        </template>
                    </el-submenu>
                    <el-menu-item :key="menu.menuId" :index="menu.linkUrl"  v-else>
                        {{ menu.menuName }}
                    </el-menu-item>
                </template>
                <li class="el-menu-item" v-else :key="menu.menuId">
                    <outer-link class="menuitem" tag = "a" :to="menu.linkUrl">
                        <a> {{ menu.menuName }} </a>
                    </outer-link>
                </li>
            </template>
        </el-menu>
    </aside>
</template>
<script>
import vuex, { mapGetters, mapActions } from 'vuex';
import  OuterLink from '../../components/nav-link/outer-link'
export default {
    name: 'HaloMenu',
    components: {
        OuterLink
    },
    props: {
        menus: {
            required: true
        }
    },
    data () {
        return {
            header: {
                title: nenv.project.title
            }
        }
    },
    computed: {
       
    }
}
</script>

<style lang="scss" scoped>
    .sidebar {
        position: fixed;
        top: 72px;
        bottom: 0;
        width: 220px;
        background-color: #fff;
        overflow-y: auto;
    }
    a.menuitem {
        color: #303133;
    }
</style>


