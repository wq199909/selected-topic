<template>
  <div class="groupList">
    <el-table :data="groupList" height="300" style="width: 100%">
      <el-table-column prop="teamId" label="队伍Id"></el-table-column>
      <el-table-column prop="teamName" label="队名"></el-table-column>
      <el-table-column prop="captainName" label="队长名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" size="mini">加入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  props: ["groupList"],
  methods: {
    handleEdit(index, team) {
      if (this.$store.state.user.teamId) {
        this.$message("你已经加入了队伍，不可再次加入！");
      } else {
        api
          .isEncryption({
            teamId: team.teamId
          })
          .then(res => {
            console.log(res.data);
            if (res.data.data == true) {
              this.$prompt("请输入密码", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
                .then(({ value }) => {
                  api
                    .addTeam({
                      userId: this.$store.state.userId,
                      teamId: team.teamId,
                      passWord: value
                    })
                    .then(res => {
                      if (res.data.status) {
                        this.$message(res.data.msg);
                        this.$store.state.user.teamId = team.teamId;
                      } else {
                        this.$message(res.data.msg);
                      }
                    });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
            } else {
              api
                .addTeam({
                  userId: this.$store.state.userId,
                  teamId: team.teamId,
                  passWord: ""
                })
                .then(res => {
                  if (res.data.status) {
                    this.$message(res.data.msg);
                    this.$store.state.user.teamId = team.teamId;
                    api
                      .getGroupMsg({
                        teamId: this.$store.state.user.teamId
                      })
                      .then(res => {
                        if (res.data.status) {
                          this.$store.state.myTopicList = res.data.data.topic;
                          this.$store.state.teamMembers = res.data.data.teamMember;
                         console.log(this.$store.state.myTopicList)
                        }
                      });
                  } else {
                    this.$message(res.data.msg);
                  }
                });
            }
          });
      }
    }
  }
};
</script>

<style>
</style>