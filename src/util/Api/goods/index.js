
// 商品相关

const prefix = process.env.NODE_ENV === 'production' ? '' : ''
const GoodsApi = {
  GetGoodsList: { // 获取商品列表
    url: `${prefix}/zhixiao/product/getProductList`,
    method: `post`
  }
}
export default GoodsApi