<template>
  <div class="user">
    <ul>
      <li v-for="(item, index) in blogData" :key="index">
        <div id="date">
          <div class="day">{{ getTime(item.createdAt).day }}日</div>
          <div class="month">{{ getTime(item.createdAt).month }}月</div>
          <div class="year">{{ getTime(item.createdAt).year }}年</div>
        </div>
        <div class="content">
          <div class="title">
            {{ item.title }}<span>{{ dealDate(item.createdAt) }}</span>
          </div>
          <div class="description">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Pagination />
  </div>
</template>
<script>
import Pagination from "../../components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      blogData: [],
    };
  },
  async created() {
    const userid = this.$route.params.userId;
    let res = await this.$blog.getBlogsByUserId(userid);
    this.blogData = res.data;
    console.log(res.data);
  },
  methods: {
    getTime(str) {
      let date = typeof str === "string" ? new Date(str) : str;

      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    },
  },
};
</script>
<style scoped>
@media (max-width: 768px) {
  #date {
    display: none;
  }
  .content {
    margin-left: 0px;
  }
}
#date {
  color: #666666;
}
#date .month,
#date .year {
  font-size: 13px;
  white-space: nowrap;
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
.user > ul > li {
  display: flex;
  flex-wrap: nowrap;
  padding: 10px;
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
</style>
