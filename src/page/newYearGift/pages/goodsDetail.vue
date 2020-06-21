<template>
	<div :class="['goodsDetail', haveData ? 'haveData' : '']">
		<!-- 顶部弹幕 -->
		<topDanmu :dataObj="danmuData" v-if="danmuData.length > 0"></topDanmu>
        <div class="goodsDetail-box">
            <!-- 轮播 -->
            <banner :banners="banners"></banner>
            <!-- 商品信息 -->
            <div class="goods-info">
                <div class="goods-info-top">
                    <div class="now-price">
                        <span>{{lotteryNum}}人参与必有1人中奖</span>
                    </div>
                    <!-- <div class="old-price">¥{{goodsData.shopPrice}}</div> -->
                    <!-- <div class="postage">包邮</div> -->
                    <div class="need-people">原价{{goodsData.shopPrice}}元</div>
                    <!-- <div v-if="goodsData.topEarns" class="sale-num">
                        {{goodsData.topEarns}}
                    </div> -->
                    
                </div>
                <div class="goods-name">{{goodsData.name}}</div>
            </div>
            <!-- 评论 -->
            <div
                class="comment"
                style="display: block;"
                v-if="secondGoodsData.baskInfo && secondGoodsData.baskInfo.baskNum > 0"
            >
                <div class="comment-title">
                    <span>宝贝评价{{secondGoodsData.baskInfo.baskNum ? '('+secondGoodsData.baskInfo.baskNum+')' : ''}}</span>
                    <!-- <span onclick="msg('请在APP中查看全部评论')">查看全部</span> -->
                </div>
                <!-- <ul class="comment-tags">
                    <li>质量很好(113)</li>
                    <li>质量很好(113)</li>
                    <li>质量很好(113)</li>
                </ul>-->
                <ul class="comment-list">
                    <li v-for="(item, index) in secondGoodsData.baskInfo.baskList" :key="index">
                        <div class="comment-list-title">
                            <div class="comment-list-pic">
                                <img :src="item.avatar" alt>
                            </div>
                            <div class="comment-list-name">{{item.nikename}}</div>
                            <div class="comment-list-time">{{item.baskTime}}</div>
                        </div>
                        <div class="comment-list-cont">{{item.baskContent}}</div>
                        <div class="comment-pics" v-if="item.baskPic && item.baskPic.length > 2">
                            <div v-for="(itemPic,i) in item.baskPic" :key="i" v-if="i < 3">
                                <img :src="itemPic.thumb123" alt>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 店铺信息 -->
            <div class="shop" v-if="goodsData&&goodsData.storeInfo">
                <div class="icon">
                    <img :src="goodsData.storeInfo.storeIcon">
                </div>
                <div class="info">
                    <div class="title">{{goodsData.storeInfo.storeName}}</div>
                    <div class="other">
                        <span>商品数量: {{goodsData.storeInfo.goodsNum}}</span>
                        <span>{{goodsData.storeInfo.saleNum}}</span>
                    </div>
                </div>
                <div class="enter" @click="toShop(goodsData.storeInfo.storeId)">
                    进店
                </div>
            </div>

                    <!-- 三包服务 -->
                    <div class="ensure" >
                        <div class="ensure_logo">
                            <img v-lazy="goodsData.payImage" />
                        </div>
                    </div>
                    <!-- 商品大图 -->
                    <div class="goods_img" >
                        <div v-for="(item, index) in goodsData.image" :key="index">
                            <img v-lazy="item.img640url" alt style="opacity: 1;">
                        </div>
                    </div>
        </div>
		<!-- 底部按钮 -->
		<footer>
			<div>
				<div class="back-shop" @click.self="backMain">更多礼物</div>
				<div :class="['add-goods',noStock ? 'noStock' : '']" @click.self="popSku">免费送礼物</div>
			</div>
		</footer>
		<skuCheck :data="goodsData" @submitSku="submitSku" :skuShow="skuShow"></skuCheck>
		<share :shareShow="shareShow" :goods="shareData" @sendShare="mySendShare"></share>
	</div>
</template>

<script >
import {
	getQueryString,
	userAppPay,
	fissile_setCart,
	fissile_getCart,
    check_login,
    jump2Shop,
    getEnvironment,
    changeTitle,
    _getUserInfo
} from "@/assets/js/common/utils.js";
import { goodsDetail, orderAdd, danmuList, secondGoodsDetail } from "./../assets/js/api.js";
import { shareToWx} from "../assets/js/utils.js";
import banner from "@/components/swiper";
import skuCheck from "@/components/skuCheck";
import topDanmu from "@/components/topDanmu";
import share from "./share";

