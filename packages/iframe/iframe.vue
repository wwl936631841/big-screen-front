<template>
    <iframe class="nv-iframe" ref="dom" :src="nvUrl" />
</template>
<script>
export default {
  name: "NvIframe",
  props: {
    nvUrl: {
      type: String
      //required: true
    }
  }
  // mounted () {
  //     this.loadPage()
  // },
  // methods: {
  //     loadPage () {
  //         const self = this
  //         const { $refs, nvUrl } = self
  //         const iframeEl = self.$refs.dom
  //         console.log(iframeEl)
  //     }
  // }
};
</script>
<style lang="scss" scoped>
.nv-iframe {
  //position: absolute;
  //left: 0;
  //right: 0;
  width: 100%;
  min-height: 106%;
  border: none;
  margin-top:-62px;
}
</style>


