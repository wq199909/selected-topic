<template>
  <div class="group">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="队伍列表" name="first">
        <el-row>
          <!-- <ul>
            <li v-for="item in groupList" :key="item.id">{{item.teamName}}</li>
          </ul>-->
          <group-list :groupList="groupList"></group-list>
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
import api from "@/api/index.js";
import createGroup from "@/components/group/createGroup.vue";
import myGroup from "@/components/group/myGroup.vue";
import groupList from "@/components/group/groupList.vue";
export default {
  components: {
    createGroup,
    myGroup,
    groupList
  },
  data() {
    return {
      activeName: "first",
      currentPage: 1,
      groupList: [],
      len: 0
    };
  },
  computed: {},
  mounted() {
    if (!this.$store.state.user.userId) {
      this.$router.push("/index");
    }
    if (window.location.hash.match(/\#[\w]*$/)) {
      window.location.hash.replace(/\#[\w]*$/, "#1");
    } else {
      window.location.hash += "#1";
    }
    api
      .getTeamList({
        num: this.currentPage
      })
      .then(res => {
        console.log(res.data);
        if (res.data.status) {
          this.len = res.data.msg;
          this.groupList = res.data.data;
        }
      });
  },
  methods: {
    changePage() {
      //   this.currentPage
      window.location.hash = window.location.hash.replace(
        /[\w]$/,
        this.currentPage
      );
      api
        .getTeamList({
          num: this.currentPage
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status) {
            this.len = res.data.msg;
            this.groupList = res.data.data;
          }
        });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/group/group.scss";
</style>