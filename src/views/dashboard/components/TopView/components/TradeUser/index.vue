<template>
  <div>
    <CommCart title="累积用户数" :count="orderUser | numberFormat">
      <template #main>
        <v-chart autoresize :options="getOptions()"></v-chart>
      </template>
      <template #bottom>
        <span class="leftText">退货率</span>
        <span>{{ returnRate }}</span>
      </template>
    </CommCart>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommCart from '../CommCart'
export default {
  name: 'TradeUser',
  methods: {
    getOptions() {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },

        xAxis: {
          data: this.orderUserTrendAxis,
          show: false
        },

        yAxis: { show: false },
        tooltip: { trigger: 'axis' },
        series: {
          name: '实时用户数',
          type: 'bar',
          data: this.orderUserTrend || [],
          barWidth: '50%'
          // itemStyle: {
          //   color: 'green'
          // }
        },
        color: 'green'
      }
    }
  },
  computed: {
    ...mapState({
      /**
       * "//3": "今日交易用户数",
  "orderUser": 182425,
  "returnRate": 5.91,
  "orderUserTrend": [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150],
  "orderUserTrendAxis": ["00:00", "0
       */
      orderUser: state => state.echarts.echartsData.orderUser,
      returnRate: state => state.echarts.echartsData.returnRate,
      orderUserTrend: state => state.echarts.echartsData.orderUserTrend,
      orderUserTrendAxis: state => state.echarts.echartsData.orderUserTrendAxis
    })
  },
  components: {
    CommCart
  }
}
</script>

<style></style>
