<template>
  <div class="Page">
    <MainPage @UserInfoChange="UserInfoChange">
      <div class="PageContainer flex-v">
        <div class="flex-item">
          <div>
            <div class="Content">
              <div class="flex-h">
                <span>姓名</span>
                <input type="text" class="flex-item" v-model="Form.nickName" placeholder="请输入姓名">
              </div>
              <div class="flex-h">
                <span>手机号</span>
                <input type="number" class="flex-item" v-model="Form.mobile" placeholder="请输入手机号">
              </div>
              <div class="flex-h" @click="ShowStatePicker = true">
                <span>省份</span>
                <span class="flex-item">{{CurrentStateItem.cname ? CurrentStateItem.cname : '请选择省份'}}</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <div class="flex-h" @click="ShowCityPicker = true">
                <span>城市</span>
                <span class="flex-item">{{CurrentCityItem.cname ? CurrentCityItem.cname : '请选择城市'}}</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <div class="flex-h" @click="ShowCountyPicker = true">
                <span>区/县</span>
                <span class="flex-item">{{CurrentCountyItem.cname ? CurrentCountyItem.cname : '请选择区/县'}}</span>
                <i class="iconfont iconjiantouright"></i>
              </div>
              <div class="flex-h">
                <span>邮编</span>
                <input type="number" class="flex-item" v-model="Form.postCode" placeholder="请输入邮编">
              </div>
              <span>详细地址（街道、门牌号）</span>
              <div class="Textarea">
                <textarea placeholder="请输入具体地址" v-model="Form.address"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="Bottom flex-h">
          <a class="flex-item" :class="{'active': !DataLock}" @click="Submit">确认修改</a>
        </div>
        <van-popup v-model="ShowStatePicker" round position="bottom">
          <van-picker show-toolbar :columns="StateList" value-key="cname" @cancel="ShowStatePicker = false" @confirm="StateConfirm" />
        </van-popup>
        <van-popup v-model="ShowCityPicker" round position="bottom">
          <van-picker show-toolbar :columns="CityList" value-key="cname" @cancel="ShowCityPicker = false" @confirm="CityConfirm" />
        </van-popup>
        <van-popup v-model="ShowCountyPicker" round position="bottom">
          <van-picker show-toolbar :columns="CountyList" value-key="cname" @cancel="ShowCountyPicker = false" @confirm="CountyConfirm" />
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
      Form: {
        address: '',
        nickName: '',
        mobile: '',
        postCode: '',
        proviceId: '',
        proviceName: '',
        cityId: '',
        cityName: '',
        countyId: '',
        countyName: ''
      },
      DataLock: false,
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
  },
  methods: {
    ...mapUserActions([
      'GetAreaList',
      'GetMyAddress',
      'SaveMyAddress'
    ]),
    UserInfoChange () {
      if (this.UserInfo.id - 0) {
        this.Init()
      }
    },
    Init () {
      this.GetMyAddress().then((res) => {
        for (let key in res.data) {
          if (key !== 'code' && key !== 'message') {
            this.Form[key] = res.data[key]
          }
        }
        this.AddressInit()
      }).catch(() => {
        this.AddressInit()
      })
    },
    AddressInit () {
      this.GetAreaList({ data: { type: 0 } }).then((stateRes) => {
        this.StateList = stateRes.data.data.areaList || []
        if (this.Form.proviceId !== '') {
          this.StateList.map((item) => {
            if (this.Form.proviceId - 0 === item.id - 0) {
              this.CurrentStateItem = { ...item }
            }
          })
          if (this.CurrentStateItem.cname) {
            this.GetAreaList({ data: { type: 1, id: this.CurrentStateItem.id } }).then((cityRes) => {
              this.CityList = cityRes.data.data.areaList || []
              console.log(cityRes.data.data)
              if (this.Form.cityId !== '') {
                this.CityList.map((item) => {
                  if (this.Form.cityId - 0 === item.id - 0) {
                    this.CurrentCityItem = { ...item }
                  }
                })
                if (this.CurrentCityItem.cname) {
                  this.GetAreaList({ data: { type: 2, id: this.CurrentCityItem.id } }).then((countyRes) => {
                    this.CountyList = countyRes.data.data.areaList || []
                    this.CountyList.map((item) => {
                      if (this.Form.countyId - 0 === item.id - 0) {
                        this.CurrentCountyItem = { ...item }
                      }
                    })
                  })
                }
              }
            })
          }
        }
      })
    },
    Submit () {
      if (!this.DataLock) {
        this.DataLock = true
        this.SaveMyAddress({ data: { ...this.Form } }).then(() => {
          this.$toast('修改成功')
          this.DataLock = false
        }).catch((res) => {
          this.$toast(res.data.message)
          this.DataLock = false
        })
      }
    },
    StateConfirm (e) {
      this.ShowStatePicker = false
      if (e !== undefined && e.id !== this.CurrentStateItem.id) {
        this.CurrentStateItem = { ...e }
        this.Form.proviceId = e.id
        this.Form.proviceName = e.cname
        this.CurrentCityItem = {}
        this.CityList = []
        this.CurrentCountyItem = {}
        this.CountyList = []
        this.GetAreaList({ data: { type: 1, id: e.id } }).then((res) => {
          this.CityList = res.data.data.areaList || []
        })
      }
    },
    CityConfirm (e) {
      this.ShowCityPicker = false
      if (e !== undefined && e.id !== this.CurrentCityItem.id) {
        this.CurrentCityItem = { ...e }
        this.Form.cityId = e.id
        this.Form.cityName = e.cname
        this.CurrentCountyItem = {}
        this.CountyList = []
        this.GetAreaList({ data: { type: 2, id: e.id } }).then((res) => {
          this.CountyList = res.data.data.areaList || []
        })
      }
    },
    CountyConfirm (e) {
      this.ShowCountyPicker = false
      this.CurrentCountyItem = { ...e }
      this.Form.countyId = e.id
      this.Form.countyName = e.cname
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
