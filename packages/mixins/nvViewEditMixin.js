export default {
    props: {
        // value: {
        //   type: String,
        //   required: true
        // },
        disabled: {
          type: Boolean,
          default: undefined
        }
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
    }
}