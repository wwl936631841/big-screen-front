<template>
    <header class="e-header bg-primary">
        <div class="e-header__left">
            <i class="e-header__logo png-icon logo-theme" />
            <a class="e-header__title" href="/" :title="project.title">{{ project.title }}</a>
        </div>
        <div class="e-header__nav">
            <nv-scroll-pane class="header-menu-wrapper">
                <component
                    :is="navComponent(item)"
                    :to="item.childrens ? (item.childrens[0].childrens ? item.childrens[0].childrens[0].linkUrl : item.childrens[0].linkUrl) : item.linkUrl"
                    tag="div"
                    v-for = "(item, index) in menus"
                    :key="index"
                    class="e-header__nav--item"
                    :class="{active: activeTopMenu.menuId === item.menuId }"
                    @click="handlerClick(item)"
                    >
                    {{ item.menuName }}
                </component>
            </nv-scroll-pane>
        </div>
        <div class="e-header__right">
            
            <message-list/>
           
            <layout-setting>
                <div class="header__setting-item">
                    <el-switch 
                        active-text="全屏"
                        v-model="limitWidth"/>
                </div>
            </layout-setting>
            <layout-select />
            <span class="e-header__loginuser" @click="dialogVisible = true">{{ nickName }}</span>
            <theme-select/>
            <logout />
        </div>


        <el-dialog title="个人信息" :visible.sync="dialogVisible" width="50%" :append-to-body="true">
             <user-info @close="dialogVisible = false" />
        </el-dialog>
    </header>
</template>

<script>
import layoutSelect from '@layouts/components/layout-selector'
import themeSelect from '@layouts/components/theme-selector'
import LayoutSetting from '@layouts/components/layout-setting'
import Logout from '@layouts/components/logout.vue'
import OuterLink from '../nav-link/outer-link' 
import InnerLink from '../nav-link/inner-link' 
import vuex, { mapGetters, mapActions } from 'vuex';
import { name } from '../../store'
import md5 from '../../../../node_modules/md5';
import UserInfo from './userinfo' ; 
import MessageList from './message'
export default {
    data() {

        return {
            dialogVisible: false,
            messageDialogVisible:false,
            messageCount:null
        };
    },
    name: 'FrameHeader',
    components: { layoutSelect, OuterLink, InnerLink, LayoutSetting, Logout, themeSelect,UserInfo,MessageList},
    props: {
        menus: {
            type: Array,
            required: true,
        },
        activeTopMenu: {
            type: Object,
            required: true
        }
    },
    created(){
        //获取未读消息数目
    //   this.getMessageCount();
    },
    computed: {
        limitWidth: {
            set () {
                this.changeLimitWidth()
            },
            get () {
                return !this.isWithLimited
            }
        },
        ...vuex.mapState(name, ['isWithLimited']),
        ...vuex.mapState('user', {
            nickName: state => state.profile.nickName,
            user: state => state.profile
        })
    },
    methods: {
        // 用于计算导航的组件是什么类型的
        navComponent (item) {
            switch (item.linkType) {
                case "1":
                    return 'inner-link'
                case "2":
                    return 'outer-link'
            }
            return 'router-link'
        },
        handlerLogout () {
            const self = this
            self
              .logout()
              .then(() => {
                this.$router.push({ path: process.env.LOGIN_PATH || '/login' })
              })
        },
        handlerClick (item) {
            this.$emit('menu-change', item)
        },
        changeSkin(){
            if(this.theme==''){
                this.$store.dispatch('changeTheme', 'theme');
            }else{
                this.$store.dispatch('changeTheme', '');
            }
        },
        ...mapActions(
            ['logout']
        ),
        ...mapActions(name, 
            ['changeLimitWidth']
        ),
        ...mapActions('nv-layout',
            ['changeLayout', 'changeShowTitle']
        ),
        //获取未读消息数目
        getMessageCount(){
             unfetch({
                url: `${process.env.COMMON?process.env.COMMON:''}`+'/platform/message/noreadcount',
                method: 'get',
                params:{ } 
            }).then(({data}) =>{
                this.messageCount = data;
            })
        },
        closeMessage(){
           this.messageDialogVisible = false ;
           //this.getMessageCount();
        }
    }

}
</script>
<style  lang="scss" scoped>
.header {
    
    &__setting-btn {
        background: transparent;
        border: none;
        color: #fff;   
    }

    &__setting-item {
        // &:nth-last-child {
            padding-bottom: 5px;
        // }
    }
}
.e-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    z-index: 1000;

    height: 62px;
    // background-color: #3b8cff;
    a, & {
        color: #fff;
    }
    line-height: 62px;
    padding: 0 20px;
    overflow: hidden;
    &__left {
        // float: left;
        text-align: left;
        overflow: hidden;
        margin-right: 40px;
    }                   
    &__logo {
        height: 33px;
        width: 33px;
        border-radius: 4px;
        vertical-align: middle;
    }
    &__title {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &__nav {
        //float: left;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        flex-grow: 1;
        width: 100;
    }
    &__nav--item {
        position: relative;
        display: inline-block;
        text-align: center;
        opacity: 0.7;
        text-decoration: none;
        width: 64px;
        margin-right: 38px;
        &:first-child {
            width: 64px;
        }
        &.active {
            opacity: 1;
            // font-weight: 700;
            &::before {
                content: "";
                display: block;
                position: absolute;
                bottom: 10px;
                left: 0;
                width: 100%;
                height: 3px;
                border-radius: 2px;
                background: #fff;
            }
        }
        &:hover {
            opacity: 1;
            cursor: pointer;
            transform: scale(1.05, 1.05);
        }
    }
    &__right {
        // text-align: right;
        margin-left: 20px;
        // vertical-align: middle;
    }

    &__alarm {
        width: 14px;
        height: 15px;
        vertical-align: middle;
    }
    &__loginuser {
        margin-right: 12px;
    }
    &__alarm {
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin-right: 20px;
    }
    &__skin {
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin-right: 20px;
    }
    &__btn-loginout {
        display: inline-block;
        width: 60px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 4px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
    }
}

.header-menu-wrapper {
    height: 76px;
}



img.head_portrait{
    width: 100px;
    height: 100px;
    margin: 0px auto;
}
.personal_info{
    text-align: center;
    p.position{
        color: #646464;
        font-size: 12px;
    }
}
.detail_info {
    border-top:1px solid #eee;
    margin-top: 10px;
    font-size: 15px;
    ul{
        padding: 0 20px;
        li{
            list-style: none;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            span.grey{
                color: #646464;
                i{
                    margin-right: 5px;
                }
            }
            span.fright{
                float:right;
                cursor: pointer;
            }
        }
    }
}
</style>
