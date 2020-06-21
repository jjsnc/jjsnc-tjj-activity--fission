<style lang="scss" scoped>
.home-page {
    background: #f9f9f9;
    .pullUpBox {
        position: relative;
        z-index: 66;
    }
    .wrap {
        padding: 0 12px;
        .nav-wrap {
            margin: 0 -12px;
            box-sizing: border-box;
            padding: 18px 0;
            background: 124px;
            background-image: linear-gradient(#ff2743 0%, #ff5f2b 100%);
        }
        .content-wrap {
            margin-top: -86px;
            .swiper-slide {
                height: 200px;
                overflow: hidden;
                padding: 12px;
                margin: 0 auto;
            }
            .swiper-slide-active {
                height: auto;
            }
            .gap-line {
                height: 10px;
                background: #f9f9f9;
            }
            .hot-section {
                border-radius: 10px;
                padding: 0 12px;
                background: #fff;
                margin-bottom: 10px;
                margin-top: 10px;
                font-weight: bold;
                .info{
                    margin-left: 15px;
                }
                .title-area {
                    display: flex;
                    // justify-content: space-between;
                    padding: 18px 0 6px;
                    .title-3 {
                        font-size: 18px;
                        color: #333333;
                    }
                }
                .list-area {
                    .list {
                        display: flex;
                        justify-content: space-between;
                        .item {
                            width: 76px;
                            text-align: center;
                            .img-area {
                                position: relative;
                                width: 76px;
                                height: 76px;
                                background: #f8f8f8;
                                border-radius: 6px;
                                .my-img {
                                    width: 76px;
                                    height: 76px;
                                    border-radius: 6px;
                                }
                                .info {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    display: block;
                                    width: 40px;
                                    height: 40px;
                                    line-height: 40px;
                                    text-align: center;
                                    background: rgba(117, 117, 117, 0.82);
                                    transform: translate(-50%, -50%);
                                    border-radius: 50%;
                                    font-size: 12px;
                                    color: #ffffff;
                                    .text {
                                        width: 40px;
                                        height: 40px;
                                        line-height: 40px;
                                        font-size: 12px;
                                        display: inline-block;
                                        transform: scale(0.8);
                                    }
                                }
                            }
                            .name {
                                font-size: 14px;
                                color: #666666;
                                padding: 8px 0 6px;
                                width: 76px;
                                height: 30px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .price-area {
                                padding-bottom: 10px;
                                font-size: 0;
                                .icon {
                                    font-size: 12px;
                                    color: #fe3c32;
                                    transform: scale(0.92);
                                }
                                .number {
                                    font-size: 18px;
                                    color: #fe3c32;
                                    font-weight: bold;
                                }
                                .number.number-14 {
                                    font-size: 14px;
                                }
                                .number.number-18 {
                                    font-size: 18px;
                                }
                            }
                        }
                    }
                }
            }
            .remind-section {
                padding: 0 12px;
                border-radius: 10px 10px 0 0;
                margin-top: 10px;
                background: #fff;
                .title-area {
                    display: flex;
                    justify-content: space-between;
                    padding: 18px 0 6px;
                    font-weight: bold;
                    .title-3 {
                        font-size: 18px;
                        color: #333333;
                    }
                    .info {
                        height: 21px;
                        line-height: 21px;
                        .icon {
                            display: inline-block;
                            width: 25px;
                            height: 14px;
                            background: url("../assets/images/set_off@2x.png");
                            background-size: 25px 14px;
                            background-repeat: no-repeat;
                            &.active {
                                background: url("../assets/images/set_on@2x.png");
                                background-size: 25px 14px;
                                background-repeat: no-repeat;
                            }
                        }
                        .text {
                            display: inline-block;
                            font-size: 13px;
                            color: #666666;
                            letter-spacing: 0;
                            text-align: center;
                            height: 14px;
                            line-height: 14px;
                            vertical-align: text-top;
                        }
                    }
                }
            }
            .list-section {
                border-radius: 10px;
                background: #fff;
                // padding: 12px;
                &.active {
                    border-top-right-radius: 0;
                    border-top-left-radius: 0;
                }
                .goods-list {
                    .item {
                        margin-bottom: 16px;
                        display: flex;
                        .left-area {
                            width: 116px;
                            flex: 0 0 116px;
                            background: #d8d8d8;
                            border-radius: 8px;
                            .my-img {
                                width: 116px;
                                height: 116px;
                                background: #d8d8d8;
                                border-radius: 8px;
                            }
                        }
                        .right-area {
                            box-sizing: border-box;
                            widows: 216px;
                            padding-left: 10px;
                            flex: 1;
                            .title-3 {
                                padding-top: 2px;
                                font-size: 13px;
                                width: 200px;
                                color: #666666;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-weight: bold;
                            }
                            .title-6 {
                                height: 18px;
                                font-size: 15px;
                                color: #333333;
                                letter-spacing: 0;
                                margin: 8px 0 18px;
                                width: 200px;
                                overflow: hidden;
                                font-weight: bold;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .progress-bar {
                                position: relative;
                                height: 16px;
                                .bg {
                                    position: absolute;
                                    z-index: 1;
                                    top: 0;
                                    left: 0;
                                    width: 130px;
                                    height: 14px;
                                    line-height: 14px;
                                    background: #ffd394;
                                    border-radius: 7px;
                                }
                                .pro {
                                    position: absolute;
                                    z-index: 2;
                                    width: 92px;
                                    height: 14px;
                                    background: #fe970a;
                                    border-radius: 7px;
                                }
                                .text {
                                    position: absolute;
                                    left: 6px;
                                    z-index: 3;
                                    font-size: 12px;
                                    color: #ffffff;
                                    letter-spacing: 0;
                                    transform: scale(0.92);
                                    height: 14px;
                                    line-height: 14px;
                                }
                                .percentage {
                                    position: absolute;
                                    right: 6px;
                                    z-index: 3;
                                    font-size: 12px;
                                    letter-spacing: 0;
                                    height: 14px;
                                    line-height: 14px;
                                    transform: scale(0.92);
                                    .conduct {
                                        color: #804e09;
                                    }
                                    .over {
                                        color: #fff;
                                    }
                                }
                            }
                            .bottom-area {
                                margin-top: 10px;
                                display: flex;
                                justify-content: space-between;
                                height: 28px;
                                // line-height: 28px;
                                .button-area {
                                    .btn {
                                        display: block;
                                        width: 66px;
                                        text-align: center;
                                        height: 28px;
                                        color: #fff;
                                        position: relative;  
                                        .text{
                                         position: absolute;
                                         left: 2px;
                                         width: 68px;
                                         top: 7px;
                                        }
                                        .text.go{
                                            left: 7px;
                                        }
                                        .text.over{
                                            left: 0px;
                                        }

                                    }
                                    .soon-btn {
                                        width: 70px;
                                        background: linear-gradient(
                                            #52b948 0%,
                                            #35cb35 100%
                                        );
                                        border-radius: 14px;
                                    }
                                    .purchase-btn {
                                        position: relative;
                                        text-align: left;
                                        box-sizing: border-box;
                                        padding-left: 8px;
                                        &::before {
                                            position: absolute;
                                            top: 10px;
                                            right: 9px;
                                            content: "";
                                            display: inline-block;
                                            width: 6px;
                                            height: 6px;
                                            border-top: 1px solid #fff;
                                            border-right: 1px solid #fff;
                                            transform: rotateZ(45deg);
                                        }
                                        background: linear-gradient(
                                            #ff7219 0%,
                                            #ff0d43 100%
                                        );
                                        border-radius: 14px;
                                    }
                                    .over-btn {
                                        background: #cacaca;
                                        border-radius: 14px;
                                    }
                                }
                                .price-area {
                                    font-weight: bold;
                                    line-height: 28px;
                                    .now-price {
                                        &.active {
                                            color: #fe3c32;
                                            .text {
                                                font-size: 22px;
                                                color: #fe3c32;
                                            }
                                        }
                                        font-size: 0;
                                        .icon {
                                            font-size: 12px;
                                            transform: scale(0.95);
                                        }

                                        .text {
                                            font-size: 18px;
                                            color: #333;
                                        }
                                        .text.text-18 {
                                            font-size: 18px;
                                        }
                                        .text-22.text {
                                            font-size: 22px;
                                        }
                                    }
                                    .ori-price {
                                        font-size: 12px;
                                        color: #999999;
                                        font-weight: initial;
                                        margin-left: 3px;
                                        // visibility: hidden;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .empty-data {
            color: #999;
            text-align: center;
            font-size: 16px;
            img {
                width: 204px;
                margin: 30px auto 22px auto;
            }
        }
    }
}
</style>
<template>
    <div class="home-page">
        <div class="wrap">
            <div class="nav-wrap">
                <scrollNav
                    :fixedTop="fixedTop"
                    :navData="navList"
                    ref="navListDOM"
                    @navChange="navChange"
                ></scrollNav>
            </div>
            <pullUpBox class="wrapper" :data="goodsItem" @loadMore="loadData" :noData="noData">
                <div class="content-wrap">
                    <!-- 头部实时热抢区域 -->
                    <div class="hot-section" v-if="pageStatus==1 ">
                        <div class="title-area" v-if="isHotRob">
                            <div class="title-3">实时热抢</div>
                            <div class="info">
                                <scrollNotice></scrollNotice>
                            </div>
                        </div>
                        <section class="list-area" v-if="isHotRob">
                            <ul class="list">
                                <li class="item" :key="index" v-for="(item, index) in welcomeGoods">
                                    <div class="img-area" @click="toGoods(item, index)">
                                        <img
                                            class="my-img"
                                            v-if="item.goodsCover"
                                            v-lazy="item.goodsCover"
                                        >
                                        <img class="my-img" v-else src="../assets/images/1.png">
                                        <div class="info" v-if="item.predefined==1">
                                            <span class="text">已抢完</span>
                                        </div>
                                    </div>
                                    <h6 class="name">{{item.goodsName}}</h6>
                                    <div class="price-area">
                                        <span class="icon">￥</span>
                                        <span
                                            class="number number-18"
                                        >{{item.minPrice | parseInteger}}</span>
                                        <span
                                            class="number number-14"
                                           
                                        >{{item.minPrice  | parseDecimal}}</span>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <!--  提醒内容 -->
                    <section v-else class="remind-section">
                        <div class="title-area">
                            <div class="title-3">
                                {{time.h.join('')}}:{{time.m.join('')}}:{{time.s.join('')}}
                                后开抢
                            </div>
                            <div class="info" v-if="!(platForm ==2)" @click="openPush">
                                <span class="icon" :class="{active: nativePushFlag && currentPushFlag}"></span>
                                <span class="text">提醒我</span>
                            </div>
                        </div>
                    </section>

                    <section class="list-section" :class="{active:pageStatus==0}">
                        <swiperList
                            :datas="goods"
                            :slideIndex="slideIndex"
                            @changeIndex="changeIndex"
                        >
                            <swiper-slide :key="i" v-for="(goodList,i) in goods">
                                <div v-if="goodList">
                                    <ul class="goods-list">
                                        <li
                                            :key="index"
                                            v-for="(item, index) in goodList.goodsList"
                                            @click="toGoods(item, index)"
                                        >
                                            <div class="item">
                                                <div class="left-area">
                                                    <img
                                                        class="my-img"
                                                        v-if="item.goodsCover"
                                                        v-lazy="item.goodsCover"
                                                    >
                                                    <img
                                                        v-else
                                                        class="my-img"
                                                        src="../assets/images/5.png"
                                                    >
                                                </div>
                                                <div class="right-area">
                                                    <h3 class="title-3">{{item.goodsName}}</h3>
                                                    <h6 class="title-6">{{item.description}}</h6>
                                                    <div
                                                        class="progress-bar"
                                                        v-if="pageStatus==1"
                                                        v-bind:style="{ width: baseWidthAda*132 + 'px' }"
                                                    >
                                                        <div class="bg"></div>
                                                        <div
                                                            class="pro"
                                                            v-bind:style="{ width: calculatedWidth(item.progressBar)+ 'px' }"
                                                        ></div>
                                                        <div class="text">{{item.snag}}</div>
                                                        <div class="percentage">
                                                            <span
                                                                class="conduct"
                                                                v-if="item.progressBar<1"
                                                            >{{parseInt(item.progressBar*100)}}%</span>
                                                            <span class="over" v-else>100%</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        v-else
                                                        class="progress-bar"
                                                        v-bind:style="{ width: baseWidthAda*132 + 'px' }"
                                                    ></div>
                                                    <div class="bottom-area">
                                                        <div class="price-area">
                                                            <span
                                                                class="now-price"
                                                                :class="{active: pageStatus==1}"
                                                            >
                                                                <span class="icon">¥</span>
                                                                <span
                                                                    class="text text-22"
                                                                >{{ item.minPrice | parseInteger}}</span>
                                                                <span
                                                                    class="text text-18"
                                                                   
                                                                >{{ item.minPrice | parseDecimal}}</span>
                                                            </span>
                                                            <s class="ori-price">¥{{item.shopPrice}}</s>
                                                        </div>
                                                        <div class="button-area">
                                                            <span v-if="pageStatus==1">
                                                                <a
                                                                    class="over-btn btn"
                                                                    v-if="item.predefined==1"
                                                                    @click.stop="alreadyRobbed(item)"
                                                                >
                                                                 <span class="text over">已抢完</span>
                                                                </a>
                                                                <a
                                                                    class="purchase-btn btn"                                   
                                                                    v-else
                                                                    @click.stop="getGoodsDetails(item,index)"
                                                                >
                                                                  <span class="text go">立即抢</span>
                                                                </a>
                                                            </span>

                                                            <a
                                                                class="soon-btn btn"                               
                                                                v-else-if="pageStatus==0"
                                                                @click.stop="aboutToRush"
                                                            >
                                                             <span class="text">即将开抢</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div v-show="goodList.length < 1" class="empty-data">
                                    <img src="../assets/images/quesheng@2x.png">
                                </div>
                            </swiper-slide>
                        </swiperList>
                    </section>
                </div>
            </pullUpBox>
        </div>
        <!-- 支付系统 -->
        <buySystem
            :goodsData="goodsData"
            @buySubmit="buySubmit"
            :buyStart="buyStart"
            :numShow="numShow"
        ></buySystem>
        <!-- 提示信息 -->
        <msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>
<script>
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import pullUpBox from "@/components/pullUpBox";
import msgBox from "@/components/msgBox";
import Target from '@/assets/js/common/shence';
import scrollNav from "../components/scrollNav";
import { swiperSlide } from "vue-awesome-swiper";
import swiperList from "@/components/swiper.list.vue";
import scrollNotice from "../components/scrollNotice";
import { countDown } from "./../assets/js/utils.js";
import App from "@/assets/js/common/wap.app.js";
import H5Pay from "@/assets/js/common/H5pay";
import { toGoodsDetail } from "./../assets/js/url.js";
import {
    getQueryString,
    check_login,
    shareToWx,
    _getUserInfo,
    userAppPay,
    getEnvironment
} from "@/assets/js/common/utils.js";
import {
    buyingSpree,
    timeFiles,
    orderAdd,
    goodsDetail,
    userSubscriber
} from "./../assets/js/api.js";
import buySystem from "../components/buySystem";
import WxMini from "@/assets/js/common/wx.mini.js";

export default {
    name: "home",
    data() {
        return {
            verticalCenter28: {
                height: "28px",
                "line-height": "28px"
            },
            verticalCenter14: {
                height: "14px",
                "line-height": "14px"
            },
            msgTxt: "",
            goodsData: {}, // 调用商品详情的具体数据
            buyStart: false, //规格地址是否显示
            numShow: true, //规格数量是否显示
            pushFlag: false, // 原生app 消息推送
            nativePushFlag: false, // 原生app 消息推送
            currentPushFlag: false, // 调用接口当前活动 当前是否推送
            fixedTop: {
                flag: true
            },
            cate: 0, //导航分类id
            pageStatus: 0, // 0 即将开抢  1 进行中  已经开抢
            navList: [],
            activityDateList: [],
            slideIndex: 0,
            goods: [], //所有分类的数据和总和
            goodsItem: [], //当前分类具体数据
            activityId: [], // 当前cate_id
            nowActivityId:'',
            activityItem:'',  // 进行中的导航数据item
            welcomeGoods: [],
            page: [], //   当前cate_id 分类
            isLoadData: false, //当前分类是否还需要加载
            time: {
                d: ["0", "0"], // 日
                h: ["0", "0"], // 小时
                m: ["0", "0"], // 分
                s: ["0", "0"] // 秒
            },
            user_info: _getUserInfo(),
            goodsId: "", // 选中商品id
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            countDownTime: "",
            isHotRob: false,
            baseWidthAda: document.documentElement.clientWidth / 375,
            session_id: getQueryString("session_id")|| '',
            noData:false
        };
    },
    filters: {
        parseInteger(value) {
            var value = String(value);
            var arr = value.split(".");
            return arr[0];
        },
        parseDecimal(value) {
            var value = String(value);
            var arr = value.split(".");
            return arr.length > 1 ? "." + arr[1] : "";
        }
    },
    created() {
       
        // 登录
        check_login();
        // 添加埋点
        let _this = this;
        let data_s = {
            code: "XS01",
            query: {
                name: "限时抢购"
            }
        };
        this.$tapConfig.batchClick(0, data_s, 0);
        // 先判断 ios 还是安卓
        try {
            if (getQueryString("os") == "ios") {
                this.nativePushFlag = Number(getPushStatus());
            } else {
                this.nativePushFlag = Number(JS.getPushStatus());
            }
        } catch (error) {}
        this.getTimeScheduleData();
    },
    methods: {
        // 获取导航栏数据
        getTimeScheduleData() {
            let self = this;
            this.$http.get(timeFiles).then(
                res => {
                    res = res.data;
                    let timeList = res.data;
                    for (let i = 0; i < timeList.length; i++) {
                        this.goods.push([]);
                    }
                    let self = this;
                    let nowHours = new Date().getHours();
                    // 距离当前时间即将开抢的数组列表
                    let distanceTimeList = [];
                    //  cate_status 0 即将开抢 1 已开抢  2 抢购进行中
                    if (timeList instanceof Array) {
                        timeList.forEach(item => {
                            item.cate_id = item.id;
                            //即将开抢
                            if (item.currentTime < parseInt(item.startTime)) {
                                item.cate_status = 0;
                            } else {
                                //已经抢购
                                item.cate_status = 1;
                                //   计算每个时间时间距离当前开始时间的差值 准确到小时保留一位小数
                                // item.distanceTime = Math.abs( parseInt(item.activityDate) - new Date(item.currentTime).getHours() );
                                var distanceTime = self.transTime(
                                    Math.abs(item.currentTime - item.startTime)
                                );
                                item.distanceTime =
                                    distanceTime.day * 24 +
                                    distanceTime.hour +
                                    distanceTime.minute / 60;
                                distanceTimeList.push(item.distanceTime);
                            }

                            self.navList.push(item);
                        });
                        //  在进行中取出距离当前时间 时间最近的cate_id
                        var minTime = Math.min.apply(null, distanceTimeList);
                        if (distanceTimeList.length > 0) {
                            self.navList.forEach((item, index) => {
                                if (item.distanceTime == minTime) {
                                    item.cate_status = 2;
                                    self.slideIndex = index;
                                    self.pageStatus = 1;
                                    self.activityId = item.cate_id;
                                    self.nowActivityId=item.cate_id;
                                    self.activityItem = item;
                                    self.isHotRob = true;
                                 // 数据埋点
                                    let flag = true
                                   if(flag){
                                       flag = false;
                                        eventTrack( {
                                            funType: 'h5',
                                            pageName: 'flashsale',
                                            elementId: 'pv',
                                            eventType:'view',
                                            activityTitle:'限时抢购',
                                            time:parseInt(item.activityDate),
                                            firstPage:'flashsale'
                                        })
                                    }   
                                    // 初始化数据
                                    self.getCateIdDetails();

                                }
                            });
                        } else {
                            self.slideIndex = 0;
                            self.pageStatus = 0;
                            self.activityId = self.navList[0].cate_id;
                            // 初始化数据
                            self.getCateIdDetails();
                        }
                    }
                },
                err => {}
            );
        },
        // 获取对应cate_id 的数据列表
        getCateIdDetails() {
            let self = this;
            self.page[self.slideIndex] = self.page[self.slideIndex] || 1;
            let params = {
                activityId: self.activityId,
                page: self.page[self.slideIndex]
            };
            this.$http.get(buyingSpree, { params }).then(
                res => {
                    res = res.data;
                      if(!res.data.goodsList){
                         res.data.goodsList = [];
                     }
                    //  获取当前活动是否进行开启打开提醒0 没有推送
                    self.currentPushFlag = (!!res.data.type) || (!!0);                    
                    self.countDownTime=    parseInt(res.data.startTime) - parseInt(res.data.currentTime);
                    self._contDown(self.countDownTime);
                    if (self.goods[self.slideIndex].length == 0) {
                        self.$set(self.goods, self.slideIndex, res.data);
                    } else {
                        self.goods[self.slideIndex].goodsList = self.goods[
                            self.slideIndex
                        ].goodsList.concat(res.data.goodsList);
                    }
                    self.goodsItem =
                        self.goods[self.slideIndex].goodsList || [];
                    self.welcomeGoods =
                        self.goods[self.slideIndex].welcomeGoods;
                    // 数据埋点
                    eventTrack( {
                        funType: 'h5',
                        pageName: 'flashsale',
                        elementId: 'goods_show',
                        eventType:'view',
                        activityTitle:'限时抢购',
                        activeType: (res.data.startTime - res.data.currentTime) > 0 ? 'waiting':'opening',
                        time:parseInt(res.data.activityDate),
                        timeLag:self.time.h.join(''),
                        loadRank:self.page[self.slideIndex],
                        firstPage:'flashsale'
                    }) 
                    if (
                         res.data.goodsList.length!=0 &&
                        self.goods[self.slideIndex].goodsList.length % 20 == 0
                    ) {
                        self.isLoadData = false;
                        self.page[self.slideIndex]++;
                    } else {
                        self.isLoadData = true;
                        self.noData = true
                    }

                   
                },
                err => {}
            );
        },
        //slider滚动改变navList
        changeIndex(index) {
            this.$refs.navListDOM.navClisk(this.navList[index].cate_id);
        },
        //点击nvaList改变slider
        navChange(cate_id) {
            let self = this;
            if(self.activityId==cate_id){return}
            self.activityId = cate_id;
            // let temp2 = this.navList.find(item => item.cate_id == cate_id);
            let temp = this.navList.filter(item => item.cate_id == cate_id)[0];
            // 这里进行页面状态控制
            if (temp.cate_status == 0) {
                self.pageStatus = 0;
            } else {
                self.pageStatus = 1;
            }
            if (temp.cate_status == 2) {
                this.isHotRob = true;
            } else {
                this.isHotRob = false;
            }
            this.slideIndex = this.navList.indexOf(temp);
            self.goods[self.slideIndex].goodsList= [];
            self.page[self.slideIndex] = 1;
            // 控制倒计时
            self.countDownTime =
                this.navList[this.slideIndex].startTime -
                this.navList[this.slideIndex].currentTime;
            self._contDown(self.countDownTime);
            self.getCateIdDetails();
            // 数据埋点
             eventTrack( {
                funType: 'h5',
                pageName: 'flashsale',
                elementId: 'tab_show',
                eventType:'tap',
                activityTitle:'限时抢购',
                time:parseInt(temp.activityDate),
                timeLag:self.time.h.join(''),
                activeType: self.pageStatus==0 ? 'waiting':'opening',
                firstPage:'flashsale'
            })
        },
        // 倒计时
        //打开消息提醒
        openPush() {
            let self = this;
            let data_s = {
                code: "XS04",
                query: {
                    name: "提醒我"
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);
            let temp =  this.navList.filter(item => item.cate_id == this.activityId)[0];
                  eventTrack( {
                    funType: 'h5',
                    pageName: 'flashsale',
                    elementId: 'subscribe',
                    eventType:'tap',
                    activityTitle:'限时抢购',
                    time: temp.activityDate,
                    firstPage:'flashsale'
         })
         if (!check_login()) return;
         
            try {
                // 先判断 ios 还是安
                if (getQueryString("os") == "ios") {
                    if (!Number(getPushStatus())) {
                        App.startPushSet();
                    } else if (!self.currentPushFlag) {
                        //   这里调用接口
                        this.nativePushFlag=true
                        self.getPushOn();
                    } else {
                        this.msgTxt = "已为你设置好本场提醒哦";
                    }
                } else {
                    if (!Number(JS.getPushStatus())) {
                        App.startPushSet();
                    } else if (!self.currentPushFlag) {
                        //当前没有订阅
                         this.nativePushFlag=true;
                        self.getPushOn();
                    } else {
                        this.msgTxt = "已为你设置好本场提醒哦";
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        _contDown(time) {
            let self = this;
            var time = parseInt(time) || self.countDownTime; // 得到的数据是毫秒
            // var time = parseInt(0); // 得到的数据是毫秒
            if (time > 0) {
                countDown(time, time => {
                    self.time.h = Array.from(
                        String(Number(time.hour) + Number(time.day) * 24)
                    );
                    self.time.m = Array.from(String(time.minute));
                    self.time.s = Array.from(String(time.second));
                });
            }
        },
        //是否加载更多数据
        loadData() {
            if (!this.isLoadData) {
                this.isLoadData = true;
                this.getCateIdDetails();
            }
        },
        //获取商品详情 规格弹框
        getGoodsDetails(item,index) {
            let self = this;
            // 登录
            if (!check_login()) return;
            self.goodsId = item.goodsId;
            if (this.platForm==2) {
                self.toGoods(item,index);
            } else {
              let data_s = {
                code: "XS03",
                query: {
                    name: "购买"
                }
                
            };

            this.$tapConfig.batchClick(0, data_s, 0);

                let params = {
                    activityId: self.activityId,
                    goodsId: item.goodsId
                };
                this.$http.get(goodsDetail, { params }).then(res => {
                    let goods = res.data.data;
                       this.shence.oneBuyTrack({
                            commodityID: goods.goodsId,
                            commodityName: goods.goodsName,
                            firstCommodity: "",
                            secondCommodity: "",
                            pricePerCommodity: goods.minPrice,
                            commodityNumber:'1',
                            refer: getQueryString("referPage") || '淘集集首页',
                            currentPage: '限时秒杀',
                        })
                    let predefined = goods.predefined;
                    // 0  有库存  1 没有库存
                    if (predefined == 0) {
                        self.goodsData = goods;
                        self.goodsData.img320url = self.goodsData.goodsCover;
                        self.buyStart = true;
                    } else {
                        self.msgTxt = "暂无库存";
                    }
                });
            }
        },
        // 创建订单
        buySubmit(buyObj) {
            // if(buyObj["num"]>this.goodsData["limitNum"]){
            //     this.msgTxt=`此商品限购${this.goodsData["limitNum"]}件`;
            //     return
            // }
            // if(buyObj["num"]>this.goodsData["stockNum"]){
            //     this.msgTxt=`库存不足`;
            //     return
            // }
            this.createOrder(buyObj);
        },
        // 创建订单
        createOrder(obj) {
            let self = this;
            let os = getQueryString("os");
            let params = {
                version: getQueryString("version"),
                user_id: this.user_info["user_id"],
                goods_id: self.goodsId,
                spec_id: obj.spec_id,
                address_id: obj.address_id,
                payment_id: obj.payType,
                cate_id: self.activityId,
                num: obj.num,
                os: os
            };
            this.$http.post(orderAdd, params).then(res => {
                let data = res.data;

                if (data["status"] == 1) {
                    eventTrack( {
                        funType: 'h5',
                        pageName: 'pay',
                        elementId: 'choice',
                        eventType:'tap',
                        activityTitle:'限时抢购',
                        goodsId:self.goodsId,
                        skuId: obj.spec_id,
                        type:obj.payType==3? 'wx': 'ali',
                        orderId:data.data.orderNo|| '',
                        goodsName:self.goodsData.goodsName,
                        firstPage:'flashsale'
                    })                    
                    userAppPay({
                        orderNo: data.data.orderNo,
                        goodsName: data.data.orderName,
                        payType: obj.payType,
                        price: data.data.payAmount,
                        linkUrl: "",
                        webLinkUrl: "",
                        jumpAppPayResult: 1,
                        payNo: ""
                    });
                } else {
                    self.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        // 去商品详情页
        toGoods(item, index) {
            let self = this;
            if (this.platForm==2) {
                WxMini.jump2LimitedGoods(item,self.nowActivityId);
            } else {
                let  goodsName=  item.goodsName.replace(/%/g, '%25') || ''
                this.$router.push(
                    `${toGoodsDetail}/goods_id/${item.goodsId}/activityId/${
                        self.activityId
                    }/goodsName/${goodsName}/nowActivityId/${self.nowActivityId}`
                );
            }
            
           // 数据埋点
            eventTrack( {
                funType: 'h5',
                pageName: 'flashsale',
                elementId: 'good_detail',
                eventType:'tap',
                activityTitle:'限时抢购',
                stockPercent: item.progressBar * 100+ '%',
                rankId:index+1,
                activeType: this.pageStatus==0 ? 'waiting':'opening',
                goodsId:item.goodsId,
                goodsName: item.goodsName,
                firstPage:'flashsale'
            })             
        },
        // 即将开抢
        aboutToRush() {
            this.msgTxt = "建议设置本场提醒，以免错过抢购时机哦";
        },
        // 已经抢完
        alreadyRobbed(item) {
            this.toGoods(item);
        },
        //计算进度条宽度
        calculatedWidth(num) {
            let width = parseInt(this.baseWidthAda * 132);
            if(0<num && num <0.1){
            return parseFloat(13);
            }else if(num>1){
              return width;
            }else {
                return parseFloat(num * width);
            }            
        },
        // 时间格式化 转化为小时
        transTime(time) {
            let d = 0; //天数
            let h = 0; //小时
            let m = 0; //分钟
            let s = 0; //秒数
            let day = 0; // 天数

            if (time >= 0) {
                day = Math.floor(time / 60 / 60 / 24);
                h =
                    parseInt(Math.floor((time / 60 / 60) % 24)) +
                    parseInt(d * 24);
                m = Math.floor((time / 60) % 60);
                return {
                    day: day,
                    hour: h,
                    minute: m,
                    second: s
                };
            }
        },
        // 是否需要打卡提醒
        getPushOn() {
            let self = this;
            let params = {
                activityId: self.activityId,
                title:'限时抢购通知',
                content:'你关注的限时抢购场次即将开抢，快来抢购，手慢无',                
                url:  `${location.origin}/flashSale/view/${process.env.VERSION}/home`,
                is_post:1,
                userId: this.user_info["user_id"],
            };
            this.$http.post(userSubscriber,  params ).then(res => {
                let  data =res.data;
                 if(data.data.type==1) {
                    self.currentPushFlag = true ;
                    this.msgTxt = "已为你设置好本场提醒哦";
                }else {
                     this.msgTxt = data.message || '设置本场推送失败';
                }
               
            });
        },
    getCateIdDetailsTime() {
            let self = this;
            this.$http.get(timeFiles).then(
                res => {
                  var   times = res.data.data;
                    // 控制倒计时
                    self.countDownTime =
                        times[this.slideIndex].startTime -
                        times[this.slideIndex].currentTime;
                    self._contDown(self.countDownTime);
                },
                err => {}
            );
        }
    },
    mounted() {
        let self = this;
        // 先判断 ios 还是安卓
        try {
            if (getQueryString("os") == "ios") {
                window.removePayToUrgency = function() {
                    self.buyStart = false;
                    self.$parent.msgTxt = "支付失败";
                };
            } else if (getQueryString("os") == "android") {
                JS.removePayToUrgency = function() {
                    self.buyStart = false;
                    self.$parent.msgTxt = "支付失败";
                };
            }
        } catch (error) {
            console.log(error);
        }
     this.shence = new Target({
            "dom":"",
            "productDom":"",
            "data":"",
        });  
    },
    watch: {
        $route(to, from) {
            if(to.name=='home'){
            this.getCateIdDetailsTime();
          }
        }
    },
    components: {
        scrollNav,
        pullUpBox,
        msgBox,
        swiperSlide,
        swiperList,
        scrollNotice,
        buySystem
    }
};
</script>




