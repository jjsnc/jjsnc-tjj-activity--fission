<template>
    <div class="detail-page">
        <topDanmu :dataObj="danmuData" v-if="danmuData.length > 0"></topDanmu>
        <!--banner start -->
        <banner :banners="banners"></banner>
        <!--banner end -->
        <section class="content">
            <!-- good-info   start-->
            <section class="good-info">
                <div class="head">
                    <div class="price">
                        <span class="icon">￥</span>
                        <span class="number">{{myGoodsInfo.goods_price}}</span>
                    </div>
                    <div class="info">新用户专享全额返现</div>
                </div>
                <p class="info-detail">{{myGoodsInfo.goods_name}}</p>
            </section>
            <div class="gap"></div>
            <!-- good-info   end-->
            <!-- comment-info start -->
            <section class="comment-info" v-if="bask_info.baskList">
                <h3 class="title-3">宝贝评价</h3>
                <ul class="list" v-if="bask_info.baskList">
                    <li class="item">
                        <div class="head">
                            <div class="photo">
                                <img
                                    v-if="bask_info.baskList"
                                    v-lazy="bask_info.baskList.avatar"
                                    class="img"
                                >
                                <img v-else src="../assets/images/head_Default@2x.png" class="img">
                                <span
                                    class="name"
                                    v-if="bask_info.baskList"
                                >{{bask_info.baskList.nickname}}</span>
                            </div>
                            <div
                                class="date"
                                v-if="bask_info.baskList"
                            >{{bask_info.baskList.baskTime}}</div>
                        </div>
                        <p
                            class="info-detail"
                            v-if="bask_info.baskList"
                        >{{bask_info.baskList.baskContent}}</p>
                    </li>
                </ul>
            </section>
            <div class="gap"></div>
            <!-- comment-info end -->
            <!-- ensure start -->
            <section class="ensure">
                <img v-lazy="myGoodsInfo.payImage">
            </section>
            <div class="gap"></div>
            <section class="details-content">
                <img :key="index" v-for="(item, index) in myGoodsInfo.image" v-lazy="item">
            </section>
        </section>
        <!-- ensure end -->
        <section class="detail-content-wrap"></section>
        <footer class="footer">
            <div class="btn-group">
                <a href="javascript:;" class="btn go-back-btn" @click="goToHome">更多全额返</a>
                <a href="javascript:;" class="btn buy-btn" @click="getSku">立即购买</a>
            </div>
        </footer>
        <!-- 这里时信息提示区域 -->
        <msgBox :msgTxt="msgTxt"></msgBox>
        <!-- 这里显示收获地址列表 -->
        <addressCheck @submitAddress="selectedAddress" :addressShow="addressShow"></addressCheck>
        <!-- 确定是否选择这个地址 -->
        <prompt :promptObj="promptObj"></prompt>
        <!-- 规格选择 -->
        <skuCheck :skuShow="skuShow" :data="goodsItem" @submitSku="submitSku"></skuCheck>
        <!-- 支付类型弹框 -->
        <payTypeBox :show="payTypeShow" :payChoose="payChoose" @myPayType="myPayType"></payTypeBox>
        <!-- 老客提示弹框 -->
        <oldUserPop :oldUserPopShow="oldUserPopShow"></oldUserPop>
    </div>
</template>

