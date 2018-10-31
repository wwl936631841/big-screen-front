<template>
  <li>
      <span><img :src="layerInfo.icon"  class="pms-preview"></span>
      <el-checkbox v-model="layerInfo.visible" @change="toggleLayer(layerInfo.id)">{{layerInfo.id}}</el-checkbox>
  </li>
</template>
<script>
  import { mapActions, mapState } from 'vuex';
  import store from '../store';
  export default {
    props: ['layerInfo'],
    methods: {
      toggleLayer (layerId) {
        this.toggleLayerVisibility({layerId:layerId,isVisible:this.layerInfo.visible});
      },
      ...mapActions(store.name, ['toggleLayerVisibility']),
    },
    created(){
    },
  }
</script>
<style lang="scss" scoped>
  .pms-preview{
    max-width: 18px;
    max-height: 18px;
  }
  li{width: 100%;padding: 0;}
  li>span{display: inline-block;width: 20px;padding-right: 5px;text-align: center;}
</style>
