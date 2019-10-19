<template>
  <div class="suggest-wrapper">
    <div class="suggest">
      <div v-if="isTeacher" class="teacher">
        <el-row>
          <el-col :span="12">
            <h2>建议列表</h2>
          </el-col>
          <el-col :span="12">
            <el-button v-if="isTeacher" @click="clear">清空建议</el-button>
          </el-col>
        </el-row>
        <el-row v-if="len">
          <ul>
            <li v-for="item in suggest" :key="item.id" @click="showMsg(item)">
              <el-button type="text">{{item.title}}</el-button>
            </li>
          </ul>
        </el-row>
        <el-row v-if="len">
          <div class="block">
            <el-pagination
              @current-change="changePage"
              :current-page.sync="currentPage"
              layout="prev, pager, next"
              :total="len"
            ></el-pagination>
          </div>
        </el-row>
        <el-row v-else>暂无建议</el-row>
      </div>
      <form action v-else>
        <div>你对本课程有什么建议？</div>
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
      <dialog-bar :topic="topic" @contentChangeShow="changeShow"></dialog-bar>
    </template>
  </div>
</template>

<script>
import dialogBar from "@/components/public/dialogBar";
import api from "@/api/index";
export default {
  components: {
    dialogBar
  },
  data() {
    return {
      text: "",
      textarea: "",
      error: "",
      isTeacher: this.$store.state.user.isTeacher,
      show: false,
      suggest: [],
      topic: {},
      currentPage: 1,
      len: 0
    };
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
            if(res.data.data.time.deadLine1<Date.parse(new Date())&&res.data.time.pass1!=1){
              api.sort({}).then({

              })
            }else{
              console.log('-->deadLine1')
            }
          }
        });
    } else if (this.$store.state.userId == "") {
      this.$router.push("/index");
    }
    if (this.$store.state.user.isTeacher) {
      if (window.location.hash.match(/\#[\w]*$/)) {
        window.location.hash.replace(/\#[\w]*$/, "#1");
      } else {
        window.location.hash += "#1";
      }
      this.$store.state.init();
      api
        .getAdvice({
          num: this.currentPage
        })
        .then(res => {
          if (res.data.status) {
            this.len = res.data.msg;
            this.suggest = res.data.data;
          }
        });
    }
  },
  methods: {
    changePage() {
      //   this.currentPage
      if (window.location.hash.match(/\#[\w]*$/)) {
        window.location.hash.replace(/\#[\w]*$/, this.currentPage);
      } else {
        window.location.hash += "#" + this.currentPage;
      }
      api
        .getAdvice({
          num: this.currentPage
        })
        .then(res => {
          this.suggest = res.data.data;
        });
    },
    showMsg(topic) {
      this.topic = topic;
      this.show = true;
    },
    changeShow() {
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
    },
    clear() {
      this.$confirm("你是否确认要清空建议?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.cleanAdvice({}).then(res => {
            if (res.data.status) {
              this.suggest = [];
              this.len = 0;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scope>
@import "@/assets/css/suggest/suggest.scss";
</style>