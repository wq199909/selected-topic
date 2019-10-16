<template>
  <div class="myGroup" v-if="hasTeam">
    <el-card class="member">
      <div slot="header" class="clearfix">
        <span>成员</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="deleteGroup">{{isCaptain?'销毁队伍':'退出队伍'}}</el-button>
      </div>
      <div v-for="o in teamMembers" :key="o.userId" class="text item"><span>姓名:{{o.userName}}</span><span>学号:{{o.userId}}</span><span>QQ号:{{o.qq}}</span>
      </div>
    </el-card>
    <el-card class="topic">
      <div slot="header" class="clearfix">
        <span>选题</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div v-for="(o,index) in topicList" :key="o.topicId" class="text item">
        <el-collapse>
          <el-collapse-item :title="'第'+(index+1)+'志愿 ' + o.topicName" name="1">
            <div>{{o.topic}}</div>
            <el-button v-if="isCaptain" type="danger" @click="cancelTopic(o)">删除题目</el-button>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
  <div v-else>
    你没有加入任何队伍
  </div>
</template>

<script>
import api from "@/api/index.js";
import dialogBar from "@/components/public/dialogBar";

export default {
  data() {
    return {
      show: false,
      topic: {},
      isCaptain: this.$store.state.user.isCaptain == 1
    };
  },
  components: {
    dialogBar
  },
  computed: {
    topicList() {
      return this.$store.state.myTopicList;
    },
    teamMembers() {
      return this.$store.state.teamMembers;
    },
    hasTeam(){
      return this.$store.state.user.teamId !=null 
    }
  },
  mounted() {
    api
      .getGroupMsg({
        teamId: this.$store.state.user.teamId
      })
      .then(res => {
        if (res.data.status) {
          this.$store.state.myTopicList = res.data.data.topic;
          this.$store.state.teamMembers = res.data.data.teamMember;
        }
      });
  },
  methods:{
    deleteGroup(){
      if(this.isCaptain){
        api.destroyTeam({
          teamId: this.$store.state.user.teamId
        }).then(res=>{
          this.$message({
          message: res.data.msg,
          center: true
        });
        this.$store.state.user.teamId=null
        })
      }else{
        api.quitTeam({
          teamId: this.$store.state.user.teamId,
          userId: this.$store.state.user.userId
        }).then(res=>{
          this.$message({
          message: res.data.msg,
          center: true
        });
        this.$store.state.user.teamId=null
        })
      }
    },
    cancelTopic(topic){
      api.cancelTopic({
        teamId: this.$store.state.user.teamId,
        topicId: topic.id
      }).then(res=>{
        if(res.data.status){
          this.$store.state.myTopicList = res.data.data;
        }
      })
    }
  }
};
</script>

<style>
</style>