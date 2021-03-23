<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer flex-v">
        <div class="Top">
          <span>您已成功推荐</span>
          <span>20</span>
          <span>人</span>
        </div>
        <div class="flex-item">
          <div>
            <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
              <div class="Content">
                <div v-for="(item, index) in 15" :key="index" class="UsersList flex-h">
                  <div class="Img">
                    <img :src="null" class="centerLabel cover">
                  </div>
                  <div class="flex-item">
                    <span>用户昵称</span>
                    <span>推荐时间：2020-08-08 08:08:08</span>
                  </div>
                </div>
              </div>
            </PageRefresh>
          </div>
        </div>
      </div>
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
