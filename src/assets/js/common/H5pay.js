/*
** 微信支付，支持微信内部浏览器和外部浏览器支付
** author cj
*/

'use strict'
import httpUtil from '@/api/http'
import {_commonQuery} from '@/assets/js/common/utils';

import {  _getUserInfo,is_weixin } from '@/assets/js/common/utils'

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
// 接口请求公共部分
let baseUrl = `${apiHost}/${process.env.PAGE}.php${v}`;
// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

const authObj = _getUserInfo();

export default {
    // 初始化支付类型
    init(payType, payInfo){
        this.successFn = payInfo.successFn;
        this.errorFn = payInfo.errorFn;
        if (payType == 'wxpayIn') {
            this.getWxPayIn(payInfo.order_no, payInfo.goods_name, payInfo.payNo);
        } else if (payType == 'wxpayOut') {
            this.getWxPayOut(payInfo.order_no, payInfo.goods_name, payInfo.payNo);
        } else if (payType == 'alipay') {
            this.getAliPay(payInfo.order_no, payInfo.goods_name, payInfo.payNo);
        }
    },
    // 微信内部支付
    getWxPayIn(order_no, goods_name, payno) {
        const url = `${baseUrl}/Wx/unifiedorder/order_no/${order_no}/goods_name/${goods_name}/trade_type/JSAPI/payno/${payno}/user_id/${authObj.user_id}/uuid/${authObj.uuid}/token/${authObj.token}`
        window.location.href = url;
    },
    // 阿里支付
    getAliPay(order_no, goods_name, payno) {
        // const url = `${baseUrl}/index.php/Sdjj/alipay/pay/order_no/${order_no}/goods_name/${goods_name}/user_id/${authObj.user_id}/uuid/wap/token/${authObj.token}`
        // window.location.href = url;
    },
    // 微信外部支付
    getWxPayOut(order_no, goods_name, payno) {
        // let href = `${location.protocol}//${window.location.host}/index.php/Html/wap/vue-index/cart?order_no=${order_no}`
        // const url = `${location.protocol}//${window.location.host}/index.php/Sdjj/Wx/unifiedorder`;
        // const params = {
        //     order_no,
        //     goods_name,
        //     trade_type: 'MWEB',
        //     redirect_url: href
        // }
        // httpUtil.get(url, {
        //     params
        // }).then(res => {
        //     const data = res.data;
        //     if (data && data.code == 1) {
        //         var payCallBack = {
        //             order_no: order_no,
        //             payno: payno
        //         };
        //         localStorage.setItem('payCallBack', JSON.stringify(payCallBack));
        //         window.location.href = data.data.mweb_url;
        //     } else {

        //     }
        // })
    },

    paySuccess(order_no) {
        window.location.href = location.origin + '/clock/view/v1_0_0/index/paid/1'+_commonQuery()
    },
    initInWxPay(inWxParams, order_no, pay_no,successFn) {
        var self = this;
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function () {
                    self.inWxPay(inWxParams, order_no, pay_no,successFn);
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function () {
                    self.inWxPay(inWxParams, order_no, pay_no,successFn);
                });
                document.attachEvent('onWeixinJSBridgeReady', function () {
                    self.inWxPay(inWxParams, order_no, pay_no,successFn);
                });
            }
        } else {
            self.inWxPay(inWxParams, order_no, pay_no,successFn);
        }
    },
    inWxPay(inWxParams, order_no, pay_no,successFn) {
        var self = this;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            inWxParams,
            function (res) {
                console.log("res.err_msg"+res.err_msg)
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 不验证订单支付状态直接跳转支付成功结果页
                    // typeof self.successFn == 'function' ? self.successFn(order_no) : ''
                    typeof successFn == 'function' ? successFn(order_no) : ''
                    // self.paySuccess(order_no);
                }
                if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    alert('支付取消');
                    typeof self.errorFn == 'function' ? self.errorFn() : history.back();
                    // history.back();
                }
                if (res.err_msg == "get_brand_wcpay_request:fail") {
                    alert('支付失败');
                    typeof self.errorFn == 'function' ? self.errorFn() : history.back();
                    // history.back();
                }
            }
        );
    },
    /* 
     ** 检测订单是否支付成功
     */
    testPay(order_no,pay_no) {
        let self = this;
        let params = {
            // api_url: 'Wap/Order/ordergoodsdetail',
            user_id: authObj.user_id,
            token: authObj.token,
            uuid: authObj.uuid,
            order_no: order_no,
            is_asynchronous: 0
        }
        // alert('order_no:'+order_no);
        // alert('pay_no:'+pay_no);
        let url =`${transpond}/Wap-Order-ordergoodsdetail/showLoading/1`
        httpUtil.get(url, {
            params
        }).then(res => {
            if (data.result == 1 && data.data.payState == 1) {
                alert('支付成功');
                typeof self.successFn == 'function' ? self.successFn(order_no) : ''
                // self.paySuccess(pay_no);
            } else {
                is_weixin() ? history.back() : alert('支付失败');
            }
        })

    },
    // 微信H5支付确认支付弹框

    H5payConfirm() {
        var self = this;
        var payCallBack = JSON.parse(localStorage.getItem('payCallBack'));
        if (payCallBack && payCallBack.order_no && payCallBack.payno && window.location.href.indexOf('returnFrom') >= 0 && getParams('returnFrom') == 'weixin') {
            promptios({
                text: '请在微信内完成支付，如果您已支付成功，请点击“已完成支付”按钮',
                submitText: '确认支付',
                success: function () {
                    self.testPay(payCallBack.order_no, payCallBack.payno);
                }
            })
            // 销毁数据
            // localStorage.removeItem('payCallBack');
        }
    },
}















