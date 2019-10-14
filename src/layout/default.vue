<template>
  <el-container>
    <el-header>
        <my-header />
    </el-header>
    <el-container>
      <el-aside width="200px" :class="[isShow&&'show']">
        <my-aside />
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>@汪清 洪紫阳 李家成</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import myHeader from '@/components/header/header'
import myAside from '@/components/aside/aside'
export default {
    components:{
        myHeader,
        myAside
    },
    computed:{
      isShow(){
        return this.$store.state.isShow;
      }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/public/header.scss"
</style>