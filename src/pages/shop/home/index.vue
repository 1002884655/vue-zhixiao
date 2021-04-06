<template>
  <div class="Page ShopHome">
    <MainPage :HideMainTab="false" :MainTabActiveId="1">
      <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
        <div class="Content">
          <ul class="GoodsList">
            <li v-for="(item, index) in GoodsList" :key="index">
              <GoodsListItem :data="item"></GoodsListItem>
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
const { mapState: mapGoodsState, mapActions: mapGoodsActions, mapMutations: mapGoodsMutations } = createNamespacedHelpers('goods')
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
      DataLock: false
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
    this.Init()
  },
  methods: {
    ...mapUserActions([
      ''
    ]),
    ...mapGoodsActions([
      'GetGoodsList'
    ]),
    ...mapGoodsMutations([
      'EmptyGoodsList'
    ]),
    Init () {
      this.ToGetPageList()
    },
    ToGetPageList (done = () => { }) {
      if (!this.DataLock) {
        this.DataLock = true
        this.GetGoodsList().then(() => {
          this.DataLock = false
          done()
        }).catch((res) => {
          this.$toast(res.data.message)
          this.DataLock = false
          done()
        })
      }
    },
    Refresh (done) {
      this.EmptyGoodsList()
      this.ToGetPageList(() => { done(true) })
    },
    Infinite (done) {
      done(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
