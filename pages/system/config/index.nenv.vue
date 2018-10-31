<template>
  <nv-layout>
      <section class="nv-layout-form search-form" slot="top">
        <el-form >
          <!-- 搜索框  -->
            <nv-layout-form>
              <template slot="extra-item">
                <el-button type="primary" @click="addInfo">新增</el-button>
                <el-button type="primary" @click="batchAddInfo">批量添加</el-button>
              </template>

              <template slot="search-item">
                  <el-form-item label="关键字">
                    <el-input v-model="KEYWORD" placeholder="请输入关键字" @keyup.enter.native = "getList" ></el-input>
                  </el-form-item>
              </template>
              <el-button slot="search-button" type="primary" icon="el-icon-search" @click="getList();">搜索</el-button>
              </nv-layout-form>
        </el-form>
      </section>


    <section class="search-table">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
          <el-table-column label="配置名称">
            <template slot-scope="scope">
               <a  v-show="!scope.row.isEdit" :title="scope.row.NAME">{{scope.row.NAME}}</a>
               <el-input v-show="scope.row.isEdit" size="small" v-model="scope.row.NAME" :maxlength="20" ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="配置key">
            <template slot-scope="scope">
              <span> {{scope.row.KEY}}</span>
            </template>
          </el-table-column>
          <el-table-column label="配置值">
            <template slot-scope="scope">
              <a  v-show="!scope.row.isEdit" :title="scope.row.VALUE">{{scope.row.VALUE}}</a>
              <el-input v-show="scope.row.isEdit" size="small" v-model="scope.row.VALUE" :maxlength="50" ></el-input>
            </template>
          </el-table-column>
           <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button v-show='!scope.row.isEdit' type="primary" @click='scope.row.isEdit = true' size="small" icon="edit">编辑</el-button>
              <el-button v-show='scope.row.isEdit' type="success" @click='modifyConfig(scope.row)' size="small" icon="check">完成</el-button>
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
    <el-dialog title="新增系统配置" :visible.sync="dialogVisible" size="small">
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="配置名称" prop="NAME">
            <el-input v-model="form.NAME" placeholder="请输入配置名称">配置名称</el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="配置key" prop="KEY">
            <el-input v-model="form.KEY" placeholder="请输入配置key">配置key</el-input>
          </el-form-item>
        </el-col>
	    </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="配置值" prop="VALUE">
            <el-input v-model="form.VALUE" placeholder="请输入配置值">配置值</el-input>
          </el-form-item>
        </el-col>
	    </el-row>
	
        <el-row type="flex" style="margin-top:20px;" justify="center">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save();">保存</el-button>
        </el-row>
      </el-form>
  </el-dialog>


  <!-- 批量新增 -->
    <el-dialog title="批量添加配置" :visible.sync="batchDialogVisible" size="small">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  label-width="90px">
        <el-row type="flex"  class="row-bg" justify="space-around">
          <el-col :span="7" style="margin-left:-22px">
           <el-form-item label="配置名称"></el-form-item>
          </el-col>
          <el-col :span="7" style="margin-left:13px">
            <el-form-item label="配置key"></el-form-item>
          </el-col>
          <el-col :span="7" style="margin-left:-5px">
            <el-form-item label="配置值"></el-form-item>
          </el-col>
          <el-col :span="3"></el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around" 
        v-for="(domain, index) in dynamicValidateForm.domains"
         :key="domain.key">
         <el-col :span="7" >
          <el-form-item style="margin-left:-95px;" :prop="'domains.' + index + '.NAME'" :rules="[{ required: true, message: '配置名称不能为空', trigger: 'blur'}]">
            <el-input v-model="domain.NAME" placeholder="请输入配置名称"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="7">
          <el-form-item style="margin-left:-75px;" :prop="'domains.' + index + '.KEY'" 
          :rules="keyRules">
            <el-input v-model="domain.KEY" placeholder="请输入配置key"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="7">
          <el-form-item style="margin-left:-75px;" :prop="'domains.' + index + '.VALUE'" 
            :rules="[
              {required:true, message:'配置值不能为空', trigger: 'blur'},
              {max:50, message:'配置值长度不能超过50', trigger: 'blur'}
            ]"
          >
            <el-input v-model="domain.VALUE" placeholder="请输入配置值"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="3">
           <el-button @click.prevent="removeDomain(domain)" style="margin-left:20px; height: 36px;">删除</el-button>
         </el-col>
	    </el-row>
      
	
        <el-row type="flex" style="margin-top:20px;" justify="center">
          <el-button @click="batchDialogVisible = false">取消</el-button>
          <el-button @click="addDomain">添加行</el-button>
          <el-button type="primary" @click="batchSave"  :disabled="dynamicValidateForm.domains.length >= 1 ? false : true">保存</el-button>
        </el-row>
      </el-form>
  </el-dialog>


  </nv-layout>
