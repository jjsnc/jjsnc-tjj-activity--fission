<template>
    <div>
        <topDanmu
            id="topDanmu"
            :dataObj="danmuData"
            v-if="danmuData.length > 0"
            v-show="status==0 && !forgotten"
        ></topDanmu>
        <div class="luck-draw" :class="{'active': status==0 && !forgotten }">
            <header class="header">
                <h1 class="title-1" v-show="status==0 && !forgotten">参与抽奖成功!</h1>
                <h1 class="title-1" v-show="status==1" :class="{active: status==1}">恭喜你抽中了大奖!</h1>
                <h1 class="title-1" v-show="forgotten || status==3 ">很遗憾，你没有中奖</h1>
                <h1 class="title-1" v-show="status==2">抽奖已过期</h1>
                <h3 class="title-6" v-show="status==2">开奖后7天用户未领取</h3>
                <router-link :to="rule_url" tag="div" class="goto-rule">
                    <span class="info">活动 规则</span>
                </router-link>
            </header>
            <section class="section pro-info-sec">
                <div class="img-area">
                    <img :src="goodInfo.goods_img">
                </div>
                <div class="info-area">
                    <h3 class="title-3">{{goodInfo.goods_name}}</h3>
                    <div class="value-area">
                        <span class="text">价值：</span>
                        <span class="value">
                            <span class="icon">￥</span>
                            {{goodInfo.goods_price}}
                        </span>
                        <span class="text num-text">数量：{{goodInfo.goods_num || 1}}</span>
                    </div>
                </div>
            </section>
            <section class="section count-down-sec">
                <h1 class="title-1">- 开奖倒计时 -</h1>
                <div class="data-area">
                    <span class="num">{{time.d[0]}}</span>
                    <span class="text">天</span>
                    <span class="num">{{time.h[0]}}</span>
                    <span class="num">{{time.h[1]}}</span>
                    <span class="text">时</span>
                    <span class="num">{{time.m[0]}}</span>
                    <span class="num">{{time.m[1]}}</span>
                    <span class="text">分</span>
                    <span class="num">{{time.s[0]}}</span>
                    <span class="num">{{time.s[1]}}</span>
                    <span class="text">秒</span>
                </div>
            </section>
            <section class="section parameter-number-sec">
                <span class="text" v-show="status==0 && !forgotten">当前参与人数：</span>
                <span class="number" v-show="status==0 && !forgotten">{{dataInfo.count}}</span>
            </section>
            <section class="section coupon-sec">
                <div class="top">
                    <span class="info">我的抽奖券</span>
                    <span class="tips">已放入我的-优惠券-抽奖券</span>
                </div>
            </section>
            <!-- 用户是否中奖显示区域 -->
            <section class="section prize-sec" :class="forgotten || prizeBGClass[status]">
                <div class="left">
                    <p class="number">编号：{{dataInfo.coupon_id}}</p>
                    <p class="date">开奖时间：{{lottery_time}}</p>
                </div>
                <div class="right">抽奖券</div>
            </section>
            <!-- 今日福星 -->
            <section class="section win-list-sec" v-show=" status!=0 || forgotten ">
                <h1 class="title-1">今日福星</h1>
                <div class="user-info" :key="index " v-for="(item, index) in luckyUserInfo">
                    <div class="left-area">
                        <img v-if="item.avatar" :src="item.avatar">
                        <img v-else src="../assets/images/head_Default@3x.png" alt>
                    </div>
                    <div class="right-area">
                        <P class="name">{{item.nickname || item.username }}</P>
                        <P class="number">编号：{{item.coupon_id}}</P>
                    </div>
                </div>
            </section>
            <section class="section luck-draw-sec" v-show="status!=2">
                <a
                    class="btn lottery-btn"
                    @click="LotteryReminder"
                    v-show="status==0 && !forgotten"
                >开奖提醒</a>
                <a class="btn" @click="getfullLottery" v-show="forgotten || status==3">抽奖</a>
                <a class="btn" @click="showAdd" v-show="status==1">填写收货地址</a>
                <div class="tips" v-show="status==0 && !forgotten">开奖结果会通过系统消息通知，打开提醒以免错失大奖哦</div>
                <div class="tips" v-show="forgotten || status==3">别气馁，小桃送你一次100%中奖的机会</div>
            </section>
            <footer class="footer">
                <a class="go-home-btn btn" v-show="status==2" @click="goHome">返回首页</a>
            </footer>
            <!-- 往期中奖晒单 -->
            <section class="section coupon-sec drying-list-sec" v-show="shareData.length > 0 && status==0 && !forgotten">
                <div class="top">
                    <span class="info">往期中奖晒单</span>
                    <span class="tips">
                        <router-link :to="dryling_url">查看更多</router-link>
                    </span>
                    <span class="icon"></span>
                </div>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li :key="index" class="pic-item" v-for="(pic, index) in shareData">
                            <router-link to="dryingList">
                                <img :src="pic" width="86" height="86">
                            </router-link>
                        </li>
                    </ul>
                </div>
            </section>
            <!-- 推荐列表 -->
            <section
                class="section recommend-list"
                v-show="(forgotten || status==3) || (status==0 && !forgotten)"
            >
                <pullUpBox class="wrapper" :data="items" @loadMore="loadData">
                    <div class="container">
                        <div v-show="items.length < 1" class="empty-data">暂无商品</div>
                        <p class="title-1">精品推荐</p>
                        <ul class="list clearfix">
                            <li
                                v-for="(item, index) in items"
                                :key="index"
                                @click="toShopInfo(item.goodsId)"
                                class="item"
                            >
                                <div class="img-box">
                                    <img v-lazy="item.goodsCover" @click="toShopInfo(item.goodsId)">
                                </div>
                                <h3 class="title-3">{{item.goodsName}}</h3>
                                <div class="info-box">
                                    <span class="value">
                                        <span class="icon">¥</span>
                                        {{item.salePrice}}
                                    </span>
                                    <span class="go-btn" @click="toShopInfo(item.goodsId)">去购买</span>
                                </div>
                            </li>
                        </ul>
                        <!-- <button @click="loadData">下一页</button> -->
                    </div>
                </pullUpBox>
            </section>
        </div>

        <msgBox :msgTxt="msgTxt"></msgBox>
        <!-- 模态框弹出范围 -->
        <Model :modelShow="modelShow"></Model>
        <!-- 小程序弹框 -->
        <SmallProModel :modelShow="smallShow"></SmallProModel>
        <!-- 收货地址 -->
        <addressCheck
            :data="addressData"
            @submitAddress="selectedAddress"
            :addressShow="addressShow"
        ></addressCheck>
        <prompt :promptObj="promptObj"></prompt>
    </div>
