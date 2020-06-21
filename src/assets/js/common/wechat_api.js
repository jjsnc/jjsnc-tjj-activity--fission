// import Vue from 'vue'
// require('@/assets/js/common/jweixin-1.4.0.js')
let script = document.createElement('script');
script.src = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js';

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
// 接口请求公共部分
// let baseUrl = `${apiHost}/${process.env.PAGE}.php${v}`;
let baseUrl = `${apiHost}/clock.php/v1_0_0`;

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

var wx_URL = `${location.origin}${baseUrl}/login/shareConf`;
function Wechat_api(params){
    this.shareJson = params.shareJson;
    this.hideShareType = params.hideShareType;
    // console.log(this.shareJson)
    this.config();
    // let signatureData = JSON.parse(sessionStorage.getItem('signatureData'));
    // if(browser.versions.ios && signatureData){
    //     console.log(signatureData)
    //     wx.config({
    //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: signatureData.appId, // 必填，公众号的唯一标识
    //         timestamp: signatureData.timestamp, // 必填，生成签名的时间戳
    //         nonceStr: signatureData.nonceStr, // 必填，生成签名的随机串
    //         signature: signatureData.signature,// 必填，签名
    //         jsApiList: signatureData.jsApiList // 必填，需要使用的JS接口列表
    //     });
    //     this.ready();
    // }else{
    //     this.config();
    // }
};
// 配置
Wechat_api.prototype.config = function(){
    var self = this, _url;
    // var _url = sessionStorage.getItem('TJJ_fissile_shareUrl');
    // var _url = location.href;
    browser.versions.ios ? _url = sessionStorage.getItem('TJJ_fissile_shareUrl') : _url = location.href;
    console.log(_url + '~~~~~' + location.href)
    console.log(_url == location.href)
    var params = {url: _url.replace(/"/g,'%22')}
    Vue.prototype.$http.get(wx_URL, {params}).then(res => {
        let data = res.data;
        console.log(data);
        let jsApiList = data.jsApiList;
        jsApiList.indexOf('hideMenuItems') < 0 ? jsApiList.push('hideMenuItems') : '';
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
        });
        // sessionStorage.setItem('signatureData',JSON.stringify(data));

        self.ready();
    })
};
// ready方法
Wechat_api.prototype.ready = function(){
    var self = this;
    wx.ready(function(){
        self.shareJson && Object.keys(self.shareJson).length > 0 ? self.share() : '';
        self.hideShareType ? self.hideShare(self.hideShareType) : '';
    })
};
// 隐藏部分分享功能
Wechat_api.prototype.hideShare = function(type){
    let hideArr = [];
    switch (type) {
        case 1: // 仅支持微信好友分享和微信朋友圈分享
            hideArr = [ "menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:QZone",
                        "menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email","menuItem:copyUrl"];
            break;
    
        default:
            break;
    }
    wx.hideMenuItems({
        menuList: hideArr // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
};
Wechat_api.prototype.pay = function(params){
    var self = this;
    wx.chooseWXPay({
        // appId: self.appId, // 必填，公众号的唯一标识
        timestamp: params.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
        package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: params.paySign, // 支付签名
        success: function (res) {
            // 支付成功后的回调函数
            typeof params.success == 'function' ? params.success(res) : '';
        }
    });
}
// 分享
Wechat_api.prototype.share = function(){
    var self = this;
    console.log(self)
    // 朋友
    wx.onMenuShareAppMessage({
        title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
        desc: self.shareJson.desc ? self.shareJson.desc : '精品好货，物美价廉，尽在淘集集', // 分享描述
        link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
        }
    });
    // 朋友圈
    wx.onMenuShareTimeline({
        title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
        link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
        }
    });
    // QQ
    wx.onMenuShareQQ({
        title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
        desc: self.shareJson.desc ? self.shareJson.desc : '精品好货，物美价廉，尽在淘集集', // 分享描述
        link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
        }
    });
    //分享到腾讯微博
    wx.onMenuShareWeibo({
        title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
        desc: self.shareJson.desc ? self.shareJson.desc : '精品好货，物美价廉，尽在淘集集', // 分享描述
        link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
        }
    });
    // 分享到QQ空间
    wx.onMenuShareQZone({
        title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
        desc: self.shareJson.desc ? self.shareJson.desc : '精品好货，物美价廉，尽在淘集集', // 分享描述
        link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
        }
    });
}

export default Wechat_api;