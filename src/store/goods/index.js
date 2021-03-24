
import Api from '@/util/Api'
import ToolClass from '@/util/PublicMethods'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    GetGoodsList (context, payload) { // 获取商品列表
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.Goods.GetGoodsList, context, code: 0, opt: payload })
      })
    }
  }
}
