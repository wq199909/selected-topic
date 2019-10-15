<template>
  <div class="myGroup">
    <el-card class="member">
      <div slot="header" class="clearfix">
        <span>成员</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in teamMembers" :key="o.userId" class="text item">{{'列表内容 ' + o.userName }}</div>
    </el-card>
    <el-card class="topic">
      <div slot="header" class="clearfix">
        <span>选题</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in topicList" :key="o.topicId" class="text item">{{'列表内容 ' + o }}</div>
    </el-card>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data(){
    return {
      topicList: [],
      teamMembers: []
    }
  },
  mounted(){
    api.getGroupMsg({
      teamId: this.$store.state.user.teamId
    }).then(res=>{
      if(res.data.status){
        this.topicList = res.data.data.topic;
        this.teamMembers = res.data.data.teamMember;
        console.log(this.topicList, this.teamMembers)
      }
    })
  }
};
</script>

<style>
</style>