<template>
    <div class="wrap-model">
        <div :class="['model', oldUserPopShow ? 'model-show' : '']" @click.self.stop="closeModel()">
            <div class="model-cont">
                <div class="close-icon" @click.stop="closeModel()">
                    <img src="@/assets/images/common/close@3x.png" alt>
                </div>
                <div class="main">
                    <div class="img-wrap">
                        <p class="first">
                            你已经是淘集集的老用户了，
                            <br>快去发起一个免单拼团，
                            <br>跟自己的好友一起免单购物吧！
                        </p>
                    </div>
                    <a class="btn" @click="closeModel()">我知道啦</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
export default {
    name: "Model",
    data() {
        return {
            type: 0
        };
    },
    props: {
        oldUserPopShow: {
            type: Boolean,
            default: false
        }
    },
    created() {},
    methods: {
        closeModel() {
            this.$parent.oldUserPopShow = false;
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
            width: 309px;
            height: 204px;
            padding: 30px 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%) scale(0, 0);
            transform: translate(-50%, -50%) scale(0, 0);
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
            border-radius: 12px;
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
                    padding-bottom: 22px;
                }
                .title-3 {
                    padding-bottom: 36px;
                }
                .img-wrap {
                    font-size: 18px;
                    line-height: 18px;
                    padding-bottom: 30px;
                    .first {
                        font-size: 18px;
                        color: #333333;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: 24px;
                        font-weight: bold;
                    }
                    .download-app {
                        font-size: 18px;
                        color: #f00;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: 28px;
                        font-weight: bold;
                    }
                }
                .btn {
                    display: block;
                    height: 44px;
                    line-height: 44px;
                    font-size: 18px;
                    color: #ffffff;
                    letter-spacing: 1.4px;
                    text-align: center;
                    font-weight: bold;
                    background-image: linear-gradient(
                        -90deg,
                        #ff0d0d 0%,
                          #ff7219 100%
                    );
                    border-radius: 4px;
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
