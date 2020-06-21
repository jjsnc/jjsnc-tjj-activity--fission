<template>
    <div :class="['list',danmuData.length > 0 ?'pt30':'', hasData ? 'hasData':'']">
        <pullUpBox class="wrapper" :data="bigDatas.data[slideIndex] ? bigDatas.data[slideIndex].list : []" @loadMore="loadData" :noData="noData">
            <div>
                <!-- <div class="label_tip">热门店铺</div> -->
                <scrollNav :bigDatas="bigDatas" @navChange="navChange" ref="swiperNavList">
                    <swiper-slide
                        v-for="(typelist,i) in bigDatas.data"
                        :key="i"
                        class="goods_container"
                    >
                        <div class="goods-box" :ref="`goodsList_${i}`">
                            <div class="good" v-for="(item,i) in typelist.list" :key="i" @click.stop="toGoodsDetail(item.goodsId,item)" >
                                <!-- <div class="good" v-for="(good,count) in item" :key="count"> -->
                                <div class="pic">
                                    <img v-lazy="item.goodsPic" :key="item.goodsPic">
                                </div>
                                <div class="title">{{item.goodsName}}</div>
                                <div class="spec">
                                    <div class="price">
                                        <span>￥</span>
                                        <priceNum :priceObj='{price:item["goodsPrice"], bigFont:"0.875rem", smallFont:"0.6875rem"}'></priceNum>
                                    </div>
                                    <div class="buy" @click.stop="popSku(item.goodsId,item)">+</div>
                                </div>
                            </div>
                            <div v-show="typelist.list.length < 1" class="empty-data">
                                <img src="../assets/images/quesheng@2x.png"  />
                                <!-- <div>暂无商品</div> -->
                            </div>
                        </div>
                    </swiper-slide>
                </scrollNav>
            </div>
        </pullUpBox>
        <!-- <div class="share" @click="shareFn">
            <img src="../assets/images/icon_share@2x.png">
        </div>-->
        <div :class="[shake ? 'shake' : '' , 'cartIcon']" @click="openCart" ref="cartIcon">
            <img src="../assets/images/icon_basket copy@2x.png">
            <p>{{cartNum}}</p>
        </div>
        <footer @click="submitCart(0)">
            <p class=".my-con" v-html="footerTip"></p>
        </footer>
        <skuCheck :data="goodsData" @submitSku="submitSku" :skuShow="skuShow"></skuCheck>
        <cartBasket
            @toPay="submitCart"
            :cartShow="cartShow"
            @changeCart="setCartData"
            :shopIdFrom="shop_id"
            @returnAddressId="getAddressId"
            :cartType="cartType"
            act_type="2"
        ></cartBasket>
        <flyInAnimate :flyData="flyData"></flyInAnimate>
        <payTypeBox :show="payTypeShow" @myPayType="myPayType"></payTypeBox>
    </div>
</template>

<script >
import Target from '@/assets/js/common/shence';
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import { toTwoGoodsDetail } from "./../assets/js/url.js";
import {
    shopList,
    goodsList,
    goodsDetail,
    orderAdd,
    shareImg
} from "./../assets/js/api.js";

import { swiperSlide } from "vue-awesome-swiper";
import {
    getQueryString,
    fissile_setCart,
    fissile_getCart,
    userAppPay,
    shareToWxMini,
    _getUserInfo,
    check_login
} from "@/assets/js/common/utils";
import App from "@/assets/js/common/wap.app.js";

