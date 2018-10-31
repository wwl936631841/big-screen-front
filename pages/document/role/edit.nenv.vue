<template>
  <div>
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="120px" slot="top">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-form-item label="角色名称" :rules="[{ required: true, message: '角色名称不能为空', trigger: 'blur'}]" >
              <el-input v-model="addForm.ROLE_NAME" placeholder="请输入角色名称">角色名称</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色KEY" :rules="[{ required: true, message: '角色KEY不能为空', trigger: 'blur'}]" >
              <el-input v-model="addForm.ROLE_KEY" placeholder="请输入角色KEY">角色KEY</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="24">
            <el-form-item label="角色描述" >
              <el-input type="textarea" v-model="addForm.ROLE_DESC" placeholder="请输入角色描述">角色描述</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg"  justify="center">
            <el-col :span="12">
              <el-button @click="close">取消</el-button>
              <el-button type="primary" @click="saveOrEdit();">保存</el-button>
            </el-col>
        </el-row>
      </el-form>
  </div>
</template>
<script>
import { getDocumentRole, saveDocumentRole,updateDocumentRole } from './api'
export default {
  name: 'DocumentRoleEdit',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      addForm: {
        ID: null,
        ROLE_DESC: null, // 角色描述
        ROLE_NAME: null, // 角色名称
        ROLE_KEY: null, // 角色KEY
      },
      addRules: {}
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ID () {
      return this.$route.query.ID || this.id;
    }
  },
  methods: {
      close() {
        this.$emit('close')
      },
      getData() {
        const self = this;
        const { ID } = this;

        if (ID) {
          getDocumentRole({ID})
          .then(({data}) => {
            const { addForm } = self;
            addForm.ID = ID;
            addForm.ROLE_DESC = data.ROLE_DESC;
            addForm.ROLE_NAME = data.ROLE_NAME;
            addForm.ROLE_KEY = data.ROLE_KEY;
          }).catch(err => {
            console.log(err);
          })
        }
      },
      saveOrEdit(){
         const self = this;
         const { ID, addForm } = self;
         self.$refs.addForm.validate((valid) => {
           if (valid) {
             Promise.resolve()
             .then(() => {
               if (ID) {
                 return updateDocumentRole(addForm)
               } else {
                 return saveDocumentRole(addForm)
               }
             })
             .then(() => {
               self.$message({
                 message: ID ? '更新成功' : '保存成功',
                 type: 'success'
               })
               self.$refs.addForm.resetFields();
               self.$emit('close')
             })
             .catch(() => {
               self.$message({
                 message: ID ? '更新失败' : '保存失败',
                 type: 'error'
               })
             })
           } else {
             return false
           }
         });
      },

      
    },
    watch: {
      ID (val) {
        if (val) {
          this.getData();
        }
      }
    }
}
</script>
