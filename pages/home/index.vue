<template>
    <div class="homePage">
        <monitor-index />
    </div>
</template>
<script>

//import ManageIndex from '../manage/index.nenv'
import MonitorIndex from '../monitor/index.nenv'
export default {
     meta: { nvPermission: false },
    //components:{ManageIndex},
    components:{MonitorIndex},
    data(){
        return {
            // notices:[],
            // tasktodes:[],
            // count:{}
            
        }
    } ,
    
}

</script>


<style lang="scss" scoped>
.homePage {
    width: 3840px;
    height: 1040px;
//   height: 100%;
    overflow: hidden;
//   margin: 0 auto;
    // position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
}
</style>


