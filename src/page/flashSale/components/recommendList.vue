<style lang="scss" scoped>
.guess-page {
    width: 100%;
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
            width: 15px;
            height: 6px;
            background: url("../assets/images/left@2x.png");
            background-size: 15px 6px;
            vertical-align: middle;
            margin-right: 11px;
        }
        &::after {
            content: "";
            display: inline-block;
            width: 15px;
            height: 6px;
            background: url("../assets/images/right@2x.png");
            background-size: 15px 6px;
            vertical-align: middle;
            margin-left: 10px;
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
                height: 28px;
                font-size: 0;
                align-items: flex-end;
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
                .minPrice{
                    margin-bottom: -1px;
                }
                .shopPrice{
                    text-decoration: line-through;
                    flex: 1;
                    margin-left: 5px;
                    min-width: 0;
                    // visibility: hidden;
                    div{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        .price {
                            font-size: 11px;
                            color: #999999;
                        }
                    }
                }
                .buyBt{
                    width:66px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 5px;
                    img{
                        width: 5px;
                        margin-left: 5px;
                    }
                    background-image: linear-gradient(90deg, #FF7219 0%, #FF0D43 100%);
                    border-radius: 14px;
                }
                .submit-btn {
                    display: block;
                    // width: 62px;

                    text-align: center;
                    font-size: 13px;
                    color: #ffffff;
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
        <h3 class="title-3">抢购进行中</h3>
        <pullUpBox class="wrapper" :data="goodsList" @loadMore="loadData"  :noData="noData">
            <ul class="list">
                <li class="item" :key="index" v-for="(item, index) in goodsList" @click="toGoods(item, index)">
                    <img
                        class="my-img"
                        
                        :src="item.goodsCover|| item.img640Url"
                    >
                    <p class="info">{{item.goodsName }}</p>
                    <div class="bottom-area">
                        <div class="minPrice">
                            <span class="icon">￥</span>
                            <span class="price">{{item.minPrice || item.minGroupPrice}}</span>
                        </div>
                        <div class="shopPrice">
                            <div>
                                <div class="price">￥{{item.shopPrice}}</div>
                            </div>
                        </div>
                        <div class="buyBt">
                            <a
                                href="javascript:;"
                                class="btn submit-btn"
                                v-bind:style="classObject"
                            >立即抢 </a>
                            <img src="../assets/images/back_icon@2x.png" />
                        </div>
                    </div>
                </li>
            </ul>
            <div v-show="goodsList.length < 1" class="empty-data">
                <img src="../assets/images/quesheng@2x.png">
                <div>抱歉～这里空空如也</div>
            </div>
        </pullUpBox>
        <!-- 这里时信息提示区域 -->
        <msgBox :msgTxt="msgTxt"></msgBox>
        <!--  下载 -->
    </div>
</template>

<script>
import Target from '@/assets/js/common/shence';
import msgBox from "@/components/msgBox";
import { check_login } from "@/assets/js/common/utils.js";
import { toGoodsDetail } from "./../assets/js/url.js";
import {  buyingSpree,goodsDetail } from "./../assets/js/api.js";
import pullUpBox from "./pullUpBox";
export default {
    props: {
        activityId: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            classObject: {
                'height': "28px",
                'line-height': "28px",
            },
            msgTxt: "",
            title: "免单好货推荐",
            downloadPopShow: false,
            buyStart: false,
            goodsList: [],
            goodsData:{}, //商品详情数据
            likePage: 1,
            recommendPage: 1,
            isLoadData: true, //是否加载数据
            next_page: 0, // 下一页编号，为0时表示无下一页
            noData:false
        };
    },
    created() {
    },
    mounted() {        
        this.getGoodGoodsList();
         this.shence = new Target({
            "dom":"",
            "productDom":"",
            "data":"",
        });
    },
    methods: {
        loadData() {
            if (!this.isLoadData) {
                this.isLoadData = true;
                this.getGoodGoodsList();
            }
        },
        getGoodGoodsList() {
            let self = this;
            let params = {
                page: this.recommendPage,
                activityId: this.activityId,
            };
            this.$http.get(buyingSpree, { params }).then(res => {
            // this.$http.get("https://result.eolinker.com/j4yysNac97f0146be49fab39a980d6b39622e8e166aae08?uri=http://192.168.30.128:8103/buyingSpree", { params }).then(res => {
                let data = res.data;

                if (data && data.status == 1) {
                    data.data.goodsList && data.data.goodsList.length==20 ? self.next_page = 1 : self.next_page = 0;
                    self.isLoadData = false;
                    if (self.next_page != 0) {
                        self.recommendPage++;
                    } else {
                        self.isLoadData = true;
                        self.noData = true
                    }
                    self.goodsList = self.goodsList.concat(data.data.goodsList);
                    console.log(self.goodsList, "免费好货推荐");
                } else {
                    self.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        // 获取商品详情信息
        getSku(goodsId){
            const params = {
                goodsId: goodsId,
                activityId: this.activityId
            }
            // this.$http.get("https://result.eolinker.com/j4yysNac97f0146be49fab39a980d6b39622e8e166aae08?uri=http://192.168.30.128:8103/goodsDetail",{params}).then(res => {
            this.$http.get(goodsDetail,{params}).then(res => {
                let data = res.data;
                if(data && data.status == 1){
                    if(data.data.predefined){
                        let isLogin = check_login();
                        if(!isLogin) return;
                        this.msgTxt = "暂无库存";
                        return;
                    }
                    this.$parent.buyStart = true;
                    this.$parent.limitNum = data.data.limitNum;
                    // this.$parent.stock = data.data.stock;
                    this.$parent.buyInfo = data.data;
                    this.$parent.buyGoodsId=goodsId;
                }else{
                    this.msgTxt = ((data && data.message) ? data.message : '网络失败');
                }
            })
        },
        // 去商品详情页
        toGoods(item,index) {
            let self = this;
            // this.$router.push(
            //     `${toGoodsDetail}/goods_id/${item.goodsId}/activityId/${self.activityId}/goodsName/${item.goodsName}`
                
            // );
             this.shence.bannerTrack({
                        bannerType:'商品',
                        bannerCurrentUrl:location.href,
                        bannerCurrentPageType: '详情',
                        bannerBelongArea: '商品列表',
                        bannerToUrl: item.goodsId,
                        bannerToPageType: "商品详情页",
                        bannerRank:index+1,
                        isSystemRecommend: ''
              })
            
            window.location.href= `${location.origin}/flashSale/view/${process.env.VERSION}${toGoodsDetail}/goods_id/${item.goodsId}/activityId/${self.activityId}/goodsName/${item.goodsName}/nowActivityId/${self.activityId}`
        },

    },
    components: {
        msgBox,
        pullUpBox,
    }
};
</script>