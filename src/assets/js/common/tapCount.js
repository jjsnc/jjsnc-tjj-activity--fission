import 'whatwg-fetch'
import 'es6-promise'

import {getQueryString,_getUserInfo,_getTjjUuid} from './utils'

/*
* 调用h5埋点
* 示例
*

* type:0:默认事件,1:特定触发条件,2;重要事件,
* data={
*  code:str, //事件编码
*  query:{
*  name:str, //频道
*  title1:str, //一级栏目
*  title2:str //二级栏目
*  title3:str //三级栏目
*  },
*  extra:{
*   param1:str //事件参数
*  }
* }
* posid,1:上次事件的fun_type,2:上次事件event_id
* tapConfig.batchClick(type,data,posid)
*
*
* */

//获取地址栏参数
// function _getQueryString(str) {
//     return getQueryString(str).indexOf('http')>-1?null:getQueryString(str);
// }

var user_info = {
    user_id:getQueryString('user_id')?getQueryString('user_id'):-1,
    uuid:getQueryString('uuid')?getQueryString('uuid'):getQueryString('user_id'),
    version:getQueryString('version')
};

function _getEventId() {
    return new Date().getTime() + user_info.uuid;
}

function _formatUnixtimestamp() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hours = date.getHours();
    if (hours <= 9) {
        hours = "0" + hours;
    }

    var mintes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hours + seperator2 + mintes + seperator2 + second;
    return currentdate;
}

//app端调用
function shareResult(status, os) {
    var shareType = parseInt(window.sessionStorage.getItem("shareType"));//1:转发好友 2:分享单个商品 3:详情页面分享
    var shareData = JSON.parse(window.sessionStorage.getItem("shareData"))
    switch (shareType) {
        case 1:
            shareData.extra.param3 = status;
            tapConfig.batchClick(0, shareData, 0);
            break;
        case 2:
            shareData.extra.param6 = status;
            tapConfig.batchClick(0, shareData, 0);
            break;
        case 3:
            shareData.extra.param8 = status;
            tapConfig.batchClick(0, shareData, window.sessionStorage.getItem("eventid"));
            break;
        case 4:
            shareData.extra.param1 = status;
            tapConfig.batchClick(0, shareData, 0);
            break;
        case 5:
            shareData.extra.param1 = 1;
            shareData.extra.param2 = status;
            tapConfig.batchClick(0, shareData, 0);
            break;
        default:
            break;
    }

}

var myhost = (window.location.href.indexOf("http://fissile.taojiji.com") > -1 || window.location.href.indexOf("https://fissile.taojiji.com") > -1) ? "https://c.taojiji.com" : "https://testc.taojiji.com";

var tapConfig = {
    batchUrl: myhost + "/v1.0.0/h/warehouse/appevent/client/batch/receive",
    batchData:
        {
            "app_market": "-1",//应用市场
            "client_version": user_info.version,//客户端版本
            "client_latitude": null,//纬度
            "client_longitude": null,//经度
            "cpu_id": null,//cpuid
            "device_board": null,//设备主板
            "device_display": null,//设备显示器
            "device_hardware": null,//设备硬件
            "device_iccid": null,//设备iccid
            "device_id": null,//设备唯一编码
            "device_imei": null,//设备imei
            "device_imsi": null,//设备imsi
            "device_meid": null,//设备meid
            "device_model": null,//手机型号
            "device_name": null,//设备名称
            "device_resolution": null,//手机分辨率
            "device_serial": null,//设备序列号
            "login_mode": null,//登录模式
            "network_type": null,//网络类型
            "os_version": null,//设备系统版本
            "wifi_mac": null,//wifi_mac地址
            "event_record": [],
            "platform": "3",//设备平台
            "product_line": "1",//产品线
            "uuid": user_info.uuid//生成唯一编码
        },
    batchAjax: function (callback) {
        this.batchData.event_record = this.getData();
        const self=this;
        // $.ajax({
        //     url: this.batchUrl,
        //     type: "post",
        //     dataType: 'json',
        //     headers: {
        //         "Accept": "application/json;charset=UTF-8"
        //     },
        //     contentType: 'application/json',
        //     async: false,
        //     data: JSON.stringify(this.batchData),
        //     success: function (data) {
        //         callback(data)
        //     }
        // })

        fetch(self.batchUrl,{
            method: 'POST',
            credentials: 'include',
            // mode: 'cors',
            headers:new Headers({
                'Content-Type': 'application/json'
            }),
            body:JSON.stringify(self.batchData)  // 注意 post 时候参数的形式
        }).then(res => res.json()).then(res=>{
            callback(res)
            console.log(res,8888)
        });

    },
    saveData: function (data) {
        window.localStorage.setItem("tapSaveArr", JSON.stringify(data))
    },
    getData: function () {
        if (!!window.localStorage.getItem("tapSaveArr")) {
            return JSON.parse(window.localStorage.getItem("tapSaveArr"))
        } else {
            return [];
        }
    },
    clearData: function () {
        window.localStorage.removeItem("tapSaveArr")
    },
    batchClick: function (type, data, posid) {
        var _this = this
        
        switch (type) {
            default:

                var dataArr = [];
                var pos_id = window.sessionStorage.getItem('prelocation') == null ? -1 : window.sessionStorage.getItem('prelocation');

                var funname = "";
                if (!!data.query.name && data.query.name != null) {
                    var temmArr = []
                    for (var key in data.query) {
                        temmArr.push(data.query[key])
                    }
                    for (var i = 0; i < temmArr.length; i++) {
                        if (i == temmArr.length - 1) {
                            funname += temmArr[i]
                        } else {
                            funname += temmArr[i] + '$_$'
                        }

                    }
                }

                var itemData = {
                    "event_id": _getEventId().toString(),//事件ID
                    "fun_name": funname.toString(),//事件名
                    "fun_type": data.code.toString(),//事件类型
                    "log_time": _formatUnixtimestamp(),//事件事件
                    "pos_id": pos_id.toString(),//位置编码
                    "user_id": user_info.user_id,//用户编码
                    "param1": null,//事件参数
                    "param2": null,//事件参数
                    "param3": null,//事件参数
                    "param4": null,//事件参数
                    "param5": null,//事件参数
                    "param6": null,//事件参数
                    "param7": null,//事件参数
                    "param8": null,//事件参数
                    "param9": null,//事件参数
                    "param10": null,//事件参数
                    "gender": null,//用户性别
                    "is_new_user": null,//是否新客
                    "is_pay_user": null//是否付费用户
                }

                if (!!data.extra && data.extra != null) {
                    for (var key in data.extra) {
                        itemData[key] = data.extra[key].toString()
                    }
                }

                window.sessionStorage.setItem("prelocation", itemData.fun_type)
                dataArr.push(itemData)
                _this.saveData(dataArr)

                _this.batchAjax(function (data) {
                    var i = 0;
                    if (data.code != 10000) {
                        var requestTimer = setInterval(function () {
                            _this.batchAjax(function (data) {
                                if (data.code != 10000) {
                                    i++;
                                    if (i == 3) {
                                        clearInterval(requestTimer)
                                    }
                                } else {
                                    clearInterval(requestTimer)
                                }
                            })
                        })
                    } else {
                        _this.clearData()
                    }
                })
                break
        }
    }

}
export default tapConfig


