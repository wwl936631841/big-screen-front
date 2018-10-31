<template>
  <nv-layout>
        <div slot="top">
          <el-form :inline="true">
            <!-- 搜索框  -->
            <div class="search-form-one">
              <el-form-item label="角色名称">
                <el-input placeholder="请输入内容" v-model="keyWord" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </el-form-item>
              
            </div>
          </el-form>
        </div>
        <nv-layout-section :title="item.fileName" :key="item.id" v-for="item in list">
          <div>
            <span>{{ item.createUser }}</span>
            <span>{{ item.updateTime | timeFilter }}</span>
          </div>
          <div v-html="item.highlight" @click="fileViewOrUpload(item.id)" style="cursor:pointer"></div>
        </nv-layout-section>
        <!-- 分页  -->
        <div class="search-pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper, slot" :total="totalCount">
            <el-button>确定</el-button>
          </el-pagination>
        </div>
    </nv-layout>
</template>
<script>
import { searchAttachment, FileView } from './api'
export default {
  name: 'SearchAttachment',
  data() {
    return {
      keyWord: null,
      list: [],
      totalCount: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  created() {
    this.getList();
  },
  filters: {
    timeFilter: function (value) {
      if (!value) return '-'
      value = value.toString();
      return value.substring(0, value.length-2);
    }
  },
  methods: {
    getList() {
      const self = this
      const { keyWord, list, totalCount, pageIndex, pageSize} = self;
      self.listLoading = true;
      searchAttachment(
        {
          pageIndex,
          pageSize,
          keyWord
        }
      ).then(({ data }) => {
        debugger
        self.listLoading = false;
        self.list = data.list || [];
        self.totalCount = data.totalCount;
      }).catch(err => {
        self.listLoading = false;
        console.log(err);
      })
    },
    search(){
      this.getList();
    },

    fileViewOrUpload(id){
      let req = {
        FILE_ID: id
      };
      this.listLoading = true;
      FileView(req).then(({data})=>{
          this.listLoading = false;
          let me = this;
          let url = data.fileUrl + data.filePath;
          unfetch.open(url);
      }).catch(err=>{
        this.listLoading = false
        this.$message.error('预览失败！');
        console.error(err);
      });
      return;
    },

    handleSizeChange(pageIndex) {
      this.pageSize = pageIndex;
      this.getList();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getList();
    },

  }
}
</script>
