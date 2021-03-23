<template>
  <div class="Page">
    <MainPage>
      <SwiperTab :TabArr="TabArr" :ShowLength="3" @Change="TabChange">

        <!-- 综合 -->
        <div class="TabContent" slot="TabSwiperSlot-1">
          <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
            <div class="Content">
              <div v-for="(item, index) in 15" :key="index" class="TransList">
                <div class="flex-h">
                  <span class="flex-item">商品名称</span>
                  <span class="active">-￥3000</span>
                </div>
                <span class="Time">2020-08-08 08:08:08</span>
              </div>
            </div>
          </PageRefresh>
        </div>

        <!-- 收入 -->
        <div class="TabContent" slot="TabSwiperSlot-2">
          <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
            <div class="Content">
              <div v-for="(item, index) in 15" :key="index" class="TransList">
                <div class="flex-h">
                  <span class="flex-item">商品名称</span>
                  <span class="active">-￥3000</span>
                </div>
                <span class="Time">2020-08-08 08:08:08</span>
              </div>
            </div>
          </PageRefresh>
        </div>

        <!-- 支出 -->
        <div class="TabContent" slot="TabSwiperSlot-3">
          <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
            <div class="Content">
              <div v-for="(item, index) in 15" :key="index" class="TransList">
                <div class="flex-h">
                  <span class="flex-item">商品名称</span>
                  <span class="active">-￥3000</span>
                </div>
                <span class="Time">2020-08-08 08:08:08</span>
              </div>
            </div>
          </PageRefresh>
        </div>

      </SwiperTab>
    </MainPage>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const MainPage = () => import('@/components/common/MainPage')
const SwiperTab = () => import('@/components/common/SwiperTab')
const PageRefresh = () => import('@/components/common/PageRefresh')
export default {
  name: 'index',
  components: {
    MainPage,
    SwiperTab,
    PageRefresh
  },
  data: () => {
    return {
      TabArr: [
        { name: '综合', id: 1 },
        { name: '收入', id: 2 },
        { name: '支出', id: 3 }
      ]
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
    TabChange (e) {
      console.log(e)
    },
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
