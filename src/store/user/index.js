
import Api from '@/util/Api'
import ToolClass from '@/util/PublicMethods'

export default {
  namespaced: true,
  state: {
    UserInfo: {}
  },
  mutations: {
    UpdateUserInfo (state, data) {
      state.UserInfo = { ...state.UserInfo, ...data.data.data }
    }
  },
  actions: {
    Login (context, payload) { // 登录
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.Login, context, code: 1000, opt: payload })
      })
    },
    GetOpenId (context, payload) { // 获取openid
      console.log(111)
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetOpenId, context, code: 1000, opt: payload })
      })
    },
    GetMsgCode (context, payload) { // 获取短信验证码
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetMsgCode, context, code: 1000, opt: payload })
      })
    },
    GetUserInfo (context, payload) { // 获取用户信息
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetUserInfo, context, code: 1000, opt: payload, commit: 'UpdateUserInfo' })
      })
    },
    GetAreaList (context, payload) { // 获取行政区域列表
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetAreaList, context, code: 1000, opt: payload })
      })
    },
    SaveMyAddress (context, payload) { // 保存我的收货地址
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.SaveMyAddress, context, code: 1000, opt: payload })
      })
    },
    GetMyOrderList (context, payload) { // 获取我的订单列表
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetMyOrderList, context, code: 1000, opt: payload })
      })
    },
    GetUserTransInfo (context, payload) { // 获取用户交易数据
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetUserTransInfo, context, code: 1000, opt: payload })
      })
    },
    GetUserAccountRecords (context, payload) { // 获取用户交易流水
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetUserAccountRecords, context, code: 1000, opt: payload })
      })
    },
    GetMyRecommedUsers (context, payload) { // 获取我推荐的人
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetMyRecommedUsers, context, code: 1000, opt: payload })
      })
    },
    GetUserIncomeData (context, payload) { // 获取用户收入数据
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetUserIncomeData, context, code: 1000, opt: payload })
      })
    }
  }
}
