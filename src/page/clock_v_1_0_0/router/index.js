// import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)
let _base = 'clock/view';
process.env.VERSION ? _base += `/${process.env.VERSION}` : '';
const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        //支付完成页
        {
            path: `/paying*(.*)+`,
            name: 'paying',
            component: resolve => require(['../pages/paying.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '打卡全额返'
            }
        },
        //详情页
        {
            path: `/goodsDetail*(.*)+`,
            name: 'goodsDetail',
            component: resolve => require(['../pages/goodsDetail.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '打卡全额返',
            }
        },
        // 首页、店铺列表页(无路由匹配都进入这个页面)
        {
            path: `/index*(.*)+`,
            name: 'index',
            component: resolve => require(['../pages/index.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '打卡全额返',
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            console.log(savedPosition)
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

let _temp = false;

router.beforeEach((to, from, next) => {
    beforeEach(to, from, next, _temp, _base);

})

export default router;
