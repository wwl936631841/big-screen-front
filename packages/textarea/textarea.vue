<template>

    <el-input type="textarea" v-model="currentValue"
     :maxlength="maxlength" :minlength="minlength" :placeholder="placeholder" :prefix-icon="prefixIcon"
     :suffix-icon="suffixIcon" :auto-complete="autoComplete" :readonly="readonly" :rows="rows" :autosize="autosize"
     @blur="blur" @focus="focus" @change="change" @clear="clear"
     :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}" style="width:200px;"></el-input>

</template>
<script>
import nvInpterMixins from 'nenv/mixins/inputerMixins'

export default {
   name: 'NvTextarea',
   //mixins: [nvInpterMixins],
   props: {
        value: {
            type: [String,Object]
        },
        disabled: {
            type: Boolean,
            default: undefined
        },
        maxlength:{
          type:[Number,Object]
        },
        minlength:{
          type:[Number,Object]
        },
        placeholder:{
          type:String
        },
        prefixIcon:{
          type:String
        },
        suffixIcon:{
          type:String
        },
        autoComplete:{
          type:String
        },
        readonly:{
          type:String
        },
        rows:{
            type:[Number,Object]
        },
        autosize:{
            type:[Boolean,Object]
        }
   },
   data () {
        return {
            nvOptions: []
        }
   },
   computed: {
       isNvDisabled () {
           const self = this
           return self.disabled !== undefined ? self.disabled : self.$route.query['nv-view'] === 'true'
       },
       currentValue: {
        get() {
            return this.value;
        },
        set(val) {
            this.$emit("input", val);
        }
      }
   },
    methods: {
        fetchOptions() {},
        blur(...args){
        this.$emit("blur",...args);
        },
        focus(...args){
        this.$emit("focus",...args);
        },
        change(...args){
        this.$emit("change",...args);
        },
        clear(...args){
        this.$emit("clear",...args);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
    .el-textarea__input {
        &.is-nv-disabled  + .el-textarea__label {
            cursor: default;
        }
    }
</style>



