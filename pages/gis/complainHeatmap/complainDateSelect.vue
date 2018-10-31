<template>
    <div class="selectDateRange">
        <el-date-picker
            class="rangeSelect"
            v-model="selectedDates"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button type="primary" @click="searchHeatMap()">查询</el-button>
    </div>
</template>
<script>
import {getNowFormatDate}  from '../utils';

export default {
    mame:'complainDateSelect',
    data(){
        return {
            selectedDates:null,
            startDate:null,
            endDate:null,
        }
    },
    methods:{
        searchHeatMap(){
            if(this.selectedDates&&this.selectedDates.length>1){
                this.startDate=this.selectedDates[0];
                this.endDate=this.selectedDates[1];
                this.$bus.$emit('render-complain-heatmap',this.selectedDates);
            }
        },
        resetDates(){
            let startDate=new Date().getFullYear()+'-01-01';
            let today=getNowFormatDate();
            this.selectedDates=[];
            this.selectedDates.push(startDate);
            this.selectedDates.push(today);
        },
    },
    created(){
        let self=this;
        this.$bus.$on('reset-complain-date',()=>{
            self.resetDates();
            self.searchHeatMap();
        });
    },
    mounted(){
        this.resetDates();
        this.searchHeatMap();
    },
    // beforeDestroy(){
    //     this.$bus.$off('on-reset-complain-date');
    // }
}
</script>
<style lang="scss" scoped>
.selectDateRange{
    position: fixed;
    right: 100px;
    top: 70px;
    width: 315px;
    border-radius: 2px;
    height: 44px;
    line-height: 44px;
    z-index: 99;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 4px rgba(153, 153, 153, .5);
    color: #5f6478;
    font-size: 12px;
}
.rangeSelect{
    width: 235px !important;
}
</style>
