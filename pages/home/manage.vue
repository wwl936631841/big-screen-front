<template>
<div class="manage">
    <manage-index />
</div>
</template>
<script>
import a from './a.scss';
//import MonitorIndex from '../monitor/index.nenv'
import ManageIndex from '../manage/index.nenv'
export default {
     meta: { nvPermission: false },
    //components:{MonitorIndex},
    components:{ManageIndex},
}
</script>
<style lang="scss" scoped>
    .manage{
        // margin: 0 auto;
        width: 3840px;
        height: 1040px;
        display: flex;
        justify-content: center;
    }
</style>


