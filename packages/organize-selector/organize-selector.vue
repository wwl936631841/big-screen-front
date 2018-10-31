<template>
<treeselect
  :multiple="multiple"
  :options="options"
  :normalizer="normalizer"
  placeholder="请选择"
   search-nested
  v-model="currentValue"
    :value-format="valueFormat"
  :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}"
  />

</template>

<script>
  import nvInpterMixins from 'nenv/mixins/inputerMixins'
  import Treeselect from '@riophae/vue-treeselect'


export default {
  name: 'NvOrganizeSelector',
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
      multiple:{
        type:Boolean,
        default:true
      },
      valueFormat:{
        type:String,
        default:'id'
      },
      disabled:{
        type:Boolean,
        default:false
      }
  },
    model:{
       prop:'value',
       event:'change'
  },
  data: () => ({
    options: [],

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
                me.options =  data; 
            })
      }
  }
}


</script>

<style>
.vue-treeselect__menu{
  z-index:999999
}
</style>