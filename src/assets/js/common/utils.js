/*
 * @Author: Arthur_xu 
 * @Date: 2018-05-23 13:48:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-13 19:02:14
 */

import App from '@/assets/js/common/wap.app.js'
import WxMini from '@/assets/js/common/wx.mini.js'
import {checkTokenApi} from './commonApi.js'

let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
//剩余时间倒计时 时间戳 (秒级)
//使用事例
//countDown(1477808630,callback())
export const countDown = (time, callback) => {
    /*
     time:剩余时间时间戳  如:1477808630
    */
    callback(transTime(time));
    let mycount = setInterval(function () {
        time = parseInt(time) - 1;
        if (time >= 0) {
            callback(transTime(time));
        } else {
            clearInterval(mycount);
        }
    }, 1000);
}

function transTime(time) {
    let d = 0; //天数
    let h = 0; //小时
    let m = 0; //分钟
    let s = 0; //秒数

    if (time >= 0) {
        h = toTwo(parseInt(Math.floor(time / 60 / 60 % 24)) + parseInt(d * 24));
        m = toTwo(Math.floor(time / 60 % 60));
        s = toTwo(Math.floor(time % 60));
        return {
            "hour": h,
            "minute": m,
            "second": s
        }
    }
}

//用于时间补位
function toTwo(obj) {
    if (obj < 10) {
        obj = '0' + obj;
    }
    return obj;
}

export const formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// 获取url参数(&符号拼接参数)
export const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)", "ig");
    var r;
    r = window.location.search.substr(1).match(reg);
    r == 'null' || r == 'undefined' ? r = null : '';
    if (r){
        var val = r[r.length-1].split('=')[1];
        return val == 'null' || val == 'undefined' ? null : val;
    } 
    // if (r) return unescape(r[2]);
    var r = getParams(name);
    r == 'null' || r == 'undefined' ? r = null : '';
    if (r) return r;
    return null;
}
// 获取url参数(/符号拼接参数)
function getParams(key) {
    var url = window.location.pathname;
    var arr = url.split('/');
    var index = arr.lastIndexOf(key);
    return (index < 0 ? null : arr[index + 1]);
}
// 验证登录
export const check_login = (obj) => {
    let user_info = _getUserInfo();
    let user_id = user_info.user_id;
    
    if (user_id) {
        (obj && typeof obj.loginCallBack == 'function') ? obj.loginCallBack(user_id, token): '';
        return true;
    }
    if (getQueryString('uuid') == 'wechat') {
        wx.miniProgram.navigateTo({
            url: '/pages/login/login?b_user_id' + getQueryString('b_user_id')
        })
        return;
    }
    if (!user_id && App) {
        App.checkLogin();
        //checkLogin交互回调
        window.isLogin = function (user_id, token) {
            if (user_id && user_id.trim() && user_id != "null" && user_id != "undefined"  && user_id != "nil") {
                (obj && typeof obj.loginCallBack == 'function') ? obj.loginCallBack(user_id, token): '';
            } else {
                    setTimeout(function(){
                        App.login({
                            "reload": 1,
                            "return_url":location.href
                        }); 
                    },500)
                }
            }
    }
    return false;
}

/* 
**验证token是否失效 
**obj.error 验证接口失败
**obj.success 验证未失效回调方法
**obj.loginParams 验证已失效跳转登录所需参数
*/
export const checkToken = (obj) => {
    let user_info = _getUserInfo();
    if(getQueryString('wxLoginBack') == 0){
        typeof obj.error == 'function' ? obj.error({errTxt: decodeURI(getQueryString('wxLoginMessage')) || '微信授权登录失败，请退出重新进入',}) : '';
        // this.msgTxt = decodeURI(getQueryString('wxLoginMessage')) || '微信授权登录失败，请退出重新进入';
        return;
    }
    if(user_info.uuid && user_info.token && user_info.user_id){
        let params = {
            app_resource: 0
        };
        Vue.prototype.$http.get(checkTokenApi,{params}).then(res => {
            console.log(res)
            let data = res.data;
            if(data && data.result == 1){ // 登录未失效
                typeof obj.success == 'function' ? obj.success() : '';
                return;
            }else if(data && data.result == 0){
                jump2Login({loginParams: obj.loginParams});
            }else{
                typeof obj.error == 'function' ? obj.error({errTxt: (res && res.data && res.data.message) || '网络错误'}) : '';
                // this.msgTxt = (res && res.data && res.data.message) || '网络错误';
            }
        })
        return;
    }
    jump2Login({loginParams: obj.loginParams});
}


