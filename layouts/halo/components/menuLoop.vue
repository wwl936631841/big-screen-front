<template>
    <section>
        <template v-for="menu in menus" >
            <template v-if = "menu.linkType === '1'">
                <el-submenu  v-if = "menu.childrens && menu.childrens.length > 0" :key="menu.menuId" :index="menu.menuId">
                    <template slot="title"> {{ menu.menuName }} </template>
                    <menu-loop :menus="menus.childrens" />
                    <!-- <template v-for="childMenu in menu.childrens">
                        <div :key="childMenu.menuId"> {{ childMenu.menuName }}</div>
                    </template> -->
                </el-submenu>
                <el-menu-item :key="menu.menuId" :index="menu.menuId"  v-else>
                    {{ menu.menuName }}
                </el-menu-item>
            </template>
            <outer-link class="menuitem" tag = "a" v-else :key="menu.menuId" :to="menu.linkUrl">
                <a> {{ menu.menuName }} </a>
            </outer-link>
        </template>
    </section>
</template>
<script>
import OuterLink from '@layouts/components/nav-link/outer-link'
export default {
    name: 'MenuLoop',
    props: {
        menus: {
            required: true
        }
    },
     components: {
         OuterLink
     }
}
</script>
<style scoped>

</style>


