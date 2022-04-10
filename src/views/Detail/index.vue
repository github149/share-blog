<template>
  <div class="detail">
    <div id="header">
      <div class="img">
        <img :src="user.avatar" alt="" width="60px" />
      </div>
      <div class="title">
        <span>{{title}}</span>
        {{user.createdAt}}
        <span class="text"><span class="author">{{user.username}}</span>{{dealDate(createdAt)}}</span>
      </div>
    </div>
    <div class="content" v-html="marked"></div>
  </div>
</template>
<script>
import { marked } from 'marked';
export default {
  data(){
    return {
      user:{},
      content:'',
      title:"",
      createdAt:''
    }

  },
  computed:{
    marked(){
      return marked.parse(this.content)
    }

  },
  async created(){
    const res = await this.$blog.getDetail({blogId:this.$route.params.blogId})
    this.content = res.data.content
    this.title = res.data.title
    this.createdAt = res.data.createdAt
    this.user = res.data.user  
  }
};
</script>
<style scoped>
.detail {
  padding: 0px 150px;
}
@media screen and (max-width: 768px) {
  .detail {
    padding: 0px!important;
  }
}
#header{
  padding:20px 0px;
  display: flex;
  justify-content: flex-start;
  border-bottom:1px solid rgb(202, 197, 197,.5);
}
.img{
  margin-right:15px;
}
.content{
  padding:60px 80px;
  line-height: 1.8;
}
@media (max-width:768px){
  .content{
    padding:0px;
  }

}
.text{
  font-size:12px;
  color:#999999;
  line-height:32px;
}
.author{
  color:#67C23A;
  margin-right:5px;
}
.title{
  
  font-size:16px;
  display: inline-flex;
  flex-direction: column;
}
</style>
