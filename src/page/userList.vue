<template>
  <div class="userList">
    <el-row>
      <el-col :span="12">
        <h2>用户列表</h2>
      </el-col>
      <el-col :span="12">
        <el-button @click="clear">清空用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" height="400" style="width: 100%">
      <el-table-column prop="userId" label="用户id"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="qq" label="qq"></el-table-column>
      <el-table-column prop="passWord"></el-table-column>
      <el-table-column prop="isTeacher?'老师':'学生'" label="职业"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: []
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
            if (
              res.data.data.time.deadLine2 < Date.parse(new Date()) &&
              res.data.time.pass2 != 1
            ) {
              if (
                res.data.data.time.deadLine1 < Date.parse(new Date()) &&
                res.data.time.pass1 != 1
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
      this.$router.push("/index");
    }
  }
};
</script>

<style>
</style>