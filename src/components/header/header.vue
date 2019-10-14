<template>
  <el-row class="header">
    <el-col :span="4">
      <router-link to="/" class="logo">
        <img src="@/assets/image/logo.jpg" alt />
      </router-link>
    </el-col>
    <el-col :span="10">
      <div class="title">
        <span>选</span>
        <span>题</span>
        <span>系</span>
        <span>统</span>
      </div>
    </el-col>
    <el-col :span="6">
      <i class="el-icon-more" @click="showAside"></i>
    </el-col>
    <el-col :span="4">
      <template v-if="!log">
        <el-dropdown class="login">
          <span class="el-dropdown-link">
            {{userId}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/personal" class="personal">个人中心</router-link></el-dropdown-item>
            <el-dropdown-item><div @click="exit">退出</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template v-else>
        <span class="login" @click="loginShow">登录</span>
      </template>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    log(){
      return this.$store.state.log
    },
    userId(){
      // console.log( this.$store.getters.userId)
      return this.$store.state.userId
    }
  },
  methods: {
    exit(){
      if(window.location.hash.indexOf('index')==-1){
        this.$router.push({name: 'default'});
        this.$store.state.init();
      }
      this.$store.state.log = true;
      this.$store.state.user = {};
      this.$store.state.userId = '';
      console.log(this.$store.state.log)
    },
    loginShow(){
      this.$store.state.log = true;
    },
    showAside(){
      this.$store.state.isShow = !this.$store.state.isShow;
      console.log(this.$store.state.isShow)
    }
  },
};
</script>

<style>
</style>