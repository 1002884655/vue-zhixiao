/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import { mapState, mapMutations } from 'vuex'

// const VuexState = { ...mapState({ MainTitle: x => x.MainTitle }) }
// const VuexMutations = { ...mapMutations(['EditMainTitle']) }

// console.log(VuexMutations.EditMainTitle)

Vue.use(VueRouter)

let router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/', // 首页
      name: 'index',
      redirect: '/shop',
      component: resolve => (require(['@/pages/index'], resolve)),
      children: [
        {
          path: '/shop', // 商城
          name: 'shop',
          redirect: '/shop/home',
          component: resolve => (require(['@/pages/shop/index'], resolve)),
          children: [
            {
              path: '/shop/home', // 商城-主页
              name: 'shopHome',
              meta: {
                title: '商城-主页'
              },
              component: resolve => (require(['@/pages/shop/home/index'], resolve)),
              children: []
            },
            {
              path: '/shop/goodsDetail', // 商品详情
              name: 'goodsDetail',
              meta: {
                title: '商品详情'
              },
              component: resolve => (require(['@/pages/shop/goodsDetail/index'], resolve)),
              children: []
            },
            {
              path: '/shop/submitOrder', // 提交订单
              name: 'submitOrder',
              meta: {
                title: '提交订单'
              },
              component: resolve => (require(['@/pages/shop/submitOrder/index'], resolve)),
              children: []
            },
            {
              path: '/shop/orderStatus', // 订单支付状态
              name: 'orderStatus',
              meta: {
                title: '支付状态'
              },
              component: resolve => (require(['@/pages/shop/orderStatus/index'], resolve)),
              children: []
            },
            {
              path: '/shop/orderDetail', // 订单详情
              name: 'orderDetail',
              meta: {
                title: '订单详情'
              },
              component: resolve => (require(['@/pages/shop/orderDetail/index'], resolve)),
              children: []
            }
          ]
        },
        {
          path: '/mine', // 我的
          name: 'mine',
          component: resolve => (require(['@/pages/mine'], resolve)),
          children: [
            {
              path: '/mine/home', // 我的-主页
              name: 'mineHome',
              meta: {
                title: '我的'
              },
              component: resolve => (require(['@/pages/mine/home'], resolve)),
              children: []
            },
            {
              path: '/mine/myAddress', // 我的收货地址
              name: 'myAddress',
              meta: {
                title: '我的收货地址'
              },
              component: resolve => (require(['@/pages/mine/myAddress'], resolve)),
              children: []
            },
            {
              path: '/mine/myOrderList', // 我的订单列表
              name: 'myOrderList',
              meta: {
                title: '我的订单'
              },
              component: resolve => (require(['@/pages/mine/myOrderList'], resolve)),
              children: []
            },
            {
              path: '/mine/myRecommenedCode', // 我的推荐码
              name: 'myRecommenedCode',
              meta: {
                title: '我的推荐码'
              },
              component: resolve => (require(['@/pages/mine/myRecommenedCode'], resolve)),
              children: []
            },
            {
              path: '/mine/myRecommenedUsers', // 我推荐的人
              name: 'myRecommenedUsers',
              meta: {
                title: '我推荐的人'
              },
              component: resolve => (require(['@/pages/mine/myRecommenedUsers'], resolve)),
              children: []
            },
            {
              path: '/mine/myTransactionList', // 我的交易流水
              name: 'myTransactionList',
              meta: {
                title: '我的交易流水'
              },
              component: resolve => (require(['@/pages/mine/myTransactionList'], resolve)),
              children: []
            },
            {
              path: '/mine/setting', // 设置
              name: 'setting',
              meta: {
                title: '设置'
              },
              component: resolve => (require(['@/pages/mine/setting'], resolve)),
              children: []
            }
          ]
        },
        {
          path: '/login', // 登录
          name: 'login',
          meta: {
            title: '登录/注册'
          },
          component: resolve => (require(['@/pages/login'], resolve))
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //   console.log(to.meta.title, VuexState.MainTitle, VuexMutations)
  // }
  next()
})

export default router