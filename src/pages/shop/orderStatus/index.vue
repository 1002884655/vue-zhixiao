<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer">
        <span>{{WxConfig.timestamp}}</span>
        <div class="Loading" v-if="OrderStatus === null">
          <span>发起支付中...</span>
          <!-- <div>
            <a>已支付</a>
          </div> -->
        </div>
        <div class="Status" v-if="OrderStatus === false">
          <i class="iconfont iconshibai"></i>
          <span>支付失败</span>
          <div>
            <router-link :to="{name: 'shop'}">返回首页</router-link>
          </div>
        </div>
        <div class="Status" v-if="OrderStatus === true">
          <i class="iconfont iconchenggong success"></i>
          <span>支付成功</span>
          <div>
            <router-link :to="{name: 'orderDetail', query: {id: OrderId}}">完成</router-link>
          </div>
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
      OrderStatus: null,
      OrderId: null,
      Timer: null,
      PayTimer: null,
      WxConfig: {}
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.Init()
    })
  },
  methods: {
    ...mapUserActions([
      ''
    ]),
    ...mapGoodsActions([
      'GetOrderDetail',
      'CreatePay'
    ]),
    Init () {
      if (this.$route.query.id !== window.localStorage.submitorderid) {
        this.CreatePay({ data: { orderId: this.$route.query.id } }).then((res) => {
          window.clearTimeout(this.PayTimer)
          this.PayTimer = window.setTimeout(() => {
            window.clearTimeout(this.PayTimer)
            window.localStorage.submitorderid = this.$route.query.id
            if (window.WeixinJSBridge) {
              window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
                appId: res.data.data.appid,
                timeStamp: `${res.data.data.timestamp}`,
                nonceStr: res.data.data.nonceStr,
                package: `prepay_id=${res.data.data.prepay_id}`,
                signType: 'RSA',
                paySign: res.data.data.signature
              }, (pRes) => {
                if (pRes.err_msg == 'get_brand_wcpay_request:ok') {
                  this.CheckStatus()
                } else {
                  this.OrderStatus = false
                }
              })
            }
            // wx.config({
            //   debug: true,
            //   appId: this.WxConfig.appid,
            //   timestamp: this.WxConfig.timestamp,
            //   nonceStr: this.WxConfig.nonceStr,
            //   signature: this.WxConfig.signature,
            //   jsApiList: ['chooseWXPay']
            // })
            // wx.chooseWXPay({  //此方法应放在调用后台统一下单接口成功后回调里面，接口返回  timeStamp，nonceStr，package，paySign等参数
            //   timestamp: this.WxConfig.timeStamp,
            //   nonceStr: this.WxConfig.nonceStr,
            //   package: this.WxConfig.prepay_id,
            //   signType: 'MD5',
            //   paySign: this.WxConfig.signature,
            //   appId: this.WxConfig.appid,  //此参数可不用
            //   success: (res) => {
            //     // 支付成功后的回调函数  
            //     if (res.errMsg === 'chooseWXPay:ok') {
            //       //支付成功  
            //       this.CheckStatus()
            //     }
            //   },
            //   cancel: () => {
            //     //支付取消  
            //     this.OrderStatus = false
            //   }
            // })
            this.CheckStatus()
          }, 1000)
        })
      } else {
        this.CheckStatus()
      }
    },
    IsWxClient () {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true
      }
      return false
    },
    CheckStatus () {
      window.clearTimeout(this.Timer)
      this.Timer = window.setTimeout(() => {
        this.GetOrderDetail({ urlParams: this.$route.query.id }).then((res) => {
          if (res.data.data.status - 0 === 1) {
            window.clearTimeout(this.Timer)
            this.OrderId = this.$route.query.id
            this.OrderStatus = res.data.data.status - 0 === 1
            window.localStorage.submitorderid = null
          } else {
            this.CheckStatus()
          }
        }).catch(() => {
          this.CheckStatus()
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
