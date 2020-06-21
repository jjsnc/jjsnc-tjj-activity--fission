// import Vue from 'vue'
import Router from 'vue-router'
import {beforeEach,afterEach} from '@/assets/js/common/router.com.js'

Vue.use(Router)

let _base = 'secKill/view';

process.env.VERSION ? _base = `${_base}/${process.env.VERSION}` : '';

const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        // 首页、店铺列表页(无路由匹配都进入这个页面)
        {
            path: `/search*(.*)+`,
            name: 'search',
            component: resolve => require(['../pages/search.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '秒杀专区',
                keepAlive: true,
            }
        },
        // 首页、店铺列表页(无路由匹配都进入这个页面)
        {
            path: `/goodsDetail*(.*)+`,
            name: 'goodsDetail',
            component: resolve => require(['../pages/goodsDetail.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '秒杀专区',
            }
        },
        // 首页、店铺列表页(无路由匹配都进入这个页面)
        {
            path: `*(.*)+`,
            name: 'secKillIndex',
            component: resolve => require(['../pages/index.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '秒杀专区',
                keepAlive: true,
            }
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            console.log(savedPosition)
          return savedPosition
        } else {
          return { x: 0, y: 0 }
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
