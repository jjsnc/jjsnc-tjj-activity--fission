<template>
    <div :class="['goodsDetail', haveData ? 'haveData' : '']">
        <!-- 顶部弹幕 -->
        <scrollDanmu :dataObj="danmuData" v-if="danmuData.length > 0"></scrollDanmu>
        <div class="goodsDetail-box">
            <!-- 轮播 -->
            <banner :banners="banners"></banner>
            <!-- 商品信息 -->
            <div class="goods-info">
                <div
                    :class="['goods-info-top',goodsData.section < 0 ? 'red':'', goodsData.section > 0 ? 'green' : '', noStock ? 'grey' : '' ]"
                >
                    <div class="goods-info-price">
                        <div class="now-price">
                            <span>¥</span>
                            {{goodsData.minPrice}}
                        </div>
                        <div class="price-other">
                            <div v-if="noStock" class="old-price">
                                <span>¥</span>
                                {{goodsData.shopPrice}}
                            </div>
                            <div
                                v-if="!noStock&&goodsData.section<0"
                                class="old-price old-price-red"
                            >
                                <span>¥</span>
                                {{goodsData.shopPrice}}
                            </div>
                            <div
                                v-if="!noStock&&goodsData.section>0"
                                class="old-price old-price-green"
                                style="padding-top: 18px;"
                            >
                                <span>¥</span>
                                {{goodsData.shopPrice}}
                            </div>
                            <div
                                v-if="!noStock&&goodsData.section<0||noStock"
                                class="bigNumber"
                            >{{goodsData.snag }}</div>
                        </div>
                    </div>
                    <div class="goods-info-other">
                        <div class="data-area">
                            <span v-if="!noStock">
                                <span class="num">{{time.h[0]}}{{time.h[1]}}</span>
                                <span class="text">:</span>
                                <span class="num">{{time.m[0]}}{{time.m[1]}}</span>
                                <span class="text">:</span>
                                <span class="num">{{time.s[0]}}{{time.s[1]}}</span>
                            </span>
                            <span class="num" v-if="!noStock&&goodsData.section<0">后恢复原价</span>
                            <span class="num" v-if="!noStock&&goodsData.section>0">后开抢</span>
                            <span class="num" v-if="noStock">本商品已被抢完</span>
                        </div>
                        <div class="progress-bar" style="width:132px">
                            <div class="bg" style="width:132px"></div>
                            <div class="pro" v-bind:style="{ width: calculatedWidth(goodsData.progressBar)+ 'px',maxWidth: '132px',background:noStock ? '#747474' : ''}" v-if="noStock||goodsData.section<0"></div>
                            <div
                                class="text"
                                v-if="!noStock&&goodsData.section<0"
                                v-bind:style="{ verticalCenter14, left: calculatedWidth(goodsData.progressBar)/4 + 6 +'px' }"
                            >已抢{{parseInt(goodsData.progressBar*100)}}%</div>
                            <div
                                class="text"
                                v-if="!noStock&&goodsData.section>0"
                                v-bind:style="verticalCenter14"
                                style="left:0;width:132px;text-align:center"
                            >{{goodsData.startTime | getMonth}}月{{goodsData.startTime | getDate}}日{{goodsData.startTime | getHour}}:00点开抢</div>
                            <div
                                class="text"
                                v-if="noStock"
                                v-bind:style="verticalCenter14"
                                style="left:50px"
                            >100%</div>
                            <!-- <div class="percentage">
                                <span class="conduct" v-if="item.progressBar<1" >{{item.progressBar*100}}%</span>
                                <span class="over" v-else>100%</span>
                            </div>-->
                        </div>
                    </div>
                </div>
                <div class="goods-info-bottom">
                    <div class="goods-name">{{goodsData.goodsName}}</div>
                    <div class="goods-info-group">
                        <div
                            class="gain"
                            style="line-height: 20px;height: 20px;"
                        >赚¥{{goodsData.gain}}</div>
                        <div class="group-num">{{goodsData.groupNumber}}</div>
                    </div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="comment" style="display: block;" v-if="bask_info && bask_info.baskNum > 0">
                <div class="comment-title">
                    <span>宝贝评价{{bask_info.baskNum ? '('+bask_info.baskNum+')' : ''}}</span>
                    <!-- <span onclick="msg('请在APP中查看全部评论')">查看全部</span> -->
                </div>
                <!-- <ul class="comment-tags">
                    <li>质量很好(113)</li>
                    <li>质量很好(113)</li>
                    <li>质量很好(113)</li>
                </ul>-->
                <ul class="comment-list">
                    <scrollBaskInfo :noticeList="bask_info.baskList"></scrollBaskInfo>
                    <!-- <li v-for="(item, index) in bask_info.baskList" :key="index">
                        <div class="comment-list-title">
                            <div class="comment-list-pic">
                                <img :src="item.avatar" />
                            </div>
                            <div class="comment-list-name">{{item.nikename}}</div>
                            <div class="comment-list-time">{{item.baskTime}}</div>
                        </div>
                        <div class="comment-list-cont">{{item.baskContent}}</div>
                        <div class="comment-pics" v-if="item.baskPic && item.baskPic.length > 2">
                            <div v-for="(itemPic,i) in item.baskPic" :key="i" v-if="i < 3">
                                <img :src="itemPic.thumb123" alt>
                            </div>
                        </div>
                    </li>-->
                </ul>
            </div>
            <!-- 店铺信息 -->
            <div class="shop" v-if="goodsData&&goodsData.storeInfo">
                <div class="icon">
                    <img :src="goodsData.storeInfo.storeIcon">
                </div>
                <div class="info">
                    <div class="title">{{goodsData.storeInfo.storeName}}</div>
                    <div class="other">
                        <span>商品数量: {{goodsData.storeInfo.goodsNum}}</span>
                        <span>{{goodsData.storeInfo.saleNum}}</span>
                    </div>
                </div>
                <div class="enter" @click="toShop(goodsData.storeInfo.storeId)">进店</div>
            </div>

            <!-- 三包服务 -->
            <div class="ensure">
                <div class="ensure_logo">
                    <img :src="goodsData.payImage">
                </div>
            </div>
            <!-- 商品大图 -->
            <div class="goods_img">
                <div v-for="(item, index) in goodsData.image" :key="index">
                    <img v-lazy="item.img640Url" alt style="opacity: 1;">
                </div>
            </div>
            <div class="explain">
                <img :src="goodsData.preGoodsImage">
            </div>
            <recommendList :activityId="nowActivityId"></recommendList>
        </div>
        <!-- 底部按钮 -->
        <footer>
            <div>
                <div class="back-shop" @click.self="backMain">返回抢购会场</div>
                <div :class="['add-goods',noStock ? 'noStock' : '', mySection>0?'mySection':'']" @click="popSku" >
                <!-- <div :class="['add-goods',noStock ? 'noStock' : '',totalStock>0? 'totalStock': '', mySection>0?'mySection':'']" @click="popSku" > -->
                    <div v-if="mySection>0">即将开抢</div>
                    <div class="minPrice" v-if="!noStock">
                        <span>¥</span>
                        {{goodsData.minPrice}}
                    </div>
                    <div class="minPrice" v-else>
                        <span>¥</span>
                        {{goodsData.shopPrice}}
                    </div>
                    <div class="gain" v-if="mySection<0">赚¥{{goodsData.gain}}</div>
                </div>
            </div>
        </footer>
        <msgBox :msgTxt="msgTxt"></msgBox>
        <buySystem
            :goodsData="buyInfo"
            @buySubmit="buySubmit"
            :buyStart="buyStart"
            :numShow="numShow"
        ></buySystem>
    </div>
