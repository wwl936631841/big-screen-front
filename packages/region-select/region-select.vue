<template>
    <el-cascader :options="nvOptions" @active-item-change="handleItemChange" :clearable="clearable" :separator="separator" :placeholder="placeholder" :disabled="disabled" @change="change" v-model="currentValue" :props="props" />
</template>
<script>
export default {
  name: "NvRegionSelect",
  props: {
    area: {
      type: String
    },
    depth: {
      type: Number,
      default: 3
    },
    value: {
      type: Array,
      required: true
    },
    separator: {
      type: String,
      default: "/"
    },
    placeholder: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      nvOptions: [],
      props: {
        value: "CODE",
        label: "NAME",
        children: "children"
      }
    };
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const self = this;
      //获取省份列表
      unfetch("region/children", {
        params: {
          CODE: self.area
        }
      }).then(({ data }) => {
        if (self.depth === 1) {
          data.forEach(item => {
            delete item.children;
          });
        } else {
          self.recursivelyLoadData(data, self.value.slice(), self.depth);
        }
        self.nvOptions = data;
      });
    },

    recursivelyLoadData(loaded, value, depth) {
      const self = this;
      if (value && value.length > 0) {
        for (let i = 0; i < loaded.length; i++) {
          if (loaded[i].CODE === value[0]) {
            // 如果已经加载 则直接加载子节点
            if (loaded[i].children && loaded[i].children.length > 0) {
              return self.recursivelyLoadData(
                loaded[i].children,
                value.slice(1),
                depth - 1
              );
            } else {
              if (depth > 1) {
                return unfetch("region/children", {
                  params: {
                    CODE: loaded[i].CODE
                  }
                }).then(({ data }) => {
                  if (data.length === 0) {
                    delete loaded[i].children;
                    return this.$forceUpdate();
                  }

                  if (depth < 3) {
                    data.forEach(item => {
                      delete item.children;
                    });
                  } else {
                    self.recursivelyLoadData(data, value.slice(1), depth - 1);
                  }
                  loaded[i].children = data;
                });
              }
            }
          }
        }
      }
    },

    handleItemChange(val) {
      const self = this;
      console.log("x");
      return self.recursivelyLoadData(self.nvOptions, val.slice(), self.depth);
    },

    change(...args) {
      this.$emit("change", ...args);
    }
  }
};
</script>
<style lang="scss" >
// 控制输入框内左侧留白宽度
.el-cascader__label {
  padding: 0 15px !important;
}
</style>


