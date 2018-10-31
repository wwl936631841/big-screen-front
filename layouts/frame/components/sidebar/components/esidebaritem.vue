<template>
    <div>
        <template v-for="item in routes">
            <router-link v-if="item.linkType==1 && item.childrens == null && item.linkUrl !=null " :to="item.linkUrl" :key="item.menuId">
                <el-menu-item :index="item.linkUrl" :collapse="false">
                   <i class="el-icon-menu" v-if="item.icon" :class="item.icon"></i> {{item.menuName}}
                </el-menu-item>
            </router-link>
             <outer-link v-if="item.linkType==2 && item.childrens == null" :to="item.linkUrl" :key="item.menuId">
                <el-menu-item :index="item.linkUrl" :collapse="false">
                   <i class="el-icon-menu" v-if="item.icon" :class="item.icon"></i> {{item.menuName}}
                </el-menu-item>
            </outer-link>
            <el-submenu :index="item.menuName" v-if="item.linkType==1 && item.childrens !=null" :collapse="false" :key="item.menuId">
                <template slot="title" v-if="item.linkType==1">
                   <i class="el-icon-menu" v-if="item.icon" :class="item.icon"></i> {{item.menuName}}
                </template>
                <template v-for="child in item.childrens">
                    <!-- <e-sidebar-item class='menu-indent' v-if='child.childrens && child.childrens.length>0' :routes='[child]' :key="child.menuId"> </e-sidebar-item> -->
                    <router-link class="menu-indent" :to="child.linkUrl" :key="child.menuId">
						<el-menu-item :index="child.linkUrl.replace(/\?.*/, '')"><!--url去掉后面的参数，与激活的菜单url对应，才能有选中效果-->
                            {{child.menuName}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    import OuterLink from '../../nav-link/outer-link'
    export default {
      menuName: 'ESidebarItem',
      components: { OuterLink },
      props: {
        routes: {
          type: Array
        }
      }
    }
</script>

<style lang="scss">
    .el-menu-item {
        height: 40px !important;
        line-height: 40px !important;
    }
</style>


<style rel="stylesheet/scss" lang="scss" scoped>
    .svg-icon {
        margin-right: 10px;
    }
    .hideSidebar .menu-indent{
        display: block;
        text-indent: 10px;
    }
</style>

