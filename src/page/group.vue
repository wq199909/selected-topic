<template>
  <div class="group">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="队伍列表" name="first">
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
      </el-tab-pane>
      <el-tab-pane label="创建队伍" name="second">
        <create-group></create-group>
      </el-tab-pane>
      <el-tab-pane label="我的队伍" name="third">
        <my-group></my-group>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import createGroup from '@/components/group/createGroup.vue';
import myGroup from '@/components/group/myGroup.vue';
export default {
  components:{
    createGroup,
    myGroup
  },
  data() {
    return {
      activeName: "first",
      currentPage: 1,
      groupList: [{ name: "404", id: 1 }, { name: "403", id: 2 }]
    };
  },
  computed: {
    len() {
      return this.groupList.length;
    }
  },
  mounted() {
    if (window.location.hash.match(/\#[\w]*$/)) {
      window.location.hash.replace(/\#[\w]*$/, "#1");
    } else {
      window.location.hash += "#1";
    }
  },
  methods: {
    changePage() {
      //   this.currentPage
      window.location.hash = window.location.hash.replace(
        /[\w]$/,
        this.currentPage
      );
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/group/group.scss";
</style>