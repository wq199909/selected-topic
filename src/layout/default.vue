<template>
  <el-container>
    <el-header>
        <my-header />
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>@汪清 洪紫阳 李家成</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import myHeader from '@/components/header/header'
export default {
    components:{
        myHeader
    }
};
</script>

<style lang="scss">
@import "@/assets/css/public/header.scss"
</style>