<script>
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import Target from '@/assets/js/common/shence';
import H5Pay from "../assets/js/pay";
import payTypeBox from "../components/payType";
import topDanmu from "../components/topDanmu";
import banner from "@/components/swiper";
import msgBox from "../components/msgBox";
import addressCheck from "../components/addressCheck";
import oldUserPop from "../components/oldUserPop";
import prompt from "@/components/prompt";
import skuCheck from "@/components/skuCheck";
import {
    userStockInfo,
    goodsDetail,
    orderAdd,
    goodsInfo
} from "./../assets/js/api.js";
import { toHome, toGoodsDetail } from "./../assets/js/url.js";
import Wechat_api from "@/assets/js/common/wechat_api.js";
import {
    getQueryString,
    _getUserInfo,
    getEnvironment,
    userAppPay,
    openAddresslist
} from "@/assets/js/common/utils.js";
export default {
    name: "goodsDetail",
    data() {
        return {
            msgTxt: "",
            danmuData: [], //弹幕数据
            payChoose: 0, //0所有 3微信 1支付宝
            promptObj: {
                show: false,
                tittle: "请确认您的收货地址",
                ptmTxt: "",
                success: this.popPay
            },
            goods_id: "",
            spec_id: "",
            address_id: "", // 地址id
            addressShow: false,
            oldUserPopShow: false, //老用户弹框
            payTypeShow: false, // 支付方式选择框是否显示
            skuShow: false, // 选择商品规格
            goodsItem: {}, // 获取商品规则
            myGoodsInfo: {}, // 商品详情
            bask_info: {}, // 宝贝评价
            banners: [],
            user_info: _getUserInfo(),
            cate_id: getQueryString("cate_id") ? getQueryString("cate_id") :'',
            platForm: getEnvironment() //平台判断 1、app 2、小程序 0、h5
        };
    },
    created() {
        this.goods_id = getQueryString("goods_id");
        this.getDanmuData();
        this.getGoodsInfo();
    },
    methods: {
        // 获取商品信息
        getGoodsInfo() {
            try {                
                // 先判断 ios 还是安卓
                if (getQueryString("os") == "ios") {
                    window.removePayToUrgency = function() {
                        _this.payTypeShow = false;
                        _this.msgTxt = "支付失败";
                    };
                } else if (getQueryString("os") == "android") {
                    JS.removePayToUrgency = function() {
                        _this.payTypeShow = false;
                        _this.msgTxt = "支付失败";
                    };
                }
            } catch (error) {
                console.log(error);
            }
            let _this = this;
            let params = {
                goods_id: this.goods_id
            };
            this.$http
                .get(goodsInfo, {
                    params
                })
                .then(
                    res => {
                        if (res.data.result == 1) {
                            console.log(res.data,'res.data')
                            if(errorLogUpload && (!res.data.goods_info)){
                                errorLogUpload({
                                    logLevel: 3,
                                    errType: 21,
                                    apiError: {
                                        params: JSON.stringify(params),
                                        uri: location.href,
                                        apiUri: goodsInfo,
                                        data: JSON.stringify(res.data),
                                        message: "获取商品失败",
                                        method: 'get',
                                        code: 200
                                        }
                                    })
                            }                            
                            _this.myGoodsInfo = res.data.goods_info;
                            _this.banners = _this.myGoodsInfo.album;
                            let bask_info = res.data.bask_info;
                            if (this.platForm == 0) {
                                _this.shareWechat();
                            }
                            _this.bask_info = Object.assign(
                                {},
                                _this.bask_info,
                                {
                                    baskNum: bask_info.baskNum,
                                    baskList: bask_info.baskList["0"]
                                }
                            ); 
                      this.shence.commodityDetailTrack({
                        goodsDetailType:'活动商详页_打卡全额返',
                        refer:'活动页打卡全额返',
                        commodityID: _this.goods_id,
                        commodityName: _this.myGoodsInfo.goods_name,
                        firstCommodity: "",
                        secondCommodity: "",
                        commodityNumber:'1',
                        pricePerCommodity: _this.myGoodsInfo.goods_price,
                        storeID:'',
                        storeName: '',
                    })     
                            // 埋点
                      eventTrack({
                            funType: 'h5'   ,
                            pageName: 'full_return',
                            elementId: 'good_detail',
                            eventType:'tap',
                            goodsId: _this.goods_id,
                            goodsName: _this.myGoodsInfo.goods_name,
                            firstPage:'full_return'
                            })
                        }
                    },
                    err => {}
                );
        },
        // 微信分享数据
        shareWechat() {
            // 初始化分享
            let _this = this;
            new Wechat_api({
                shareJson: {
                    title: `坚持打卡${
                        _this.myGoodsInfo.day_num
                    }次就可以免费领到这件商品，快来一起打卡吧！`, // 分享标题
                    link:
                        location.origin +
                        `/clock/view/${process.env.VERSION}/goodsDetail/goods_id/` +
                        _this.goods_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: _this.banners["0"], // 分享图标
                    desc: `${_this.myGoodsInfo.goods_name}\n 打卡${
                        _this.myGoodsInfo.day_num
                    }次，全额返现`
                }
            });
        },
        //支付方式弹框
        popPay() {
            this.addressShow = false;
            if (this.platForm == 0) {
                this.payChoose = 3;
            }
            this.payTypeShow = true;
        },
        // 我的支付方式
        myPayType(id) {
            this.payType = id;
            this.createOrder();
        },
        createOrder(obj) {
            let self = this;
            let os = getQueryString("os");
            let params = {
                version: getQueryString("version"),
                user_id: this.user_info["user_id"],
                goods_id: this.goods_id,
                spec_id: this.spec_id,
                address_id: this.address_id,
                payment_id: this.payType,
                num: 1,
                os: os
            };
            this.$http.post(orderAdd, params).then(res => {
                let data = res.data;
                if (data["status"] == 1) {
                     let toString =  Object.prototype.toString;  
                     if(errorLogUpload && (!data.data.orderNo)){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify(params),
                                uri: location.href,
                                apiUri: url,
                                data: JSON.stringify(data),
                                message: "生成订单失败",
                                method: 'post',
                                code: 200
                                }
                            })
                    }                    
                    if (this.platForm == 1) {
                        userAppPay({
                            orderNo: data.data.orderNo,
                            goodsName: data.data.orderName,
                            payType: self.payType,
                            price: data.data.payAmount,
                            linkUrl:
                                location.origin +
                                `/clock/view/${process.env.VERSION}/index/paid/1`,
                            webLinkUrl:
                                location.origin +
                                `/clock/view/${process.env.VERSION}/index/paid/1`
                        });
                        eventTrack({
                            funType: 'h5'   ,
                            pageName: 'buy_fullreturn',
                            elementId: 'pay',
                            eventType:'tap',
                            orderNo:data.data.orderNo,
                            firstPage:'full_return'
                        })
                    } else if (this.platForm == 0) {
                        //微信内置
                        H5Pay.init("wxpayIn", {
                            order_no: data.data.orderNo,
                            goods_name: data.data.orderName,
                            payNo: data.data.payNo
                        });
                    }

                    // this.$router.replace(`${toHome}/paid/1`);
                } else {
                    this.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        // 获取规格
        getSku() {
            if ( localStorage.getItem("clock_old_pop_time_" + this.user_info.user_id) == new Date().getDate() ) {
                this.oldUserPopShow = true;
                return;
            }
            eventTrack({
                    funType: 'h5'   ,
                    pageName: 'full_return',
                    elementId: 'buy',
                    eventType:'tap',
                    firstPage:'full_return'
                })
            const params = {
                goods_id: this.goods_id || "1215097"
            };
            this.$http.get(goodsDetail, { params }).then(res => {
                var data = res.data;
                if (data && data.result == 1) {
                     let toString =  Object.prototype.toString;  
                     if(errorLogUpload && (toString.apply(data.data) !== "[object Object]")){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify(params),
                                uri: location.href,
                                apiUri: goodsDetail,
                                data: JSON.stringify(data),
                                message: "获取详情接口",
                                method: 'get',
                                code: 200
                                }
                            })
                    }                    
                    let noStock =
                        data.stocknum < 1 || data.state == 1 || data.state == 2
                            ? true
                            : false;
                    if (noStock) {
                        this.msgTxt = "该商品没有库存或已下架";
                        return;
                    }
                    this.goodsItem = data.data;
                      this.shence.oneBuyTrack({
                        commodityID: this.goods_id,
                        commodityName: this.myGoodsInfo.goods_name,
                        firstCommodity: "",
                        secondCommodity: "",
                        pricePerCommodity: this.myGoodsInfo.goods_price,
                        commodityNumber:'1',
                        refer: '活动页打卡全额返',
                        currentPage: '活动商详页_打卡全额返',
                      })   
                    if (this.goodsItem.buyupnum == 0) {
                        //判断是否超出限购数量
                        this.msgTxt = `该商品限购${this.goodsData.buyupnum}件`;
                    } else {
                        if (this.goodsItem.spec.length < 2) {
                            let _spec = this.goodsItem.spec[0];
                            this.spec_id = _spec.specId;
                            if (this.platForm == 2) {
                                let obj = {
                                    spec_id: this.spec_id,
                                    goods_id: this.goods_id,
                                    cate_id: this.cate_id,
                                    activities: "clock",
                                    num: 1,
                                };
                                openAddresslist(obj);
                            } else {
                                this.addressShow = true;
                            }
                            return;
                        }
                        this.skuShow = true;
                    }
                } else {
                    this.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        // 获取用户当前选择的地址
        selectedAddress(selectAddress) {
            this.address_id = selectAddress.id;
            this.promptObj.ptmTxt = selectAddress.addrTxt;
            this.promptObj.show = true;
        },
        // 接收选中的skuid
        submitSku(obj) {
            this.spec_id = obj.id;
            this.skuShow = !this.skuShow;
            if (this.platForm == 2) {
                let obj = {
                    specId: this.spec_id,
                    goodsId: this.goods_id,
                    num: 1,
                    activities: "signInCashBack",
                    goodsCheck: 1,
                    s_user_id: getQueryString("s_user_id")?getQueryString("s_user_id"):"",
                };
                openAddresslist(JSON.stringify(obj));
            } else {
                this.addressShow = true;
            }
        },
        //获取弹幕信息
        getDanmuData() {
            this.$http.get(userStockInfo).then(
                res => {
                    if (res.data.result == 1) {
                        console.log(res.data.data.length,'res.data')
                     
                     if(errorLogUpload && (res.data.data.length<=0)){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify({}),
                                uri: location.href,
                                apiUri: userStockInfo,
                                data: JSON.stringify(data),
                                message: "获取弹幕信息失败",
                                method: 'get',
                                code: 200
                                }
                            })
                    }
                        this.danmuData = res.data.data;
                    }
                },
                err => {}
            );
        },
        // 去活动首页
        goToHome() {
            // history.back();
            this.$route.query["update"] = true;
            let other = "";
            getQueryString("s_user_id") ? other = "/s_user_id/" + getQueryString("s_user_id") : "";
            this.$router.replace(`${toHome}${other}`);
        }
    },
    mounted(){
           this.shence = new Target({
            "dom":"",
            "productDom":"",
            "data":"",
        });
    },
    components: {
        topDanmu,
        banner,
        msgBox,
        addressCheck,
        prompt,
        skuCheck,
        payTypeBox,
        oldUserPop
    },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if (from.query.update) {
            to.meta.keepAlive = false;
        } else {
            to.meta.keepAlive = true;
        }
        next();
    }
};
</script>

