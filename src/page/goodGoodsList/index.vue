<template>
    <div class="good-goods-list">
        <swiperList :datas="datas" @changeIndex='changeIndex'>
            <swiper-slide v-for="(list,i) in datas" :key="i" class="goods_container">
                <div
                    class="good"
                    v-for="(item,index) in list"
                    :key="index"
                    @click="toGoodsDetail(item.goodsId)"
                >
                    <!-- <div class="good" v-for="(good,count) in item" :key="count"> -->
                    <div class="pic">
                        <img v-lazy="item.goodsPic" :key="item.goodsPic">
                    </div>
                    <div class="title">{{item.goodsName}}</div>
                    <div class="spec">
                        <div class="price">
                            <span>￥</span>
                            <span class="val">{{item.goodsPrice}}</span>
                        </div>
                        <div class="buy" @click.stop="popSku(item.goodsId)">+</div>
                    </div>
                </div>
            </swiper-slide>
        </swiperList>
    </div>
</template>

<script>
import { swiperSlide } from "vue-awesome-swiper";
import swiperList from '@/components/swiper.list.vue'
export default {
    components: {
        swiperSlide,
        swiperList
    },
    data(){
        return {
            datas: [
                [{
                    goodsId:"18705",
                    goodsName:"化妆棉棒高级卫生木棒棉签优质双头棉棒美容清洁棉",
                    goodsPic:"https://img.shandjj.com/fdc/20180922/img/c2030cc66e0c51bdc51d46e692f562a5_480_480.jpg",
                    goodsPicHttp:"http://img.shandjj.com/fdc/20180922/img/c2030cc66e0c51bdc51d46e692f562a5_480_480.jpg",
                    goodsPrice: "4.5"
                },
                {
                    goodsId:"18705",
                    goodsName:"化妆棉棒高级卫生木棒棉签优质双头棉棒美容清洁棉",
                    goodsPic:"https://img.shandjj.com/fdc/20180922/img/c2030cc66e0c51bdc51d46e692f562a5_480_480.jpg",
                    goodsPicHttp:"http://img.shandjj.com/fdc/20180922/img/c2030cc66e0c51bdc51d46e692f562a5_480_480.jpg",
                    goodsPrice: "4.5"
                }],
                [{
                    goodsId:"167674",
                    goodsName:"不粘油 锅碗刷 洗锅刷 碗碟清洁刷油刷 带柄刷子",
                    goodsPic:"https://img.shandjj.com/fdc/20181018/img/e18622177db92a77c066b6ed8ab295f4_480_480.jpg",
                    goodsPicHttp:"https://img.shandjj.com/fdc/20181018/img/e18622177db92a77c066b6ed8ab295f4_480_480.jpg",
                    goodsPrice: "14.5"
                },{
                    goodsId:"167674",
                    goodsName:"不粘油 锅碗刷 洗锅刷 碗碟清洁刷油刷 带柄刷子",
                    goodsPic:"https://img.shandjj.com/fdc/20181018/img/e18622177db92a77c066b6ed8ab295f4_480_480.jpg",
                    goodsPicHttp:"https://img.shandjj.com/fdc/20181018/img/e18622177db92a77c066b6ed8ab295f4_480_480.jpg",
                    goodsPrice: "14.5"
                },
                {
                    goodsId:"167674",
                    goodsName:"不粘油 锅碗刷 洗锅刷 碗碟清洁刷油刷 带柄刷子",
                    goodsPic:"https://img.shandjj.com/fdc/20181018/img/e18622177db92a77c066b6ed8ab295f4_480_480.jpg",
                    goodsPicHttp:"https://img.shandjj.com/fdc/20181018/img/e18622177db92a77c066b6ed8ab295f4_480_480.jpg",
                    goodsPrice: "14.5"
                }],
                [{
                    goodsId:"19660",
                    goodsName:"专业羽毛修眉刀片 化妆师美容专用不锈钢刮眉刀片画眉刀片",
                    goodsPic:"https://img.shandjj.com/fdc/20180923/img/09fed5026e35117757e0e67663f6a3a3_480_480.jpg",
                    goodsPicHttp:"https://img.shandjj.com/fdc/20180923/img/09fed5026e35117757e0e67663f6a3a3_480_480.jpg",
                    goodsPrice: "54.5"
                },
                {
                    goodsId:"19660",
                    goodsName:"专业羽毛修眉刀片 化妆师美容专用不锈钢刮眉刀片画眉刀片",
                    goodsPic:"https://img.shandjj.com/fdc/20180923/img/09fed5026e35117757e0e67663f6a3a3_480_480.jpg",
                    goodsPicHttp:"https://img.shandjj.com/fdc/20180923/img/09fed5026e35117757e0e67663f6a3a3_480_480.jpg",
                    goodsPrice: "54.5"
                },
                {
                    goodsId:"19660",
                    goodsName:"专业羽毛修眉刀片 化妆师美容专用不锈钢刮眉刀片画眉刀片",
                    goodsPic:"https://img.shandjj.com/fdc/20180923/img/09fed5026e35117757e0e67663f6a3a3_480_480.jpg",
                    goodsPicHttp:"https://img.shandjj.com/fdc/20180923/img/09fed5026e35117757e0e67663f6a3a3_480_480.jpg",
                    goodsPrice: "54.5"
                },
                {
                    goodsId:"19660",
                    goodsName:"专业羽毛修眉刀片 化妆师美容专用不锈钢刮眉刀片画眉刀片",
                    goodsPic:"https://img.shandjj.com/fdc/20180923/img/09fed5026e35117757e0e67663f6a3a3_480_480.jpg",
                    goodsPicHttp:"https://img.shandjj.com/fdc/20180923/img/09fed5026e35117757e0e67663f6a3a3_480_480.jpg",
                    goodsPrice: "54.5"
                }]
            ]
        }
    },
    methods: {
        changeIndex(index){
            console.log(this.datas[index])
        }
    }
}
</script>

<style lang="scss" scoped>
    .good-goods-list{
        width: 100%;
        height: 100%;
        .goods_container {
            padding: 0 10px;
            // box-sizing: border-box;
            // display: flex;
            // justify-content: flex-start;
            // align-items: center;
            // flex-wrap: wrap;
            padding-bottom: 48px;
            .good {
                float: left;
                width: 112px;
                // height: 200px;
                margin: 0 4px 13px 2px;
                .pic {
                    width: 100%;
                    height: 112px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 100%;
                    }
                }
                .title {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .spec {
                    display: flex;
                    justify-content: space-between;
                    height: 20px;
                    align-items: center;
                    .price {
                        color: #f53917;
                        font-weight: 700;
                        span {
                            font-size: 10px;
                        }
                        .val {
                            font-size: 14px;
                        }
                    }
                    .buy {
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        background-image: linear-gradient(
                            -90deg,
                            #f53917 0%,
                            #ff8232 100%
                        );
                        border-radius: 3px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
