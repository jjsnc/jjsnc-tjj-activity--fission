import App from '@/assets/js/common/wap.app.js'
import { getQueryString,is_weixin,_getTjjUuid} from "@/assets/js/common/utils.js";
//剩余时间倒计时 时间戳 (秒级)
//使用事例
//countDown(1477808630,callback())
export const countDown = (time, callback) => {
    /*
     time:剩余时间时间戳  如:1477808630
    */
    callback(transTime(time));
    let mycount = setInterval(function() {
        time = parseInt(time) - 1;
        if (time >= 0) {
            callback(transTime(time));
        } else {
            clearInterval(mycount);
        }
    }, 1000);
};

function transTime(time) {
    let d = 0; //天数
    let h = 0; //小时
    let m = 0; //分钟
    let s = 0; //秒数
    let day = 0; // 天数

    if (time >= 0) {
        day = Math.floor(time / 60 / 60 / 24);
        h = toTwo(
            parseInt(Math.floor((time / 60 / 60) % 24)) + parseInt(d * 24)
        );
        m = toTwo(Math.floor((time / 60) % 60));
        s = toTwo(Math.floor(time % 60));
        return {
            day: day,
            hour: h,
            minute: m,
            second: s
        };
    }
}

//用于时间补位
function toTwo(obj) {
    if (obj < 10) {
        obj = "0" + obj;
    }
    return obj;
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
        window.location.href = `${location.origin}${baseUrl}/Free/wxLogin/uuid/${_getTjjUuid()}${params}`;
    }
}

