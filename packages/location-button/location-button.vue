<template>
    <div>
      <!-- <el-button type="primary" @click="getLocation();">取经纬度</el-button> -->
      <a href="javascript:void(0);" title="拾取坐标" v-show="!isNvDisabled" @click="getLocation()"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAoCAYAAACfKfiZAAADO0lEQVR42u1Xy2sTQRhfbVHwgQ9QVHzhE6IWmt0JEWzJTqIgePEg4kXtqYigHrQno4IHPbV/gAc9WETxImjxIuYkFkEvKqjgwdoeiikxyW4ebTp+X5LdnZ2dQDbdxEsGfuwwu9/3/fZ7zYyidEd3+Bj5GNmSo9q1HCUTeUp+wbxoUFKszyfwHX4TuOE5VV2Xp9ponkYKZjzCEEacMDPBzevr+XikAITGUCaYv46H+4y49pM3zBu0kXCI4DMHMii7JOO5gf4Q/E3GrBu1jSe8RMT3KIOyOZ0casn436OhjRDTH7yLebd7PJKIOOA9ATpQl3/XQxxd8bb/mLgINUJNtjaH/Bnzl3S0f5dBtbLBGTVdc3ncXV6yvQFroAt1Nk3A0NWkqJQnYiairHTvNlt4/ZItvHrBiiNXXKR4IrYOnST9uD9lCgpsIrBWSb1h4ph//NDzrUOoGoZU0wSyVJt1Z7SDUvIGk47FCisMnfWExdIBzWvWR+1rFZlx/JP5509Yo1Eeve8Ng0WEkkU/ITBcMeVQfvSgIYHS3ZuuCuCJQzkaPjxAvpsNSqt44QwEvOyNwFyamad0aYkicdTpJwfG+TIS+301DzIZ23hl5jcrXLoo7YxWMkMSjjffgql2zuloTmu1SFWVnzzGileHWeHyEDOPR6WdkvdCloZPN03gcyi0AvJgRlrbXIdzYi3ZnHgClEy/jSm9/lqxrp2X1bX49FRKwu3+aisGXa3thlR9yrdfUbGsUYlEUEfL2/G0qq6CULwX3S/9c65k7cwHWdSx1DPBJiyhRpuNPC+qxr+hbCCnonSsbzuU0ZToBUPYmp2SI1MoE+yBdFA9Ap7IeI9l7iqAEs7gt205FWfj4YHawVTeJfFAmqVksK1H86yujXjc7sT9etvvBs8UpQfcPClWAYRnEt915oJC1RNizeNaR29JcNz+aMeeap86fk3Da5iVgDjvOAFIxoNWI8L5/7irLsO+AKWXhfnyThhEIxsA2wB7AAfSuvrlT0z9inPAPsAOALbflUEb77GM8nhHQrc+RA/fEdfrWBs0gd0NDMmwH7A68JgD1gA2A3YC9tYNWe5HglsB6wG9Snc0Of4B7Ht8auHgHCoAAAAASUVORK5CYII="></a>
      <el-dialog title="拾取坐标" :visible.sync="isShowLocationDialog" height="550"  :append-to-body="true">
          <iframe class="nv-iframe" ref="dom" :src="locationUrl"  width="100%" height="550" />
       </el-dialog>
    </div>
</template>
  
<script>

import nvInpterMixins from 'nenv/mixins/inputerMixins'
export default {
   name: 'NvLocationButton',
   mixins: [nvInpterMixins],
   props: {
    disabled: {
      type: Boolean,
      default: undefined
    },
   },
   data(){
       return {
         isShowLocationDialog:false,
         locationUrl:`${process.env.GIS_BASE_URL}`+'#/gphGis/map/snapLoc'
       }
   }, 
   
  computed: {
    isNvDisabled() {
      const self = this;
      return self.disabled !== undefined
        ? self.disabled
        : self.$route.query["nv-view"] === "true";
    },
  },
   methods:{
       getLocation(){
           this.isShowLocationDialog = true;
       },
       handleMessageListener(e){
            let data ;
            if(e.data instanceof Object){
                data = e.data;
            }else{
                data = JSON.parse(e.data)
            }
            if(data.type==='snapLoc') {
                this.$emit("locationChange",data);//父窗口回调获取经纬度
               // console.log(this.lng,this.lat);
            }
       },
       //关闭窗口
       close(){
           this.isShowLocationDialog = false;
       }
   },
   created(){      
       window.addEventListener('message', this.handleMessageListener, false);       
   },
   beforeDestroy(){
       window.removeEventListener('message', this.handleMessageListener);
   },  
}
</script>
