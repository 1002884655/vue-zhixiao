<template>
  <div class="Page">
    <MainPage>
      <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
        <div class="Content">
          <div v-for="(item, index) in 10" :key="index" class="OrderList">
            <div class="Top flex-h">
              <span class="flex-item">NO.123456789</span>
              <span>2020-08-08 08:08:08</span>
            </div>
            <router-link v-for="(subItem, subIndex) in 3" :key="subIndex" class="GoodsList flex-h" :to="{ name: 'orderDetail' }">
              <div class="Img">
                <img :src="null" class="centerLabel cover">
              </div>
              <div class="flex-item flex-v">
                <div class="flex-item flex-h">
                  <span class="flex-item">商品名称</span>
                  <div>
                    <span>￥3000</span>
                    <span>x1</span>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="Status">
              <span>实付款：<em>￥3000</em></span>
              <a class="Btn">确认收货</a>
              <span class="Text">已完成</span>
            </div>
          </div>
        </div>
      </PageRefresh>
    </MainPage>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const MainPage = () => import('@/components/common/MainPage')
const PageRefresh = () => import('@/components/common/PageRefresh')
export default {
  name: 'index',
  components: {
    MainPage,
    PageRefresh
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
