<template>
    <div id="layout-hola" class="layout-halo">
        <div class="hola__header-wrapper">
            <hola-header />
        </div>
        <div class="hola__app-wrapper">
            <div class="hola__side-menu-wrapper">
                <hola-menu :menus = "menus" />
            </div>
            <div class="hola__main-container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import HolaHeader from './components/header'
import HolaMenu from './components/menu'
import layoutMixin from '../layoutMixin'
export default {
    name: 'Hola',
    mixins:[layoutMixin],
    components: {
        HolaHeader,
        HolaMenu
    }
}
</script>

<style lang="scss" scoped>
#layout-hola {
    .hola {
        &__header-wrapper {
            position: relative;
            min-height: 72px;
        }

        &__app-wrapper {
            //margin-left: 380px;
        }

        &__main-container {
            margin-left: 240px
        }

        &__side-menu-wrapper {
            width: 220px;
            //float: left;
            position: fixed;
        }
    }
}
</style>


