// import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach,
    afterEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)

let _base = 'cornucopia/view';

process.env.VERSION ? _base = `${_base}/${process.env.VERSION}` : '';

const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        // 首页、店铺列表页(无路由匹配都进入这个页面)
        {
            path: `/index*(.*)+`,
            name: 'myCornucopia',
            component: resolve => require(['../pages/index.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '聚宝盆',
                keepAlive: false,
            }
        },
        // 兑换商品列表页
        {
            path: `/list*(.*)+`,
            name: 'list',
            component: resolve => require(['../pages/list.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '聚宝盆兑换',
                keepAlive: true,
            }
        },
        // 好友比拼
        {
            path: `/checkingFriends*(.*)+`,
            name: 'checkingFriends',
            component: resolve => require(['../pages/checkingFriends.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '聚宝盆',
                keepAlive: false,
            }
        }

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
