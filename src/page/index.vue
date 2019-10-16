<template>
  <div class="index">
    <el-row>
      <ul>
        <li v-for="item in topicList" :key="item.id" @click="showMsg(item)">
          <el-button type="text">{{item.topicName}}</el-button>
        </li>
      </ul>
    </el-row>
    <el-row>
      <div class="block">
        <el-pagination
          @current-change="changePage"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="len"
        ></el-pagination>
      </div>
    </el-row>
    <template v-if="show">
      <dialog-bar :topic="topic" @contentChangeShow="changeShow"></dialog-bar>
    </template>
    
  <template v-if="log"> 
    <my-login @logFalse="changeLog"></my-login>
  </template>
  </div>
</template>
<script>
import dialogBar from '@/components/public/dialogBar';
import myLogin from '@/components/public/login';
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
      len:0
    };
  },
  computed: {
    log(){
      return this.$store.state.log
    }
      
  },
  components: {
    mySearch,
    dialogBar,
    myLogin
  },
  mounted() {
    console.log(this.$store.state.userId !== "" && !this.$store.state.user.userId)
    if (window.location.hash.match(/\#[\w]*$/)) {
      window.location.hash.replace(/\#[\w]*$/, "#1");
    } else {
      window.location.hash += "#1";
    }
    this.$store.state.init();
    api.getTopicList({
      num : this.currentPage
    }).then(res => {
      // this.topicList = res.data.data;
      // console.log(res.data)
      if(res.data.status){
        this.len = res.data.msg;
        this.topicList = res.data.data;
        console.log(this.topicList)
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
            console.log(this.$store.state.log)
          }
        });
    }else if(this.$store.state.userId == ""){
      this.$store.state.log = true;
    }
  },
  methods: {
    changePage() {
      //   this.currentPage
      window.location.hash = window.location.hash.replace(
        /[\w]$/,
        this.currentPage
      );
    api.getTopicList({
      num : this.currentPage
    }).then(res => {
      this.topicList = res.data.data;
      console.log(res.data)
    });
    },
  showMsg(topic){
    this.topic = topic;
    this.show = true;
  },
  changeShow(){
    this.show = false;
  },
  changeLog(){
    this.$store.state.log = false;
    console.log(this.$store.state.log)
  }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>