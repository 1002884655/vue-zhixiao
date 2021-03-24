import UserApi from './user'
import GoodsApi from './goods'
const $api = {
  User: { ...UserApi },
  Goods: { ...GoodsApi }
}
export default $api