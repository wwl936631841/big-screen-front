<template>
  <nv-layout>
    	 <div >
				  <el-date-picker placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="startDate" style="width:194px;"></el-date-picker>
					<span>至</span>  
				  <el-date-picker  placeholder="选择日期"  value-format="yyyy-MM-dd HH:mm:ss" v-model="endDate"  style="width: 194px;"></el-date-picker>
				<el-button type="infor" @click="search">搜索</el-button>
         </div>
    <div><e-charts :options="polar"></e-charts></div>
  </nv-layout>
</template>

<style>
.echarts {
  height: 300px;
}
</style>
<script>
import {getStatisticalPie,getStatisticalPieType } from './api'

export default {
  name: 'DocumentPie',
  created () {
    this.getStatisticalPieMap();
    this.getStatisticalPieTypeMap();
  },
  data () {
    return {
      startDate:null,
      endDate:null,
      polar:{ 
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        series: [
          {
              name:'访问来源',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                  normal: {
                      position: 'inner'
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:[
                  // { value:335, name:"测试为data几吗", selected:true },
                  // { value:679, name:'营销广告' },
                  // { value:1548, name:'搜索引擎' },
                  // { value:1548, name:'搜索引擎' }
              ]
          },
          {
              name:'访问来源',
              type:'pie',
              radius: ['40%', '55%'],
              label: {
                  normal: {
                      formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                          a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                          },
                          hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          b: {
                              fontSize: 16,
                              lineHeight: 33
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  }
              },
              data:[]
          }
        ]
      }
    }
  },
  methods: {
    getTime(date) {
      this.startDate = date;
    },
    getEndTime(date) {
      this.endDate = date;
    },
    getStatisticalPieMap() {
      const self = this
      const params={"startDate":self.startDate,"endDate":self.endDate}
      getStatisticalPie(params).then(({ data }) => {
        self.listLoading = false;
        data.list.forEach(item => {
          const { series, legend } = self.polar
          series[1].data.push({
            name: item.NAME,
            value: item.COU
          })
          legend.data.push(item.NAME)
        })
      })
      .then(() => {
        // TODO 
        return
      })
      .catch(err => {
        self.listLoading = false;
        console.log(err);
      })
  
    },
     getStatisticalPieTypeMap() {
      const self = this
      const params={"startDate":self.startDate,"endDate":self.endDate}
      getStatisticalPieType(params).then(({ data }) => {
        self.listLoading = false;
        data.list.forEach(item => {
          const { series, legend } = self.polar
           series[0].data.push({
            name: item.NAME=='knowledgeBank'?'知识库':'资料库',
            value: item.COU
          })
          legend.data.push(item.NAME)
        })
      })
      .then(() => {
        // TODO 
        retur
      })
      .catch(err => {
        self.listLoading = false;
        console.log(err);
      })
  
    },
    search(){
      this.polar.series[0].data=[];
       this.polar.series[1].data=[];
      this.getStatisticalPieMap();
      this.getStatisticalPieTypeMap();
    }
}
  
}
</script>