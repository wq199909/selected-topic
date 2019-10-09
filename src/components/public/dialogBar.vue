<template>
  <div class="dialog-bar" @click="close">
      <div class="topic-content">
        <span class="topic-name">{{topic.name}}</span>
        <i class="el-icon-close"></i>
        <div class="topic-msg">{{topic.msg}}</div>
        <div class="btn">
            <el-button type="success" round>确认选题</el-button>
        </div>
      </div>

  </div>
</template>

<script>
export default {
    props: ['topic'],
    methods: {
        close(e){
            if(e.target.className=="el-icon-close"||e.target.className=="dialog-bar"){
                this.$emit('contentChangeShow');
            }else if(e.target.className==""||e.target.tagName=="BUTTON"){
                console.log('success')
            }
        }
    },
}
</script>

<style>

</style>