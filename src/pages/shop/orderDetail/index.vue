<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer flex-v">
        <div class="Address flex-h">
          <span>收货地址：</span>
          <span class="flex-item">请填写收货地址</span>
        </div>
        <div class="flex-item">
          <div>
            <div class="Content">

              <!-- 商品列表 -->
              <ul class="GoodsList">
                <li v-for="(item, index) in 3" :key="index" class="flex-h">
                  <div class="Img">
                    <img :src="null" class="centerLabel cover">
                  </div>
                  <div class="flex-item">
                    <span>商品名称</span>
                  </div>
                  <div class="More">
                    <span>￥3000</span>
                    <span>x1</span>
                  </div>
                </li>
              </ul>

              <!-- 总价 -->
              <div class="TotalPrice">
                <span>实付款：</span>
                <span>￥3000</span>
              </div>

              <!-- 订单信息 -->
              <div class="OrderInfo">
                <div class="flex-h">
                  <span>下单时间：</span>
                  <span class="flex-item">2020-08-08 08:08:08</span>
                </div>
                <div class="flex-h">
                  <span>订单编号：</span>
                  <span class="flex-item">123456789</span>
                </div>
                <div class="flex-h">
                  <span>快递单号：</span>
                  <span class="flex-item">123456789</span>
                </div>
                <div class="flex-h">
                  <span>订单状态：</span>
                  <span class="flex-item">未完成/已完成</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="Bottom flex-h">
          <a class="flex-item active">确认收货</a>
        </div>
      </div>
    </MainPage>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const MainPage = () => import('@/components/common/MainPage')
export default {
  name: 'index',
  components: {
    MainPage
  },
  data: () => {
    return {
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
    Refresh (done) {
      window.setTimeout(() => {
        done(true)
      }, 1000)
    },
    Infinite (done) {
      window.setTimeout(() => {
        done(true)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
