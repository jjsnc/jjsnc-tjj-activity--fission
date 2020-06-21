<template>
    <div :class='["list",danmuData.length > 0 ? "pt30" : ""]'>
        <topDanmu v-show="danmuData.length > 0" :dataObj="danmuData"></topDanmu>
        <pullUpBox class="wrapper" :data="list" @loadMore="loadData">
            <div class="container">
                <div class="top">
                    <img
                        src="../assets/images/bg1@2x.png"
                        class="bg"
                    />
                    <img
                        src="../assets/images/strategy@2x.png"
                        class="rule"
                        @click.stop="popRule"
                    />
                </div>
                <scrollNav :fixedTop="fixedTop" :navData="navData" @navChange="navChange" ref="nav"></scrollNav>
                <swiperList :datas="datas" :slideIndex="slideIndex" @changeIndex='changeIndex'>
                    <swiper-slide v-for="(typelist,i) in datas" :key="i" class="goods_container">
                        <ul class="goods-list">
                            <li v-for="(item, index) in typelist" :key="index" @click="downLoadApp">
                                <div class="list-item-left">
                                    <img :src="item.imgUrl" alt="">
                                </div>
                                <div class="list-item-right">
                                    <div class="goods-name">{{item.goodsName}}</div>
                                    <div class="goods-middle">
                                        <div class="goods-price"><span>¥</span>{{item.groupPrice}}</div>
                                    </div>
                                    <div class="goods-bottom">
                                        <div class="goods-tip">
                                            {{item.lotteryNum}}人参与必有1人中奖
                                        </div>
                                        <div class="goods-btn">免费送礼</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div v-show="typelist.length < 1" class="empty-data">暂无商品</div>
                    </swiper-slide>
                </swiperList>
            </div>
        </pullUpBox>
        <footer @click="downLoadApp">
            下载淘集集App，免费送礼物
        </footer>
        <rule :ruleShow="ruleShow"></rule>
    </div>
</template>

<script >
import { TJJdownLoad ,_disScroll} from "@/assets/js/common/utils.js";
import pullUpBox from "@/components/pullUpBox";
import topDanmu from "@/components/topDanmu";
import scrollNav from "./scrollNav";
import rule from "./rule";
import { goodsList,tagsList,danmuList} from "./../assets/js/api.js";
import { swiperSlide } from "vue-awesome-swiper";
import swiperList from '@/components/swiper.list.vue'
export default {
    name: "download",
    data() {
        return {
            page: 1,
            hasData: false, //页面无数据不显示，只显示加载loading
            ruleShow: false, //规则
            list: [], //店铺列表
            datas:[],//
            danmuData: [], //弹幕数据
            isLoadData: true, //是否加载数据
            slideIndex:0,
            fixedTop: {
                flag: true,
                top: "0"
            },
            navData: {},
            cate: "",
            isEmpty: false
        };
    },
    created() {
        _disScroll(false)
        this.getDanmuData();
        this.getTages();
        // 数据埋点
        let data_s = {
            code: 'NH5',
            query: {
                name: "下载页面",
            }
        };
        this.$tapConfig.batchClick(0,data_s,0)
    },
    methods: {
        popRule() {
            this.ruleShow = true;
        },
        loadData() {
            if (!this.isLoadData) {
				this.isLoadData = true;
				this.getData();
			}
        },
        //获取弹幕信息
        getDanmuData(){
            this.$http.get(danmuList).then(res=>{
                if(res.data.result==1){
                    this.danmuData=res.data.items;
                }
            },err=>{})
        },
        navChange(id) {
            this.cate = id;
            this.page = 1;
            this.list = [];
            let temp=this.navData.data.find(item=>item.id==id);
            this.slideIndex=this.navData.data.indexOf(temp);
            if(this.datas[this.slideIndex].length == 0 ){
                this.getData();
            }
        },
        getTages() {
            let params = {};
            this.$http.get(tagsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.navData = {
                        data: data.data,
                        type: 3
                    };
                    for(let i=0;i<data.data.length;i++){
                        this.datas.push([])
                    }
                    this.cate=data.data[0]["id"]
                    this.getData();
                } else {
                    this.$msgBox.msgTxt((res && res.data && res.data.message) ||
                        "商品列表请求失败")
                }
            });
        },
        getData() {
            if (this.page < 1) return;
            let params = {
                page: this.page
            };
            if (this.cate) {
                params.cate_id = this.cate;
            }
            this.$http.get(goodsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.list = this.list.concat(data.goodsList);
                    let thisNav = this.navData.data.filter(item => item.id==this.cate);
                    let datasIndex = this.navData.data.indexOf(...thisNav);
                    this.datas[datasIndex] = this.list;
                    this.page = data.nextPage;
                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }
                } else {
                    this.$msgBox.msgTxt((res && res.data && res.data.message) ||
                        "商品列表请求失败")
                }
                this.isLoadData = false;
            });
        },
        changeIndex(index){
            this.$refs.nav.navClisk(this.navData.data[index]["id"])
        },
        downLoadApp(){
            // 数据埋点
            let data_s = {
                code: 'NH5_1',
                query: {
                    name: "下载页面",
                }
            };
            this.$tapConfig.batchClick(0,data_s,0)
            TJJdownLoad();
        }
    },
    components: {
        rule,
        topDanmu,
        pullUpBox,
        scrollNav,
        swiperSlide,
        swiperList,
    },
};
</script>

