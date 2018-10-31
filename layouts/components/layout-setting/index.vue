<template>
    <div class="layout-setting">
        <!-- <el-popover
            class="layout-setting__pane"
            ref="setting"
            trigger="click">
            <div class="header__setting-item" style="padding-bottom:5px">
                <el-switch
                    active-text="面包屑"
                    v-model="titleShow"/>
            </div>
            <slot name="default" />
            <div class="header__setting-item">
                <el-switch
                    active-text="卡片"
                    v-model="cardLayout"
                />
            </div>
            <div class="header__setting-item">
                <el-switch
                    active-text="居右"
                    v-model="extraRight"
                />
            </div>
        </el-popover>
        <el-button class="layout-setting__btn" v-popover:setting>设置</el-button> -->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
     computed: {
        titleShow: {
            set () {
                this.changeShowTitle()
            },
            get () {
                return this.isShowTitle
            }
        },
        cardLayout: {
            set () {
                this.changeLayout()
            },
            get () {
                return this.isCardLayout
            }
        },
        extraRight: {
            set () {
                this.changeExtraDirection()
            },
            get () {
                return this.isExtraRight
            }
        },
        ...mapState('nv-layout', ['isShowTitle', 'isCardLayout', 'isExtraRight']),
    },
    methods: {
        ...mapActions('nv-layout',
            ['changeLayout', 'changeShowTitle', 'changeExtraDirection']
        )
    }
}
</script>
<style lang="scss" scoped>
    .layout-setting {
        display: inline-block;

        &__btn {
            background: transparent;
            border: none;
            color: #fff; 
        }
    }
</style>