// function H5pay(obj){
//     this.userInfo = obj;
//     this.orderInfo = {};
// }

// H5pay.prototype.init = function(obj){
//     this.orderInfo = obj;
//     var isWeixin = is_weixin();
//     if(isWeixin){
//         this.getWxPay(this.orderInfo.orderNo, this.orderInfo.orderName, this.orderInfo.payno);
//     }else{
//         this.getH5Pay(this.orderInfo.orderNo, this.orderInfo.orderName, this.orderInfo.payno);
//     }
// }

// // 微信外部浏览器支付接口
// H5pay.prototype.getH5Pay = function(order_no, goods_name, payno){
//     var href = window.location.href;
//     href.indexOf('payBack') < 0 ? href += '/returnFrom/weixin' : '';
//     $.post(baseUrl()+'/Tjj/Wx/unifiedorder', {'order_no': order_no,'goods_name': goods_name, 'trade_type': 'MWEB', redirect_url: href, user_id: this.userInfo.user_id, token: this.userInfo.token, uuid: this.userInfo.uuid,}, function(data){
//         if(data.code == 1){
//             var payCallBack = {
//                 order_no: order_no,
//                 payno: payno
//             };
//             localStorage.setItem('payCallBack', JSON.stringify(payCallBack));
//             window.location.href = data.data.mweb_url;
//         }else{
//             msg(data.message);
//         }
//     },'json')

// }

// // 微信内部浏览器支付接口
// H5pay.prototype.getWxPay = function(order_no, goods_name, payno){
//     var url = 'http://' + window.location.host + baseUrl() + '/Tjj/Wx/unifiedorder/order_no/' + order_no + '/goods_name/' + goods_name + '/trade_type/JSAPI/payno/' + payno + '/user_id/' + this.userInfo.user_id  + '/token/' + this.userInfo.token + '/uuid/' + this.userInfo.uuid;
//     window.location.href = url;
//     // Wxpay.prototype.creatIframe(url);
// }


// /*
// ** 微信内部浏览器支付
//  */

// // 调用绑定 微信支付JSAPI
// H5pay.prototype.initInWxPay = function(inWxParams, order_no, pay_no){
//     // alert('initInWxPay:' + JSON.stringify(inWxParams))
//     // alert('initInWxPay:' + order_no)
//     // alert('initInWxPay:' + pay_no)
//     // alert('initInWxPay:'+order_no)
//     var self = this;
//     if (typeof WeixinJSBridge == "undefined") {
//         if (document.addEventListener) {
//             document.addEventListener('WeixinJSBridgeReady', function(){
//                 self.inWxPay(inWxParams, order_no, pay_no);
//             }, false);
//         } else if (document.attachEvent) {
//             document.attachEvent('WeixinJSBridgeReady', function(){
//                 self.inWxPay(inWxParams, order_no, pay_no);
//             });
//             document.attachEvent('onWeixinJSBridgeReady', function(){
//                 self.inWxPay(inWxParams, order_no, pay_no);
//             });
//         }
//     } else {
//         self.inWxPay(inWxParams, order_no, pay_no);
//     }
// }

// // 微信内部支付支付完后回调响应
// H5pay.prototype.inWxPay = function(inWxParams, order_no, pay_no){
//     // alert('inWxPay:' + JSON.stringify(inWxParams))
//     // alert('inWxPay:' + order_no)
//     // alert('inWxPay:' + pay_no)
//     // alert('inWxPay:'+order_no)
//     var self = this;
//     WeixinJSBridge.invoke(
//         'getBrandWCPayRequest',
//         inWxParams,
//         function (res) {
//             if(res.err_msg == "get_brand_wcpay_request:ok" ){
//                 // 验证订单支付状态后再跳转支付成功结果页
//                 // alert('支付成功');
//                 // waiting('open');
//                 // setTimeout(function(){
//                 //     self.testPay(order_no, pay_no);
//                 // },1500)

