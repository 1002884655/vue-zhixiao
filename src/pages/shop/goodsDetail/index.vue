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
                          <img :src="`http://192.168.31.72:8080${item.url}`" class="centerLabel cover">
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
                  <pre>{{CurrentGoodsInfo.productDesc}}</pre>
                </div>

              </div>
            </PageRefresh>
          </div>
        </div>
        <div class="Bottom flex-h">
          <div class="flex-item">
            <span>￥{{(CurrentGoodsInfo.price / 100).toFixed(2)}}</span>
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
          if (item.id - 0 === this.$route.query.id - 0) {
            this.CurrentGoodsInfo = { ...item }
          }
        })
      } else {
        this.GetGoodsList().then(() => {
          this.GoodsList.map((item) => {
            if (item.id - 0 === this.$route.query.id - 0) {
              this.CurrentGoodsInfo = { ...item }
            }
          })
        }).catch((res) => {
          this.$toast(res.data.message)
        })
      }
    },
    ToBuy () {
      this.$router.push({ name: 'submitOrder', query: { id: this.CurrentGoodsInfo.id } })
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
