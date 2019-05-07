import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Sellers from '@/components/sellers/sellers'
import Check from '@/components/check/check.vue'
import OrderList from '@/components/order/order.vue'
import OrderDetail from '@/components/order/detail.vue'

Vue.use(Router)

export default new Router({
  // 点击后的样式 别名
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: Sellers
    }, {
      path: '/check',
      name: 'check',
      component: Check
    }, {
      path: '/order',
      component: OrderList
    }, {
      path: '/order/:orderId',
      component: OrderDetail
    }
  ]
})
