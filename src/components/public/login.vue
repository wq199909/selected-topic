<template>
  <div class="my-login">
    <div class="content">
      <div class="form">
        <h4 v-if="error" class="tips">
          <i class="el-icon-remove"></i>
          {{error}}
        </h4>
        <p>
          <span>账号登陆</span>
        </p>
        <el-input
          :class="{error: error && !userId}"
          v-model="userId"
          placeholder="学号/教工号"
          prefix-icon="el-icon-s-custom"
        ></el-input>
        <el-input
          :class="{error: error && !passWord}"
          v-model="passWord"
          type="passWord"
          placeholder="密码"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
        <!-- <div class="foot">
          <a href="#">忘记密码?</a>
        </div>-->
        <el-button type="primary" class="btn-login" @click="submit">登录</el-button>
        <!-- <p class="reg">
          <span>还没有账号？</span>
          <router-link :to="{name: 'register'}">免费注册</router-link>
        </p>-->
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
import { parse } from "path";
export default {
  data() {
    return {
      userId: "",
      passWord: "",
      error: "",
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
      console.log(this.userId, this.passWord);
      if (!this.userId) {
        this.error = "请输入账号";
        return false;
      }
      if (!this.passWord) {
        this.error = "请输入密码";
        return false;
      }
      api
        .login({
          userId: this.userId,
          passWord: this.passWord
        })
        .then(res => {
          console.log(res);
          if (res.data.status) {
            if (!res.data.data.luckyNum && !res.data.data.isTeacher) {
                this.$prompt(
                  "幸运数字将影响你选题权重且只能输入一次，如果未输入可以在下次登录时输入",
                  "幸运数字",
                  {
                    confirmButtonText: "确定",
                    // cancelButtonText: "取消",
                    inputPattern: /[0-9]+/,
                    inputErrorMessage: "请输入正整数"
                  }
                )
                  .then(({ value }) => {
                    if (!isNaN(parseInt(value))) {
                      api
                        .setLuckyNum({
                          luckyNum: parseInt(value),
                          userId: res.data.data.userId
                        })
                        .then(res => {
                          key = false;
                        });
                    }
                  })
                  .catch(() => {});
              }
            
            this.$store.state.userId = res.data.data.userId;
            this.$store.state.userName = res.data.data.userName;
            this.$store.state.passWord = res.data.data.passWord;
            this.$store.state.user = res.data.data;
            this.saveCookie("userName", res.data.data.userName, 1);
            this.saveCookie("userId", res.data.data.userId, 1);
            this.saveCookie("passWord", this.passWord, 1);
            this.$router.push("/index");
            this.$emit("logFalse");
          } else {
            this.error = res.data.msg;
            return false;
          }
        });
    }
  }
};
</script>

<style lang="scss" scope>
@import "@/assets/css/login/login.scss";
</style>