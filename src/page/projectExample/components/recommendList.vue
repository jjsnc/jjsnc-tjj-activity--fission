<style lang="scss" scoped>
.guess-page {
    width: 354px;
    background: #fff;
    border-radius: 6px;
    margin: 0 auto;
    padding: 0 8px 0;
    .title-3 {
        height: 54px;
        line-height: 54px;
        font-size: 18px;
        color: #ff6632;
        text-align: center;
        align-items: center;
        font-weight: bold;
        .text {
            padding: 0 6px;
        }
        &::before {
            content: "";
            display: inline-block;
            width: 87px;
            height: 12px;
            background: url("../assets/images/left@2x.png");
            background-size: 87px 12px;
            margin-right: 6px;
        }
        &::after {
            content: "";
            display: inline-block;
            width: 87px;
            height: 12px;
            background: url("../assets/images/right@2x.png");
            background-size: 87px 12px;
            vertical-align: inherit;
            margin-left: 6px;
        }
    }
    .list {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .item {
            background: #fff;
            width: 165px;
            margin-bottom: 15px;
            height: 246px;

            .my-img {
                width: 165px;
                height: 165px;
            }
            .info {
                height: 32px;
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
                line-height: 16px;
                margin: 10px 0 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .bottom-area {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                height: 62px;
                font-size: 0;
                .icon {
                    color: #ee0000;
                    font-size: 12px;
                    transform: scale(0.85);
                }
                .price {
                    font-size: 16px;
                    color: #ee0000;
                    letter-spacing: 0;
                    font-weight: bold;
                }
                .submit-btn {
                    display: block;
                    padding: 6px 5px;
                  
                    text-align: center;
                    font-size: 13px;
                    color: #ffffff;
                    background-image: linear-gradient(
                        -270deg,
                        #f53917 0%,
                        #ff8232 100% x
                    );
                    border-radius: 4px;
                }
            }
        }
    }
    .empty-data {
        color: #999;
        text-align: center;
        font-size: 16px;
        img {
            width: 204px;
            margin: 30px auto 22px auto;
        }
    }
}
</style>

<template>
    <div class="guess-page">
        <h3 class="title-3">猜你喜欢</h3>
        <pullUpBox class="wrapper" :data="goodsList" @loadMore="loadData">
            <ul class="list">
                <li class="item">
                    <img
                        class="my-img"
                        @click="toGoods(item)"
                        src='../assets/images/5.png'
                    >
                    <p class="info">青年韩版修身短袖衬衫男休闲白衬衣</p>
                    <div class="bottom-area">
                        <div>
                            <span class="icon">￥</span>
                            <span class="price">9.9</span>
                        </div>
                        <div>
                            <a
                                href="javascript:;"
                                class="btn submit-btn"
                                @click="startShopping(item)"
                            >立即购买</a>
                        </div>
                    </div>
                </li>
                                <li class="item">
                    <img
                        class="my-img"
                        @click="toGoods(item)"
                        src='../assets/images/5.png'
                    >
                    <p class="info">青年韩版修身短袖衬衫男休闲白衬衣</p>
                    <div class="bottom-area">
                        <div>
                            <span class="icon">￥</span>
                            <span class="price">9.9</span>
                        </div>
                        <div>
                            <a
                                href="javascript:;"
                                class="btn submit-btn"
                                @click="startShopping(item)"
                            >立即购买</a>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- <div v-show="goodsList.length < 1" class="empty-data">
                <img src="../assets/images/quesheng@2x.png">
                <div>抱歉～这里空空如也</div>
            </div> -->
        </pullUpBox>
        <!--  下载 -->
        <downLoad :downloadPopShow="downloadPopShow"></downLoad>
    </div>
</template>

<script>
import { jump2goods, getEnvironment } from "@/assets/js/common/utils.js";
import { toGoodsDetail } from "./../assets/js/url.js";
import downLoad from "./downLoad";
import { freeGoodsList, GoodsGoods_list } from "./../assets/js/api.js";
import pullUpBox from "@/components/pullUpBox";
export default {

    data() {
        return {
            msgTxt: "",
            title: "免单好货推荐",
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            downloadPopShow: false,
            goodsList: [],
            likePage: 1,
            recommendPage: 1,
            isLoadData: true, //是否加载数据
            next_page: 0 // 下一页编号，为0时表示无下一页
        };
    },
    created() {},
    mounted() {
        // this.getGoodGoodsList();
    },
    methods: {
        loadData() {
            // if (!this.isLoadData) {
            //     this.isLoadData = true;
            //     this.getGoodGoodsList();
            // }
        },
        // 免单好货推荐
        getGoodGoodsList() {
            let self = this;
            let params = {
                page: this.recommendPage,
                cete_id: 0,
                sort_type: 1
            };
            let GoodsGoods_list = {}
            this.$http.get(GoodsGoods_list, { params }).then(res => {
                let data = res.data;

                if (data && data.result == 1) {
                    self.next_page = data.next_page;
                    self.isLoadData = false;
                    if (self.next_page != 0) {
                        self.recommendPage++;
                    } else {
                        self.isLoadData = true;
                    }
                    self.goodsList = self.goodsList.concat(data.data);
                    console.log(self.goodsList, "免费好货推荐");
                } else {
                    self.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        startShopping(item) {
            this.toGoods(item);
        },
        // 去商品详情页
        toGoods(item) {
            let self = this;
            this.$router.push(
                `${toGoodsDetail}/goods_id/${item.goodsId}/goods_name/${
                    item.goodsName
                }/cate_id/0/isNew/1`
            );
        },
        //进入商品详情（APP）
        toShopInfo(id) {
            jump2goods(id);
        }
    },
    components: {
        downLoad,
        pullUpBox
    }
};
</script>