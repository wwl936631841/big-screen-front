<template>
  <nv-layout>
      <nv-editor v-model="content"/>
  </nv-layout>
</template>
<script>

import Editor from 'wangeditor'

export default {
  name: 'DemoNvEditor',
  data () {
      return {
          content: '我是默认内容'
      }
  }
}
</script>
<style lang="scss" scoped>

</style>


