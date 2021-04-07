
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
    }
  }
}
