
// 用户相关

const prefix = process.env.NODE_ENV === 'production' ? '' : ''
const UserApi = {
  Login: { // 登录
    url: `${prefix}/zhixiao/user/login`,
    method: `post`
  },
  GetMsgCode: { // 获取短信验证码
    url: `${prefix}/zhixiao/user/getSMSCode`,
    method: `post`
  },
  GetAreaList: { // 获取行政区域列表
    url: `${prefix}/zhixiao/area/getAreaList`,
    method: `post`
  },
  GetMyAddress: { // 获取我的收货地址
    url: `${prefix}/zhixiao/user/queryMyAddress`,
    method: `post`
  },
  SaveMyAddress: { // 保存我的收货地址
    url: `${prefix}/zhixiao/user/updateAddress`,
    method: `post`
  }
}
export default UserApi