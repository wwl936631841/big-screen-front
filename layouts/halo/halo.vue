<template>
    <div id="halo" class="layout halo">
        <div class="halo__header-wrapper">
            <halo-header :menus = "menus"/>
        </div>
        <div class="halo-app-wrapper">
            <div class="halo-main-container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import HaloHeader from './components/header'
import layoutMixin from '../layoutMixin'
export default {
    name: 'Halo',
    mixins:[layoutMixin],
    components: {
        HaloHeader
    }
}
</script>

<style  lang = "scss" scoped>
    .halo {
        margin-top:  74px;

        &__header-wrapper {
            top: 0;
            position: fixed;
            z-index: 1000;
            width: 100%;
            color: #fff;
        }
    }
</style>


