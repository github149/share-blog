
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    label-position="top"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <div class="title">创建文章</div>
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
      <div class="tipsText">不少于10个字</div>
    </el-form-item>

    <el-form-item label="内容简介" prop="description">
      <el-input
        class="description"
        type="textarea"
        :autosize="{ minRows: 4 }"
        v-model="ruleForm.description"
      ></el-input>
       <div class="tipsText">不少于30个字</div>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <el-input
        class="content"
        type="textarea"
        placeholder="支持markdown语法"
        :autosize="{ minRows: 10 }"
        v-model="ruleForm.content"
      ></el-input>
       <div  class="tipsText">不少于200个字</div>
    </el-form-item>

    <span class="atIndex">是否展示首页:</span>
    <el-switch v-model="ruleForm.atIndex" active-text="否" inactive-text="是">
    </el-switch>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        description: "",
        content: "",
        atIndex: false,
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
    };
  },
  created(){
    let blogId = this.$route.params.blogId
    this.$blog.getDetail({blogId}).then(res=>{
      console.log(res)
      Object.keys(this.ruleForm).forEach(key=>{
        this.ruleForm[key] = res.data[key]
      })
      
    })

  },
  
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$blog.createBlog(this.ruleForm)
          if(res.status === "ok"){
            Object.keys(this.ruleForm).forEach(key=>this.ruleForm[key] = '')
            this.$router.push({path:'/my'})
            // this.reload()
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapActions([]),
  },
};
</script>
<style scoped>
.el-form {
  padding: 0px 140px;
  width:100%
  
}
.el-form .title {
  padding: 18px 0px;
  text-align: center;
}
.el-input__inner {
  min-height: 120px;
}
.atIndex {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding-right:10px;
}
.tipsText{
  float:right;
  font-size:14px;
  color: #606266;
}
</style>
