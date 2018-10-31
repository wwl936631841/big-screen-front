<template>
      <el-date-picker
      v-model="currentValue" 
      :type="type"
      :placeholder="placeholder" 
      :readonly="readonly"  :disabled="isNvDisabled" :editable="editable" :size="size"
      :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder" :format="format"
       :range-separator="rangeSeparator" :value-format="valueFormat" :unlink-panels="unlinkPanels"
       @blur="blur" @focus="focus" @change="change" 
      >
    </el-date-picker>
</template>

<script>
import nvInpterMixins from "nenv/mixins/inputerMixins";

export default {
  name:'NvDatePicker',
  props:{
    readonly:{
        type:Boolean,
        default:false
    },
    editable:{
        type:Boolean,
        default:true
    },
    value: {
        //type:String
    },
    size:{
        type:String
    },
    placeholder:{
        type:String
    },
    startPlaceholder:{
       type:String
    },
    endPlaceholder:{
       type:String
    },
    type:{
        type:String,
        default:'date'
    },
    format:{
        type:String,
        default:'yyyy-MM-dd'
    },
    align:{
        type:String,
        default:'left'
    },
    rangeSeparator:{
        type:String,
        default:'至'
    },
    valueFormat:{
        type:String,
        default:'yyyy-MM-dd'
    },
    disabled: {
        //type: Boolean
    },
    unlinkPanels:{
        type:Boolean,
        default:false
    }

  },

  computed:{
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
  methods:{
    
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
  }
}
</script>

