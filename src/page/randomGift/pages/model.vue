<template>
    <div class="wrap-model">
        <div :class="['model', modelShow ? 'model-show' : '']" @click.self.stop="closeModel()">
            <div class="model-cont">
                <div class="close-icon" @click.stop="closeModel()">
                    <img src="@/assets/images/common/close@3x.png" alt>
                </div>
                <div class="main">
                    <h1 class="title">恭喜！</h1>
                    <h1 class="title title-3">你抽到了一张全场通用优惠券！</h1>
                    <div class="img-wrap">
                        <img width="160" height="60" src="../assets/images/icon_3y@3x.png">
                    </div>
                    <a class="btn" @click="goHome">逛逛好货</a>
                    <p class="tips">已放入我的优惠券，有效期7天</p>
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
        closeModel() {
            this.$parent.modelShow = false;
        },
        // 走交互 app 或小程序首页
        goHome() {
            //统计埋点
            let data_s = {
                code: "CDJ04",
                query: {
                    name: "开奖页面"
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
            width: 316px;
            height: 336px;
            padding: 30px 20px 26px;
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
                text-align: center;
                .title {
                    font-size: 18px;
                    color: #333;
                    line-height: 24px;
                    font-weight: bold;
                }
                .title-3 {
                    padding-bottom: 36px;
                }
                .img-wrap {
                    padding-bottom: 26px;
                    img {
                        width: 160px;
                        height: 80px;
                    }
                }
                .btn {
                    display: block;
                    background-image: linear-gradient(
                        -90deg,
                        #fe603d 0%,
                        #fd3725 100%
                    );
                    height: 44px;
                    line-height: 44px;
                    box-shadow: 0 3px 6px 0 rgba(165, 59, 48, 0.29);
                    border-radius: 4px;
                    font-size: 18px;
                    color: #ffffff;
                    letter-spacing: 1.4px;
                    text-align: center;
                }
                .tips {
                    padding-top: 12px;
                    font-size: 14px;
                    color: #757575;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 14px;
                }
            }
        }
    }
}
</style>
