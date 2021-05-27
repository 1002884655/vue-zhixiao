import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ToolClass from './util/PublicMethods'
import './assets/css/reset.scss'
import './assets/css/iconfont.css'
import VueScroller from 'vue-scroller'
import VueClipboard from 'vue-clipboard2'
import { Toast } from 'vant'

Vue.use(VueScroller, Toast)
Vue.use(VueClipboard)
Vue.prototype.ToolClass = ToolClass
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
