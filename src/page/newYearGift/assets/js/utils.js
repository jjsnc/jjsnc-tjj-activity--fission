
import App from '@/assets/js/common/wap.app.js'

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
    return arr[index + 1];
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
    } else {
        return 0;
    }
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