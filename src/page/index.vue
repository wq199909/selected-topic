<template>
  <div class="index">
    <el-row>
      <my-search />
    </el-row>
    <el-row>
      <ul>
        <li v-for="item in topicList" :key="item.id">
          <router-link :to="'/topic-'+item.id">{{item.msg}}</router-link>
        </li>
      </ul>
    </el-row>
    <el-row>
      <div class="block">
        <el-pagination
          @current-change="changePage"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="50"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import mySearch from "@/components/search/search";
export default {
  data() {
    return {
      currentPage: 1,
      topicList: [
        {
          msg: "学生选题系统",
          id: "100"
        },
        {
          msg: "数独游戏",
          id: "101"
        },
        {
          msg: "口算出题软件",
          id: "102"
        }
      ]
    };
  },
  components: {
    mySearch
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
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>