<template>
  <div>
    <CommCart title="交易用户数" :count="usersTotal | numberFormat">
      <template #main>
        <v-chart autoresize :options="getOptions()"></v-chart>
      </template>
      <template #bottom>
        <div class="bottom">
          <div class="left">
            <span>日同比</span>
            <span class="count">{{ userGrowthLastDay }}</span>
            <div :class="userGrowthLastDay > 0 ? 'down' : 'up'"></div>
          </div>
          <div class="right">
            <span>月同比</span>
            <span class="count">{{ userGrowthLastMonth }}</span>
            <div :class="userGrowthLastMonth > 0 ? 'down' : 'up'"></div>
          </div>
        </div>
      </template>
    </CommCart>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommCart from '../CommCart'
export default {
  name: 'TotalUser',
  methods: {
    getOptions() {
      return {
        // title:{},
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        xAxis: {
          type: 'value',
          show: false,
          min: 0,
          max: this.usersTotal
        },
        yAxis: {
          type: 'category',
          show: false
        },

        tooltip: {},
        series: {
          name: '月增长量',
          type: 'bar',
          data: [this.usersTotal - this.usersLastMonth],
          barWidth: '30%',
          showBackground: '#f0f0f0', // 背景色
          itemStyle: {
            color: 'hotpink'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right',
            distance: 60
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      /**
       * "//4": "累计用户数",
  "usersTotal": 1177965,
  "usersLastDay": 1000000,
  "usersLastMonth": 800000,
  "userGrowthLastDay": "17.70",
  "userGrowthLastMonth": "47.12",
       */
      usersTotal: state => state.echarts.echartsData.usersTotal,
      usersLastDay: state => state.echarts.echartsData.usersLastDay,
      usersLastMonth: state => state.echarts.echartsData.usersLastMonth,
      userGrowthLastDay: state => state.echarts.echartsData.userGrowthLastDay,
      userGrowthLastMonth: state =>
        state.echarts.echartsData.userGrowthLastMonth
    })
  },
  components: {
    CommCart
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    display: flex;
    .count {
      margin: 0 5px;
    }
  }
}
</style>
