<template>
    <div class="login">
        <h1>户县永光汽车修理部</h1>
        <h2>结算系统</h2>
        <el-form label-position="left" label-width="105px" :model="formLabelAlign">
            <el-form-item label="用户名:">
                <el-input v-model="formLabelAlign.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="formLabelAlign.passWord" type="password"></el-input>
            </el-form-item>
            <p class="loginBtn" @click="login" ref="enterBtn">登陆</p> 
        </el-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formLabelAlign: {
                    userName: '',
                    passWord: ''
                }
            }
        },
        mounted () {
            document.addEventListener('keyup', (e) => {
                if (this.$refs.enterBtn && e.keyCode === 13) {
                    this.login();
                }
            }, false)
        },
        methods: {
            login () {
                if (this.formLabelAlign.userName === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入用户名',
                        type: 'warning',
                        duration: 1000
                    });
                    return
                } else if (this.formLabelAlign.passWord === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入密码',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                this.$ajax.post(`api/login`, {
                    userName: this.formLabelAlign.userName,
                    passWord: this.formLabelAlign.passWord
                })
                .then(e => {
                    if (e.data.type === 'error') {
                        this.$message({
                            showClose: true,
                            message: e.data.message,
                            type: 'warning',
                            duration: 1000
                        });
                    } else {
                        // 存储登录状态 -- 路由
                        sessionStorage.setItem('user', 'ok')
                        this.$router.push({path: '/hello', name: 'Hello'})
                    }
                })
            }
        }
    }
</script>

<style>
    .login {
        width: 400px;
        height: 500px;
        text-align: center;
        margin: 100px auto;
        /*color: #0D5562;*/
        color: #D6D1D1;
        letter-spacing: 5px;
        padding: 30px 30px;
        position: relative;
    }
    .login .el-form {
        margin-top: 50px;
    }
    .login .loginBtn {
        width: 200px;
        height: 40px;
        font-size: 20px;
        line-height: 40px;
        background: #D6D1D1;
        margin: 50px auto;
        text-align: center;
        color: #AE81FF;
        cursor: pointer;
        border-radius: 3px;
    }
    .login .loginBtn:hover {
        background: #AE81FF;
        color: #D6D1D1;
    }
</style>