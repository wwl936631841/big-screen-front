<template>
    <ul class="halo-menu__pane">
        <halo-menu-item v-for="menu in menus" :menu="menu" :key="menu.menuId" />
    </ul>
</template>
<script>
import HaloMenuItem from './halo-menu-item'
export default {
    name: 'HaloMenuPane',
    props: {
        menus: {
            type: Array,
            default () { 
                return {}
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .halo-menu__pane {
        // display: flex;
        flex-direction: column;
        position: absolute;
        padding: 0;
        top: 100%;
        
        background-color: #fff;

        & & {
            top: 0;
            left: 100%;
        }

        // display: none;
    }

</style>


