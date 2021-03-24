
import Api from '@/util/Api'
import ToolClass from '@/util/PublicMethods'

export default {
  namespaced: true,
  state: {
    UserInfo: null
  },
  mutations: {
    UpdateUserInfo (state, data) {
      state.UserInfo = { ...state.UserInfo, ...data.data }
    }
  },
  actions: {
    Login (context, payload) { // 登录
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.Login, context, code: 0, opt: payload })
      })
    },
    GetMsgCode (context, payload) { // 获取短信验证码
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetMsgCode, context, code: 0, opt: payload })
      })
    },
    GetAreaList (context, payload) { // 获取行政区域列表
      return new Promise((success, error) => {
        ToolClass.Axios({ success, error, api: Api.User.GetAreaList, context, code: 0, opt: payload })
      })
    }
  }
}
