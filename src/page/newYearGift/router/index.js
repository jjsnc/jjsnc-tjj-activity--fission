// import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach,
    afterEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)

let _base = 'newYearGift/view';

process.env.VERSION ? _base += `/${process.env.VERSION}` : '';

const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        // 开奖详情页面
        {
            path: `/luckyDetail*(.*)+`,
            name: 'luckyDetail',
            component: resolve => require(['../pages/luckyDetail.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免费送礼物'
            }
        },
        // 送礼详情页面
        {
            path: `/givingDetail*(.*)+`,
            name: 'givingDetail',
            component: resolve => require(['../pages/givingDetail.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免费送礼物'
            }
        },
        // 下载
        {
            path: `/download*(.*)+`,
            name: 'download',
            component: resolve => require(['../pages/download.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免费送礼物'
            }
        },
        //详情页
        {
            path: `/goodsDetail*(.*)+`,
            name: 'goodsDetail',
            component: resolve => require(['../pages/goodsDetail.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免费送礼物',
            }
        },
        // 首页、店铺列表页(无路由匹配都进入这个页面)
        {
            path: `/index`,
            name: 'newyearGift',
            component: resolve => require(['../pages/index.vue'], resolve),
            children: [
                {
                    path: '/index/myFree*(.*)+',
                    name: 'myFree',
                    component: resolve => require(['../pages/myFree.vue'], resolve),
                    meta: {
                        requireAuth: true, // 判断是否需要登录
                        title: '免费送礼物',
                    }
                },
                {
                    path: '/*(.*)+',
                    name: 'mainFree',
                    component: resolve => require(['../pages/mainFree.vue'], resolve),
                    meta: {
                        title: '免费送礼物',
                    }
                },
                

            ],
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免费送礼物'
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
    beforeEach(to, from, next, _temp, _base, function(){
        _temp = true;
    });
})
router.afterEach((to, from) => {
    afterEach(to, from)
})

export default router;
