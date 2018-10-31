<template>
    <nv-layout>
        <section class="nv-layout-form search-form" slot="top">
            <el-form ref="form" :model="form" >
                <nv-layout-form>
                    <el-button slot="search-button" @click="searchData" type="primary" icon="el-icon-search">搜索</el-button>
                    <template slot="search-item">
                        <el-form-item label="项目名">
                            <el-input suffix-icon="search" v-model="form.PROJECT_NAME" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="流程类型">
                            <el-select v-model="form.PROC_TYPE" placeholder="请选择流程类型">
                                <el-option label="请假流程" value="PROCESS_LEAVE"></el-option>
                                <el-option label="其它流程" value="OTHER"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                    <!-- <template slot="extra-item">
                        <el-button  type="primary">新增</el-button>
                        <el-button  type="primary">新增</el-button>
                        <el-button  type="primary">新增</el-button>
                    </template> -->
                </nv-layout-form>
            </el-form>
        </section>
        <section class="search-table">
            <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="拼命加载中..." border fit highlight-current-row>
                <el-table-column prop="ROW_ID" align="center" label="序号" min-width="5%"></el-table-column>
                <el-table-column prop="PROJECT_NAME" label="流程名称" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="PROC_TYPE" label="流程类型" align="center" min-width="10%">
                    <template slot-scope="scope">
                        {{scope.row.PROC_TYPE | formatType}}
                    </template>
                </el-table-column>
                <el-table-column prop="CURRENT_ACTI" label="当前步骤" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="OPERATOR" label="当前处理人" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="STARTER" label="发起人" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="START_TIME" label="发起时间" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="USED_TIME" label="经历时间" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="STATUS" label="状态" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="" label="操作" align="center" min-width="10%">
                    <template slot-scope="scope">
                        <div class="opt-cell">
                            <el-button type="primary" size="small" icon="information" @click="viewInfo(scope.row)" plain>查看详情</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <div class="home-detail__page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper, slot"
            :total="totalCount">
            <el-button>确定</el-button>
          </el-pagination>
        </div>
    </nv-layout>
</template>
<script>
export default {
    data() {
        return {
            form:{
                PROJECT_NAME: null,
                PROC_TYPE: null
            },
            listLoading: true,
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            tableData: []
        }
    },
    filters: {
        formatType: function(value){
            let typeMap = {
                'PROCESS_LEAVE': '请假流程'
            }
            return typeMap[value]
        }
    },
    created() {
      this.fetchData();
    },
    methods:{
        fetchData() {
            this.listLoading = true;
            const pagePrams = {
                page: this.pageIndex,
                rows : this.pageSize,
                PROCESS_TYPE: this.form.PROC_TYPE,
                PROJECT_NAME: this.form.PROJECT_NAME
            }
            unfetch({
                url: '/workFlow/getMyTask',
                method: 'get',
                params: pagePrams
            }).then(({data}) => {
                this.listLoading = false;
                this.tableData = data.list.map(v => {
                //v.isEdit = false;
                return v
            });
            this.totalCount = data.totalCount;
        }).catch(err=>{
          console.log(err);
        })
    
        },
        changeSelect(value){
            console.log("change", value);
        },
        handleSizeChange(pageSize){
            this.pageSize = pageSize;
            this.fetchData();
        },
        handleCurrentChange(pageIndex){
            this.pageIndex = pageIndex;
            this.fetchData();
        },
        searchData(){
            this.fetchData();
        },
        viewInfo(row){
            this.$router.push({path:'/demo/process-detail', query:{BUSINESS_ID:row.BUSINESS_ID, PROC_TYPE:row.PROC_TYPE, PROC_INST_ID: row.PROC_INST_ID}});
            console.log(row);
        }
    }
}
</script>


<style lang="scss">

.search-flex{
  display: flex;
  padding-left:20px;
  padding-right:10px;
  justify-content: flex-start;
}
.search-form-one{
  flex:1
}

.search-form-main{
  flex:1
}

.button-placeholader {
  opacity: 0;
}

.all-width{
  width: 100% !important;
}
</style>