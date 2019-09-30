<template>
    <div class="login">
        <form action="">
            <el-input v-model="userId" placeholder="请输入用户名"></el-input>
            <el-input placeholder="请输入密码" v-model="passWord" show-password></el-input>
        <el-button type="primary" :loading="loading" @click="submit()">登录</el-button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userId: '',
            passWord: '',
            loading: false
        }
    },
    methods: {
        submit(){
            this.loading = true;
            if(this.userId==''){

            }else if(this.passWord == ''){

            }else{
                console.log(this.loading)
                setTimeout(()=>{
                if(this.userId == 'U201714626' && this.passWord == '123456'){
                    this.loading = false;
                }

                },1000)
            }
        }
    },
}
</script>

<style lang="scss" scope>
@import '@/assets/css/login/login.scss';

</style>