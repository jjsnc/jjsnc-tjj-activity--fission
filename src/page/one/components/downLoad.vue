<template>
    <div :class="['pop', downloadPopShow ? 'pop-show' : '']" @click.self.stop="closePop()">
        <div class="pop-cont">
            <div class="s-c-close" @click.stop="closePop()">
                <img src="@/assets/images/common/close@3x.png" alt>
            </div>
            <div class="s-c-con">
                <div class="s-c-title">
                    您需要
                    <span>在淘集集App</span>内才可以
                </div>
                <div class="s-c-title">继续发起1元拼团哦！</div>
                <div class="s-c-tips">快去下载App，1元好货任你买！</div>
                <div class="s-c-icon">
                    <img src="../assets/images/TJJ@2x.png" alt>
                </div>
                <div class="s-c-btn" @click="download">下载淘集集App</div>
            </div>
        </div>
    </div>
</template>

<script >
import device from "@/assets/js/common/device.js";
export default {
    name: "",
    props: {
        downloadPopShow: {
            type: Boolean,
            default: false
        },
        goods: {
            type: Object,
            dafault: {}
        }
    },
    data() {
        return {
            md: {}, //MobileDetect对象，用来判断设备型号
            device_type: ""
        };
    },
    created() {
        this.initDown();
    },
    methods: {
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
        closePop() {
            this.$parent.downloadPopShow = false;
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
    components: {}
};
</script>

<style scoped lang="scss">
.pop {
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
    &.pop-show {
        opacity: 1;
        visibility: visible;
        z-index: 998;
        .pop-cont {
            -webkit-transform: translate(-50%, -50%) scale(1, 1);
            transform: translate(-50%, -50%) scale(1, 1);
        }
    }
    .pop-cont {
        width: 314px;
        // height: 304px;
        padding: 30px 20px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) scale(0, 0);
        transform: translate(-50%, -50%) scale(0, 0);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        border-radius: 12px;
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
        .s-c-con {
            font-size: 14px;
            color: #333;
            p {
                line-height: 20px;
                margin-top: 20px;
                text-align: left;
                .red {
                    color: #ee0000;
                }
            }
            .s-c-title {
                font-size: 18px;
                color: #333;
                text-align: center;
                font-weight: bold;
                margin-bottom: 5px;
                span {
                    color: #ee0000;
                }
            }
            .s-c-goods {
                margin: 40px auto 0 auto;
                display: flex;
                justify-content: center;
                align-items: baseline;
                font-size: 24px;
                color: #ffe8d6;
                width: 180px;
                height: 100px;
                line-height: 100px;
                // background: url(../assets/images/popCouponBg.png);
                background-size: 100% 100%;
                div {
                    margin-left: -35px;
                    padding-top: 5px;
                    .big {
                        font-size: 48px;
                        color: #ffe8d6;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: 46px;
                    }
                }
            }

            .s-c-btn {
                background-image: linear-gradient(
                    90deg,
                    #ff7219 0%,
                    #ff0d0d 100%
                );
                box-shadow: 0 3px 6px 0 rgba(165, 59, 48, 0.29);
                border-radius: 4px;
                width: 100%;
                height: 42px;
                line-height: 42px;
                margin: 20px auto 0 auto;
                font-size: 18px;
                color: #ffffff;
                letter-spacing: 1.4px;
                text-align: center;
            }
            .s-c-tips {
                margin: 0 auto 20px auto;
                font-size: 18px;
                color: #333;
                font-weight: bold;
                letter-spacing: 0;
                text-align: center;
            }
            .s-c-icon {
                width: 90px;
                height: 90px;
                margin: auto;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
