<style lang="scss" scoped>
.main {
    background: #fff;
    .head {
        background: url(../assets/images/background11@2x.png) no-repeat;
        background-size: 100% 180px;
        width: 100%;
        height: auto;
        color: #fff;
        margin-top: 30px;
        .title {
            width: 241px;
            margin: 33px 0 8px 13px;
        }
        .tip {
            margin: 0 0 18px 13px;
            font-size: 12px;
        }
        .center {
            width: 100%;
            height: 92px;
            .wait_tip {
                font-size: 22px;
                margin-left: 6px;
            }
            .done_tip,
            .fail_tip {
                font-size: 24px;
                margin-left: 6px;
            }
            .suc_txt{
                font-size: 20px;
                font-weight: bold;
            }
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 18px;
            }
        }
        .s_other {
            flex-direction: column;
            div {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .mt12 {
            margin-top: 12px;
            font-size: 12px;
            color: #ffffff;
            text-align: center;
        }
        .punch {
            width: 349px;
            height: auto;
            background: #ffffff;
            padding: 30px 20px;
            box-shadow: 0 4px 10px 0 rgba(255, 26, 3, 0.14);
            border-radius: 8px;
            margin: 0 auto;
            position: relative;
            .rule {
                width: 48px;
                height: 26px;
                line-height: 26px;
                position: absolute;
                left: 20px;
                top: 0;
                text-align: center;
                color: #fff;
                background: #d40b02;
                border-radius: 0 0 10px 10px;
            }
            .new,
            .pay {
                color: #757575;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // margin-top: 10px;
                font-size: 12px;
                .punchBt {
                    width: 72px;
                    height: 72px;
                    // animation: name duration timing-function delay iteration-count direction fill-mode;
                    animation: buble 1.5s infinite linear;
                    @keyframes buble {
                        0% {
                            // transform: translate(0px, 0px);
                            transform: scale(1,1);
                        }
                        50% {
                            // transform: translate(0px, -4px);
                            transform: scale(1.1,1.1);
                        }
                        100% {
                            // transform: translate(0px, 0px);
                            transform: scale(1,1);
                        }
                    }
                }
                .fail{
                    width: 88px;
                    height: 88px;
                    margin-top: -16px;
                }
            }
            .done_center {
                justify-content: center;
            }
            .done_txt {
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                line-height: 14px;
                text-align: center;
                margin-top: 32px;
                margin-left: -5px;
                // margin-bottom: 16px;
                span {
                    font-weight: bold;
                    color: #d40b02;
                    &.bold {
                        font-size: 24px;
                    }
                }
            }
            .pay {
                div {
                    color: #333;
                    font-size: 14px;
                    letter-spacing: 0;
                    line-height: 22px;
                    span {
                        color: #d40b02;
                        font-weight: bold;
                        &.re_price {
                            font-size: 24px;
                        }
                    }
                }
            }
            .remind {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #999;
                font-size: 12px;
                p {
                    margin-right: 6px;
                }
                img {
                    width: 24px;
                    height: 12px;
                }
            }
        }
    }
    .container {
        width: 100%;
        // padding-bottom: 48px;
        margin-top: 15px;
        background: #fff;
        .top {
            width: 100%;
            position: relative;
            img {
                width: 100%;
                &.rule {
                    position: absolute;
                    width: 54px;
                    // height: 62px;
                    right: 14px;
                    top: 0;
                }
            }
            .rule_txt {
                position: absolute;
                width: 3.375rem;
                right: 14px;
                top: 0;
                text-align: center;
                font-size: 12px;
                line-height: 20px;
                color: #db2331;
            }
        }
        .goods_container {
            // height: 320px;
            overflow: hidden;
            opacity: 0;
            transition: all 0.2s;
            &.swiper-slide-active {
                // height: auto;
                opacity: 1;
            }
            .empty-data {
                color: #333;
                text-align: center;
                font-size: 16px;
            }
        }
        .goods-list {
            padding: 12px 13px;
            background-color: #fff;
            li {
                margin-top: 14px;
                display: flex;
                background: #fff;
                border-radius: 4px;
                align-items: center;
                height: 130px;
                &:first-child {
                    margin-top: 0;
                }
                .list-item-left {
                    flex: 0 0 130px;
                    height: 130px;
                    // padding: 10px 0 10px 10px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                    }
                }
                .list-item-right {
                    flex: 1;
                    padding: 5px 10px 0;
                    .goods-name {
                        // margin-bottom: 13px;
                        height: 34px;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 18.5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .goods-middle {
                        margin-top: 10px;
                        margin-bottom: 26px;
                        font-size: 11px;
                        color: #333;
                        letter-spacing: 0;
                        line-height: 11px;
                        display: flex;
                        justify-content: space-between;
                        font-weight: 500;
                        .goods-price {
                            font-size: 18px;
                            font-weight: bold;
                            color: #333;
                            letter-spacing: 0;
                            line-height: 18px;
                            span {
                                font-size: 12px;
                            }
                        }
                        .goods-orgin-price {
                            font-size: 12px;
                            color: #d40b02;
                            line-height: 18px;
                        }
                    }
                    .goods-bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        .goods-tip {
                            background: #fff1f1;
                            font-size: 11px;
                            color: #ff3932;
                            padding: 6px 10px;
                            max-width: 110px;
                            border-radius: 20px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .goods-btn {
                            width: 84px;
                            background: #ff3932;
                            border-radius: 20px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #fff;
                            text-align: center;                           
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
            }
        }
        .order {
            padding: 13px;
            padding-top: 18px;
            .label {
                font-size: 18px;
                color: #333333;
                letter-spacing: 1.12px;
                line-height: 18px;
                font-weight: bold;
                margin-bottom: 18px;
            }
            .good {
                background: #f2f2f2;
                border-radius: 8px;
                padding: 10px;
                display: flex;
                .item-left {
                    width: 80px;
                    height: 80px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .item-right {
                    flex: 1;
                    padding: 5px 10px 0;
                    .goods-name {
                        // margin-bottom: 13px;
                        height: 34px;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 17px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .goods-middle {
                        margin-top: 14px;
                        font-size: 11px;
                        color: #333;
                        letter-spacing: 0;
                        line-height: 11px;
                        display: flex;
                        justify-content: space-between;
                        font-weight: 500;
                        .goods-price {
                            font-size: 18px;
                            font-weight: bold;
                            color: #333;
                            letter-spacing: 0;
                            line-height: 18px;
                            span {
                                font-size: 12px;
                                font-weight: bold;
                            }
                        }
                        .goods-tip {
                            font-size: 12px;
                            color: #757575;
                            line-height: 18px;
                        }
                    }
                }
            }
        }
        .share {
            width: 349px;
            line-height: 44px;
            height: 44px;
            text-align: center;
            margin: 26px auto 14px auto;
            background-image: linear-gradient(
                -270deg,
                #ff342c 0%,
                #ff6967 100%
            );
            border-radius: 22px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 1px;
        }
        .share_tip {
            font-size: 12px;
            color: #757575;
            letter-spacing: 0;
            line-height: 12px;
            margin-top: 14px;
            text-align: center;
        }
        .may_like {
            width: 100%;
            padding: 30px 13px 0 13px;
            background: #fff;
            .label {
                width: 100%;
                font-size: 18px;
                font-weight: bold;
                color: #333333;
                letter-spacing: 1.12px;
                line-height: 18px;
            }
            ul {
                width: 100%;
                display: flex;
                padding: 18px 0;
                flex-wrap: wrap;
                justify-content: space-between;
                // overflow: hidden;
                li {
                    // float: left;
                    width: 169px;
                    margin-bottom: 18px;
                    .img_box {
                        width: 169px;
                        height: 169px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 8px;
                        }
                    }
                    .name {
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        height: 35px;
                        line-height: 18px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        margin: 5px 0 10px 0;
                    }
                    .other {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-weight: bold;
                        span {
                            font-weight: bold;
                            font-size: 18px;
                            color: #333333;
                            letter-spacing: 0;
                            line-height: 18px;
                        }
                        .buyBt {
                            background: #ff3932;
                            border-radius: 13px;
                            font-size: 14px;
                            color: #ffffff;
                            letter-spacing: 0;
                            text-align: center;
                            line-height: 26px;
                            width: 84px;
                            height: 26px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
            }
        }
    }
    .download {
        background: #d40b02;
        box-shadow: 0 -3px 8px 0 rgba(212, 11, 2, 0.23);
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 2.5px;
        text-align: center;
        line-height: 48px;
        width: 100%;
        height: 48px;
        position: fixed;
        bottom: 0;
    }
}
</style>

<template>
    <div class="main">
        <topDanmu :dataObj="danmuData" v-if="danmuData.length > 0"></topDanmu>
        <pullUpBox class="wrapper" :data="(showType!=0) ? list :bigDatas.data[slideIndex].list " @loadMore="loadData"  :noData="noData">
            <header class="head" v-if="showType!=5">
                <template v-if="showType==0">
                    <img src="../assets/images/title@2x.png" class="title">
                    <div class="tip">新用户购买商品 → 打卡 → 全额返现</div>
                </template>
                <template v-if="showType==1">
                    <div class="center">
                        <img src="../assets/images/icon_wait@2x.png" class="wait">
                        <div class="wait_tip">打卡全额返进行中</div>
                    </div>
                </template>
                <template v-if="showType==2">
                    <div class="center">
                        <img src="../assets/images/icon_success@2x.png" class="done">
                        <div class="done_tip">恭喜你完成打卡！</div>
                    </div>
                </template>
                <template v-if="showType==3">
                    <div class="center">
                        <img src="../assets/images/icon_fail@2x.png" class="fail">
                        <div class="fail_tip">打卡失效！</div>
                    </div>
                </template>
                <template v-if="showType==4">
                    <div class="center s_other">
                        <diV>
                            <img src="../assets/images/icon_success@2x.png" class="done">
                            <div class="done_tip suc_txt">支付成功</div>
                        </diV>
                        <p class="mt12">累计打卡{{day_length}}次，订单金额全额返现至现金账户</p>
                    </div>
                </template>
                <div class="punch">
                    <div class="rule" @click.stop="popRule">攻略</div>
                    <template v-if="showType==0">
                        <div class="new">
                            <div>
                                <p>完成打卡全额返人数：</p>
                                <numScroll :value="clock_num"></numScroll>
                            </div>
                            <div>
                                <img
                                    src="../assets/images/icon_daka@2x.png"
                                    class="punchBt"
                                    @click="user_type==2?oldUserPopShow=!oldUserPopShow:clickCardShow=!clickCardShow"
                                >
                            </div>
                        </div>
                    </template>
                    <template v-if="showType==1">
                        <div class="new">
                            <div>
                                <p>完成打卡全额返人数：</p>
                                <numScroll :value="clock_num"></numScroll>
                            </div>
                            <div>
                                <img
                                    src="../assets/images/icon_daka@2x.png"
                                    class="punchBt"
                                    @click="punchNow(1)"
                                    v-if="is_clock"
                                >
                                <img
                                    src="../assets/images/label_fail@2x.png"
                                    class="punchBt fail"
                                    @click="punchNow(2)"
                                    v-else
                                >
                            </div>
                        </div>

                        <card :origin="origin" >
                            <div class="done_txt" slot="doing">
                                已打卡{{clock_day}}次，还差{{surplus_day}}次
                                <span>￥</span>
                                <span class="bold">
                                    <!-- {{orderInfo["goods_price"]}} -->
                                    <priceNum :priceObj='{price:orderInfo["goods_price"], bigFont:"1.5rem", smallFont:"1.125rem"}'></priceNum>
                                </span>全额返
                            </div>
                        </card>
                        <div class="remind" v-if="platForm==1">
                            <p>打卡提醒</p>
                            <img
                                src="../assets/images/set_on@2x.png"
                                v-if="punch_remind"
                                @click="remind_change"
                            >
                            <img
                                src="../assets/images/set_off@2x.png"
                                v-if="!punch_remind"
                                @click="remind_change"
                            >
                        </div>
                    </template>
                    <template v-if="showType==2">
                        <div class="new done_center">
                            <div>
                                <p style="text-align:center">完成打卡全额返人数：</p>
                                <numScroll :value="clock_num"></numScroll>
                            </div>
                        </div>
                        <div class="done_txt">
                            打卡完成，
                            <span>￥</span>
                            <span class="bold">{{orderInfo["goods_price"]}}</span> 已全额返现至现金账户！
                        </div>
                        <card :origin="origin" ></card>
                    </template>
                    <template v-if="showType==3">
                        <div class="new done_center">
                            <div>
                                <p>完成打卡全额返人数：</p>
                                <numScroll :value="clock_num"></numScroll>
                            </div>
                        </div>
                        <div class="done_txt" v-if="refund_time==0">超过3次未打卡，全额返现已失效</div>
                        <div class="done_txt" v-else>订单发生退款，返现已失效</div>
                        <card :origin="origin" ></card>
                    </template>
                    <template v-if="showType==4">
                        <div class="pay">
                            <div>
                                <p>已打卡{{clock_day}}次，</p>
                                <p>
                                    还差{{surplus_day}}次
                                    <span>￥</span>
                                    <span class="re_price">{{orderInfo["goods_price"]}}</span>全额返
                                </p>
                            </div>
                            <div>
                                <img
                                    src="../assets/images/icon_daka@2x.png"
                                    class="punchBt"
                                    @click="punchNow(1)"
                                    v-if="is_clock"
                                >
                                <img
                                    src="../assets/images/label_fail@2x.png"
                                    class="punchBt fail"
                                    @click="punchNow(2)"
                                    v-else
                                >
                            </div>
                        </div>
                        <card :origin="origin" >
                            <div
                                class="done_txt"
                                slot="cancel"
                                v-if="refund_time==0"
                            >超过3天未打卡，全额返现已失效</div>
                            <div class="done_txt" slot="cancel" v-else>订单发生退款，返现已失效</div>
                        </card>
                        <div class="remind" v-if="platForm==1">
                            <p>打卡提醒</p>
                            <img
                                src="../assets/images/set_on@2x.png"
                                v-if="punch_remind"
                                @click="remind_change"
                            >
                            <img
                                src="../assets/images/set_off@2x.png"
                                v-if="!punch_remind"
                                @click="remind_change"
                            >
                        </div>
                    </template>
                </div>
            </header>
            <div class="container" v-if="showType!=5">
                <template v-if="showType==0">
                    <!-- <scrollNav
                        class="nav"
                        :fixedTop="fixedTop"
                        :navData="navData"
                        :scrollShow="scrollShow"
                        @navChange="navChange"
                        ref="nav"
                    ></scrollNav> -->
                <swiperNavList :bigDatas='bigDatas' @navChange="navChange" ref="swiperNavList">
                    <swiper-slide
                        v-for="(typelist,i) in bigDatas.data"
                        :key="i"
                        class="goods_container"
                    >
                        <ul class="goods-list" :ref="`goodsList_${i}`">
                            <li
                                v-for="(item, index) in typelist.list"
                                :key="index"
                                @click="toGoods(item.goodsId, item.goodsName,item.dayNum)"
                            >
                                <div class="list-item-left">
                                    <img v-lazy="item.img640Url" alt>
                                </div>
                                <div class="list-item-right">
                                    <div class="goods-name">{{item.goodsName}}</div>
                                    <div class="goods-middle">
                                        <div class="goods-price">
                                            <span>¥</span>
                                            <priceNum :priceObj='{price:item["minGroupPrice"], bigFont:"1.125rem", smallFont:"0.875rem"}'></priceNum>
                                        </div>
                                        <div class="goods-orgin-price">
                                            新用户专享全额返现
                                        </div>
                                    </div>
                                    <div class="goods-bottom">
                                        <div
                                            class="goods-tip"
                                        >{{reversedMNumber(item.userNum)}}人已全额返</div>
                                        <div class="goods-btn" v-bind:style="buyBtn"  @click.stop="popSku(item)">立即购买</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div v-show="typelist.list.length < 1 && typelist.page < 1" class="empty-data">暂无商品</div>
                    </swiper-slide>
                </swiperNavList>
                    <!-- <swiperList class="swiperList-el" :datas="datas" :slideIndex="slideIndex" @changeIndex="changeIndex" :style="`height: ${boxHeight}`">
                        <swiper-slide
                            v-for="(typelist,i) in datas"
                            :key="i"
                            class="goods_container"
                        >
                            <ul class="goods-list" :ref="`goodsList_${i}`">
                                <li
                                    v-for="(item, index) in typelist"
                                    :key="index"
                                    @click="toGoods(item.goodsId, item.goodsName,item.dayNum)"
                                >
                                    <div class="list-item-left">
                                        <img v-lazy="item.img640Url" alt>
                                    </div>
                                    <div class="list-item-right">
                                        <div class="goods-name">{{item.goodsName}}</div>
                                        <div class="goods-middle">
                                            <div class="goods-price">
                                                <span>¥</span>
                                                <priceNum :priceObj='{price:item["minGroupPrice"], bigFont:"1.125rem", smallFont:"0.875rem"}'></priceNum>
                                            </div>
                                            <div class="goods-orgin-price">
                                                新用户专享全额返现
                                            </div>
                                        </div>
                                        <div class="goods-bottom">
                                            <div
                                                class="goods-tip"
                                            >{{reversedMNumber(item.userNum)}}人已全额返</div>
                                            <div class="goods-btn" v-bind:style="buyBtn"  @click.stop="popSku(item)">立即购买</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-show="typelist.length < 1" class="empty-data">暂无商品</div>
                        </swiper-slide>
                    </swiperList> -->
                </template>
                <template v-if="showType != 0">
                    <div class="order">
                        <div class="label">我的返现订单</div>
                        <div class="good">
                            <div class="item-left">
                                <img v-lazy="orderInfo.goods_img">
                            </div>
                            <div class="item-right">
                                <div class="goods-name">{{orderInfo.goods_name}}</div>
                                <div class="goods-middle">
                                    <div class="goods-price">
                                        <span>¥</span>
                                        <priceNum :priceObj='{price:orderInfo["goods_price"], bigFont:"1.125rem", smallFont:"0.875rem"}'></priceNum>
                                        <!-- {{orderInfo['goods_price']}} -->
                                    </div>
                                    <div class="goods-tip">{{orderInfo.sale_num}}人已全额返</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-if="showType == 2||showType == 3">
                        <div class="share" @click="getGift">领取礼物</div>
                    </template>
                    <template v-else>
                        <div class="share" @click="sendShare">请好友帮打卡</div>
                    </template>
                    <p class="share_tip" v-if="showType==1 || showType==4 ">每天邀请1名新用户开始打卡，可帮你完成1次打卡哦</p>
                    <p class="share_tip" v-if="showType==1 || showType==4 "></p>
                    <p class="share_tip" v-else-if="showType == 2" >坚持打卡，值得鼓励！小桃准备了一份小礼物作为奖励</p>
                    <p class="share_tip" v-else>很遗憾，你没有完成打卡！小桃准备了一份小礼物作为补偿</p>
                    <div class="may_like">
                        <div class="label">猜你喜欢</div>
                        <ul>
                            <li v-for="(item,index) in list" :key="index"  @click="toAppGoods(item.goodsId)">
                                <div class="img_box">
                                    <img v-lazy="item.imgUrl||item.goodsCover">
                                </div>
                                <div class="name">{{item.goodsName}}</div>
                                <div class="other">
                                    <div>
                                        ￥
                                        <!-- <span>{{parseFloat(item.price)||parseFloat(item.salePrice)}}</span> -->
                                        <priceNum :priceObj='{price:parseFloat(item.price)||parseFloat(item.salePrice), bigFont:"1.125rem", smallFont:"0.875rem"}'></priceNum>
                                    </div>
                                    <div class="buyBt" v-bind:style="buyBtn">立即购买</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </pullUpBox>

        <!-- <div class="download" @click="download" v-if="showType!=0&&showType!=5&&platForm!=1">下载淘集集App，打卡全额返</div> -->
        <rule :ruleShow="ruleShow"></rule>
        <prompt :promptObj="promptObj"></prompt>
        <receivePop :receiveShow="receiveShow" :couponInfo="couponInfo"></receivePop>
        <clickCardPop :clickCardShow="clickCardShow"></clickCardPop>
        <downloadPop :downloadPopShow="downloadPopShow"></downloadPop>
        <additionalPop :is_popup="is_popup"></additionalPop>
        <payTypeBox :show="payTypeShow" :payChoose="payChoose" @myPayType="myPayType"></payTypeBox>
        <skuCheck :data="goodsData" @submitSku="submitSku" :skuShow="skuShow"></skuCheck>
        <addressCheck @submitAddress="selectedAddress" :addressShow="addressShow" :data="[]"></addressCheck>
        <oldUserPop :oldUserPopShow="oldUserPopShow"></oldUserPop>
        <successPop :successShow="successShow" :value="returnCashValue"></successPop>
    </div>
</template>

<script>
  import { eventTrack} from "@/assets/js/common/eventTrack.js";
import Target from '@/assets/js/common/shence';
import rule from "./rule.vue";
import card from "../components/card.vue";
import topDanmu from "../components/topDanmu";
import receivePop from "../components/receivePop";
import downloadPop from "../components/downloadPop";
import numScroll from "../components/numScroll.vue";
import scrollNav from "../components/scrollNav.vue";
import clickCardPop from "../components/clickCardPop";
import prompt from "@/components/prompt.vue";
import priceNum from "@/components/priceNum.vue";
import { swiperSlide } from "vue-awesome-swiper";
import swiperList from "@/components/swiper.list.vue";
import pullUpBox from "@/components/pullUpBox";
import addressCheck from "@/components/addressCheck";
import skuCheck from "@/components/skuCheck";
import swiperNavList from "@/components/swiper_nav_list";
import payTypeBox from "../components/payType";
import successPop from "../components/successPop";
import additionalPop from "../components/additionalPop";
import oldUserPop from "../components/oldUserPop";
import H5Pay from "../assets/js/pay";
import {
    getQueryString,
    check_login,
    jump2Login,
    shareToWxMini,
    getEnvironment,
    _getUserInfo,
    userAppPay,
    jump2goods
} from "@/assets/js/common/utils.js";
import { toHome, toGoodsDetail } from "./../assets/js/url.js";
import Wechat_api from "@/assets/js/common/wechat_api.js";
import device from "@/assets/js/common/device.js";
import App from "@/assets/js/common/wap.app.js";
import {
    goodsList,
    punchHome,
    punchAction,
    updatePunch,
    getGiftInfo,
    userStockInfo,
    checkToken,
    orderAdd,
    likeList,
    recommendList,
    getCouponInfo,
    getShareImage
} from "./../assets/js/api.js";
export default {
    name: "index",
    components: {
        card,
        scrollNav,
        swiperSlide,
        swiperList,
        prompt,
        priceNum,
        skuCheck,
        rule,
        pullUpBox,
        numScroll,
        addressCheck,
        payTypeBox,
        receivePop,
        clickCardPop,
        topDanmu,
        downloadPop,
        successPop,
        additionalPop,
        oldUserPop,
        swiperNavList
        // share
    },
    data() {
        return {
            buyBtn: {
                height: "26px",
                lineHeight: "26px"
            },
            page: [], //分类页码数组集
            page_like: 1, //猜你喜欢页码
            cate: 0, //导航分类id
            sort_type: 1, //排序类型
            origin: {
                //打卡进度
                isShow: true,
                days: 0,
                dayLength: 0
            },
            goodsData: {}, //所选商品数据(含sku)
            datas: [], //各分类所有商品数据（侧滑切换使用）
            list: [], //商品列表
            danmuData: [], //弹幕数据
            shareData: {}, //分享确认框显示内容
            addressData: [], //地址默认数据
            mySpecId: "", // 我的规格id
            goodsId: "",
            fixedTop: {
                flag: true,
                top: "0"
            },
            // navData: {}, //导航数据
            promptObj: {
                show: false,
                tittle: "请确认您的收货地址",
                ptmTxt: "",
                success: this.popPay
            },
            address_id: 0, //地址id
            showType: 5, //显示页面状态
            orderInfo: {}, //订单信息
            clock_num: 6000, //打卡人数
            is_clock: 0, //	是否可以打卡
            dayNum: 0, //	总共需要打卡天数
            clock_day: 0, //	已打卡天数
            surplus_day: 0, //	剩余打卡天数
            day_length: 0, //	总共需要打卡天数
            slideIndex: 0, //分类下标
            isEmpty: false,
            oldUserPopShow: false,//老用户弹框
            hasData: false, //页面无数据不显示，只显示加载loading
            isLoadData: true, //是否加载数据
            punch_remind: false, //打卡提醒
            scrollShow: false, //导航是否请求完成
            ruleShow: false, //规则弹框是否显示
            skuShow: false, //sku是否显示
            addressShow: false, //地址弹框是否显示
            payTypeShow: false, // 支付方式选择框是否显示
            receiveShow: false, // 领取优惠券弹框
            clickCardShow: false, //打卡弹框是否显示
            successShow: false, // 完成打卡弹框
            downloadPopShow: false, // 下载弹框
            is_popup: 0, // 是否弹出增加打卡弹框
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            md: {}, //MobileDetect对象，用来判断设备型号
            user_info: _getUserInfo(),
            payChoose: 0, //0所有 3微信 1支付宝
            device_type: "",
            returnCashValue: 0, //  返回现金的价值
            couponInfo: {}, // 优惠券信息
            user_type: 0, //1：新客，2：老客，3：打卡中老客
            refund_time: 0, // 判断打卡失效 是超过三天还是 用户发生退款
            boxHeight: 'auto',
            shareImg: `../../static/img/default.png`,
            bigDatas: {
                type: 3,
                hasSort: true,//是否有排序
                data: [] //{nav,sort,list,page}数据
            },
            noData: false,
            pun:0,
            get_coupon: 0 // 字段为1的时候表示已经领取优惠券调用 优惠券接口
        };
    },
    created() {
        // 先判断 ios 还是安卓
        try {
            if (getQueryString("os") == "ios") {
                this.punch_remind = Number(getPushStatus());
            } else {
                this.punch_remind = Number(JS.getPushStatus());
            }
        } catch (error) {};
        this.getDanmuData();
        if (this.platForm == 0) {
            this.initDown();
            if(!localStorage.getItem("hasAuthForClock")){
                jump2Login({
                    loginParams: "/s_user_id/" + getQueryString("s_user_id")
                });
                localStorage.setItem("hasAuthForClock",1);
                return;
            }
            if (getQueryString("wxLoginBack") == 0) {
                this.$msgBox.msgTxt(decodeURI(getQueryString("wxLoginMessage")) || "微信授权登录失败，请退出重新进入");
                return;
            }
            if (
                this.user_info.uuid &&
                this.user_info.token &&
                this.user_info.user_id
            ) {
                this.checkToken();
                return;
            }
            jump2Login({
                loginParams: "/s_user_id/" + getQueryString("s_user_id")
            });
        } else if(this.platForm == 2){
            this.initDown();
            this.getDatas();
        } else {
            this.getShareImg();
            this.getDatas();
        }
          eventTrack( {
                    funType: 'h5',
                    pageName: 'full_return',
                    elementId: 'pv',
                    eventType:'view',
                    activityTitle:'新人全额返',
                    firstPage:'full_return'
         }
      )
    },

    methods: {
        checkToken() {
            let params = {
                app_resource: 0
            };
            this.$http.get(checkToken, { params }).then(res => {
                console.log(res);
                let data = res.data;
                if (data && data.result == 1) {
                    // 登录未失效
                    this.getDatas();
                    // this.getGoodsList();
                    return;
                } else if (data && data.result == 0) {
                    jump2Login({
                        loginParams: "/s_user_id/" + getQueryString("s_user_id")
                    });
                } else {
                    this.$msgBox.msgTxt( (res && res.data && res.data.message) || "网络错误");
                }
            });
        },
        //攻略
        popRule() {
            this.ruleShow = true;
        },
        loadData() {
            if (!this.isLoadData) {
                this.isLoadData = true;
                this.getGoodsData(this.slideIndex);
            }
        },
        navChange(obj) {
            let _initData = false;
            // console.log(obj)
            this.cate = obj.id;
            this.slideIndex = obj.index;
            if(obj.sort){
                _initData = true;
                this.bigDatas.data[this.slideIndex].sortType = obj.sort;
            }
            this.list = this.bigDatas.data[this.slideIndex].list;
            if (  this.list.length == 0 || obj.sort ) {
                // this.getGoodsData(this.slideIndex, 1, obj.isRefresh);
                this.getGoodsData(this.slideIndex, _initData);
                return;
            }
            this.$refs.swiperNavList.setBoxHeight(this.$refs[`goodsList_${this.slideIndex}`][0]);
            this.noData = this.bigDatas.data[this.slideIndex].page < 1;
        },
        //获取弹幕信息
        getDanmuData() {
            this.$http.get(userStockInfo).then(
                res => {
                    if (res.data.result == 1) {
                        this.danmuData = res.data.data;
                    }
                },
                err => {}
            );
        },
        //获取分享图片
        getShareImg(){
            // let url = location.origin + `/clock.php/${process.env.VERSION}/Shareimage/shareImage`;
            this.$http.get(getShareImage,{}).then(res => {
                if(res.data.result==1){
                    res.data.data ? this.shareImg = res.data.data:'';
                }
            })
        },
        // changeIndex(index) {
        //     // this.navChange(this.navData.data[index]["id"]);
        //     this.$refs.nav.navClisk(this.navData.data[index]["id"]);
        // },
        //打卡
        punchNow(type) {
            let _this = this;
            if (this.showType == 2) {
                this.oldUserPopShow = true;
                // this.msgTxt = "您已经是平台的老朋友了哦～此活动仅限淘集集新用户参与。";
                return;
            }
            if (this.user_type == 4) {
                check_login();
            }
            if (this.platForm == 0 || this.platForm == 2) {
                if(getQueryString("s_user_id")==this.user_info.user_id){
                    this.$msgBox.msgTxt("请在app内操作哦");
                }else{
                    this.downloadPopShow = true;
                }
                return;
            }
            if (type == 1) {
                let params = {};
                this.$http.get(punchAction, { params }).then(res => {
                    let data = res.data;
                    if (data && data.result == 1) {
                        _this.get_coupon = data.get_coupon;
                        _this.get_coupon==1 ?_this.getCouponData():'';
                        _this.is_clock = 0;
                        this.clock_day += 1;
                        _this.origin = {
                            isShow: true,
                            days: this.clock_day,
                            dayLength: this.day_length
                        };
                        if (_this.surplus_day == 1) {
                            _this.successShow = true;
                        }
                    } else {
                        this.$msgBox.msgTxt(data.message);
                    }
                });
            } else {
                this.$msgBox.msgTxt("今日打卡已完成哦");
            }
        },
        // 获取优惠券接口
        getCouponData(){
            let self = this;
               this.$http.get(getCouponInfo,{}).then(res=> {
                    self.couponInfo = res.data;
                    self.receiveShow = true;
           });
        },
        //获取打卡人数
        getPunchNum() {
            let params = {};
            // this.pun = setInterval(() => {
                this.$http.get(updatePunch, { params }).then(res => {
                    // console.log(res.res.res)
                    let data = res.data;
                    if (data && data.result == 1) {
                        this.clock_num = data.clock_num;
                        try {
                          if(errorLogUpload && (data.clock_num<6000)){
                            errorLogUpload({
                                logLevel: 3,
                                errType: 21,
                                apiError: {
                                    params: JSON.stringify(params),
                                    uri: location.href,
                                    apiUri: updatePunch,
                                    data: JSON.stringify(data),
                                    message: "点击打卡失败",
                                    method: 'get',
                                    code: 200
                                    }
                                })
                            }                            
                        } catch (error) {

                        }
                    }
                });
            // }, 5000);
        },
        getDatas() {
            let _this = this;
            let params = {};
            this.$http.get(punchHome, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    _this.user_type = data.user_type;
                    _this.refund_time = Number(data.refund_time);

                    _this.getPunchNum();
                    if (data.user_type == 3) {
                        if (data.clock_status == 1 && getQueryString("paid")) {
                            this.showType = 4;
                        } else {
                            this.showType = data.clock_status;
                        }
                        this.getGoodsData(this.slideIndex);
                        this.clock_day = parseInt(data.clock_day);
                        this.surplus_day = parseInt(data.surplus_day);
                        this.day_length = parseInt(data.clock_day) +  parseInt(data.surplus_day);
                        this.is_clock = data.is_clock;
                        this.is_popup = data["is_popup"];
                        this.orderInfo = data.goods_info;
                        this.returnCashValue = Number(
                            this.orderInfo.goods_price
                        );
                        let self = this;
                        this.shareData = {
                            title: `坚持打卡${self.day_length}次就可以免费领到这件商品，快来一起打卡吧！`,
                            content: `${
                                data.goods_info.goods_name
                            }\n 打卡${self.day_length}次，全额返现`,
                            wxMiniPath: '/pages/webview/webview?linkId=' + location.origin + `/clock/view/${process.env.VERSION}/index&s_user_id=` + this.user_info.user_id,
                            shareUrl:
                                location.origin +
                                `/clock/view/${process.env.VERSION}/index/s_user_id/` +
                                this.user_info.user_id,
                            // imgUrl: data.goods_info.goods_img
                            imgUrl: this.shareImg
                        };
                        this.origin = {
                            isShow: true,
                            days: this.clock_day,
                            dayLength: this.day_length
                        };
                        if (this.platForm == 0) {
                            //初始化分享
                            new Wechat_api({
                                shareJson: {
                                    title: `坚持打卡${self.day_length}次就可以免费领到这件商品，快来一起打卡吧！`, // 分享标题
                                    link:
                                        location.origin +
                                        `/clock/view/${process.env.VERSION}/index/s_user_id/`+self.user_info.user_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: data.goods_info.goods_img, // 分享图标
                                    desc: `${
                                        data.goods_info.goods_name
                                    }\n 打卡${self.day_length}次，全额返现`
                                }
                            });
                        }
                    } else {
                        if (data.user_type == 2) {
                            if(localStorage.getItem("clock_old_pop_time_" + this.user_info.user_id)!=new Date().getDate()){
                                localStorage.setItem("clock_old_pop_time_" + this.user_info.user_id,new Date().getDate())
                                this.oldUserPopShow = true;
                            }
                        }
                        this.showType = 0;
                        // this.navData = {
                        //     data: data.cate_list,
                        //     type: 3
                        // };
                        data.cate_list.map(item => {
                            this.bigDatas.data.push({
                                nav: item,
                                list: [],
                                page: 1,
                                sortType: 1
                            });
                        })
                        let _tempData = Object.values(data.goods_list)
                        this.bigDatas.data[0].list.push(..._tempData);
                        this.bigDatas.data[0].page= data.next_page;
                        this.noData = data.next_page < 1 ||  (data.goodsList && data.goodsList.length<20);

                        for (let i = 0; i < data.cate_list.length; i++) {
                            this.datas.push([]);
                            this.page.push(1);
                        }
                        this.datas[0].push(...data.goods_list);
                        this.list = this.datas[0];
                        this.page[0] = data.next_page;

                        if (data.cate_list.length > 0) {
                            this.cate = data.cate_list[0]["id"];
                            this.scrollShow = true;
                        }

                        if (this.platForm == 0) {
                            //初始化分享
                            new Wechat_api({
                                shareJson: {
                                    title:
                                        "购买商品，每日打卡即可全额返现，快来看看！", // 分享标题
                                    link:
                                        location.origin +
                                        `/clock/view/${process.env.VERSION}/index/` // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                }
                            });
                        }
                        //统计埋点
                        let data_s = {
                            code: "DK01",
                            query: {
                                name: "打卡主页面"
                            },
                            extra: {
                                param1: getEnvironment() == 1 ? 1 : 2
                            }
                        };
                        this.$tapConfig.batchClick(0, data_s, 0);
                        try {
                            if(errorLogUpload && (data.cate_list.length<=0 || data.goods_list.length<=0 )){
                                errorLogUpload({
                                    logLevel: 3,
                                    errType: 21,
                                    apiError: {
                                        params: JSON.stringify(params),
                                        uri: location.href,
                                        apiUri: punchHome,
                                        data: JSON.stringify(data),
                                        message: "获取详情数据失败",
                                        method: 'get',
                                        code: 200
                                        }
                                    })
                            }
                        } catch (error) {
                            
                        }
                    }
                     // 先判断 ios 还是安卓
                    if (getQueryString("os") == "ios") {

                        window.removePayToUrgency=function(){
                            _this.payTypeShow = false;
                            _this.$msgBox.msgTxt("支付失败");

                        }
                    }else if(getQueryString("os") == "android") {
                        JS.removePayToUrgency=function(){
                            _this.payTypeShow = false;
                            _this.$msgBox.msgTxt("支付失败");  
                        }
                    }
                    this.clock_num = data.clock_num;

                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }
                } else {
                    this.$msgBox.msgTxt((res && res.data && res.data.message) || "商品列表请求失败");
                    // this.msgTxt = (res && res.data && res.data.message) || "商品列表请求失败";
                }
                this.isLoadData = false;

                // this.getGoodsData(0);
            });
        },
        //推荐及排序分类商品
        getGoodsData(index, initData) {
            let url = "";
            let params = {};
            if (this.showType == 0) {
                initData ? this.bigDatas.data[index].page = 1 : '';
                let _thisData = this.bigDatas.data[index];
                if (_thisData.page < 1){
                    this.isLoadData = false;
                    this.$refs.swiperNavList.setBoxHeight(this.$refs[`goodsList_${this.slideIndex}`][0]);
                    return;
                } 
                // if (isRefresh) {
                //     params.page = 1;
                // } else {
                    params.page = _thisData.page;
                // }
                if (this.cate == 0 || this.cate) {
                    params.cate_id = _thisData.nav.id;
                    params.sort_type = _thisData.sortType;
                }
                url = goodsList;
            } else {
                if (this.page_like < 1){
                    this.isLoadData = false;
                    return;
                };
                url = recommendList;
                params.page = this.page_like;
            }
            this.$http.get(url, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1||data && data.status == 1) {
                    if (this.showType == 0) {
                        this.bigDatas.data[index].page = data.next_page;
                        initData ? this.bigDatas.data[this.slideIndex].list= data.data : this.bigDatas.data[this.slideIndex].list.push(...data.data);
                        this.$set(this.bigDatas, 'data', this.bigDatas.data)
                        this.isLoadData = false;
                        this.$refs.swiperNavList.setBoxHeight(this.$refs[`goodsList_${this.slideIndex}`][0]);
                        this.noData = data.next_page < 1 ||  (data.goodsList && data.goodsList.length<20);
                    } else {
                        if(this.page_like==1){
                            this.list = data.data.goodsList;
                            this.noData = data.data.goodsList.length<20;
                        }else{
                            this.noData = data.data.goodsList.length<20;
                            this.list=this.list.concat(data.data.goodsList)
                        }
                        if(data.data&&data.data.goodsList&&data.data.goodsList.length==20){
                            this.page_like ++;
                        }else{
                            this.page_like=0;
                        }
                    }

                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }
                    try {
                       if(errorLogUpload && (data.data.goodsList.length<=0)){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify(params),
                                uri: location.href,
                                apiUri: url,
                                data: JSON.stringify(data),
                                message: "推荐及排序分类商品失败",
                                method: 'get',
                                code: 200
                                }
                            })
                    }
                    } catch (error) {
                        
                    }
                } else {
                    this.$msgBox.msgTxt((res && res.data && res.data.message) || "商品列表请求失败");
                }
                this.isLoadData = false;
            });
        },
        //规格弹框
        popSku(goods) {
            if (!check_login()) return;
             eventTrack({
                    funType: 'h5'   ,
                    pageName: 'full_return',
                    elementId: 'buy',
                    eventType:'tap',
                    firstPage:'full_return'
                })
            if(this.platForm!=2){
                this.shence.oneBuyTrack({
                commodityID: goods.goodsId,
                commodityName: goods.goodsName,
                firstCommodity: "",
                secondCommodity: "",
                pricePerCommodity: goods.minGroupPrice,
                commodityNumber:'1',
                refer: '活动页打卡全额返',
                currentPage: '打卡全额返',
              })             
            }

            if(localStorage.getItem("clock_old_pop_time_" + this.user_info.user_id)==new Date().getDate()){
                this.oldUserPopShow = true;
                return;
            }
            if(this.platForm == 2){
                this.toGoods(goods.goodsId, goods.goodsName,goods.dayNum)
                return;
            }
            if (this.showType == 2) {
                this.$msgBox.msgTxt("您已经是平台的老朋友了哦～此活动仅限淘集集新用户参与。");
                return;
            }
            this.goodsId = goods.goodsId;
            this.goodsId = goods.goodsId;

            this.goodsData = goods;
            if (!goods["totalStock"]) {
                this.$msgBox.msgTxt("该商品没有库存或已下架"); 
                return;
            }
            if (!goods["isManySpec"]) {
                this.addressShow = true;
                this.mySpecId = goods["spec"][0]["specId"];
                return;
            }
            // this.goodsData['show'] = goods['show'];
            // this.goodsData['spec'] = goods['spec'];

            this.skuShow = true;
        },

        // 获取用户当前选择的地址
        selectedAddress(selectAddress) {
            this.promptObj.ptmTxt = selectAddress.addrTxt;
            this.address_id = selectAddress.id;
            this.promptObj.show = true;
        },
        // 邀请好友打卡
        sendShare() {
            //统计埋点
            let data_s = {
                code: "DK02",
                query: {
                    name: "邀请打卡"
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);
            if (this.platForm == 1) {
                shareToWxMini(this.shareData);
            } else if (this.platForm == 0) {
                // 初始化分享
                let self = this;
                new Wechat_api({
                    shareJson: {
                        title: `坚持打卡${self.day_length}次就可以免费领到这件商品，快来一起打卡吧！`, // 分享标题
                        link:
                            location.origin +
                            `/clock/view/${process.env.VERSION}/index/s_user_id/` +
                            self.user_info.user_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: self.orderInfo.goods_img, // 分享图标
                        desc: `${self.orderInfo.goods_name}\n 打卡${
                            self.surplus_day
                        }次，全额返现`
                    }
                });
                this.$msgBox.msgTxt("点击右上角···转发给你的好友哦!"); 
            }else if(this.platForm == 2){
                if(getQueryString("s_user_id")==this.user_info.user_id){
                    this.$msgBox.msgTxt("请在app内操作哦");
                }else{
                    this.downloadPopShow = true;
                }

            }
                // 新的埋点
            eventTrack({
                funType: 'h5'   ,
                pageName: 'full_return',
                elementId: 'share',
                eventType:'tap',
                firstPage:'full_return'
            })
        },
        //获取礼物
        getGift() {
            let _this = this;
            let params = {};
            if (this.platForm == 0) {
                this.downloadPopShow = true;
                return;
            } else {
                this.$http.get(getGiftInfo, { params }).then(res => {
                    let data = res.data;
                    if (data && data.result == 1) {
                        _this.couponInfo = data;
                        this.receiveShow = true;
                    } else {
                        this.$msgBox.msgTxt(data.message); 
                    }
                });
            }
        },
        // 接收选中的skuid
        submitSku(obj) {
            this.mySpecId = obj.id;
            this.skuShow = !this.skuShow;
            // this.shareData["imgUrl"] = obj.img;
            this.addressShow = true;
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
            console.log("支付方式:" + id);
            this.payType = id;
            this.createOrder();
        },
        createOrder(obj) {
            let self = this;
            let os = getQueryString("os");
            let params = {
                // activities:"signInCashBack",
                version:  getQueryString("version"),
                user_id: this.user_info["user_id"],
                goods_id: this.goodsId,
                spec_id: this.mySpecId,
                cate_id: this.cate,
                address_id: this.address_id,
                payment_id: this.payType,
                num: 1,
                os: os
            };
            this.$http.post(orderAdd, params).then(res => {
                let data = res.data;
                if (data["status"] == 1) {
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
                        // H5Pay.init("wxpayIn", {
                        //     order_no: data.data.orderNo,
                        //     goods_name: data.data.orderName,
                        //     payNo: data.data.payNo
                        // });
                    }
                    try {
                        if(errorLogUpload && (!data.data.orderNo)){
                            errorLogUpload({
                                logLevel: 3,
                                errType: 21,
                                apiError: {
                                    params: JSON.stringify(params),
                                    uri: location.href,
                                    apiUri: orderAdd,
                                    data: JSON.stringify(data),
                                    message: "没有订单号",
                                    method: 'post',
                                    code: 200
                                    }
                                })
                        }
                    } catch (error) {
                        
                    }

                    // this.$router.replace(`${toHome}/paid/1`);
                } else {
                    this.$msgBox.msgTxt(data && data.message ? data.message : "网络失败"); 
                }
            });
        },
        // changeIndex(index) {
        //     console.log(index)
        //     this.$refs.nav.navClisk(this.navData.data[index]["id"]);
        // },
        // 去商品详情页
        toGoods(id, title, num) {
            if (this.platForm == 0) {
                this.downloadPopShow = true;
                return;
            }
            if (this.showType == 2) {
                this.oldUserPopShow = true;
                return;
            }
            if (this.user_type == 4) {
                check_login();
            } else {
                let url = "";
                var  title = title.replace(/%/g, '%25') || '';
                getQueryString("s_user_id")?url="/s_user_id/"+getQueryString("s_user_id"):"";
                this.$router.push(
                    `${toGoodsDetail}/goods_id/${id}/goods_name/${title}/group_number/${num}/cate_id/${this.cate}${url}`
                );
            }
        },
        // 去商品详情页
        toAppGoods(id) {
            if (this.platForm == 1 || this.platForm == 2) {
                jump2goods(id);
            } else {
                this.downloadPopShow = true;
            }
        },
        //打开消息提醒
        remind_change() {
            //统计埋点
            let data_s = {
                code: "DK01_1",
                query: {
                    name: "打卡主页面",
                    title1: "提醒"
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);
            if(this.platForm==2){
                this.$msgBox.msgTxt("请在app内操作哦");
                return;
            }
            try {  
                // 先判断 ios 还是安卓
                if (getQueryString("os") == "ios") {
                   
                    if (!Number(getPushStatus())) {
                        App.startPushSet();

                    } else {
                        this.$msgBox.msgTxt("已为你设置好打卡提醒");
                    }
                } else {
                    if (!Number(JS.getPushStatus())) {
                        App.startPushSet();
                    } else {
                        this.$msgBox.msgTxt("已为你设置好打卡提醒");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        initDown() {
            //判断数组中是否包含某字符串
            Array.prototype.contains = function(needle) {
                for (let i in this) {
                    if (this[i].indexOf(needle) > 0) return i;
                }
                return -1;
            };
            let self = this;
            self.device_type = navigator.userAgent; //获取userAgent信息
            this.md = new device(self.device_type); //初始化mobile-detect
        },
        // 转换数字
        reversedMNumber: function(number) {
            if (number > 9999) {
                var myString = String(number / 10000);
                var index =   myString.indexOf(".")
                var smallNum =   myString.slice(index+1,index+2);                
                 if (index>-1) {
                 	if (smallNum=='0') {
                         myString = myString.slice(0, myString.indexOf(".")); 
                 	}else {
                 		myString = myString.slice(0, myString.indexOf(".") + 2);
                 	}
                 }
                  return parseFloat(myString)  + '万'
            } else {
                return number;
            }
        },
        //下载处理
        download() {
            let os = this.md.os(); //获取系统
            let model = "";
            if (os == "iOS") {
                //ios系统的处理
                os = this.md.os() + this.md.version("iPhone");
                model = this.md.mobile();
            } else if (os == "AndroidOS") {
                //Android系统的处理
                os = this.md.os() + this.md.version("Android");
                var sss = this.device_type.split(";");
                var i = sss.contains("Build/");
                if (i > -1) {
                    model = sss[i].substring(0, sss[i].indexOf("Build/"));
                }
            }
            if (model == "iPhone" || model == "iPad") {
                window.location.href =
                    "https://itunes.apple.com/cn/app/%E6%B7%98%E9%9B%86%E9%9B%86/id1308838222?mt=8";
                // }else if(model.indexOf("SM")>-1){//三星
                //     window.location.href="https://itunes.apple.com/cn/app/淘集集/id1308838222?mt=8";
                // }else if(model.indexOf("MM")>-1||model.indexOf("m2")>-1||model.indexOf("PRO")>-1||model.indexOf("MX")>-1||model.indexOf("m1")>-1){//oppo
                //     window.location.href="https://itunes.apple.com/cn/app/淘集集/id1308838222?mt=8";
            } else if (model.indexOf("vivo") > -1) {
                //vivo
                window.location.href =
                    "http://appdetailh5.vivo.com.cn/detail/1997101?source=7";
            } else if (
                model.indexOf("MI") > -1 ||
                model.indexOf("Redmi") > -1
            ) {
                //小米
                window.location.href =
                    "http://app.mi.com/details?id=com.huanshou.taojj&ref=search";
            } else if (
                model.indexOf("HUAWEI") > -1 ||
                model.indexOf("AL") > -1 ||
                model.indexOf("TL") > -1 ||
                model.indexOf("EML") > -1 ||
                model.indexOf("TRT") > -1 ||
                model.indexOf("KNT") > -1
            ) {
                //华为
                window.location.href = "http://app.hicloud.com/app/C100167209";
            } else {
                window.location.href =
                    "https://a.app.qq.com/o/simple.jsp?pkgname=com.huanshou.taojj&from=singlemessage&isappinstalled=0";
            }
        }
    },
    mounted(){
           this.shence = new Target({
            "dom":"",
            "productDom":"",
            "data":"",
        });
    },
    destroyed: function () {
        // clearInterval(this.pun);
    },
};
</script>
