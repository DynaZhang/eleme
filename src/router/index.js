import Vue from 'vue'
import Router from 'vue-router'

import Goods from '@/pages/goods/goods'
import Ratings from '@/pages/ratings/ratings'
import Sellers from '@/pages/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
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
      path: '/seller',
      name: 'seller',
      component: Sellers
    }
  ]
})
