<template>
    <nv-layout>
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px" style="width: 60%;">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="getActivitiProccessImage">获取当前流程图</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="流程图" :visible.sync="dialogVisible" width="50%" :append-to-body="true">
            <img :src="acitvityImg" />
        </el-dialog>
    </nv-layout>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            processInstanceId: "",
            acitvityImg: "",
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            unfetch({
                url: '/workFlow/beginProcess',
                method: 'post',
                params:{"STARTER": "super", "NEXT_USER": "super", "PROCESS_TYPE": "PROCESS_LEAVE", "BUSINESS_ID": "123456"}
            }).then(({ data }) => {
                console.log(data);
                this.processInstanceId = data;
                this.acitvityImg = "/api/workFlow/viewImg?processInstanceId="+data,
                this.$message({message:'流程创建成功!', type: 'success'});
                //this.dialogVisible = false;
            }).catch(err=>{
                this.$message.error(err.msg);
                console.log(err);
            })
        },getActivitiProccessImage(){
            this.dialogVisible = true;
            
            //$("#acitvityImg").html('<img src="/workFlow/getActivitiProccessImage?processInstanceId='+this.processInstanceId+'" />');
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


