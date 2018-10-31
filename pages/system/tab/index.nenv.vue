<template>
  <nv-layout>
     <section class="nv-layout-form search-form" slot="top">
        <el-form  ref="form">
            <!-- 搜索框  -->
            <nv-layout-form>
                  <el-button type="primary" @click="getList();"  icon="el-icon-search"  slot="search-button">搜索</el-button>
                  <template slot='search-item'>
                    <el-form-item label="关键字">
                      <el-input v-model="NAME" placeholder="请输入关键字" ></el-input>
                    </el-form-item>
                  </template>
                  <template slot="extra-item">
                    <el-button type="primary" @click="addInfo">新增</el-button>
                  </template>
            </nv-layout-form>
        </el-form>
      </section>

    <section class="search-table">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
        <el-table-column label="标题" min-width="20%">
          <template slot-scope="scope">
            <a :title=" scope.row.TITLE"> {{ scope.row.TITLE }}</a>
          </template>
        </el-table-column>
        <el-table-column label="编号" min-width="20%">
          <template slot-scope="scope">
            <a :title=" scope.row.CODE"> {{ scope.row.CODE }}</a>
          </template>
        </el-table-column>
        <el-table-column label="选项卡类型" min-width="8%" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.TYPE == 'SIMPLE' ? '普通' : '卡片' }}</span>
          </template>
        </el-table-column>
      
        <!-- <el-table-column label="描述" min-width="25%">
          <template slot-scope="scope">
            <a :title=" scope.row.DESCRIPTION"> {{ scope.row.DESCRIPTION }}</a>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="是否删除">
          <template slot-scope="scope">
            <span> {{ scope.row.IS_DELETED == 'YES' ? '是' : '否' }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作"  min-width="18%" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="infor" @click="goTabMenus(scope.row)" icon="information">菜单</el-button>
            <el-button size="small" type="primary" @click="modifyInfo(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="removeInfo(scope.row)">删除</el-button>
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
    <el-dialog title="添加动态选项卡" :visible.sync="isShowAddDialog" size="small">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="标题" prop ="TITLE">
              <el-input v-model="addForm.TITLE" placeholder="请输入标题">标题</el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="编号" prop="CODE">
              <el-input v-model="addForm.CODE" placeholder="请输入编号">编号</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="选项卡类型 " prop="TYPE">
              <!-- <el-input v-model="addForm.TYPE" placeholder="请输入选项卡类型  ">选项卡类型 </el-input> -->
              <nv-select nv-code='TAB_TYPE' v-model="addForm.TYPE"></nv-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="描述">
              <el-input v-model="addForm.DESCRIPTION" placeholder="请输入描述">描述</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex" style=" margin-top: 20px;" justify="center">
          <el-button @click="isShowAddDialog = false">取消</el-button>
          <el-button type="primary" @click="save();">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改动态选项卡" :visible.sync="isShowEditDialog" size="small">
      <el-form :model="modifyForm" ref="modifyForm" :rules="modifyRules"  label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="标题" prop="TITLE">
              <el-input v-model="modifyForm.TITLE" placeholder="请输入标题">标题</el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="编号">
              <el-input v-model="modifyForm.CODE" placeholder="请输入编号" :disabled="true">编号</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="选项卡类型 " prop="TYPE">
              <!-- <el-input v-model="modifyForm.TYPE" placeholder="请输入选项卡类型 SIMPLE:普通 CARD:卡片化 ">选项卡类型 SIMPLE:普通 CARD:卡片化 </el-input> -->
               <nv-select nv-code='TAB_TYPE' v-model="modifyForm.TYPE"></nv-select>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="描述">
              <el-input v-model="modifyForm.DESCRIPTION" placeholder="请输入描述">描述</el-input>
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
import { getTabDatas, deleteTab, saveTab, updateTab, validTab } from './api'
export default {
  name: 'SystemTab',
  data() {
    var codeValid = (rule, value, callback) => {
      var reg = /^[A-Za-z_]+$/; 
      if(!value.match(reg)){
          callback(new Error('类别代码只能是字母和下划线'));
      } else {
        const params = {
          CODE: value
        };
        validTab(params).then(response => {
            var e = response.data; 
            if(e == true){
              callback(new Error('该类别已存在'));
              return;
            }
            callback();
        }).catch(err =>{
          console.log(err);
        });
      
      }
    };
    return {
      isShowAddDialog: false,
      isShowEditDialog: false,
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      NAME: null,
      
      addForm: {
        TITLE: null, // 标题
        CODE: null, // 编号
        TYPE: null, // 选项卡类型 SIMPLE:普通 CARD:卡片化 
        APPLICATION_KEY: null, // 所属系统
        DESCRIPTION: null, // 描述
        IS_DELETED: null // 是否删除 YES:是 NO:否 
      },
      addRules: {
        TITLE: [
          {required: true, message: '标题不能为空', trigger: 'blur'},
          {max: 30, message: '标题长度不能超过30', trigger: 'blur' }
        ],
        TYPE: [{required: true, message: '选项卡类型不能为空', trigger: 'blur'}],
        CODE: [
          {required: true, message: '编号不能为空', trigger: 'blur'},
          { validator: codeValid, trigger: 'blur'}
        ]
      },
      modifyForm: {},
      modifyRules:{ 
          TITLE: [
            {required: true, message: '标题不能为空', trigger: 'blur'},
            {max: 30, message: '标题长度不能超过30', trigger: 'blur' }
            ],
          TYPE: [{required: true, message: '选项卡类型不能为空', trigger: 'blur'}]
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
        NAME: this.NAME
      }
      getTabDatas(pageParams)
      .then(response => {
        this.listLoading = false;
        const data = response.data;
        if (data.list == undefined){
            this.list = null;
            return;
        }
        this.list = data.list.map(v => v);
        this.totalCount = data.totalCount;
      }).catch(err => {
        this.listLoading = false;
        console.log(err);
      })
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
    deleteTab(params).then(response => {
      this.$message.info("删除成功");
      this.getList();
    }).catch(e => {
      this.$message.err("删除失败");
    });
  },

  addInfo(){
    this.isShowAddDialog = true
  },
   // 保存
  save() {
    this.$refs['addForm'].validate((valid) => {
        if (valid) {
            saveTab(this.addForm).then(response => {
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
    })
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
          TITLE: this.modifyForm.TITLE,
          CODE: this.modifyForm.CODE,
          TYPE: this.modifyForm.TYPE,
          APPLICATION_KEY: this.modifyForm.APPLICATION_KEY,
          DESCRIPTION: this.modifyForm.DESCRIPTION,
          IS_DELETED: this.modifyForm.IS_DELETED
        }
        updateTab(params).then(response => {
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

   goTabMenus(row){
        this.$router.push({path:'/system/tab/menu',query:{CODE:row.CODE, TITLE: row.TITLE}});
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
}
</script>
