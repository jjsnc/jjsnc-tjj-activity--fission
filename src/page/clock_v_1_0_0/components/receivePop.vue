<template>
    <div :class="['receive', receiveShow ? 'share-show' : '']">
        <div class="content">
            <div class="s-c-close" @click.stop="closeShare()">
                <img src="../assets/images/close@2x.png">
            </div>
            <div class="header">
                <h3 class="title-3">恭喜你领到了全场通用券!</h3>
                <div class="coupon-info">
                    <div class="left-area">
                        <div class="top">
                            <span class="icon">￥</span>
                            <span class="number">{{couponInfo.coupon_discount}}</span>
                        </div>
                        <div class="text">满{{couponInfo.coupon_amount}}元可用</div>
                    </div>
                    <div class="right-area">
                        <div class="top">{{couponInfo.coupon_name}}</div>
                        <div class="date">有效期至{{couponInfo.coupon_time}}</div>
                    </div>
                </div>
                <h6 class="title-6">已放入我的优惠券，下单可使用</h6>
            </div>
            <div class="footer">
                <a class="btn" @click.stop="closeShare()">我收下啦</a>
            </div>
        </div>
    </div>
</template>

<script >
export default {
    name: "receivePop",
    props: {
        receiveShow: {
            type: Boolean,
            default: false
        },
        couponInfo: {
            type: Object,
            default: {}
        }
    },
    methods: {
        closeShare() {
            this.$parent.receiveShow = false;
        }
    }
};
</script>

<style scoped lang="scss">
.receive {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    opacity: 0;
    border-radius: 10px;
    visibility: hidden;
    &.share-show {
        opacity: 1;
        visibility: visible;
        z-index: 998;
        .content {
            -webkit-transform: translate(-50%, -50%) scale(1, 1);
            transform: translate(-50%, -50%) scale(1, 1);
        }
    }
    .content {
        width: 315px;
        height: 414px;
        border-radius: 10px;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) scale(0, 0);
        transform: translate(-50%, -50%) scale(0, 0);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        .s-c-close {
            position: absolute;
            right: 20px;
            top: -38px;
            width: 25px;
            height: 25px;
            img {
                width: 100%;
                // height: 100%;
            }
            &::after {
                content: "";
                display: block;
                position: absolute;
                border-left: 1px solid #ffffff;
                width: 1px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                height: 13px;
                left: 0;
                right: 0;
                margin: auto;
                bottom: -13px;
            }
        }
        .header {
            width: 315px;
            height: 310px;
            background: url("../assets/images/pic4@2x.png");
            border-radius: 10px 10px 0px 0px;
            background-size: 315px 310px;
            .title-3 {
                padding-top: 46px;
                text-align: center;
                font-size: 20px;
                color: #ffffff;
                letter-spacing: 0;
                text-align: center;
                line-height: 24px;
                font-weight: bold;
            }
            .title-6 {
                font-size: 12px;
                color: #ffffff;
                letter-spacing: 0;
                text-align: center;
                line-height: 12px;
                margin-top: 40px;
            }
        }
        .coupon-info {
            font-size: 12px;
            width: 186px;
            height: 60px;
            margin: 76px auto 0;
            padding: 0 6px 0 3px;
            display: flex;
            justify-content: space-between;
            .left-area {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .top {
                    color: #d40b02;
                    font-size: 0;
                    margin-bottom: 3px;
                    .icon {
                        font-size: 12px;
                    }
                    .number {
                        font-size: 28px;
                        color: #d40b02;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: 28px;
                        font-weight: bold;
                    }
                }
                .text {
                    transform: scale(0.85);
                    font-size: 12px;
                    color: #a33e00;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 10px;
                }
            }
            .right-area {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .top {
                    font-size: 14px;
                    color: #a33e00;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 14px;
                    margin-bottom: 9px;
                    font-weight: bold;
                }
                .date {
                    margin-top: 3px;
                    font-size: 12px;
                    color: #a33e00;
                    line-height: 12px;
                    transform: scale(0.85);
                }
            }
        }
        .footer {
            height: 104px;
            background: #fff;
            padding-top: 26px;
            border-radius: 0 0 10px 10px;
            .btn {
                display: block;
                margin: 0 auto 0;
                width: 275px;
                height: 50px;
                line-height: 50px;
                background: url("../assets/images/button111@2x.png");
                background-size: cover;
                font-size: 18px;
                color: #a33e00;
                letter-spacing: 1px;
                font-weight: bold;
                text-align: center;
            }
        }
    }
}
</style>
