<template>
    <el-dialog :visible.sync="dialogVisible" :style = "{'z-index': 100000}" width="400px" class="nenv-auto-login-dialog">
        <div class="login_backdrop">
            <el-form ref="form" :model="form" :rules="rules" class="login_form" label-width="0px"> 
                <el-form-item prop="username" style="margin:5px 0;">
                    <el-input v-model="form.username" placeholder="请输入账号"/>
                </el-form-item>
                <el-form-item prop="password" style="margin:5px 0 ;">
                    <el-input type="password" v-model="form.password" @keyup.enter="handlerLogin" placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handlerLogin" class="login_btn"> 登录 </el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>
<script>
import md5 from '../../node_modules/md5'
export default {
    props: {
        ishow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            dialogVisible: false,
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handlerLogin () {
            const self = this
            self.$refs.form.validate((valid) => {
                const store = nenv.raw.store
                const { form } = self
                if (valid) {
                    store.dispatch('login', {
                        loginName: form.username,
                        pwd: md5(md5(form.password))
                    }).then(() => {
                        self.dialogVisible = false
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login_backdrop{
    height: 480px;
    width: 100%;
    background: url(./assets/imgs/Bitmap.png) top left no-repeat;
}
form.login_form {
    display: block;
    position: absolute;
    width: 320px;
    bottom: 40px;
    left: 40px;
}
button.login_btn {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 36px;
    line-height: 36px;
    background-image: url(./assets/imgs/Rectangle.png);
    color: #fff;
    display: block;
}
.el-form-item__content .el-input--nenv {
    width: 100%!important;
}
.el-dialog__header{
   height: auto;
}
</style>

<style lang="scss">
.nenv-auto-login-dialog {
    .el-dialog__body, .el-dialog__header{
        padding: 0!important;
    }
}

.el-dialog__headerbtn .el-dialog__close {
    color: #fff!important;
}
</style>


