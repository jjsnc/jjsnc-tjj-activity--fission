<template>
    <div :class="['rule', ruleShow ? 'rule-show' : '']" @click.self.stop="closeRule()">
        <div class="rule-cont">
            <div class="r-c-close" @click.stop="closeRule()">
                <img src="@/assets/images/common/close@3x.png" alt>
            </div>
            <div class="r-c-title">
                <div :class="{active:type==1}">
                    <div>活动规则</div>
                    <div class="sort_line">&nbsp;</div>
                </div>
            </div>
            <div class="r-c-con">
                <p>1.在活动内下单后每天可打卡一次，打卡满足商品设定次数后，订单金额会全额返现至现金账户。</p>
                <p>2.返现到账户里的现金可以在下单时直接抵现。</p>
                <!-- <p>3.每天邀请新用户成功参与打卡，会为你增加一次额外打卡机会，同一设备、微信号、手机号视为同一用户。每天仅可通过邀请好友参与获得一次额外打卡机会。</p>
                <p>4.超过3天未打卡，打卡返现自动失效。</p>
                <p>5.若发现用户存在刷单，虚假用户等违规行为，淘集集有权判断订单无效。</p> -->
                <p>3.超过3天未打卡，打卡返现自动失效。</p>
                <p>4.若发现用户存在刷单，虚假用户等违规行为，淘集集有权判断订单无效。</p>
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
        padding: 20px 20px 30px 20px;
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
            font-size: 18px;
            text-align: center;
            color: #191919;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 28px;
            div {
                flex: 1;
                font-weight: bold;
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
                margin-top: 16px;
                text-align: left;
                .red {
                    color: #ee0000;
                }
            }
        }
    }
}
</style>
