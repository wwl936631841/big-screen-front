<template>
    <ul class="halo-menu">
        <halo-menu-item 
            label="menuName"
            v-for = "menu in menus" 
            :key="menu.menuId" 
            :menu="menu"
            :class="{active: activeTopMenu.menuId === menu.menuId}"/>
    </ul>
</template>
<script>
import HaloMenuItem from './halo-menu-item'
import { mapState } from 'vuex'
export default {
    components: {
        HaloMenuItem
    },
    props: {
        menus: {
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        ...mapState('platform', ['activeTopMenu'])
    }
}
</script>

<style lang="scss" scoped>
    .halo-menu {
        display: flex;
        list-style: none;

        &__item {
            padding: 0 10px;
            &.active {
                &:after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    left: -2px;
                    bottom: -3px;
                    border-bottom: 2px solid #fff;
                }
            }
        }
    }
</style>