// 跳转到店铺
export const jump2Shop = (id) => {
    App.startShopHome({
        shopId: id
    })
}
// 跳转商品详情
export const jump2goods = (id) => {
    let os = getEnvironment();
    if (os==1) {
        App.goods({
            goodsId: id,
        })
    }else if(os==2){
        WxMini.jump2goods(id);
    }else{
        console.log("no environment");
    }
}
// 打开地址列表
export const openAddresslist = (obj) => {    
    WxMini.openAddresslist(obj);
}

// 跳转到app 首页 或者小程序首页
export const jump2home = () => {
    let os = getEnvironment();
    if (os==1) {
        App.backHome()
    }else if(os==2){
        WxMini.jump2home();
    }else{
        console.log("no environment");
    }
}
//跳转到APP推送消息设置页面（2.14新增）
export const startPushSet = (params) => {
    let os = getEnvironment();
    if (os==1) {
        App.startPushSet(params)
    }else{
        console.log("no environment");
    }
}

// 检测是否是微信浏览器
export const is_weixin = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

// 获取用户信息
export const _getUserInfo = () => {
    let isWeixinMini = getQueryString('uuid') == 'wechat';
    let session_id = getQueryString('session_id'), // 小程序标识
        os = getQueryString('os'); // APP标识
    if(isWeixinMini || os){
        return (sessionStorage.getItem('tjj_fission_user') ? JSON.parse(sessionStorage.getItem('tjj_fission_user')) : {})
    }else{
        return (localStorage.getItem('tjj_fission_user') ? JSON.parse(localStorage.getItem('tjj_fission_user')) : {})
    }
}

// 获取用户信息参数拼接
export const _commonQuery = () => {
    let user_info = _getUserInfo(),
        version = getQueryString('version'),
        is_first = getQueryString('is_first');//免单团购判断微信内是否下第一单
    // (user_info && user_info.uuid) ? '' : user_info.uuid = _getTjjUuid();
    let _c = '';
    for (let key in user_info) {
        _c += ('/' + key + '/' + user_info[key]);
    }
    version ? _c += `/version/${version}` : '';
    parseInt(is_first) ? _c += `/is_first/${is_first}` : '';
    console.log('_commonQuery:', _c)
    return _c;
}

/**
 * return 1 为app 环境
 * 0: html 环境
 * 1. 从链接中取得参数 ，有os 参数 ，则为app,
 *  从localStorage 中取得参数， 当os 参数为 android || ios 时，则为 app环境
 * @returns {number}
 */
export const getEnvironment = () => {
    const __this = this;
    const os = (getQueryString('os') ? getQueryString('os').toLowerCase() : '');
    if (os == 'android' || os == 'ios') {
        return 1;
    } else if(getQueryString('uuid') == 'wechat'){
        return 2;
    } else {
        return 0;
    }
}

/* APP内部通用分享方法 */
export const appShare = (obj) => {
    let os = getEnvironment();
    if(os != 1) return;
    App.share(obj);
    typeof obj.callback == 'function' ? obj.callback : '';
}

