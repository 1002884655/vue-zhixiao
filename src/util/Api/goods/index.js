
// 商品相关

const prefix = process.env.NODE_ENV === 'production' ? '/api' : '/api'
const GoodsApi = {
  GetGoodsList: { // 获取商品列表
    url: `${prefix}/app/product/getProductList`,
    method: `get`
  },
  CreateOrder: { // 创建订单
    url: `${prefix}/app/order/createOrder`,
    method: `post`
  }
}
export default GoodsApi