export default {
    name: "goodsDetail",
    components: {
        banner,
        skuCheck,
        topDanmu,
        share
    },
    data() {
        return {
            haveData: false,
            banners: [],
            userId: _getUserInfo().user_id,
            goodsId: getQueryString('goods_id'),
            goodsData: {}, //一级商品详情数据
            secondGoodsData: {}, //二级商品详情数据
            skuShow:false, //规格选择框是否显示
            mySpecId: '', // 我的规格id
            addressId: '', // 当前地址
            danmuData:[],//弹幕数据
			shareShow: false, // 分享确认框是否显示
            shake: false,
            myGoodsNum: 0,
            flyData: {
                show: false,
                img: '',
                start: {},
                end: {}
            }, // 飞入动画参数
            shareData:{},//分享确认框显示内容
            payType: '', //支付方式
            noStock: false,
            lotteryNum:getQueryString("group_number"),
        };
    },
    created() {
        //统计埋点
        let data_s = {
            code: 'NH4',
            query: {
                name: "商品详情页",
            }
        }
        this.$tapConfig.batchClick(0,data_s,0);
		changeTitle(decodeURI(getQueryString("goods_name")));      
        this.getData();
        this.getDanmuData();
    },
    methods: {
        // 获取商品详情信息
        getData(){
            const params = {
                goods_id: this.goodsId
            }
            this.$http.get(goodsDetail,{params}).then(res => {
                var data = res.data;
                console.log(res);
                if(data && data.result == 1){
                    this.goodsData = data.data;
                    this.banners = this.goodsData.album.map((item) => {
                        return item.img640url;
                    })
                    this.haveData = true;
                    this.noStock = (data.data.stocknum < 1 || data.data.state == 1 || data.data.state == 2 ? true : false);
                    this.getSecondData();
                                     // 错误日志上报
                    try {
                        if(errorLogUpload && !this.goodsData){
                            errorLogUpload({
                                logLevel: 3,
                                errType: 21,
                                apiError: {
                                    params: JSON.stringify(params),
                                    uri: location.href,
                                    apiUri: goodsDetail,
                                    data: JSON.stringify(data),
                                    message: "获取数据详情失败",
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
        // 获取二级商品详情信息
        getSecondData(){
            const params = {
                goods_id: this.goodsId,
                state: this.goodsData.state,
            }
            if(getEnvironment()==1 && this.goodsData && this.goodsData["storeInfo"]){
                params["supplier_id"]= this.goodsData["storeInfo"]["storeId"];
            }
            this.$http.get(secondGoodsDetail,{params}).then(res => {
                var data = res.data;
                console.log(res);
                if(data && data.result == 1){
                    this.secondGoodsData = data.data;
                    // 错误日志上报
                    try {
                        if(errorLogUpload && !this.secondGoodsData){
                            errorLogUpload({
                                logLevel: 3,
                                errType: 21,
                                apiError: {
                                    params: JSON.stringify(params),
                                    uri: location.href,
                                    apiUri: secondGoodsDetail,
                                    data: JSON.stringify(data),
                                    message: "获取二级商品详情失败",
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
        //获取弹幕信息
        getDanmuData(){
            this.$http.get(danmuList).then(res=>{
                if(res.data.result==1){
                    this.danmuData=res.data.items;
                }
            },err=>{})
        },
        // 返回店铺操作
        backMain(){
            this.$router.go(-1);
        },

        //规格弹框
        popSku(){
            if(!check_login()) return;
            if(this.noStock) return;
            //是否为单规格
            this.shareData={
                goodsName:decodeURI(getQueryString("goods_name")),
                groupPrice:getQueryString("group_price"),
                lotteryNum:getQueryString("group_number"),
                imgUrl:this.goodsData.img320url,
                shareBlessing:getQueryString("shareBlessing"),
            }
            if(this.goodsData.spec.length < 2){
                let _spec = this.goodsData.spec[0];
                this.mySpecId = _spec.specId;
                this.shareShow = true;
                return;
            }else{
                this.skuShow=!this.skuShow;
            }
        },  
        // 接收选中的skuid
        submitSku(obj) {
            this.mySpecId = obj.id;
            this.skuShow=!this.skuShow;
            this.shareData["imgUrl"]=obj.img;
            this.shareShow=true;
        },

        // 提交支付
        submitCart(params) {
            var self = this;
            console.log(params.id, params.addrTxt);

        },
        // 我的支付方式
        myPayType(id){
            console.log('支付方式:'+id);
            this.payType = id;
            this.createOrder();
        },
        // 进店铺
        toShop(id){
            jump2Shop(id)
        },
        // 确认送礼页面分享给微信好友
        mySendShare(obj){
            //分享成功回调
            this.createOrder(obj);
        },
        // 创建订单
        createOrder(obj){
            this.payTypeShow = false;
            let self = this;
            let os = getQueryString('os');
            let params = {
                goods_id: this.goodsId,
                spec_id: this.mySpecId,
                num: 1,
                check: 1,
                share_blessing:obj.share_blessing,
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
                    obj.shareUrl += 'annual_id/' + data.annualId;
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
        }
    },
    mounted(){
    }
};
</script>

<style scoped lang="scss">
.goodsDetail {
	// height: 100%;
	// overflow-x: hidden;
	opacity: 0;
	// padding-bottom: 80.5px;
	// -webkit-overflow-scrolling: touch;
	&.haveData {
		opacity: 1;
	}
    .goodsDetail-box{
        padding-bottom: 48px;
    }
	.goods-info {
		padding: 19px 13px 15px;
		background-color: #fff;
		.goods-info-top {
			// overflow: hidden;
			// height: 1.69rem;
			margin-bottom: 14px;
			&::after {
				content: "";
				clear: both;
				display: block;
				height: 100%;
				width: 0;
			}
			div {
				float: left;
				line-height: 25px;
			}
			.now-price {
				font-weight: 600;
				color: #ee0000;
				font-size: 20px;
				margin-right: 0.84rem;
			}
			.now-price span {
				font-size: 16px;
			}
			.old-price {
				margin-top: 9px;
				font-size: 13px;
				line-height: 13px;
				color: #9b9b99;
				text-decoration: line-through;
			}
			// .postage{
			//     margin: 0.8rem 0.28rem 0;
			//     font-size: 0.69rem;
			//     line-height: 0.69rem;
			//     color: #191919;
			// }
			.need-people,
			.sale-num {
				margin-top: 4px;
				float: right;
				font-size: 16px;
				color: #a6a6a6;
				line-height: 20px;
			}
			.sale-num {
				padding: 0 5px;
				margin-right: 5px;
				background-color: #ffe6de;
				border-radius: 2px;
				color: #ee0000;
			}
			.new-people {
				margin-left: 0.2rem;
				color: #fff;
				background-color: #ff6632;
			}
		}
		.goods-name {
			width: 100%;
			// margin-bottom: 1rem;
			font-size: 14px;
			color: #191919;
			line-height: 22px;
			overflow: hidden;
			// text-overflow: ellipsis;
			// white-space: nowrap;
			.icon-11 {
				width: 4rem;
				height: 1.06rem;
				position: relative;
				top: -0.1rem;
			}
		}
		.open-vip {
			width: 100%;
			height: 2.31rem;
			padding: 0 0.63rem;
			font-size: 0.88rem;
			color: #191919;
			line-height: 2.31rem;
			background-color: #f7f6f2;
			font {
				font-size: 0.88rem;
			}
			div {
				&.open-vip-top {
					float: left;
					span {
						color: rgb(208, 2, 27);
					}
				}
				&.open-vip-btm {
					float: right;
					padding-right: 1.13rem;
					// background-image: url('../../../images/icon_hy_more@2x.png');
					background-size: 1.06rem 1.06rem;
					background-position: right center;
					background-repeat: no-repeat;
				}
			}
		}
	}
	.comment {
		display: none;
		margin: 10px auto 0;
		background: #fff;
		padding: 0.81rem;
		.comment-title {
			display: -webkit-flex;
			display: flex;
			-webkit-justify-content: space-between;
			justify-content: space-between;
			line-height: 1.31rem;
			span {
				&:first-child {
					font-size: 0.94rem;
					color: #333333;
				}
				// &:last-child{
				//     font-size: 0.75rem;
				//     color: #FF6632;
				//     &::after{
				//         content: '';
				//         display: inline-block;
				//         width: 0.38rem;
				//         height: 0.68rem;
				//         margin-left: 0.25rem;
				//         background-image: url('./../../assets/images/tenFair/comment_icon_more@3x.png');
				//         background-size: 100% 100%;
				//     }
				// }
			}
		}
		.comment-tags {
			display: -webkit-flex;
			display: flex;
			-webkit-flex-wrap: wrap;
			flex-wrap: wrap;
			li {
				-webkit-flex: 0 0 6.88rem;
				flex: 0 0 6.88rem;
				margin-right: 0.58rem;
				margin-top: 0.81rem;
				background: #ffede6;
				border-radius: 0.19rem;
				font-size: 0.81rem;
				line-height: 1.75rem;
				text-align: center;
				color: #333333;
				&:nth-child(3) {
					margin-right: 0;
				}
			}
		}
		.comment-list {
			margin-top: 0.88rem;
			li {
				margin-bottom: 0.5rem;
				&:last-child {
					margin-bottom: 0;
				}
				.comment-list-title {
					display: -webkit-flex;
					display: flex;
					-webkit-align-items: center;
					align-items: center;
					font-size: 0.75rem;
					color: #757575;
					.comment-list-pic {
						-webkit-flex: 0 0 1.5rem;
						flex: 0 0 1.5rem;
						height: 1.5rem;
						border-radius: 50%;
						overflow: hidden;
						img {
							width: 1.5rem;
							height: 1.5rem;
						}
					}
					.comment-list-name {
						-webkit-flex: 1;
						flex: 1;
						margin-left: 0.5rem;
					}
					.comment-list-time {
						-webkit-flex: 0 0 4rem;
						flex: 0 0 4rem;
						font-size: 0.69rem;
						text-align: right;
						color: #999999;
					}
				}
				.comment-list-cont {
					margin-top: 0.63rem;
					font-size: 13px;
					color: #333333;
					line-height: 1.13rem;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.comment-pics {
					width: 100%;
					margin-top: 0.69rem;
					display: -webkit-flex;
					display: flex;
					div {
						-webkit-flex: 1;
						flex: 1;
						display: block;
						margin-right: 0.38rem;
						&:last-child {
							margin-right: 0;
						}
						img {
							width: 100%;
						}
					}
				}
			}
		}
	}
	.ensure {
		margin: 10px auto 0;
		background: #fff;
		.ensure_logo {
			width: 100%;
		}
		img {
			// width:23.3%;
			width: 100%;
		}
	}
    .shop{
		margin: 10px auto 0;
		background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 69px;
        padding: 0 13px;
		.icon {
			width: 43px;
			height: 43px;
            img {
                // width:23.3%;
                width: 100%;
            }
		}
        .info{
            flex: 1;
            margin-left: 10px;
            .title{
                font-size: 15px;
                color: #333333;
                font-weight: bold;
            }
            .other{
                font-size: 12px;
                color: #999999;
                margin-top: 8px;
            }
        }
        .enter{
            border: 1px solid #FF6632;
            border-radius: 3px;
            width: 56px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            color:#FF6632;
            font-size: 12px;
        }

    }
	// 商品详情图
	.goods_img {
		padding: 0.81rem 0.81rem;
		margin-top: 10px;
		background-color: #fff;
		img {
			width: 100%;
		}
	}
	// 底部按钮
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
        z-index: 1;
		width: 100%;
		// height: 80.5px;
		font-size: 16px;
		text-align: center;
		line-height: 48.5px;
		div {
			overflow: hidden;
		}
		.footer-tip {
			font-size: 12px;
			line-height: 32px;
			text-align: center;
			color: #ee0000;
			background: #ffe6de;
		}
		.back-shop {
			float: left;
			width: 38.7%;
			color: #333333;
			background: #ffffff;
		}
		.add-goods {
			float: left;
			width: 61.3%;
			color: #ffffff;
			background: #ff5a32;
			&.noStock {
				background-color: #C0C0C0;
			}
		}
        
	}
	.cartIcon {
		width: 66px;
		height: 66px;
		position: fixed;
		bottom: 116px;
		right: 10px;
		z-index: 3;
		&.shake {
			-webkit-animation: shake 0.8s 0.6s linear;
			animation: shake 0.8s 0.6s linear;
		}
		img {
			width: 100%;
		}
		p {
			position: absolute;
			left: 0;
			top: 38px;
			width: 100%;
			color: #fff;
			font-size: 11px;
			line-height: 12px;
			text-align: center;
		}
	}
}
@-webkit-keyframes shake {
	0% {
		-webkit-transform: rotateZ(0) scale(1, 1);
	}
	25% {
		-webkit-transform: rotateZ(0) scale(1.1, 1.1);
	}
	50% {
		-webkit-transform: rotateZ(0) scale(0.9, 0.9);
	}
	75% {
		-webkit-transform: rotateZ(0) scale(1.1, 1.1);
	}
	100% {
		-webkit-transform: rotateZ(0) scale(1, 1);
	}
}
@keyframes shake {
	0% {
		transform: rotateZ(0) scale(1, 1);
	}
	25% {
		transform: rotateZ(0) scale(1.1, 1.1);
	}
	50% {
		transform: rotateZ(0) scale(0.9, 0.9);
	}
	75% {
		transform: rotateZ(0) scale(1.1, 1.1);
	}
	100% {
		transform: rotateZ(0) scale(1, 1);
	}
}
.iPhoneX{
    .goodsDetail {
        footer{
            background: #f9f9f9;
            padding-bottom: 20px;
        }
        .goodsDetail-box{
            padding-bottom: 68px;
        }
    }
}
</style>
