<template>
    <el-row class="header">
        <el-col :span="4">
            <router-link to='/' class="logo">
                <img src="@/assets/image/logo.jpg" alt="">
            </router-link>
        </el-col>
        <el-col :span="10">
            <div class="title">
                <span>选</span>
                <span>课</span>
                <span>系</span>
                <span>统</span>
            </div>
        </el-col>
        <el-col :span="6">

        </el-col>
        <el-col :span="4">
            <router-link to='/login' class='login'>登录</router-link>
        </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style>

</style>