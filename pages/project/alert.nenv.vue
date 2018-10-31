<template>
    <nv-layout class="demo2">
        <div>
            <!-- <el-button @click="dialogVisible1=true">手动流转</el-button> -->
            <el-button @click="dialogVisible2=true">审批文档</el-button>
            <el-button @click="dialogVisible3=true">审批前公示</el-button>
        </div>


        <el-dialog title="手动流转" :visible.sync="dialogVisible1" size="large">
            <el-steps :space="100" :active="1" finish-status="success">
                <el-step title="当前步骤"></el-step>
                <el-step title="下一步">
                </el-step>
                <el-step title="完成">
                </el-step>
            </el-steps>

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="处理意见">
                    <el-input v-model="form.name"></el-input>
                    <el-checkbox v-model="checked">是否属于项目小组审批</el-checkbox>
                </el-form-item>
                <el-form-item label="快捷操作">
                    <el-radio-group v-model="isChoose">
                        <el-radio label="0">是</el-radio>
                        <el-radio label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox v-model="checked1">发送短信</el-checkbox>
                    <el-input v-model="form.name" placeholder="xxxxx"></el-input>
                </el-form-item>
                <el-form-item label="">
                <div>
                    <span>科室领导审批/流程定义</span>
                    <el-checkbox v-model="checked2">流程定义</el-checkbox>
                </div>
                </el-form-item>
                <el-form-item label="主要人员">
                    <nv-user-selector :word="word" :person-list="personList" @keyword-change="change" @get-choose-person="getChoosePerson"></nv-user-selector>
                </el-form-item>

                <el-form-item label="次要人员">
                    <nv-user-selector> :word="word2" :person-list="personList2" @keyword-change="change2" @get-choose-person="getChoosePerson"></nv-user-selector>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="审批文档" :visible.sync="dialogVisible2" size="small">
            <el-form ref="form" label-width="90px">
                <el-row class="row-bg" justify="space-around">
                    <el-col :span="12">
                        <el-form-item label="项目名称">
                            <el-input placeholder="请输入项目名称">温州水厂项目</el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="审批类型">
                            <el-input v-model="input2">温州水厂项目</el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row justify="space-around">
                    <el-col :span="12">
                        <el-form-item label="建设单位">
                            <el-input>盈峰环境</el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目类型">
                            <el-select placeholder="选择项目类型" v-model="value">
                                <el-option label="项目类型1" value="type1"></el-option>
                                <el-option label="项目类型2" value="type2"></el-option>
                                <el-option label="项目类型3" value="type3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row justify="space-around">
                    <el-col :span="12">
                        <el-form-item label="审批部门">
                            <el-select placeholder="审批部门" v-model="value">
                                <el-option label="审批部门1" value="type1"></el-option>
                                <el-option label="审批部门2" value="type2"></el-option>
                                <el-option label="审批部门3" value="type3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="审批员">
                            <el-select placeholder="选择审批员" v-model="value">
                                <el-option label="审批员1" value="type1"></el-option>
                                <el-option label="审批员2" value="type2"></el-option>
                                <el-option label="审批员3" value="type3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row justify="space-around">
                    <el-col :span="24">
                        <el-form-item label="选择是否">
                            <el-radio-group v-model="isChoose">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="space-around">
                    <el-col :span="8" :offset="4">
                        <el-button @click="dialogVisible2==false">取消</el-button>
                        <el-button type="primary">保存</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>

        <el-dialog title="审批前公示" :visible.sync="dialogVisible3" size="small">
            <el-form ref="form" label-width="90px">
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="24">
                        <el-form-item label="公示标题">
                            <el-input>盈峰环境</el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col>
                        <el-form-item label="公示说明">
                            <el-input type="textarea" :rows="2" placeholder="请输入内容">盈峰环境</el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col>
                        <el-form-item label="听证告知">
                            <el-input type="textarea" :rows="2">盈峰环境</el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="12">
                        <el-form-item label="联系电话">
                            <el-input placeholder="请输入联系电话">联系电话</el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系地址">
                            <el-input v-model="input2" placeholder="请输入联系地址">联系地址</el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex"  class="row-bg" justify="space-between">
                    <el-col :span="12">
                        <el-form-item label="建设单位">
                            <el-input>盈峰环境</el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目类型">
                            <el-select placeholder="选择项目类型" v-model="value">
                                <el-option label="项目类型1" value="type1"></el-option>
                                <el-option label="项目类型2" value="type2"></el-option>
                                <el-option label="项目类型3" value="type3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex"  class="row-bg" justify="space-between">
                    <el-col :span="12">
                        <el-form-item label="审批部门">
                            <el-select placeholder="审批部门" v-model="value">
                                <el-option label="审批部门1" value="type1"></el-option>
                                <el-option label="审批部门2" value="type2"></el-option>
                                <el-option label="审批部门3" value="type3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="审批员">
                            <el-select placeholder="选择审批员" v-model="value">
                                <el-option label="审批员1" value="type1"></el-option>
                                <el-option label="审批员2" value="type2"></el-option>
                                <el-option label="审批员3" value="type3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row type="flex"  class="row-bg" justify="space-between">
                    <el-col>
                        <el-form-item label="选择是否">
                            <el-radio-group v-model="isChoose">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col >
                        <el-form-item label="项目概况">
                            <el-input type="textarea" :rows="2" placeholder="项目概况">项目概况</el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col >
                        <el-form-item label="主要影响">
                            <el-input type="textarea" :rows="2">主要影响</el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col >
                        <el-form-item label="参与情况">
                            <span class="" style="color:#fff;border-radius: 1px; background-color: #398dee;height:14px;width:24px;">
                                <i class="el-icon-more"></i>
                            </span>
                            <el-input type="textarea" :rows="2">
                                参与情况</el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="space-around">
                    <el-col :span="8" :offset="4">
                        <el-button @click="dialogVisible3==false">取消</el-button>
                        <el-button type="primary">保存</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
       
    </nv-layout>
