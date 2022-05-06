<template>
  <div id="app">
    <el-container>
      <el-header><Header /></el-header>
      <el-main><router-view/></el-main>
      <el-footer>&copy;版权为maple wang</el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
  data(){
    return {
      isShow:true
    }
  },
  
  methods:{
    // reload(){
    //   this.isShow = false
    //   this.$nextTick(()=>{
    //     this.isShow = true
    //   })
    // }
    
  }
};
</script>

<style>
.link{
  color: white;
  text-decoration: none;
}
.el-header,
.el-footer {
  height: auto !important;
  padding: 0 !important;
}
html,
body,
#app {
  height: 100%;
}
.el-container {
  min-height: 100%;
}
.el-main {
  min-height: calc(100% - 140px);
  display:flex!important;
  align-items: center;
}
@media(max-width:400px){
  .el-main{padding:10px 3px!important;}
}


/* #login {
  padding-top: 200px;
} */

.el-footer {
  background-color: #d7d7d7;
  height: 60px !important;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
}
</style>
