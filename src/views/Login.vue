<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item  prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input v-model="ruleForm2.checkPass" auto-complete="off"  type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%">
            <el-button @click.native.prevent="handleSubmit2" :loading="logining" type="primary" style="width:100%">登录</el-button>

        </el-form-item>
    </el-form>
</template>
<script>
 import { requestLogin } from '../api/api';
export default {
    data(){
        return{
            logining:false,
            ruleForm2:{
                account:'admin',
                checkPass:'123456'
            },
            rules2: {
                account:[
                    {required:true,message:'请输入账号',trigger:'blur'},
                ],
                checkPass:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                ]
            },
            checked:true
        };
    },
    methods:{
        handleReset2(){
            this.$refs.ruleForm2.resetFields();
        },
        handleSubmit2(ev){
            var _this = this;
            this.$refs.ruleForm2.validate((valid)=>{
                if(valid){
                    this.logining = true;
                    var loginParams = {username:this.ruleForm2.account,password:this.ruleForm2.checkPass};
                    requestLogin(loginParams).then(data=>{
                        this.logining = false;
                        let {msg,code,user} = data;
                        if(code!==200){
                            this.$message({
                                message:msg,
                                type:'error'
                            })
                        }else{
                            sessionStorage.setItem('user',JSON.stringify(user));
                            this.$router.push({path:'/table'});
                        }
                    })
                }else{
                    console.log('error submit');
                    return false;
                }
            })
        }
    }
}
</script>
<style>
.login-container{
    -webkit-border-radius:5px;
    border-radius: 5px;
    background-clip:padding-box; 
    width:350px;
    box-shadow: 0 0 25px #cac6c6;
    margin:180px auto;
    padding:35px 35px 15px 35px;
    background: #ffffff;
    border:1px solid #eaeaea;
}
.title{
    margin:0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.remember{
    margin:0px 0px 35px 0px;
}
</style>

