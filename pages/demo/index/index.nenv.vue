<template>
  <nv-layout prefixType="1">
    <!-- <h2>平台组件</h2> -->
    <nv-layout-section title="输入控件">
      <div>
        <nv-form-uploader />
        <h4 v-nv-view.display>1.1多选框</h4>
        <nv-checkbox nv-code="HOBBY" v-model="nvCheckboxResult"/>
        <blockquote>
          <p>
            选择结果:
          </p>
          <p v-for="item in nvCheckboxResult" :key="item"> {{ item }} </p>
        </blockquote>
      </div>
      <div>
        <h4>1.2下拉框</h4>
        <nv-select nv-code="PROCESS" ref='x' v-model="nvSelectResult"></nv-select>
        <blockquote>
          <p>
            选择结果:
          </p>
          <p>{{ nvSelectResult }}</p>
        </blockquote>
      </div>
      <div>
        <h4>1.3单选按钮</h4>
        <nv-radio nv-code="HOBBY" v-model="nvRadioResult"/>
        <blockquote>
          <p>
            选择结果:
          </p>
          <p> {{ nvRadioResult }} </p>
        </blockquote>
      </div>

      <div>
        <h4>1.4日期选择器</h4>
        <nv-date-picker v-model="nvDatePicker"/>
        <blockquote>
          <p>
            选择结果:
          </p>
          <p> {{ nvDatePicker }} </p>
        </blockquote>
      </div>

    </nv-layout-section>
    
    <nv-layout-section title="省市区级联">
      <div>
        <h4>2.1 标准使用</h4>
        <nv-region-select v-model="nvRegionSelectedResult"></nv-region-select >
      </div>
      <div>
        <h4>2.2 限制区域</h4>
        <nv-region-select v-model="nvRegionSelectedResult2" area="44"></nv-region-select >
      </div>
      <div>
        <h4>2.3 限制可选层级</h4>
        <nv-region-select v-model="nvRegionSelectedResult2" area = "44" :depth="1"></nv-region-select >
      </div>
    </nv-layout-section>

    <nv-layout-section title="组织人员选择器">
      <h4>3.1 人员选择器</h4>
      <nv-user-selector  v-model="nvUserSelectResult" />
      <h4>3.2 组织选择器</h4>
      <nv-organize-selector v-model="nvOrganizeSelectResult" :multiple="false"/>
      <!-- <nv-organize-user-selector :only-organize="true" :multi="true"  v-model="nvOrganizeUserSelectResult"  /> -->
      <h4>3.3 人员选择器 (数据量大时使用)</h4>
      <nv-user-selector-dynamic  v-model="nvUserSelectDynamicResult" />
      <h4>3.3 人员选择器 (手机号)</h4>
      <nv-user-selector-tel />
    </nv-layout-section>

    <nv-layout-section title="子表配置">
      <div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" >
          <el-row type="flex"  class="row-bg" justify="space-around">
            <el-col :span="4">
              <el-form-item label="配置名称"></el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="性别"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="爱好"></el-form-item>
            </el-col>
            <el-col :span="2">
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-around" 
            v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key">
            <el-col :span="4">
              <el-form-item label=""  :prop="'domains.' + index + '.NAME'" :rules="[{ required: true, message: '配置名称不能为空', trigger: 'blur'}]">
                <el-input v-model="domain.NAME" placeholder="请输入配置名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label=""  :prop="'domains.' + index + '.KEY'" :rules="keyRules" >
              <nv-select nv-code="SEX" v-model="domain.KEY"></nv-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=""  :prop="'domains.' + index + '.VALUE'" :rules="[{required:true, message:'爱好不能为空', trigger: 'blur'}]">
                <nv-checkbox nv-code="HOBBY" v-model="domain.VALUE"/>
              </el-form-item>
            </el-col>
            <el-col :span="2">
            <el-button @click.prevent="removeDomain(domain)" style="margin-left:20px; height: 40px;">删除</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
              <el-col :span="8" :offset="4">
                <el-button @click="addDomain">添加行</el-button>
                <el-button type="primary" @click="batchSave"  :disabled="dynamicValidateForm.domains.length >= 1 ? false : true">保存</el-button>
              </el-col>
          </el-row>
        </el-form>
      </div>
    </nv-layout-section>
  </nv-layout>
</template>

<script>
import vuex, { mapActions } from 'vuex'
export default {
  name: 'demo',
  data () {
    return {
      nvCheckboxResult: [],
      nvRadioResult: '',
      nvSelectResult: '',
      nvRegionSelectedResult:["44","4406","440606"],
      nvRegionSelectedResult2: [],

      nvUserSelectResult:["super","xuej"],

      nvOrganizeSelectResult: "11E7FFD873DAFEC3833FE150B4BB19CD",
      nvUserSelectDynamicResult:[{id:"super",text:"超级管理员"}],
      
      keyRules:[ 
              {required:true, message:'请选择性别', trigger:'changeTitle'}
      ],
      dynamicValidateForm: {
        domains: [{
          NAME: '', // 配置名称
          KEY: '', // 配置key
          VALUE: [] // 配置值
        }],
        email: ''
      },
      nvDatePicker:null
    }
  },
  methods: {
    

    // 
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          NAME: null, // 配置名称
          KEY: '', // 配置key
          VALUE: [] // 配置值
         // key: Date.now()
        });
      },
      // 批量保存项目信息
  batchSave() {
     this.$refs['dynamicValidateForm'].validate((valid) => {
          if (valid) {
            const arr = this.dynamicValidateForm.domains;
            var data = {
              CONFIGS: JSON.stringify(arr)
            }
            console.log(data);
        } else {
        return false;
      }
    });
  },

  //
  }
}
</script>

<style lang="scss" scoped>
  .div_border{
    border-top: solid 1px #bec5d4;
  }
</style>


