<template>
  <div>
    <CommCart title="今日销售额" :count="salesToday | moneyFormat">
      <template #main>
        <div class="main">
          <div class="top">
            <span>日同比</span>
            <span class="count">{{ salesGrowthLastDay }}</span>
            <div :class="salesGrowthLastDay > 0 ? 'down' : 'up'"></div>
          </div>
          <div class="bottom">
            <span>月同比</span>
            <span class="count">{{ salesGrowthLastMonth }}</span>
            <div :class="salesGrowthLastMonth > 0 ? 'down' : 'up'"></div>
          </div>
        </div>
      </template>

      <template #bottom>
        <span class="leftText">昨日销售额</span>
        <span>{{ salesLastDay | moneyFormat }}</span>
      </template>
    </CommCart>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommCart from '../CommCart'
export default {
  name: 'TodaySale',
  computed: {
    ...mapState({
      salesToday: state => state.echarts.echartsData.salesToday,
      salesLastDay: state => state.echarts.echartsData.salesLastDay,
      salesGrowthLastDay: state => state.echarts.echartsData.salesGrowthLastDay,
      salesGrowthLastMonth: state =>
        state.echarts.echartsData.salesGrowthLastMonth
    })
  },
  components: {
    CommCart
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 12px;
  font-weight: bold;
  color: #666;
  .count {
    margin: 0 5px;
  }
  .top,
  .bottom {
    display: flex;
    align-items: center;
  }
}
</style>
