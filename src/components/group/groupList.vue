<template>
<div class="groupList">
<el-table
      :data="groupList"
      style="width: 100%">
      <el-table-column
        prop="teamId"
        label="队伍Id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="teamName"
        label="队名"
        width="120">
      </el-table-column>
    <el-table-column
        prop="captainName"
        label="队长名"
        width="120">
      </el-table-column>
    </el-table>
</div>
  
</template>

<script>
export default {
    props:['groupList']
}
</script>

<style>

</style>