


const WxMini={
    // 判断小程序环境
    init:function() {
        wx.miniProgram.getEnv(function (res) {
            console.log('当前是否为小程序环境：', res.miniprogram) // true 
        })  
    },

    // 跳转首页
    jump2home:function () {
        wx.miniProgram.switchTab({
            url: '/pages/home/home'
        })
    },

    // 跳转赚赚首页
    jump2zz:function () {
        wx.miniProgram.switchTab({
            url: '/pages/zz/zz'
        })
    },

    // 跳转登录
    jump2login:function () {
        wx.miniProgram.navigateTo({
            url: '/pages/login/login'
        })
    },

    // 跳转商品详情
    jump2goods:function (goodsId) {
        wx.miniProgram.navigateTo({
            url: '/pages/home/goodsDetail/goodsDetail?linkId=' + goodsId
        })
    },

    // 跳转赚赚的商品详情
    jump2zzgoods:function (goodsId) {
        wx.miniProgram.navigateTo({
            url: '/pages/home/goodsDetail/goodsDetail?linkId=' + goodsId + '&iszhuan=true'
        })
    },
    // 跳转限时抢购的商品详情
    jump2LimitedGoods: function (obj,nowActivityId) {
        wx.miniProgram.navigateTo({
            // url: `/pages/activity/flashSale/goodsDetail/goodsDetail?linkId=${item.goodsId}&title=${item.goodsName}&activityId=${item.activityId}`
               url: '/pages/activity/flashSale/goodsDetail/goodsDetail?linkId='+obj.goodsId+'&title='+obj.goodsName+'&activityId='+obj.activityId+'&nowActivityId='+nowActivityId

        })
    },
    // 打开webview
    openWebview:function (url) {
        wx.miniProgram.navigateTo({
            url: '/pages/webview/webview?linkId=' + url
        })
    },
    // 打开地址列表
    openAddresslist:function (obj) {
        wx.miniProgram.navigateTo({
            url: '/pages/cart/addresslist/addresslist?goods_id=' + obj.goods_id + '&spec_id=' + obj.spec_id + '&num=' +obj.num +'&cate_id=' +obj.cate_id +'&activities='+obj.activities + '&s_user_id=' + obj.s_user_id
        })
    },

    // 发送消息
    sendMsg:function () {
        wx.miniProgram.postMessage({
            data: {
                title: '分享标题',
                path: '分享路径',
                imageUrl: '分享图片',
                pageCode: {
                    page: '00000000'
                }
            }
        })
    }
}

export default WxMini;