<template>
    <div :class="['additional', is_popup ? 'share-show' : '']">
        <div class="content">
            <div class="s-c-close" @click.stop="closeShare()">
                <img src="../assets/images/close@2x.png">
            </div>
            <div class="header"></div>
            <div class="detail">
                <div class="status">
                    <img class="icon" src="../assets/images/11@2x.png">
                    <span class="text">邀请好友打卡成功!</span>
                </div>
                <p class="tips">额外获得一次打卡机会哦!</p>
            </div>
            <div class="footer">
                <a class="btn" @click.stop="closeShare()">去打卡</a>
            </div>
        </div>
    </div>
</template>

<script >
export default {
    name: "receivePop",
    props: {
        is_popup: {
            type: Number,
            default: 0
        }
    },
    methods: {
        closeShare() {
            this.$parent.is_popup = 0;
        }
    }
};
</script>

<style scoped lang="scss">
.additional {
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
            top: -16px;
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
            height: 192px;
            background: url("../assets/images/pic2@2x.png");
            border-radius: 10px 10px 0px 0px;
            background-size: 315px 192px;
        }
        .detail {
            background: #fff;
            .status {
                padding-top: 26px;
                text-align: center;
                color: #ff372f;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    vertical-align: bottom;
                }
                .text {
                    padding-left: 3px;
                    font-size: 20px;
                    color: #ff372f;
                    letter-spacing: 0;
                    text-align: center;
                    font-weight: bold;
                    line-height: 20px;
                }
            }
            .price {
                font-size: 0;
                text-align: center;
                padding-top: 26px;
                .icon {
                    font-size: 14px;
                    color: #d40b02;
                    letter-spacing: 0;
                    line-height: 24px;
                }
                .number {
                    font-size: 24px;
                    color: #d40b02;
                    letter-spacing: 0;
                    line-height: 24px;
                }
            }
            .tips {
                padding-top: 26px;
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
                line-height: 16px;
                margin-bottom: -2px;
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
                text-align: center;
                font-weight: bold;
            }
        }
    }
}
</style>
