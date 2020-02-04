<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iselect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hotCity/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Iselect from '@/components/changeCity/select'
import HotCity from '@/components/changeCity/hotCity'
import Category from '@/components/changeCity/category'
export default {
  name: "changeCity",
  components:{
    Iselect,
    HotCity,
    Category
  }
}
</script>

<style lang="scss">

</style>
