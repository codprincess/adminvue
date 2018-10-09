<template>
<!-- 表单信息 -->
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <!-- 第三步-提交资质内容 -->
  <div v-if="this.active === 3">
    <el-form-item label="身份证号码" prop="identityCard">
      <el-input type="identity" v-model="ruleForm.identityCard" style="width:260px" placeholder="请输入身份证号"></el-input>
    </el-form-item>
    <el-form-item label="身份证正面" prop="identityCard_Z">
      <RegShopImg :imgN='0' :nameN='identityCard_Z' @imgthing = 'imgthing' v-model="ruleForm.identityCard_Z"></RegShopImg>
    </el-form-item>
    <el-form-item label="身份证反面" prop="identityCard_F">
      <RegShopImg :imgN='1' :nameN='identityCard_F' @imgthing = 'imgthing' v-model="ruleForm.identityCard_F"></RegShopImg>
    </el-form-item>
    <el-form-item label="手持身份证" prop="identityCard_S">
      <RegShopImg :imgN='2' :nameN='identityCard_S' @imgthing = 'imgthing' v-model="ruleForm.identityCard_S"></RegShopImg>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" class="btn_submit">提 交 资 质</el-button>
    </el-form-item>
  </div>
</el-form>
</template>

<script>
import RegShopImg from '@/components/regShopImg' //上传图片的子组件
import Qs from 'qs' // post方式下引入qs插件字符串化传输信息
export default {
  name: 'regShop',
  data () {
    return {
      active: 3, // 分步骤走的判定
      ajaxRegisterUrl: '', // 注册提交页面
      imgN: '', // 上传信息的名字对应的index序号
      nameN: '', // 上传信息的名字
      identityCard_Z: 'identityCard_Z',
      identityCard_F: 'identityCard_F',
      identityCard_S: 'identityCard_S',
      Imgthing: {}, //子组件上传的信息
      ruleForm: { // 提交信息的表单对象
        identityCard_Z: '',
        identityCard_F: '',
        identityCard_S: '',
      },
      rules: { // 必填判定规则
        identityCard_Z: [
          {required: true, message: '请上传身份证正面图片', trigger: 'blur'}
        ],
        identityCard_F: [
          {required: true, message: '请上传身份证反面图片', trigger: 'blur'}
        ],
        identityCard_S: [
          {required: true, message: '请上传手持身份证图片', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 第三步：证件照片上传
    imgthing (imgthing) {
      // 合并对象
      this.Imgthing = Object.assign(this.Imgthing, imgthing)
      // 填充到ruleForm对应项,用来判断是否有数据
      this.ruleForm.identityCard_Z = this.Imgthing.identityCard_Z
      this.ruleForm.identityCard_F = this.Imgthing.identityCard_F
      this.ruleForm.identityCard_S = this.Imgthing.identityCard_S
    },
    // 总表单提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 由于base64的数据流比较大,get方式放不下,必须采用post方式
          let data = Qs.stringify(this.ruleForm)
          this.$ajax.post(this.ajaxRegisterUrl, data)
            .then((res) => {
              console.log(res)
              if (res.status === 1) {
                this.$message.success('恭喜您,注册成功！')
              }
            })
        } else {
          this.$message.error('提交资料有误,注册失败！')
          return false
        }
      })
    }
  },
  components: {
    'RegShopImg': RegShopImg
  }
}
</script>