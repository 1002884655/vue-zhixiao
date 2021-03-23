<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer flex-v">
        <router-link class="Address flex-h" :to="{ name: 'myAddress' }">
          <span>收货地址：</span>
          <span class="flex-item">请填写收货地址</span>
          <i class="iconfont iconjiantouright"></i>
        </router-link>
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
                <span>应付款：</span>
                <span>￥3000</span>
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
    ToPay () {
      this.$router.push({ name: 'orderDetail' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
