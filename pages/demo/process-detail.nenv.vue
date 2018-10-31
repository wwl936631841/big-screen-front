<template>
    <nv-layout>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="流程详情" name="first">
                <el-form ref="form" :model="form" label-width="80px" style="width: 60%;">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="即时配送">
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
                    
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="流程记录" name="second">
                <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="拼命加载中..." border fit highlight-current-row>
                    <el-table-column type="index" :index="typeIndex" align="center" label="序号" min-width="20%"></el-table-column>
                    <el-table-column prop="ACTI_NAME" label="节点名称" align="center" min-width="10%"></el-table-column>
                    <el-table-column prop="OPERATOR" label="操作者" align="center" min-width="10%"></el-table-column>
                    <el-table-column prop="OPERATION" label="操作" align="center" min-width="10%"></el-table-column>
                    <el-table-column prop="COMMENT" label="处理意见" align="center" min-width="10%"></el-table-column>
                    <el-table-column prop="PROC_DATE" label="操作时间" align="center" min-width="10%"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="流程图" name="third" v-loading.body="imgLoading" element-loading-text="拼命加载中...">
                <div style="height:400px; width100%">
                    <img :src="acitvityImg" />
                </div>
            </el-tab-pane>
        </el-tabs>
        
        <el-row type="flex" justify="space-around" class="margin-button">
            <el-col :span="8" :offset="4">
                <el-button type="success" @click="pass">通过</el-button>
                <el-button type="danger" @click="reject">驳回</el-button>
            </el-col>
        </el-row>

        <el-dialog title="通过流程" :visible.sync="dialogVisible1" width="50%" :append-to-body="true">
            <el-form ref="pass_form" :model="pass_form" label-width="150px" style="width:88%" size="mini">
                <el-form-item label="选择审核人">
                    <nv-user-selector-dynamic  v-model="nvUserSelectDynamicResult" />
                </el-form-item>
                
                <el-form-item label="处理意见">
                    <el-input type="textarea" rows="7" v-model="pass_form.comment"></el-input>
                </el-form-item>
                <el-row type="flex" justify="space-around" class="margin-button">
                    <el-col :span="8" :offset="4">
                        <el-button type="primary" @click="handleProcess">确定</el-button>
                        <el-button type="danger" @click="dialogVisible1=false">取消</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <el-dialog title="驳回流程" :visible.sync="dialogVisible2" width="50%" :append-to-body="true">
            
        </el-dialog>
    </nv-layout>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible1: false,
            dialogVisible2: false,
            activeName: 'first',
            BUSINESS_ID: "",
            PROC_TYPE:"",
            PROC_INST_ID: "",
            acitvityImg: "",
            tableData: [],
            listLoading: false,
            imgLoading: false,
            operation: "",
            nvUserSelectDynamicResult:[],
            form: {
                name: '活动名称',
                region: 'shanghai',
                date1: '2018-05-02',
                date2: '2018-05-22',
                delivery: true,
                type: ["线下主题活动","地推活动"],
                resource: '线下场地免费',
                desc: '活动形式'
            },
            pass_form: {
                comment: ""
            }
        }
    },
    created() {
        console.log("根据BUSINESS_ID 请求后台查询出当前流程详情信息");
    },
    mounted() {
        this.BUSINESS_ID = this.$route.query.BUSINESS_ID || '';
        this.PROC_TYPE = this.$route.query.PROC_TYPE || '';
        this.PROC_INST_ID = this.$route.query.PROC_INST_ID || '';
    },
    methods: {
        handleClick(tab, event) {
            
            if(tab.name == "third"){
                console.log(tab.name);
                this.imgLoading = true;
                debugger;
                this.acitvityImg = "/api/workFlow/viewImg?processInstanceId="+this.PROC_INST_ID;
                this.imgLoading = false;
            }else if(tab.name == "second"){
                this.listLoading = true;
                const pagePrams = {
                    procInstId: this.PROC_INST_ID
                }
                unfetch({
                    url: '/workFlow/processLog',
                    method: 'get',
                    params: pagePrams
                }).then(({data}) => {
                    this.listLoading = false;
                    this.tableData = data.processLogs.map(v => {
                    //v.isEdit = false;
                        return v
                    })
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        pass(){
            this.operation = "PASS";
            this.dialogVisible1 = true;
        },
        reject(){
            this.operation = "REJECT";
            this.dialogVisible2 = true;
        },
        handleProcess(){
            const processPrams = {
                procInstId: this.PROC_INST_ID,
                processType: this.PROC_TYPE,
                releatedId: this.BUSINESS_ID,
                operation: this.operation,
                //assignee: this.nvUserSelectDynamicResult,
                assignee: "super",
                comment: this.pass_form.comment
            }
            unfetch({
                url: '/workFlow/handle',
                method: 'post',
                params: processPrams
            }).then(({data}) => {
                this.$message({message:'操作成功!', type: 'success'});
                if(this.operation == "PASS"){
                   this.dialogVisible1 = false; 
                }else{
                    this.dialogVisible2 = false;
                }
            }).catch(err=>{
                this.$message.error(err.msg);
                console.log(err);
            })
        },
        typeIndex(index){
            return index+1;
        }
    }
}
</script>
<style lang="scss" scoped>
    .margin-button{
        margin-top: 50px;
    }
</style>