</template>
<script>
import { getConfigDatas, saveConfig, batchSaveConfig, validConfigKey, updateConfig } from './api'
export default {
  name: 'SystemConfig',
  data() {
    var keyValid = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9_\.]+$/; 
      if(!value.match(reg)){
          callback(new Error('配置key只能是数字、字母、下划线和小数点'));
      } else {
        const params = {
          CODE: value
        };
        validConfigKey(params).then(response => {
          const data = response.data;
          if(data){
              callback(new Error('该配置已存在'));
              return;
          }
          callback();
          
        }).catch(e => {
          callback(new Error('验证失败'));
          return;
        });
      
      }
    };
    var dupValid = (rule, value, callback) => {
      const arr = this.dynamicValidateForm.domains;
      var i = 0;
      var d;
      for(var j =0; j < arr.length; j ++){
        d = arr[j];
        if(d.KEY == value) {
            i ++;
        }
        if (i > 1){
          callback(new Error('不能重复添加key'));
          return;
        } else {
            if (j == arr.length - 1){
              callback();
            } else {
              continue;
            }
           
        }
       
      }
    };
    return {
      dialogVisible: false,
      batchDialogVisible: false,
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      KEYWORD: '',
      keyValid:'',
      
      form: {
        NAME: null, // 配置名称
        KEY: null, // 配置key
		    VALUE: null // 配置值
      },
      keyRules:[ 
              {required:true, message:'配置key不能为空', trigger: 'blur'},
              {max: 30, message: '配置key长度不能超过30', trigger: 'blur' },
              {validator: dupValid, trigger: 'blur'},
              {validator: keyValid, trigger: 'blur'}
        ],
        
      rules: {
        NAME:[
          {required:true, message:'配置名称不能为空', trigger: 'blur'},
          {max: 20, message: '配置名称长度不能超过20', trigger: 'blur' }
        ],
        VALUE:[
          {required:true, message:'配置值不能为空', trigger: 'blur'},
          {max:50, message:'配置值长度不能超过50', trigger: 'blur'}
        ],
        KEY:[
          {required:true, message:'配置key不能为空', trigger: 'blur'},
          {max: 30, message: '配置key长度不能超过30', trigger: 'blur' },
          {validator: keyValid, trigger: 'blur'}
          ]
      },

     dynamicValidateForm: {
          domains: [{
            NAME: null, // 配置名称
            KEY: null, // 配置key
            VALUE: null // 配置值
          }],
          email: ''
        }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      const pageParams = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        NAME: this.KEYWORD
      }
      getConfigDatas(pageParams).then(response => {
        this.listLoading = false;
        const data = response.data;
        if (data.list == undefined){
            this.list = null;
            return;
        }
        this.list = data.list.map(v => {
              v.isEdit = false;
              return v
            });
        this.totalCount = data.totalCount;
      }).catch(err => {
        console.log(err);
      })
    },
  modifyConfig(row){
      let me = this;
      let data = {
        ID: row.ID,
        NAME: row.NAME,
        VALUE : row.VALUE
      }
      updateConfig(data).then( response=>{
        let data = response.data;
        row.isEdit = false;
        me.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
      }).catch(err=>{
        console.error(err);
        this.$message.err("修改失败");
      })
    },
  reqData(params){
    deleteConfig(params).then(response => {
      this.$message.info("删除成功");
      this.getList();
    }).catch(e => {
      this.$message.err("删除失败");
    });
  },

  addInfo(){
    this.dialogVisible = true
    this.resetForm('form')
  },
   // 保存项目信息
  save() {
     this.$refs['form'].validate((valid) => {
          if (valid) {
            saveConfig(this.form).then(response => {
      
              this.$message({
                message: response.rawData.msg,
                type: "success"
              });
              this.resetForm('form');
              // 重新加载数据
              this.getList();
              // 隐藏弹出框
              this.dialogVisible = false;
            }).catch(e => {
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

  batchAddInfo(){
    this.batchDialogVisible = true
    this.resetForm('dynamicValidateForm')
  },
 // 批量保存项目信息
  batchSave() {
     this.$refs['dynamicValidateForm'].validate((valid) => {
          if (valid) {
            const arr = this.dynamicValidateForm.domains;
            var data = {
              CONFIGS: JSON.stringify(arr)
            }
            batchSaveConfig(data).then(response => {
              this.$message({
                message: response.rawData.msg,
                type: "success"
              });
              this.resetForm('dynamicValidateForm');
              // 重新加载数据
              this.getList();
             // 隐藏弹出框
              this.batchDialogVisible = false;
            }).catch(e => {
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
  },
   removeDomain(item) {
    var index = this.dynamicValidateForm.domains.indexOf(item)
    if (index !== -1) {
      this.dynamicValidateForm.domains.splice(index, 1)
    }
  },
  addDomain() {
    this.dynamicValidateForm.domains.push({
      NAME: null, // 配置名称
      KEY: null, // 配置key
      VALUE: null, // 配置值
      key: Date.now()
    });
  }
}
}
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