<style scoped lang="scss">
.wrapper{
    background: #db2331;
}
.list {
    height: 100%;
    background: #db2331;
    &.pt30{
        padding-top: 30px;
    }
    .container {
        width: 100%;
        // height: 100%;
        padding-bottom: 48px;
        .top {
            width: 100%;
            position: relative;
            img {
                width: 100%;
                &.rule {
                    position: absolute;
                    width: 62px;
                    height: 62px;
                    right: 0;
                    top: 0;
                }
            }
        }
        .goods_container{
            height: 320px;
            opacity: 0;
            overflow: hidden;
            transition: all .2s;
            &.swiper-slide-active{
                height: auto;
                opacity: 1;
            }
            .empty-data{
                color: #fff;
                text-align: center;
                font-size: 16px;
            }
        }
        .goods-list{
            padding: 12px 8px;
            background-color: #db2331;
            li{
                margin-top: 12px;
                display: flex;
                background: #fff;
                border-radius: 4px;
                align-items: center;
                height: 130px;
                &:first-child{
                    margin-top: 0;
                }
                .list-item-left{
                    flex: 0 0 117px;
                    height: 127px;
                    padding: 10px 0px 10px 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .list-item-right{
                    flex: 1;
                    padding: 5px 10px;
                    .goods-name{
                        margin-bottom: 13px;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 17px;
                        overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
                    }
                    .goods-middle{
                        margin-bottom: 20px;
                        font-size: 11px;
                        color: #EE0000;
                        letter-spacing: 0;
                        line-height: 11px;
                        display: flex;
                        justify-content: space-between;
                        .goods-price{
                            font-size: 18px;
                            color: #EE0000;
                            letter-spacing: 0;
                            line-height: 18px;
                            span{
                                font-size: 13px;
                            }
                        }
                        .goods-orgin-price{
                            font-size: 12px;
                            color: #757575;
                            line-height: 18px;
                            text-decoration: line-through
                        }
                    }
                    .goods-bottom{
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        .goods-tip{
                            background: #FDE9D9;
                            border-radius: 2px;
                            font-size: 11px;
                            color: #FF6632;
                            padding: 6px;
                        }
                        .goods-btn{
                            width: 84px;
                            height: 32px;
                            background-image: linear-gradient(-270deg, #FDEABF 0%, #FACEA0 100%);
                            border-radius: 4px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #713F01;
                            text-align: center;
                            line-height: 32px;
                        }
                    }
                }
            }
        }
    }
    footer{
        width: 100%;
        height: 48px;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1;
        background: #FDE9D9;
        box-shadow: 0 -2px 10px 0 rgba(0,0,0,0.15);
        font-size: 16px;
        color: #E92E37;
        letter-spacing: 2.5px;
        text-align: center;
        line-height: 48px;
    }
}
</style>
