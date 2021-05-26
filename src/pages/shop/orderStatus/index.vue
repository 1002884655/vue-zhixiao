<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer">
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
      Timer: null
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  created () {
  },
  mounted() {
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
          window.localStorage.submitorderid = this.$route.query.id
          // window.location.href = res.data.data
          this.CheckStatus()
          window.open(res.data.data, '_blank')
        })
      } else {
        this.CheckStatus()
      }
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
