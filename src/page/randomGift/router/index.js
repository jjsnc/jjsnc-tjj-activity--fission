// import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach,
    afterEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)

let _base = 'randomGift/view';

process.env.VERSION ? _base += `/${process.env.VERSION}` : '';

const router = new Router({
    mode: 'history',
    base: _base,
    routes: [

        // 首页、店铺列表页(无路由匹配都进入这个页面)
        {
            path: `/index*(.*)+`,
            name: 'randomGift',
            component: resolve => require(['../pages/index.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免费抽大奖',
            }
        },
        //晒单列表页
        {
            path: `/dryingList*(.*)+`,
            name: 'dryingList',
            component: resolve => require(['../pages/dryingList.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免费抽大奖',
            }
        },
        // 抽奖活动规则
        {
            path: `/rule*(.*)+`,
            name: 'rule',
            component: resolve => require(['../pages/rule.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免费抽大奖活动规则',
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
    beforeEach(to, from, next, _temp, _base, function(){
        _temp = true;
    });
})
router.afterEach((to, from) => {
    afterEach(to, from)
})

export default router;
