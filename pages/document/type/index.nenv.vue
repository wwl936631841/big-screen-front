<template>
  <nv-layout class="page-demo">
      <section class="nv-layout-form search-form" slot="top">
        <el-form  ref="form" :model="addForm">
          <section class="search-flex">
            <div class="search-form-left">
               <el-button type="primary" @click="addInfo">新增</el-button>
            </div>
            <!-- 搜索框  -->
            <div class="search-form-main">
                <div class="search-form-row">
                  <el-form-item label="类别名称" class="search-form-one">
                    <el-input v-model="NAME" placeholder="请输入字典名称" ></el-input>
                  </el-form-item>
                  <el-form-item label="状态" class="search-form-one all-width">
                    <el-select v-model="STATUS" placeholder="" class="all-width">
                      <el-option v-for="item in searchStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label-width="20px">
                    <el-button type="infor" @click="getList();">搜索</el-button>
                  </el-form-item>
              </div>
            </div>
          </section>
        </el-form>
      </section>

      <section>
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
         <el-table-column label="类别名称" min-width="25%">
            <template slot-scope="scope">
              <a :title="scope.row.NAME"> {{scope.row.NAME}}</a>
            </template>
          </el-table-column>
         
          <el-table-column label="类别代码" min-width="25%">
            <template slot-scope="scope">
              <span> {{scope.row.CODE}}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" align="center" min-width="10%">
            <template slot-scope="scope">
               <el-tag :type="scope.row.STATUS | statusFilter">{{scope.row.STATUS == 'VALID' ? '有效': '无效'}}</el-tag>
            </template>
          </el-table-column>
          
           <el-table-column label="操作" align="center" min-width="40%">
            <template slot-scope="scope">
              <el-popover
                ref="operation"
                placement="left"
                popperClass="operation-popover"
                width="90"
                trigger="hover"
                >
                <el-button size="small" type="infor" @click="goDictionaryData(scope.row)" icon="information">小类</el-button>
                <el-button size="small" type="infor" @click="setDictionaryStatus(scope.row, scope.row.STATUS == 'VALID' ? 'INVALID': 'VALID')">{{scope.row.STATUS == 'INVALID' ? '设为有效': '设为无效'}}</el-button>
                <el-button size="small" type="primary" @click="modifyInfo(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="removeInfo(scope.row)" icon="delete">删除</el-button>
              </el-popover>
              <el-button v-popover:operation>操作</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!-- 分页  -->
        <div class="search-pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper, slot" :total="totalCount">
              <el-button>确定</el-button>
            </el-pagination>
        </div>
    </section>

     <!-- 新增 -->
    <el-dialog title="新增文件类型" :visible.sync="isShowAddDialog" size="small">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="类别名称" prop="NAME">
              <el-input v-model="addForm.NAME" placeholder="请输入类别名称"></el-input>
            </el-form-item>
          </el-col>

      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
            <el-form-item label="类别代码" prop="CODE">
              <el-input v-model="addForm.CODE" placeholder="请输入类别-代码（类别区分唯一标识）" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
	
        <el-row type="flex" justify="center">
          <el-button @click="isShowAddDialog = false">取消</el-button>
          <el-button type="primary" @click="save();">保存</el-button>
        </el-row>
      </el-form>
  </el-dialog>


   <!-- 修改 -->
    <el-dialog title="修改文件类型" :visible.sync="isShowEditDialog" size="small">
      <el-form :model="modifyForm" ref="modifyForm" :rules="modifyRules" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="类别名称" prop="NAME">
              <el-input v-model="modifyForm.NAME" placeholder="请输入类别名称" :maxlength="20" ></el-input>
            </el-form-item>
          </el-col>

      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
            <el-form-item label="类别代码" prop="CODE">
              <el-input v-model="modifyForm.CODE" placeholder="请输入类别-代码（类别区分唯一标识）" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
	
        <el-row type="flex" justify="center">
          <el-button @click="isShowEditDialog = false">取消</el-button>
          <el-button type="primary" @click="update">保存</el-button>
        </el-row>
      </el-form>
  </el-dialog>
  </nv-layout>
