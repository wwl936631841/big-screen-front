<template>
  <div :style="size" />
</template>
<script>

const echarts = require('echarts')
export default {
  name: 'NvChart',
  props: {
    options: {
        type: Object,
        require: true
    },
    type: {

    },
    size:Object,
  },
  data () {
    return {

    }
  },
  mounted () {
    // this.draw();
  },
  computed: {
    chartOption () {
      return {}
    }
  },
  methods: {
    draw () {
      const el = this.$el
      const myChart = echarts.init(el)
      myChart.setOption(this.chartOption);
    }
  },
  watch: {
      // chartOption (val) {
      //   this.draw()
      // }
  }
}
</script>
<style lang="scss">

</style>


