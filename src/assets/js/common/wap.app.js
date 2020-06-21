// import $ from 'jquery';

function getparams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window
        .location
        .search
        .substr(1)
        .match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        var name = 'app_type';
        var url = window.location.href;
        var param = new RegExp("(^|/)" + name + "\/([^/]*)(\/|$)");
        var val = param.exec(url);
        if (val != null)
            return unescape(val[2].slice(0, 1));
        return null;
    }
}
let appType;
const App = {
    init: function (config) {
        this.id = config.id || 'app_iframe';
        appType = getparams("app_type") == null ?
            '4' :
            getparams("app_type");
        switch (appType) {
            case '0':
                this.app_name = config.app_name || 'sdjj';
                break;
            case '1':
                this.app_name = config.app_name || 'aiyou';
                break;
            case '2':
                this.app_name = config.app_name || 'dress';
                break;
            case '3':
                this.app_name = config.app_name || 'sdjj';
                break;
            case '4':
                this.app_name = config.app_name || 'taojiji';
                break;
            default:
                this.app_name = config.app_name || 'taojiji';
                break;
        }
    },
    t: function () {
        var myDate = new Date();
        return myDate.getTime();
    },
    jump: function (type, params) {
        var url;
        params = params || {};
        console.log(params);
        let idEle = document.getElementById(this.id);
        if (!idEle) {
            let iframe = document.createElement('iframe');
            iframe.id = this.id;
            iframe.style.display = 'none';
            document.getElementsByTagName('body')[0].appendChild(iframe);
        }
        //misscang
        url = this.app_name + '://' + type;
        // console.log(url);
        var i = 0;
        for (var key in params) {
            if (i == 0) {
                url += '?';
            } else {
                url += '&';
            }
            if (typeof (params[key]) == 'object') {
                url += key + '=' + JSON.stringify(params[key]);
            } else {
                url += key + '=' + encodeURIComponent(params[key]);
            }
            i++;
        }
        if (i == 0) {
            url += '?t=' + this.t();
        } else {
            url += '&t=' + this.t();
        }
        console.log(url);
        //alert(url);
        document.getElementById(this.id).setAttribute("src", url);
    },
    //验证是否登录
    checkLogin: function () {
        this.jump('checkLogin');
    },
    //登入
    login: function (params) {
        this.jump('login', params);
    },
    //登出
    // logout: function () {
    //     $.get(U('Users/appLogout'));
    //     this.jump('logout');
    // },
    //关闭wap站
    close: function () {
        this.jump('close');
    },
    //获取网络连接状态wifi或3,4G
    getNet: function () {
        this.jump('networkType ');
    },
    //支付成功
    paySuccess: function (params) {
        this.jump('paySuccess', params);
    },
    //支付失败
    payFaild: function (params) {
        this.jump('payFalure', params);
    },
    //加入购物车
    buy: function (params) {
        this.jump('buy', params);
    },
    //商品详情
    goods: function (params) {
        this.jump('goods', params);
    },
    //web页面打开
    web: function (param) {
        this.jump('web', param);
    },
    //商品详情外链
    goods_detail: function (params) {
        this.jump('detail.sdjj.com/goods', params);
    },
    //拨打电话
    call: function (params) {
        this.jump('call', params);
    },
    //专题详情
    special: function (params) {
        this.jump('special', params);
    },
    //品牌商品列表
    brand: function (params) {
        this.jump('brand', params);
    },
    openWeb: function (param) {
        this.web({
            "url": param
        });
    },
    //活动详情
    activity: function (params) {
        this.jump('activity', params);
    },
    //分享
    share: function (params) {
        this.jump('share', params);
    },
    //验证平台
    getOS: function () {
        this.jump('getOS');
    },
    //关闭当前页
    close: function () {
        this.jump('close');
    },
    //返回首页
    backHome: function () {
        this.jump('backHome');
    },
    //优惠券
    coupon: function (params) {
        this.jump('coupon', params);
    },
    //环信聊天界面
    hxChat: function (params) {
        this.jump('hxChat', params);
    },
    //跳转APP分类
    category: function (params) {
        this.jump('classifySpecial', params);
    },
    //环信消息未读数
    getNoReadNum: function (params) {
        this.jump('getNoReadNum', params);
    },
    //闪约首页
    shanyueHome: function () {
        this.jump("shanyueHome");
    },
    shanyue: function (params) {
        this.jump('shanyue', params);
    },
    //数据统计pageCode
    pageCode: function (params) {
        this.jump('pageCode', params);
        // console.log(params)
    },
    //抽奖获得体验vip
    experienceVip: function () {
        this.jump('experienceVip')
    },
    //支付 
    pay: function (params) {
        this.jump('pay', params);
    },
    //跳转店铺首页
    startShopHome: function (params) {
        this.jump('startShopHome', params);
    },
    //跳转到APP推送消息设置页面（2.14新增）
    startPushSet: function (params) {
        this.jump('startPushSet', params);
    },
};
App.init({});
export default App;
