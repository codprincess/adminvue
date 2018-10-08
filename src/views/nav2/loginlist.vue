<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-ruleForm login-container">
    <el-tab-pane label="账号登录" name="first">
         <el-form label-position="left" label-width="0px">
            <el-form-item>
                <el-input type="text" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input auto-complete="off"  type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%">
                <el-button  type="primary" style="width:100%">登录</el-button>

            </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane label="验证码登录" name="second">
         <el-form label-position="left" label-width="0px" class="regist">
            <el-form-item>
                <el-input type="china-mobile" auto-complete="off" placeholder="输入手机号" keyboard="number"></el-input>
            </el-form-item>
            <el-form-item>
                 <!-- <el-input title="" type="text" placeholder="请输入验证码" style="width:40%" required>
                 </el-input>
                 <el-button slot="right" type="primary" style="width: 100px;">获取验证码</el-button> -->
                 <x-input title="" type="text" placeholder="请输入验证码"  required>
                    <x-button slot="right" type="primary" style="width: 100px;">获取验证码</x-button>
                </x-input>
            </el-form-item>
            <el-form-item style="width:100%">
                <el-button  type="primary" style="width:100%">登录</el-button>

            </el-form-item>
        </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style>
.login-container{
    -webkit-border-radius:5px;
    border-radius: 5px;
    background-clip:padding-box; 
    width:350px;
    box-shadow: 0 0 25px #cac6c6;
    /* margin:180px auto; */
    padding:35px 35px 15px 35px;
    background: #ffffff;
    border:1px solid #eaeaea;
}
.remember{
    margin:0px 0px 35px 0px;
}
</style>
