'use strict'
// import Vue from 'vue'
import axiosWrap from 'axios'
import qs from 'qs'
import {
    getEnvironment,
    _getUserInfo
} from './../assets/js/common/utils'
// import msgBox from '@/components/msgBox'
// const MsgBoxObj = Vue.extend(msgBox);
// const msgBoxObj = new MsgBoxObj();
// 并将此div加入全局挂载点内部
// msgBoxObj.$mount(document.createElement('div'))
// document.body.appendChild(msgBoxObj.$el)

//声明一个对象用于存储请求个数 为了解决多个请求时loading插件闪的情况
let needLoadingRequestCount = 0;
// 添加请求拦截器
axiosWrap.interceptors.request.use(function (config) {
    
    let _url = config.url;
    if(_url.indexOf('/showLoading/1') > -1){
        needLoadingRequestCount++;
        // console.log(needLoadingRequestCount)
        Vue.prototype.$loading.show();
    }

    let commonParams = {
        uuid: localStorage.getItem('TJJ_fissile_uuid') || 'wap',
        os: 'wap',
        _t: Date.parse(new Date()) / 1000
    };
    const tjjUser = _getUserInfo();
    if (getEnvironment() == 1 && Object.keys(tjjUser).length > 0) {
        commonParams.os = tjjUser.os;
    }
    if (Object.keys(tjjUser).length > 0) {
        commonParams.uuid = tjjUser.uuid;
        commonParams.user_id = tjjUser.user_id;
        commonParams.token = tjjUser.token;
        commonParams.session_id = tjjUser.session_id;
    }
    if (config.method == 'post') {
        config.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        if(config.data.appLog){ // 埋点日志无需公共参数并修改请求头
            config.headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            };
            // console.log(config.data.logData)
            config.data = config.data.logData;
        }else{
            // console.log(config.data)
            config.data = qs.stringify({
                ...config.data,
                ...commonParams
            })
        }
    } else if (config.method == 'get') {
        config.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
        };
        config.params = {
            ...config.params,
            ...commonParams
        }
    }
    config.timeout = 10000;
    return config
}, function (error) {
    return Promise.reject(error)
})

// 添加响应拦截器
axiosWrap.interceptors.response.use(function (response) {
    // console.log(response)
    needLoadingRequestCount--
    if (needLoadingRequestCount <= 0){
        Vue.prototype.$loading.hide();
        needLoadingRequestCount = 0;
    } 
    // 接口有返回值但是报错
    if((!response.data || response.data.curl_errno) && typeof errorLogUpload == 'function'){
        let config = response.config;
        let _method = config.method;
        let _url = config.url;
        let _params = config.params || config.data;
        let _message = !response.data ? 'no data' : response.data.curl_errno ? 'curl_errno' : 'error';
        errorLogUpload({
            logLevel: 3,
            errType: 22,
            apiError: {
                params: JSON.stringify(_params),
                uri: location.href,
                apiUri: _url,
                data: JSON.stringify(response.data),
                message: _message,
                method: _method,
                code: 200
            }
        })
    }
    return response
}, function (error) {
    // console.log(error)
    if(typeof errorLogUpload == 'function'){
        let config = error.config;
        let _method = config.method;
        let _url = config.url;
        let params = config.params;
        // 接口超时或者404等错误上报
        errorLogUpload({
            logLevel: 3,
            errType: 22,
            apiError: {
                params: JSON.stringify(params),
                uri: location.href,
                apiUri: _url,
                data: '',
                message: error.toString(),
                method: _method,
                code: error.request.status
            }
        })
    }
    needLoadingRequestCount--
    if (!needLoadingRequestCount) Vue.prototype.$loading.hide();
    // msgBoxObj.msgTxt = '网络暂时开小差了，请稍后再试'
    // alert('网络暂时开小差了，请稍后再试');
    return Promise.reject(error)
})


export default axiosWrap
