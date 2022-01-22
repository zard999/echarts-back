<template>
  <div>
    <CommCart title="今日订单" :count="orderToday | numberFormat">
      <template #main>
        <div class="main" ref="main"></div>
      </template>
      <template #bottom>
        <span class="leftText">昨日订单量</span>
        <span>{{ orderLastDay | numberFormat }}</span>
      </template>
    </CommCart>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommCart from '../CommCart'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

export default {
  name: 'TodayOrder',
  mounted() {
    this.chart = this.$echarts.init(this.$refs.main)

    this.chart.setOption(this.getOptions())

    // window.addEventListener(
    //   'resize',
    //   throttle(() => {
    //     this.chart.resize()
    //   }, 100)
    // )
    window.addEventListener(
      'resize',
      debounce(() => {
        this.chart.resize()
      }, 100)
    )
  },
  methods: {
    getOptions() {
      return {
        // 标题
        // title: {
        //   text: '哈哈哈'
        // },

        // 网格：控制整个图表在容器当中的大小
        // 图表距离容器上下左右的边距
        grid: {
          left: 5,
          right: 5,
          top: 0,
          bottom: 0
        },

        // x轴
        xAxis: {
          data: this.orderTrendAxis || [],
          show: false // 隐藏坐标值
        },

        // y轴
        yAxis: {
          show: false,
          boundaryGap: true
        },

        // 提示
        tooltip: {
          trigger: 'axis'
          // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },

        // 系列（图的线:line 柱：bar 饼：pie）
        series: {
          name: '实时订单数',
          type: 'line', // 图的类型
          data: this.orderTrend, // 数据
          smooth: true, // 平滑
          areaStyle: {
            color: 'hotpink' // 加上区域颜色
          },
          lineStyle: {
            opacity: 0 // 去掉线
          },
          itemStyle: {
            opacity: 0, // 去掉点
            color: 'red' // 不光能改线的颜色，也能改提示框点的颜色
          }
        }
      }
    }
  },
  watch: {
    orderTrendAxis: {
      handler(newVal, oldVal) {
        this.chart.setOption(this.getOptions())
      }
    }
  },
  computed: {
    ...mapState({
      /*
      "orderToday": 2562061,
  "orderLastDay": 2100000,
  "orderTrend": [610, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530, 220],
  "orderTrendAxis": ["00:00
       */
      orderToday: state => state.echarts.echartsData.orderToday,
      orderLastDay: state => state.echarts.echartsData.orderLastDay,
      orderTrend: state => state.echarts.echartsData.orderTrend,
      orderTrendAxis: state => state.echarts.echartsData.orderTrendAxis
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
  height: 50px;
}
</style>
