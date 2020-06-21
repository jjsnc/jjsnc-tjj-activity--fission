// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/js/common/rem'
import router from './router'
// import VueTouch from 'vue-touch'
import api from '@/api'
import tapConfig from '@/assets/js/common/tapCount'
import loading from '@/assets/js/common/loading'
import msgBox from '@/assets/js/common/msgBox'
import '@/assets/js/common/performance'
import { Lazyload  } from 'vant';
import 'vant/lib/index.css'

// Vue.use(VueTouch, {
//   name: 'v-touch'
// })
// VueTouch.config.swipe = {
//   threshold: 100 //手指左右滑动距离        
// }
// 懒加载
Vue.use(Lazyload, {
    preLoad: 2,
    // error: 'static/error.png',
    error: require('@/assets/images/common/loading_pic.png'),
    loading: require('@/assets/images/common/loading_pic.png'),
    // attempt: 3,
    // listenEvents: ['scroll','touchmove']
});
Vue.use(msgBox)
Vue.use(loading)
Vue.config.productionTip = false
Vue.prototype.$tapConfig = tapConfig

Vue.use(api)
// Vue.prototype.$http = axiosWrap



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App,
    },
    template: '<App/>'
})
