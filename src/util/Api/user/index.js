
// 用户相关

const prefix = process.env.NODE_ENV === 'production' ? '/api' : '/api'
const UserApi = {
  Login: { // 登录
    url: `${prefix}/app/user/login`,
    method: `post`
  },
  GetMsgCode: { // 获取短信验证码
    url: `${prefix}/app/user/getSMSCode`,
    method: `post`
  },
  GetUserInfo: { // 获取用户信息
    url: `${prefix}/app/user/myInfo`,
    method: `get`
  },
  GetAreaList: { // 获取行政区域列表
    url: `${prefix}/app/area/getAreaList`,
    method: `post`
  },
  SaveMyAddress: { // 保存我的收货地址
    url: `${prefix}/app/user/updateAddress`,
    method: `post`
  },
  GetMyOrderList: { // 获取我的订单列表
    url: `${prefix}/app/order/queryUserOrderList`,
    method: `get`
  },
  GetUserTransInfo: { // 获取用户交易数据
    url: `${prefix}/app/turnover/list`,
    method: `get`
  },
  GetUserAccountRecords: { // 获取用户交易流水
    url: `${prefix}/app/records/list`,
    method: `get`
  }
}
export default UserApi