<style lang="scss" scoped>
.page-details {
    padding-bottom: 48px;
    height: fit-content;
    .sec-goods {
        padding: 0 12px 12px;
        .title {
            display: flex;
            justify-content: space-between;
            padding: 22px 0 16px;
            font-weight: bold;
            .number {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #ff6632;
                letter-spacing: 0;
                line-height: 16px;
            }
            .price {
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: #ee0000;
                letter-spacing: 1px;
                .icon {
                    font-size: 12px;
                    transform: scale(0.95);
                }
            }
        }
        .details {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            line-height: 22px;

            width: 351px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 51px;
        }
    }
    .gap {
        height: 10px;
        background: d8d8d8;
    }
    .sec-evaluate {
        padding: 0 12px 12px;
        .title {
            display: flex;
            justify-content: space-between;
            padding: 13px 0;
            font-weight: bold;
            .number {
                font-family: PingFangSC-Semibold;
                font-size: 15px;
                color: #333333;
            }
            .text {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #ff6632;
            }
        }
        .list {
            display: flex;
            justify-content: space-between;
            .item {
                width: 110px;
                height: 28px;
                line-height: 28px;
                background: #ffede6;
                border-radius: 3px;
                text-align: center;
                font-size: 13px;
                color: #333333;
            }
        }
        .title-2 {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            .name {
                img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                }
                .text {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #757575;
                }
            }
            .date {
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #999999;
                transform: scale(0.95);
                padding-top: 3px;
            }
        }
        .user-write {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #333333;
            line-height: 22px;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            width: 100%;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 44px;
        }
    }
    .sec-ensure {
        .ensure_logo {
            img {
                max-width: 100%;
            }
        }
    }
    .sec-goods-img {
        padding: 0 12px;
        img {
            max-width: 100%;
            margin-bottom: 12px;
        }
    }
    .sec-footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 48px;
        background: #fff;
        .btn-group {
            display: flex;
            .btn {
                height: 48px;
                line-height: 48px;
                text-align: center;
            }
            .more-btn {
                width: 140px;
                font-family: PingFangSC-Regular;
                font-size: 15px;
                color: #333333;
                letter-spacing: 0;
            }
            .purchase-btn {
                width: 230px;
                flex: 1;
                background: linear-gradient(0deg, #ff7219 0%, #ff0d0d 100%);
                font-family: PingFangSC-Medium;
                font-size: 20px;
                color: #ffffff;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
}
</style>

<template>
    <div class="page-details">
        <div class="danmu">
            <scrollDanmu :dataObj="danmuData" v-if="danmuData.length > 0"></scrollDanmu>
        </div>
        <!-- 轮播 -->
        <div class="banner">
            <banner :banners="banners"></banner>
        </div>
        <section class="sec-goods">
            <div class="title">
                <div class="number">2348人已参与</div>
                <div class="price">
                    <span class="icon">原价：¥</span>
                    <span class="text">19.9</span>
                </div>
            </div>
            <p class="details">富山商店经典款702床上四件套纯棉套装卡通风格粉色系小码带枕套</p>
        </section>
        <div class="gap"></div>
        <section class="sec-evaluate">
            <div class="title">
                <div class="number">宝贝评价(1234)</div>
                <div class="text"></div>
            </div>
            <ul class="list">
                <li class="item">质量很好(113)</li>
                <li class="item">质量很好(113)</li>
                <li class="item">质量很好(113)</li>
            </ul>
            <div class="title-2">
                <div class="name">
                    <img src="../assets/images/icon_mygoods1@2x.png">
                    <span class="text">我的名字</span>
                </div>
                <div class="date">2018.12.12</div>
            </div>
            <div
                class="user-write"
            >评价好评价棒评价真的很好好很好好评价好评价棒评价真的很好好很好好评价好评价棒评价真的很好好很好好好很好好评价好评价棒评价真的很好好很好好好</div>
        </section>
        <!-- 三包服务 -->
        <section class="sec-ensure">
            <div class="ensure_logo">
                <img src="../assets/images/img_safeguard@3x.png">
            </div>
        </section>
        <div class="gap"></div>
        <!-- 商品大图 -->
        <section class="sec-goods-img">
            <img
                src="http://clustersjimg.taojiji.com/g1/M09/86/D5/ChOUx1wlzbOACC-aAAI38OvcAuI638_480_480.jpg"
            >
            <img
                src="http://clustersjimg.taojiji.com/g1/M00/86/D6/ChN0GVwlzbaAC-xSAAIw5spnN-w366_480_480.jpg"
            >
            <img
                src="http://clustersjimg.taojiji.com/g1/M05/86/D6/ChMNt1wlzbmAbcllAAJKfT3jp0I581_480_480.jpg"
            >
        </section>
        <footer class="sec-footer">
            <div class="btn-group">
                <a href="javascript:;" class="more-btn btn" @click="backHome">更多1元商品</a>
                <a href="javascript:;" class="purchase-btn btn" @click="popSku">1元拼团</a>
            </div>
        </footer>
        <buySystem
            :goodsData="goodsData"
            @buySubmit="buySubmit"
            :buyStart="buyStart"
            :numShow="numShow"
        ></buySystem>
    </div>
</template>


<script>
import {
    getQueryString,
    userAppPay,
    check_login,
    jump2Shop,
    getEnvironment,
    changeTitle,
    _getUserInfo
} from "@/assets/js/common/utils.js";
import banner from "@/components/swiper";
import msgBox from "@/components/msgBox";
import scrollDanmu from "../components/scrollDanmu";
import buySystem from "@/components/buySystem";
import downLoad from "../components/downLoad";
import { toHome } from "./../assets/js/url.js";
export default {
    data() {
        return {
            numShow: false,
            buyStart: false,
            goodsData: {
                activityId: 25,
                goodsId: 1215414,
                goodsName: "运动-童装-裙子上过资源位1130",
                description: "",
                initSellNum: 666,
                limitNum: 10,
                buyNum: 999,
                orderNum: 2,
                jsonData: "",
                minPrice: null,
                shopPrice: 2,
                groupNumber: "2",
                progressBar: 0,
                predefined: 0,
                totalStock: 402,
                show: {
                    color: {
                        list: ["11"],
                        type: 1,
                        label: "属性"
                    },
                    skuSize: {
                        list: ["11"],
                        type: 2,
                        label: "类别"
                    }
                },
                spec: [
                    {
                        specId: 8267331,
                        goodsId: 1215414,
                        stockNum: 402,
                        skuSize: "11",
                        color: "11",
                        specNameOne: "属性",
                        specNameTwo: "类别",
                        smallImgUrl:
                            "http://tjjshangjiaimg.shan666.com/20181128/img/5a4dbd983d2fcc6618b42a5aa40a00f9_480_480.jpg"
                    }
                ],
                isManySpec: 0,
                album: [
                    {
                        title: null,
                        goodsId: 1215414,
                        specId: 0,
                        favs: 1,
                        isCover: 1,
                        imageText: 0,
                        img120Url:
                            "http://tjjshangjiaimg.shan666.com/20181128/img/c42f1a98e2b090db39e2e3e48573fda1_480_480.jpg",
                        img320Url:
                            "http://tjjshangjiaimg.shan666.com/20181128/img/c42f1a98e2b090db39e2e3e48573fda1_480_480.jpg",
                        img640Url:
                            "http://tjjshangjiaimg.shan666.com/20181128/img/c42f1a98e2b090db39e2e3e48573fda1_480_480.jpg",
                        img1080Url:
                            "http://tjjshangjiaimg.shan666.com/20181128/img/c42f1a98e2b090db39e2e3e48573fda1_480_480.jpg"
                    }
                ],
                image: [],
                payImage:
                    "http://tjjstatic.taojiji.com/webtjj/default/images/users/goodsService.png",
                preGoodsImage:
                    "http://tjjimg.taojiji.com/app/goods/price_desc.png",
                activityGoodsList: null,
                baskInfo: null
            },
            danmuData: [
                {
                    price: 50,
                    time: 28,
                    user: "七墓凉",
                    userIcon: "http://tjjimg.tjjshop.cn/group/userIcon/1114.jpg"
                },
                {
                    price: 43,
                    time: 57,
                    user: "钓一江月",
                    userIcon: "http://tjjimg.tjjshop.cn/group/userIcon/129.jpg"
                },
                {
                    price: 34,
                    time: 35,
                    user: "?個榶衯唡姅",
                    userIcon: "http://tjjimg.tjjshop.cn/group/userIcon/143.jpg"
                }
            ],
            banners: [
                "http://clustersjimg.taojiji.com/g1/M03/86/D4/ChOUx1wlzZmAMYcDAAMmgzTyRio614_480_480.jpg",
                "http://clustersjimg.taojiji.com/g1/M04/86/D4/ChN0GVwlzZ2AIHZKAALHNHQaFQk455_480_480.jpg",
                "http://clustersjimg.taojiji.com/g1/M03/86/D5/ChOUx1wlzamAH62GAAJp7AVfDW8348_480_480.jpg",
                "http://clustersjimg.taojiji.com/g1/M06/86/D5/ChOUx1wlzayAIP4GAAIFFFP9maA024_480_480.jpg"
            ],
            goods_id: "",
            platForm: getEnvironment() //平台判断 1、app 2、小程序 0、h5
        };
    },
    created() {
        changeTitle(decodeURI(getQueryString("goodsName")));
    },
    methods: {
        popSku() {
            // 判断是否登录
            let isLogin = check_login();
            if (!isLogin) return;
            // 有没有库存
            if (true) {
                this.buyStart = true;
            } else {
                this.msgTxt = "暂无库存";
                return;
            }
        },
        buySubmit(buyObj) {
            this.createOrder(buyObj);
        },
        createOrder(buyObj) {
            let self = this;
            let os = getQueryString("os") || "wap";
            let params = {
                version: getQueryString("version"),
                goods_id: this.goods_id,
                spec_id: obj.spec_id,
                address_id: obj.address_id,
                os: os,
                payment_id: obj.payType
            };
            this.$http.get(orderAdd, { params }).then(res => {
                let data = res.data;
                if (data["status"] == 1) {
                    if (this.platForm == 1) {
                        userAppPay({
                            orderNo: data.data.orderNo,
                            goodsName: data.data.orderName,
                            payType: obj.payType,
                            price: data.data.payAmount,
                            linkUrl: `${location.origin}/freeCharge/view/${
                                process.env.VERSION
                            }/share/order_no/${data.data.order_no}/s_user_id/${
                                self.user_info.user_id
                            }`,
                            webLinkUrl: `${location.origin}/freeCharge/view/${
                                process.env.VERSION
                            }/share/order_no/${data.data.order_no}/s_user_id/${
                                self.user_info.user_id
                            }`
                        });
                    } else if (this.platForm == 0) {
                        //微信内置
                        H5Pay.init("wxpayIn", {
                            order_no: data.data.orderNo,
                            goods_name: data.data.orderName,
                            payNo: data.data.payNo,
                            successFn: () => {
                                console.log("successFn");
                                window.location.href = `${
                                    location.origin
                                }/freeCharge/view/${
                                    process.env.VERSION
                                }/share/order_no/${
                                    data.data.orderNo
                                }/s_user_id/${self.user_info.user_id}`;
                            }
                        });
                    }
                } else {
                    this.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
       // 返回店铺操作
        backHome() {
            // this.$router.go(-1);
            this.$router.replace(`${toHome}`);
        },
    },
    mounted() {
        let _this = this;
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
    },
    components: {
        banner,
        msgBox,
        scrollDanmu,
        buySystem,
        downLoad
    }
};
</script>


