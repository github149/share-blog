<template>
  <div class="user">
    <div class="photo">
      <img :src="user.avatar" alt="" width="60px" />{{
        user.username
      }}
    </div>
    <hr />

    <ul>
      <li v-for="(item, index) in userData" :key="index">
        <div id="date">
          <div class="day">{{ getTime(item.createdAt).day }}日</div>
          <div class="month">{{ getTime(item.createdAt).month }}月</div>
          <div class="year">{{ getTime(item.createdAt).year }}年</div>
        </div>
      
        <div class="content">
          <div class="title">{{item.title}}<span>{{dealDate(item.createdAt)}}</span></div>
          <div class="description">
            {{item.description}}
          </div>
          <div class="operate">
            <span class="edit" @click="edit(item.id)">编辑</span>
            <span class="delete" @click="deleteBlog(item.id)"> 删除 </span>
          </div>
        </div>
      </li>
    </ul>
    <Pagination />
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import Pagination from "../../components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      userData: [],
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  async created() {
    let id = this.$store.getters.user.id;
    let res = await this.$blog.getBlogsByUserId(id);
    console.log("my----------------res",res)
    this.userData = res.data;
  },
  methods: {
    edit(id){
      this.$router.push({path:`/edit/${id}`,replace:true})
    },
    deleteBlog(id) {
      console.log(id)
      this.$confirm("是否删除该博客?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$blog.deleteBlog({blogId:id}).then((res) => {
          if(res.status === "ok"){
            this.$message.success(res.msg)
            this.userData = this.userData.filter(item=>item.id !== id)
          }
        });
      });
    },
  },
};
</script>
<style scoped>
.photo {
  padding:40px 0px;
  font-size: 16px;
}
.photo img {
  margin-right: 5px;
  vertical-align: middle;
}
#date {
  color: #666666;
}
#date .month,
#date .year {
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.6;
}
#date .day {
  white-space: nowrap;
  line-height: 42px;
  font-size: 22px;
}
.user {
  padding: 0px 140px;
}
@media screen and (max-width: 768px) {
  .user {
    padding: 0px;
  } 
}
@media(min-width: 700px){
  .user > ul > li {
    padding: 0px;
  }
}
.user > ul > li {
  padding: 20px 0px;
  display: flex;
  flex-wrap: nowrap;
}
.content {
  margin-left: 20px;
}
.content .title {
  line-height: 42px;
  font-size: 16px;
}
.content > .title > span {
  margin-left: 8px;
  color: #999999;
  font-size: 12px;
}
.content > .description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.operate {
  line-height: 42px;
  font-size: 12px;
}
.operate .edit {
  cursor: pointer;
  color: #409eff;
}
.operate .delete {
  cursor: pointer;
  margin-left: 6px;
  color: #f56c6c;
}
</style>
