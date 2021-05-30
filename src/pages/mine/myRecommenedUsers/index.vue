<template>
  <div class="Page">
    <MainPage @UserInfoChange="Init">
      <div class="PageContainer flex-v">
        <div class="Top">
          <span>您已成功推荐</span>
          <span>{{PageList.length}}</span>
          <span>人</span>
        </div>
        <div class="flex-item">
          <div>
            <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
              <div class="Content">
                <div v-for="(item, index) in PageList" :key="index" class="UsersList flex-h">
                  <div class="Img">
                    <img :src="item.headUrl" class="centerLabel cover">
                  </div>
                  <div class="flex-item">
                    <span>{{item.nickname}} <em>{{item.mobile}}</em></span>
                    <span>推荐时间：{{item.createTime}}</span>
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
      DataLock: false,
      PageList: [],
      PageData: {
        pageSize: 10000,
        pageNum: 1
      },
      HasNextPage: true
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
      'GetMyRecommedUsers'
    ]),
    Init (done = () => { }) {
      this.PageData.pageNum = 1
      this.PageList = []
      this.ToGetPageList(done)
    },
    ToGetPageList (done = () => { }) {
      if (!this.DataLock) {
        this.DataLock = true
        this.GetMyRecommedUsers({ params: { ...this.PageData } }).then((res) => {
          let Arr = res.data.data || []
          Arr.map((item) => {
            this.PageList.push(item)
          })
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
      this.Init(done)
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