</template>

<script >
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import {
    getQueryString,
    userAppPay,
    check_login,
    jump2Shop,
    getEnvironment,
    changeTitle,
    _getUserInfo,
    shareToWx
} from "@/assets/js/common/utils.js";
import { countDown } from "../assets/js/utils.js";
import { goodsDetail, orderAdd, danmuList } from "./../assets/js/api.js";
import banner from "@/components/swiper";
import msgBox from "@/components/msgBox";
import Target from '@/assets/js/common/shence';
import buySystem from "../components/buySystem";
import scrollDanmu from "../components/scrollDanmu";
import scrollBaskInfo from "../components/scrollBaskInfo";
import recommendList from "../components/recommendList";
import { toHome } from "./../assets/js/url.js";
export default {
    name: "goodsDetail",
    components: {
        banner,
        msgBox,
        scrollDanmu,
        scrollBaskInfo,
        buySystem,
        recommendList
    },
    data() {
        return {
            haveData: false,
            numShow: true,
            banners: [],
            user_info: _getUserInfo(),
            goodsId: getQueryString("goods_id"),
            buyGoodsId: getQueryString("goods_id"),
            // goodsId: getQueryString('goods_id'),
            msgTxt: "", //提示信息
            goodsData: {}, //商品详情数据
            buyInfo: {}, //购买商品详情数据
            bask_info: {}, //商品评论数据
            activityId: getQueryString("activityId"), // 分类id
            nowActivityId: getQueryString("nowActivityId"), // 抢购进行中活动id
            danmuData: [], //弹幕数据
            countDown: 0, //倒计时时间
            mySection: 0, // 距离活动开始的时间
            noStock: false,
            buyStart: false,
            totalStock: 0, //真实库存信息
            time: {
                d: ["0", "0"], // 日
                h: ["0", "0"], // 小时
                m: ["0", "0"], // 分
                s: ["0", "0"] // 秒
            },
            verticalCenter14: {
                height: "14px",
                "line-height": "14px"
            }
        };
    },
    created() {
        changeTitle(decodeURI(getQueryString("goodsName")));
        let self = this;
        this.getData();
        this.getDanmuData();
        //统计埋点
        let data_s = {
            code: "XS02",
            query: {
                name: "商品详情页"
            }
        };
        this.$tapConfig.batchClick(0, data_s, 0);
    },
    mounted() {
        let _this = this;
      try {
         // 先判断 ios 还是安卓
        if (getQueryString("os") == "ios") {
            window.removePayToUrgency = function() {
                _this.buyStart = false;
                _this.msgTxt = "支付失败";
            };
        } else if (getQueryString("os") == "android") {
            JS.removePayToUrgency = function() {
                _this.buyStart = false;
                _this.msgTxt = "支付失败";
            };
        }
      } catch (error) {
          
      }
      this.shence = new Target({
            "dom":"",
            "productDom":"",
            "data":"",
        });
    },
    methods: {
        // 获取商品详情信息
        getData() {
            let self = this;
            const params = {
                goodsId: this.goodsId,
                activityId: this.activityId
            };
            // this.$http.get("https://result.eolinker.com/j4yysNac97f0146be49fab39a980d6b39622e8e166aae08?uri=http://192.168.30.128:8103/goodsDetail",{params}).then(res => {
            this.$http.get(goodsDetail, { params }).then(res => {
                let data = res.data;
                console.log(data.data, "3333");
                if (data && data.status == 1) {
                    this.goodsData = data.data;
                    this.buyInfo = data.data;
                    this.bask_info = data.data.baskInfo;
                    self.totalStock = data.data.totalStock;
                    self.mySection = data.data.section;

                    if (parseInt(data.data.section) < 0) {
                        this.countDown =
                            parseInt(data.data.endTime) -
                            parseInt(data.data.currentTime);
                    } else {
                        this.countDown = data.data.section;
                    }
                    this.banners = this.goodsData.album.map(item => {
                        return item.img640Url;
                    });
                    this.haveData = true;
                    this.noStock = data.data.predefined == 1 ? true : false;
                    if (self.countDown > 0) {
                        self._contDown(self.countDown);
                    }
                   this.shence.commodityDetailTrack({
                        goodsDetailType:'活动商详页_限时秒杀',
                        refer:  getQueryString("referPage") ||'活动页限时秒杀',
                        commodityID: this.goodsData.goodsId,
                        commodityName: this.goodsData.goodsName,
                        firstCommodity: "",
                        secondCommodity: "",
                        commodityNumber:'1',
                        pricePerCommodity: this.goodsData.minPrice,
                        storeID:'',
                        storeName: '',
                    }) 
                    eventTrack( {
                        funType: 'h5',
                        pageName: 'activity_detail',
                        elementId: 'pv',
                        eventType:'view',
                        activityTitle:'限时抢购',
                        goodsId:this.goodsData.goodsId,
                        goodsName:this.goodsData.goodsName,
                        firstPage:'flashsale'
                    })
                } else {
                    this.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },

        //获取弹幕信息
        getDanmuData() {
            this.$http.get(danmuList).then(
                res => {
                    if (res.data.status == 1) {
                        this.danmuData = res.data.data;
                    }
                },
                err => {}
            );
        },
        // 返回店铺操作
        backMain() {
            // this.$router.go(-1);
            this.$router.replace(`${toHome}`);
        },
        _contDown(time) {
            let self = this;
            var time = parseInt(time); // 得到的数据是毫秒
            // var time = parseInt(0); // 得到的数据是毫秒
            if (time > 0) {
                countDown(time, time => {
                    // self.time.d = Array.from(String(time.day));
                    // self.time.h = Array.from(String(time.hour));
                    self.time.h = Array.from(
                        String(Number(time.hour) + Number(time.day) * 24)
                    );
                    self.time.m = Array.from(String(time.minute));
                    self.time.s = Array.from(String(time.second));
                });
            }
        },
        //规格弹框
        popSku() {
            //统计埋点
            let data_s = {
                code: "XS03",
                query: {
                    name: "购买"
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);
                 eventTrack( {
                    funType: 'h5',
                    pageName: 'activity_detail',
                    elementId: 'buy',
                    eventType:'tap',
                    activityTitle:'限时抢购',
                    activeType: this.goodsData.section>=0 ? 'waiting':'opening',
                    goodsId:this.goodsData.goodsId,
                    goodsName:this.goodsData.goodsName,
                    stockPercent:this.goodsData.progressBar*100 +'%',
                    skuId:'' ,
                    firstPage:'flashsale'
            })
            let isLogin = check_login();
            if (!isLogin) return;
            this.shence.oneBuyTrack({
                commodityID: this.goodsData.goodsId,
                commodityName: this.goodsData.goodsName,
                firstCommodity: "",
                secondCommodity: "",
                pricePerCommodity: this.goodsData.minPrice,
                commodityNumber:'1',
                refer:  getQueryString("referPage") || '活动页限时秒杀',
                currentPage: '活动商详页_限时秒杀',
            })
            // 有没有库存
            if (!this.noStock ) {
                if (this.mySection > 0) {
                    this.msgTxt = "本场抢购还未开始哦";
                } else {
                    this.buyGoodsId = this.goodsId;
                    this.buyStart = true;
                }
            } else {
                this.msgTxt = "暂无库存";
                return;
            }

            // if (this.mySection > 0) {
            //     this.msgTxt = "本场抢购还未开始哦";
            // } else {
            //     if (this.stockNum > 0) {
            //         this.buyGoodsId = this.goodsId;
            //         this.buyStart = true;
            //     } else {
            //         this.msgTxt = "暂无库存";
            //         return;
            //     }
            // }
        },
        // 进店铺
        toShop(id) {
            jump2Shop(id);
        },
        // 创建订单
        createOrder(obj) {
            let self = this;
            let os = getQueryString("os") || "wap";
            let params = {
                version: getQueryString("version"),
                goods_id: this.buyGoodsId,
                spec_id: obj.spec_id,
                address_id: obj.address_id,
                num: obj.num,
                check: 1,
                // share_blessing:obj.share_blessing,
                os: os,
                payment_id: obj.payType,
                cate_id: this.activityId
            };
            this.$http.get(orderAdd, { params }).then(res => {
                let data = res.data;
                if (data["status"] == 1) {
                     eventTrack( {
                        funType: 'h5',
                        pageName: 'pay',
                        elementId: 'choice',
                        eventType:'tap',
                        activityTitle:'限时抢购',
                        goodsId:self.goodsData.goodsId,
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
                        jumpAppPayResult: 1
                    });
                } else {
                    this.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        buySubmit(buyObj) {
            console.log(buyObj);
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
        //计算进度条宽度
        calculatedWidth(num) {
            if (0 < num && num < 0.1) {
                return parseFloat(13);
            } else if(num> 1){
                return 132;
            }else{
                return parseFloat(num * 132);
            }
        }
    },
    filters: {
        getHour(val) {
            return new Date(parseInt(val) * 1000).getHours();
        },
        getMonth(val) {
            return new Date(parseInt(val) * 1000).getMonth()+1;
        },
        getDate(val) {
            return new Date(parseInt(val) * 1000).getDate() ;
            
        },
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
    }
};
</script>

<style scoped lang="scss">
.goodsDetail {
    // height: 100%;
    // overflow-x: hidden;
    opacity: 0;
    // padding-bottom: 80.5px;
    // -webkit-overflow-scrolling: touch;
    &.haveData {
        opacity: 1;
    }
    .goodsDetail-box {
        padding-bottom: 48px;
    }
    .goods-info {
        .red {
            background-image: linear-gradient(-90deg, #ff2743 0%, #ff5f2b 100%);
        }
        .goods-info-top {
            height: 54px;
            padding: 7px 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .now-price {
                font-weight: bold;
                color: #fff;
                font-size: 36px;
                margin-right: 5px;
                span {
                    font-size: 18px;
                }
            }

            .price-other {
                display: flex;
                flex-direction: column;
                color: #fff;
                justify-content: center;
                font-size: 13px;
                .old-price {
                    font-size: 13px;
                    color: #ddd;
                    line-height: 18px;
                    text-decoration: line-through;
                    // visibility: hidden;
                }
                .bigNumber{
                    width: 80px;
                   white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .old-price-red {
                    color: #ffb6b9;
                }
                .old-price-green {
                    color: #b2f4c3;
                }
            }
            .goods-info-price {
                display: flex;
                color: #fff;
            }
            .goods-info-other {
                display: flex;
                flex-direction: column;
                .data-area {
                    color: #f7db6a;
                    text-align: center;
                    .num {
                        display: inline-block;
                        // width: 24px;
                        height: 22px;
                        line-height: 22px;
                        text-align: center;
                        // background-image: url(./../assets/images/icon_bac_djs@2x.png);
                        // background-color: rgb(51, 51, 51);
                        // border-radius: 3px;
                        font-size: 11px;
                        background-size: contain;
                        margin-bottom: 2px;
                    }
                    .text {
                        display: inline-block;
                        // width: 16px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 11px;
                        font-weight: bold;
                        vertical-align: top;
                    }
                }
                .progress-bar {
                    position: relative;
                    width: 132px;
                    height: 14px;
                    .bg {
                        position: absolute;
                        z-index: 1;
                        top: 0;
                        left: 0;
                        width: 130px;
                        height: 14px;
                        line-height: 14px;
                        background: #ff9e2c;
                        border-radius: 7px;
                    }
                    .pro {
                        position: absolute;
                        z-index: 2;
                        width: 92px;
                        height: 14px;
                        background: #f7db6a;
                        border-radius: 7px;
                    }
                    .text {
                        position: absolute;
                        left: 6px;
                        z-index: 3;
                        font-size: 12px;
                        color: #ff3b3a;
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
                        transform: scale(0.92);
                        height: 14px;
                        line-height: 14px;
                        .conduct {
                            color: #804e09;
                        }
                        .over {
                            color: #fff;
                        }
                    }
                }
            }
        }
        .green {
            background-image: linear-gradient(90deg, #52b948 0%, #35cb35 100%);
            .goods-info-other {
                .data-area {
                    color: #095518;
                }
                .progress-bar {
                    .bg {
                        background: #1b9333;
                    }
                    .pro {
                    }
                    .text {
                        color: #fff;
                    }
                }
            }
        }

        .grey {
            background: #999999;
            .goods-info-other {
                .data-area {
                    color: #fff;
                }
                .progress-bar {
                    .bg {
                        background: #747474;
                    }
                    .pro {
                    }
                    .text {
                        color: #fff;
                    }
                }
            }
        }
        .goods-info-bottom {
            background: #fff;
            padding: 10px 15px;
            .goods-name {
                width: 100%;
                // margin-bottom: 1rem;
                font-size: 14px;
                color: #191919;
                line-height: 22px;
                overflow: hidden;
                // text-overflow: ellipsis;
                // white-space: nowrap;
                .icon-11 {
                    width: 4rem;
                    height: 1.06rem;
                    position: relative;
                    top: -0.1rem;
                }
            }
            .goods-info-group {
                display: flex;
                align-items: center;
                margin-top: 10px;
                .gain {
                    background: #ffe6de;
                    border-radius: 2px;
                    font-size: 12px;
                    color: #ee0000;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 20px;
                    height: 20px;
                    padding: 0 6px;
                    margin-right: 10px;
                }
                .group-num {
                    font-size: 11px;
                    color: #999999;
                }
            }
        }
        .open-vip {
            width: 100%;
            height: 2.31rem;
            padding: 0 0.63rem;
            font-size: 0.88rem;
            color: #191919;
            line-height: 2.31rem;
            background-color: #f7f6f2;
            font {
                font-size: 0.88rem;
            }
            div {
                &.open-vip-top {
                    float: left;
                    span {
                        color: rgb(208, 2, 27);
                    }
                }
                &.open-vip-btm {
                    float: right;
                    padding-right: 1.13rem;
                    // background-image: url('../../../images/icon_hy_more@2x.png');
                    background-size: 1.06rem 1.06rem;
                    background-position: right center;
                    background-repeat: no-repeat;
                }
            }
        }
    }
    .comment {
        display: none;
        margin: 10px auto 0;
        background: #fff;
        padding: 0.81rem;
        .comment-title {
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            line-height: 1.31rem;
            span {
                &:first-child {
                    font-size: 15px;
                    color: #333333;
                    font-weight: bold;
                }
                // &:last-child{
                //     font-size: 0.75rem;
                //     color: #FF6632;
                //     &::after{
                //         content: '';
                //         display: inline-block;
                //         width: 0.38rem;
                //         height: 0.68rem;
                //         margin-left: 0.25rem;
                //         background-image: url('./../../assets/images/tenFair/comment_icon_more@3x.png');
                //         background-size: 100% 100%;
                //     }
                // }
            }
        }
        .comment-tags {
            display: -webkit-flex;
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            li {
                -webkit-flex: 0 0 6.88rem;
                flex: 0 0 6.88rem;
                margin-right: 0.58rem;
                margin-top: 0.81rem;
                background: #ffede6;
                border-radius: 0.19rem;
                font-size: 0.81rem;
                line-height: 1.75rem;
                text-align: center;
                color: #333333;
                &:nth-child(3) {
                    margin-right: 0;
                }
            }
        }
        .comment-list {
            margin-top: 0.88rem;
            li {
                margin-bottom: 0.5rem;
                &:last-child {
                    margin-bottom: 0;
                }
                .comment-list-title {
                    display: -webkit-flex;
                    display: flex;
                    -webkit-align-items: center;
                    align-items: center;
                    font-size: 0.75rem;
                    color: #757575;
                    .comment-list-pic {
                        -webkit-flex: 0 0 1.5rem;
                        flex: 0 0 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%;
                        overflow: hidden;
                        img {
                            width: 1.5rem;
                            height: 1.5rem;
                        }
                    }
                    .comment-list-name {
                        -webkit-flex: 1;
                        flex: 1;
                        margin-left: 0.5rem;
                    }
                    .comment-list-time {
                        -webkit-flex: 0 0 4rem;
                        flex: 0 0 4rem;
                        font-size: 0.69rem;
                        text-align: right;
                        color: #999999;
                    }
                }
                .comment-list-cont {
                    margin-top: 0.63rem;
                    font-size: 13px;
                    color: #333333;
                    line-height: 1.13rem;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .comment-pics {
                    width: 100%;
                    margin-top: 0.69rem;
                    display: -webkit-flex;
                    display: flex;
                    div {
                        -webkit-flex: 1;
                        flex: 1;
                        display: block;
                        margin-right: 0.38rem;
                        &:last-child {
                            margin-right: 0;
                        }
                        img {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
    .ensure {
        margin: 10px auto 0;
        background: #fff;
        .ensure_logo {
            width: 100%;
        }
        img {
            // width:23.3%;
            width: 100%;
        }
    }
    .explain {
        width: 100%;
        margin-bottom: 10px;
        img {
            width: 100%;
        }
    }
    .shop {
        margin: 10px auto 0;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 69px;
        padding: 0 13px;
        .icon {
            width: 43px;
            height: 43px;
            img {
                // width:23.3%;
                width: 100%;
            }
        }
        .info {
            flex: 1;
            margin-left: 10px;
            .title {
                font-size: 15px;
                color: #333333;
                font-weight: bold;
            }
            .other {
                font-size: 12px;
                color: #999999;
                margin-top: 8px;
            }
        }
        .enter {
            border: 1px solid #ff6632;
            border-radius: 3px;
            width: 56px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            color: #ff6632;
            font-size: 12px;
        }
    }
    // 商品详情图
    .goods_img {
        padding: 0.81rem 0.81rem;
        margin-top: 10px;
        background-color: #fff;
        img {
            width: 100%;
        }
    }
    // 底部按钮
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        // height: 80.5px;
        font-size: 15px;
        text-align: center;
        line-height: 48.5px;
        div {
            overflow: hidden;
        }
        .footer-tip {
            font-size: 12px;
            line-height: 32px;
            text-align: center;
            color: #ee0000;
            background: #ffe6de;
        }
        .back-shop {
            float: left;
            width: 50%;
            color: #333333;
            background: #ffffff;
            font-weight: bold;
        }
        .add-goods {
            float: left;
            width: 50%;
            height: 48px;
            overflow: hidden;
            color: #ffffff;
            font-weight: bold;
            background: linear-gradient(90deg, #ff7219 0%, #ff0d0d 100%);
            &.noStock {
                background: #999;
            }
            &.noStock.totalStock {
                background: linear-gradient(90deg, #ff7219 0%, #ff0d0d 100%);
            }
            &.totalStock.mySection {
                background: #35cb35;
                display: flex;
                justify-content: center;
                align-items: center;
                .minPrice {
                    padding-top: 2px;
                    margin-left: 10px;
                }
            }
            div {
                // height: 48px;
                line-height: 23px;
                letter-spacing: 0;
                color: #ffffff;
                &.gain {
                    font-size: 13px;
                }
                &.minPrice {
                    line-height: 14px;
                    padding-top: 10px;
                    font-size: 17px;
                    span {
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .cartIcon {
        width: 66px;
        height: 66px;
        position: fixed;
        bottom: 116px;
        right: 10px;
        z-index: 3;
        &.shake {
            -webkit-animation: shake 0.8s 0.6s linear;
            animation: shake 0.8s 0.6s linear;
        }
        img {
            width: 100%;
        }
        p {
            position: absolute;
            left: 0;
            top: 38px;
            width: 100%;
            color: #fff;
            font-size: 11px;
            line-height: 12px;
            text-align: center;
        }
    }
}
@-webkit-keyframes shake {
    0% {
        -webkit-transform: rotateZ(0) scale(1, 1);
    }
    25% {
        -webkit-transform: rotateZ(0) scale(1.1, 1.1);
    }
    50% {
        -webkit-transform: rotateZ(0) scale(0.9, 0.9);
    }
    75% {
        -webkit-transform: rotateZ(0) scale(1.1, 1.1);
    }
    100% {
        -webkit-transform: rotateZ(0) scale(1, 1);
    }
}
@keyframes shake {
    0% {
        transform: rotateZ(0) scale(1, 1);
    }
    25% {
        transform: rotateZ(0) scale(1.1, 1.1);
    }
    50% {
        transform: rotateZ(0) scale(0.9, 0.9);
    }
    75% {
        transform: rotateZ(0) scale(1.1, 1.1);
    }
    100% {
        transform: rotateZ(0) scale(1, 1);
    }
}
.iPhoneX {
    .goodsDetail {
        footer {
            background: #f9f9f9;
            padding-bottom: 20px;
        }
        .goodsDetail-box {
            padding-bottom: 68px;
        }
    }
}
</style>
