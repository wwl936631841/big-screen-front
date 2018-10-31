<template>
  <div class="tip">
      {{currentPoi}}
  </div>
</template>
<script>
  export default {
    name: 'poiTip',
    data() {
      return {
      }
    },
    props: ["currentPoi"],
  }
</script>
<style lang="scss" scoped>
.tip {
    // left: 10px;
    // top: 10px; 
    position: absolute;
    z-index:  99;
    background:#303133;
    // border:1px solid #0096ff;
    padding: 0.2em 0.3em;
    font-size: 11px;
    color:#ffffff;        
    border-radius: 3px;
    box-shadow: 0 0 0.75em #777777;
}
</style>
