<template>
  <el-form class="end">
    <el-row>
      <el-col :span="24">
        <el-form-item label="选题结束时间" size="mini">
          <el-date-picker v-model="startDate" format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="补选结束时间" size="mini">
          <el-date-picker v-model="endDate" format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-button @click="submit" type="primary">确认提交</el-button>
    </el-row>
  </el-form>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      startDate: "",
      endDate: ""
    };
  },
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
            if(res.data.data.time.deadLine1<Date.parse(new Date())&&res.data.time.pass1!=1){
              api.sort({}).then({

              })
            }else{
              console.log('-->deadLine1')
            }
          }
        });
    } else if (this.$store.state.userId == "") {
      this.$router.push("/index");
    }
  },
  methods: {
    submit() {
      if (this.startDate != "" && this.endDate != "") {
        this.$confirm(
          "设置选题结束时间为:" +
            new Date(this.startDate).toLocaleString() +
            ",补选结束时间为" +
            new Date(this.endDate).toLocaleString() +
            " 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
              console.log(Date.parse(this.startDate))
            api.setEndTime({
                endTime1: Date.parse(this.startDate),
                endTime2: Date.parse(this.endDate)
            }).then(res=>{
                if(res.data.status){
                    this.$message({
                        type: 'info',
                        message: res.data.msg
                    })
                }
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "时间不能为空"
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/end/end.scss";
</style>