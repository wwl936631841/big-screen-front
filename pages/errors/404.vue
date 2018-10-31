<template>
  <div class="page404">
    <img class="error_image" src="./assets/img/ic_404.png">
    <div class="text-tip">404 未找到对应页面</div>
  </div>
</template>

<script>


 export default {
   data() {
     return {
       
     }
   }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page404{
  background:#fcfdff;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  .text-tip{
    font-size: 36px;
    color:#999;
  }

  .error_image {
    margin-top: 114px;
  }
}

</style>
