<template>
  <div class="Page ShopHome">
    <MainPage :HideMainTab="false" :MainTabActiveId="1">
      <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
        <div class="Content">
          <ul class="GoodsList">
            <li v-for="(item, index) in 15" :key="index">
              <GoodsListItem></GoodsListItem>
            </li>
          </ul>
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
const GoodsListItem = () => import('@/components/shop/GoodsListItem')
export default {
  name: 'index',
  components: {
    MainPage,
    PageRefresh,
    GoodsListItem
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
