<template>
  <div class="Page">
    <MainPage @UserInfoChange="Init">
      <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
        <div class="Content">
          <div v-for="(item, index) in PageList" :key="index" class="OrderList">
            <div class="Top flex-h">
              <span class="flex-item">{{item.orderId}}</span>
              <span>{{ToolClass.DateFormatYear(item.createOrderTime)}}</span>
            </div>
            <router-link class="GoodsList flex-h" :to="{ name: 'orderDetail', query: { id: item.orderId } }">
              <div class="Img">
                <img :src="null" class="centerLabel cover">
              </div>
              <div class="flex-item flex-v">
                <div class="flex-item flex-h">
                  <span class="flex-item">{{item.productName}}</span>
                  <div>
                    <span>￥{{item.productPrice}}</span>
                    <span>x{{item.num}}</span>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="Status">
              <span>实付款：<em>￥{{Math.abs(item.amount)}}</em></span>
              <a class="Btn" v-if="item.status - 0 === 2">确认收货</a>
              <span class="Text" v-if="item.status - 0 === -1">支付失败</span>
              <span class="Text" v-if="item.status - 0 === 0">待支付</span>
              <span class="Text" v-if="item.status - 0 === 1">待发货</span>
              <span class="Text" v-if="item.status - 0 === 3">已完成</span>
            </div>
          </div>
        </div>
      </PageRefresh>
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
      'GetMyOrderList'
    ]),
    Init (done = () => { }) {
      this.PageData.pageNum = 1
      this.PageList = []
      this.ToGetPageList(done)
    },
    ToGetPageList (done = () => { }) {
      if (!this.DataLock) {
        this.DataLock = true
        this.GetMyOrderList({ params: { ...this.PageData } }).then((res) => {
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
      if (this.HasNextPage) {
        this.PageData.pageNum += 1
        this.ToGetPageList(done)
      } else {
        done()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
