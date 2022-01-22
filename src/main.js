import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

// 引入echarts
import '@/plugins/echarts'
// 特殊声明：这个css必须在引入echarts之后，如果在之前引入会被上面的覆盖掉
import '@/styles/echarts.css'
// 引入mock
import '@/mockServer'
// 引入过滤器
import '@/filters'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import CategoryList from '@/components/CategoryList'
import HintButton from '@/components/HintButton'

import * as API from '@/api'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.component('CategoryList', CategoryList)
Vue.component('HintButton', HintButton)

Vue.prototype.$API = API
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
