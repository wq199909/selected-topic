<template>
  <div class="index">
    <template v-if="hasTopic">
      <el-row>
        <el-col :span="12">
          <h2>题目列表</h2>
        </el-col>
        <el-col :span="12">
          <el-button v-if="isTeacher" @click="clear">清空题目</el-button>
        </el-col>
      </el-row>
      <el-row v-if="len">
        <ul>
          <li
            :class="[item.teamId&&'hasTeam']"
            v-for="item in topicList"
            :key="item.id"
            @click="showMsg(item)"
          >
            <el-button type="text">{{item.topicName}}</el-button>
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
      <el-row v-else>暂无题目</el-row>
    </template>
    <template v-else>
      <el-row>你已成功选题,可以在分组-我的队伍中查看选题结果</el-row>
    </template>
    <template v-if="show">
      <dialog-bar :topic="topic" @contentChangeShow="changeShow"></dialog-bar>
    </template>

    <template v-if="log">
      <my-login @logFalse="changeLog"></my-login>
    </template>
  </div>
</template>
<script>
import dialogBar from "@/components/public/dialogBar";
import myLogin from "@/components/public/login";
import mySearch from "@/components/search/search";
import api from "@/api/index.js";
export default {
  data() {
    return {
      currentPage: 1,
      topicList: [],
      show: false,
      // log: false,
      topic: {},
      len: 0
    };
  },
  computed: {
    log() {
      return this.$store.state.log;
    },
    isTeacher() {
      return this.$store.state.user.isTeacher;
    },
    hasTopic() {
      return this.$store.state.user.topic == null;
    }
  },
  components: {
    mySearch,
    dialogBar,
    myLogin
  },
  mounted() {
    console.log(
      this.$store.state.userId !== "" && !this.$store.state.user.userId
    );
    if (window.location.hash.match(/\#[\w]*$/)) {
      window.location.hash.replace(/\#[\w]*$/, "#1");
    } else {
      window.location.hash += "#1";
    }
    this.$store.state.init();
    api
      .getTopicList({
        num: this.currentPage
      })
      .then(res => {
        // this.topicList = res.data.data;
        // console.log(res.data)
        if (res.data.status) {
          this.len = res.data.msg;
          this.topicList = res.data.data;
        }
      });
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
            if (
              res.data.data.time.deadLine2 < Date.parse(new Date()) &&
              res.data.data.time.pass2 != 1
            ) {
              if (
                res.data.data.time.deadLine1 < Date.parse(new Date()) &&
                res.data.data.time.pass1 != 1
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
    } else if (this.$store.state.userId == "") {
      this.$store.state.log = true;
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
        .getTopicList({
          num: this.currentPage
        })
        .then(res => {
          this.topicList = res.data.data;
          console.log(res.data);
        });
    },
    showMsg(topic) {
      this.topic = topic;
      this.show = true;
    },
    changeShow() {
      this.show = false;
    },
    changeLog() {
      this.$store.state.log = false;
      console.log(this.$store.state.log);
    },
    clear() {
      this.$confirm("你是否确认要清空题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.clearTopic({}).then(res => {
            if (res.data.status) {
              this.topicList = [];
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

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>