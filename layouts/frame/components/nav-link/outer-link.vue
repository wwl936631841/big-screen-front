<script>
export default {
  name: 'OuterLink',
  props: {
      tag: {
          type: String,
          default: 'a'
      },
      target: {
          type: String,
          default: 'a'
      },
      to: {
          type: String,
          required: 'to'
      }
  },
  render (h) {
      const data = {

      }

      const on = {
         click: () => {
            //window.open(this.to)
         }
      }

      //if ()
      // 强制适应a标签
      data.attrs = { 
        href: this.to,
        target: '_blank'
      }

      data.on = on

      return h('a', data, this.$slots.default)
  }
}
</script>

<style lang="scss" scoped>

</style>

