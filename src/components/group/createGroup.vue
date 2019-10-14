<template>
  <div class="create">
    <div v-if="hasTeam">你已在队伍中</div>
    <div v-else>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                name:'',
                delivery: fasle,
                
            }
        }
    },
  computed: {
    hasTeam: function() {
      return this.$store.state.user.teamId != null;
    }
  }
};
</script>

<style>
</style>