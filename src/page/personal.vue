<template>
  <div class="personal">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户id">
        <el-input v-model="form.userId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.userName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="qq">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.class"></el-input>
      </el-form-item>
      <el-form-item label="幸运数字">
        <el-input v-model="form.luckyNum" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.passWord" show-password></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit">保存修改</el-button>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";

export default {
  data() {
    return {
      // form: this.$store.state.user
    };
  },
  computed:{
    form(){
      return this.$store.state.user
    }
  },
  methods:{
    submit(){
      api.updateinfo({
        userId: this.form.userId,
        qq: this.form.qq,
        class: this.form.class,
        passWord: this.form.passWord
      }).then(res=>{
        if(res.data.data){
          this.$message({
            type: 'info',
            message: res.data.msg
          })
        }
      })
    }
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
};
</script>

<style lang="scss">
@import '@/assets/css/personal/personal.scss'
</style>