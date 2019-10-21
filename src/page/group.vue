<template>
  <div class="group">
    <el-button class="clear" @click="clear" v-if="$store.state.user.isTeacher">清空队伍</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="队伍列表" name="first">
        <el-row>
          <!-- <ul>
            <li v-for="item in groupList" :key="item.id">{{item.teamName}}</li>
          </ul>-->
          <group-list :groupList="groupList"></group-list>
        </el-row>
        <el-row >
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
      <el-tab-pane label="创建队伍" name="second" v-if="!isTeacher">
        <create-group></create-group>
      </el-tab-pane>
      <el-tab-pane label="我的队伍" name="third" v-if="!isTeacher">
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
      len: 0,
      isTeacher: this.$store.state.user.isTeacher
    };
  },
  computed: {},
  mounted() {
    if (this.$store.state.userId !== "" && !this.$store.state.user.userId) {
      api
        .login({
          userId: this.$store.state.userId,
          passWord: this.$store.state.passWord
        })
        .then(res => {
          if (res.data.status) {
            this.$store.state.user = res.data.data;
            this.$store.state.log = false;
            this.$store.state.init();
            if (
              res.data.data.time.deadLine2 < Date.parse(new Date()) &&
              res.data.data.time.pass2 != 1
            ) {
              if (
                res.data.data.time.deadLine1 < Date.parse(new Date()) &&
                res.data.time.data.pass1 != 1
              ) {
                api.sort({}).then({});
                console.log('-->deadLine2');
              } else {
                api.secondSort({}).then({});
              }
            } else {
                console.log('-->deadLine1')
            }
          }
        });
    }else if(this.$store.state.userId == ""){
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
      if (window.location.hash.match(/\#[\w]*$/)) {
      window.location.hash.replace(/\#[\w]*$/, this.currentPage);
    } else {
      window.location.hash += ('#'+this.currentPage);
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
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    clear() {
      this.$confirm("你是否确认要清空队伍?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.cleanTeam({}).then(res => {
            if (res.data.status) {
              this.groupList = [];
              this.len = 0;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/group/group.scss";
</style>