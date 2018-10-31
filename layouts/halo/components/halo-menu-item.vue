<template>
    <li class="halo-menu__item">
        <component 
            :is="navComponent(menu)" 
            :to="menu.linkUrl"
            tag="div"
            class="nav-item"
            >
            {{ menu[label] }}
        </component>
        <halo-menu-pane v-if="menu[children]" :menus="menu[children]" />
    </li>
</template>
<script>
import HaloMenuPane from './halo-menu-pane'
import navComponentMixin from '@layouts/mixins/navComponentMixin'
export default {
    name: 'HaloMenuItem',
    props: {
        menu: {
            type: Object
        },
        label: {
            type: String,
            default: 'menuName'
        },
        children: {
            type: String,
            default: 'childrens'
        }
    },
    components: {
        HaloMenuPane
    },
    mixins: [navComponentMixin]
}
</script>
<style lang="scss" scoped>
    .halo-menu__item {
        position: relative;
        padding: 6px 15px;
        list-style: none;
        width: max-content;
        .halo-menu__pane {
            color: #000;  
            display: none;
            .halo-menu__item{
                .inner-link .nav-item{
                    color: #000;    
                }
            }
            &:hover {
                > .nav-item {
                    color: #7CB1FF;
                }
            }
        }
        &:hover {
            > .nav-item {
                color: #7CB1FF;
                //background-color: #ECF5FF;
                opacity: 1;
            }
            > .halo-menu__pane {
                display: flex;
            }   
        }
         a.nav-item {
            color: #fff;
        }
    }
    .halo-menu__item.active:after{
        border-bottom: none;
    }
</style>



