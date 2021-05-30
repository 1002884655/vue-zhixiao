<template>
  <div class="Page">
    <MainPage>
      <SwiperTab :TabArr="TabArr" :ShowLength="3" @Change="TabChange">

        <!-- 综合 -->
        <div class="TabContent" slot="TabSwiperSlot-1">
          <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
            <div class="Content">
              <div v-for="(item, index) in PageList1" :key="index" class="TransList">
                <div class="flex-h">
                  <span class="flex-item">{{item.type === 'expend' ? '支出' : '收入'}}</span>
                  <span :class="{'active': item.type !== 'expend'}">{{item.type === 'expend' ? '-' : ''}}￥{{Math.abs(item.amount)}}</span>
                </div>
                <span class="Time">{{item.createdTime}}</span>
              </div>
            </div>
          </PageRefresh>
        </div>

        <!-- 收入 -->
        <div class="TabContent" slot="TabSwiperSlot-2">
          <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
            <div class="Content">
              <div v-for="(item, index) in PageList2" :key="index" class="TransList">
                <div class="flex-h">
                  <span class="flex-item">{{item.type === 'expend' ? '支出' : '收入'}}</span>
                  <span :class="{'active': item.type !== 'expend'}">{{item.type === 'expend' ? '-' : ''}}￥{{Math.abs(item.amount)}}</span>
                </div>
                <span class="Time">{{item.createdTime}}</span>
              </div>
            </div>
          </PageRefresh>
        </div>

        <!-- 支出 -->
        <div class="TabContent" slot="TabSwiperSlot-3">
          <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
            <div class="Content">
              <div v-for="(item, index) in PageList3" :key="index" class="TransList">
                <div class="flex-h">
                  <span class="flex-item">{{item.type === 'expend' ? '支出' : '收入'}}</span>
                  <span :class="{'active': item.type !== 'expend'}">{{item.type === 'expend' ? '-' : ''}}￥{{Math.abs(item.amount)}}</span>
                </div>
                <span class="Time">{{item.createdTime}}</span>
              </div>
            </div>
          </PageRefresh>
        </div>

      </SwiperTab>
    </MainPage>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const MainPage = () => import('@/components/common/MainPage')
const SwiperTab = () => import('@/components/common/SwiperTab')
const PageRefresh = () => import('@/components/common/PageRefresh')
export default {
  name: 'index',
  components: {
    MainPage,
    SwiperTab,
    PageRefresh
  },
  data: () => {
    return {
      PageData1: {
        pageSize: 10,
        pageNum: 1
      },
      HasNextPage1: true,
      PageData2: {
        pageSize: 10,
        pageNum: 1
      },
      HasNextPage2: true,
      PageData3: {
        pageSize: 10,
        pageNum: 1
      },
      PageList1: [],
      PageList2: [],
      PageList3: [],
      HasNextPage3: true,
      CurrentTabId: 1,
      DataLock: false,
      TabArr: [
        { name: '综合', id: 1 },
        { name: '收入', id: 2 },
        { name: '支出', id: 3 }
      ]
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.Init()
    })
  },
  methods: {
    ...mapUserActions([
      'GetUserAccountRecords'
    ]),
    TabChange (e) {
      this.CurrentTabId = e.id
      let List = []
      if (this.CurrentTabId === 1) {
        List = this.PageList1
      } else if (this.CurrentTabId === 2) {
        List = this.PageList2
      } else if (this.CurrentTabId === 3) {
        List = this.PageList3
      }
      if (!List.length) {
        this.Init()
      }
    },
    Init (done = () => { }) {
      if (!this.DataLock) {
        this.DataLock = true
        let PageData = null
        let HasNextPage = false
        if (this.CurrentTabId === 1) {
          PageData = { ...this.PageData1 }
          HasNextPage = this.HasNextPage1
        } else if (this.CurrentTabId === 2) {
          PageData = { ...this.PageData2 }
          HasNextPage = this.HasNextPage2
        } else if (this.CurrentTabId === 3) {
          PageData = { ...this.PageData3 }
          HasNextPage = this.HasNextPage3
        }
        if (HasNextPage) {
          this.GetUserAccountRecords({ params: { ...PageData, type: this.CurrentTabId === 1 ? '' : this.CurrentTabId === 2 ? 'income' : 'expend' } }).then((res) => {
            if (this.CurrentTabId === 1) {
              this.PageList1 = res.data.data || []
            } else if (this.CurrentTabId === 2) {
              this.PageList2 = res.data.data || []
            } else if (this.CurrentTabId === 3) {
              this.PageList3 = res.data.data || []
            }
            this.DataLock = false
            done()
          }).catch(() => {
            this.DataLock = false
            done()
          })
        } else {
          this.DataLock = false
          done()
        }
      } else {
        done()
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
