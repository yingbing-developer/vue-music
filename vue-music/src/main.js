import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick' // 解决移动端网页按钮点击300毫秒延迟
import VueLazyLoad from 'vue-lazyload' // 图片懒加载

import 'common/stylus/index.styl'

//移动端console调试
// import vConsole from 'vconsole'
// var vconsole = new vConsole()
// console.log('test')

fastclick.attach(document.body) // 将fastclick引用到body下面

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.gif')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