</template>

<script>
//import '../../styles/dialog.scss'
// import EPersonChoose from '@/components/e-person-choose';
function getDictionaryDataByCode(params) {
  return unfetch({
    url: '/dictionary/code',
    method: 'get',
    params
  })
}


// import {getDictionaryDataByCode} from '@core/api';
export default {
    name: 'DemoAlert',
    components: {
        // EPersonChoose
    },
    data() {
        return {
            dialogVisible: false,
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible3: false,
            dialogVisible4: false,
            dialogVisible5: false,
            dialogVisible6: false,
            form: {},
            isChoose: 0,
            checked: true,
            checked1: true,
            checked2: true,
            input: '',
            input2: '',
            word: '',
            value1:'',
            personList: [
                { id: 1, name: "张三11" },
                { id: 2, name: "张三21" },
                { id: 3, name: "张三32" },
                { id: 4, name: "张三43" }
            ],
            word2: '',
            personList2: [
                { id: 1, name: "王大锤" },
                { id: 2, name: "王磊" },
                { id: 3, name: "温林青" },
                { id: 4, name: "李晓红" }
            ],
            

            value: '',
            
            hobbies: null,
            checkHobbies: null,

            processes: null
        }
    },
    mounted() {
        this.getHobbies();
        this.getProcess();
    },
    methods: {
        change(val) {
            console.log("parentval", val);
            this.word = val;
        },
        change2(val) {
            console.log("parentval", val);
            this.word2 = val;
        },
        getChoosePerson(data) {
            console.log("当前选择的人员", data);
        },
        getHobbies() {
            const pageParams = {
                CODE: 'HOBBY'
            };

            console.log(pageParams)
            getDictionaryDataByCode(pageParams)
                .then(response => {
                this.listLoading = false;
                const data = response.data;

                     
                    this.hobbies = data.map(v => v);
                    this.checkHobbies  =  ['TANGSHI','GEYOUTANG'];
                    console.log(this.list)
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getProcess() {
            const pageParams = {
                CODE: 'PROCESS'
            };

            getDictionaryDataByCode(pageParams)
                .then(({ data }) => {
                    this.processes = data.map(v => v);
                    console.log(this.list)
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 选择即将流向人员回调的方法
        userSelectBack(list) {
            const userIds = [],
                userNames = [];
            for(const node of list) {
                userIds.push(node.id);
                userNames.push(node.text);
            }
        }

    }
}
</script>
<style lang="scss" scoped>
.el-form-item__content{
    margin-left:90px!important;
}
</style>

<style lang="scss">
.demo2 {
    padding: 16px 20px;
    .demo2-red-font{
        height: 14px;
        font-size: 18px;
        line-height: 0.78;
        letter-spacing: -0.2px;
        color: #fb4b46;
    }
}
</style>


