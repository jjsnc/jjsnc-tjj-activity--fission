'use strict'
import httpUtil from '@/api/http'
import {_commonQuery} from '@/assets/js/common/utils';

import {  _getUserInfo,is_weixin } from '@/assets/js/common/utils'

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
// 接口请求公共部分
let baseUrl = `${apiHost}/clock.php${v}`;
// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

const authObj = _getUserInfo();

export default {
    init(payType, orderInfo) {
        if (payType == 'wxpayIn') {
            this.getWxPayIn(orderInfo.order_no, orderInfo.goods_name, orderInfo.payNo);
        } else if (payType == 'wxpayOut') {
            this.getWxPayOut(orderInfo.order_no, orderInfo.goods_name, orderInfo.payNo);
        } else if (payType == 'alipay') {
            this.getAliPay(orderInfo.order_no, orderInfo.goods_name, orderInfo.payNo);
        }
    },
    getWxPayIn(order_no, goods_name, payno) {
        const url = `${baseUrl}/Wx/unifiedorder/order_no/${order_no}/goods_name/${goods_name}/trade_type/JSAPI/payno/${payno}/user_id/${authObj.user_id}/uuid/${authObj.uuid}/token/${authObj.token}`
        window.location.href = url;
    },
    getAliPay(order_no, goods_name, payno) {
        // const url = `${baseUrl}/index.php/Sdjj/alipay/pay/order_no/${order_no}/goods_name/${goods_name}/user_id/${authObj.user_id}/uuid/wap/token/${authObj.token}`
        // window.location.href = url;
    },
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
    initInWxPay(inWxParams, order_no, pay_no) {
        var self = this;
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function () {
                    self.inWxPay(inWxParams, order_no, pay_no);
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function () {
                    self.inWxPay(inWxParams, order_no, pay_no);
                });
                document.attachEvent('onWeixinJSBridgeReady', function () {
                    self.inWxPay(inWxParams, order_no, pay_no);
                });
            }
        } else {
            self.inWxPay(inWxParams, order_no, pay_no);
        }
    },
    inWxPay(inWxParams, order_no, pay_no) {
        var self = this;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            inWxParams,
            function (res) {
                console.log("res.err_msg"+res.err_msg)
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 不验证订单支付状态直接跳转支付成功结果页
                    self.paySuccess(order_no);
                }
                if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    alert('支付取消');
                    history.back();
                }
                if (res.err_msg == "get_brand_wcpay_request:fail") {
                    alert('支付失败');
                    history.back();
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
                self.paySuccess(pay_no);
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
    // creatIframe(url) {
    //     if ($("#payIframe").length == 0) {
    //         $("<iframe style='display:none' id='payIframe'></iframe>").prependTo('body');
    //     };
    //     $("#payIframe").attr("src", url);
    // }

}