/* 仅支持分享到微信小程序 */
export const shareToWxMini = (obj) => {
    let os = getEnvironment();
    if (os==1) {
        // let url = 'https://' + location.host + '/tenFair/view/' + process.env.VERSION;
        App.share({
            shareType: 0,
            content: obj.content,
            title: obj.title,
            wxMiniPath: obj.wxMiniPath,
            miniPath: obj.wxMiniPath,
            shareUrl: obj.shareUrl,
            imgUrl: obj.imgUrl
        })
        return;
    }
    typeof obj.isMiniFn == 'function' ? obj.isMiniFn() : '';
}
/* 仅支持分享到微信 */
export const shareToWx = (obj) => {
    let os = getEnvironment();
    if (os==1) {
        App.share({
            shareType: 0,
            content: obj.content,
            title: obj.title,
            shareUrl: obj.shareUrl,
            imgUrl: obj.imgUrl
        })
        window.shareResult=function(result) {
            var shareResult = result.split(",")[0];
            if (shareResult) {
                console.log(1)
            }
        }
        return;
    }
}
//购物车操作
function cart(type, obj, fissile_setCart) {
    switch (type) {
        case 'add':
            if (Object.keys(fissile_setCart).length > 0 && fissile_setCart.goods_id) {
                if (fissile_setCart.goods_id.indexOf(obj.goods_id) >= 0 && fissile_setCart.spec_id.indexOf(obj.spec_id) >= 0) { //已有该商品
                    var fissile_cart_spec_arr = fissile_setCart.spec_id.split(',');
                    var fissile_cart_num_arr = fissile_setCart.num.split(',');
                    var index = fissile_cart_spec_arr.indexOf(obj.spec_id);
                    fissile_cart_num_arr[index] = Number(fissile_cart_num_arr[index]) + Number(obj.num);
                    fissile_setCart.num = fissile_cart_num_arr.join(',');
                } else { //没有该商品
                    fissile_setCart.goods_id += (',' + obj.goods_id);
                    fissile_setCart.spec_id += (',' + obj.spec_id);
                    fissile_setCart.num += (',' + obj.num);
                    fissile_setCart.goods_checked += (',' + obj.goods_checked); //购物车商品是否选中 加入时默认选中
                    fissile_setCart.navPath += (',' + obj.navPath);
                }
            } else {
                fissile_setCart.goods_id = obj.goods_id;
                fissile_setCart.spec_id = obj.spec_id;
                fissile_setCart.num = String(obj.num);
                fissile_setCart.goods_checked = String(obj.goods_checked);
                fissile_setCart.navPath = String(obj.navPath);
            }
            break;
        case 'change':
            var fissile_cart_goods_arr = fissile_setCart.goods_id.split(',');
            var fissile_cart_spec_arr = fissile_setCart.spec_id.split(',');
            var fissile_cart_num_arr = fissile_setCart.num.split(',');
            var fissile_cart_checked_arr = fissile_setCart.goods_checked.split(',')
            var fissile_cart_navPath_arr = fissile_setCart.navPath.split(',')
            var index = fissile_cart_spec_arr.indexOf(obj.spec_id);
            fissile_cart_spec_arr[index] = obj.spec_id;
            fissile_cart_num_arr[index] = obj.num;
            fissile_cart_checked_arr[index] = obj.goods_checked;
            fissile_setCart.spec_id = fissile_cart_spec_arr.join(',');
            fissile_setCart.num = fissile_cart_num_arr.join(',');
            fissile_setCart.goods_checked = fissile_cart_checked_arr.join(',');
            fissile_setCart.navPath = fissile_cart_navPath_arr.join(',');
            break;
        case 'delete':
            var fissile_cart_goods_arr = fissile_setCart.goods_id.split(',');
            var fissile_cart_spec_arr = fissile_setCart.spec_id.split(',');
            var fissile_cart_num_arr = fissile_setCart.num.split(',');
            var fissile_cart_checked_arr = fissile_setCart.goods_checked.split(',')
            var fissile_cart_navPath_arr = fissile_setCart.navPath.split(',')
            var index = fissile_cart_spec_arr.indexOf(obj.spec_id);
            fissile_cart_goods_arr.splice(index, 1);
            fissile_cart_spec_arr.splice(index, 1);
            fissile_cart_num_arr.splice(index, 1);
            fissile_cart_checked_arr.splice(index, 1);
            fissile_setCart.goods_id = fissile_cart_goods_arr.join(',');
            fissile_setCart.spec_id = fissile_cart_spec_arr.join(',');
            fissile_setCart.num = fissile_cart_num_arr.join(',');
            fissile_setCart.goods_checked = fissile_cart_checked_arr.join(',');
            fissile_setCart.navPath = fissile_cart_navPath_arr.join(',');
            break;
        default:
            break;
    }
    return fissile_setCart;
}

// 修改购物车数据 add：添加；change：修改；delete：删除
export const fissile_setCart = function (type, obj, user) {
    let user_id = getQueryString('user_id');
    var fissile_setCart = JSON.parse(localStorage.getItem(user_id)) || {};
    // 是否存在当前项目，不存在则创建
    fissile_setCart[user["project"]] ? '' : fissile_setCart[user["project"]] = {};
    // 是否在当前项目存在当前店铺，不存在则创建
    fissile_setCart[user["project"]][user["shopId"]] ? '' : fissile_setCart[user["project"]][user["shopId"]] = {};

    // 数据格式转换
    obj.goods_id = String(obj.goods_id);
    obj.spec_id = String(obj.spec_id);
    obj.num = String(obj.num);
    obj.goods_checked = String(obj.goods_checked);

    // 修改/添加/删除 当前店铺购物车数据
    fissile_setCart[user["project"]][user["shopId"]] = cart(type, obj, fissile_setCart[user["project"]][user["shopId"]])

    // 存储新数据
    localStorage.setItem(user_id, JSON.stringify(fissile_setCart));
}

// 调取app支付
export const userAppPay = (obj) => {
    App.pay({
        orderNo: obj.orderNo,
        orderName: obj.goodsName,
        payType: obj.payType,
        orderPrice: obj.price,
        linkUrl: obj.linkUrl ? obj.linkUrl : '',
        webLinkUrl: obj.webLinkUrl ? obj.webLinkUrl : '',
        jumpAppPayResult: obj.jumpAppPayResult ,
        payNo: obj.payNo
    });
}
//获取购物车数据
export const fissile_getCart = function () {
    let user_id = getQueryString('user_id');
    if (localStorage.getItem(user_id)) {
        return JSON.parse(localStorage.getItem(user_id))
    } else {
        return {}
    }
}

