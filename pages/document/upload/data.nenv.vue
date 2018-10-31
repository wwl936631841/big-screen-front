<template>
  <nv-layout>
      <section class="search-form" style="padding:20px;" slot="top">
        <el-form>
            <!-- 搜索框  -->
  			<div class="search-form-one">
  			    

  				<el-button type="primary" @click="addInfo">新增</el-button>
  			</div>
        </el-form>
      </section>

      <div style="float: left; margin-bottom: 10px; margin-left: 20px; font-size: 14px">
        <el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/system/dictionary/' }">数据字典</el-breadcrumb-item>
					<el-breadcrumb-item>{{PNAME}}</el-breadcrumb-item>
				</el-breadcrumb>
      </div>


    <section class="search-table">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
          
          <el-table-column label="类别名称">
            <template slot-scope="scope">
              <a :title="scope.row.NAME"> {{scope.row.NAME}}</a>
            </template>
          </el-table-column>
      
          <el-table-column label="类别值">
            <template slot-scope="scope">
              <span> {{scope.row.VALUE}}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述信息">
            <template slot-scope="scope">
              <a :title="scope.row.DESCRIPTION"> {{scope.row.DESCRIPTION}}</a>
            </template>
          </el-table-column>
          <el-table-column label="排序">
            <template slot-scope="scope">
              <span> {{scope.row.SORT}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button size="small" type="primary" @click="modifyInfo(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="removeInfo(scope.row)" icon="delete">删除</el-button>
            </template>
          </el-table-column>
          
        </el-table>
    </section>

     <!-- 新增 -->
    <el-dialog title="新增数据字典小类" :visible.sync="isShowAddDialog" size="small">
      <el-form :model="addForm" ref="addForm" :rules="addRules" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="类别名称" prop="NAME">
            <el-input v-model="addForm.NAME" placeholder="请输入类别名称" :maxlength="20">类别名称</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="类别值" prop="VALUE">
            <el-input v-model="addForm.VALUE" placeholder="请输入类别值" :maxlength="20">类别值</el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="是否允许上传" prop="NAME">
								<el-radio-group v-model="addForm.IS_NECESSARY" >
									<el-radio label="YES">是</el-radio>
									<el-radio label="NO">否</el-radio> 
								</el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="允许文件类型" prop="VALUE">
            <el-input v-model="addForm.ACCEPT_TYPE" placeholder="请输入文件类型" :maxlength="20">类别值</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="排序序号" prop="SORT">
            <el-input v-model.number="addForm.SORT" placeholder="请输入排序序号" :maxlength="3">排序顺序</el-input>
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
      
      <el-row type="flex" justify="center">
        <el-button @click="isShowAddDialog = false">取消</el-button>
        <el-button type="primary" @click="save();">保存</el-button>
      </el-row>
    </el-form>
  </el-dialog>


   <!-- 修改 -->
    <el-dialog title="字典信息" :visible.sync="isShowEditDialog" size="small">
      <el-form :model="modifyForm" ref="modifyForm" :rules="modifyRules" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="类别名称" prop="NAME">
            <el-input v-model="modifyForm.NAME" placeholder="请输入类别名称" :maxlength="20">类别名称</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="类别值" prop="VALUE">
            <el-input v-model="modifyForm.VALUE" placeholder="请输入类别值" :disabled="true" :maxlength="20">类别值</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
       <el-col :span="12">
          <el-form-item label="是否允许上传" prop="NAME">
								<el-radio-group v-model="modifyForm.IS_NECESSARY" >
									<el-radio label="YES">是</el-radio>
									<el-radio label="NO">否</el-radio> 
								</el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="允许文件类型" prop="VALUE">
            <el-input v-model="modifyForm.ACCEPT_TYPE" placeholder="请输入文件类型" :maxlength="20">类别值</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="排序序号" prop="SORT">
            <el-input v-model.number="modifyForm.SORT" placeholder="请输入排序序号" :maxlength="3">排序顺序</el-input>
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
	
      <el-row type="flex" justify="center">
        <el-button @click="isShowEditDialog = false">取消</el-button>
        <el-button type="primary" @click="update();">保存</el-button>
      </el-row>
    </el-form>
  </el-dialog>
  </nv-layout>
</template>
<script>
import {
  getFileTypeDatas,
  deleteFileTypeData,
  saveFileTypeData,
  validFileTypeData,
  updateFileTypeData,
  validFileTypeDataSort
} from "./api";
export default {
  name: "DictionaryData",
  data() {
    var codeValid = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9_]+$/; 
      if(!value.match(reg)){
          callback(new Error('类别值只能是数字、字母和下划线'));
          return
      } 
      if (/^[_]+$/.test(value)){
        callback(new Error('类别值不能只是下划线'));
        return
      }  
      const params = {
        CODE: this.CODE,
        VALUE: value
      };
      validFileTypeData(params).then(response => {
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
    var sortValid = (rule, value, callback) => {
      /* if (!value){
        return
      } */
      if(!/^[0-9]+$/.test(value)){
          callback(new Error('排序序号只能是数字'));
          return
      }
      if(value == "0"){
          callback(new Error('排序序号不能为0'));
          return
      } 
      const params = {
        CODE: this.CODE,
        SORT: value,
        ID: this.ID
      };
      debugger;
      validFileTypeDataSort(params).then(response => {
          var e = response.data; 
          if(e == true){
            callback(new Error('该排序号已存在'));
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
      ID: null,
      CODE: '',
      PNAME:'',
      list: null,
      listLoading: true,
    
      addForm: {
        CODE: this.CODE, // 类别-代码（类别区分唯一标识）
        NAME: null, // 类别名称
        VALUE: null, // 类别值
        IS_NECESSARY:'NO',//是否允许文件上传
        ACCEPT_TYPE:'', //允许上传的文件类型
        DESCRIPTION: null, // 描述信息
        SORT: null // 排序字段
      },
      addRules: {
        NAME: [{required: true, message: '类别名称不能为空', trigger: 'blur'}],
        VALUE:[
          {required: true, message: '类别值不能为空', trigger: 'blur'},
          {validator: codeValid, trigger: 'blur'}
        ],
        SORT: [
          //{ type: 'number', message: '序号必须为数字值', trigger: 'blur'},
          {required: true, message: '排序序号不能为空', trigger: 'blur'},
          {validator: sortValid, trigger: 'blur'}
        ]
      },

      modifyForm:{},
      modifyRules: {
        NAME: [{required: true, message: '类别名称不能为空', trigger: 'blur'}],
        SORT: [
          {required: true, message: '排序序号不能为空', trigger: 'blur'},
          {validator: sortValid, trigger: 'blur'}
        ],
      }
    };
  },
  mounted() {
    this.CODE = this.$route.query.CODE || '';
    this.PNAME = this.$route.query.NAME || '';
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
      getFileTypeDatas(pageParams)
        .then(response => {
          this.listLoading = false;
          const { data, msg, code } = response.data;
            this.list = response.data.map(v => v);
            console.log(this.list)
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
      deleteFileTypeData(params).then(response => {
          this.$message.info("删除成功");
          this.getList();
      }).catch(e => {
         this.$message({
            message: '删除失败',
            type: "error"
          });
      });
    },

    addInfo(){
      this.isShowAddDialog = true
      this.ID = null
      this.resetForm('addForm')
    },
    // 保存项目信息
    save() {
       this.$refs['addForm'].validate((valid) => {
          if (valid) {
            saveFileTypeData(this.addForm).then(response => {
                this.$message({
                  message: response.rawData.msg,
                  type: "success"
                });
                this.resetForm('addForm');
                // 重新加载数据
                this.getList();
              // 隐藏弹出框
              this.isShowAddDialog = false;
            }).catch(err => {
              this.$message({
                  message: '添加失败',
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
      this.ID = row.ID;
    },
    update(){
      this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            const params = {
              ID: this.modifyForm.ID,
              NAME: this.modifyForm.NAME,
              DESCRIPTION: this.modifyForm.DESCRIPTION,
              SORT: this.modifyForm.SORT,
              IS_NECESSARY:this.modifyForm.IS_NECESSARY,
              ACCEPT_TYPE:this.modifyForm.ACCEPT_TYPE
            }
            updateFileTypeData(params).then(response => {
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
