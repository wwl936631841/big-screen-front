<template>
  <treeselect
    :multiple="multiple"
    :options="options"
    :normalizer="normalizer"
    placeholder="请选择"
    :load-options="loadOptions"
    search-nested
    :disable-branch-nodes="true"
    :value-format="valueFormat"
    v-model="currentValue"
    @select="select"
    :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}"
    loadingText="加载中..."
    noChildrenText="没有子选项"
    noOptionsText="没有选项"
    noResultsText="没有匹配结果"
    clearValueText="清除"
    clearAllText="清除全部"
  />
</template>

<script>
  import nvInpterMixins from 'nenv/mixins/inputerMixins'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

//动态加载，无法进行初始化值
export default {
  name: 'NvUserSelectorDynamic',
    // register the component
  components: { Treeselect },
  // mixins: [nvInpterMixins],
  props:{
      // 请求参数
      reqOpt: {
        type: Object,
        default () {
          return {
            url: '/user/organize',
            getUsersByOrganizeIdUrl: '/user/by/organize'
          }
        }
      },
      organizeId: {
        type: Object,
        default () {
          return {
            id: ""
          }
        }
      },
      value:{
        type:[Object,Array,String]
      },
      valueFormat:{
        type:String,
        default:'object'
      },
      multiple:{
        type:Boolean,
        default:true
      }
  },

  data: () => ({
    options: [
    ],
    organizes:[],
    normalizer(node/*, id */) {
      return {
        id: node.id,
        label: node.text,
        children: node.children
      }
    },

  }),

  created(){
     this.getOrganizes();
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        if(val == '')val = null;
        this.$emit('input', val)
      }
    },
    isNvDisabled () {
           const self = this
           return self.disabled !== undefined ? self.disabled : self.$route.query['nv-view'] === 'true'
    }
  },
  methods: {
      //获取组织
      getOrganizes(){
        let me = this
        unfetch.get(me.reqOpt.url, {
            params: {
                ORGANIZE_ID: me.reqOpt.organizeId
                }
            }).then(function ({data}) {          
                me.organizes = JSON.parse(JSON.stringify(data));//组织列表
                if(data != undefined){
                  data.forEach(element => {
                    element.children = null;
                  });
                }
                me.options =  data; 
            })
      },
    //点击展开事件，加载下级组织及所属用户
    loadOptions({ action, parentNode, callback }) {
      let me = this;
      //获取组织列表
      parentNode.children = me.getChildrenOrgs(me.organizes,parentNode.id);
      unfetch.get(me.reqOpt.getUsersByOrganizeIdUrl, {
        params: {
          ORGANIZE_ID: parentNode.id
        }
      }).then(function ({data}) {       
         if(data){
           if(!parentNode.children){
               parentNode.children = [];
            } 
           data.forEach(item => {
              parentNode.children.push({id:item.userName,text:item.nickName,parentText:parentNode.text});
           });
         }; 
      })
    },

    //获取下级组织列表
    getChildrenOrgs(organizes,organizeId){
       let me = this
       var result=null;
       var item;
       if(organizes){
        for(var i=0;i<organizes.length;i++){
            item = organizes[i];
            if(item.id == organizeId){                
              if(item.children){
                  result = [];
                item.children.forEach(org => {              
                  result.push({id:org.id,text:org.text,children:null});
                });
              }
              break;
            }else{
                result = me.getChildrenOrgs(item.children,organizeId);
            }
        }
       }
       return  result || null;
    },
    select(node,id){
      this.$emit('select',node);
    },
  }
}


</script>


<style>
.vue-treeselect__menu{
  z-index:999999
}
</style>