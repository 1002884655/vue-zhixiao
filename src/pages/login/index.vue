<template>
  <div class="Page">
    <MainPage>
      <div class="Content">
        <div class="centerLabel">

          <!-- 登录 -->
          <div class="Form" v-if="!IsReg">
            <div class="flex-h Line">
              <i class="iconfont iconzhanghao"></i>
              <div class="flex-item">
                <input type="number" placeholder="请输入手机号">
              </div>
            </div>
            <div class="flex-h Line">
              <i class="iconfont iconmima"></i>
              <div class="flex-item">
                <input type="password" placeholder="请输入密码">
              </div>
            </div>
            <a>登录</a>
            <span>还没有账号？<a @click="IsReg = true">去注册</a></span>
          </div>

          <!-- 注册 -->
          <div class="Form" v-else>
            <div class="flex-h Line">
              <i class="iconfont iconzhanghao"></i>
              <div class="flex-item">
                <input type="number" placeholder="请输入手机号">
              </div>
            </div>
            <div class="flex-h Line">
              <i class="iconfont iconmima"></i>
              <div class="flex-item">
                <input type="password" placeholder="请输入密码">
              </div>
            </div>
            <div class="flex-h Line">
              <i class="iconfont iconmima"></i>
              <div class="flex-item">
                <input type="password" placeholder="请再次输入密码">
              </div>
            </div>
            <div class="flex-h Line">
              <i class="iconfont iconyanzhengma"></i>
              <div class="flex-item">
                <input type="text" placeholder="请输入验证码">
              </div>
              <a>获取验证码</a>
              <span>59s</span>
            </div>
            <div class="flex-h Line">
              <i class="iconfont iconyaoqingma"></i>
              <div class="flex-item">
                <input type="text" placeholder="请输入邀请码">
              </div>
            </div>
            <a class="active">注册</a>
            <span>已有账号？<a @click="IsReg = false">去登陆</a></span>
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
      IsReg: true,
      CodeTimer: null,
      CodeCounts: 60
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
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
