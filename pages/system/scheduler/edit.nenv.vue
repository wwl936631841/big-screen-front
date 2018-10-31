<template>
      <nv-layout>
      <el-form style="margin:auto" :model="addForm" :rules="addRules" ref="addForm" label-width="90px" slot="top">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-form-item label="任务分组" prop="JOB_GROUP">
              <el-input v-model="addForm.JOB_GROUP" placeholder="请输入任务分组">任务分组</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务名称" prop="JOB_NAME">
              <el-input v-model="addForm.JOB_NAME" placeholder="请输入任务名称">任务名称</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-form-item label="表达式" prop="CRON_EXPRESSION" :rules="[{ required: true, message: '运行时间表达式不能为空', trigger: 'blur'}]">
              <el-input v-model="addForm.CRON_EXPRESSION" placeholder="请输入运行时间表达式">运行时间表达式</el-input>
            </el-form-item>
          </el-col>
         <el-col :span="12">
            <el-form-item label="完整类名" prop="CLASS_NAME" :rules="[{ required: true, message: '完整的类名不能为空', trigger: 'blur'}]">
              <el-input v-model="addForm.CLASS_NAME" placeholder="请输入完整的类名">完整的类名</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
           <el-col :span="12">
            <el-form-item label="任务描述" prop="DESCRIPTION">
              <el-input v-model="addForm.DESCRIPTION" placeholder="请输入任务描述">任务描述</el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        
        <el-row type="flex" style=" margin-top: 20px;" justify="center">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="saveOrEdit();">保存</el-button>
        </el-row>
      </el-form >
      </nv-layout>
</template>
<script>
import { getScheduler, saveScheduler,updateScheduler } from './api'
export default {
  name: 'SchedulerEditor',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  
  data() {
    return {
      addForm: {
        ID: null, // 主键ID
        JOB_GROUP: null, // 任务分组
        JOB_NAME: null, // 任务名称
        CRON_EXPRESSION: null, //'0/50 * * * * ?', // 运行时间表达式
        DESCRIPTION: null, // 任务描述
        CLASS_NAME: null //'com.infore.platform.scheduler.demo.BuyingJob', // 完整的类名
      },
      addRules: {
        JOB_GROUP: [
          { required: true, message: '任务分组不能为空', trigger: 'blur'},
          {max: 30, message: '任务分组长度不能超过30', trigger: 'blur' }],
        JOB_NAME: [
          { required: true, message: '任务名称不能为空', trigger: 'blur'},
          {max: 30, message: '任务名称长度不能超过30', trigger: 'blur' }],
      }
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
      close () {
        this.$emit('close')
      },
      resetFields () {
        this.$refs.addForm.resetFields()
      },
      getData() {
        const self = this
        const { ID } = this
  
        if (ID) {
          getScheduler({ ID })
          .then(({ data }) => {
            const { addForm } = self
            addForm.ID = ID
            addForm.JOB_GROUP = data.JOB_GROUP;
            addForm.JOB_NAME = data.JOB_NAME;
            addForm.CRON_EXPRESSION = data.CRON_EXPRESSION;
            addForm.DESCRIPTION = data.DESCRIPTION;
            addForm.CLASS_NAME = data.CLASS_NAME;
          }).catch(err => {
            console.log(err);
          })
        }
      },
      saveOrEdit(){
        const self = this
        const { ID, addForm } = self
        self.$refs.addForm.validate((valid) => {
          if (valid) {
            Promise.resolve()
            .then(() => {
              if (ID) {
                // addForm.ID = ID
                return updateScheduler(addForm)
              } else {
                return saveScheduler(addForm)
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
            .catch((e) => {
              console.log(e)
            })
          } else {
            return false
          }
        })
      }
    },
    watch: {
      ID (val) {
        if (val) {
          this.getData()
        }
      }
    }
}
</script>
