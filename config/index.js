'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// 获取当前活动
let pageEnv = process.argv.filter(item => item.indexOf('page=') > -1)[0] ? process.argv.filter(item => item.indexOf('page=') > -1)[0] : 'tjj'
let _PAGE = pageEnv.replace('page=',''); 

// 获取版本
let vEnv = process.argv.filter(item => item.indexOf('version=') > -1)[0] ? process.argv.filter(item => item.indexOf('version=') > -1)[0] : ''
let _version = vEnv.replace('version=','');

// 当前打包环境
let env = '';
let __env = process.argv.filter(item => item.indexOf('--env=') > -1)[0] ? process.argv.filter(item => item.indexOf('--env=') > -1)[0] : ''
env = __env ? __env.replace('--env=','') : '';

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/apiHost': {
                // target: 'http://fissile.taojiji.org', //本地
                // target: 'http://fissile.taojiji.com',//开发环境
                // target: 'https://testfissile.taojiji.com', //测试服
                target: 'https://fissile.tjjshop.cn', //测试服
                // target: 'https://fissile.taojiji.com',//正式
                changeOrigin: true,
                pathRewrite: {
                    '^/apiHost': ''
                }
            },
            '/applog': {
                target: 'https://app-log.tjjshop.cn',//正式
                changeOrigin: true,
                pathRewrite: {
                    '^/applog': ''
                }
            },
            '/appApi': {
                target: 'https://api-fissile.tjjshop.cn',//测试
                changeOrigin: true,
                pathRewrite: {
                    '^/appApi': ''
                }
            }
        },

        // Various Dev Server settings
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        port: 1212, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: process.env.NODE_ENV === 'production' ? `D:\\wamp\\www\\fission\\project\\${_PAGE}\\view\\${_version}\\index.html` : path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: process.env.NODE_ENV === 'production' ? `D:\\wamp\\www\\fission\\static\\${_PAGE}\\${_version}` : path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: (function () {
            let __path = '';
            
            switch (env) {
                case 'dev':
                    __path = './';
                    break;
                case 'local':
                    __path = `http://fissilestatic.taojiji.org/${_PAGE}/${_version}/`;
                    break;
                case 'devTest':
                    __path = `http://fissilestatic.taojiji.com/${_PAGE}/${_version}/`;
                    break;
                case 'test':
                    // __path = `https://testfissilestatic.taojiji.com/${_PAGE}/${_version}/`;
                    __path = `https://fissilestatic.tjjshop.cn/${_PAGE}/${_version}/`;
                    break;
                case 'pro':
                    __path = `https://fissilestatic.taojiji.com/${_PAGE}/${_version}/`;
                    break;
                default:
                    __path = './';
                    break;
            }
            return __path;
        })(),

        /**
         * Source Maps
         */

        productionSourceMap: env !== 'pro',
        // https://webpack.js.org/configuration/devtool/#production
        devtool: 'source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
