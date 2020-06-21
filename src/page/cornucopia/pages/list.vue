
<template>
    <div class="list-page">
        <pullUpBox class="wrapper" :data="goodListData" @loadMore="loadData">
            <ul class="list">
                <li class="item" :key="index" v-for="(item ,index) in goodListData ">
                    <span class="hot" v-show="item.is_fire==1"></span>
                    <img v-lazy="item.goods_img">
                    <h6 class="title-6">{{item.goods_name}}</h6>
                    <a
                        href="javascript:;"
                        v-if="item.stock_num_total>0"
                        @click="submitOrder(item)"
                        class="btn literary-btn"
                    >{{item.goods_wealth}} 财气</a>
                    <a
                        href="javascript:;"
                        v-else
                        class="btn literary-btn"
                        :class="{active:true}"
                    >已兑完</a>
                </li>
            </ul>
        </pullUpBox>
        <!-- 这里时信息提示区域 -->
        <msgBox :msgTxt="msgTxt"></msgBox>
        <!-- 这里显示收获地址列表 -->
        <addressCheck @submitAddress="selectedAddress" :addressShow="addressShow"></addressCheck>
        <!-- 确定是否选择这个地址 -->
        <prompt :promptObj="promptObj"></prompt>
        <!-- 规格选择 -->
        <skuCheck :skuShow="skuShow" :data="goodsItem" @submitSku="submitSku"></skuCheck>
    </div>
</template>

<script>
import pullUpBox from "@/components/pullUpBox";
import msgBox from "./msgBox";
import addressCheck from "./addressCheck";
import prompt from "@/components/prompt";
import skuCheck from "@/components/skuCheck";
import { goodsDetail, secondGoodsDetail } from "./../assets/js/api.js";
import {
    bindAddAddress,
    goodList,
    exchange_goods
} from "./../assets/js/api.js";
export default {
    name: "list",
    data() {
        return {
            msgTxt: "",
            addressData: [],
            addressShow: false,
            promptObj: {
                show: false,
                tittle: "请确认您的收货地址",
                ptmTxt: "",
                success: this.submieSuccess
            },
            isAddDone: false,
            skuShow: false,
            skuType: {},
            goodsItem: {}, //存放商品规则信息
            spec_id: "", // 我的规格id
            goods_id: "", //  商品id
            address_id: "", // 地址id
            goodListData: [], // 存放数据列表
            wealth: "", //用户当前财气值,
            next_page: 0, // 下一页编号，为0时表示无下一页
            page: 1,
            isLoadData: true //是否加载数据
        };
    },
    created() {
        this.getGoodList();
    },
    methods: {
        submitOrder(item) {
            let _this = this;
            _this.goods_id =item.goods_id;
            if (_this.wealth < item.goods_wealth) {
                _this.msgTxt = "财气值不足，赶快去积攒吧~";
            } else {
                if (item.have_more_spec == 0) {
                    _this.spec_id = item.spec[0].specId;
                    _this.addressShow = true;
                } else {
                    _this.goodsItem = item;
                    _this.goodsItem.img320url = item.goods_img;
                    _this.skuShow = true;
                }
            }
        },
        // 获取用户当前选择的地址
        selectedAddress(selectAddress) {
            this.promptObj.ptmTxt = selectAddress.addrTxt;
            this.address_id = selectAddress.id;
            this.promptObj.show = true;
        },
        // 获取商品列表
        getGoodList() {
            let _this = this;
            let params = {
                page: this.page
            };
            this.$http.get(goodList, { params }).then(res => {
                if (res.data.result == 1) {
                    let data = res.data;
                    _this.wealth = data.wealth;
                    _this.next_page = data.next_page;
                    this.isLoadData = false;
                    if (_this.next_page != 0) {
                        this.page++;
                    } else {
                        this.isLoadData = true;
                    }
                    _this.goodListData = _this.goodListData.concat(data.data);
                } else {
                }
            });
        },
        loadData() {
            if (!this.isLoadData) {
                this.isLoadData = true;
                this.getGoodList();
            }
        },
        // 最终用户兑换商品
        submieSuccess() {
            let _this = this;
            let params = {
                goods_id: _this.goods_id,
                spec_id: _this.spec_id,
                address_id: _this.address_id
            };
            this.$http
                .get(exchange_goods, { params })
                .then(
                    res => {
                        this.addressShow = false;                       
                        if (res.data.result == 1) {
                            this.msgTxt =
                                " 订单已创建,平台将在48小时内安排发货";
                            _this.isAddDone = true;
                            _this.page= 1;
                            _this.goodListData=[];
                            _this.getGoodList();
                        } else {
                            this.msgTxt =
                                res.data.message || " 兑换失败请联系客服";                               
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
        // 接收选中的skuid
        submitSku(obj) {
            this.spec_id = obj.id;
            this.skuShow = !this.skuShow;
            this.addressShow = true;
        }
    },
    mounted() {},
    components: {
        msgBox,
        addressCheck,
        prompt,
        skuCheck,
        pullUpBox
    }
};
</script>

<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}
.msgBox {
    min-width: 209px;
}

.list-page {
    background: #f8f8f8;
    padding: 15px 15px 0;
    .list {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .item {
            position: relative;
            background: #fff;
            width: 165px;
            margin-bottom: 15px;
            border-radius: 0 0 .25rem .25rem;
            img {
                width: 100%;
                height: 130px;
                border-radius: 4px 4px 0 0;
            }
            .hot {
                position: absolute;
                top: 0;
                left: 0;
                width: 61px;
                height: 22px;
                background: url("../assets/images/icon_rmdh@2x.png");
                background-size: cover;
            }
            .title-6 {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-size: 13px;
                color: #333333;
                letter-spacing: 0;
                padding: 0 10px;
                margin: 10px 0;
                height: 30px;
            }
            .literary-btn {
                display: block;
                width: 128px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                margin: 0 auto;
                background-image: linear-gradient(
                    -180deg,
                    #ff5d4d 0%,
                    #ff3429 98%
                );
                box-shadow: 0 4px 8px 0 rgba(237, 55, 45, 0.25);
                border-radius: 15px;
                font-size: 15px;
                color: #ffffff;
                letter-spacing: 0;
                margin-bottom: 15px;
                &.active {
                    background-image: linear-gradient(
                        -180deg,
                        #eaeaea 6%,
                        #d0d0d0 93%
                    );
                    box-shadow: 0 3px 6px 0 rgba(74, 60, 59, 0.1);
                }
            }
        }
    }
}
</style>
