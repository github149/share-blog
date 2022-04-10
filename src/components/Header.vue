<template>
  <div class="header" >
    <template v-if="!isLogin">
      <div class="share">let's share</div>
      <div class="title">精品博客汇聚</div>
      <div class="btn">
        <router-link to="/login"
          ><el-button
            class="login"
            :class="$route.path === '/login' ? 'active' : ''"
            >立即登录</el-button
          ></router-link
        >

        <router-link to="/register"
          ><el-button
            class="register"
            :class="$route.path === '/register' ? 'active' : ''"
            >注册账号</el-button
          ></router-link
        >
      </div>
    </template>
    <template v-if="isLogin">
      <div class="header_user">
        <div class="share">
          <router-link to="/" class="link">Let's Share </router-link>
        </div>
        <div class="icon">
          <router-link to="/create"
            ><i class="el-icon-edit link"></i
          ></router-link>
          <div class="circle">
            <img :src="user.avatar" alt="" />
            <ul>
              <li><router-link to="/my" class="link">我的</router-link></li>
              <li><a href="#" @click="logout">注销</a></li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLogin", "user"]),
  },
  methods: {
    ...mapActions(["checkLogin", "onLogout"]),
    logout() {
      this.onLogout();
      this.$router.replace("/index");
    },
  },
  data() {
    return {
      isLodding: false,
    };
  },

  created() {
   
    this.checkLogin();
    
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .register {
    margin-left: 2rem;
  }
}
.active {
  background-color: #fff !important;
  color: #f56c6c !important;
}

.register {
  margin-left: 20px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
}
.register:hover,
.login:hover {
  background-color: #fff;
  color: #f56c6c !important;
}
.login {
  background-color: rgba(255, 255, 255, 0.4);
  margin-right: 20px;
  color: #fff;
}
.header {
  text-align: center;
  background-color: #409eff;
  color: #fff;
}
.header > .share {
  padding: 50px 0px 20px;
  text-transform: capitalize;
  font-size: 40px;
}
.title {
  font-size: 14px;
  padding-bottom: 20px;
}
.btn {
  padding: 20px 0px 30px;
}

/* 不登录 */
.el-icon-edit {
  position: relative;
  top: 5px;
  font-size: 30px;
  vertical-align: top;
  margin-right: 15px;
}
.share {
  font-size: 32px;
  line-height: 60px;
}
.icon {
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 768px) {
  .header_user {
    padding: 0px 20px !important;
  }
}
.header_user {
  height: 80px;
  padding: 0px 160px;
  background-color: #409eff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.circle {
  border: 1px solid #fff;
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
}
.circle img {
  border-radius: 50%;
  width: 100%;
  display: block;
}

.circle ul {
  display: none;
  position: absolute;
  right: 0;
  list-style: none;
  border: 1px solid #eaeaea;
  margin: 0;
  padding: 0;
  background-color: #fff;
}

.circle a {
  white-space: nowrap;
  text-decoration: none;
  color: #333;
  font-size: 12px;
  display: block;
  padding: 5px 10px;
}

.circle a:hover {
  background-color: #eaeaea;
}

.circle:hover ul {
  display: block;
}
</style>
