<style lang="scss" scoped>
.wrapper-header {
    background: #fffbf3;
    border-radius: 6px;
    width: 22.19rem;
    min-height: 442px;
    // display: none;
    margin: 0 auto;
    overflow: hidden;

    position: relative;
    .position-box {
        position: absolute;
        width: 3.3rem;
        height: 2.6rem;
        background: url(../assets/images/icon_strategy@2x.png) center center
            no-repeat;
        // background: url(../../images/One/icon_strategy@2x.png) center center no-repeat;
        background-size: 100% 100%;
        right: 0.4rem;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 12/16rem;
        color: #ffffff;
        letter-spacing: 0;
        text-align: right;
        line-height: 12/16rem;
    }

    .header-img {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        .img {
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 50%;
            overflow: hidden;
            &:first-child {
                margin-right: 10px;
            }
            img {
                width: 2.75rem;
                height: 2.75rem;
                border-radius: 50%;
            }
        }
    }

    .invite-btn,
    .back-btn {
        width: 18.06rem;
        height: 3rem;
        margin: 0 auto;
        border-radius: 6.25rem;
        background-image: linear-gradient(-180deg, #92ea35 0%, #5ccf23 100%);
        border-radius: 100px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        line-height: 3rem;
        vertical-align: middle;
    }

    .back-btn {
        background-image: linear-gradient(90deg, #ff6632 2%, #ed1400 100%);
        border-radius: 100px;
        letter-spacing: 1.4px;
    }
    .mb40{
        margin-bottom: 40px;
    }
    .icon-success,
    .icon-fail {
        position: relative;
        background: url(../assets/images/icon_success@2x.png) center center
            no-repeat;
        background-size: 5.44rem 4rem;
        height: 4rem;
        width: 5.44rem;
        margin: auto;
        top: 1.81rem;
    }
    .icon-fail {
        background: url(../assets/images/icon_fail@2x.png) center center
            no-repeat;
        background-size: 5.44rem 4rem;
    }
    .pay-success-text,
    .pay-success-fail {
        font-family: PingFangSC-Semibold;
        color: #333333;
        font-size: 20px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        line-height: 20px;
        text-align: center;
        width: 100%;
        margin-top: 30px;
        font-weight: bold;
    }
    // .pay-success-fail,
    // .pay-success-success {
    //     margin-top: 5.94rem;
    // }
    .goods-img-box {
        margin: 1.88rem auto;
        display: flex;
        justify-content: center;
        .goods-img-other {
            margin-left: 15px;
        }
        .goods-img,
        .goods-img-other {
            position: relative;
            width: 6.99rem;
            height: 6.99rem;

            img {
                width: 6.99rem;
                height: 6.99rem;
            }
            .goods-price {
                background: url(../assets/images/label_2@2x.png) center center
                    no-repeat;
                background-size: 2.5rem 1.38rem;
                position: absolute;
                right: 0;
                bottom: 0.49rem;
                width: 2.5rem;
                height: 1.38rem;
                font-size: 1.13rem;
                color: #fff;
                text-align: center;
                .small {
                    font-size: 0.81rem;
                }
            }
        }
    }
    .data-area {
        text-align: center;
        .num {
            display: inline-block;
            width: 24px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            // background-image: url(./../assets/images/icon_bac_djs@2x.png);
            background-color: rgb(51, 51, 51);
            border-radius: 3px;
            font-size: 16px;
            color: #ffffff;
            background-size: contain;
            font-weight: bold;
        }
        .text {
            display: inline-block;
            width: 16px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            font-weight: bold;
            color: #333333;
            vertical-align: top;
        }
    }
    .header-rule {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        line-height: 22px;
        margin-top: 0.88rem;
        em {
            color: #ff5810;
            font-style: normal;
        }
    }
    .fail-msg{
        margin: -15px auto 20px auto;
        text-align: center;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        
    }
    .header-remark {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #757575;
        letter-spacing: 0;
        text-align: center;
        line-height: 18px;
        margin: 0.88rem auto 0 auto;
        max-width: 240px;
    }
}
</style>
<template>
    <div class="wrapper-header" >
        <div class="div position-box" @click="ruleShow=!ruleShow" v-if="groupStatus==0">
            <!-- 拼团攻略 -->
        </div>
        <p class="pay-success-text" v-if="groupStatus==0">还差一步，即可成团</p>
        <div class="icon-success" v-if="groupStatus==1"></div>
        <p class="pay-success-text" v-if="groupStatus==1">1元拼团成功!</p>
        <div class="icon-fail" v-if="groupStatus==2"></div>
        <p class="pay-success-text" v-if="groupStatus==2">1元拼团失败!</p>
        <div class="goods-img-box">
            <div class="goods-img">
                <div class="goods-price">
                    <span class="small">¥</span>1
                </div>
                <img src="../assets/images/TJJ@2x.png">
            </div>
            <div class="goods-img-other" v-if="groupStatus==1">
                <div class="goods-price">
                    <span class="small">¥</span>1
                </div>
                <img src="../assets/images/TJJ@2x.png">
            </div>
        </div>
        <div class="data-area" v-if="groupStatus!=1">
            <span class="num">{{time.h[0]}}{{time.h[1]}}</span>
            <span class="text">:</span>
            <span class="num">{{time.m[0]}}{{time.m[1]}}</span>
            <span class="text">:</span>
            <span class="num">{{time.s[0]}}{{time.s[1]}}</span>
        </div>
        <p class="header-rule" v-if="groupStatus==0">
            邀请
            <em>1名新用户</em>参团任意商品
            即可包邮发货
        </p>
        <p class="header-remark" v-if="groupStatus==2">
            拼团超时已取消发货，支付金额将原路退回 
            下次多邀请些好友哦！
        </p>
        <div class="header-img">
            <div class="img">
                <img src="../assets/images/ICON-DCT@2x.png" alt>
            </div>
            <div class="img">
                <img src="../assets/images/ICON-DCT@2x.png" alt>
            </div>
        </div>
        <p class="fail-msg" v-if="groupStatus==2">未邀请到新用户参团</p>

        <div class="invite-btn" v-if="groupStatus==0" @click="share">邀请1名新用户1元拼团</div>
        <div :class="[groupStatus==1?'back-btn':'back-btn mb40']" v-if="groupStatus!=0" @click="goToHome">1元拼更多商品</div>

        <p class="header-remark" v-if="groupStatus==1">
            可前往
            <font style="color:#e00;">我的订单</font>查看物流详情
        </p>
        <rule :ruleShow="ruleShow"></rule>
    </div>
</template>

<script>
import rule from "../components/rule";
import Wechat_api from "@/assets/js/common/wechat_api.js";
import {
    checkToken,
    is_weixin,
    getQueryString,
    shareToWx,
    getEnvironment,
    userAppPay,
    _getUserInfo
} from "@/assets/js/common/utils.js";
import { shareDetail, getGroupId } from "./../assets/js/api.js";

import { toHome, toGoodsDetail } from "./../assets/js/url.js";
import { countDown } from "./../assets/js/utils.js";
export default {
    name: "myShare",
    components: {
        rule
    },
    data() {
        return {
            classObject: {
                height: "32px",
                "line-height": "32px"
            },
            danmuData: [], //弹幕数据
            annual_id: getQueryString("annual_id"),
            msgTxt: "",
            isGroup: 0, // 是否是团主（0：否 1：是）
            user_id: "", // 当前用户的USERID 判断是否是团主 和后端返回的进行比较
            groupStatus: 2, //拼团状态（0：拼团中 1：拼团成功 2：拼团失败）
            group_id: getQueryString("group_id"), //	拼团ID
            s_user_id: getQueryString("s_user_id"), //发起分享人ID
            order_no: getQueryString("order_no"),
            orderId: "",
            goodsInfo: {},
            joinNum: 0,
            lackNum: 0,
            userInfo: {},
            groupUserInfo: {},
            countDown: 0, //倒计时时间
            time: {
                d: ["0", "0"], // 日
                h: ["0", "0"], // 小时
                m: ["0", "0"], // 分
                s: ["0", "0"] // 秒
            },
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            ruleShow: false
        };
    },
    created() {
        this.userId = _getUserInfo().user_id;
        let self = this;
        if (!!this.order_no) {
            function* fetch() {
                yield setTimeout(function(argument) {
                    self._getGroupId();
                }, 1000);
                yield setTimeout(function(argument) {
                    self._getGroupId();
                }, 1000);
                yield setTimeout(function(argument) {
                    self._getGroupId();
                }, 1000);
            }
            self._it = fetch();
            self._it.next();
        } else {
            this.getShareDetail();
        }
    },
    mounted() {
        // let self=this;
        // new Wechat_api({
        //     shareJson: {
        //         title: "3人成团，全员免单，快来一起免单购物！", // 分享标题
        //         link:`${location.origin}/freeCharge/view/${process.env.VERSION}/index/s_user_id/${self.user_id}/group_id/${self.group_id}`,
        //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //         desc: "免单特权，机不可失！"
        //     },
        //     hideShareType: 1
        // });
    },
    methods: {
        // 获取分享详情
        getShareDetail() {
            let self = this;
            const params = {
                group_id: this.group_id,
                s_user_id: this.s_user_id,
                order_no: this.order_no
            };
            this.$http.get(shareDetail, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    data = data.data;
                    self.countDown = parseInt(data.countDown);
                    self.goodsInfo = data.goodsInfo;
                    self.orderId = data.orderId;
                    self.userId == data.isGroup
                        ? (self.isGroup = 1)
                        : (self.isGroup = 0);
                    self.groupStatus = parseInt(data.groupStatus);
                    // self.isGroup == 0 ? self.beShared() : ""; //被分享页面埋点
                    self.userInfo = data.userInfo;
                    self.joinNum = data.joinNum;
                    self.lackNum = 3 - self.joinNum;

                    self.groupUserInfo = self.userInfo.filter(item => {
                        return item.userId == data.isGroup;
                    })[0];
                    if (self.countDown > 0) {
                        self._contDown(self.countDown);
                    }
                } else {
                    this.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
                console.log("这里需要初始化微信分享数据ok");
                new Wechat_api({
                    shareJson: {
                        title: "3人成团，全员免单，快来一起免单购物！", // 分享标题
                        link: `${location.origin}/freeCharge/view/${
                            process.env.VERSION
                        }/index/s_user_id/${self.s_user_id}/group_id/${
                            self.group_id
                        }`,
                        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        desc: "免单特权，机不可失！"
                    },
                    hideShareType: 1
                });
            });
        },

        _contDown(time) {
            let self = this;
            var time = parseInt(time); // 得到的数据是毫秒
            // var time = parseInt(0); // 得到的数据是毫秒
            if (time > 0) {
                countDown(time, time => {
                    self.time.d = Array.from(String(time.day));
                    self.time.h = Array.from(String(time.hour));
                    self.time.m = Array.from(String(time.minute));
                    self.time.s = Array.from(String(time.second));
                });
            }
        },
        share() {
            //统计埋点
            let self = this;
            let data_s = {
                code: "MD02",
                query: {
                    name: "发起分享页面"
                },
                extra: {
                    param1: self.orderId
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);

            if (this.platForm == 1) {
                let obj = {
                    title:
                        "我发起了免单购物，3人参团，全团免单！限时3小时，快来抢！",
                    content:
                        self.goodsInfo.goodsName +
                        "\n" +
                        "免单特权，机不可失！",
                    shareUrl: `${location.origin}/freeCharge/view/${
                        process.env.VERSION
                    }/index/s_user_id/${self.s_user_id}/group_id/${
                        self.group_id
                    }`,
                    imgUrl: self.goodsInfo.goodsImg
                };
                shareToWx(obj);
            } else {
                // 初始化分享
                let self = this;
                this.msgTxt = "点击右上角···转发给你的好友哦!";
            }
        },
        //  跳转到活动主页
        goToHome() {
            if (this.platForm == 0) {
                this.$router.replace(`${toHome}/isNew/1`);
            } else {
                this.$router.replace(`${toHome}`);
            }
        },
        // 去商品详情页
        toGoods() {
            let self = this;
            this.$router.push(
                `${toGoodsDetail}/goods_id/${
                    self.goodsInfo.goodsId
                }/goods_name/${self.goodsInfo.goodsName}/cate_id/${
                    self.goodsInfo.cateId
                }/isNew/1`
            );
        }
    }
};
</script>