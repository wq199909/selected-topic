<template>
    <div class="dialog-bar" @click="close">
    <div v-if="isSuggest" class="topic-content">
      <span class="topic-name">{{topic[0].title}}</span>
      <i class="el-icon-close"></i>
      <div class="topic-msg" >{{topic[0].content}}</div>
      <div class="btn">
        <el-button type="danger" @click="submit" round>删除</el-button>
      </div>
    </div>
    <div v-else class="topic-content">
      <span v-if="change" class="topic-name">{{topic.topicName}}</span>
      <el-input v-else  class="topic-name" v-model="topic.topicName"></el-input>
      <i class="el-icon-close"></i>
      <div v-if="change" class="topic-msg" >{{topic.topic}}</div>
      <el-input
      v-else
        type="textarea"
        placeholder="请输入内容"
        v-model="topic.topic"
        show-word-limit
       :rows = 10
      ></el-input>
      <div v-if="!isTeacher" class="btn">
        <el-button type="success" @click="submit" round>确认选题</el-button>
      </div>
      <div v-else class="btn">
        <el-button type="primary" @click="changeTopic">{{change?"修改题目":"取消修改"}}</el-button>
        <el-button type="danger" @click="deleteTopic">{{change?"删除题目":"提交修改"}}</el-button>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: ["topic"],
  data(){
    return {
      isTeacher: this.$store.state.user.isTeacher,
      change: true
    }
  },
  computed:{
    isSuggest(){
      console.log(this.topic[0].id)
      return this.topic[0].title != undefined
    }
  },
  methods: {
    close(e) {
      if (
        e == undefined ||
        e.target.className == "el-icon-close" ||
        e.target.className == "dialog-bar"
      ) {
        this.$emit("contentChangeShow");
      }
    },
    submit() {
      this.$confirm("你确定选择该题吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          setTimeout(() => {
            this.$message({
              type: "success",
              message: "选题成功!"
            });
            this.close();
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消选题"
          });
          this.close();
        });
    },
    deleteTopic(){
      this.$confirm("你确定删除该题吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          setTimeout(() => {
            this.$message({
              type: "success",
              message: "选题成功!"
            });
            this.close();
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
          this.close();
        });
    },
    changeTopic(){
    console.log(1)
    this.change = !this.change;
  }
  },
  
};
</script>

<style>
</style>