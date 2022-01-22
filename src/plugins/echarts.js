// 引入并声明使用echarts
import Vue from 'vue'
import * as echarts from 'echarts'
import VueEcharts from 'vue-echarts'

Vue.prototype.$echarts = echarts
Vue.component('v-chart', VueEcharts)
