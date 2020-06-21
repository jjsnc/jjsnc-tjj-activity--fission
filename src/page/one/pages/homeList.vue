<style lang="scss" scoped>
.page-list {
    .sec-bg {
        width: 100%;
        height: 68px;
        .bg-img {
            height: 68px;
            background: url("../assets/images/bg@2x.png");
            background-size: cover;
        }
    }
    .sec-list {
        height: 600px;
        padding: 0 12px;
        .swiper-slide {
            height: 600px;
            overflow: hidden;
        }
        .swiper-slide-active {
            height: auto;
        }
        .swiperList {
            .list {
                .item {
                    height: 130px;
                    background: #fff;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    padding: 8px;
                    display: flex;
                    .left-area {
                        width: 110px;
                        height: 110px;
                        img {
                            width: 110px;
                            height: 110px;
                        }
                    }
                    .right-area {
                        width: 218px;
                        margin-left: 10px;
                        .title-1 {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                            letter-spacing: 0;
                            line-height: 18px;
                            height: 36px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            margin-bottom: 12px;
                        }
                        .middle {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 16px;
                            .now-price {
                                color: #ee0000;

                                .icon {
                                    font-size: 12px;
                                    transform: scale(0.95);
                                    font-weight: bold;
                                }
                                .price {
                                    font-weight: bold;
                                }
                                .origin-price {
                                    color: #999999;
                                }
                            }
                            .person-count {
                                font-family: PingFangSC-Regular;
                                font-size: 11px;
                                color: #ff6632;
                                letter-spacing: 0;
                                text-align: center;
                            }
                        }
                        .bth-group {
                            .btn {
                                display: inline-block;
                                width: 100%;
                                text-align: center;
                                padding: 8px 0;
                                background: linear-gradient(
                                    -90deg,
                                    #f53917 0%,
                                    #ff8232 100%
                                );
                                border-radius: 4px;
                                font-size: 14px;
                                color: #ffffff;
                                letter-spacing: 0;
                                .text {
                                    font-size: 12px;
                                    transform: scale(0.92);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .empty-data {
        color: #fff;
        text-align: center;
        font-size: 16px;
        img {
            width: 227px;
            margin: 30px auto 22px auto;
        }
    }
}
</style>
<template>
    <div class="page-list">
        <section class="sec-bg">
            <div class="bg-img"></div>
        </section>
        <section class="sec-nav">
            <scrollNav
                :navData="navData"
                :fixedTop="fixedTop"
                @navChange="navChange"
                ref="navListDOM"
            ></scrollNav>
        </section>
        <!-- 内容列表 -->
        <pullUpBox class="wrapper" :data="goodsItem" @loadMore="loadData">
            <section class="sec-list">
                <swiperList :datas="goods" :slideIndex="slideIndex" @changeIndex="changeIndex">
                    <swiper-slide :key="i" v-for="(goodList,i) in goods">
                        <ul class="list">
                            <li class="item">
                                <div class="left-area">
                                    <img src="../assets/images/5.png">
                                </div>
                                <div class="right-area">
                                    <div class="title-1">TAKA ORIGINAL Daily Meeting 例會通勤风衣 长款外套国潮</div>
                                    <div class="middle">
                                        <div class="now-price">
                                            <span class="icon">¥</span>
                                            <span class="price">1</span>
                                            <del class="origin-price">¥19.9</del>
                                        </div>
                                        <div class="person-count">2888人已参与</div>
                                    </div>
                                    <div class="bth-group">
                                        <a href="javascript:;" class="btn">
                                            <span class="main-text">1元拼团</span>
                                            <span class="text">（2人成团）</span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="item">
                                <div class="left-area">
                                    <img src="../assets/images/5.png">
                                </div>
                                <div class="right-area">
                                    <div class="title-1">TAKA ORIGINAL Daily Meeting 例會通勤风衣 长款外套国潮</div>
                                    <div class="middle">
                                        <div class="now-price">
                                            <span class="icon">¥</span>
                                            <span class="price">1</span>
                                            <del class="origin-price">¥19.9</del>
                                        </div>
                                        <div class="person-count">2888人已参与</div>
                                    </div>
                                    <div class="bth-group">
                                        <a href="javascript:;" class="btn">
                                            <span class="main-text">1元拼团</span>
                                            <span class="text">（2人成团）</span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="item">
                                <div class="left-area">
                                    <img src="../assets/images/5.png">
                                </div>
                                <div class="right-area">
                                    <div class="title-1">TAKA ORIGINAL Daily Meeting 例會通勤风衣 长款外套国潮</div>
                                    <div class="middle">
                                        <div class="now-price">
                                            <span class="icon">¥</span>
                                            <span class="price">1</span>
                                            <del class="origin-price">¥19.9</del>
                                        </div>
                                        <div class="person-count">2888人已参与</div>
                                    </div>
                                    <div class="bth-group">
                                        <a href="javascript:;" class="btn">
                                            <span class="main-text">1元拼团</span>
                                            <span class="text">（2人成团）</span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div v-show="false" class="empty-data">
                            <img src="../assets/images/icon_collection@2x.png">
                            <div>抱歉～这里空空如也</div>
                        </div>
                    </swiper-slide>
                </swiperList>
            </section>
        </pullUpBox>
        <!-- 下载弹框 -->
        <downLoad :downloadPopShow="downloadPopShow"></downLoad>
        <!-- 信息提示 -->
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
import pullUpBox from "@/components/pullUpBox";
import downLoad from "../components/downLoad";
import scrollNav from "../components/scrollNav";
import { swiperSlide } from "vue-awesome-swiper";
import swiperList from "@/components/swiper.list.vue";
export default {
    name: "homeList",
    data() {
        return {
            downloadPopShow: false,
            goodsItem: [],
            isLoadData: false, //当前分类是否还需要加载
            fixedTop: { flag: true, top: 50 },
            navData: {
                type: 3,
                data: [
                    { cate_name: "内衣", cate_id: 0 },
                    { cate_name: "运动", cate_id: 1 },
                    { cate_name: "内衣", cate_id: 2 },
                    { cate_name: "服饰", cate_id: 3 },
                    { cate_name: "运动", cate_id: 4 }
                ]
            },
            goods: [{}, {}, {}, {}],
            slideIndex: 0,
            page: {},
            activityId: 0,
            buyStart:false,
            msgTxt:'',
            platForm: getEnvironment() //平台判断 1、app 2、小程序 0、h5

        };
    },
    components: {
        downLoad,
        scrollNav,
        swiperSlide,
        swiperList,
        pullUpBox
    },
    methods: {
        // 获取导航数据
        getNavData() {
            this.$http.get(timeFiles).then(res => {
                for (let i = 0; i < timeList.length; i++) {
                    this.goods.push([]);
                }
            });
        },
        // 获取内容列表数据
        getGoodsDetails() {
            let self = this;
            self.page[self.slideIndex] = self.page[self.slideIndex] || 1;
            let params = {
                activityId: self.activityId,
                page: self.page[self.slideIndex]
            };
            this.$http.get(buyingSpree, { params }).then(
                res => {
                    res = res.data;
                    if (self.goods[self.slideIndex].length == 0) {
                        self.$set(self.goods, self.slideIndex, res.data);
                    } else {
                        self.goods[self.slideIndex].goodsList = self.goods[
                            self.slideIndex
                        ].goodsList.concat(res.data.goodsList);
                    }
                    self.goodsItem =
                        self.goods[self.slideIndex].goodsList || [];
                    if (
                        self.goods[self.slideIndex].goodsList &&
                        self.goods[self.slideIndex].goodsList.length % 20 == 0
                    ) {
                        self.isLoadData = false;
                        self.page[self.slideIndex]++;
                    } else {
                        self.isLoadData = true;
                    }
                },
                err => {}
            );
        },
        //slider滚动改变navList
        changeIndex(index) {
            this.$refs.navListDOM.navClisk(index);
        },
        navChange(cate_id) {
            this.slideIndex = cate_id;
            let temp = this.navList.filter(item => item.cate_id == cate_id)[0];
        },
        //是否加载更多数据
        loadData() {
            if (!this.isLoadData) {
                this.isLoadData = true;
                this.getCateIdDetails();
            }
        },
        popSku() {
            // 判断是否登录
            let isLogin = check_login();
            if (!isLogin) return;
            // 有没有库存
            if (true) {
                this.buyStart = true;
            } else {
                this.$msgBox.msgTxt("暂无库存"); 
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
        }
    }
};
</script>