export default {
    name: "twoList",
    props: {
        origin: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            page: 1,
            g_page: 1,
            hasData: false, //页面无数据不显示，只显示加载loading
            ruleShow: false, //规则
            cartShow: false,
            skuShow: false,
            list: [], //店铺列表
            danmuData: [], //弹幕数据
            isLoadData: true, //是否加载数据
            cartNum: "", //购物车商品数量
            // cartAllNum: "", //所有购物车商品数量
            cartObj: {}, //购物车数据
            cartAllNum: {}, //所有店铺购物车的商品件数
            fixedTop: {
                flag: false,
                top: "0"
            },
            cartType: 2,
            goodsId: 0,
            slideIndex: 0,
            // datas: [],
            shop_id: "",
            user_info: _getUserInfo(),
            goodsData: {}, //所选商品数据(含sku)
            payTypeShow: false, // 支付方式选择框是否显示
            wxMiniImg:
                "https://fissilestatic.taojiji.com/tenFair/v1_0_0/img/default_bg_share@2x.png",
            footerTip: "还差<span>2件</span>商品，<span>10元</span>带回家",
            shake: false,
            bigDatas: {
                type: 3,
                hasSort: false,//是否有排序
                data: [] //{nav,sort,list,page}数据
            },
            flyData: {
                show: false,
                img: "",
                start: {},
                end: {}
            } // 飞入动画参数
        };
    },
    watch: {
        $route(to, from) {
            // console.log('change router');
            this.setCartData();
            if(from.name=="twoGoodsDetail"){
                this.$refs.swiperNavList.moveNav();
            }
        }
    },
    created() {
        this.getShareImg();
        this.getShopList();
    },
    mounted() {
        //统计埋点
        let data_s = {
            code: "TF0",
            query: {
                name: "十元五件集市"
            },
            extra: {
                param1: 2
            }
        };
        this.$tapConfig.batchClick(0, data_s, 0);
        this.shence = new Target({
            "dom":"",
            "productDom":"",
            "data":"",
        });
    },
    methods: {
        //打开购物篮
        openCart() {
            if (!check_login()) return;
            if (this.cartNum == "0/2") {
                this.$msgBox.msgTxt("还没有任何商品，快去添加吧~");
                return;
            }
            this.cartShow = true;
        },
        //  设置购物车数据
        setCartData() {
            let userCart = fissile_getCart();
            if (Object.keys(userCart).length > 0 && userCart["tenTwo"]) {
                let cartAllObj = userCart["tenTwo"];
                for (var id in cartAllObj) {
                    let _num = cartAllObj[id].num.split(",");
                    let _count = 0;
                    _num.map(item => {
                        return (_count += Number(item));
                    });
                    this.cartAllNum[id] = _count;
                }
                if (userCart["tenTwo"][this.shop_id]) {
                    this.cartObj = userCart["tenTwo"][this.shop_id];

                    if (
                        document.querySelectorAll(".scroll-nav .icon")[
                            this.slideIndex
                        ] &&
                        document.querySelectorAll(".scroll-nav .icon")[
                            this.slideIndex
                        ].children.length == 1 &&
                        this.cartObj.num
                    ) {
                        // let data_v = document.querySelectorAll(".scroll-nav .icon")[this.slideIndex].children[0].getAttributeNames()[0];
                        let h_node = document.createElement("div");
                        h_node.setAttribute(
                            "style",
                            "position:absolute;top:-0.5rem;right:0.25rem;width:1rem;height:1rem;line-height:1rem;border-radius:100%;background:red;font-size:0.6875rem;color:#ffffff;letter-spacing:0;text-align:center;"
                        );
                        // h_node.setAttribute(data_v,data_v)
                        h_node.setAttribute("class", "horn");
                        let textnode = document.createTextNode(
                            this.cartObj["num"]
                        );
                        h_node.appendChild(textnode);
                        document
                            .querySelectorAll(".scroll-nav .icon")
                            [this.slideIndex].appendChild(h_node);
                    } else if (
                        document.querySelectorAll(".scroll-nav .icon")[
                            this.slideIndex
                        ]
                    ) {
                        let _snum = this.cartObj.num.split(",");
                        let _scount = 0;
                        _scount = _snum.reduce(function(pre, next) {
                            return Number(pre) + Number(next);
                        });
                        if (_scount == 0) {
                            if (
                                document.querySelectorAll(".scroll-nav .icon")[
                                    this.slideIndex
                                ].children[1]
                            ) {
                                document
                                    .querySelectorAll(".scroll-nav .icon")
                                    [this.slideIndex].children[1].remove();
                            }
                                                        if (
                                document.querySelectorAll(".scroll-nav .icon")[
                                    this.slideIndex
                                ].children[1]
                            ) {
                                document
                                    .querySelectorAll(".scroll-nav .icon")
                                    [this.slideIndex].children[1].remove();
                            }
                        } else {
                            document.querySelectorAll(".scroll-nav .icon")[
                                this.slideIndex
                            ].children[1].innerHTML = _scount;
                        }
                    }
                } else {
                    this.cartObj = {};
                    this.cartNum = "0/2";
                    this.footerTip =
                        "还差<span>2件</span>商品，<span>10元</span>带回家";
                }
            }
            this.setCartNum();
        },
        // 设置购物车数量
        setCartNum() {
            if (this.cartObj.goods_id && this.cartObj.num) {
                let _num = this.cartObj.num.split(",");
                let _count = 0;
                _count = _num.reduce(function(pre, next) {
                    return Number(pre) + Number(next);
                });
                if (_count % 2 == 0) {
                    this.cartNum = _count + "/" + _count;
                    this.footerTip =
                        "已选" +
                        "<span>" +
                        _count +
                        "</span>" +
                        "件商品，去支付 ¥" +
                        "<span>" +
                        _count * 5 +
                        "</span>";
                } else {
                    this.cartNum =
                        _count + "/" + (Math.floor(_count / 2) + 1) * 2;
                    this.footerTip =
                        "还差" +
                        "<span>" +
                        (2 - (_count % 2)) +
                        "</span>" +
                        "件商品，" +
                        "<span>" +
                        (Math.floor(_count / 2) + 1) * 10 +
                        "元" +
                        "</span>" +
                        // (Math.floor(_count / 2) + 1) * 2 +
                        "带回家";
                }
            } else {
                this.cartNum = "0/2";
                this.footerTip =
                    "还差<span>2件</span>商品，<span>10元</span>带回家";
            }
        },
        //规则弹框
        popRule() {
            this.ruleShow = !this.ruleShow;
        },
        //跳转店铺
        // toShop(shopId, shopName) {
        //     let self = this;
        //     this.$router.push({
        //         path:
        //             self.toShopDetail +
        //             "/shop_id/" +
        //             shopId +
        //             "/shop_name/" +
        //             encodeURI(shopName)
        //     });
        // },
        //获取店铺列表
        getShopList() {
            this.$http
                .get(shopList, {
                    params: {
                        page: this.page,
                        type: 2
                    }
                })
                .then(
                    res => {
                        // console.log(res.data.shopList)
                        if (res.data.result == 1) {
                            this.hasData = true;
                            this.list = this.list.concat(res.data["shopList"]);
                            // this.datas = this.list[this.slideIndex];
                            this.shop_id = this.list[this.slideIndex]["shopId"];
                            //统计埋点
                            let data = {
                                code: "TF201",
                                query: {
                                    name: "十元五件集市",
                                    title1: "店铺"
                                },
                                extra: {
                                    param1: this.shop_id,
                                    param2: 1
                                }
                            };
                            this.$tapConfig.batchClick(0, data, 0);

                            this.list.map(item=>{
                                this.bigDatas.data.push({
                                    nav: item,
                                    list: [],
                                    cartNavData:this.cartAllNum,
                                    page: 1,
                                    sortType: 1
                                });
                            });
                            this.getGoodslist(this.slideIndex);

                            this.setCartData();
                            if (res.data["nextPage"] > 1) {
                                this.page = res.data["nextPage"];
                            } else {
                                return;
                            }
                            // 错误日志上报
                            try {
                                if (errorLogUpload && this.list.length <= 0) {
                                    errorLogUpload({
                                        logLevel: 3,
                                        errType: 21,
                                        apiError: {
                                            params: JSON.stringify(params),
                                            uri: location.href,
                                            apiUri: shopList,
                                            data: JSON.stringify(data),
                                            message: "店铺列表请求失败",
                                            method: "get",
                                            code: 200
                                        }
                                    });
                                }
                            } catch (error) {}
                        }
                        this.isLoadData = false;
                    },
                    err => {}
                );
        },

        //获取商品列表
        getGoodslist(index,initData) {
            if (this.bigDatas.data&&this.bigDatas.data[index]&&this.bigDatas.data[index].page < 1 ) return;
            initData ? this.bigDatas.data[index].page = 1 : '';
            let _thisData = this.bigDatas.data[index];
            if (_thisData&&_thisData.page < 1){
                this.isLoadData = false;
                this.$refs.swiperNavList.setBoxHeight(this.$refs[`goodsList_${this.slideIndex}`][0]);
                return;
            } 
            let params = {};
            params = {
                page: this.bigDatas.data[index].page,
                type_sales: 0,
                shop_id: this.shop_id,
                type: 2,
                count:10
            };

            this.$http.get(goodsList, { params }).then(
                res => {
                    if (res.data.result == 1) {
                        this.hasData=true;
						if (res.data["goodsList"]) {

                            this.bigDatas.data[index].page = res.data["nextPage"];
                            initData ? this.bigDatas.data[this.slideIndex].list= res.data["goodsList"] : this.bigDatas.data[this.slideIndex].list.push(...res.data["goodsList"]);
                            this.$set(this.bigDatas, 'data', this.bigDatas.data)
                            this.isLoadData = false;
                            this.$refs.swiperNavList.setBoxHeight(this.$refs[`goodsList_${this.slideIndex}`][0]);
						}
                        this.noData = res.data["nextPage"] < 1;

                        // 错误日志上报
                        try {
                            if (errorLogUpload && res.data["goodsList"].length <= 0) {
                                errorLogUpload({
                                    logLevel: 3,
                                    errType: 21,
                                    apiError: {
                                        params: JSON.stringify(params),
                                        uri: location.href,
                                        apiUri: goodsList,
                                        data: JSON.stringify(data),
                                        message: "商品列表请求失败",
                                        method: "get",
                                        code: 200
                                    }
                                });
                            }
                        } catch (error) {}
                    }
                    this.isLoadData = false;
                },
                err => {}
            );
        },

        // onSwipeLeft() {
        //     alert(1);
        // },
        // onSwipeRight() {
        //     alert(2);
        // },
        loadData() {
            if (!this.isLoadData) {
                this.isLoadData = true;
                this.getGoodslist(this.slideIndex);
            }
        },
        refresh() {
            console.log("refresh");
            this.page = 1;
            this.list = [];
            this.getShopList();
        },
        navChange(obj) {
            this.shop_id = obj.id;
           
            //统计埋点
            let data = {
                code: "TF201",
                query: {
                    name: "十元五件集市",
                    title1: "店铺"
                },
                extra: {
                    param1: this.shop_id,
                    param2: 1
                }
            };
            this.$tapConfig.batchClick(0, data, 0);
            
            let _initData = false;
            this.slideIndex = obj.index;
            if(obj.sort){
                _initData = true;
                this.bigDatas.data[this.slideIndex].sortType = obj.sort;
            }
            this.list = this.bigDatas.data[this.slideIndex].list;
            this.setCartData();
            if (  this.list.length == 0 || obj.sort ) {
                this.getGoodslist(this.slideIndex, _initData);
                return;
            }
            this.$refs.swiperNavList.setBoxHeight(this.$refs[`goodsList_${this.slideIndex}`][0]);
            this.noData = this.bigDatas.data[this.slideIndex].page < 1;
        },
        // 接收选中的skuid
        submitSku(sku) {
            console.log("skuid: " + sku.id);
            //   this.setSkuShow(false);
            //   this.setAddressShow(true);
            this.skuShow = !this.skuShow;
            // this.cartShow = !this.cartShow;
            this.flyAnimate(sku);
        },
        // 飞入动画
        flyAnimate(sku) {
            // let _r = window.innerWidth / 2;
            // let _b = window.innerHeight - _r;
            // let _toR = _r - 10;
            // let _toB = _b - 116;
            this.flyData = {
                show: true,
                img: sku.img,
                start: { right: this._r + "px", bottom: this._b + "px" },
                end: {
                    webkitTransform: `translate(${this._toR}px,${
                        this._toB
                    }px) rotateZ(1440deg) scale(0.4)`,
                    transform: `translate(${this._toR}px,${
                        this._toB
                    }px) rotateZ(1440deg) scale(0.4)`
                }
            };
            fissile_setCart(
                "add",
                {
                    goods_id: sku.goodsId || this.goodsId,
                    spec_id: sku.id,
                    num: 1,
                    goods_checked: 1 //购物车商品是否选中
                },
                {
                    project: "tenTwo",
                    shopId: this.shop_id
                }
            );
            this.shake = true;
            this.setCartData();
        },
        // 提交支付
        submitCart(obj) {
            if (!check_login()) return;
            if (obj && obj["addressId"]) {
                this.addressId = obj.addressId;
            }
            if (!this.addressId) {
                this.$msgBox.msgTxt("请至购物车添加收货地址");
                return;
            }
            if (JSON.stringify(this.cartObj) != "{}") {
                let _num = this.cartObj.num.split(",");
                let _count = 0;
                _count = _num.reduce(function(pre, next) {
                    return Number(pre) + Number(next);
                });
                if (_count == 0) {
                    this.$msgBox.msgTxt("请先选购商品");
                    return;
                }
            } else {
                this.$msgBox.msgTxt("请先选购商品");
                return;
            }
            //统计埋点
            let data = {
                code: "TF203",
                query: {
                    name: "十元五件集市",
                    title1: "店铺"
                }
            };
            obj ? "" : this.$tapConfig.batchClick(0, data, 0);
            this.payTypeShow = true;
        },
        // 获取当前商品已有数量
        setMyGoodsNum() {
            this.myGoodsNum = 0;
            if (JSON.stringify(this.cartObj) != "{}") {
                let _goods = this.cartObj.goods_id.split(",");
                let _nums = this.cartObj.num.split(",");
                _goods.map((item, index) => {
                    if (item == this.goodsId) {
                        this.myGoodsNum += Number(_nums[index]);
                    }
                });
            }
        },
        //分享
        shareFn() {
            let url =
                "https://" +
                location.host +
                "/tenFair/view/" +
                process.env.VERSION;
            //  + "/shopDetail/shop_id/" + this.shop_id;
            shareToWxMini({
                content: "我花10元就买到了2件商品。太划算了，快去看看！",
                title: "我花10元就买到了2件商品。太划算了，快去看看！",
                wxMiniPath:
                    "/pages/activity/ten/shop/shop?shopId=" +
                    this.shop_id +
                    "&shopName=" +
                    this.shopName,
                shareUrl: url,
                imgUrl: this.wxMiniImg,
                isMiniFn: () => {
                    this.$msgBox.msgTxt("请使用自带的分享功能哦～");
                }
            });
            //统计埋点
            // var data = {
            //     code: "TF202",
            //     query: {
            //         name: "十元五件集市",
            //         title1: "店铺"
            //     }
            // };
            // this.$tapConfig.batchClick(0, data, 0);
        },
        // 我的支付方式
        myPayType(id) {
            console.log("支付方式:" + id);
            this.payType = id;
            this.createOrder();
        },
        // 创建订单
        createOrder() {
            this.payTypeShow = false;
            let self = this;
            let cartObj = this.cartObj;
            let params = {
                activities: "tenTwo",
                token: this.user_info.token,
                uuid: this.user_info.uuid,
                addressId: this.addressId,
                goodsId: cartObj.goods_id,
                specId: cartObj.spec_id,
                num: cartObj.num,
                check: cartObj.goods_checked,
                paymentId: this.payType,
                os: getQueryString("os"),
                is_post: 1
            };
            this.$http.get(orderAdd, { params }).then(res => {
                let data = res.data;
                // console.log(data);
                if (data.status == 1) {
                    // 删除已创建订单的商品
                    let spec_ids = cartObj.spec_id.split(",");
                    spec_ids.map(function(item) {
                        fissile_setCart(
                            "delete",
                            {
                                spec_id: item
                            },
                            {
                                project: "tenTwo",
                                shopId: self.shop_id
                            }
                        );
                    });
                    this.setCartData();
                    this.cartShow = false;
                    userAppPay({
                        orderNo: data.data.orderNo,
                        goodsName: data.data.orderName,
                        payType: this.payType,
                        price: data.data.payAmount
                    });

                    eventTrack({
                            funType: 'h5'   ,
                            pageName: 'pay_tenpage',
                            elementId: 'pay',
                            eventType:'tap',
                            goodsId: cartObj.goods_id,
                            orderNo:data.data.orderNo,
                            actType:'2',
                            firstPage:'pay_tenpage'
                        })

                    // 错误日志上报
                    try {
                        if (errorLogUpload && !data.data.orderNo) {
                            errorLogUpload({
                                logLevel: 3,
                                errType: 21,
                                apiError: {
                                    params: JSON.stringify(params),
                                    uri: location.href,
                                    apiUri: orderAdd,
                                    data: JSON.stringify(data),
                                    message: "创建订单失败",
                                    method: "get",
                                    code: 200
                                }
                            });
                        }
                    } catch (error) {}
                } else {
                    this.$msgBox.msgTxt(data && data.message ? data.message : "网络失败");
                }
            });
        },
        //刚进页面获取默认地址id
        //返回默认地址id
        getAddressId(params) {
            this.addressId = params["addressId"];
        },
        //规格弹框
        popSku(goodsId, _item) {
            if (!check_login()) return;
            this.goodsId = goodsId;
            eventTrack({
                funType: "h5",
                pageName: "ten_page",
                elementId: "cart",
                eventType: "tap",
                goodsId: _item.goodsId,
                goodsName: _item.goodsName,
                actType: "2",
                firstPage:'ten_page'
            });


            this.shence.addToShoppingcartTrack({
                commodityID: _item.goodsId,
                commodityName: _item.goodsName,
                firstCommodity: "",
                secondCommodity: "",
                pricePerCommodity: _item.goodsPrice,
                refer: '淘集集首页',
                currentPage: document.title,
            })
            this._r = window.innerWidth - event.clientX;
            this._b = window.innerHeight - event.clientY;
            this._toR = this._r - 10;
            this._toB = this._b - 116;
            // this.goodsData=this.list.filter(function (item,index) {
            // 	return item.goodsId==goodsId;
            // })
            if (JSON.stringify(this.cartObj) != "{}") {
                let _num = this.cartObj.num.split(",");
                let _count = 0;
                _count = _num.reduce(function(pre, next) {
                    return Number(pre) + Number(next);
                });
                if (_count >= 30) {
                    this.$msgBox.msgTxt("购物篮最多能放30件，已经装不下了哦");
                    return;
                }
            }
            this.getSku();
        },
        // 获取规格，接口不给,让前端调详情
        getSku() {
            const params = {
                goods_id: this.goodsId
            };
            this.$http.get(goodsDetail, { params }).then(res => {
                var data = res.data;
                if (data && data.result == 1) {
                    let noStock =
                        data.stocknum < 1 || data.state == 1 || data.state == 2
                            ? true
                            : false;
                    if (noStock) {
                        this.$msgBox.msgTxt("该商品没有库存或已下架");
                        return;
                    }

                    this.goodsData = data.data;
                    this.setMyGoodsNum();

                    if (this.myGoodsNum >= this.goodsData.buyupnum) {
                        //判断是否超出限购数量
                        this.$msgBox.msgTxt(`该商品限购${this.goodsData.buyupnum}件`);
                    } else {
                        if (this.goodsData.spec.length < 2) {
                            let _spec = {};
                            _spec["img"] = this.goodsData.spec[0].smallImgUrl;
                            _spec["id"] = this.goodsData.spec[0].specId;
                            _spec["goodsId"] = this.goodsData.goodsId;
                            // 执行飞入动画
                            this.flyAnimate(_spec);
                            return;
                        }
                        this.skuShow = true;
                    }
                } else {
                    this.$msgBox.msgTxt(data && data.message ? data.message : "网络失败");
                }
            });
        },
        //跳转商品详情
        toGoodsDetail(goods_id, item) {
            eventTrack({
                funType: "h5",
                pageName: "ten_page",
                elementId: "good_detail",
                eventType: "tap",
                goodsId: item.goodsId,
                goodsName: item.goodsName,
                actType: "2",
                firstPage:'ten_page'
            });
            this.$router.push({
                path:
                    toTwoGoodsDetail +
                    `/shop_id/${this.shop_id}/goods_id/${goods_id}`
            });
        },
        // 获取分享图片
        getShareImg() {
            let params = { shop_id: this.shop_id };
            this.$http.get(shareImg, { params }).then(
                res => {
                    console.log(res.data.data);
                    if (res && res.data && res.data.data) {
                        this.wxMiniImg = res.data.data;
                    } else {
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }
    },
    components: {
        pullUpBox:resolve => require(['@/components/pullUpBox'], resolve),
        scrollNav:resolve => require(['./scrollNav.vue'], resolve),
        skuCheck:resolve => require(['@/components/skuCheck.vue'], resolve),
        cartBasket:resolve => require(['@/components/cartBasket.vue'], resolve),
        flyInAnimate:resolve => require(['@/components/flyInAnimate.vue'], resolve),
        payTypeBox:resolve => require(['@/components/payType.vue'], resolve),
        priceNum:resolve => require(['@/components/priceNum.vue'], resolve),
        swiperSlide,
    }
};
</script>

<style scoped lang="scss">
.wrapper {
    // height: 100%;
    // overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
}
ul {
    list-style: none;
}
.list {
    width: 100%;
    opacity: 0;
    &.hasData {
        opacity: 1;
    }
    .top {
        width: 100%;
        position: relative;
        img {
            width: 100%;
            &.rule {
                position: absolute;
                top: 5px;
                right: 0;
                width: 44px;
            }
        }
    }
    ul {
        background: #f7f7f7;
        li {
            background: #fff;
            margin-bottom: 10px;
            .col {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 13px;
                .shopIcon {
                    width: 43px;
                    height: 43px;
                    margin-right: 10px;
                    position: relative;
                    img {
                        width: 100%;
                    }
                    .horn {
                        position: absolute;
                        top: -8px;
                        right: -8px;
                        width: 16px;
                        height: 16px;
                        line-height: 16px;
                        border-radius: 100%;
                        background: red;
                        font-size: 11px;
                        color: #ffffff;
                        letter-spacing: 0;
                        text-align: center;
                    }
                }
                .shopDes {
                    flex: 1;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .shopDes-top {
                        overflow: hidden;
                        line-height: 20px;
                        margin-bottom: 6px;
                        -webkit-display: flex;
                        display: flex;
                        .name {
                            // max-width: 65%;
                            font-size: 15px;
                            color: #333333;
                            letter-spacing: 0;
                            text-align: left;
                            font-weight: bold;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            // float: left;
                        }
                        .label {
                            // float: left;
                            margin-left: 4px;
                            background: #fff2ed;
                            border-radius: 2px;
                            font-size: 11px;
                            color: #ff5a32;
                            letter-spacing: 0;
                            display: inline-block;
                            padding: 0 8px;
                            text-align: center;
                        }
                    }
                    .subtitle {
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0;
                        text-align: left;
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .btn {
                    width: 66px;
                    height: 28px;
                    margin-left: 10px;
                    line-height: 28px;
                    text-align: center;
                    font-size: 12px;
                    color: #fff;
                    background-image: linear-gradient(
                        -90deg,
                        #f53917 0%,
                        #ff8232 100%
                    );
                    border-radius: 3px;
                }
            }
            .goods_container {
                padding: 0 0 13px 13px;
                // width: 100%;
                margin-right: 13px;
                box-sizing: border-box;
                display: flex;
                overflow-x: scroll;
                -webkit-overflow-scrolling: touch;
                .good {
                    width: 100px;
                    margin-right: 6px;
                    flex-shrink: 0;
                    overflow: hidden;
                    .pic {
                        width: 100px;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 10px;
                        img {
                            width: 100%;
                        }
                    }
                    .title {
                        height: 30px;
                        font-size: 14px;
                        line-height: 16px;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }
    .label_tip {
        padding: 16px 0 0 10px;
        background: #fff;
        font-weight: bold;
    }
    .hack-line {
        height: 14px;
        background: #fff;
        position: relative;

        &::before {
            position: absolute;
            content: "";
            display: block;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.06) 0%,
                rgba(255, 255, 255, 0) 100%
            );
        }
    }
    .goods-box {
        padding: 4px 6px 48px 6px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        background: #fff;
        .good {
            background: #fff;
            width: 112px;
            margin: 0 4px 13px 2px;
            .pic {
                width: 100%;
                height: 112px;
                overflow: hidden;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 100%;
                }
            }
            .title {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .spec {
                display: flex;
                justify-content: space-between;
                height: 20px;
                align-items: center;
                .price {
                    color: #f53917;
                    font-weight: 700;
                    span {
                        font-size: 11px;
                    }
                    .val {
                        font-size: 14px;
                    }
                }
                .buy {
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    background-image: linear-gradient(
                        -90deg,
                        #f53917 0%,
                        #ff8232 100%
                    );
                    border-radius: 3px;
                    color: #fff;
                }
            }
        }
       .good:nth-child(3n){
            margin-right: 0;
        }
        .empty-data{
            color: #999;
            text-align: center;
            font-size: 16px;
            margin: 0 auto;
            img{
                width: 204px;
                margin:50px auto 22px auto;
            }
        }
    }
    .share {
        width: 66px;
        height: 66px;
        position: fixed;
        right: 10px;
        bottom: 188px;
        img {
            width: 100%;
        }
    }
    .cartIcon {
        width: 66px;
        height: 66px;
        position: fixed;
        bottom: 116px;
        right: 10px;
        z-index: 66;
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
    footer {
        background-image: linear-gradient(-90deg, #f53917 0%, #ff8232 100%);
        font-size: 18px;
        color: #ffffff;
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: center;
        position: fixed;
        z-index: 2;
        bottom: 0;
    }
}
.pt30 {
    padding-top: 30px;
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
</style>

<style scoped >
.my-con >>> span {
    font-weight: bold;
}
</style>
