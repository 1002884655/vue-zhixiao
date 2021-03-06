
import Api from '@/util/Api'
import ToolClass from '@/util/PublicMethods'

export default {
  namespaced: true,
  state: {
    GoodsList: []
  },
  mutations: {
    UpdateGoodsList (state, data) {
      state.GoodsList = data.data.data.productList || []
    },
    EmptyGoodsList (state) {
      state.GoodsList = []
    }
  },
  actions: {
    CreatePay (context, payload) { // 创建支付
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.Goods.CreatePay, context, code: 1000, opt: payload })
      })
    },
    GetGoodsList (context, payload) { // 获取商品列表
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.Goods.GetGoodsList, context, code: 1000, opt: payload, commit: 'UpdateGoodsList' })
      })
    },
    CreateOrder (context, payload) { // 创建订单
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.Goods.CreateOrder, context, code: 1000, opt: payload })
      })
    },
    GetOrderDetail (context, payload) { // 获取订单详情
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.Goods.GetOrderDetail, context, code: 1000, urlParams: payload.urlParams })
      })
    },
    ConfirmReceipt (context, payload) { // 确认收货
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.Goods.ConfirmReceipt, context, code: 1000, opt: payload })
      })
    }
  }
}
