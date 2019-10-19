<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户id">
        <el-input v-model="form.userId" ></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="老师?">
        <el-switch v-model="form.isTeacher"></el-switch>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.passWord"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit">确认添加</el-button>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      form: {
        userId: "",
        userName: "",
        isTeacher: false,
        passWord: ""
      }
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
  },
  methods: {
      submit(){
 if (this.form.userId && this.form.userName && this.form.passWord) {
      api
        .addAccount({
          userId: this.form.userId,
          userName: this.form.userName,
          isTeacher: this.form.isTeacher,
          passWord: this.form.passWord
        })
        .then(res => {
          this.$message({
            type: "info",
            message: res.data.msg
          });
          this.form = {
            userId: "",
            userName: "",
            isTeacher: false,
            passWord: ""
          };
        });
    } else {
      this.$message({
        type: "info",
        message: "信息不能为空"
      });
    }
  }
      }
   
};
</script>

<style lang="scss">
.add {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 100px;
  .el-form {
      .el-form-item{
      position: relative;
      z-index: 999;
      left: 40%;
      transform: translate(-50%, 0);
      width: 300px;
          
      }
    .el-input,
    .el-button {
      display: inline-block;
      width: 300px;
    }
    .el-button {
      width: 320px;
      position: relative;
      z-index: 999;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>