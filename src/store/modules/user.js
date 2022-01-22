import { login, logout, getInfo } from '@/api/acl/user'
import { resetRouter } from '@/router'
import router from '@/router'
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes'
import cloneDeep from 'lodash/cloneDeep'
// 处理动态路由的函数（过滤）
function filterAsyncRoutes(asyncRoutes, routes) {
  return asyncRoutes.filter(item => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length) {
        item.children = filterAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

const state = {
  token: localStorage.getItem('token_key'),
  name: '',
  avatar: '',
  buttons: [],
  roles: [],
  routes: []
}

const mutations = {
  RESET_STATE: state => {
    state.token = ''
    state.name = ''
    state.avatar = ''
    state.buttons = []
    state.roles = []
    state.routes = []
  },
  SET_USER_INFO: (state, userInfo) => {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.buttons = userInfo.buttons
    state.roles = userInfo.roles
    state.routes = userInfo.routes
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROUTES(state, asyncRoutes) {
    // 这个是给递归菜单遍历用的
    state.routes = constantRoutes.concat(asyncRoutes, anyRoutes)
    // 动态添加路由
    router.addRoutes([...asyncRoutes, anyRoutes])
  }
}

const actions = {
  // user login
  async login({ commit }, { username, password }) {
    const result = await login({
      username: username.trim(),
      password: password
    })
    if (result.code === 20000 || result.code === 200) {
      commit('SET_TOKEN', result.data.token)
      localStorage.setItem('token_key', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    const result = await getInfo(state.token)

    if (result.code === 20000 || result.code === 200) {
      commit('SET_USER_INFO', result.data)
      // 这得根据服务器返回的routes数据和路由信息里的name做对比，如果有，才显示
      commit(
        'SET_ROUTES',
        filterAsyncRoutes(cloneDeep(asyncRoutes), result.data.routes)
      )
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  // user logout
  async logout({ commit, state }) {
    const result = await logout(state.token)
    if (result.code === 20000 || result.code === 200) {
      localStorage.removeItem('token_key')
      commit('RESET_STATE')
      resetRouter()
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
