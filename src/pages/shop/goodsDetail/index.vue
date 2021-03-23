<template>
  <div class="Page">
    <MainPage>
      <div class="GoodsDetailContainer flex-v">
        <div class="flex-item">
          <div>
            <PageRefresh @Refresh="Refresh" @Infinite="Infinite">
              <div class="Content">

                <!-- banner -->
                <div class="BannerSwiper">
                  <div>
                    <swiper :options="SwiperOptions">
                      <swiper-slide class="SwiperItem" v-for="(item, index) in 5" :key="index">
                        <div class="BannerItem">
                          <img :src="null" class="centerLabel cover">
                        </div>
                      </swiper-slide>
                    </swiper>
                    <div class="SwiperPoints"></div>
                  </div>
                </div>

                <!-- title -->
                <div class="Title flex-h">
                  <span class="flex-item">商品名称</span>
                </div>

                <!-- 详情 -->
                <div class="Detail">
                  <span class="Text">商品详情</span>
                  <img :src="null" width="100%">
                </div>

              </div>
            </PageRefresh>
          </div>
        </div>
        <div class="Bottom flex-h">
          <div class="flex-item">
            <span>￥3000</span>
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
    })
  },
  created () {
  },
  methods: {
    ...mapUserActions([
      ''
    ]),
    ToBuy () {
      this.$router.push({ name: 'submitOrder' })
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
