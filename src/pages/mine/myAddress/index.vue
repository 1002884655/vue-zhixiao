<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer flex-v">
        <div class="flex-item">
          <div>
            <div class="Content">
              <div class="flex-h">
                <span>省份</span>
                <span class="flex-item">请选择省份</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <div class="flex-h">
                <span>城市</span>
                <span class="flex-item">请选择城市</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <div class="flex-h">
                <span>区/县</span>
                <span class="flex-item">请选择区/县</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <span>详细地址（街道、门牌号）</span>
              <div class="Textarea">
                <textarea placeholder="请输入具体地址"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="Bottom flex-h">
          <a class="flex-item active">确认修改</a>
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
