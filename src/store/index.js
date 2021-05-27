/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    MainTabActiveColor: '#db261d', // 页底tab选中色值
    MainTabDefaultColor: '#999', // 页底tab默认色值
    MainTabArr: [ // 页底tab数据
      { name: '商城', id: 1, icon: 'iconshangcheng', routerName: 'shopHome' },
      { name: '我的', id: 2, icon: 'iconwode', routerName: 'mineHome' }
    ]
  },
  mutations: {
  },
  actions: {
  }
})
export const modules = {
  user: () => require('./user/index').default,
  goods: () => require('./goods/index').default
}

Object.keys(modules).forEach((modKey) => {
  const modNS = modKey.split('/')
  const getMod = modules[modKey]
  store.registerModule(...modNS, getMod())
})

export default store
