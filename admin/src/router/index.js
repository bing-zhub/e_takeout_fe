import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

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
    children: [{
      path: 'dashboard',
      name: '仪表盘',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/product',
    component: Layout,
    redirect: 'list',
    name: '商品',
    meta: { title: '商品', icon: 'shopping' },
    children: [
      {
        path: 'list',
        name: '查看商品',
        component: () => import('@/views/manage/viewProduct'),
        meta: { title: '查看商品', icon: 'eye' }
      },
      {
        path: 'add',
        name: '添加商品',
        component: () => import('@/views/manage/addProduct'),
        meta: { title: '添加商品', icon: 'edit' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'view',
    name: '订单',
    meta: { title: '订单', icon: 'documentation' },
    children: [
      {
        path: 'list',
        name: '订单',
        component: () => import('@/views/manage/viewOrder'),
        meta: { title: '订单', icon: 'documentation' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/category',
    component: Layout,
    redirect: '/category',
    name: '类目',
    meta: { title: '类目', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'view',
        name: '类目管理',
        component: () => import('@/views/manage/category'),
        meta: { title: '类目管理', icon: 'form' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
