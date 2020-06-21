<style lang="scss" scoped>
.chat-window {
    width: 100%;
    padding: 10px 13px;
    .group-unSuccess {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;

        .user-header-img {
            width: 2.5rem;
            height: 2.5rem;
            overflow: hidden;
            border-radius: 50%;
            img {
                width: 2.5rem;
            }
        }
        .chat-reword {
            position: relative;
            width: 18.69rem;
            height: 5rem;
            // background: url("../../images/One/bg_word@2x.png") center center no-repeat;
            // -webkit-background-size: 18.69rem 5rem;
            // background-size: 18.69rem 5rem;
            background: #fff;
            border: 1px solid #f5a623;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.81rem 0.69rem 0.69rem 1.38rem;
            p {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0.88px;
                line-height: 20px;
                text-overflow: ellipsis;
                width: 16.63rem;
                span {
                    font-size: 14px;
                    color: #ff6632;
                    letter-spacing: 0.88px;
                    line-height: 20px;
                    font-weight: 600;
                }
            }
            .triangle-box {
                position: absolute;
                left: -10px;
                top: 10px;
                .triangle {
                    position: relative;
                    width: 0;
                    height: 0;
                    border-width: 10px 10px 10px 0;
                    border-style: solid;
                    border-color: transparent #f5a623 transparent;
                    &:after {
                        content: "";
                        position: absolute;
                        left: 2px;
                        top: -8px;
                        border-width: 8px 8px 8px 0;
                        border-style: solid;
                        border-color: transparent #fff transparent;
                    }
                }
            }
        }

        .data-area {
            margin: 1.25rem auto;
            text-align: center;
            width: 100%;
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
        .group-status-txt {
            font-weight: bold;
            font-size: 16px;
            color: #7e0000;
            letter-spacing: 0;
            text-align: center;
            line-height: 20px;
            width: 100%;
            margin: -8px auto 20px auto;
        }
        .chat-share-info {
            // margin-top: 1.25rem;
            background: #ffffff;
            border-radius: 4px;
            width: 21.81rem;
            height: 6.88rem;
            padding: 0.63rem;
            display: flex;
            justify-content: space-between;
            .goods-icon {
                width: 5.73rem;
                height: 5.73rem;
                overflow: hidden;
                img {
                    width: 5.73rem;
                    height: auto;
                }
            }

            .goods-title {
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #333333;
                letter-spacing: 0;
                width: 14.31rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .red {
                color: rgba(199, 9, 9, 1);
                font-family: PingFangSC-Medium;
                font-size: 0.75rem;
                color: #ee0000;
                letter-spacing: 0;
                width: 100%;
                text-align: right;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chat-share-info-item {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-between;
                margin-left: 10px;
                flex: 0;
                .goods-con {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    align-items: flex-end;
                    .red {
                        display: flex;
                        flex-flow: column wrap;
                        justify-content: center;
                        align-items: flex-start;
                        font-family: PingFangSC-Medium;
                        font-size: 0.75rem;
                        letter-spacing: 0;
                        text-align: left;
                        line-height: 0.75rem;
                        .money-num {
                            color: #757575;
                        }
                        .people-num {
                            color: #ff6632;
                            margin: 0.6rem 0 0.7rem 0;
                            text-align: left;
                        }
                    }
                    .goods-bt-buy {
                        background-image: linear-gradient(
                            -270deg,
                            #f53917 0%,
                            #ff8232 100%
                        );
                        border-radius: 4px;
                        width: 4.38rem;
                        height: 1.75rem;
                        line-height: 1.75rem;
                        text-align: center;
                        font-size: 14px;
                        color: #ffffff;
                        letter-spacing: 0;
                        box-sizing: content-box;
                        padding: 0 10px;
                        white-space: nowrap;
                    }
                }
            }
        }
        .buy-btn {
            width: 289px;
            height: 48px;
            // background:url('./../../images/One/Button_red@2x.png') center center no-repeat;
            background-image: linear-gradient(
                -270deg,
                #fdeabf 0%,
                #facea0 100%
            );
            border-radius: 22.5px;
            background-size: 100% 100%;
            text-align: center;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: 18px;
            color: #845519;
            letter-spacing: 1.4px;
            text-align: center;
            margin: 34px auto 20px auto;
            line-height: 0.81 * 2+1.56rem;
            vertical-align: middle;
        }
    }
    .group-success {
        background: #fffbf3;
        border-radius: 6px;
        width: 22.19rem;
        min-height: 442px;
        // display: none;
        margin: 0 auto;
        overflow: hidden;
        position: relative;

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

        .back-btn {
            width: 18.06rem;
            height: 3rem;
            margin: 0 auto;
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 0;
            text-align: center;
            line-height: 3rem;
            vertical-align: middle;
            background-image: linear-gradient(90deg, #ff6632 2%, #ed1400 100%);
            border-radius: 100px;
            letter-spacing: 1.4px;
        }

        .icon-success {
            position: relative;
            background: url(../assets/images/icon_success@2x.png) center center
                no-repeat;
            background-size: 5.44rem 4rem;
            height: 4rem;
            width: 5.44rem;
            margin: auto;
            top: 1.81rem;
        }
        .pay-success-text {
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
                    background: url(../assets/images/label_2@2x.png) center
                        center no-repeat;
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
}
</style>
<template>
    <div class="chat-window">
        <div class="group-unSuccess" v-if="groupStatus!=1">
            <div class="user-header-img">
                <img src="../assets/images/ICON-DCT@2x.png" alt class="avatarOne">
            </div>

            <div class="chat-reword">
                <p>
                    我在
                    <span>淘集集App</span>发起了
                    <span class="showPrice"></span>元拼团，你只要1元参团任意商品即可成团发货，限时2小时，速抢！
                </p>
                <div class="triangle-box">
                    <div class="triangle"></div>
                </div>
            </div>

            <div class="data-area">
                <span class="num">{{time.h[0]}}{{time.h[1]}}</span>
                <span class="text">:</span>
                <span class="num">{{time.m[0]}}{{time.m[1]}}</span>
                <span class="text">:</span>
                <span class="num">{{time.s[0]}}{{time.s[1]}}</span>
            </div>
            <div class="group-status-txt" v-if="groupStatus==2">拼团已失效</div>
            <div class="chat-share-info">
                <div class="goods-icon">
                    <img v-lazy class="goodsImg" alt>
                </div>

                <div class="chat-share-info-item">
                    <h1 class="goods-title"></h1>

                    <div class="goods-con">
                        <p class="red">
                            <span class="money-num">
                                原价¥
                                <span class="amountPrice"></span>
                            </span>
                            <span class="people-num">
                                <span class="saleNum"></span>人参与
                            </span>
                        </p>
                        <div class="goods-bt-buy">
                            <span class="showPrice"></span>元拼团
                        </div>
                    </div>
                </div>
            </div>

            <div class="buy-btn" @click="goToHome">
                <span v-if="groupStatus==1">更多1元参团商品</span>
                <span v-if="groupStatus==2">发起1元拼团</span>
            </div>
        </div>
        <div class="group-success" v-if="groupStatus==1">
            <div class="icon-success"></div>
            <p class="pay-success-text">1元拼团成功!</p>
            <div class="goods-img-box">
                <div class="goods-img">
                    <div class="goods-price">
                        <span class="small">¥</span>1
                    </div>
                    <img src="../assets/images/TJJ@2x.png">
                </div>
                <div class="goods-img-other">
                    <div class="goods-price">
                        <span class="small">¥</span>1
                    </div>
                    <img src="../assets/images/TJJ@2x.png">
                </div>
            </div>
            <div class="header-img">
                <div class="img">
                    <img src="../assets/images/ICON-DCT@2x.png" alt>
                </div>
                <div class="img">
                    <img src="../assets/images/ICON-DCT@2x.png" alt>
                </div>
            </div>
            <div class="back-btn" @click="goToHome">1元拼更多商品</div>

            <p class="header-remark">
                可前往
                <font style="color:#e00;">我的订单</font>查看物流详情
            </p>
        </div>
    </div>
</template>

<script>
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
    name: "share",
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
            groupStatus: 1, //拼团状态（0：拼团中 1：拼团成功 2：拼团失败）
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
            platForm: getEnvironment() //平台判断 1、app 2、小程序 0、h5
        };
    },
    created() {},
    mounted() {},
    methods: {

        //获取弹幕信息
        getDanmuData() {
            this.$http.get(danmuList).then(
                res => {
                    if (res.data.result == 1) {
                        this.danmuData = res.data.data;
                    }
                },
                err => {}
            );
        },
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
        },
        //  跳转到活动主页
        goToHome() {
            if (this.platForm == 0) {
                this.$router.replace(`${toHome}/isNew/1`);
            } else {
                this.$router.replace(`${toHome}`);
            }
        }
    },
    components: {}
};
</script>