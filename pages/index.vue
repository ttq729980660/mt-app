<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5"><emenu/></el-col>
      <el-col :span="19"><life/></el-col>
    </el-row>
    <el-row>
      </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/home/menu'
import Life from '@/components/home/life'
export default {
  components:{
    Emenu,
    Life
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
