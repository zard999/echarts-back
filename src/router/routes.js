import Layout from '@/layout'

// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
]

// 这个是异步路由，也叫动态路由，动态生成的

export const asyncRoutes = [
  //权限数据管理相关的路由
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理'
        }
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理'
        }
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权'
        },
        hidden: true
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  //  商品菜单
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: 'trademark/list',
        name: 'Trademark',
        meta: { title: '品牌管理' },
        component: () => import('@/views/product/trademark/list.vue')
      },
      {
        path: 'attr/list',
        name: 'Attr',
        meta: { title: '平台属性管理' },
        component: () => import('@/views/product/attr/list.vue')
      },
      {
        path: 'spu/list',
        name: 'Spu',
        meta: { title: 'SPU管理' },
        component: () => import('@/views/product/spu/list.vue')
      },
      {
        path: 'sku/list',
        name: 'Sku',
        meta: { title: 'SKU管理' },
        component: () => import('@/views/product/sku/list.vue')
      }
    ]
  }
]

// 这个是任意路由
// 404 page must be placed at the end !!!
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }
