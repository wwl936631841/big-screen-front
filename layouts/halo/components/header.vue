<template>
    <header class="halo-header">
        <div class="halo-header__left">
            <i class="e-header__logo png-icon logo-theme" />
            <a class="e-header__title" href="/" :title="project.title">{{ project.title }}</a>
        </div>
        <div class="halo-header__navs">
            <nv-menu :menus="menus" />
        </div>
        <div class="halo-header__right">
            <a>
                <i class="png-icon alarm middle" />
            </a>
            <layout-setting />
            <layout-select/>
            <span class="e-header__loginuser" >{{ nickName }}</span>
            <logout />
        </div>
    </header>
</template>
<script>
import vuex, { mapGetters, mapActions } from 'vuex';
import navComponentMixin from '@layouts/mixins/navComponentMixin'
import Logout from '@layouts/components/logout.vue'
import LayoutSelect from '@layouts/components/layout-selector'
import LayoutSetting from '@layouts/components/layout-setting'
import menu from './menu'
// import 
import  OuterLink from '../../components/nav-link/outer-link'
export default {
    name: 'HaloHeader',
    mixins: [navComponentMixin],
    components: {
        NvMenu: menu,
        LayoutSelect,
        LayoutSetting,
        OuterLink,
        Logout
    },
    props: {
        menus: {
            required: true
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
        ...vuex.mapState('user', {
            nickName: state => state.profile.nickName
        })
    }
}
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        height: 62px;
        background-color: #3b8cff;
    }

    .halo-header {
        &__navs {
            .el-menu {
                border: none;
                background-color: transparent;
            }
        }
    }

    .halo-header {
        &__left{
            display: flex;
            align-self: center;
            i.png-icon {
                width: 33px;
                height: 33px;
                margin-left: 20px;
                margin-right: 5px;
                margin-top: 17px;
            }
            .e-header__title {
                font-size: 18px;
                font-weight: 600;
                color: #fff;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 62px;
            }
        }
        &__right {
            //display: flex;
            align-self: center;
            .e-header__btn-loginout {
                display: inline-block;
                width: 60px;
                height: 30px;
                border: 1px solid #fff;
                border-radius: 4px;
                font-size: 16px;
                line-height: 30px;
                text-align: center;
                margin-left: 20px;
                margin-right: 20px;
            }
        }
        &__navs {
            width: 0%;
            flex-grow: 1;
        }
    }


</style>

