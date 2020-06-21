<template>
    <div class="main">
        <section class="drylinglist_section">
            <pullUpBox class="wrapper" :data="showlistitems" @loadMore="shaiLoad">
            <p class="dryingTitle">往期中奖晒单</p>           
                <div class="dryingDiv" v-for="(showlistitem,index) in showlistitems" :key="index">
                    <div class="imgDiv">
                        <img v-lazy="showlistitem.avatar">
                    </div>
                    <div class="clear"></div>
                    <p class="name">{{showlistitem.nickname}}</p>
                    <p class="time">{{showlistitem.lottery_time}}中奖用户</p>
                    <div class="talk">
                        {{showlistitem.remark}}
                        <div class="showImg clearfix">
                            <img :src="item" :key="key" v-for ="(item, key) in showlistitem.img">
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </pullUpBox>
        </section>
        <section class="section recommend-list">
         <pullUpBox class="wrapper" :data="items" @loadMore="loadData">                       
            <div class="container">            
                <div v-show="items.length < 1" class="empty-data">暂无商品</div>
                    <p class="title-1">精品推荐 </p>
                    <ul class="list clearfix">
                            <li v-for="(item, index) in items" :key="index" @click="toShopInfo(item.goodsId)" class="item">
                                <div class="img-box">
                                    <img v-lazy="item.goodsCover" @click="toShopInfo(item.goodsId)">
                                </div>
                                <h3 class="title-3">{{item.goodsName}}</h3>
                                <div class="info-box">
                                    <span class="value">
                                        <span class="icon">¥</span>
                                        {{item.salePrice}}
                                    </span>
                                    <span class="go-btn" @click="toShopInfo(item.goodsId)">去购买</span>
                                </div>
                            </li>
                        </ul>
                        <!-- <button @click="loadData">下一页</button> -->
                </div>
        </pullUpBox>
        </section>
    </div>
</template>

<script >
let o=document.getElementsByClassName('drylinglist_section');
let drying_height = o.clientHeight||o.offsetHeight;
let body_height = window.screen.availHeight;

import pullUpBox from "@/components/pullUpBox";
import scrollNav from "@/components/scrollNav";
import skuCheck from "@/components/skuCheck";
import { toRule, toIndex } from "./../assets/js/url.js";
import { recommendList, orderShareList } from "./../assets/js/api.js";
import iphone from "../assets/images/iphone@2x.png";
import { jump2goods,formatDate } from "@/assets/js/common/utils.js";
import { swiperSlide } from "vue-awesome-swiper";
import swiperList from '@/components/swiper.list.vue'

export default {
    name: "dryingList",
    data() {
        return {
            page: 1,
            page_drying:1,
            hasData: true, //页面无数据不显示，只显示加载 loading
            isLoadData: true, //是否加载数据
            shaiLoading:true,//晒单列表是否加载数据
            cate: "",
            isEmpty: false,
            slideIndex:0,
            items: [], //精品推荐        
            showlistitems: [], //晒单列表
            navData: {},
        };
    },
    mounted() {
        this.getshowList();
        //this.getRecommend();
        //this.getData();
    },
    components: {  
        pullUpBox,
    },
    methods: { 
        loadData() {
            if(!this.isLoadData){
                this.isLoadData=true;
                this.getRecommend()
            }
            //  this.getRecommend()
        },
        shaiLoad(){
            console.log(111);
            if(!this.shaiLoading){

                this.shaiLoading=true;
                this.getshowList();
            }
        },
        //晒单列表
          getshowList() {
            let _this = this;
            let params={
                page:_this.page_drying,
                //count:10
            }
            this.$http.get(orderShareList,{params}).then(res => {
                // let isend = 0;
                if (res.data.result == 1) {
                    console.log(res.data.data);
                    if(res.data.data.length==20){  
                        _this.page_drying++;
                    }                   
                    let data=res.data.data;
                    //_this.showlistitems = res.data.data;
                    if(_this.showlistitems.length%20==0){
                        _this.showlistitems= _this.showlistitems.concat(data); 
                    }                   
                    _this.shaiLoading=false;
                    if(data.length<20){  
                        _this.shaiLoading=true;
                        // isend = 1;
                        _this.getRecommend();
                    }      
                    data.forEach((item, index) => {
                        let  time =   formatDate(
                            new Date(Number(item.lottery_time)* 1000),
                            "yyyy-MM-dd"
                        )
                        data[index].lottery_time=time;                        
                    }); 
                    _this.showlistitems.concat(data)            
                } else {
                    console.log("请求出错");
                }
                // if(drying_height>=body_height&&isend == 0){
                //     _this.shaiLoading=false;
                //     shaiLoad();
                // }
            });
        },
        //精品推荐
        getRecommend() {
            let params = {
                page: this.page,
                userType: 2
            };
            this.$http.get(recommendList, { params }).then(res => {
                if (res.data.status == 1) {
                    if (res.data.data.goodsList.length == 20) { 
                        this.page++;
                    }
                    let data = res.data.data.goodsList;
                    if(this.items.length<=40&&(this.items.length%20==0)){
                        this.items= this.items.concat(data); 
                    }                
                    this.isLoadData=false;
                    if(this.items.length<20){
                        this.isLoadData=true;
                    }
                } 
                err => {};
            });
        },
        //进入商品详情
        toShopInfo(id) {
            jump2goods(id);
        },
    }
};
</script>

