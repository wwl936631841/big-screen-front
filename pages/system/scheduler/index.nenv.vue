<template>
  <nv-layout>
    <section class="nv-layout-form search-form" slot="top">
      <el-form>
        <!-- 搜索框  -->
         <nv-layout-form>
           <template slot="extra-item">
            <el-button type="primary" @click="showAdd">新增</el-button>
           </template>
         </nv-layout-form>
      </el-form>
    </section>

    <section class="search-table">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" @sort-change="sortChange" border fit highlight-current-row  style="width: 100%">
        <el-table-column label="分组" prop = "JOB_GROUP" min-width="8%" />
        <el-table-column label="名称" prop = "JOB_NAME" sortable  min-width="8%">
          <template slot-scope="scope">
            <a :title="scope.row.JOB_NAME"> {{scope.row.JOB_NAME}}</a>
          </template>  
        </el-table-column>
        <el-table-column label="运行时间" prop = "CRON_EXPRESSION" min-width="10%" />
        <el-table-column label="状态" min-width="8%">
          <template slot-scope="scope">
            <el-tag :type="scope.row.STATUS | statusFilter">{{scope.row.STATUS == 'OPENED' ? '运行中': '已暂停'}}</el-tag>
            <!-- {{ scope.row.STATUS | statusFilter }} -->
          </template>
        </el-table-column>
        <el-table-column label="任务描述" prop = "DESCRIPTION" min-width="14%">
          <template slot-scope="scope">
            <a :title="scope.row.DESCRIPTION"> {{scope.row.DESCRIPTION}}</a>
          </template>
        </el-table-column>
        <el-table-column label="完整的类名" prop = "CLASS_NAME" min-width="15%">
          <template slot-scope="scope">
            <a :title="scope.row.CLASS_NAME"> {{scope.row.CLASS_NAME}}</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  width="320">
          <template slot-scope="scope">
            <el-popover
              ref="operation"
              placement="left"
              popperClass="operation-popover"
              width="70"
              trigger="hover"
              >
              <el-button size="small" type="primary" @click="showEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="primary" v-if="scope.row.STATUS == 'OPENED'" @click="pauseScheduler(scope.row)" >暂停</el-button>
              <el-button size="small" type="primary" v-if="scope.row.STATUS == 'PAUSED'" @click="resumeScheduler(scope.row)">恢复</el-button>
              <el-button size="small" type="primary" v-if="scope.row.STATUS == 'OPENED'" @click="runOnce(scope.row.ID)">执行</el-button>
              <el-button size="small" type="danger" @click="removeInfo(scope.row)">删除</el-button>
            </el-popover>
            <el-button v-popover:operation>操作</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页  -->
      <div class="search-pagination" v-if="this.totalCount > 10">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper, slot" :total="totalCount">
          <el-button>确定</el-button>
        </el-pagination>
      </div>
    </section>

    <!-- 新增 -->
    <el-dialog title="添加任务" :visible.sync="isShowAddDialog" size="small">
      <scheduler-editor @close="closeAddDialog" ref="addDialog"></scheduler-editor>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改任务" :visible.sync="isShowEditDialog"  size="small">
      <scheduler-editor  :id="ID" @close="closeEditDialog"></scheduler-editor>
    </el-dialog>
  </nv-layout>
</template>
<script>
import SchedulerEditor from "./edit.nenv";

import {
  getSchedulerDatas,
  deleteScheduler,
  runOnceScheduler,
  resumeScheduler,
  pauseScheduler
} from "./api";

export default {
  name: "Scheduler",
  components: { SchedulerEditor },
  data() {
    return {
      isShowAddDialog: false,
      isShowEditDialog: false,
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 10,
      orderBy: null,
      totalCount: 0,
      ID: null
    };
  },
  created() {
    this.getList();
  },
  filters: {
    statusFilter(status) {
      const map = {
        PAUSED: 'danger',
        OPENED: 'success'
      }
      return map[status];
    }
  },
  methods: {
    getList() {
      const self = this
      const { pageIndex, pageSize, orderBy } = self
      
      self.listLoading = true;

      getSchedulerDatas(
        {
          pageIndex,
          pageSize,
          orderBy
        }
      ).then(({ data }) => {
          self.listLoading = false;
          self.list = data.list || null
          self.totalCount = data.totalCount;
      })
      .catch(err => {
        self.listLoading = false;
        console.log(err);
      });
    },
    removeInfo(row) {
      let me = this;
      const params = {
        ID: row.ID
      };
      this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action, instance) => {
          if (action == "confirm") {
            me.reqData(params);
          }
        }
      });
    },
    reqData(params) {
      deleteScheduler(params)
        .then(response => {
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(e => {
          this.$message.err("删除失败");
        });
    },
    showAdd() {
      this.isShowAddDialog = true;
    },
    showEdit(row) {
      this.isShowEditDialog = true;
      this.ID = row.ID;
    },
    closeEditDialog () {
      this.ID = null
      this.isShowEditDialog = false;
      this.getList();
    },
    closeAddDialog () {
      this.isShowAddDialog = false;
      this.getList();
    },

    sortChange(data) {
      const culomn = data.prop;
      if (!culomn) {
        this.orderBy = null;
        this.getList();
        return;
      }
      var order = data.order == "descending" ? " DESC" : " ASC";
      this.orderBy = culomn + order;
      this.getList();
    },

    runOnce(id) {
      let me = this;
      const params = {
        ID: id
      };
      this.$confirm("立即执行一次该任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action, instance) => {
          if (action == "confirm") {
            runOnceScheduler(params)
              .then(response => {
                this.$message.success("执行成功");
                this.getList();
              })
              .catch(e => {
                this.$message.err("运行失败");
              });
          }
        }
      });
    },

    pauseScheduler(row) {
      let me = this;
      const params = {
        ID: row.ID
      };
      this.$confirm("确定暂停该任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action, instance) => {
          if (action == "confirm") {
            pauseScheduler(params)
              .then(response => {
                this.$message.success("设置成功");
                this.getList();
              })
              .catch(e => {
                this.$message.err("设置失败");
              });
          }
        }
      });
    },
    resumeScheduler(row) {
      let me = this;
      const params = {
        ID: row.ID
      };
      this.$confirm("确定恢复该任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action, instance) => {
          if (action == "confirm") {
            resumeScheduler(params)
              .then(response => {
                this.$message.success("设置成功");
                this.getList();
              })
              .catch(e => {
                this.$message.err("设置失败");
              });
          }
        }
      });
    },

    handleSizeChange(pageIndex) {
      this.pageSize = pageIndex;
      this.getList();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getList();
    },
    resetForm(formName) {
      if (this.$refs[formName]!==undefined) {
        this.$refs[formName].resetFields();
      }
    }
  },
  watch: {
    isShowAddDialog (val) {
      if (!val) {
        this.$refs.addDialog.resetFields()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .operation-popover {
    .el-button + .el-button {
      margin: 10px 0 0px 0;
    }
  }
</style>

