<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer">
        <div class="Tips">扫描二维码或者填写推荐码即可完成推荐</div>
        <div class="centerLabel">
          <div class="QrCode" v-if="UserInfo.recommendCode">
            <vue-qrcode :value="UserInfo.recommendCode" :width="200" />
          </div>
          <div class="Text">
            <span>您的推荐码是：</span>
            <span>{{UserInfo.recommendCode}}</span>
          </div>
        </div>
      </div>
    </MainPage>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const MainPage = () => import('@/components/common/MainPage')
export default {
  name: 'index',
  components: {
    MainPage,
    'vue-qrcode': VueQrcode
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
