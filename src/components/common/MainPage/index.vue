<template>
  <div class="components MainPage flex-v">
    <div class="MainTop" v-if="!HideMainHeader">
      <a class="iconfont iconjiantouleft MainTopBack" v-if="HideMainTab" @click="$router.go(-1)"></a>
      <span class="Title">{{Title}}</span>
    </div>
    <div class="MainContent flex-item">
      <slot></slot>
    </div>
    <div class="MainBottom flex-h" v-if="!HideMainTab">
      <div class="flex-item MainBottomTabItem" v-for="(item, index) in MainTabArr" :key="index">
        <router-link :to="{ name: item.routerName }">
          <i class="iconfont" v-if="item.icon !== undefined" :class="[MainTabActiveId === item.id ? `${item.icon} active` : item.icon]" :style="{color: MainTabActiveId === item.id ? MainTabActiveColor : MainTabDefaultColor}"></i><br v-if="item.icon !== undefined">
          <img v-if="item.img !== undefined" :src="[MainTabActiveId === item.id ? item.activeImg : item.img]" alt=""><br v-if="item.img !== undefined">
          <span :style="{color: MainTabActiveId === item.id ? MainTabActiveColor : MainTabDefaultColor}">{{item.name}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MainPage',
  props: {
    HideMainHeader: { // 隐藏头部
      default: false,
      type: Boolean
    },
    HideMainTab: { // 隐藏页底tab
      default: true,
      type: Boolean
    },
    MainTabActiveId: { // 页底tab选中id
      default: null,
      type: Number
    }
  },
  data () {
    return {
      Title: ''
    }
  },
  computed: {
    ...mapState({
      MainTabDefaultColor: x => x.MainTabDefaultColor, // 页底tab默认色值
      MainTabActiveColor: x => x.MainTabActiveColor, // 页底tab选中色值
      MainTabArr: x => x.MainTabArr // 页底tab数据
    }),
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  created () {
    this.Title = this.$route.meta.title || ''
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapMutations([
      'EditHideMainTab',
      'EditMainTabActiveId'
    ]),
    ...mapUserActions([
      'Login'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
