<template>
    <el-input v-model="currentValue" ref="nvInput"
     :maxlength="maxlength" :minlength="minlength" :placeholder="isNvDisabled?'-':placeholder" :clearable="clearable" :prefix-icon="prefixIcon"
     :suffix-icon="suffixIcon" :auto-complete="autoComplete" :readonly="readonly"
     @blur="blur" @focus="focus" @change="change" @clear="clear"  :type="type"
     :rows = " isNvDisabled ? null : rows"
     :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}">
    <slot slot = "append" name="append"/>
    <slot slot = "prepend" name="prepend"/>
    <slot slot = "suffix" name="suffix"/>
    <slot slot = "prefix" name="prefix" />
     </el-input>
</template>
<script>
import nvInpterMixins from "nenv/mixins/inputerMixins";

export default {
  name: "NvInput",
  // mixins: [nvInpterMixins],
  props: {
    value: {
      // type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    maxlength:{
      type:Number
    },
    minlength:{
      type:Number
    },
    placeholder:{
      type:String
    },
	clearable: {
      type: Boolean,
      default: true
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
    type: {
      type: String,
    },
    rows: {
      
    }
  },
  data() {
    return {
      nvOptions: []
    };
  },
  computed: {
    isNvDisabled() {
      const self = this;
      return self.disabled !== undefined
        ? self.disabled
        : self.$route.query["nv-view"] === "true";
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
};
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
.el-input__input {
  &.is-nv-disabled + .el-radio__label {
    cursor: default;
  }
}

// 控制输入框内左侧留白宽度
.el-input__inner{
  padding: 0 15px;
}

</style>



