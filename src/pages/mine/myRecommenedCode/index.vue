<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer">
        <div class="Tips">扫描二维码或者填写推荐码即可完成推荐</div>
        <div class="centerLabel">
          <div class="QrCode">
            <img :src="null" class="centerLabel contain">
          </div>
          <div class="Text">
            <span>您的推荐码是：</span>
            <span>123456</span>
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
