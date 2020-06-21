<template>
    <div :class='["list",$parent.danmuData.length > 0 ? "pt30" : ""]'>
        <pullUpBox class="wrapper" :data="list" @loadMore="loadData">
            <div class="container">
                <div class="top">
                    <img
                        src="../assets/images/bg1@2x.png"
                        class="bg"
                    />
                    <img
                        src="../assets/images/CombinedShape@2x.png"
                        class="rule"
                        @click.stop="popRule"
                    />
                    <span class="rule_txt" @click.stop="popRule">攻略</span>
                </div>
                <scrollNav :fixedTop="fixedTop" :navData="navData" @navChange="navChange" ref="nav"></scrollNav>
                <swiperList :datas="datas" :slideIndex="slideIndex" @changeIndex='changeIndex'>
                    <swiper-slide v-for="(typelist,i) in datas" :key="i" class="goods_container">
                        <ul class="goods-list">
                            <li v-for="(item, index) in typelist" :key="index" @click="toGoods(item.goodsId, item.goodsName,item.groupPrice,item.lotteryNum)">
                                <div class="list-item-left">
                                    <img :src="item.imgUrl" alt="">
                                </div>
                                <div class="list-item-right">
                                    <div class="goods-name">{{item.goodsName}}</div>
                                    <div class="goods-middle">
                                        <div class="goods-price"><span>¥</span>{{item.groupPrice}}</div>
                                        <!-- <div class="goods-orgin-price"><span>¥</span>{{item.groupPrice}}</div> -->
                                    </div>
                                    <div class="goods-bottom">
                                        <div class="goods-tip">
                                            {{item.lotteryNum}}人参与必有1人中奖
                                        </div>
                                        <div class="goods-btn" @click.stop="popSku(item)">免费送礼</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div v-show="typelist.length < 1" class="empty-data">暂无商品</div>
                    </swiper-slide>
                </swiperList>
            </div>
        </pullUpBox>
        <rule :ruleShow="ruleShow"></rule>
        <skuCheck :data="goodsData" @submitSku="submitSku" :skuShow="skuShow"></skuCheck>
        <share :shareShow="shareShow" :goods="shareData" @sendShare="sendShare"></share>
    </div>
</template>

