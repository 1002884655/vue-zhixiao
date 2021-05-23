<template>
  <div class="Page">
    <MainPage @UserInfoChange="Init">
      <div class="PageContainer">
        <div class="Loading" v-if="OrderStatus === null">
          <span>发起支付中...</span>
          <div>
            <a>已支付</a>
          </div>
        </div>
        <div class="Status" v-if="OrderStatus === false">
          <i class="iconfont iconshibai"></i>
          <span>支付失败</span>
          <div>
            <a>重新支付</a>
          </div>
        </div>
        <div class="Status" v-else>
          <i class="iconfont iconchenggong success"></i>
          <span>支付成功</span>
          <div>
            <router-link :to="{name: 'orderDetail', query: {id: $route.query.id}}">完成</router-link>
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
      OrderStatus: this.$route.query.status || null
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
      ''
    ]),
    Init () {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
