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
                <input type="number" placeholder="请输入手机号" v-model="Form.phone">
              </div>
            </div>
            <div class="flex-h Line">
              <i class="iconfont iconyanzhengma"></i>
              <div class="flex-item">
                <input type="password" placeholder="请输入验证码" v-model="Form.smsCode">
              </div>
              <a @click="ToGetMsgCode" v-if="CodeCounts === 60">获取验证码</a>
              <span v-else>{{CodeCounts > 9 ? CodeCounts : `0${CodeCounts}`}}s</span>
            </div>
            <a @click="ToLogin" :class="{'active': Form.phone !== '' && Form.smsCode !== '' && !DataLock}">{{DataLock ? '正在登录...' : '登录'}}</a>
            <span>还没有账号？<a @click="IsReg = true; Form.smsCode = ''">去注册</a></span>
          </div>

          <!-- 注册 -->
          <div class="Form" v-else>
            <div class="flex-h Line">
              <i class="iconfont iconzhanghao"></i>
              <div class="flex-item">
                <input type="number" placeholder="请输入手机号" v-model="Form.phone">
              </div>
            </div>
            <div class="flex-h Line">
              <i class="iconfont iconyanzhengma"></i>
              <div class="flex-item">
                <input type="text" placeholder="请输入验证码" v-model="Form.smsCode">
              </div>
              <a @click="ToGetMsgCode" v-if="CodeCounts === 60">获取验证码</a>
              <span v-else>{{CodeCounts > 9 ? CodeCounts : `0${CodeCounts}`}}s</span>
            </div>
            <div class="flex-h Line">
              <i class="iconfont iconyaoqingma"></i>
              <div class="flex-item">
                <input type="text" placeholder="请输入邀请码" v-model="Form.recommendCode">
              </div>
            </div>
            <a @click="ToReg" :class="{'active': Form.phone !== '' && Form.smsCode !== '' && !DataLock}">{{DataLock ? '正在提交数据...' : '注册'}}</a>
            <span>已有账号？<a @click="IsReg = false; Form.smsCode = ''">去登陆</a></span>
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
      IsReg: false,
      CodeTimer: null,
      CodeCounts: 60,
      DataLock: false,
      Form: {
        phone: '',
        smsCode: '',
        recommendCode: null
      }
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  created () {
    this.Init()
  },
  methods: {
    ...mapUserActions([
      'Login',
      'GetMsgCode'
    ]),
    Init () {
    },
    ToGetMsgCode () { // 获取验证码
      if (this.CodeCounts === 60) {
        window.clearInterval(this.CodeTimer)
        this.CodeCounts = 59
        this.GetMsgCode({ data: { phone: this.Form.phone } }).then(() => {
          this.$toast('验证码已发送')
          this.CodeTimer = window.setInterval(() => {
            if (this.CodeCounts >= 0) {
              this.CodeCounts--
            } else {
              window.clearInterval(this.CodeTimer)
              this.CodeCounts = 60
            }
          }, 1000)
        }).catch((res) => {
          this.CodeCounts = 60
          this.$toast(res.data.message)
        })
      }
    },
    ToLogin () { // 登录
      if (this.Form.phone === '') {
        this.$toast('请输入手机号')
        return false
      }
      if (this.Form.smsCode === '') {
        this.$toast('请输入验证码')
        return false
      }
      if (!this.DataLock) {
        this.DataLock = true
        this.Login({ data: { phone: this.Form.phone, smsCode: this.Form.smsCode } }).then((res) => {
          this.$toast('登录成功')
          window.localStorage.zhixiaotoken = res.data.data.token
          this.DataLock = false
          this.$router.push({ name: 'shopHome' })
        }).catch((res) => {
          this.$toast(res.data.message)
          this.DataLock = false
        })
      }
    },
    ToReg () { // 注册
      if (this.Form.phone === '') {
        this.$toast('请输入手机号')
        return false
      }
      if (this.Form.smsCode === '') {
        this.$toast('请输入验证码')
        return false
      }
      if (this.Form.recommendCode === null) {
        this.$toast('请输入邀请码')
        return false
      }
      if (!this.DataLock) {
        this.DataLock = true
        this.Login({ data: { ...this.Form } }).then(() => {
          this.DataLock = false
        }).catch((res) => {
          this.$toast(res.data.message)
          this.DataLock = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
