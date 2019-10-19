<template>
  <div class="addTopic">
    <form action>
      <div>添加题目</div>
      <el-input type="text" placeholder="请输入标题" v-model="text" show-word-limit></el-input>
      <el-input type="textarea" placeholder="请输入内容" v-model="textarea" cols="10" show-word-limit></el-input>
      <el-button type="primary" @click="submit">提交</el-button>
    </form>
  </div>
</template>

<script>
import api from "@/api/index";

export default {
  data() {
    return {
      textarea: "",
      text: ""
    };
  },
  methods: {
    submit() {
        console.log(11)
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
          .addTopic({
            topicName: this.text,
            topic: this.textarea,
          })
          .then(res => {
            if (res.data.status) {
              this.text = "";
              this.textarea = "";
              this.$message({
                  message: res.data.msg
              })
            } else {

            }
          })
          .catch(() => {
            console.log("发生了意外的错误");
          });
      }
    }
  },
  mounted() {
    if (this.$store.state.userId !== "" && !this.$store.state.user.userId) {
      api
        .login({
          userId: this.$store.state.userId,
          passWord: this.$store.state.passWord
        })
        .then(res => {
          if (res.data.status) {
            this.$store.state.user = res.data.data;
            this.$store.state.log = false;
            this.$store.state.init();
            if (
              res.data.data.time.deadLine2 < Date.parse(new Date()) &&
              res.data.time.pass2 != 1
            ) {
              if (
                res.data.data.time.deadLine1 < Date.parse(new Date()) &&
                res.data.time.pass1 != 1
              ) {
                api.sort({}).then({});
                console.log('-->deadLine2');
              } else {
                api.secondSort({}).then({});
              }
            } else {
                console.log('-->deadLine1')
            }
          }
        });
    }else if(this.$store.state.userId == ""){
      this.$router.push("/index");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/addTopic/addTopic.scss";
</style>