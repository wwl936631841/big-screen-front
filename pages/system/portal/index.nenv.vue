<template>
  <nv-layout>
     <section class="nv-layout-form search-form" slot="top">
        <el-form >
            <nv-layout-form>
              <template slot="extra-item">
              <el-button type="primary" @click="addInfo">新增</el-button>
              </template>
            </nv-layout-form>
        </el-form>
      </section>

    <section class="search-table">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
          
          <el-table-column label="首页名称" min-width="15%">
            <template slot-scope="scope">
              <a :title="scope.row.NAME"> {{scope.row.NAME}}</a>
            </template>
          </el-table-column>
      
          <el-table-column label="首页地址" min-width="25%">
            <template slot-scope="scope">
              <span> {{scope.row.VALUE}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="首页地址">
            <template slot-scope="scope">
              <span> {{scope.row.ROLE_IDS}}</span>
            </template>
          </el-table-column> -->
           <el-table-column label="优先级" min-width="7%">
            <template slot-scope="scope">
              <span> {{scope.row.SORT}}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述信息" min-width="25%">
            <template slot-scope="scope">
              <a :title="scope.row.DESCRIPTION"> {{scope.row.DESCRIPTION}}</a>
            </template>
          </el-table-column>
         

          <el-table-column label="操作" align="center" min-width="28">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="roleListDialogInfo(scope.row)">分配角色</el-button>
               <el-button size="small" type="primary" @click="modifyInfo(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="removeInfo(scope.row)" icon="delete">删除</el-button>
            </template>
          </el-table-column>
          
        </el-table>
    </section>

       <!-- 新增 -->
    <el-dialog title="新增门户信息" :visible.sync="isShowAddDialog" size="small">
      <el-form :model="addForm" ref="addForm" :rules="addRules" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="首页名称" prop="NAME">
            <el-input v-model="addForm.NAME" placeholder="请输入类别名称" :maxlength="20">类别名称</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="首页地址" prop="VALUE">
            <el-select v-model="addForm.VALUE">
              <el-option
                v-for ="item in homeSelectOptions"
                :key="item.path"
                :label="item.path"
                :value="item.path"
              />
            </el-select>
            <!-- <el-input v-model="addForm.VALUE" placeholder="请输入类别值" :maxlength="20">类别值</el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
       <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="优先级" prop="SORT">
            <el-input v-model.number="addForm.SORT" placeholder="请输入优先级" :maxlength="3">优先级</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="描述信息" prop="DESCRIPTION">
            <el-input v-model="addForm.DESCRIPTION" placeholder="请输入描述信息" :maxlength="50">描述信息</el-input>
          </el-form-item>
        </el-col>
      </el-row>
     
	
      <el-row type="flex" style="margin-top:20px;" justify="center">
        <el-button @click="isShowAddDialog = false">取消</el-button>
        <el-button type="primary" @click="saveDictionary">保存</el-button>
      </el-row>
    </el-form>
  </el-dialog>


  <el-dialog title="选择角色" :visible.sync="isShowRoleListDialog" size="small">
          <el-table ref="multipleTable" :data="roleList" v-loading.body="listLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" border fit highlight-current-row>
            <el-table-column  type="selection" width="55">
            </el-table-column>
            <el-table-column label="角色名称">
              <template slot-scope="scope">
                <span> {{scope.row.ROLE_NAME}}</span>
              </template>
            </el-table-column>    
          </el-table>
          <el-row type="flex" justify="center" style="padding-top:20px;">
              <el-button @click="isShowRoleListDialog = false">取消</el-button>
              <el-button type="primary" @click="savePortalRole">保存</el-button>
          </el-row>
  </el-dialog>

   <!-- 修改 -->
    <el-dialog title="修改门户信息" :visible.sync="isShowEditDialog" size="small">
      <el-form :model="modifyForm" ref="modifyForm" :rules="modifyRules" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="首页名称" prop="NAME">
            <el-input v-model="modifyForm.NAME" placeholder="请输入首页名称" :maxlength="20">类别名称</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="首页地址" prop="VALUE">
            <el-select v-model="modifyForm.VALUE">
              <el-option
                v-for ="item in homeSelectOptions"
                :key="item.path"
                :label="item.path"
                :value="item.path"
              />
            </el-select>
            <!-- <el-input v-model="modifyForm.VALUE" placeholder="请输入首页地址" :maxlength="20">类别值</el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="优先级" prop="SORT">
            <el-input v-model.number="modifyForm.SORT" placeholder="请输入优先级" :maxlength="3">优先级</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="描述信息" prop="DESCRIPTION">
            <el-input v-model="modifyForm.DESCRIPTION" placeholder="请输入描述信息" :maxlength="50">描述信息</el-input>
          </el-form-item>
        </el-col>
      </el-row>
	
      <el-row type="flex" style="margin-top:20px;" justify="center">
        <el-button @click="isShowEditDialog = false">取消</el-button>
        <el-button type="primary" @click="update();">保存</el-button>
      </el-row>
    </el-form>
  </el-dialog>
  </nv-layout>
</template>
<script>
import {
  deletePortalRole,
  savePortalRoleData,
  getRoleList,
  getDictionaryDatas,
  deleteDictionaryData,
  saveDictionaryData,
  validDictionaryData,
  updateDictionaryData,
  validDictionaryDataSort
} from "./api";

export default {
  name: "PortalData",
  data() {
    var codeValid = (rule, value, callback) => {
      const params = {
        CODE: this.CODE,
        VALUE: value,
        ID: this.ID
      };
      validDictionaryData(params).then(response => {
          var e = response.data; 
          if(e == true){
            callback(new Error('该地址已存在'));
            return;
          }
          callback();
      }).catch(err =>{
        console.log(err);
      });
    };
    var sortValid = (rule, value, callback) => {
      if (!value){
        return
      }
      if(!/^[0-9]+$/.test(value)){
          callback(new Error('排序号只能是数字'));
          return
      } 
      const params = {
        CODE: 'HOME_PAGE',
        SORT: value,
        ID: this.ID
      };
      validDictionaryDataSort(params).then(response => {
          var e = response.data; 
          if(e == true){
            callback(new Error('该优先级已存在'));
            return;
          }
          callback();
      }).catch(err =>{
        console.log(err);
      });
    };
    return {
      isShowAddDialog: false,
      isShowEditDialog: false,
      isShowAddDialog:false,
      isShowRoleListDialog:false,
      ID: null,
      CODE: null,
      PNAME:'',
      checked:false,
      list: null,
      roleList: null,
      listLoading: true,
      roleIds:'',
      multipleSelection: [],
      addPortalRole:{
        ROLE_IDS: null, // 角色ID
        PORTAL_ID: null, // 首页ID
      },
      addForm: {
        CODE: this.CODE, // 类别-代码（类别区分唯一标识）
        NAME: null, // 类别名称
        VALUE: null, // 类别值
        DESCRIPTION: null, // 描述信息
        SORT: null // 排序字段
      },
      addRules: {
        NAME: [{required: true, message: '首页名称不能为空', trigger: 'blur'}],
        VALUE:[
          {required: true, message: '首页地址不能为空', trigger: 'blur'},
          {validator: codeValid, trigger: 'change, click'}
         ],
        SORT: [
          {required: true, message: '优先级不能为空', trigger: 'blur'},
          { validator: sortValid, trigger: 'blur'}]
      },

      modifyForm:{},
      modifyRules: {
        NAME: [{required: true, message: '首页名称不能为空', trigger: 'blur'}],
         VALUE:[
          {required: true, message: '首页地址不能为空', trigger: 'blur'},
          {validator: codeValid, trigger: 'blur'}
         ],
        SORT: [
          {required: true, message: '优先级不能为空', trigger: 'blur'},
          { validator: sortValid, trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    homeSelectOptions () {
      const { flatRoutes } = nenv
      const homes = flatRoutes.filter(x => x.path.indexOf('/home/') === 0).map(x => ({ path: x.path.replace('/home/', ''), title: x.component.title }))
      return homes
    },
  },
  mounted() {
    this.CODE = 'HOME_PAGE';
    this.PNAME =  '';
    this.addForm.CODE = this.CODE;
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      const pageParams = {
        CODE: this.CODE
      };
      console.log(pageParams)
      getDictionaryDatas(pageParams)
        .then(response => {
          this.listLoading = false;
          const { data, msg, code } = response.data;
            this.list = response.data;
        })
        .catch(err => {
          this.listLoading = false;
          console.log(err);
        });
    },  
    getRoleData(){
        this.listLoading = true;
        const pageParams = {
          CODE: this.CODE
        };
        getRoleList(pageParams)
        .then(response => {
          this.listLoading = false;
            let me = this;
          const { data, msg, code } = response.data.map((v) => {
               if(me.roleIds.indexOf(v.ROLE_ID) != -1){
                  v.checked=true;
               }else{
                  v.checked=false;
               }
               return v;
          });
              this.roleList = response.data;
              this.$nextTick(()=>{
              this.handerCurrentChoose();
            })
        })
        .catch(err => {
          this.listLoading = false;
          console.log(err);
        });
    },
     
    handerCurrentChoose(){
      let me = this;
      me.roleList.forEach(x=>{
          me.$refs.multipleTable.toggleRowSelection(x, x.checked);
      })
    },
    roleListDialogInfo(row){  
      let backdata = JSON.parse(JSON.stringify(row));
      this.addPortalRole.PORTAL_ID = backdata.ID;
      this.roleIds=backdata.ROLE_IDS;
      this.getRoleData();
      this.isShowRoleListDialog = true;
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
      deletePortalRole(params).then(response => {
          this.$message.info("删除成功");
          this.getList();
      }).catch(e => {
         this.$message({
            message: '删除失败',
            type: "error"
          });
      });
    },

    // 保存项目信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    savePortalRole(){
        var ids='';
        this.multipleSelection.forEach(x=>{
           ids+=x.ROLE_ID+",";
           this.addPortalRole.ROLE_IDS=ids;
        })
        savePortalRoleData(this.addPortalRole).then(response => {
            this.$message({
              message: '分配角色成功',
              type: "success"
            });
          // 重新加载数据
           this.getList();
          // 隐藏弹出框
          this.isShowRoleListDialog = false;
        }).catch(err =>{
          console.log(err);
          this.$message({
            message: '保存失败',
            type: "error"
          });
        });
       },

       addInfo(){
         this.isShowAddDialog = true
         this.ID = null
         this.resetForm('addForm')
       },
       saveDictionary() {
       this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          return
        }
        saveDictionaryData(this.addForm).then(response => {
          this.$message({
            message:response.rawData.msg,
            type: "success"
          });
          this.resetForm('addForm');
          // 重新加载数据
          this.getList();
          }).catch(err =>{
          this.$message({
            message: '保存失败',
            type: "error"
          });
        });
        // 隐藏弹出框
        this.isShowAddDialog = false;
      });
    },

    modifyInfo(row){  
      let backdata = JSON.parse(JSON.stringify(row));
      this.modifyForm = backdata;
      this.isShowEditDialog = true;
      this.ID = row.ID;
    },
    update(){
      this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            const params = {
              ID: this.modifyForm.ID,
              NAME: this.modifyForm.NAME,
              VALUE: this.modifyForm.VALUE,
              DESCRIPTION: this.modifyForm.DESCRIPTION,
              SORT: this.modifyForm.SORT
            }
            updateDictionaryData(params).then(response => {
              this.$message({
                message: response.rawData.msg,
                type: "success"
              });
              this.resetForm('modifyForm');
              // 重新加载数据
              this.getList();
              // 隐藏弹出框
              this.isShowEditDialog = false;
            }).catch(err => {
              this.$message({
                  message: '修改失败',
                  type: "error"
                });
            });
          } else {
            return false;
          }
      });
    },

    resetForm(formName) {
      if (this.$refs[formName]!==undefined) {
        this.$refs[formName].resetFields();
      }
    }
  }
};
</script>
