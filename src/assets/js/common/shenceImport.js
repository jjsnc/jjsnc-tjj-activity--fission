import sensors from 'sa-sdk-javascript';

function getEnv() {
    let host = window.location.host;
    switch (host) {
        case 'fissile.tjjshop.cn':
            // 测试服
            return 'https://shencedata.taojiji.com/sa?project=default'
        case 'fissile.taojiji.com':
            // 正式服
            return 'https://shencedata.taojiji.com/sa?project=production'
        default:
            //本地
            return 'https://shencedata.taojiji.com/sa?project=default'
    }
}
function getStatic() {
    let host = window.location.host;
    switch (host) {
        case 'localhost:1212':
            // 测试服
            return 'https://fissilestatic.tjjshop.cn/'
        case 'fissile.tjjshop.cn':
            // 测试服
            return 'https://fissilestatic.tjjshop.cn/'
        case 'fissile.taojiji.com':
            // 正式服
            return 'https://fissilestatic.taojiji.com/'
        default:
            //本地
            return 'https://fissilestatic.taojiji.com/'
    }
}

sensors.init({
    server_url: getEnv(),
    //heatmap_url神策分析中点击分析及触达分析功能代码，代码生成工具会自动生成。如果神策代码中 `sensorsdata.min.js` 版本是 1.9.1 及以上版本，这个参数必须配置，低于此版本不需要配置。
    heatmap_url: getStatic() + "common/js/heatmap.min.js",
    //web_url 神策分析中点击分析及触达分析功能会用到此地址，代码生成工具会自动生成。如果神策后台版本及 `sensorsdata.min.js` 均是 1.10 及以上版本，这个参数不需要配置。
    // web_url:"神策分析后台地址",
    heatmap: {
        //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
        //需要 JSSDK 版本号大于 1.7
        clickmap: 'default',
        //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
        //需要 JSSDK 版本号大于 1.9.1
        scroll_notice_map: 'default'
    },
    is_track_device_id: true,
    use_app_track: true,
    show_log: true
});
sensors.registerPage({
    PlatformType: 'H5',
    appName: '淘集集',
});
// sensors.login(user_id);
sensors.quick('autoTrack');

export default sensors;

// (function(para) {
//     var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
//     if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
//         return false;
//     }
//     w['sensorsDataAnalytic201505'] = n;
//     w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
//     var ifs = ['track','quick','register','registerPage','registerOnce','clearAllRegister','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister'];
//     for (var i = 0; i < ifs.length; i++) {
//         w[n][ifs[i]] = w[n].call(null, ifs[i]);
//     }
//     if (!w[n]._t) {
//         x = d.createElement(s), y = d.getElementsByTagName(s)[0];
//         x.async = 1;
//         x.src = p;
//         y.parentNode.insertBefore(x, y);
//         w[n].para = para;
//     }
// })({
//     sdk_url: getStatic()+"common/js/sensorsdata.min.js",
//     name: 'sensors',
//     server_url: getEnv(),
//     //heatmap_url神策分析中点击分析及触达分析功能代码，代码生成工具会自动生成。如果神策代码中 `sensorsdata.min.js` 版本是 1.9.1 及以上版本，这个参数必须配置，低于此版本不需要配置。
//     heatmap_url: getStatic()+"common/js/heatmap.min.js",
//     //web_url 神策分析web中点击分析及触达分析功能会用到此地址，代码生成工具会自动生成。如果神策后台版本及 `sensorsdata.min.js` 均是 1.10 及以上版本，这个参数不需要配置。
//     heatmap: {
//         //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
//         //需要 JSSDK 版本号大于 1.7
//         clickmap:'default',
//         //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
//         //需要 JSSDK 版本号大于 1.9.1
//         scroll_notice_map:'default'
//     },
//     is_track_device_id: true,
//     use_app_track: true,
//     show_log: true
// });
// sensors.registerPage({
//     PlatformType:'H5',
//     appName:'淘集集',
// });
// sensors.quick('autoTrack'); //神策系统必须是1.4最新版及以上