<script >
import { getQueryString, check_login} from "@/assets/js/common/utils.js";
import { shareToWx} from "../assets/js/utils.js";
import skuCheck from "@/components/skuCheck";
import pullUpBox from "@/components/pullUpBox";
import share from "./share";
import scrollNav from "./scrollNav";
import rule from "./rule";
import { goodsList,tagsList,goodsDetail,orderAdd} from "./../assets/js/api.js";
import { toGoodsDetail } from "./../assets/js/url.js";
import { swiperSlide } from "vue-awesome-swiper";
import swiperList from '@/components/swiper.list.vue'
export default {
    name: "mainFree",
    data() {
        return {
            page: [],
            hasData: false, //页面无数据不显示，只显示加载loading
            ruleShow: false, //规则
            list: [], //店铺列表
			skuShow: false,
			goodsData: {}, //所选商品数据(含sku)
            datas:[],//
            danmuData: [], //弹幕数据
            isLoadData: true, //是否加载数据
			shareShow: false, // 分享确认框是否显示
            shareData:{},//分享确认框显示内容
            addressData:[],//地址默认数据
            mySpecId: '', // 我的规格id
            msgTxt: "",
            goodsId:"",
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
        console.log(this.$parent);
        this.getTages();
        //统计埋点
        let data = {
            code: 'NH1',
            query: {
                name: "免费送年货",
            },
            extra:{
                param1:1
            }
        }
        this.$tapConfig.batchClick(0,data,0)
    },
    methods: {
        popRule() {
            this.ruleShow = true;
        },
        loadData() {
            if (!this.isLoadData) {
				this.isLoadData = true;
				this.getData(this.slideIndex);
			}
        },
        navChange(id) {
            this.cate = id;
            let temp=this.navData.data.find(item=>item.id==id);
            this.slideIndex=this.navData.data.indexOf(temp);
            this.list=this.datas[this.slideIndex];
            if(this.datas[this.slideIndex].length == 0 ){
                this.getData(this.slideIndex);
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
                        this.page.push(1)
                    }
                    this.cate=data.data[0]["id"]
                    // 错误日志上报
                 try {
                       if(errorLogUpload && (data.data.length<=0)){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify(params),
                                uri: location.href,
                                apiUri: tagsList,
                                data: JSON.stringify(data),
                                message: "获取导航数据失败",
                                method: 'get',
                                code: 200
                                }
                            })
                    }
                    } catch (error) {
                        
                    }


                } else {
                    this.$msgBox.msgTxt((res && res.data && res.data.message) ||
                        "商品列表请求失败");
                }
                this.getData(0);
            });
        },
        getData(index) {
            if (this.page[index] < 1) return;
            let params = {
                page: this.page[index]
            };
            if (this.cate) {
                params.cate_id = this.cate;
            }
            this.$http.get(goodsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    let thisNav = this.navData.data.filter(item => item.id==this.cate);
                    let datasIndex = this.navData.data.indexOf(...thisNav);
                    this.datas[datasIndex].push(...data.goodsList);
                    this.list = this.datas[datasIndex];
                    this.page[datasIndex] = data.nextPage;
                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }

                    // 错误日志上报
                 try {
                       if(errorLogUpload && (this.datas[datasIndex].length<=0)){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify(params),
                                uri: location.href,
                                apiUri: goodsList,
                                data: JSON.stringify(data),
                                message: "商品列表请求失败",
                                method: 'get',
                                code: 200
                                }
                            })
                    }
                    } catch (error) {
                        
                    }


                } else {
                    this.$msgBox.msgTxt((res && res.data && res.data.message) ||
                        "商品列表请求失败");
                }
                this.isLoadData = false;
            });
        },
        //规格弹框
		popSku(goods) {
            //统计埋点
            let data = {
                code: 'NH1_1',
                query: {
                    name: "免费送年货",
                },
            }
            this.$tapConfig.batchClick(0,data,0)
            if(!check_login()) return;
			this.goodsId = goods.goodsId;

            this.shareData=goods;
			this.getSku();
        },
        // 获取规格，接口不给让调详情
		getSku() {
			const params = {
				goods_id: this.goodsId
			};
			this.$http.get(goodsDetail, { params }).then(res => {
				var data = res.data;
				if (data && data.result == 1) {
					let noStock =
						data.stocknum < 1 || data.state == 1 || data.state == 2
							? true
							: false;
					if (noStock) {
                        this.$msgBox.msgTxt("该商品没有库存或已下架");
						return;
					}

					this.goodsData = data.data;

					if (this.goodsData.buyupnum == 0) {
						//判断是否超出限购数量
                        this.$msgBox.msgTxt(`该商品限购${this.goodsData.buyupnum}件`);
					} else {
						if (this.goodsData.spec.length < 2) {
                            let _spec = this.goodsData.spec[0];
                            this.mySpecId = _spec.specId;
                            this.shareShow = true;
                            //统计埋点
                            let data = {
                                code: 'NH1',
                                query: {
                                    name: "免费送年货",
                                },
                                extra:{
                                    param1:2
                                }
                            }
                            this.$tapConfig.batchClick(0,data,0)
                            return;
						}
						this.skuShow = true;
					}
				} else {
                    this.$msgBox.msgTxt(data && data.message ? data.message : "网络失败");
				}
			});
		},
        // 确认送礼页面分享给微信好友
        sendShare(obj){
            //分享成功回调
            this.createOrder(obj);
        },
        // 接收选中的skuid
		submitSku(obj) {
            this.mySpecId = obj.id;
			this.skuShow = !this.skuShow;
            this.shareData["imgUrl"]=obj.img;
            this.shareShow = true;
		},

        createOrder(obj){
            let self = this;
            let os = getQueryString('os');
            let params = {
                goods_id: this.goodsId,
                spec_id: this.mySpecId,
                share_blessing:obj.share_blessing,
                num: 1,
                os: os,
            }
            this.$http.get(orderAdd, {params}).then(res => {
                let data = res.data;
                if(data["result"] == 1){
                    //统计埋点
                    let data_s = {
                        code: 'NH1_2',
                        query: {
                            name: "确认送礼页面",
                        },
                        extra:{
                            param1:data.annualId
                        }
                    }
                    self.$tapConfig.batchClick(0,data_s,0)
                    self.$parent.my_update();
                    obj.shareUrl += 'annual_id/' + data.annualId ;
                    shareToWx(obj);
                    this.shareShow = false;

                    // 错误日志上报
                 try {
                       if(errorLogUpload && !data.annualId){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify(params),
                                uri: location.href,
                                apiUri: orderAdd,
                                data: JSON.stringify(data),
                                message: "创建订单失败",
                                method: 'get',
                                code: 200
                                }
                            })
                     }
                    } catch (error) {
                        
                    }



                }else{
                    this.$msgBox.msgTxt((data && data.message) ? data.message : '网络失败');
                }
            })
        },
        changeIndex(index){
            // this.navChange(this.navData.data[index]["id"]);
            this.$refs.nav.navClisk(this.navData.data[index]["id"])
        },
        // 去商品详情页
        toGoods(id,title,price,num){
            this.$router.push(`${toGoodsDetail}/goods_id/${id}/goods_name/${title}/group_price/${price}/group_number/${num}`);
        },
    },
    components: {
        rule,
        pullUpBox,
        scrollNav,
        swiperSlide,
        swiperList,
        skuCheck,
        share
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
        padding-bottom: 48px;
        .top {
            width: 100%;
            position: relative;
            img {
                width: 100%;
                &.rule {
                    position: absolute;
                    width: 54px;
                    // height: 62px;
                    right: 14px;
                    top: 0;
                }
            }
            .rule_txt{
                position: absolute;
                width: 3.375rem;
                right: 14px;
                top: 0;
                text-align: center;
                font-size: 12px;
                line-height: 20px;
                color: #DB2331;
            }
        }
        .goods_container{
            height: 320px;
            overflow: hidden;
            opacity: 0;
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
                    padding: 10px 0 10px 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .list-item-right{
                    flex: 1;
                    padding: 5px 10px 0;
                    .goods-name{
                        // margin-bottom: 13px;
                        height: 34px;
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
                        margin-top: 3px;
                        margin-bottom: 13px;
                        font-size: 11px;
                        color: #EE0000;
                        letter-spacing: 0;
                        line-height: 11px;
                        display: flex;
                        justify-content: space-between;
                        font-weight: 500;
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
                            max-width: 135px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
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
}
.iPhoneX{
    .list{
        .container{
            padding-bottom: 68px;
        }
    }
}
</style>
