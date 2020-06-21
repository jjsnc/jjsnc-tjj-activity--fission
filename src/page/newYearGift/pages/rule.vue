<template>
    <div
        :class="['rule', ruleShow ? 'rule-show' : '']"
        @click.self.stop="closeRule()"
    >
        <div class="rule-cont">
            <div
                class="r-c-close"
                @click.stop="closeRule()"
            >
                <img
                    src="@/assets/images/common/close@3x.png"
                    alt
                >
            </div>
            <div class="r-c-title">
                <div
                    :class="{active:type==0}"
                    @click="type=0"
                >
                    <div>免费送礼</div>
                    <div class="sort_line">&nbsp;</div>
                </div>
                <div
                    :class="{active:type==1}"
                    @click="type=1"
                >
                    <div>活动规则</div>
                    <div class="sort_line">&nbsp;</div>
                </div>
            </div>
            <div
                class="r-c-con"
                v-show="type==0"
            >
                <p>1.选择商品，点击免费送礼。</p>
                <p>2.把礼物送给微信好友们。</p>
                <p>3.好友点击你的链接，点击抽奖。</p>
                <p>4.参与抽奖的好友达到指定人数，立刻开奖。</p>
            </div>
            <div
                class="r-c-con"
                v-show="type==1"
            >
                <p>1.每个用户每天仅可参加两次他人发起的免费送礼物，同一设备、微信号、手机号视为同一用户。
                </p>
                <p>
                    2.每个抽奖时效为三小时，超时没有达到开奖人数的抽奖回自动失效。
                    
                </p>
                <p>
                    3.若发现用户存在刷单，虚假用户等违规行为，淘集集有权判断送礼无效。
                </p>
                <p>
                    4.送出的礼物在好友领取后，会在48小时内发货。
                </p>
                <p>
                    5.生成订单之后可前往我的订单查看物流详情。
                </p>
                <p>
                    6.对物流、商品有疑问或者需要修改收货地址，请联系客服处理。
                </p>
                <p>
                    7.用户不得在活动中发布包括但不限于危害国家安全、谣言、色情、暴力等相关信息言论，对于违规用户淘集集平台保留追究其法律责任的权利。
                </p>
            </div>
        </div>
    </div>
</template>

<script >
export default {
    name: "tenFairRule",
    data() {
        return {
            type: 0
        };
    },
    props: {
        ruleShow: {
            type: Boolean,
            default: false
        }
    },
    created() {},
    methods: {
        closeRule() {
            this.$parent.ruleShow = false;
        },
        changeType() {
            if (this.type) {
                this.type = 1;
            } else {
                this.type = 0;
            }
        }
    },
    components: {}
};
</script>

<style scoped lang="scss">
.rule {
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
    visibility: hidden;
    &.rule-show {
        opacity: 1;
        visibility: visible;
        z-index: 998;
        .rule-cont {
            -webkit-transform: translate(-50%, -50%) scale(1, 1);
            transform: translate(-50%, -50%) scale(1, 1);
        }
    }
    .rule-cont {
        width: 335px;
        padding: 30px 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) scale(0, 0);
        transform: translate(-50%, -50%) scale(0, 0);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        border-radius: 6px;
        background-color: #fff;
        .r-c-close {
            position: absolute;
            right: 20px;
            top: -38px;
            width: 25px;
            height: 25px;
            img {
                width: 100%;
                height: 100%;
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
        .r-c-title {
            margin-top: 12px;
            font-size: 16px;
            text-align: center;
            color: #191919;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 28px;
            div {
                flex: 1;
                &.active {
                    line-height: 18px;
                    color: #ff6632;
                    .sort_line {
                        border-bottom: 2px solid #ff6632;
                    }
                }
                .sort_line {
                    width: 66px;
                    height: 3px;
                    margin: 6px auto 0 auto;
                }
            }
        }
        .r-c-con {
            font-size: 14px;
            color: #333;
            p {
                line-height: 20px;
                margin-top: 14px;
                text-align: left;
                .red {
                    color: #ee0000;
                }
            }
        }
    }
}
</style>