<style scoped lang="scss">
.clear {
    clear: both;
}
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}
.main {
    background-color: rgb(252, 227, 207);
    // overflow: auto;
    .drylinglist_section{
        background-color: rgb(252, 227, 207);
    }
    .dryingTitle {
       // width: 115px;
        //height: 30px;
        margin-top: 20px;
        margin-left: 20px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333333;
        letter-spacing: 1.12px;
        line-height: 18px;
        font-weight: bold;
    }
    .dryingDiv {
        width: 349px;
        // height: 425px;
        padding-bottom: 15px;
        background-color: #fff;
        opacity: 1;
        border-radius: 4px;
        margin: auto;
        margin-top: 18px;
        .imgDiv {
            width: 48px;
            height: 12px;
            float: left;
            background-color: #fff;
            margin-left: 5px;
            img {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                margin-left: 10px;
                margin-top: 10px;
                margin-bottom:5px;
            }
        }
        .name {
            // width: 52px;
            height: 16px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
            letter-spacing: 1.03px;
            line-height: 16px;
            margin-left: 65px;
            margin-top: 2px;
            background-color: #fff;
        }
        .time {
            margin-top: 7px;
            margin-left: 65px;
            //width: 125px;
            height: 12px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            letter-spacing: 0.77px;
            line-height: 12px;
            background-color: #fff;
        }
        .talk {
            width: 329px;
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #757575;
            letter-spacing: 0;
            // line-height: 18px;
            margin: auto;
            margin-top: 10px;
            background-color: #fff;
            .showImg {
                width: 320px;
                margin-top: 13px;
                margin-left: 5px;
                overflow: auto;
                background-color: #fff;
                img {
                    //justify-content: center;
                    float: left;
                    margin-left: 3px;
                    margin-bottom:5px;
                    width: 103px;
                    height:103px;
                    overflow: hidden;
                }
            }
        }
    }
    .recommend-list {
        background-color: rgb(252, 227, 207);
        padding-top: 20px;
        box-sizing: border-box;
        padding: 0 8px;
        padding-bottom: 25px;
        .title-1 {
            font-size: 18px;
            color: #333333;
            letter-spacing: 1.12px;
            line-height: 18px;
            font-weight: bold;
            padding: 10px 0 16px 0;
            margin-left: 10px;
        }
        .list {
            background: #ffffff;
            border-radius: 4px;
            overflow: auto;
            padding-top: 10px;
            margin-bottom: 10px;
            .item {
                width: 46%;
                min-height: 166px;
                height: 260px;
                float: left;
                margin-left: 2.5%;
                margin-bottom: 10px;
                .img-box {
                    width: 165px;
                    height: 166px;
                    line-height: 166px;
                    text-align: center;
                    overflow: hidden;
                    background: #f0eeea;
                    img {
                        width: 165px;
                    }
                }
                .title-3{ 
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0;
                    line-height: 1.4rem;
                    padding-right: 5px;
                    padding-top: 6px;
                    font-weight: 400;
                    background: #fff;
                    width: 165px;
                    height: 20%;
                    min-height: 45px;
                    margin: auto;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .info-box {
                    padding-top: 12px;
                    display: flex;
                    background: #fff;
                    .value {
                        flex: 1;
                        height: 26px;
                        line-height: 26px;
                        color: #ee0000;
                        font-weight: bold;
                        background: #fff;
                        .icon {
                            font-size: 10px;
                        }
                    }
                    .go-btn {
                        width: 66px;
                        height: 26px;
                        line-height: 26px;
                        text-align: center;
                        background-image: linear-gradient(
                            -90deg,
                            #fe603d 0%,
                            #fd3725 100%
                        );
                        border-radius: 2px;
                        font-size: 12px;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}
</style>
