<template>
    <div class="theme-selector">
        <a @click="toggleShow"></a>
        <div class="theme-pick el-color-picker el-color-picker--mini">
            <!-- <div class="el-color-picker__trigger" >
                <span class="el-color-picker__color">
                    <span class="el-color-picker__color-inner" style="background-color: color;">
                    </span>
                </span>
                <a  @click="toggleShow" >
                  <i class="el-color-picker__icon" :class="{'el-icon-arrow-up': isShow, 'el-icon-arrow-down': !isShow,}"/>
                </a>
            </div> -->
            <img @click="toggleShow" src="../layout-selector/assets/icons/skin.png" alt="">
        </div>
        <div v-if="isShow"  class="theme" >
            <div class="lump" style="width:36px;height:36px;border-radius:4px;"  v-for="c in colors" :key="c" @click="handleClick(c)" :style="{background: c}"></div>
        </div>
    </div>
 
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      colors: ["#3B8CFF", "#6C5ABE", "#56BAA6", "#182056"],
      isShow: false
    };
  },
  computed: {
    color: {
      get() {
        return this.themePalette.primaryColor;
      },
      set(val) {
        this.theming({ palette: { primaryColor: val } });
      }
    },
    ...mapState("platform", {
      themePalette: state => state.theme.palette
    })
  },
  created() {
    window.addEventListener('click', this.forceClose)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.forceClose)
  },
  methods: {
    toggleShow () {
      this.isShow = !this.isShow
    },
    close () {
      this.isShow = false
    },
    forceClose (event) {
      const self = this
      const { $el } = this
      const target = event.target
      if (target !== $el && !$el.contains(target) ) {
          self.isShow = false
      }
    },
    handleClick (color) {
      console.log('x')
      this.color = color
      this.isShow = false
    },
    ...mapActions("platform", ["theming"])
  }
};
</script>
<style lang="scss" scoped>
.theme-selector {
  display: inline-block;
  padding-right: 10px;
}
.theme-pick {
  vertical-align: middle;
}
.theme {
  position: fixed;
  right: 60px;
  top: 50px;
  width: 188px;
  height: 56px;
  box-shadow: 0 2px 4px 0 rgba(227,227,227,.5);
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .lump {
    display: inline-block;
  }
}
</style>


