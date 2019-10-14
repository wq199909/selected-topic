<template>
  <div class="dialog-bar" @click="close">
    <div class="topic-content">
      <span class="topic-name">{{topic.topicName}}</span>
      <i class="el-icon-close"></i>
      <div class="topic-msg">{{topic.topic}}</div>
      <div class="btn">
        <el-button type="success" @click="submit" round>确认选题</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["topic"],
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
    }
  }
};
</script>

<style>
</style>