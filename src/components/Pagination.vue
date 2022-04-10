<template>
  <div id="pagination">
    <el-pagination small layout="prev, pager, next" :page-count="count" @current-change="handleCurrentChange" :current-page="page">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props:['count','page'],
  methods:{
    handleCurrentChange(val){
      this.$emit("update:page",val);
      this.$emit('handleCurrentChange')
    }
  }
  
}
</script>
<style scoped>
.el-pagination{
  display:flex;
  justify-content:center
}

</style>