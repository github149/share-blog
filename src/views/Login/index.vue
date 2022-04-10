<template>
  <div id="login">
    <h1>登录</h1>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="login"
    >
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即登录</el-button
      >
      <div class="text">
        没有账号？<router-link to="/register">立即注册</router-link>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        username: "root123456",
        password: "root123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["onLogin"]),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.onLogin(this.ruleForm);
          if (res) {
            this.$router.push({path:"/index"});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>

#login {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left:auto;
  margin-right:auto;
  
}
#login h1{
  text-align:center;
  line-height:56px;
}

.login {
  width: 400px;
}

@media (max-width:411px) {
  #login,
  .login {
    width: 100%;
  }
}
.text {
  line-height: 60px;
  height: 60px;
  text-align: center;
  font-size: 12px;
}
.text a {
  color: #409eff;
}

</style>

