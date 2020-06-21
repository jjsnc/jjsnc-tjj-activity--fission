<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}
.clearfix:after {
    clear: both;
}
.share-page {
    box-sizing: border-box;
    padding: 15px 10px;
    background-image: linear-gradient(-270deg, #ff7219 0%, #ff0d0d 100%);
    height: fit-content;
    &.active {
        margin-top: 30px;
    }
    .status-main {
        background: #ffffff;
        border-radius: 6px;
        width: 354px;
        margin: 0 auto 10px;
        .header {
            height: 62px;
            .type {
                height: 62px;
                line-height: 62px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .info-details {
                height: 62px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 10px;
                .info {
                    padding-left: 12px;
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-height: 17px;
                    -webkit-box-orient: vertical;
                }
                .my-img {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                }
            }
            .icon {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url("../assets/images/WAITE@2x.png");
                background-size: 20px 20px;

                &.success {
                    background: url("../assets/images/success-pt@2x.png");
                    background-size: 20px 20px;
                }
                &.fail {
                    background: url("../assets/images/fail-pt@2x.png");
                    background-size: 20px 20px;
                }
            }
            .text {
                display: inline-block;
                margin-left: 6px;
                font-size: 20px;
                color: #333333;
                letter-spacing: 0;
                font-weight: bold;
            }
        }
        .goods {
            width: 336px;
            height: 110px;
            margin: 0 auto;
           background: #f9f9f9;
            border-radius: 8px;
            .details {
                box-sizing: border-box;
                 border-radius: 8px;
                padding: 10px 6px;
                display: flex;
                background: #f9f9f9;
                .left {
                    width: 90px;
                    height: 90px;
                    flex: 0 0 90px;
                    .my-img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .right {
                    width: 236px;
                    flex: 1;
                    padding-left: 12px;
                    .text {
                        height: 32px;
                        font-size: 14px;
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .price {
                        font-size: 0;
                        padding: 12px 0 11px;
                        .icon {
                            font-size: 12px;
                            color: #ff0e0d;
                            letter-spacing: 0;
                            transform: scale(0.95);
                        }
                        .number {
                            font-size: 18px;
                            color: #ff0e0d;
                            letter-spacing: 0;
                            font-weight: bold;
                        }
                    }
                    .bottom-area {
                        display: flex;
                        justify-content: space-between;
                        position: relative;
                        .info {
                            font-size: 13px;
                            color: #666;
                            width: 124px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .my-btn {
                            background: linear-gradient(#ff7219, #ff0d0d);
                            display: inline-block;
                            width: 84px;
                            text-align: center;
                            position: absolute;
                            top: -18px;
                            right: 0;
                            color: #fff;
                            border-radius: 4px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .status-detalis {
            .title-3 {
                font-size: 0;
                width: 312px;
                margin: 0 auto;
                padding: 12px 0 14px;
                text-align: center;
                line-height: 17px;
                &.status-2 {
                    padding-top: 0;
                }
                .red-color {
                    font-size: 14px;
                    color: #ff0f0e;
                }
                .icon {
                    font-size: 12px;
                    color: #ff0e0d;
                    letter-spacing: 0;
                    transform: scale(0.95);
                }
                .text {
                    font-size: 14px;
                    color: #151515;
                    font-weight: 300;
                }
            }
        }
        .count-down-sec {
            text-align: center;
            .data-area {
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
            .tips {
                font-size: 13px;
                color: #333333;
                text-align: center;
                line-height: 13px;
                padding: 8px 0 20px;
            }
        }
        .num-count-sec {
            .title-3 {
                padding-bottom: 12px;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
                line-height: 22px;
                font-weight: bold;
                .red-color {
                    color: #ff0f0e;
                }
            }
            .list {
                display: flex;
                padding-bottom: 24px;
                justify-content: center;
                .item-area {
                    text-align: center;
                }
                .item {
                    margin-right: 18px;
                    .my-img {
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                    }
                    .name {
                        padding-top: 6px;
                        font-size: 13px;
                        color: #333333;
                        letter-spacing: 0;
                        text-align: center;
                        max-width: 76px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        &.color-red {
                            color: #ff6632;
                        }
                    }
                }
                .item:last-child {
                    margin-right: 0;
                }
            }
            .btn {
                display: block;
                width: 290px;
                height: 48px;
                line-height: 48px;
                margin: 0 auto;
                text-align: center;
                font-size: 18px;
                border-radius: 22.5px;
                color: #ffffff;
                letter-spacing: 0;
                font-weight: bold;
                &.invite-btn {
                    background-image: linear-gradient(
                        -180deg,
                        #92ea35 0%,
                        #5ccf23 100%
                    );
                }
                &.is-grou-btn {
                    background: linear-gradient(
                        90deg,
                        #ff6632 2%,
                        #ed1400 100%
                    );
                }
                &.success-btn {
                    background: linear-gradient(
                        90deg,
                        #ff6632 2%,
                        #ed1400 100%
                    );
                }
                &.fail-btn {
                    background: linear-gradient(
                        90deg,
                        #ff6632 2%,
                        #ed1400 100%
                    );
                }
            }
            .hack {
                height: 22px;
            }

            .tips {
                padding: 22px 0 12px;
                text-align: center;
                font-size: 13px;
                color: #666666;
                letter-spacing: 0;
                .color-red {
                    color: #ff0e0d;
                }
            }
        }
    }
}
</style>
<template>
    <div class="share-page" :class="{active:isGroup==0 &&  groupStatus==0}">
        <topDanmu :dataObj="danmuData" v-if="isGroup==0 &&  groupStatus==0"></topDanmu>
        <section class="status-main">
            <header class="header">
                <div v-if="groupStatus==0">
                    <div class="type" v-if="isGroup==1">
                        <span class="icon"></span>
                        <span class="text" v-if="isGroup==1">待成团</span>
                    </div>
                    <div v-else class="info-details">
                        <div class="my-img-box">
                            <img
                                class="my-img"
                                width="34"
                                height="34"
                                v-if="groupUserInfo.avatar"
                                :src="groupUserInfo.avatar"
                            >
                            <img class="my-img" v-else src="../assets/images/toux@2x.png">
                        </div>
                        <div class="info">我发起了免单购物，3人成团即可全员免单限时3小时，速抢!</div>
                    </div>
                </div>
                <div v-else-if="groupStatus==1" class="type">
                    <span class="icon success"></span>
                    <span class="text">拼团成功，全员免单</span>
                </div>
                <div v-else-if="groupStatus==2" class="type">
                    <span class="icon fail"></span>
                    <span class="text">拼团失败，订单取消</span>
                </div>
            </header>
            <!-- 成团商品 -->
            <section class="goods">
                <div class="details">
                    <div class="left">
                        <img class="my-img" :src="goodsInfo.goodsImg">
                    </div>
                    <div class="right">
                        <p class="text">{{goodsInfo.goodsName}}</p>
                        <p class="price">
                            <span class="icon">¥</span>
                            <span class="number">{{goodsInfo.goodsPrice}}</span>
                        </p>
                        <div class="bottom-area">
                            <p class="info">{{goodsInfo.number}}人已成功免单</p>
                            <a
                                class="my-btn"
                                 v-bind:style="classObject"
                                @click="toGoods"
                                v-if="groupStatus==0 && isGroup==0 "
                            >免单拼团</a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="status-detalis">
                <h3 class="title-3" v-if="groupStatus==0">
                    <div v-if="isGroup==1">
                        <span class="red-color">2名</span>
                        <span class="text">新用户参团任意商品,</span>
                        <span class="icon">¥</span>
                        <span class="number red-color">{{goodsInfo.goodsPrice}}</span>
                        <span class="text">全额返现至现金账户</span>
                    </div>
                    <div v-else>
                        <span class="red-color">3人成团</span>
                        <span class="text">，拼团成功订单金额全额返现至现金账户</span>
                    </div>
                </h3>
                <h3 class="title-3" v-else-if="groupStatus==1">
                    <div v-if="isGroup==1">
                        <span class="icon">¥</span>
                        <span class="number red-color">{{goodsInfo.goodsPrice}}</span>
                        <span class="text">全额返现至现金账户</span>
                    </div>
                    <div v-else>
                        <span class="icon">¥</span>
                        <span class="number red-color">{{goodsInfo.goodsPrice}}</span>
                        <span class="text">将在订单发货后全额返现至现金账户</span>
                    </div>
                </h3>
                <h3 class="title-3 status-2" v-else-if="groupStatus==2"></h3>
            </section>
            <section class="section count-down-sec" v-if="groupStatus==0 || groupStatus==2">
                <div class="data-area">
                    <span class="num">{{time.h[0]}}{{time.h[1]}}</span>
                    <span class="text">:</span>
                    <span class="num">{{time.m[0]}}{{time.m[1]}}</span>
                    <span class="text">:</span>
                    <span class="num">{{time.s[0]}}{{time.s[1]}}</span>
                </div>
                <div class="tips">后免单特权过期</div>
            </section>
            <section class="section num-count-sec">
                <h3 class="title-3" v-if="groupStatus==0">
                    <span class="text">已有{{joinNum}}人参与，还差</span>
                    <span class="red-color">{{lackNum}}</span>
                    <span class="text">人</span>
                </h3>
                <ul class="list clearfix">
                    <li class="item" :key="index" v-for="(item, index) in  userInfo">
                        <div class="item-area">
                            <img class="my-img" v-if="item.avatar" :src="item.avatar">
                            <img class="my-img" v-else src="../assets/images/toux@2x.png">
                        </div>
                        <h6 class="name">{{item.username || item.nickname}}</h6>
                    </li>
                    <li class="item" :key="index+'1'" v-for="(itme ,index ) in lackNum  ">
                        <div class="item-area">
                            <img class="my-img" src="../assets/images/ICON-DCT@2x.png">
                        </div>
                        <h6 class="name color-red">待参团</h6>
                    </li>
                </ul>
                <div v-if="groupStatus==0">
                    <a
                        href="javaScript:;"
                        class="btn invite-btn"
                        v-if="isGroup==1"
                        @click.stop="share()"
                    >邀新用户参团享免单</a>
                    <a
                        href="javaScript:;"
                        class="btn is-grou-btn"
                        v-if="isGroup==0"
                        @click="goToHome"
                    >更多免单好货</a>
                    <div class="hack" v-if="isGroup==0"></div>
                </div>
                <div v-else-if="groupStatus==1">
                    <a href="javaScript:;" class="btn success-btn" @click="goToHome">更多免单商品</a>
                </div>
                <div v-else>
                    <a href="javaScript:;" class="btn fail-btn" @click="goToHome">更多免单商品</a>
                </div>

                <div class="tips" v-if="groupStatus==0 && isGroup==1">你邀请的好友参团成功也会获得全额返现哦</div>
                <div class="tips" v-if="groupStatus==1">
                    <div v-if="isGroup==1">可前往我的订单查看物流详情</div>
                    <div v-else>
                        可前往<span class="color-red">淘集集App</span>我的订单查看物流详情
                    </div>
                </div>
                <div class="tips" v-if="groupStatus==2">拼团失败，付款金额原路退回</div>
            </section>
        </section>
        <section v-if="isGroup==1 && groupStatus==0">
            <scrollNotice></scrollNotice>
        </section>
        <section v-else-if="isGroup==0 && groupStatus==0" class="guessLike">
            <recommendList :groupStatus="groupStatus" :isGroup="isGroup"></recommendList>
        </section>
        <section v-else>
            <guessLike :groupStatus="groupStatus" :isGroup="isGroup"></guessLike>
        </section>
        <msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>

<script>
import topDanmu from "../components/topDanmu";
import scrollNotice from "../components/scrollNotice";
import msgBox from "@/components/msgBox";
import guessLike from "../components/guessLike";
import recommendList from "../components/recommendList";
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
import { shareDetail, getGroupId, danmuList } from "./../assets/js/api.js";

import { toHome, toGoodsDetail } from "./../assets/js/url.js";
import { countDown } from "./../assets/js/utils.js";
export default {
    name: "share",
    data() {
        return {
            classObject: {
                'height': "32px",
                'line-height': "32px"
            },
            danmuData: [], //弹幕数据
            annual_id: getQueryString("annual_id"),
            msgTxt: "",
            isGroup: 0, // 是否是团主（0：否 1：是）
            user_id: "", // 当前用户的USERID 判断是否是团主 和后端返回的进行比较
            groupStatus: 0, //拼团状态（0：拼团中 1：拼团成功 2：拼团失败）
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
        this.getDanmuData();
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
        // 获取getGroupId
        _getGroupId() {
            let self = this;
            let params = {
                order_no: this.order_no
            };
            this.$http.post(getGroupId, params).then(res => {
                if (res.data && res.data.result == 1) {
                    self.group_id = res.data.group_id;
                    self.group_id == 0 && self._it.next().done == false
                        ? ""
                        : self.getShareDetail();
                } else {
                    self.msgTxt = res.data.message || "获取groupId 失败";
                }
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
                    self.isGroup == 0 ? self.beShared() : ""; //被分享页面埋点
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
        },
        //被分享页面埋点
        beShared() {
            //统计埋点
            let data_s = {
                code: "MD03",
                query: {
                    name: "被分享者页面"
                },
                extra: {
                    param1: 1
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);
        }
    },
    components: {
        scrollNotice,
        msgBox,
        guessLike,
        topDanmu,
        recommendList
    }
};
</script>