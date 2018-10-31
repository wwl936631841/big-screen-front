<template>
<div class="legendContainer">
    <div class="colorDesc">
    <span class="textTip lower">低</span>
    <div class="colorRamp">
    </div>
    <span class="textTip heigher">高</span>
    </div>
</div>
</template>
<script>
export default {
    name: 'PatrolLegendPanel',
    data() {
      return {
      }
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
.legendContainer{
    width: 322px;
    height: 39px;
    // position: fixed;
    position: absolute;
    // left: 5px;
    left: 220px;
    // bottom:10px;
        top: 1000px;
    z-index: 99;
}
.colorDesc{
    width: 100%;
    height: 39px;
    position: relative;
}
.colorRamp{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 30px;
    margin: -15px -40%;
    display: inline-block;
    background: -webkit-linear-gradient(right,rgb(0,0,255), rgb(117, 211, 248), rgb(0, 255, 0),rgb(255, 234, 0),rgb(255,0,0)); /* Safari 5.1 - 6 */
    background: -o-linear-gradient(right,rgb(0,0,255), rgb(117, 211, 248), rgb(0, 255, 0),rgb(255, 234, 0),rgb(255,0,0)); /* Opera 11.1 - 12*/
    background: -moz-linear-gradient(right,rgb(0,0,255), rgb(117, 211, 248), rgb(0, 255, 0),rgb(255, 234, 0),rgb(255,0,0)); /* Firefox 3.6 - 15*/
    background: linear-gradient(to right, rgb(0,0,255), rgb(117, 211, 248), rgb(0, 255, 0),rgb(255, 234, 0),rgb(255,0,0)); /* 标准的语法 */
}
.textTip{
    position: absolute;
    line-height: 30px;
    color: #fff;
}
.lower{
    top: 4.5px;
    left: 10px;
}
.heigher{
    top: 4.5px;
    right: 10px;
}
</style>

