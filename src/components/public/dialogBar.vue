<template>
  <div class="dialog-bar" @click="close">
    <div v-if="isSuggest" class="topic-content">
      <span class="topic-name">{{topic.title}}</span>
      <i class="el-icon-close"></i>
      <div class="topic-msg">{{topic.content}}</div>
      <div class="btn">
        <el-button type="danger" @click="deleteAdice" round>删除</el-button>
      </div>
    </div>
    <div v-else class="topic-content">
      <span v-if="change" class="topic-name">{{topic.topicName}}</span>
      <el-input v-else class="topic-name" v-model="topic.topicName"></el-input>
      <i class="el-icon-close"></i>
      <div v-if="change" class="topic-msg">{{topic.topic}}</div>
      <el-input
        v-else
        type="textarea"
        placeholder="请输入内容"
        v-model="topic.topic"
        show-word-limit
        :rows="10"
      ></el-input>
      <div v-if="!isTeacher" class="btn">
        <el-button type="success" @click="submit" round>确认选题</el-button>
      </div>
      <div v-else class="btn">
        <el-button type="danger" @click="deleteTopic">删除题目</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  props: ["topic"],
  data() {
    return {
      isTeacher: this.$store.state.user.isTeacher,
      change: true,
      title: "",
      content: ""
    };
  },
  mounted() {},
  computed: {
    isSuggest() {
      return this.topic.title != undefined;
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
          console.log(1);
          if (this.$store.state.user.teamId) {
            console.log(111, this.$store.state.user.isCaptain);
            if (this.$store.state.user.isCaptain == 1) {
              console.log(11111);
              api
                .chooseTopic({
                  topicId: this.topic.id,
                  teamId: this.$store.state.user.teamId
                })
                .then(res => {
                  this.$message({
                    type: "info",
                    message: res.data.msg
                  });
                  this.close();
                });
            } else {
              this.$message({
                type: "info",
                message: "你不是队长，请让你的队长参与选题"
              });
              this.close();
            }
          } else {
            this.$message({
              type: "info",
              message: "请先加入或创建队伍后进行选题"
            });
            this.close();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消选题"
          });
          this.close();
        });
    },
    deleteTopic() {
      this.$confirm("你确定删除该题吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .deleteTopic({
              topicId: this.topic.id
            })
            .then(res => {
              this.$message({
                type: "info",
                message: res.data.msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deleteAdice(){
      this.$confirm("你确定删除建议吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .deleteAdvice({
              adviceId: this.topic.id
            })
            .then(res => {
              this.$message({
                type: "info",
                message: res.data.msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style>
</style>