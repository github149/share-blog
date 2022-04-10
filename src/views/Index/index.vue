<template>
  <div class="index">
    <ul>
      <li v-for="(item, index) in blog" :key="index">
        <div id="picture">
          <router-link :to="`user/${item.user.id}`"
            ><img :src="item.user.avatar" alt=""
          /></router-link>
          <span>{{ item.user.username }}}</span>
        </div>

        <div class="content">
          <router-link :to="`/detail/${item.id}`" class="router-link">
            <div class="title">
              {{ item.title }}<span>{{ dealDate(item.createdAt) }}</span>
            </div>
            <div class="description">
              {{ item.description }}
            </div>
          </router-link>
        </div>
      </li>
    </ul>
    <Pagination
      :page.sync="page"
      :count="count"
      @handleCurrentChange="getBlog"
    />
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      page: 1,
      userId: "",
      atIndex: false,
      count: 0,
      blog: [],
    };
  },
  created() {
    this.getBlog();
  },

  methods: {
    async getBlog() {
      const res = await this.$blog.getIndexBlogs({
        page: this.page,
        userId: this.userId,
        atIndex: this.atIndex,
      });
      this.blog = res.data;
      console.log("?????????????????????????", this.blog);
      this.count = res.totalPage;
    },
  },
};
</script>
<style scoped>
#picture {
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
#picture img {
  margin-left: auto;
  margin-right: auto;
  width: 40px;
}
#picture span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 80px;
  display: inline-block;
  font-size: 12px;
  color: #999999;
}
.index {
  padding: 0px 140px;
}
@media (max-width: 500px) {
  #picture {
    display: none;
  }
  .content {
    margin-left: 0!important;
  }
  #index ul{
    padding-left:3px;
    padding-right:3px;
    
  }
}
@media screen and (max-width: 768px) {
  .index {
    padding: 0px;
  }
}
.index > ul > li {
  display: flex;
  flex-wrap: nowrap;
  padding: 10px 0px;
}
.title {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}
.content {
  margin-left: 20px;
}
.content .title {
  line-height: 26px;
  font-size: 16px;
}
.content .title span {
  margin-left: 8px;
  color: #999999;
  font-size: 12px;
}
.content .description {
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  height: 3em;
  -webkit-box-orient: vertical;
}
.router-link {
  text-decoration: none;
  color: #000000;
}
</style>
