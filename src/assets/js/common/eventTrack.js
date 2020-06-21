import { getQueryString, _getTjjUuid } from './utils';


let u = navigator.userAgent; //用户设备信息
let uuid = getQueryString('uuid') || _getTjjUuid() || '', 
    postUrl = process.env.NODE_ENV == 'development' ? '/applog/app/log' : process.env.RUN_ENV == 'pro' ? 'https://app-log.taojiji.com/app/log' : 'https://app-log.tjjshop.cn/app/log'; //测试服地址
let networkStr = u.match(/NetType\/\w+/) ? u.match(/NetType\/\w+/)[0] : 'NetType/'; //网络状态
networkStr = networkStr.toLowerCase().replace('nettype/', ''); //网络状态
let connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
let netWorkType = connection.type;
let netType = networkStr || netWorkType || 'unknown';

export const eventTrack = (params) => {
    if(typeof params != 'object') return;
    let _os = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 ? 'android' : '';
    const postParams = {
        os: _os ? _os + '-h5' : 'h5',
        sysVer: '',
        imei: '',
        uuid: getQueryString('openId') || uuid,
        deviceID: uuid,
        chan: 'h5',
        appType: 4,
        appVer: getQueryString('version') || '',
        traceId: '',
        token: getQueryString('token') || '',
        uid: getQueryString('user_id') || '',
        session: getQueryString('sessionid') || getQueryString('session_id') || '',
        netType: netType || '',
        logType: '4',
        logLevel: 'info',
        cuid: uuid,
        login_mode: '',
        funType: 'h5'
    };
    postParams.logTime = new Date().getTime();
    postParams.url = location.href;
    Object.assign(postParams, params);
    Vue.prototype.$http.post(postUrl, {appLog:1, logData: [postParams]}).then(res => {
        console.log(res)
    })
}