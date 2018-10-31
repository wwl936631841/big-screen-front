<template>
  <nv-layout>  
     <div >
                <el-select v-model="year" filterable placeholder="选择年份" @change="selectChange">
                  <el-option label="2014" value="2014"></el-option>
                  <el-option label="2015" value="2015"></el-option>
                </el-select>

        <el-button type="infor" @click="getStatisticalBarMap">搜索</el-button>
        <el-button type="infor" @click="goToPie">饼图统计分析</el-button>
     </div>
     <div> 
       <e-charts :options="polar"></e-charts>
    </div>
   
  </nv-layout>
</template>

<style>
.echarts {
  height: 300px;
}
</style>
<script>
import {getStatisticalBar } from './api'

export default {
  name: 'DocmentBar',
  created () {
     this.getStatisticalBarMap();
    // this.getStatisticalPieTypeMap();
  },
  data () {
    return {
      year:'',
      polar:null
    }
  },

  methods: {
    goToPie(){
        this.$router.push({path:'/document/statistics/pie'});
    },
    selectChange(val){
        this.year=val;
    },
    getStatisticalBarMap() {
      const self = this;
      const params={"year":self.year};
      getStatisticalBar(params).then(({ data }) => {
        self.listLoading = false;
      let  polar={ 
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                // ['product', '一月', '二月', '三月', '四月'],
                // ['知识库', 41.1, 30.4, 65.1, 53.3],
                // ['资料库', 86.5, 92.1, 85.7, 83.1]
            ]
        },
        xAxis: [
            {type: 'category', gridIndex: 0},
            {type: 'category', gridIndex: 1}
        ],
        
        yAxis: [
            {gridIndex: 0},
            {gridIndex: 1}
        ],
        grid: [
            {bottom: '55%'},
            {top: '55%'}
        ],
        series: [
            // These series are in the first grid.
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            // These series are in the second grid.
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
        ]
      }
       polar.dataset.source =  data.list ;
       this.polar = polar; 
      })
      .then(() => {
        // TODO 
        return
      })
      .catch(err => {
        self.listLoading = false;
        console.log(err);
      })
  
    }
  }
}
</script>