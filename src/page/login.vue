<template>
  <div class="login">
    <form action>
      <el-input v-model="userId" placeholder="请输入用户名"></el-input>
      <el-input placeholder="请输入密码" v-model="passWord" show-password></el-input>
      <el-button type="primary" :loading="loading" @click="submit()">登录</el-button>
    </form>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      userId: "",
      passWord: "",
      loading: false
    };
  },
  methods: {
    saveCookie(cookieName, cookieValue, cookieDates) {
      var d = new Date();
      d.setDate(d.getDate() + cookieDates);
      document.cookie =
        cookieName + "=" + cookieValue + ";expires=" + d.toGMTString();
    },
    submit() {
      this.loading = true;
      if (this.userId == "") {
      } else if (this.passWord == "") {
      } else {
        api
          .login({
            userName: this.userId,
            passWord: this.passWord
          })
          .then(res => {
            if (res.data.userId) {
              this.$store.state.userName = res.data.userName;
              this.saveCookie("userName", res.data.userName, 1);
              this.saveCookie("userId", res.data.userId, 1);
              this.$router.push('/index')
            }
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scope>
@import "@/assets/css/login/login.scss";
</style>