//                 // 不验证订单支付状态直接跳转支付成功结果页
//                 // alert('ok:'+pay_no)
//                 self.paySuccess(pay_no);
//             }
//             if(res.err_msg == "get_brand_wcpay_request:cancel" ){
//                 // alert('支付取消');
//                 history.back();
//             }
//             if(res.err_msg == "get_brand_wcpay_request:fail" ){
//                 // alert('支付失败');
//                 history.back();
//             }
//         }
//     );
// }


// /*
// ** 微信外部浏览器支付，H5支付
// */
// H5pay.prototype.outWxPay = function(){

// }

// // 微信H5支付确认支付弹框
// H5pay.prototype.H5payConfirm = function(){
//     var self = this;
//     var payCallBack = JSON.parse(localStorage.getItem('payCallBack'));
//     if(payCallBack && payCallBack.order_no && payCallBack.payno && window.location.href.indexOf('returnFrom') >= 0 && getParams('returnFrom') == 'weixin'){
//         promptios({
//             text: '请在微信内完成支付，如果您已支付成功，请点击“已完成支付”按钮',
//             submitText: '确认支付',
//             success: function(){
//                 self.testPay(payCallBack.order_no, payCallBack.payno);
//             }
//         })
//         // 销毁数据
//         // localStorage.removeItem('payCallBack');
//     }
// }

// // 创建iframe
// H5pay.prototype.creatIframe = function(url){
//     if ($("#payIframe").length == 0) {
//         $("<iframe style='display:none' id='payIframe'></iframe>").prependTo('body');
//     };
//     $("#payIframe").attr("src", url);
// }


// /*
// ** 检测订单是否支付成功
// */
// H5pay.prototype.testPay = function(order_no, pay_no){
//     var self = this;
//     var resultData = {
//         api_url: 'Wap/Order/ordergoodsdetail',
//         user_id: this.userInfo.user_id,
//         token: this.userInfo.token,
//         uuid: this.userInfo.uuid,
//         order_no: order_no,
//         is_asynchronous: 0
//     }
//     // alert('order_no:'+order_no);
//     // alert('pay_no:'+pay_no);
//     $.get(baseUrl()+'/Tjj/Tjj/data/?params_h5='+JSON.stringify(resultData),{},function(data){
//         // alert('data.result:'+data.result);
//         // alert('data.data.payState:'+data.data.payState);
//         // alert('data.data.orderState:'+data.data.orderState);
//         waiting('close');
//         if(data.result == 1 && data.data.payState == 1){
//             msg('支付成功');
//             self.paySuccess(order_no);
//         }else{
//             is_weixin() ? history.back() : msg('支付失败');
//         }
//     },'json')
// }

// /*
// ** 订单支付成功后跳转支付结果页
// */
// H5pay.prototype.paySuccess = function(order_no){
//     // var params_h5 = {
//     //     api_url: 'Order/payResult',
//     //     display_url: 'Order/paySuccess',
//     //     user_id: this.userInfo.user_id,
//     //     token: this.userInfo.token,
//     //     uuid: this.userInfo.uuid,
//     //     pay_no: pay_no,
//     //     is_asynchronous: 1
//     // };
//     // window.location.href = 'http://' + window.location.host + baseUrl() + '/Tjj/Tjj/data?params_h5=' + JSON.stringify(params_h5);
//     // localStorage.setItem('tjj_newBoost','1');
//     var self = this;
//     TrackingIO.payment(order_no, localStorage.getItem('tjj_cart_price'), "CNY", "weixinpay");
//     localStorage.removeItem('tjj_cart_price');
//     sessionStorage.removeItem('isCreated');
//     localStorage.removeItem('free_id');
//     // alert(location.origin + baseUrl()+'/Tjj/Tjj/request/api_url/other-wapStart');
//     $.get(location.origin + baseUrl()+'/Tjj/Tjj/request/api_url/other-wapStart',{},function(res){
//         // alert(JSON.stringify(res));
//         if(res && res.result == 1 && res.userTag == 1){// 新助力
//             window.location.href = 'http://' + window.location.host + baseUrl() + '/Tjj/Tjj/request/display_url/Order-paySuccess_2_14_0/is_asynchronous/1/order_no/'+order_no+'/user_id/'+self.userInfo.user_id+'/token/'+self.userInfo.token+'/uuid/'+self.userInfo.uuid;
//         }else{// 老助力
//             window.location.href = 'http://' + window.location.host + baseUrl() + '/Tjj/Tjj/request/display_url/Order-preSuccess/is_asynchronous/1/order_no/'+order_no+'/user_id/'+self.userInfo.user_id+'/token/'+self.userInfo.token+'/uuid/'+self.userInfo.uuid;
//         }
//     }, 'json')
// }

// export default H5pay;