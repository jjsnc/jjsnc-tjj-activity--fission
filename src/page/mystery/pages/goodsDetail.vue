<style lang="scss" scoped>
.page-details {
    padding-bottom: 48px;
    height: fit-content;
    .bg-back {
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 999;
    }
    .sec-goods {
        padding: 0 12px 12px;
        background: #fff;
        .title {
            display: flex;
            justify-content: space-between;
            padding: 22px 0 16px;
            font-weight: bold;
            .number {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                letter-spacing: 0;
            }
            .price {
                font-family: PingFangSC-Semibold;
                font-size: 20px;
                color: #ee0000;
                letter-spacing: 1px;
                display: flex;
                font-size: 0;
                .now {
                    font-size: 20px;
                    .icon {
                        font-size: 14px;
                    }
                }
                .old {
                    margin-left: 15px;
                    font-size: 13px;
                    color: #999;
                    // align-self: flex-end;
                    margin-top: 7px;
                    text-decoration: line-through;
                }
            }
            .right-area {
                flex: 1;
                text-align: right;
                align-self: flex-end;
                .earn {
                    display: inline-block;
                    padding: 5px 10px;
                    background: #ffe6de;
                    font-size: 12px;
                    color: #ee0000;
                    margin-right: 10px;
                    border-radius: 4px;
                }
                .sold {
                    display: inline-block;
                    font-size: 12px;
                    color: #999;
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
            .btn {
                display: block;
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 16px;
                color: #fff;
            }
            .more-btn {
                background: #ff6632;
                .icon {
                    margin-right: 6px;
                }
            }
            .over-btn {
                background: #c0c0c0;
            }
            .padding-btn {
                background: #c0c0c0;
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
        <!-- <div class="bg-back" @click="backHome">
            <img src="../assets/images/icon_back@2x.png" width="30" height="30" />
        </div> -->
        <!-- 轮播 -->
        <div class="banner">
            <banner :banners="banners"></banner>
        </div>
        <section class="sec-goods">
            <div class="title">
                <div class="price">
                    <div class="now">
                        <span class="icon">¥</span>
                        {{goodsData.price}}
                    </div>
                    <div class="old">{{goodsData.shopPrice}}</div>
                </div>
                <div class="right-area">
                    <!-- <div class="number earn">{{goodsData.buyButtonTextTo}}x2</div> -->
                    <div class="number sold">{{goodsData.groupCount}}</div>
                </div>
            </div>
            <p class="details">{{goodsData.name}}</p>
        </section>
        <div class="gap"></div>
        <section class="sec-ensure">
            <div class="ensure_logo">
                <img src="../assets/images/img_safeguard@3x.png" />
            </div>
        </section>
        <div class="gap"></div>

        <section class="sec-goods-img">
            <img v-lazy="item.img640url" :key="index" v-for="(item, index) in goodsData.image" />
        </section>
        <footer class="sec-footer">
            <div class="btn-group">
                <a
                    href="javascript:;"
                    v-if="time>0"
                    @click="paddingTips"
                    class="padding-btn btn"
                >今日23:00准时开抢</a>
                <a
                    href="javascript:;"
                    v-else-if="time> -60"
                    @click="seckillTips"
                    class="more-btn btn"
                >
                    <img
                        class="icon"
                        src="../assets/images/icon_clock_big@2x.png"
                        width="16"
                        height="16"
                    />立即抢购
                </a>
                <a href="javascript:;" v-else @click="overTips" class="over-btn btn">已抢完，明日再来~</a>
            </div>
        </footer>
    </div>
</template>


<script>
import { getQueryString, changeTitle } from "@/assets/js/common/utils.js";
import banner from "@/components/swiper";
import msgBox from "@/components/msgBox";
import { goodsInfo } from "./../assets/js/api.js";

export default {
    data() {
        return {
            numShow: false,
            buyStart: false,
            goodsData: {},
            banners: [],
            goods_id: getQueryString("goodsId"),
            time: 10,
            timer: {}
        };
    },
    created() {
        changeTitle("神秘专区");
        this.getGoodsInfo();
    },
    methods: {
        getGoodsInfo() {
            let self = this;
            this.$http
                .get(goodsInfo, {
                    params: {
                        api_url: '"stock/userStockInfo"',
                        goods_id: self.goods_id,
                        source: "0",
                        is_asynchronous: 0
                    }
                })
                .then(
                    res => {
                        if (res.data.result == 1) {
                            self.goodsData = res.data.data;
                            let { album, time } = res.data.data;
                            self.time = time;
                            album.forEach(item => {
                                self.banners.push(item.img640url);
                            });
                            self.countDown();
                        } else {
                            this.$msgBox.msgTxt(res.data.message);
                        }
                    },
                    err => {}
                );
        },
        // 提示信息
        seckillTips() {
            setTimeout(() => {
                this.$msgBox.msgTxt("当前请求人数过多，请稍后再试");
            }, 500);
        },
        overTips() {
            this.$msgBox.msgTxt("已抢完，明日继续哦");
        },
        paddingTips() {
            this.$msgBox.msgTxt("23点开抢哦");
        },
        countDown() {
            let self = this;
          
            self.timer = setInterval(() => {
                self.time -= 1;
            }, 1000);
        },
        // 返回店铺操作
        backHome() {
            this.$router.go(-1);
        }
    },
    mounted() {},
    components: {
        banner,
        msgBox
    },
    beforeDestroy() {
        clearInterval(self.timer);
    }
};
</script>


