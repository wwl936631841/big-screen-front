<template>
  <nv-layout>
    <section class="search-form" slot="top">
      <el-form >
        <!-- 搜索框  -->
          <nv-layout-form>
            <el-button type="primary" @click="getList();" slot="search-button" icon="el-icon-search">搜索</el-button>
            <template slot="search-item">
              <el-form-item label="角色名称" >
                <el-input v-model="ROLE_NAME" placeholder="请输入角色名称" size="middle" @keyup.enter.native = "getList"></el-input>
              </el-form-item>
              <el-form-item label="角色KEY">
                <el-input v-model="ROLE_KEY" placeholder="请输入角色KEY" size="middle" @keyup.enter.native = "getList"></el-input>
              </el-form-item>
            </template>
            <template slot="extra-item">
              <el-button type="primary" @click="showAdd">新增</el-button>
            </template>
          </nv-layout-form>
        <!-- <div class="search-form-one">
          
          <el-form-item label="角色名称">
            <el-input v-model="ROLE_NAME" placeholder="请输入角色名称" size="middle" @keyup.enter.native = "getList"></el-input>
          </el-form-item>
          <el-form-item label="角色KEY">
            <el-input v-model="ROLE_KEY" placeholder="请输入角色KEY" size="middle" @keyup.enter.native = "getList"></el-input>
          </el-form-item>
          <el-button type="primary" @click="getList();">搜索</el-button>

        </div> -->
      </el-form>
    </section>

    <section class="search-table">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" @sort-change="sortChange" border fit highlight-current-row>
        <el-table-column label="角色名称" prop = "ROLE_NAME" />
        <el-table-column label="角色KEY" prop = "ROLE_KEY" />
        <el-table-column label="角色描述" prop = "ROLE_DESC" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="showEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="primary" @click="relateFolder(scope.row)">关联文件夹</el-button>
            <el-button size="small" type="primary" @click="showUsersDialog(scope.row)">关联用户</el-button>
            <el-button size="small" type="danger" @click="removeInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页  -->
      <div class="search-pagination" v-if="this.totalCount > 10">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper, slot" :total="totalCount">
          <el-button>确定</el-button>
        </el-pagination>
      </div>
    </section>

    <!-- 新增 -->
    <el-dialog title="添加文档角色表" :visible.sync="isShowAddDialog" size="small">
      <document-role-editor @close="closeAddDialog" ></document-role-editor>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改文档角色表" :visible.sync="isShowEditDialog" size="small">
      <document-role-editor :id="ID" @close="closeEditDialog" ></document-role-editor>
    </el-dialog>

    <!-- 关联文件夹 -->
    <el-dialog title="角色关联文件夹" :visible.sync="isShowFolderTreeDialog" size="small">
      <folder-tree :id="ID" @close="closeFolderTreeDialog" ></folder-tree>
    </el-dialog>

    <!-- 关联人员 -->
    <el-dialog title="请选择人员" :visible.sync="isSelectUserDialog" width="800px">
        <nv-person-choose ref="personchoose" :result="currentChooseList" @sync-result="syncResult"  @get-choose-person="getChoosePerson" @cancel-choose-person="cancelChoose" ></nv-person-choose>
    </el-dialog>

  </nv-layout>
</template>
<script>
import DocumentRoleEditor from "./edit.nenv";
import FolderTree from "./folderTree.nenv";

import { getDocumentRoleDatas, deleteDocumentRole, batchUpdateRoleUser, getUsersByRoleId } from './api'
export default {
  name: 'DocumentRole',
  components: { DocumentRoleEditor, FolderTree },
  data() {
    return {
      isShowAddDialog: false,
      isShowEditDialog: false,
      isShowFolderTreeDialog: false,
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 10,
      orderBy: null,
      totalCount: 0,
      ID: null,
      ROLE_NAME: null,
      ROLE_KEY: null,

      // 当前选择的人
      currentChooseList:[],
      isSelectUserDialog:false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const self = this
      const { pageIndex, pageSize, orderBy, ROLE_NAME, ROLE_KEY} = self;

      self.listLoading = true;

      getDocumentRoleDatas(
        {
          pageIndex,
          pageSize,
          orderBy, ROLE_NAME, ROLE_KEY
        }
      ).then(({ data }) => {
        self.listLoading = false;
        self.list = data.list || null
        self.totalCount = data.totalCount;
      }).catch(err => {
        self.listLoading = false;
        console.log(err);
      })
    },

    // 获取选中的人员信息
    getChoosePerson(choosePerson){
      if(choosePerson.length == 0){
        this.$message.info("请先选择移交给的人员！");
        return
      }
      this.isSelectUserDialog = false
      if(choosePerson && choosePerson.length>0){
        this.currentChooseList =  choosePerson;
        this.relateUser(choosePerson);
      }else{
        this.currentChooseList = [];
      }
    },

    // 批量更新角色人员关系
    relateUser(choosePerson) {
        const self = this
        self.listLoading = true;
        let userIds = "";
        choosePerson.forEach(user => {
          userIds += user.userName + ",";
        });

        console.log(choosePerson);

        batchUpdateRoleUser(
          {
            "ROLE_ID" : self.ID,
            "USER_IDS" : userIds
          }
        ).then(({ data }) => {
          self.listLoading = false;
          self.$message.success("关联成功！");
        }).catch(err => {
          self.listLoading = false;
          console.log(err);
        })
      },

    cancelChoose(){
        this.isSelectUserDialog = false;
    },

    syncResult(result){
        this.currentChooseList = result;
    },

    removeInfo(row) {
      let me = this;
      const params = {
        ID: row.ID
      }
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback:(action,instance)=>{
          if(action=='confirm'){
            me.reqData(params);
          }
        }
      });
  },
  reqData(params){
    deleteDocumentRole(params).then(response => {
      this.$message.info("删除成功");
      this.getList();
    }).catch(e => {
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
  // 关联文件夹
  relateFolder(row){
    this.isShowFolderTreeDialog = true;
    this.ID = row.ID;
  },
  
  // 展示选择人员控件时先查询之前选择的数据
  showUsersDialog(row){
    // 先清除选项
    this.currentChooseList.splice(0,this.currentChooseList.length);
    // 不知道为什么通过这种方式一直获得不到对象
    // this.$refs.personchoose.clearResult();
    this.isSelectUserDialog = true;
    this.ID = row.ID;

    const self = this;
    getUsersByRoleId({"ROLE_ID": this.ID})
    .then(({data}) => {
      data.list.forEach(item => {
        let user = {};
        user.userId = item.ID;
        user.userName = item.USERNAME;
        user.nickName = item.NICKNAME;
        user.mobile = item.MOBILE;
        user.position = item.POSITION;
        self.currentChooseList.push(user);
      });
    }).catch(err => {
      self.listLoading = false;
      console.log(err);
    })
  },
  closeEditDialog () {
    this.isShowEditDialog = false;
    this.getList();
  },
  closeFolderTreeDialog () {
    this.isShowFolderTreeDialog = false;
    // this.getList();
  },
  closeAddDialog () {
    this.isShowAddDialog = false;
    this.getList();
  },
  sortChange(data){
    const culomn = data.prop;
    if(!culomn){
      this.orderBy = null;
      this.getList();
      return;
    }
    var order = data.order == 'descending' ? ' DESC' : ' ASC';
    this.orderBy = data.prop + order;
    this.getList()
  },

  
  handleSizeChange(pageIndex) {
    this.queryPrams.pageSize = pageIndex;
    this.getList();
  },
  handleCurrentChange(pageIndex) {
    this.pageIndex = pageIndex;
    this.getList();
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
}
}
</script>
