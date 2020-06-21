<style lang="scss" scoped>
.home-page {
    background:#fff; 
    .wrap-top {
        img {
            width: 100%;
        }
    }
    .tab {
        display: flex;
        border: 1px solid #dedede;
    }

    .tab > div {
        flex: 1;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
    }

    .tab > div:nth-child(2) {
        border-left: 1px solid #dedede;
        border-right: 1px solid #dedede;
    }

    .tab > div > div {
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        /*height: 35px;*/
    }

    .tab > .act {
        color: #ee0000;
    }

    .tab > div img {
        display: block;
        width: 16px;
        height: 12px;
        margin: auto;
        padding: 0;
    }


    .wrap ,.wrap-top,.wrap-top img{
    width: 100%;
}
.content-wrap{
    width: 100%;
    background:#fff; 
    li{
        width: 100%;
        padding-top: 10px;
        display: flex;
        .content-left{
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 130px;
            max-height: 130px;
            overflow: hidden;
            .content-img{
                width: 100%;
            }
             .sell-done{
                position: absolute;
                width: 74px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .content-right{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 130px;
            flex: 1;
            padding-left: 10px;
            padding-right:13px; 
            vertical-align: middle;
            .top{
                width: 100%;
                .title{
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0;
                    line-height: 17px;
                    margin-bottom: 10px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .tips{
                    font-size: 11px;
                    color: #EE0000;
                    letter-spacing: 0;
                    line-height: 11px;
                }
            }
        }
        .bottom_bottom{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items:flex-end ;
        }
        .bottom-left{
            display: flex;
            .bottom-left-price{
                font-size: 18px;
                color: #EE0000;
                letter-spacing: 0;
                line-height: 18px;
                display: flex;
                justify-content: baseline;
                align-items: baseline;
                span{
                    font-size: 13px;
                }
            }
            .bottom-left-count{
                font-size: 12px;
                color: #757575;
                letter-spacing: 0;
                line-height: 12px;
            }
        }
        .bottom-right{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(-90deg, #F53917 0%, #FF8232 100%);
            border-radius: 4px;
            width: 130px;
            min-height: 32px;
            .price{
                font-size: 16px;
                color: #FFFFFF;
                text-align: center;
                line-height: 16px;
            }
            .get-price{
                display: flex;
                flex-direction: row;
                font-size: 12px;
                color: #FFFFFF;
                text-align: center;
                align-items: center;
                img{
                    height: 14px;
                    width: 14px;
                    margin: 1px 5px 0 0;
                }
            }
            &.sold_out{
                background: #C0C0C0;
            }
            &.pcl{
                padding: 6px 0 3px 0;
            }
        }
    }
}
}
</style>
<template>
    <div class="home-page">
        <pullUpBox class="wrapper" :data="goodsData" @loadMore="loadData" :noData="noData">
        <div class="wrap-top">
            <img src="../assets/images/bg3@2x.png" />
        </div>
        <div class="tab">
            <div :class="{'act':cate_id==0}" @click="navChange(0)">推荐排序</div>
            <div :class="{'act':cate_id==1}" @click="navChange(1)">销量排序</div>
            <div :class="{'act':cate_id==2}"  v-preResClick="{func:navChange,time:500}">
                <div>价格排序</div>
                <div>
                    <img class="pact1" v-show="sort!=3" src="../assets/images/up.png" />
                    <img class="pact1" v-show="sort==3" src="../assets/images/up-act.png" />
                    <img class="pact2" v-show="sort!=-3" src="../assets/images/down.png" />
                    <img class="pact2" v-show="sort==-3" src="../assets/images/down-act.png" />
                </div>
            </div>
        </div>
            <ul class="content-wrap">
                <li
                    v-for="(item,index) in goodsData[cate_id]"
                    :key="index"
                    @click="toGoods(item.linkId,item.goodsType)"
                >
                    <div class="content-left">
                        <img class="lazy content-img" v-lazy="item.imgUrl" />
                        <img class="sell-done" v-if="item.soldout!=2&&item.goodsType==1|| (timeLft==2&&item.goodsType==1 )" src="../assets/images/failure@3x.png" alt="">
                    </div>
                    <div class="content-right">
                        <div class="top">
                            <p class="title">{{item.title}}</p>
                            <p class="tips" v-if="item.goodsType==1">每日23点限时2件抢购</p>
                        </div>
                        <div class="bottom_bottom">
                            <div class="bottom-left">
                                <div class="bottom-left-price"><span>¥</span>{{item.price}}</div>
                                <span class="bottom-left-count"></span>
                            </div>
                            <div style class="bottom-right"  v-if="item.soldout==2&&item.goodsType==1&&timeLft==0" @click.stop="$msgBox.msgTxt('23点开抢哦')">
                                <p class="get-price">今日23点开抢</p>
                            </div>
                            <div style class="bottom-right"  v-if="item.soldout==2&&item.goodsType==1&&timeLft==1" @click.stop="$msgBox.msgTxt('当前请求人数过多，请稍后再试')">
                                <p class="get-price">
                                    <img src="../assets/images/icon_clock_small@2x.png" />
                                     立即抢购
                                </p>
                            </div>
                            <div style class="bottom-right sold_out"  v-else-if="item.soldout!=2&&item.goodsType==1 || (timeLft==2&&item.goodsType==1 )" @click.stop="$msgBox.msgTxt('已抢完，明日继续哦')">
                                <p class="get-price sold_out" >已抢完,明日再来~</p>
                            </div>
                            <div style class="bottom-right pcl" v-else-if="item.goodsType!=1">
                                <p class="price">¥{{item.price}}</p>
                                <!-- <p class="get-price" >赚{{item.earnMoney}}</p> -->
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </pullUpBox>
    </div>
</template>
<script>
import pullUpBox from "@/components/pullUpBox";
import { toGoodsDetail } from "./../assets/js/url.js";
import {
    getQueryString,
    check_login,
    _getUserInfo,
    getEnvironment,
    jump2goods
} from "@/assets/js/common/utils.js";
import { goodsList } from "./../assets/js/api.js";

export default {
    name: "index",
    data() {
        return {
            haveMore:[true,true,true], // 是否还有下一页数据
            goodsData:[[],[],[]], // 商品
            cate_id: 0, //   当前cate_id 分类
            sort: 1, //   	排序（1推荐 2销量 3价格低到高 -3价格高到低）
            page: [1, 1, 1], //   当前页码
            isLoadData: false, //当前分类是否还需要加载
            user_info: _getUserInfo(),
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            timing: '',//计时器
            timeLft: 0,//,0:   23点前, 1:   23点-23：01间 , 2:   23：01-24点
            start: new Date().getTime(),//当前时间
            // end:new Date(new Date().toLocaleDateString()).getTime() + 23 * 60 * 60 * 1000,//当日23点
            end:new Date(new Date().getFullYear().toString()+"/"+ (new Date().getMonth()+1).toString()+"/"+new Date().getDate()).getTime() + 23 * 60 * 60 * 1000,//当日23点
            // end:1565677500000,//当日23点
            noData: false,
            openDelay: false,
        };
    },
    created() {
        // 登录
        check_login();
        this.timeCount();
        this.getGoodsList();
    },
    methods: {
        timeCount(){
            let self = this;
            //定时器取本地时间每隔一秒计算是否到23点
            this.timing = setInterval(()=>{
                self.start += 1000;
                if( self.start - self.end >= 0  && self.start - self.end <= 60000 ){
                    self.timeLft = 1;
                }else if(self.start < self.end ){
                    self.timeLft  = 0;
                }else{
                    self.timeLft  = 2;
                }
            },1000)
        },

        //点击nvaList改变slider
        navChange(cate_id) {
            switch(cate_id){
                case 0:
                    this.sort=1;
                    if(this.cate_id == cate_id)return;
                    this.cate_id = cate_id;
                    if(!this.haveMore[cate_id])return;
                    break;
                case 1:
                    this.sort=2;
                    if(this.cate_id == cate_id)return;
                    this.cate_id = cate_id;
                    // this.fromOther = true;
                    //重置是否没有连续点击价格排序
                    if(!this.haveMore[cate_id])return;
                    break;
                case 2:
                    if(this.cate_id != cate_id){
                        this.sort=3;
                        this.cate_id = cate_id;
                    }else{
                        this.sort==3?this.sort=-3:this.sort=3;
                    };
                    this.noData = false;
                    this.$set(this.page,2,1);
                    //切换到价格排序时 重新加载页码
                    this.haveMore[this.cate_id] = true;
                    //切换到价格排序时 重置是否有更多数据
                    this.$set(this.goodsData,2,[]);
                    //切换到价格排序时 重置商品列表
                    break;
            }
            this.getGoodsList();
        },

        //是否加载更多数据
        loadData() {
            if (!this.isLoadData) {
                this.isLoadData = true;
                this.getGoodsList(1);
            }
        },

        // 去商品详情页
        toGoods(linkId,goodsType) {
            if(goodsType!=1){
                jump2goods(linkId)
            }else{
                this.$router.push({
                    path:`${toGoodsDetail}/goodsId/${linkId}`
                })
            }
        },
        getGoodsList(from) {
             console.log("00000cate_id:"+this.cate_id,"haveMore:"+this.haveMore,"from:"+from);
             console.log("99999999999",!this.haveMore[this.cate_id] && this.cate_id!=2 || ( from==1 && !this.haveMore[this.cate_id]));
            if(!this.haveMore[this.cate_id] && this.cate_id!=2 || ( from==1 && !this.haveMore[this.cate_id]))return;
            this.$http
                .get(goodsList, {
                    params: {
                        page: this.page[this.cate_id],
                        sort: this.sort,
                        g: "wap",
                        tg_code: decodeURIComponent(getQueryString("secretcode"))
                    }
                })
                .then(
                    res => {
                        if (res.data&&res.data.result == 1) {
                            if (res.data.data&&res.data.data.data) {
                                let info = res.data.data;
                                if (info.data.length > 0) {
                                    if(this.cate_id!=2){
                                        console.log(111111111111,this.goodsData[this.cate_id])
                                        this.goodsData[this.cate_id].push(...info.data);
                                    }else{
                                        if(from == 1){
                                            console.log(22222222222,this.goodsData[this.cate_id])
                                            console.log("22222222222cate_id:"+this.cate_id,"haveMore:"+this.haveMore,"from:"+from)
                                            this.goodsData[this.cate_id].push(...info.data);
                                        }else{
                                            console.log(33333333333333,this.goodsData[this.cate_id])
                                            this.goodsData[this.cate_id] = [];
                                            this.$set(this.goodsData,2,info.data);
                                        }
                                    }
                                }
                                if ( info.nextPage > 0 ) {
                                     console.log(44444444,info.nextPage)
                                    this.page[this.cate_id] += 1;
                                }else{
                                    // this.haveMore[this.cate_id]=false;
                                    this.$set(this.haveMore,this.cate_id,false);
                                     console.log(555555555,this.haveMore[this.cate_id])
                                    this.noData = true;
                                }
                            }
                        } else {
                            this.$msgBox.msgTxt(res.data.message);
                        }
                        this.isLoadData = false;
                    },
                    err => {
                        this.isLoadData = false;
                    }
                );
        }
    },
    watch:{
        $route(to, from) {
            if(to.name == 'index'){
                this.start = new Date().getTime();
                this.timeCount();
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        clearInterval(this.timing);
        next();
    },
    directives:{
        preResClick:{
            bind:(el,binding) =>{
                var openDelay = false;
                el.onclick = () => {
                    console.log(openDelay)
                    if(openDelay)return;
                    openDelay = !openDelay;
                    setTimeout(()=>{
                        openDelay = !openDelay;
                    },binding.value["time"]||300)
                    binding.value["func"](2)
                }
            }
        }
    },
    components: {
        pullUpBox
    }
};
</script>




