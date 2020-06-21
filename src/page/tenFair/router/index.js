// import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach,
    afterEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)

let _base = 'tenFair/view';

process.env.VERSION ? _base += `/${process.env.VERSION}` : '';

const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        // 店铺详情页
        {
            path: `/shopDetail(.*)+`,
            name: 'tenFairShopDetail',
            component: resolve => require(['../pages/shopDetail.vue'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
                title: sessionStorage.getItem('fissile_shopName')
            }
        },
        // 商品详情页
        {
            path: `/fiveGoodsDetail(.*)+`,
            name: 'fiveGoodsDetail',
            component: resolve => require(['../pages/fiveGoodsDetail.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '十元集市'
            }
        },
        // 商品详情页
        {
            path: `/twoGoodsDetail(.*)+`,
            name: 'twoGoodsDetail',
            component: resolve => require(['../pages/twoGoodsDetail.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '十元集市'
            }
        },
        // 首页、店铺列表页(无路由匹配都进入这个页面)
        {
            path: `/home`,
            name: 'home',
            component: resolve => require(['../pages/home.vue'], resolve),
            meta: {
                title: '十元集市',
                eventTrack: true,
                eventTrackParams: {
                    funType: 'H5'   ,
                    pagename: 'ten_page',
                    elementid: 'pv',
                    eventtype:'view',
                    first_page:''
                },
            },
            children: [{
                path: '/home/twoList*(.*)+',
                name: 'twoList',
                component: resolve => require(['../pages/twoList.vue'], resolve),
                meta:{
                    title: '十元集市',
                    keepAlive: true
                    // requireAuth: true, // 判断是否需要登录
                }
            },
            {
                path: '*(.*)+',
                name: 'fiveList',
                component: resolve => require(['../pages/fiveList.vue'], resolve),
                meta:{
                    title: '十元集市',
                    keepAlive: true
                    // requireAuth: true, // 判断是否需要登录
                }
            },
            ],
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
    beforeEach(to, from, next, _temp, _base, function () {
        _temp = true;
    });

})
router.afterEach((to, from) => {
    afterEach(to, from)
})

export default router;