</template>
<script>
import { getFileTypeList, deleteFileType, saveFileType , validFileType, updateFileType} from "./api";
export default {
  name: "DocumentType",
  data() {
    var codeValid = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9_]+$/; 
      if(!value.match(reg)){
          callback(new Error('类别代码只能是数字、字母和下划线'));
          return
      }
      if (/^[_]+$/.test(value)){
        callback(new Error('类别代码不能只是下划线'));
        return
      }  
      const params = {
        CODE: value
      };
      validFileType(params).then(response => {
          var e = response.data; 
          if(e == true){
            callback(new Error('该类别已存在'));
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
      list: null,
      listLoading: true,
      NAME:null,
      STATUS: null,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      searchStatus:[
         {
          value: null,
          label: '全部'
        },{
          value: 'INVALID',
          label: '无效'
        },{
          value: 'VALID',
          label: '有效'
        }
      ],

      addForm: {
        CODE: null, // 类别-代码（类别区分唯一标识）
        NAME: null, // 类别名称
        STATUS: null // 类别状态（0：无效，1：有效）
      },

     addRules: {
        NAME: [
          {required: true, message: '类别名称不能为空', trigger: 'blur'},
          {max: 20, message: '类别名称长度不能超过20', trigger: 'blur' }
          ],
        CODE: [
          {required: true, message: '类别代码不能为空', trigger: 'blur'},
          { validator: codeValid, trigger: 'blur'}
        ]
      },

      modifyForm: {},
      modifyRules:{
        NAME: [
          {required: true, message: '类别名称不能为空', trigger: 'blur'},
          {max: 20, message: '类别名称长度不能超过20', trigger: 'blur' }
        ],
        /* CODE: [
          {required: true, message: '类别代码不能为空', trigger: 'blur'},
          { validator: codeValid, trigger: 'blur'}
        ] */
      }
    };

    
  },
  created() {
    this.getList();
  },
  filters: {
    statusFilter(status) {
      const map = {
        INVALID: 'danger',
        VALID: 'success'
      }
      return map[status];
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      const pageParams = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        NAME: this.NAME,
        STATUS: this.STATUS
      };
      getFileTypeList(pageParams)
        .then(response => {
          this.listLoading = false;
          const data = response.data;

          if (data.list == undefined){
            this.list = null;
            return;
          }
          this.list = data.list.map(v => v);
          this.totalCount = data.totalCount;
        })
        .catch(err => {
          this.listLoading = false;
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
      deleteFileType(params).then(response => {
        //const { data, code, msg } = response.data;
          this.$message.info("删除成功");
          this.getList();
      }).catch(e =>{
          this.$message.err("删除失败");
      });
    },

    addInfo(){
      this.isShowAddDialog = true
      this.resetForm('addForm')
    },
    // 保存项目信息
    save() {
       this.$refs['addForm'].validate((valid) => {
          if (valid) {
            // const param = {
            //    CODE: this.addForm.CODE, // 类别-代码（类别区分唯一标识）
            //    NAME: this.addForm.NAME
            // }
            saveFileType(this.addForm).then(response => {
                this.$message({
                  message: '保存成功',
                  type: "success"
                });
                this.resetForm('addForm');
                // 重新加载数据
                this.getList();
              // 隐藏弹出框
              this.isShowAddDialog = false;
            }).catch(err =>{
              console.log(err);
              this.$message({
                message: '保存失败',
                type: "error"
              });
            });
          } else {
            return false;
          }
       });
    },

    modifyInfo(row){
      let backdata = JSON.parse(JSON.stringify(row));
      this.modifyForm = backdata;
      this.isShowEditDialog = true;
    },

    update(){
      this.$refs['modifyForm'].validate((valid) => {
                if (valid) {
                  const params = {
                    ID: this.modifyForm.ID,
                    NAME: this.modifyForm.NAME
                  }
                  updateFileType(params)
                  .then(response => {
                   
                    this.$message({
                      message: response.rawData.msg,
                      type: "success"
                    });
                    this.resetForm('modifyForm');
                    // 重新加载数据
                    this.getList();
                    // 隐藏弹出框
                    this.isShowEditDialog = false;
                  }).catch(e => {
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

     setDictionaryStatus(row, status) {
      const params = {
        ID: row.ID,
        STATUS: status
      };
      updateFileType(params).then(response => {
         this.$message({
            message: response.rawData.msg,
            type: "success"
          });
          // 重新加载数据
          this.getList();
      });
    },

    goDictionaryData(row){
        this.$router.push({path:'/document/type/data',query:{CODE:row.CODE,NAME:row.NAME}});
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

  }
};
</script>
<style lang="scss">

.search-flex{
  display: flex;
  padding-left:20px;
  padding-right:10px;
  justify-content: flex-end;
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