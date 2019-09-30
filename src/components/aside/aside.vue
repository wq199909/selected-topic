<template>
  <ul class="aside-list" @click="changeIndex">
      <li
        v-for="(item, index) in list"
        :key="index"
      >
      <router-link :to='item.hash' :class="{active: item.active}">{{item.msg}}</router-link>
      </li>
  </ul>
</template>

<script>
export default {
    data(){
        return {
            list: [
                {msg:'题目列表', active: true, hash:'/index'},
                {msg:'分组', active: false, hash:'/group'},
                {msg:'建议区', active: false, hash:'/suggest'}
            ]
        }
    },
    // mounted(){
    //     let hash = window.location.hash.match(/\/[\w]*$/)[0];
    //     console.log(hash)
    //     for(let item of this.list){
    //         if(hash.indexOf(item.hash) != -1){
    //             item.active = true;
    //         }else{
    //             item.active = false;
    //         }
    //     }
    // },
    methods: {
        changeIndex(e){
            if(e.target.tagName === 'A'){
                let hash = e.target.href.match(/\/[\w]*$/)[0];
                for(let item of this.list){
                    if(item.hash == hash){
                        item.active = true;
                    }else{
                        item.active = false;
                    }
                }
            }
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/public/aside.scss';
</style>