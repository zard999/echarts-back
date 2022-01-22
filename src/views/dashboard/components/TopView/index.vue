<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"> <TodaySale></TodaySale> </el-col>
      <el-col :span="6"> <TodayOrder></TodayOrder> </el-col>
      <el-col :span="6"> <TradeUser></TradeUser></el-col>
      <el-col :span="6"><TotalUser></TotalUser></el-col>
    </el-row>
  </div>
</template>

<script>
import TodayOrder from './components/TodayOrder'
import TodaySale from './components/TodaySale'
import TotalUser from './components/TotalUser'
import TradeUser from './components/TradeUser'
export default {
  name: 'TopView',
  components: {
    TodayOrder,
    TodaySale,
    TotalUser,
    TradeUser
  }
}
</script>

<style lang="scss">
.up {
  border: 5px solid transparent;
  border-top-color: #008000;
}
.down {
  border: 5px solid transparent;
  border-bottom-color: #ff0000;
}
.leftText {
  margin-right: 5px;
}
</style>
