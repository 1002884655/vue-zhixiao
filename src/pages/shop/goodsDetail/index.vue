<template>
  <div class="Page">
    <MainPage @UserInfoChange="Init">
      <div class="GoodsDetailContainer flex-v">
        <div class="flex-item">
          <div>
            <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
              <div class="Content">

                <!-- banner -->
                <div class="BannerSwiper">
                  <div>
                    <swiper :options="SwiperOptions">
                      <swiper-slide class="SwiperItem" v-for="(item, index) in CurrentGoodsInfo.pictureList" :key="index">
                        <div class="BannerItem">
                          <img :src="`https://api.nmnsq.com${item.url}`" class="centerLabel cover">
                        </div>
                      </swiper-slide>
                    </swiper>
                    <div class="SwiperPoints"></div>
                  </div>
                </div>

                <!-- title -->
                <div class="Title flex-h">
                  <span class="flex-item">{{CurrentGoodsInfo.productName}}</span>
                </div>

                <!-- 详情 -->
                <div class="Detail">
                  <span class="Text">商品详情</span>
                  <img :src="null" width="100%">
                  <div class="RichText" v-html="CurrentGoodsInfo.productDesc"></div>
                </div>

              </div>
            </PageRefresh>
          </div>
        </div>
        <div class="Bottom flex-h">
          <div class="flex-item">
            <span>￥{{CurrentGoodsInfo.priceVal}}</span>
          </div>
          <a class="Btn active" @click="ToBuy">立即购买</a>
        </div>
      </div>
    </MainPage>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const { mapState: mapGoodsState, mapActions: mapGoodsActions } = createNamespacedHelpers('goods')
const MainPage = () => import('@/components/common/MainPage')
const PageRefresh = () => import('@/components/common/PageRefresh')
export default {
  name: 'index',
  components: {
    PageRefresh,
    MainPage,
    swiper,
    swiperSlide
  },
  data: () => {
    return {
      DataLock: false,
      CurrentGoodsInfo: {},
      SwiperOptions: {
        autoplay: true,
        pagination: {
          el: '.SwiperPoints'
        }
      }
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    }),
    ...mapGoodsState({
      GoodsList: x => x.GoodsList
    })
  },
  created () {
  },
  methods: {
    ...mapUserActions([
      ''
    ]),
    ...mapGoodsActions([
      'GetGoodsList',
      'CreateOrder'
    ]),
    Init () {
      if (this.GoodsList.length) {
        this.GoodsList.map((item) => {
          if (item.id === this.$route.query.id) {
            this.CurrentGoodsInfo = { ...item }
          }
        })
      } else {
        this.GetGoodsList().then(() => {
          this.GoodsList.map((item) => {
            if (item.id === this.$route.query.id) {
              this.CurrentGoodsInfo = { ...item }
            }
          })
        }).catch((res) => {
          this.$toast(res.data.message)
        })
      }
    },
    IsWxClient () {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true
      }
      return false
    },
    ToBuy () {
      if (this.IsWxClient()) {
        this.$router.push({ name: 'submitOrder', query: { id: this.CurrentGoodsInfo.id } })
      } else {
        this.$toast('请在微信内打开此页面')
      }
    },
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
