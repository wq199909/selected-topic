<template>
<div>
<div class="suggest">
    <div v-if="isTeacher">
      <ul>
        <li v-for="item in suggest" :key="item.id" @click="showMsg(item)">
          <el-button type="text">{{item.title}}</el-button>
        </li>
      </ul>
    </div>
    <form action v-else>
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
    <template v-if="show">
      <dialog-bar :topic="suggest" @contentChangeShow="changeShow"></dialog-bar>
    </template>
</div>
  
  
</template>

<script>
import dialogBar from '@/components/public/dialogBar';
import api from "@/api/index";
export default {
  components:{
    dialogBar
  },
  data() {
    return {
      text: "",
      textarea: "",
      error: "",
      isTeacher: this.$store.state.user.isTeacher,
      show: false,
      suggest: [{id:1, title:2, content:2}]
    };
  },
  mounted() {
    if (!this.$store.state.user.userId) {
      this.$router.push("/index");
    }
  },
  methods: {
    showMsg(topic){
    this.topic = topic;
    this.show = true;
  },
  changeShow(){
    this.show = false;
  },
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