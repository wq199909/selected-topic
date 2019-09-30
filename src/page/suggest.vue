<template>
  <div class="suggest">
      <form action="">
        <el-input type="text" placeholder="请输入内容" v-model="text" maxlength="10" show-word-limit></el-input>
        <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="30" show-word-limit></el-input>
          <el-button type="primary">提交</el-button>
      </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      textarea: ""
    };
  }
};
</script>

<style lang="scss" scope>
@import '@/assets/css/suggest/suggest.scss';
</style>