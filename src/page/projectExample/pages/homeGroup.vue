<style lang="scss" scoped>
.home-group {
    padding: 12px;
    .sec-list {
        .list {
            .item {
                height: 130px;
                background: #fff;
                border-radius: 4px;
                margin-bottom: 10px;
                padding: 8px;
                display: flex;
                .left-area {
                    width: 110px;
                    height: 110px;
                    position: relative;
                    img {
                        width: 110px;
                        height: 110px;
                    }
                    .status {
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        width: 48px;
                        height: 48px;
                    }
                }
                .right-area {
                    width: 218px;
                    margin-left: 10px;
                    .title-1 {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 18px;
                        height: 36px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        margin-bottom: 12px;
                    }
                    .middle {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 16px;
                        .now-price {
                            color: #ff6632;
                            font-size: 12px;
                            .icon {
                                font-size: 12px;
                                transform: scale(0.95);
                                font-weight: bold;
                            }
                            .price {
                                font-weight: bold;
                            }
                            .origin-price {
                                color: #999999;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                max-width: 156px;
                            }
                        }
                        .person-count {
                            font-family: PingFangSC-Regular;
                            font-size: 11px;
                            color: #ee0000;
                            letter-spacing: 0;
                            text-align: center;
                            font-weight: bold;
                        }
                    }
                    .bth-group {
                        display: flex;
                        justify-content: space-between;
                        &.flex-end {
                            justify-content: flex-end;
                            .btn {
                                margin-left: 12px;
                            }
                        }
                        .btn {
                            display: inline-block;
                            text-align: center;
                            padding: 8px 18px;
                            border: 1px solid transparent;
                            border-radius: 4px;
                            font-size: 14px;
                            color: #ff5a32;
                            letter-spacing: 0;
                            .text {
                                font-size: 12px;
                                transform: scale(0.92);
                            }
                            &.blue-btn {
                                background: linear-gradient(
                                    -180deg,
                                    #92ea35 0%,
                                    #5ccf23 100%
                                );
                                color: #ffffff;
                                border-color: #92ea35;
                            }
                            &.red-btn {
                                background: linear-gradient(
                                    -90deg,
                                    #f53917 0%,
                                    #ff8232 100%
                                );
                                color: #fff;
                                border-color: #ff8232;
                            }
                            &.border-red {
                                border: 1px solid #ff5a32;
                            }
                        }
                    }
                }
            }
            .item.invalid-group-active {
                .left-area {
                    .status {
                        background: url("../assets/images/label_fail@2x.png");
                        background-size: cover;
                    }
                }
            }
            .item.success-group-active {
                .left-area {
                    .status {
                        background: url("../assets/images/label_success@2x.png");
                        background-size: cover;
                    }
                }
            }
        }
        .toggle-data {
            text-align: center;
            .btn {
                display: block;
                padding: 8px 0 22px;
                font-size: 15px;
                color: #ffffff;
                letter-spacing: 0;
                .text{
                    display: inline-block;
                    vertical-align: middle;
                }
                .icon{
                    display: inline-block;
                    vertical-align: middle;
                    width: 11px;
                    height: 6px;
                    background: url('../assets/images/back_icon@2x.png');
                    background-size: cover;
                }
                &.close-btn{
                    .icon{
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="home-group">
        <section class="sec-list">
            <ul class="list">
                <li class="item wait-group-active">
                    <div class="left-area">
                        <img src="../assets/images/5.png">
                    </div>
                    <div class="right-area">
                        <div class="title-1">TAKA ORIGINAL Daily Meeting 例會通勤风衣 长款外套国潮</div>
                        <div class="middle">
                            <div class="now-price">
                                <span class="price">01:34:55</span>
                                <span class="origin-price">后拼团失败</span>
                            </div>
                            <div class="person-count">待成团</div>
                        </div>
                        <div class="bth-group">
                            <a href="javascript:;" class="btn border-red">详情</a>
                            <a href="javascript:;" class="btn blue-btn">邀请1个好友拼团</a>
                        </div>
                    </div>
                </li>
                <li class="item wait-pay-active">
                    <div class="left-area">
                        <img src="../assets/images/5.png">
                    </div>
                    <div class="right-area">
                        <div class="title-1">TAKA ORIGINAL Daily Meeting 例會通勤风衣 长款外套国潮</div>
                        <div class="middle">
                            <div class="now-price">
                                <span class="price">01:34:55</span>
                                <span class="origin-price">后拼团失败</span>
                            </div>
                            <div class="person-count">待支付</div>
                        </div>
                        <div class="bth-group">
                            <a href="javascript:;" class="btn"></a>
                            <a href="javascript:;" class="btn red-btn">￥1去支付</a>
                        </div>
                    </div>
                </li>
                <li class="item invalid-group-active">
                    <div class="left-area">
                        <img src="../assets/images/5.png">
                        <span class="status"></span>
                    </div>
                    <div class="right-area">
                        <div class="title-1">TAKA ORIGINAL Daily Meeting 例會通勤风衣 长款外套国潮</div>
                        <div class="middle">
                            <div class="now-price"></div>
                            <div class="person-count">拼团失效</div>
                        </div>
                        <div class="bth-group flex-end">
                            <a href="javascript:;" class="btn border-red">详情</a>
                            <a href="javascript:;" class="btn red-btn">￥1重新购买</a>
                        </div>
                    </div>
                </li>
                <li class="item success-group-active">
                    <div class="left-area">
                        <img src="../assets/images/5.png">
                        <span class="status"></span>
                    </div>
                    <div class="right-area">
                        <div class="title-1">TAKA ORIGINAL Daily Meeting 例會通勤风衣 长款外套国潮</div>
                        <div class="middle">
                            <div class="now-price">
                                <span class="origin-price">可前往我的订单查看物流详情</span>
                            </div>
                            <div class="person-count">拼团成功</div>
                        </div>
                        <div class="bth-group flex-end">
                            <a href="javascript:;" class="btn border-red">详情</a>
                            <a href="javascript:;" class="btn red-btn">￥1再来一单</a>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="toggle-data">
                <!-- <a href="javascript:;" class="all-btn btn">
                    <span class="text">查看全部记录</span>
                    <span class="icon"></span>
                </a> -->
                <a href="javascript:;" class="close-btn btn">
                    <span class="text">收起</span>
                    <span class="icon"></span>
                </a>
            </div>
        </section>
        <section class="sec-like">
            <recommendList></recommendList>
        </section>
    </div>
</template>

<script>
import recommendList from "../components/recommendList";
export default {
    name: "homeGroup",
    data() {
        return {};
    },
    components:{
        recommendList
    }
};
</script>