<style lang="scss" scoped>
.router-view {
    background-color: #fff;
    position: static;
    top: initial;
    left: initial;
    right: initial;
    bottom: initial;
}
.gap {
    height: 8px;
    margin: 0 -15px;
    background: rgb(249, 249, 249);
}
.detail-page {
    padding-bottom: 50px;
    .content {
        padding: 0 15px;
    }
}
.good-info {
    padding: 18px 0;
    .head {
        display: flex;
        justify-content: space-between;
        font-size: 0;
        .price {
            color: #d40b02;
            margin-bottom: 14px;
            .icon {
                font-size: 14px;
            }
            .number {
                font-size: 24px;
            }
        }
        .info {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 24px;
            color: #ff3932;
        }
    }
    .info-detail {
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 22px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
}
.comment-info {
    padding: 16px 0 0;
    .title-3 {
        font-size: 15px;
        color: #333333;
        padding-bottom: 16px;
    }
    .item {
        .head {
            display: flex;
            justify-content: space-between;
            font-size: 0;
            margin-bottom: 12px;
            .photo {
                .img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                }
                .name {
                    padding-left: 8px;
                    font-size: 12px;
                    color: #757575;
                    line-height: 24px;
                    vertical-align: middle;
                }
            }
            .date {
                font-size: 12px;
                line-height: 24px;
                color: #999;
                transform: scale(0.95);
            }
        }
        .info-detail {
            font-size: 13px;
            color: #333333;
            line-height: 22px;
            margin-bottom: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
}
.ensure {
    background: #fff;
    margin: 0 -15px;
    img {
        width: 100%;
    }
}
.detail-content-wrap {
    background: #f9f9f9;
}
.details-content {
    padding-top: 15px;
    img {
        width: 100%;
        margin-bottom: 10px;
    }
}

.footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .btn-group {
        background: #fff;
        display: flex;
        .btn {
            height: 50px;
            line-height: 50px;
            text-align: center;
        }
        .go-back-btn {
            width: 145px;
            flex: 0 0 145px;
            background: #fff;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
        }
        .buy-btn {
            background-image: linear-gradient(-90deg, #ff342c 0%, #ff6967 100%);
            width: 230px;
            flex: 0 0 230px;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 0.9px;
        }
    }
}
</style>
