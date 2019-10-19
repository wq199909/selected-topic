<template>
  <ul class="aside-list" @click="changeIndex">
    <li v-for="(item, index) in list" :key="index">
      <router-link :to="item.hash" :class="{active: item.active}">{{item.msg}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list1: [
        { msg: "题目列表", active: true, hash: "/index" },
        { msg: "分组", active: false, hash: "/group" },
        { msg: "建议区", active: false, hash: "/suggest" },
        { msg: "添加题目", active: false, hash: "/addTopic" },
        { msg: "设置", active: false, hash: "/end" },
        { msg: "个人中心", active: false, hash: '/personal'}
      ],
      list2: [
        { msg: "题目列表", active: true, hash: "/index" },
        { msg: "分组", active: false, hash: "/group" },
        { msg: "建议区", active: false, hash: "/suggest" },
        { msg: "个人中心", active: false, hash: '/personal'}
      ],
      list3: [
        { msg: "题目列表", active: true, hash: "/index" },
        { msg: "分组", active: false, hash: "/group" },
        { msg: "建议区", active: false, hash: "/suggest" },
        { msg: "添加题目", active: false, hash: "/addTopic" },
        { msg: "设置", active: false, hash: "/end" },
        { msg: "成员", active: false, hash: "/userList" }
      ]
    };
  },
  computed: {
    list() {
      console.log(this.$store.state.user.isAdmin);
      if (this.$store.state.user.isAdmin) {
          console.log(this.list3)
        return this.list3;
      } else {
        return this.$store.state.user.isTeacher ? this.list1 : this.list2;
      }
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
    changeIndex(e) {
      if (e.target.tagName === "A") {
        let hash = e.target.href.match(/\/[\w]*$/)[0];
        for (let item of this.list) {
          if (item.hash == hash) {
            item.active = true;
          } else {
            item.active = false;
          }
        }
        this.$store.state.isShow = false;
      }
    },
    initList() {
      this.list.forEach(item => {
        if (location.hash.match(item.hash)) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    }
  },
  mounted() {
    this.$store.state.init = this.initList;
    this.initList();
  }
};
</script>

<style lang="scss">
@import "@/assets/css/public/aside.scss";
</style>