<template>
        <el-tabs v-model="activeName">
                <el-tab-pane label="个人信息" name="first">
                    <!-- <img src="../../../../pages/home/assets/img/buddha.png" class="head_portrait"> -->
                    <div class="detail_info">
                        <ul>
                            <li>
                                <span class="grey"><i class="el-icon-info"></i>员工号</span>
                                <span class="fright">{{ user.jobNum }}</span>
                            </li>
                            <li>
                                <span class="grey"><i class="el-icon-info"></i>姓名</span>
                                <span class="fright" v-show="!isEdit">
                                {{ newNickName }}
                            <i class="el-icon-arrow-right"></i>
                            </span>
                            <span class="fright" v-show="isEdit">
                                <el-input v-show="isEdit" size="small" placeholder="请输入姓名" v-model="newNickName"></el-input>
                            </span>
                            </li>
                            <li>
                                <span class="grey"><i class="el-icon-phone"></i>电话</span>
                                <span class="fright" v-show="!isEdit">
                                {{ newMobile }}
                                <i class="el-icon-arrow-right"></i>
                                </span>
                                <span class="fright" v-show="isEdit">
                                    <el-input v-show="isEdit" size="small" placeholder="请输入电话" v-model="newMobile"></el-input>
                                </span>
                            </li>
                            <li>
                                <span class="grey"><i class="el-icon-message"></i>邮箱</span>
                                <span class="fright">{{ user.email }}</span>
                            </li>
                            <li>
                                <span class="grey"><i class="el-icon-menu"></i>部门</span>
                                <span class="fright">{{ user.organizeName}}</span>
                            </li>
                            <li>
                                <span class="grey"><i class="el-icon-info"></i>职位</span>
                                <span class="fright">{{ user.position }}</span>
                            </li>
                        </ul>
                        <el-row type="flex" justify="space-around">
                            <el-col :span="8" :offset="4">
                                <el-button @click='cancelEdit' v-show="isEdit">取消</el-button>
                                <el-button type="success" @click='editInfo'>修改</el-button>
                                <el-button type="primary" @click="saveInfo">保存</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="修改密码" name="second">
                    <el-form label-width="120px" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" >
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="20">
                                <el-form-item label="旧密码" prop="oldPwd">
                                    <el-input type="password" placeholder="请输入旧密码" v-model="ruleForm.oldPwd"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="20">
                                <el-form-item label="新密码" prop="newPwd">
                                    <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.newPwd"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="20">
                                <el-form-item label="确认密码"  prop="confirmPwd">
                                    <el-input type="password" placeholder="请再次确认密码" v-model="ruleForm.confirmPwd"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="space-around">
                            <el-col :span="8" :offset="4">
                                <el-button @click='closeDialog'>取消</el-button>
                                <el-button type="primary" @click="editPwd">保存</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
</template>
<script>
import vuex, { mapGetters, mapActions } from 'vuex';
export default {
   name:'UserInfo',
   data(){
        var validatePass1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入旧密码'));
            } else {
                if (this.ruleForm.oldPwd !== '') {
                    //this.$refs.ruleForm.validateField('oldPwd');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else {
                if (this.ruleForm.newPwd !== '') {
                    //this.$refs.ruleForm.validateField('newPwd');
                }
                callback();
            }
        };
        var validatePass3 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                oldPwd: '',
                newPwd: '',
                confirmPwd: ''
            },
            rules: {
                oldPwd: [
                    { validator: validatePass1, trigger: 'blur' }
                ],
                newPwd: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                confirmPwd: [
                    { validator: validatePass3, trigger: 'blur' }
                ]
            },
            activeName: 'first',
            dialogVisible: false,
            newNickName: null,
            newMobile : null,
            isEdit : false
        };

   }  ,
   
    created(){
        this.newNickName = this.user.nickName;
        this.newMobile = this.user.mobile;
    },

    computed: {
        ...vuex.mapState('user', {
            nickName: state => state.profile.nickName,
            user: state => state.profile
        })
    },

    methods:{
        editInfo(){
            this.isEdit = true;

            //alert(this.newNickName);
            //newNickName = this.newNickName;
        },
        closeDialog(){
            this.$emit('close');
        },
        saveInfo(){
            unfetch({
                url: '/user/editInfo',
                method: 'put',
                params:{"nickName": this.newNickName, "mobile": this.newMobile}
            }).then(({ data }) => {
                 this.isEdit = false;
                 this.user.mobile = this.newMobile;
                 this.user.nickName = this.newNickName;
                // this.closeDialog();
            });
        },
        editPwd(){
            unfetch({
                url: '/user/password',
                method: 'put',
                params:{"oldPassword": md5(md5(this.ruleForm.oldPwd)), "newPassword": md5(md5(this.ruleForm.newPwd)), "confirmPassword": md5(md5(this.ruleForm.confirmPwd))}
            }).then(({ data }) => {
                this.dialogVisible = false;
                this.logout();
                //window.location.href='/login';
                this.$router.push(process.env.LOGIN_PATH || '/login')
            });
        }, 
        cancelEdit(){
            this.newNickName = this.user.nickName;
            this.newMobile = this.user.mobile;
            this.isEdit = false;
        }       
    }
    
}
</script>
<style  lang="scss" scoped>
.detail_info {
    border-top:1px solid #eee;
    margin-top: 10px;
    font-size: 15px;
    ul{
        padding: 0 20px;
        li{
            list-style: none;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            span.grey{
                color: #646464;
                i{
                    margin-right: 5px;
                }
            }
            span.fright{
                float:right;
                cursor: pointer;
            }
        }
    }
}
</style>
