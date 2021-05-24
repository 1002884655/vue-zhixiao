<template>
  <div class="Page">
    <MainPage @UserInfoChange="Init">
      <div class="PageContainer flex-v">
        <router-link class="Address flex-h" :to="{ name: 'myAddress' }">
          <span>收货地址：</span>
          <span class="flex-item">{{UserInfo.proviceName === undefined || UserInfo.proviceName === '' || UserInfo.proviceName === null ? `请填写收货地址` : `${UserInfo.proviceName} ${UserInfo.cityName} ${UserInfo.countyName} ${UserInfo.address}`}}</span>
          <i class="iconfont iconjiantouright"></i>
        </router-link>
        <div class="flex-item">
          <div>
            <div class="Content">

              <!-- 商品列表 -->
              <ul class="GoodsList">
                <li class="flex-h">
                  <div class="Img">
                    <img :src="CurrentGoodsInfo.pictureList && CurrentGoodsInfo.pictureList.length ? `http://192.168.31.72:8080${CurrentGoodsInfo.pictureList[0].url}` : null" class="centerLabel cover">
                  </div>
                  <div class="flex-item">
                    <span>{{CurrentGoodsInfo.productName}}</span>
                  </div>
                  <div class="More">
                    <span>￥{{CurrentGoodsInfo.price}}</span>
                    <div class="flex-h">
                      <a @click="GoodsCounts = GoodsCounts > 1 ? GoodsCounts - 1 : 1"></a>
                      <span class="flex-item">{{GoodsCounts}}</span>
                      <a @click="GoodsCounts++"></a>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- 总价 -->
              <div class="TotalPrice">
                <span>应付款：</span>
                <span>￥{{CurrentGoodsInfo.price ? GoodsCounts * CurrentGoodsInfo.price : 0}}</span>
              </div>

            </div>
          </div>
        </div>
        <div class="Bottom flex-h">
          <a class="flex-item active" @click="ToPay">去付款</a>
        </div>
      </div>
    </MainPage>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const { mapState: mapGoodsState, mapActions: mapGoodsActions } = createNamespacedHelpers('goods')
const MainPage = () => import('@/components/common/MainPage')
export default {
  name: 'index',
  components: {
    MainPage
  },
  data: () => {
    return {
      DataLock: false,
      CurrentGoodsInfo: {},
      GoodsCounts: 1
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    }),
    ...mapGoodsState({
      GoodsList: x => x.GoodsList
    })
  },
  created () {
  },
  methods: {
    ...mapUserActions([
      ''
    ]),
    ...mapGoodsActions([
      'GetGoodsList',
      'CreateOrder',
      'CreatePay'
    ]),
    Init () {
      if (this.GoodsList.length) {
        this.GoodsList.map((item) => {
          if (item.id - 0 === this.$route.query.id - 0) {
            this.CurrentGoodsInfo = { ...item }
          }
        })
      } else {
        this.GetGoodsList().then(() => {
          this.GoodsList.map((item) => {
            if (item.id - 0 === this.$route.query.id - 0) {
              this.CurrentGoodsInfo = { ...item }
            }
          })
        }).catch((res) => {
          this.$toast(res.data.message)
        })
      }
    },
    ToPay () {
      if (!this.DataLock) {
        this.DataLock = true
        this.CreateOrder({ data: { productId: this.CurrentGoodsInfo.id, num: this.GoodsCounts } }).then((res) => {
          this.DataLock = false
          // this.$router.push({ name: 'orderDetail', query: { id: res.data.data.id } })
          this.CreatePay({ data: { orderId: res.data.data.id } }).then((res) => {
            window.localStorage.submitorderid = res.data.data.id
            window.location.href = res.data.data
          })
        }).catch((res) => {
          this.$toast(res.data.message)
          this.DataLock = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
