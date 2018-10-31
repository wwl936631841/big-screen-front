<template>
    <el-select v-model="currentValue" :placeholder="isNvDisabled ? '-' : '请选择'" :multiple="multiple" :multiple-limit="multipleLimit" :auto-complete="autoComplete" :filterable="filterable" @change="change" @blur="blur" @focus="focus" :disabled="isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}">
        <el-option v-for="option in nvOptionsExt" :key="option.VALUE" :label="option.NAME" :value="option.VALUE" :disabled="option.disabled"/>
        <slot name="default" />
    </el-select>
</template>
<script>
import nvInpterMixins from "nenv/mixins/inputerMixins";
export default {
  name: "NvSelect",
  mixins: [nvInpterMixins],
  props: {
    value: {
      // type: String,
      required: true
    },
    // 跳过某些选项值不显示
    skipValues: {
      type: Array,
      default() {
        return [];
      }
    },
    // 禁用option中某些值
    disabledValue: {
      type: Array,
      default() {
        return [];
      }
    },

    disabled: {
      type: Boolean,
      default: undefined
    },
    canAllSelect: {
      type: Boolean,
      default: true
    },
    allSelectLabel: {
      type: String,
      default: "全部"
    },
    multiple: {
      type: Boolean
    },
    multipleLimit: {
      type: Number
    },
    autoComplete: {
      type: String
    },
    filterable: {
      type: Boolean
    }
  },
  data() {
    return {
      nvOptions: []
    };
  },
  computed: {
    nvOptionsExt() {
      const self = this;
      const { canAllSelect } = self;
      return (canAllSelect
        ? [
            {
              ID: "-1",
              NAME: self.allSelectLabel,
              VALUE: null
            }
          ]
        : []
      )
        .concat(
          self.nvOptions.filter(item => self.skipValues.indexOf(item.VALUE) < 0)
        )
        .map(item => {
          for (let index = 0; index < self.disabledValue.length; index++) {
            if (item.VALUE === self.disabledValue[index]) {
              item.disabled = true;
            }
          }
          return item;
        });
    },
    isNvDisabled() {
      const self = this;
      return self.disabled !== undefined
        ? self.disabled
        : self.$route.query["nv-view"] === "true";
    }
  },
  methods: {
    change(args, event) {
      var obj;
      this.nvOptions.forEach(element => {
        if (element.VALUE === args) {
          obj = element;
        }
      });
      //返回选中对象
      this.$emit("select", obj);
      //返回选中值
      this.$emit("change", args);
    },
    blur(event) {
      this.$emit("blur", event);
    },
    focus(...args) {
      this.$emit("focus", ...args);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-select__input {
  &.is-nv-disabled + .el-radio__label {
    cursor: default;
  }
}
</style>
