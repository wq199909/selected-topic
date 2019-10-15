<template>
  <div class="createGroup">
    <div v-if="hasTeam">你已在队伍中</div>
    <div v-else>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="队伍名称">
          <el-input v-model="form.name" key="teamName"></el-input>
        </el-form-item>
        <el-form-item label="队伍加密">
          <el-switch v-model="form.delivery"></el-switch>
          <span class="el-icon-warning-outline">加密时他人加入必须输入密码</span>
        </el-form-item>
        <el-form-item v-if="form.delivery" label="队伍密码">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
    data(){
        return{
            form:{
                name:'',
                delivery: false,
                passWord:''
            }
        }
    },
  computed: {
    hasTeam: function() {
      return this.$store.state.user.teamId != null;
    }
  },
  methods:{
    onSubmit(){
      if(this.form.name==''){
        this.$message('队伍不能为空！')
      }else if(this.form.delivery && this.form.passWord){
        this.$message('开启加密时密码不能为空')
      }else{
        api.createTeam({
          teamName: this.form.name,
          passWord: this.form.passWord,
          encryption: this.form.delivery,
          class: this.$store.state.user.class,
          userName: this.$store.state.user.userName,
          userId: this.$store.state.user.userId
        }).then((res)=>{
          if(res.data.status){
            this.$message('队伍创建成功');
            this.reset();
            this.$store.state.user.teamId = res.data.data.teamId;
          }
        })
      }
    },
    reset(){
      this.form.name = '';
      this.form.delivery = false;
      this.form.passWord = '';
    }
  }
};
</script>

<style>
</style>