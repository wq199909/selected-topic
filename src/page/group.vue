<template>
  <div class="group">
    <el-row>
      <el-button type="primary" round>创建队伍</el-button>
      <el-button type="primary" round>我的队伍</el-button>
    </el-row>
    <el-row>
      <ul>
        <li v-for="item in groupList" :key="item.id">{{item.name}}</li>
      </ul>
    </el-row>
    <el-row>
      <div class="block">
        <el-pagination
          @current-change="changePage"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="len"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
data(){
    return {
        currentPage: 1,
        groupList:[
            {name: '404', id: 1},
            {name: '403', id: 2}
        ]
    }
    
},
computed: {
        len(){
            return this.groupList.length
        }
    },
    mounted(){
        if (window.location.hash.match(/\#[\w]*$/)) {
      window.location.hash.replace(/\#[\w]*$/, "#1");
    } else {
      window.location.hash += "#1";
    }
    },
    methods:{
        changePage() {
      //   this.currentPage
      window.location.hash = window.location.hash.replace(
        /[\w]$/,
        this.currentPage
      );
    },
    }
};
</script>
<style lang="scss">
@import "@/assets/css/group/group.scss";
</style>