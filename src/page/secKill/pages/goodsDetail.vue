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
                    <div class="now-price">¥
                        <span>{{goodsData.price}}</span>
                    </div>
                    <div class="old-price">¥{{goodsData.shopPrice}}</div>
                    <!-- <div class="postage">包邮</div> -->
                    <div class="need-people">{{goodsData.groupCount}}</div>
                    <div v-if="goodsData.topEarns" class="sale-num">
                        {{goodsData.topEarns}}
                    </div>
                    
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
                            <img src="../assets/images/img_safeguard@3x.png">
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
			<!-- <div> -->
				<div class="add-goods" v-show="goodsData.soldout=='3' && !noStock" @click.self="popSku">立即秒杀</div>
				<div class="add-goods noStock" v-show="goodsData.soldout=='1'" >已抢完，明日再来~</div>
				<div class="add-goods noStock" v-show="goodsData.soldout=='2'" >今日23:00准时开抢</div>
			<!-- </div> -->
		</footer>
		<!-- 购物篮icon -->
		<!-- <div :class="[shake ? 'shake' : '' , 'cartIcon']" @click="openCart" ref="cartIcon">
			<img src="../assets/images/icon_basket copy@2x.png" alt>
			<p>{{cartNum}}</p>
		</div> -->
		<msgBox :msgTxt="msgTxt"></msgBox>
		<skuCheck :data="goodsData" @submitSku="submitSku" :skuShow="skuShow"></skuCheck>
		<payTypeBox :show="payTypeShow" @myPayType="myPayType"></payTypeBox>
        <addressCheck :data="addressData" @submitAddress="submitAddress" :addressShow="addressShow"></addressCheck>
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
import banner from "@/components/swiper";
import msgBox from "@/components/msgBox";
import skuCheck from "@/components/skuCheck";
import addressCheck from "@/components/addressCheck";
import payTypeBox from "@/components/payType";
import topDanmu from "@/components/topDanmu";

export default {
    name: "goodsDetail",
    components: {
        banner,
        msgBox,
        skuCheck,
        topDanmu,
        addressCheck,
        payTypeBox
    },
    data() {
        return {
            haveData: false,
            banners: [],
            userId: _getUserInfo().user_id,
            goodsId: getQueryString('goods_id'),
            msgTxt: '', //提示信息
            goodsData: {}, //一级商品详情数据
            secondGoodsData: {}, //二级商品详情数据
            skuShow:false, //规格选择框是否显示
            mySpecId: '', // 我的规格id
            addressId: '', // 当前地址
            danmuData:[],//弹幕数据
            addressData:[],//地址默认数据
            shake: false,
            myGoodsNum: 0,
            flyData: {
                show: false,
                img: '',
                start: {},
                end: {}
            }, // 飞入动画参数
            payTypeShow: false, // 支付方式选择框是否显示
            payType: '', //支付方式
            noStock: false,
            addressShow: false,//地址组件
        };
    },
    created() {
		changeTitle(decodeURI(getQueryString("goods_name")));      
        this.getData();
        // this.getDanmuData();
    },
    methods: {
        // 获取商品详情信息
        getData(){
            const params = {
                goods_id: this.goodsId
            }
            // let url="/apiHost/tenFair.php/v1_0_0/Transpond/request/api_url/goods-info/showLoading/1?goods_id=1423865&uuid=FE011DB9-D384-48C4-B6E8-05E070913670&os=wap&_t=1545914189&user_id=5062131553071963&token=5d943513e1e8baba"
            // this.$http.get(url,{params}).then(res => {
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
                }else{
                    this.msgTxt = ((data && data.message) ? data.message : '网络失败');
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
            // let url="/apiHost/tenFair.php/v1_0_0/Transpond/request/api_url/goods-secondDetail?goods_id=1423865&supplier_id=14022&state=0&uuid=FE011DB9-D384-48C4-B6E8-05E070913670&os=wap&_t=1545914189&user_id=5062131553071963&token=5d943513e1e8baba"
            // this.$http.get(url,{params}).then(res => {
            this.$http.get(secondGoodsDetail,{params}).then(res => {
                var data = res.data;
                console.log(res);
                if(data && data.result == 1){
                    this.secondGoodsData = data.data;
                }else{
                    this.msgTxt = ((data && data.message) ? data.message : '网络失败');
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
        backShop(){
            this.$router.go(-1);
        },
        // 接收选中的地址id
		submitAddress(params) {
			var self = this;
			console.log(params.id, params.addrTxt);
			this.addressId = params.id;
			this.addressShow = false;
            this.payTypeShow = true;
        },
        //规格弹框
        popSku(){
            check_login();
            //是否为单规格
            if(this.goodsData.spec.length < 2){
                let _spec = this.goodsData.spec[0];
                this.mySpecId = _spec.specId;
                this.addressShow=true;
                return;
            }else{
                this.skuShow=!this.skuShow;
            }
        },  
        // 接收选中的skuid
        submitSku(obj) {
            this.mySpecId = obj.id;
            this.skuShow=!this.skuShow;
            this.addressShow=true;
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

        // 创建订单
        createOrder(){
            this.payTypeShow = false;
            let self = this;
            let os = getQueryString('os');
            let params = {
                addressId: this.addressId,
                goodsId: this.goodsId,
                specId: this.mySpecId,
                num: 1,
                check: 1,
                paymentId: this.payType,
                activities:"marketSeckill",
                os: os,
                is_post: 1,
            }
            this.$http.get(orderAdd, {params}).then(res => {
                let data = res.data;
                console.log(data);
                if(data.status == 1){
                    // 删除已创建订单的商品
                    userAppPay({
                        orderNo: data.data.orderNo,
                        goodsName: data.data.orderName,
                        payType: this.payType,
                        price: data.data.payAmount,
                    });
                }else{
                    this.msgTxt = ((data && data.message) ? data.message : '网络失败');
                }
            })
        }
    },
    mounted(){
        // let self = this;
        // this.$refs.cartIcon.addEventListener('animationend', function(){
        //     self.animationEnd();
        // })
        // document.getElementsByClassName('goodsDetail')[0].addEventListener('scroll',function(){
        //     console.log(this.scrollTop,this.scrollHeight)
        // })
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
				font-size: 27px;
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
				font-size: 11px;
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
			width: 100%;
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
</style>
