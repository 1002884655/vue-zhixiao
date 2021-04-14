<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer">
        <ul>
          <!-- <li class="flex-h">
            <span class="flex-item">我的银行账户</span>
            <span>123456789</span>
            <i class="iconfont iconjiantouright"></i>
          </li> -->
          <li class="flex-h" @click="Exit">
            <span class="flex-item">退出登录</span>
            <i class="iconfont iconjiantouright"></i>
          </li>
        </ul>
      </div>
    </MainPage>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Dialog } from 'vant'
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
    Exit () { // 退出登录
      Dialog.confirm({
        title: '提示',
        message: '确认退出登录？',
      }).then(() => {
        window.localStorage.removeItem('zhixiaotoken')
        this.$router.push({ name: 'login' })
      })
    },
    Init () {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
