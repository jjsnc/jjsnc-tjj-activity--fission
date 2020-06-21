<template>
    <div class="wrap-model">
        <div :class="['model', modelShow ? 'model-show' : '']" @click.stop="closeModel()">
            <div class="model-cont" @click.stop="">
                <div class="close-icon" @click.stop="closeModel()">
                    <img src="@/assets/images/common/close@3x.png" alt>
                </div>
                <div class="main">
                    <h1 class="title">聚宝盆玩法攻略</h1>
                    <div class="content">
                        <p>1. 每天召集好友(最多5人),每位好友可为您提供<strong>30财气</strong>；</p>
                        <p>2. 收集好友的财气,可以领取更多财气奖励；</p>
                        <p>3. 同一用户当日仅能被好友邀请一次并获得财气奖励；</p>
                        <p>4. 成功消费将获得<strong>50财气</strong>(退货扣回)每日上限5次；</p>
                        <p>5. 积攒足够数量的财气,就可以<strong>兑换喜欢的宝贝</strong>哦。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import { jump2home } from "@/assets/js/common/utils.js";
export default {
    name: "Model",
    data() {
        return {
            type: 0
        };
    },
    props: {
        modelShow: {
            type: Boolean,
            default: false
        }
    },
    created() {},
    methods: {
        closeModel(val) {
            // this.$parent.playStrategyShow = false;
            this.$emit('update:modelShow',val)
        },
        // 走交互 app 或小程序首页
        goHome() {
            //统计埋点
            let data_s = {
                code: "CDJ04",
                query: {
                    name: "领取优惠卷后点击逛逛好货事件"
                }
            };
            this.$tapConfig.batchClick(0, data_s, 0);
            jump2home();
        }
    },
    components: {}
};
</script>

<style scoped lang="scss">
.wrap-model {
    .model {
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
        &.model-show {
            opacity: 1;
            visibility: visible;
            z-index: 998;
            .model-cont {
                -webkit-transform: translate(-50%, -50%) scale(1, 1);
                transform: translate(-50%, -50%) scale(1, 1);
            }
        }
        .model-cont {
            width: 320px;
            padding: 36px 15px 36px;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%) scale(0, 0);
            transform: translate(-50%, -50%) scale(0, 0);
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
            border-radius: 6px;
            background-color: #fff;
            .close-icon {
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
            .main {
                .title {
                    font-family: PingFangSC-Medium;
                    font-size: 18px;
                    color: #333333;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 26px;
                    padding-bottom: 20px;
                }
                .content {
                    font-family: PingFangSC-Regular;
                    font-size: 15px;
                    color: #191919;
                    letter-spacing: 0;
                    line-height: 23px;
                }
            }
        }
    }
}
</style>
