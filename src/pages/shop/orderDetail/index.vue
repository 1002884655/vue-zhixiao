<template>
  <div class="Page">
    <MainPage @UserInfoChange="Init">
      <div class="PageContainer flex-v">
        <div class="Address flex-h">
          <span>收货地址：</span>
          <span class="flex-item">{{OrderInfo.address}}</span>
        </div>
        <div class="flex-item">
          <div>
            <div class="Content">

              <!-- 商品列表 -->
              <ul class="GoodsList">
                <li class="flex-h">
                  <div class="Img">
                    <img :src="OrderInfo.productInfo ? `http://192.168.31.72:8080${OrderInfo.productInfo.pictureList[0].url}` : null" class="centerLabel cover">
                  </div>
                  <div class="flex-item">
                    <span>{{OrderInfo.productInfo ? OrderInfo.productInfo.productName : null}}</span>
                  </div>
                  <div class="More">
                    <span>￥{{OrderInfo.productInfo ? OrderInfo.productInfo.price : 0}}</span>
                    <span>x{{OrderInfo.num || 0}}</span>
                  </div>
                </li>
              </ul>

              <!-- 总价 -->
              <div class="TotalPrice">
                <span>实付款：</span>
                <span>￥{{Math.abs(OrderInfo.amount)}}</span>
              </div>

              <!-- 订单信息 -->
              <div class="OrderInfo">
                <div class="flex-h">
                  <span>下单时间：</span>
                  <span class="flex-item">{{ToolClass.DateFormatYear(OrderInfo.time)}}</span>
                </div>
                <div class="flex-h">
                  <span>订单编号：</span>
                  <span class="flex-item">{{$route.query.id}}</span>
                </div>
                <div class="flex-h">
                  <span>快递单号：</span>
                  <span class="flex-item">{{OrderInfo.expressNum}}</span>
                </div>
                <div class="flex-h">
                  <span>订单状态：</span>
                  <span class="flex-item">{{OrderInfo.status - 0 === 0 ? '待付款' : OrderInfo.status - 0 === 1 ? '待发货' : OrderInfo.status - 0 === 2 ? '已发货' : OrderInfo.status - 0 === 3 ? '已完成' : '支付失败'}}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="Bottom flex-h" v-if="OrderInfo.status - 0 === 0 || OrderInfo.status - 0 === 2">
          <a class="flex-item active">{{OrderInfo.status - 0 === 0 ? '去付款' : OrderInfo.status - 0 === 2 ? '确认收货' : ''}}</a>
        </div>
      </div>
    </MainPage>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const { mapActions: mapGoodsActions } = createNamespacedHelpers('goods')
const MainPage = () => import('@/components/common/MainPage')
export default {
  name: 'index',
  components: {
    MainPage
  },
  data: () => {
    return {
      OrderInfo: {}
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  created () {
  },
  methods: {
    ...mapUserActions([
      ''
    ]),
    ...mapGoodsActions([
      'GetOrderDetail'
    ]),
    Init () {
      this.GetOrderDetail({ urlParams: this.$route.query.id }).then((res) => {
        this.OrderInfo = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