</template>

<script >
import pullUpBox from "@/components/pullUpBox";
import BScroll from "better-scroll";
import addressCheck from "./addressCheck";
import prompt from "@/components/prompt";
import msgBox from "@/components/msgBox";
import { toRule, toIndex, toDrylingList } from "./../assets/js/url.js";
import Model from "./model";
import SmallProModel from "./smallProModel";
import {
    recommendList,
    danmuList,
    orderShareImg,
    getAddressList,
    addAddress,
    bindAddAddress,
    editAddress,
    prizeDetail,
    fullLottery,
    scrollPop
} from "./../assets/js/api.js";
import { countDown } from "./../assets/js/utils.js";
import topDanmu from "./topDanmu";
import {
    jump2goods,
    jump2home,
    formatDate,
    getQueryString,
    startPushSet,
    check_login
} from "@/assets/js/common/utils.js";

export default {
    name: "index",
    data() {
        return {
            rule_url: toRule,
            index_url: toIndex,
            dryling_url: toDrylingList,
            danmuData: [], //
            isPrize: true,
            modelShow: false,
            dataInfo: {},
            goodInfo: {},
            luckyUserInfo: [],
            items: [],
            time: {
                d: ["0", "0"], // 日
                h: ["0", "0"], // 小时
                m: ["0", "0"], // 分
                s: ["0", "0"] // 秒
            },
            lottery_time: "", //开奖时间
            status: 0,
            recommendData: [], // 存放推荐列表数据
            addressId: "", // 当前地址
            selectAddressId: "",
            addressShow: false, //地址组件,
            addressData:[],
            coupon_id: "", // 奖券ID
            lottery_id: "", // 活动期数
            promptObj: {
                show: false,
                tittle: "请确认收货地址",
                ptmTxt: "",
                success: this.submieSuccess
            },
            shareData: [], // 往期中奖晒单
            forgotten: false, // 已经开奖用户没有中奖
            prizeBGClass: ["status_0", "status_1", "status_2", "status_3"],
            msgTxt: "",
            smallShow: false, // 控制小程序弹框
            page: 1,
            hasData: true, //页面无数据不显示，只显示加载loading
            isLoadData: true, //是否加载数据
            isAddDone: false, // 中奖用户是否已经填写地址成功
            isNotice: 0 //bc交互交互 手机是否开启通知 1 是 0 否
        };
    },
    mounted() {
        this.$nextTick(() => {
            this._initPics();
        });
        this.getDanmuData();
    },
    created() {
        check_login();
        this.coupon_id = getQueryString("coupon_id") || '';
        this.lottery_id = getQueryString("lottery_id") || '';
        //this.getRecommend();
        this.getCouponDetail();
        //this.getShareData();
        //统计埋点
        // 先判断 ios 还是安卓
        try {
            if (getQueryString("os") == "ios") {
                this.isNotice = getPushStatus();
            } else {
                this.isNotice = Number(JS.getPushStatus());
            }
        } catch (error) {}
    },
    methods: {
         loadData() {
            if(!this.isLoadData){
                this.isLoadData=true;
                this.getRecommend()
            }
            //  this.getRecommend()
        },
        //抽奖券详情
        getCouponDetail() {
            let _this = this;
            let params = {
                coupon_id: _this.coupon_id,
                lottery_id: _this.lottery_id
            };
            this.$http.get(prizeDetail, { params }).then(res => {
                if (res.data.result == 1) {
                    _this.dataInfo = res.data.data;
                    _this.coupon_id = _this.dataInfo.coupon_id;
                    _this.lottery_id = _this.dataInfo.lottery_id;
                    if (!!Number(_this.dataInfo.address_id)) {
                        _this.isAddDone = true;
                    }
                    _this.goodInfo = _this.dataInfo.goods_info;
                    _this.luckyUserInfo = _this.dataInfo.lucky_user;
                    _this.status = _this.dataInfo.status;
                    if(_this.status!=1 || _this.status!=2){
                        this.getRecommend();
                    }
                    if(_this.status==0 && !_this.forgotten){
                        this.getShareData();
                    }
                    _this._contDown(_this.dataInfo.countdown);
                    _this.lottery_time = formatDate(
                        new Date(Number(_this.goodInfo.lottery_time * 1000)),
                        "yyyy-MM-dd"
                    );
                    if (_this.dataInfo === 1) {
                        _this.isPrize = true;
                    }
                } else {
                    _this.msgTxt =
                        (res && res.data && res.data.message) ||
                        "获取抽奖券详情失败";
                }
            });
        },

        // 15-3优惠券
        getfullLottery() {
            //统计埋点
            let data_s = {
                code: "CDJ03_1",
                query: {
                    name: "开奖页面"
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);
            let _this = this;
            let params = {
                coupon_id: this.coupon_id,
                lottery_id: this.lottery_id
            };
            if (_this.status == 3) {
                _this.msgTxt = "您已经领取满减券";
            } else {
                this.$http.get(fullLottery, { params }).then(res => {
                    // result==1 表示用户领取成功 其他表示已经领取 或者失败
                    if (res.data.result == 1) {
                        this.modelShow = true;
                    } else {
                        _this.msgTxt =
                            (res && res.data && res.data.message) ||
                            "获取优惠券失败";
                    }
                });
            }
        },
        // 获取往期晒单数据
        getShareData() {
            let _this = this;
            this.$http.get(orderShareImg).then(res => {
                if (res.data.result == 1) {
                    _this.shareData = res.data.data;
                } else {
                    _this.msgTxt =
                        (res && res.data && res.data.message) ||
                        "往期晒单数据失败";
                }
            });
        },
        //获取精品推荐商品
        getRecommend() {
            let params = {
                page: this.page,
                userType: 2
            };
            this.$http.get(recommendList, { params }).then(res => {
                if (res.data.status == 1) {
                    if (res.data.data.goodsList.length == 20) {
                        this.page++;
                    }
                    let data = res.data.data.goodsList;
                    if(this.items.length<=40&&(this.items.length%20==0)){
                        this.items= this.items.concat(data); 
                    }                  
                    this.isLoadData=false;
                    if(this.items.length<20){
                        this.isLoadData=true;
                    }
                } 
                err => {};
            });
        },
        _contDown(endTime) {
            let _this = this;
            var time = parseInt(endTime); // 得到的数据是毫秒
            // var time = parseInt(0); // 得到的数据是毫秒
            if (Number(_this.status) === 0 && time <= 0) {
                _this.forgotten = true;
            }
            this.typePageBuryingPoint();
            if (time > 0) {
                countDown(time, time => {
                    this.time.d = Array.from(String(time.day));
                    this.time.h = Array.from(String(time.hour));
                    this.time.m = Array.from(String(time.minute));
                    this.time.s = Array.from(String(time.second));
                });
            }
        },
        //获取弹幕信息
        getDanmuData() {
            let params = {
                coupon_id: this.coupon_id,
                lottery_id: this.lottery_id
            };
            this.$http.get(scrollPop, { params }).then(
                res => {
                    if (res.data.result == 1) {
                        this.danmuData = res.data.users;
                    }
                },
                err => {}
            );
        },
        // 往期晒单滚动
        _initPics() {
            if (this.shareData) {
                let picWidth = 86;
                let margin = 6;
                let width =
                    (picWidth + margin) * this.shareData.length - margin;
                this.$refs.picList.style.width = width + "px";
                this.$nextTick(() => {
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true,
                            eventPassthrough: "vertical"
                        });
                    } else {
                        this.picScroll.refresh();
                    }
                });
            }
        },
        //进入商品详情（APP）
        toShopInfo(id) {
            jump2goods(id);
        },
        // 走交互 开奖提醒
        LotteryReminder() {
            let _this = this;
            //统计埋点
            let data_s = {
                code: "CDJ02_1",
                query: {
                    name: "参与抽奖页面"
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);
            if (getQueryString("session_id")) {
                this.smallShow = true;
            } else {
                try {
                    // 先判断 ios 还是安卓
                    if (getQueryString("os") == "ios") {
                        if (!Number(getPushStatus())) {
                            startPushSet();
                        } else {
                            _this.msgTxt = " 已经设置过开奖提醒";
                        }
                    } else {
                        if (!Number(JS.getPushStatus())) {
                            startPushSet();
                        } else {
                            _this.msgTxt = " 已经设置过开奖提醒";
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // 获取用户当前选择的地址
        selectedAddress(selectAddress) {
            console.log(this.promptOb);
            this.promptObj.ptmTxt = selectAddress.addrTxt;
            this.selectAddressId = selectAddress.id;
            this.promptObj.show = true;
        },
        //弹出地址选项
        showAdd() {
            if (this.isAddDone) {
                this.msgTxt = "已经填写收获地址， 平台客服会在48小时内与你确认";
            } else {
                this.addressShow = true;
            }
        },
        // 最终用户选择的发货地址
        submieSuccess() {
            let _this = this;
            let params = {
                address_id: this.selectAddressId,
                coupon_id: this.dataInfo.coupon_id,
                lottery_id: this.dataInfo.lottery_id
            };
            this.$http
                .get(bindAddAddress, { params })
                .then(
                    res => {
                        if (res.data.result == 1) {
                            this.msgTxt =
                                " 领取成功，平台客服会在48小时内联系你确认。";
                            _this.isAddDone = true;
                        } else {
                            this.msgTxt =
                                res.data.message || " 领取失败请联系客服";
                        }
                    },
                    err => {
                        this.msgTxt =
                            res.data.message || " 发生未知错误请刷新重试";
                    }
                )
                .catch(err => {
                    this.msgTxt = " 后台服务器发生未知错误 请稍后重试";
                });
        },
        // 走交互 app 或小程序首页
        goHome() {
            jump2home();
        },
        //  不同页面埋点
        typePageBuryingPoint() {
            // 开奖页面加载
            if (this.forgotten || this.status == 3 || this.status == 2) {
                let data_s = {
                    code: "CDJ03",
                    query: {
                        name: "开奖页面"
                    }
                };
                this.$tapConfig.batchClick(0, data_s, 0);
            } else {
                let data_s = {
                    code: "CDJ02",
                    query: {
                        name: "参与抽奖页面加载"
                    },
                    extra: {
                        param1: this.coupon_id || "",
                        param2: this.isNotice
                    }
                };
                this.$tapConfig.batchClick(0, data_s, 0);
            }
        }
    },
    components: {
        topDanmu,
        Model,
        SmallProModel,
        addressCheck,
        msgBox,
        prompt,
        pullUpBox
    },
    watch: {
        shareData() {
            this.$nextTick(() => {
                this._initPics();
            });
        }
    }
};
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}
.topDanmu#topDanmu {
    background: #fec2a0;
}
.clearfix:after {
    clear: both;
}
.luck-draw {
    background: rgb(252, 227, 207);
    padding: 0 15px 0;
    height: max-content;
    min-height: 100%;
    // transition: all .3s ease;
    &.active {
        padding-top: 30px;
    }
    .header {
        position: relative;
        text-align: center;
        padding-top: 26px;
        padding-bottom: 24px;
        .title-1 {
            font-size: 24px;
            color: #333333;
            line-height: 24px;
            &.active {
                color: #ee0000;
            }
        }
        .title-3 {
            font-size: 12px;
            color: #757575;
            line-height: 12px;
        }
        .title-6 {
            font-size: 12px;
            color: #757575;
            letter-spacing: 0;
            text-align: center;
            padding-top: 8px;
        }
        .goto-rule {
            display: inline-block;
            position: absolute;
            top: 50%;
            right: 0;
            width: 36px;
            height: 36px;
            transform: translateY(-50%);
            border-radius: 50%;
            background: #f95a4f;
            color: #fff;
            text-align: center;
            .info {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                display: inline-block;
                font-size: 12px;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    }
    .pro-info-sec {
        border-radius: 4px;
        height: 100px;
        background: #fff;
        display: flex;
        .img-area {
            flex: 0 0 100px;
            text-align: center;
            line-height: 100px;
            img {
                width: 36px;
                height: 72px;
            }
        }
        .info-area {
            padding: 16px 0 0 0;
            flex: 1;
            width: 245px;
            .title-3 {
                font-size: 16px;
                color: #333333;
                // line-height: 16px;
                font-weight: bold;
                padding-bottom: 25px;
                overflow-x: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .value-area {
                display: flex;
                align-items: baseline;
                .text {
                    font-size: 14px;
                    color: #757575;
                    line-height: 14px;
                }
                .value {
                    font-size: 24px;
                    color: #ee0000;
                    font-weight: bold;
                    width: 116px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .icon {
                        font-size: 14px;
                        font-weight: bold;
                    }
                }
                .num-text {
                    flex: 1;
                    text-align: right;
                    padding-right: 18px;
                }
            }
        }
    }
    .win-list-sec {
        padding-top: 20px;
        .title-1 {
            font-size: 18px;
            color: #333333;
            letter-spacing: 1.12px;
            line-height: 18px;
            font-weight: bold;
            padding-bottom: 16px;
        }
        .user-info {
            display: flex;
            .left-area {
                flex: 0 0 50px;
                text-align: left;
                line-height: 36px;
                img {
                    width: 36px;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 50%;
                }
            }
            .right-area {
                flex: 1;
                padding-bottom: 26px;
                .name {
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 1.03px;
                    line-height: 16px;
                    font-weight: 500;
                    padding-bottom: 8px;
                }
                .number {
                    font-size: 12px;
                    color: #999999;
                    letter-spacing: 0.77px;
                    line-height: 12px;
                }
            }
        }
    }
    .count-down-sec {
        padding: 20px 0 0;
        text-align: center;
        .title-1 {
            font-size: 16px;
            color: #333333;
            letter-spacing: 1px;
            line-height: 16px;
            padding-bottom: 16px;
        }
        .data-area {
            .num {
                display: inline-block;
                width: 25px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background-image: url(./../assets/images/icon_bac_djs@2x.png);
                background-color: #523b35;
                border-radius: 3px;
                font-size: 28px;
                color: #ffffff;
                background-size: contain;
            }
            .text {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: #333333;
                vertical-align: top;
            }
        }
    }
    .parameter-number-sec {
        text-align: center;
        padding: 17px 0 26px;
        .text {
            font-size: 14px;
            color: #333333;
            line-height: 14px;
        }
        .number {
            font-size: 14px;
            color: #f00;
            line-height: 14px;
            font-weight: bold;
        }
    }
    .coupon-sec {
        padding-bottom: 20px;
        .top {
            display: flex;
            align-items: center;
            .info {
                font-size: 18px;
                color: #333333;
                font-weight: bold;
                flex: 0 0 110px;
            }
            .tips {
                font-size: 12px;
                color: #757575;
                letter-spacing: 0.75px;
                line-height: 18px;
                flex: 1;
                text-align: right;
            }
            .tips a {
                flex: 1;
                text-align: right;
                font-size: 12px;
                color: #757575;
            }
        }
    }
    .drying-list-sec {
        padding-bottom: 20px;
        .top {
            display: flex;
            padding-bottom: 16px;
            .info {
                font-size: 18px;
                color: #333333;
                font-weight: bold;
                flex: 0 0 110px;
            }
            .tips {
                flex: 1;
                text-align: right;
                font-size: 12px;
                color: #757575;
                padding-right: 4px;
                padding-top: 5px;
            }
            .icon {
                display: inline-block;
                margin-top: 3px;
                width: 7px;
                height: 10px;
                background-image: url(./../assets/images/cart_more_icon@3x.png);
                background-size: 7px 10px;
            }
        }
        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .pic-list {
                font-size: 0;
                .pic-item {
                    display: inline-block;
                    margin-right: 6px;
                    width: 86px;
                    height: 86px;
                    &:last-child {
                        margin: 0;
                    }
                }
            }
        }
    }
    .prize-sec {
        position: relative;
        height: 90px;
        background-image: url("./../assets/images/icon_cjq_wzj@3x.png");
        background-size: cover;
        border-radius: 4px;
        display: flex;
        box-sizing: border-box;
        &.status_0 {
            background-image: url("./../assets/images/icon_cjq_ylq@3x.png");
        }
        &.status_1 {
            background-image: url("./../assets/images/icon_cjq_zj@3x.png");
        }
        &.status_2 {
            background-image: url("./../assets/images/icon_cjq_zj@3x.png");
        }
        .left {
            padding: 30px 0 0 20px;
            flex: 150px;
            .number {
                font-size: 14px;
                color: #757575;
                line-height: 14px;
                padding-bottom: 8px;
            }
            .date {
                font-size: 12px;
                color: #757575;
                line-height: 12px;
            }
        }
        .right {
            flex: 1;
            text-align: center;
            line-height: 80px;
            font-size: 22px;
            color: #ffdcca;
            letter-spacing: 1.22px;
            text-align: center;
        }
    }
    .luck-draw-sec {
        // padding-top: 22px;
        padding-bottom: 26px;
        .btn {
            display: block;
            width: 100%;
            height: 46px;
            line-height: 46px;
            text-align: center;
            background-image: linear-gradient(-90deg, #fe603d 0%, #fd3725 100%);
            border-radius: 4px;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 1.4px;
            cursor: pointer;
            box-shadow: 0 3px 6px 0 rgba(165, 59, 48, 0.29);
            border-radius: 4px;
            font-weight: 600;
        }
        .lottery-btn {
            margin-top: 15px;
        }
        .tips {
            padding-top: 12px;
            font-size: 12px;
            color: #757575;
            letter-spacing: 0;
            text-align: center;
            line-height: 12px;
        }
    }
    .footer {
        .go-home-btn {
            display: block;
            height: 46px;
            line-height: 46px;
            text-align: center;
            background-image: linear-gradient(-90deg, #fe603d 0%, #fd3725 100%);
            border-radius: 4px;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 1.4px;
            cursor: pointer;
        }
    }
}
.recommend-list {
    background: #fce3cf;
    box-sizing: border-box;
    padding: 0 8px;
    margin-left: -15px;
    margin-right: -15px;
    padding-bottom: 25px;
    .title-1 {
        font-size: 18px;
        color: #333333;
        letter-spacing: 1.12px;
        line-height: 18px;
        font-weight: bold;
        padding-bottom: 16px;
        padding-left: 5px;
    }
    .list {
        background: #ffffff;
        border-radius: 4px;
        padding-top: 10px;
        .item {
            width: 46%;
            min-height: 165px;
            height: 260px;
            float: left;
            margin-left: 2.5%;
            margin-bottom: 10px;
            .img-box {
                width: 165px;
                height: 165px;
                line-height: 165px;
                text-align: center;
                overflow: hidden;
                // background: #f0eeea;
                img {
                    width: 165px;
                }
            }
            .title-3 {
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                line-height: 1.4rem;
                padding-right: 5px;
                padding-top: 6px;
                font-weight: 400;
                background: #fff;
                width: 165px;
                height: 20%;
                min-height: 45px;
                margin: auto;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .info-box {
                padding-top: 12px;
                display: flex;
                .value {
                    flex: 1;
                    height: 26px;
                    line-height: 26px;
                    color: #ee0000;
                    font-weight: bold;
                    .icon {
                        font-size: 10px;
                    }
                }
                .go-btn {
                    width: 66px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    background-image: linear-gradient(
                        -90deg,
                        #fe603d 0%,
                        #fd3725 100%
                    );
                    border-radius: 2px;
                    font-size: 12px;
                    color: #ffffff;
                }
            }
        }
    }
}
</style>