<template>
  <div class="suggest">
    <form action>
      <div class="error">{{error}}</div>
      <el-input type="text" placeholder="请输入内容" v-model="text" maxlength="10" show-word-limit></el-input>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="30"
        show-word-limit
      ></el-input>
      <el-button type="primary" @click="submit">提交</el-button>
    </form>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      text: "",
      textarea: "",
      error: ""
    };
  },
  mounted() {
    if (!this.$store.state.user.userId) {
      this.$router.push("/index");
    }
  },
  methods: {
    submit() {
      const h = this.$createElement;
      if (this.text == "") {
        this.$message({
          message: h("p", { style: "color: red" }, "标题不能为空"),
          center: true
        });
      } else if (this.textarea == "") {
        this.$message({
          message: h("p", { style: "color: red" }, "内容不能为空"),
          center: true
        });
      } else {
        this.error = "";
        api
          .sendSuggests({
            title: this.text,
            content: this.textarea,
            class: this.$store.state.user.class,
            userName: this.$store.state.user.userName,
            userId: this.$store.state.user.userId
          })
          .then(res => {
            console.log(res);
            console.log(this.$store.state.user);
            if (res.data.status) {
              this.text = "";
              this.textarea = "";
            } else {
            }
          })
          .catch(() => {
            console.log("发生了意外的错误");
          });
      }
    }
  }
};
</script>

<style lang="scss" scope>
@import "@/assets/css/suggest/suggest.scss";
</style>