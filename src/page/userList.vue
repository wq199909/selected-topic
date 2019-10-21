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
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="userId" label="用户id"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="qq" label="qq"></el-table-column>
      <!-- <el-table-column prop="passWord"></el-table-column> -->
      <el-table-column prop="isTeacher" label="职业"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/index";

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
              res.data.data.time.pass2 != 1
            ) {
              if (
                res.data.data.time.deadLine1 < Date.parse(new Date()) &&
                res.data.data.time.pass1 != 1
              ) {
                api.sort({}).then({});
                console.log("-->deadLine2");
              } else {
                api.secondSort({}).then({});
              }
            } else {
              console.log("-->deadLine1");
            }
          }
        });
    } else if (this.$store.state.userId == "") {
      this.$router.push("/index");
    }
    api.getAllAccount().then(res => {
      if (res.data.status) {
        res.data.data.student.forEach((ele, index) => {
          ele.isTeacher = "学生";
        });
        res.data.data.teacher.forEach((ele, index) => {
          ele.isTeacher = "教师";
        });
        this.userList = res.data.data.student.concat(res.data.data.teacher);
      }
    });
  },
  methods: {
    handleEdit(index, ele) {
      console.log(index, ele);
      api
        .deleteAccount({
          userId: ele.userId,
          isTeacher: ele.isTeacher == "教师"
        })
        .then(res => {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        });
    },
    clear() {
      this.$confirm("你是否确认要清空用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.cleanStudent({}).then(res => {
            if (res.data.status) {
              this.$message({
                type: "info",
                message: res.data.msg
              });
              this.userList = [];
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
.userList {
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  // overflow: hidden;
  .el-row {
    height: 40px;
    .el-col {
      text-align: center;
    }
  }
  .el-table {
    height: calc(100% - 60px) !important;
    overflow: hidden scroll !important;
  }
}
</style>