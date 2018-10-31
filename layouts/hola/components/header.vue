<template>
    <header class="hola">
        <!-- <div class="hola__left"> {{ header.title }} </div> -->
        <div class="hola__left">
            <i class="e-header__logo png-icon logo-theme" />
            <a class="e-header__title" href="/" :title="project.title">{{ project.title }}</a>
        </div>
        <div class="hola__right">
            <a>
                <i class="png-icon alarm middle" />
            </a>
            <layout-setting />
            <layout-select />
            <span class="e-header__loginuser" >{{ nickName }}</span>
            <logout />
        </div>
    </header>
</template>
<script>
import LayoutSelect from '@layouts/components/layout-selector'
import LayoutSetting from '@layouts/components/layout-setting'
import Logout from '@layouts/components/logout.vue'
import { mapState } from 'vuex'
export default {
    name: 'HolaHeader',
    components: { LayoutSelect, LayoutSetting, Logout },
    props: {
        header: {
            type: Object,
            default () {
                return {
                    title: nenv.project.title,
                    loginoutText: '退出',
                }
            }
        },
    },
    computed: {
        ...mapState('user', {
            nickName: state => state.profile.nickName
        })
    } 
}
</script>
<style lang="scss" scoped>
    .hola {
        background-color: #3b8cff;
        display: flex;
        justify-content: space-between;
        position: fixed;
        line-height: 62px;
        color: #fff;
        width: 100%;
        height: 62px;
        &__left{
            i.png-icon {
                width: 33px;
                height: 33px;
                margin-left: 20px;
                margin-right: 0px;
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
        &__right{
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
    }
</style>


