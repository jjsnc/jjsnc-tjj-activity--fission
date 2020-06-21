// import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)

let _base = 'one/view';

process.env.VERSION ? _base += `/${process.env.VERSION}` : '';

const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        {
            path: `/index*(.*)+`,
            name: 'index',
            component: resolve => require(['../pages/index.vue'], resolve),
        },
        //详情页
        {
            path: `/goodsDetail*(.*)+`,
            name: 'goodsDetail',
            component: resolve => require(['../pages/goodsDetail.vue'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
                title: '1元拼团',
            }
        },
        // 首页(无路由匹配都进入这个页面)
        {
            path: `/home*(.*)+`,
            name: 'home',
            component: resolve => require(['../pages/home.vue'], resolve),
            children: [{
                path: '/home/homeList*(.*)+',
                name: 'homeList',
                component: resolve => require(['../pages/homeList.vue'], resolve),
                meta: {
                    requireAuth: true, // 判断是否需要登录
                    title: '1元拼团',
                }
            },
            {
                path: '/home/homeGroup*(.*)+',
                name: 'homeGroup',
                component: resolve => require(['../pages/homeGroup.vue'], resolve),
                meta: {
                    title: '我的拼团',
                }
            },
            ],
            meta: {
                title: '我的拼团'
            }
        },
        {
            path: `/groupDetail*(.*)+`,
            name: 'groupDetail',
            component: resolve => require(['../pages/groupDetail.vue'], resolve),
            meta: {
                title: '1元拼团',
            },
            // children: [{
            //     path: '/myShare*(.*)+',
            //     name: 'myShare',
            //     component: resolve => require(['../pages/myShare.vue'], resolve),
            //     meta: {
            //         title: '1元拼团',
            //         // requireAuth: true, // 判断是否需要登录
            //     }
            // },
            // {
            //     path: '/share*(.*)+',
            //     name: 'share',
            //     component: resolve => require(['../pages/share.vue'], resolve),
            //     meta: {
            //         title: '1元拼团',
            //         // requireAuth: true, // 判断是否需要登录
            //     }
            // },
            // ],
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

export default router;
