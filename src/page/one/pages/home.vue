
<style lang="scss" scoped>
.page-home {
    background: #e94e4a;
    height: max-content;
    padding-bottom: 48px;
    .content {
        padding-top: 30px;
        .sec-rule {
            position: fixed;
            top: 0;
            right: 12px;
            z-index: 3;
            .bg-img {
                width: 52px;
                height: 41px;
                background: url(../assets/images/icon_strategy@2x.png) no-repeat
                    center center;
                background-size: cover;
            }
        }
        .sec-footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            z-index: 10;
            .btn-group {
                display: flex;

                .btn {
                    font-family: PingFangSC-Regular;
                    padding: 15px 0;
                    text-align: center;
                    font-size: 15px;
                    background: #ee0000;
                    color: #fde9d9;
                    letter-spacing: 0;
                    &.router-link-active {
                        background: #fde9d9;
                        color: #ee0000;
                    }
                    .icon {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-size: cover;
                        vertical-align: middle;
                    }
                    .text {
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
                .today-btn {
                    width: 188px;
                    .icon {
                        background: url("../assets/images/icon_1goods2@2x.png");
                        background-size: cover;
                    }
                    &.router-link-active {
                        .icon {
                            background: url("../assets/images/icon_1goods1@2x1.png");
                            background-size: cover;
                        }
                    }
                }
                .group-btn {
                    width: 186px;
                    flex: 1;
                    .icon {
                        background: url("../assets/images/icon_mygoods2@2x.png");
                        background-size: cover;
                    }
                    &.router-link-active {
                        .icon {
                            background: url("../assets/images/icon_mygoods1@2x1.png");
                            background-size: cover;
                        }
                    }
                }
            }
        }
    }
}
</style>


<template>
    <div class="page-home">
        <div class="content">
            <!-- 弹幕 -->
            <section>
                <topDanmu :dataObj="danmuData"></topDanmu>
            </section>
            <!-- 规则 -->
            <section class="sec-rule">
                <div class="bg-img"></div>
            </section>
            <router-view></router-view>
            <section class="sec-footer">
                <div class="btn-group">
                    <router-link tag="div" :to="toList_url" class="btn today-btn">
                        <span class="icon"></span>
                        <span class="text">今日1元拼团</span>
                    </router-link>
                    <router-link tag="div" :to="toGroup_url" class="btn group-btn">
                        <span class="icon"></span>
                        <span class="text">我的拼团</span>
                    </router-link>
                </div>
            </section>
            <!-- 规则弹框 -->
            <rule :ruleShow="ruleShow"></rule>
            <!-- 老用户弹框 -->
            <oldUserPop :oldUserPopShow='oldUserPopShow'></oldUserPop>
        </div>
    </div>
</template>

<script>
import rule from "../components/rule";
import oldUserPop from "../components/oldUserPop";
import topDanmu from "../components/topDanmu";
import { toList, toGroup } from "./../assets/js/url.js";
export default {
    name: "home",
    data() {
        return {
            oldUserPopShow:false,
            ruleShow: false,
            toList_url: toList,
            toGroup_url: toGroup,
            danmuData: [
                {
                    price: 50,
                    time: 28,
                    user: "七墓凉",
                    userIcon: "http://tjjimg.tjjshop.cn/group/userIcon/1114.jpg"
                },
                {
                    price: 43,
                    time: 57,
                    user: "钓一江月",
                    userIcon: "http://tjjimg.tjjshop.cn/group/userIcon/129.jpg"
                },
                {
                    price: 34,
                    time: 35,
                    user: "?個榶衯唡姅",
                    userIcon: "http://tjjimg.tjjshop.cn/group/userIcon/143.jpg"
                }
            ]
        };
    },
    components: {
        rule,
        topDanmu,
        oldUserPop
    }
};
</script>
