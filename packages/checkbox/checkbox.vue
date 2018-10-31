<template>
    <el-checkbox-group v-model="currentValue" @change="change" :max="max" :min="min" :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}">
        <el-checkbox v-for="option in nvOptions" :border="border" :label="option.VALUE" :key="option.VALUE">{{ option.NAME }}</el-checkbox>
    </el-checkbox-group>
</template>
<script>
import nvInpterMixins from 'nenv/mixins/inputerMixins'
// import nvEditViewMixins from 'nenv/mixins/editViewMixins'

export default {
   name: 'NvCheckbox',
   mixins: [nvInpterMixins],
   props: {
        value: {
            type: Array,
            required: true
        },
        disabled: {
            type: Boolean,
            default: undefined
        },
        border:{
            type:Boolean,
            default:false
        },
        max:{
            type:Number
        },
        min:{
            type:Number
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
       }
   },
   methods:{
       change(...args){
           this.$emit("change",...args);
       }
   }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
    .el-checkbox__input {
        &.is-nv-disabled  + .el-checkbox__label {
            cursor: default;
        }
    }
</style>



