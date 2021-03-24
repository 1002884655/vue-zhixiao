<template>
  <div class="Page">
    <MainPage>
      <div class="PageContainer flex-v">
        <div class="flex-item">
          <div>
            <div class="Content">
              <div class="flex-h">
                <span>姓名</span>
                <input type="text" class="flex-item">
              </div>
              <div class="flex-h">
                <span>手机号</span>
                <input type="number" class="flex-item">
              </div>
              <div class="flex-h" @click="ShowStatePicker = true">
                <span>省份</span>
                <span class="flex-item">{{CurrentStateItem.cName ? CurrentStateItem.cName : '请选择省份'}}</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <div class="flex-h" @click="ShowCityPicker = true" v-if="CityList.length">
                <span>城市</span>
                <span class="flex-item">{{CurrentCityItem.cName ? CurrentCityItem.cName : '请选择城市'}}</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <div class="flex-h" @click="ShowCountyPicker = true" v-if="CountyList.length">
                <span>区/县</span>
                <span class="flex-item">{{CurrentCountyItem.cName ? CurrentCountyItem.cName : '请选择区/县'}}</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <div class="flex-h">
                <span>邮编</span>
                <input type="number" class="flex-item">
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
        <van-popup v-model="ShowStatePicker" round position="bottom">
          <van-picker show-toolbar :columns="StateList" value-key="cName" @cancel="ShowStatePicker = false" @confirm="StateConfirm" />
        </van-popup>
        <van-popup v-model="ShowCityPicker" round position="bottom">
          <van-picker show-toolbar :columns="CityList" value-key="cName" @cancel="ShowCityPicker = false" @confirm="CityConfirm" />
        </van-popup>
        <van-popup v-model="ShowCountyPicker" round position="bottom">
          <van-picker show-toolbar :columns="CountyList" value-key="cName" @cancel="ShowCountyPicker = false" @confirm="CountyConfirm" />
        </van-popup>
      </div>
    </MainPage>
  </div>
</template>

<script>
import { Picker, Popup } from 'vant'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
const MainPage = () => import('@/components/common/MainPage')
export default {
  name: 'index',
  components: {
    MainPage,
    'van-picker': Picker,
    'van-popup': Popup

  },
  data: () => {
    return {
      CurrentStateItem: {},
      CurrentCityItem: {},
      CurrentCountyItem: {},
      ShowStatePicker: false,
      ShowCityPicker: false,
      ShowCountyPicker: false,
      StateList: [], // 省份列表
      CityList: [], // 城市列表
      CountyList: [] // 区县列表
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
      'GetAreaList'
    ]),
    Init () {
      this.GetAreaList({ data: { type: 0 } }).then((res) => {
        this.StateList = res.data.areaList || []
      })
    },
    StateConfirm (e) {
      this.ShowStatePicker = false
      if (e !== undefined && e.id !== this.CurrentStateItem.id) {
        this.CurrentStateItem = { ...e }
        this.CurrentCityItem = {}
        this.CityList = []
        this.CurrentCountyItem = {}
        this.CountyList = []
        this.GetAreaList({ data: { type: 1, id: e.id } }).then((res) => {
          this.CityList = res.data.areaList || []
        })
      }
    },
    CityConfirm (e) {
      this.ShowCityPicker = false
      if (e !== undefined && e.id !== this.CurrentCityItem.id) {
        this.CurrentCityItem = { ...e }
        this.CurrentCountyItem = {}
        this.CountyList = []
        this.GetAreaList({ data: { type: 2, id: e.id } }).then((res) => {
          this.CountyList = res.data.areaList || []
        })
      }
    },
    CountyConfirm (e) {
      this.ShowCountyPicker = false
      this.CurrentCountyItem = { ...e }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