// 修改页面title
export const changeTitle = (name) => {
    name ? document.title = name : document.title = '淘集集';
    if (getQueryString('os') && getQueryString('os').toLocaleLowerCase() == 'ios') {
        let _iframe = document.createElement('iframe');
        _iframe.style.display = 'none';
        _iframe.src = '/setTitle.html?r=' + Math.random();
        document.body.appendChild(_iframe);
        // console.log('iosiosios')
        setTimeout(_ => {
            document.body.removeChild(_iframe)
        }, 300)
    }
}

// 检测系统、浏览器类型
export const checkBrowser = () => {
    var browser = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    return browser;
}

// 下载淘集集app
export const TJJdownLoad = () => {
    let browser = checkBrowser();
    if(browser.versions.ios){
        location.href = 'https://itunes.apple.com/cn/app/%E6%B7%98%E9%9B%86%E9%9B%86/id1308838222?mt=8';
    }else{
        location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.huanshou.taojj&from=singlemessage&isappinstalled=0';
    }
}

// 生成设备号uuid
export const _getTjjUuid = () => {
    if(localStorage.getItem('TJJ_fissile_uuid')){
        return localStorage.getItem('TJJ_fissile_uuid');
    }
    var num = createNum_16(8) + '-' + createNum_16(4) + '-' + createNum_16(4) + '-' + createNum_16(12);
    localStorage.setItem('TJJ_fissile_uuid', num);
    return num;
}
// 生成16进制数
export const  createNum_16 = (num) => {
    var _num16 = '';
    !num ? num = 1 : '';
    for (var i = 1; i <= num; i++) {
        var _num = Math.floor(Math.random() * 16).toString(16);
        _num16 += (_num + '');
    }
    return _num16;
}

// 跳转登录
export const jump2Login = (obj) => {
    let return_url = encodeURI(obj.return_url || window.location.href);
    if (getQueryString('uuid') == 'wechat') {
        wx.miniProgram.navigateTo({
            url: '/pages/login/login?b_user_id' + getQueryString('b_user_id')
        })
    } else if (getQueryString('os')) {
        App.init({
            app_name: 'taojiji'
        })
        App.login({
            "reload": 1,
            "return_url": return_url
        });
    } else if(is_weixin()){
        let params = obj.loginParams || '';
        // 版本
        let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';
        // 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
        let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
        // 接口请求公共部分
        let baseUrl = `${apiHost}/${process.env.PAGE}.php${v}`;
        // window.location.href = `${location.origin}${baseUrl}/Login/wxLogin/uuid/${_getTjjUuid()}${params}/return_url/${return_url}`;
        window.location.href = `${location.origin}${baseUrl}/Login/wxLogin/uuid/${_getTjjUuid()}${params}`;
    }
}

// 解决ios input兼容
export const _inputS = () => {
    var input = document.getElementsByTagName('input');
    var textarea = document.getElementsByTagName('textarea');
    var __height = 0;
    for(var i = 0;i<input.length;i++){
        input[i].onfocus = function(){
            // console.log(222)
            __height = window.scrollY;
        }
        input[i].onblur = function(){
            // console.log(111)
            window.scrollTo(0,__height);
        }
    }
}

// 有遮罩层时禁止背景滚动
export const _disScroll = (flag) => {
    let body = document.getElementsByTagName('body')[0];
    // console.log(flag)
    if(flag){
        let _top = document.body.scrollTop || document.documentElement.scrollTop;
        body.className.indexOf('overflowHide') < 0 ? body.style.top = (-1 * _top) + 'px' : '';
        // body.className.indexOf('overflowHide') < 0 ? body.className = body.className + ' overflowHide' : '';
        body.className = body.className + ' overflowHide';
    }else{
        var _top = parseFloat(body.style.top)*-1 || 0;
        body.className = body.className.replace('overflowHide','');
        body.className.indexOf('overflowHide') < 0 ? body.style.top = 0 + 'px' : '';
        window.scrollTo(0, _top);
    }
}

// 获取cookie
export const getCookie = name => {
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

export const getNetType = () => {
    var networkStr = navigator.userAgent.match(/NetType\/\w+/) ? navigator.userAgent.match(/NetType\/\w+/)[0] : 'NetType/'; //网络状态
    networkStr = networkStr.toLowerCase().replace('nettype/', ''); //网络状态
    var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
    var netWorkType = connection.type;
    return networkStr || netWorkType || 'unknown'
}