<template>
  <div class="Page">
    <MainPage :HideMainTab="false" :HideMainHeader="true" :MainTabActiveId="2" @UserInfoChange="UserInfoChange">
      <div class="Content flex-v">

        <!-- 顶部 -->
        <div class="Top">
          <div class="centerLabel">
            <div class="flex-h">
              <div class="UserIcon">
                <img :src="UserInfo.headUrl" class="centerLabel cover">
              </div>
              <router-link :to="{ name: 'login' }" v-if="!(UserInfo.id - 0)">登录/注册</router-link>
              <div class="flex-item" v-else>
                <span>{{UserInfo.nickname}}</span>
                <span>{{UserInfo.phone}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-item">
          <div>
            <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
              <div class="SubContent">
                <!-- 业绩信息 -->
                <div class="PerformanceInfo flex-h">
                  <div class="flex-item">
                    <span>22</span>
                    <span>已达成任务-单</span>
                  </div>
                  <div class="flex-item">
                    <span>22</span>
                    <span>已达成业绩-单</span>
                  </div>
                </div>

                <!-- 更多数据 -->
                <div class="MoreInfo">
                  <div class="flex-h">
                    <div class="flex-item">
                      <span>昨日收入：</span>
                      <span>200</span>
                      <span>元</span>
                    </div>
                    <div class="flex-item">
                      <span>近30日收入：</span>
                      <span>200</span>
                      <span>元</span>
                    </div>
                  </div>
                  <div class="flex-h">
                    <div class="flex-item">
                      <span>昨日完成任务：</span>
                      <span>200</span>
                      <span>单</span>
                    </div>
                    <div class="flex-item">
                      <span>昨日完成业绩：</span>
                      <span>200</span>
                      <span>单</span>
                    </div>
                  </div>
                  <div class="flex-h">
                    <div class="flex-item">
                      <span>今日完成任务：</span>
                      <span>200</span>
                      <span>单</span>
                    </div>
                    <div class="flex-item">
                      <span>今日完成业绩：</span>
                      <span>200</span>
                      <span>单</span>
                    </div>
                  </div>
                </div>

                <!-- 用户选项 -->
                <div class="UserMenu">
                  <router-link class="flex-h" :to="{ name: 'myOrderList' }">
                    <span class="flex-item">我的订单</span>
                    <i class="iconfont iconjiantouright"></i>
                  </router-link>
                  <router-link class="flex-h" :to="{ name: 'myTransactionList' }">
                    <span class="flex-item">交易流水</span>
                    <i class="iconfont iconjiantouright"></i>
                  </router-link>
                  <router-link class="flex-h" :to="{ name: 'myRecommenedCode' }">
                    <span class="flex-item">我的推荐码</span>
                    <i class="iconfont iconjiantouright"></i>
                  </router-link>
                  <router-link class="flex-h" :to="{ name: 'myRecommenedUsers' }">
                    <span class="flex-item">我推荐的人</span>
                    <i class="iconfont iconjiantouright"></i>
                  </router-link>
                  <router-link class="flex-h" :to="{ name: 'myAddress' }">
                    <span class="flex-item">我的收货地址</span>
                    <i class="iconfont iconjiantouright"></i>
                  </router-link>
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
      'GetUserInfo'
    ]),
    UserInfoChange () {
      if (!(this.UserInfo.id - 0)) {
        this.Init()
      }
    },
    Init (done = () => { }) {
      if (window.localStorage.zhixiaotoken !== undefined) {
        this.GetUserInfo().then(() => {
          done()
        }).catch(() => {
          done()
        })
      }
    },
    Refresh (done) {
      this.Init(done)
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
