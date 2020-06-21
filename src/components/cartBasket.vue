<template>
	<div class="cart">
		<slideUpBox :show="cartShow" @changeBoxShow="changeBoxShow()">
			<div class="cartBox">
				<div class="top">
					<div>购物篮</div>
					<div class="close-btn" @click.stop="changeBoxShow(false)">
						<img src="@/assets/images/common/icon_close@2x.png">
					</div>
				</div>
				<div class="wrapper under" >
					<div class="address" @click.stop="address()">
						<div class="origin" v-if="hasDefaultAddr">
							<p class="info">
								<span>{{defaultAddr["consignee"]}}</span>
								<span>{{defaultAddr["mobile"]}}</span>
							</p>
							<p class="detail">{{defaultAddr["address"]}}</p>
						</div>
						<div class="empty" v-else>
							<p class="tip">您的收货地址为空，点此添加收货地址</p>
						</div>
						<img src="@/assets/images/common/icon_more@2x.png">
					</div>
					<img class="line" src="@/assets/images/common/icon_bj copy@2x.png">
					<div class="empty-cart" v-show="emptyCartShow">购物篮空空如也，快去添加商品吧~</div>
					<div class="goodsList">
						<div class="goodsInfo" v-for="(item,index) in goodsList" :key="index">
							<img v-lazy="item.imgUrl">
							<div class="cont">
								<div class="col">
									<div class="title">{{item.goodsName}}</div>
									<img src="@/assets/images/common/icon_close@2x.png" @click="delGood(item)">
								</div>
								<div class="sku">
									<span v-if="item.color">颜色：{{item.color}}</span>
									<span v-if="item.size">尺寸：{{item.size}}</span>
								</div>
								<div class="price">
									<small>¥{{item.price}}</small>
									<div class="num">
										<div class="minus" @click="minusNum(index)">-</div>
										<div class="val">{{item.num}}</div>
										<div class="add" @click="addNum(index)">+</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
					<div class="underTip" v-html="footerTip"></div>

				<div class="buy-submit" @click.self="skuSubmit()">
					<div class="buy-info">
						<p class="totalPrice">
							<span>总价：</span>
							<span class="red">￥</span>
							<span class="red big">{{payAmount}}</span>
						</p>
						<p class="coupon">优惠：{{discountAmount}}</p>
					</div>
					<div class="pay" @click.self="toPay">去支付</div>
				</div>
			</div>
		</slideUpBox>
		<addressCheck
			:data="addressData"
			@submitAddress="submitAddress"
			@returnAddressId="returnAddressId"
			:addressShow="addressShow"
		></addressCheck>
	</div>
</template>

<script >
import { cartItem } from "@/page/tenFair/assets/js/api.js";
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import {
	getQueryString,
	fissile_setCart,
	fissile_getCart
} from "@/assets/js/common/utils";
import slideUpBox from "@/components/slideUpBox";
import addressCheck from "@/components/addressCheck";
export default {
	name: "",
	props: {
		cartShow: {
			type: Boolean,
			default: false
        },
        shopIdFrom:{
			type: String,
			default: ''
        },
        cartType:{
            type:Number,
            default:1
        },
        act_type :{
			type: String,
			default: '1'
        },
    },
    data() {
		return {
			defaultAddr: {}, //默认地址
			hasDefaultAddr: false, //是否有默认地址
			payAmount: 0, //订单价格
			discountAmount: 0, //优惠价格
			tip: 0, //提示
			addressShow: false,
			addressData: [],
			cartObj: {}, //购物车数据
			shop_id: getQueryString("shop_id"),
			addressId: 0,
			goodsList: [],
			canBuyNum: this.cartType==1?5:2,
			activity: this.cartType==1?"tenFair":"tenTwo",
			footerTip: `还差<span>${this.canBuyNum}</span>件商品，<span>10元</span>${this.canBuyNum}件带回家`,
			emptyCartShow: false
		};
	},
	watch: {
		cartShow() {
            if (this.shopIdFrom) {
                this.shop_id = this.shopIdFrom;
            }
			if (this.cartShow) {
                this.setCartData();
				this.footerTip = this.$parent.footerTip;
			}
        },
	},
	created() {
		// this.getAddressList();
	},
	methods: {
		//  设置购物车数据
		setCartData() {
			let userCart = fissile_getCart();
			if (
				Object.keys(userCart).length > 0 &&
				userCart[this.activity] &&
				userCart[this.activity][this.shop_id]
			) {
				this.cartObj = userCart[this.activity][this.shop_id];
			}
			this.getCartInfo();
			this.$emit("changeCart", true);
		},
		changeBoxShow(bool) {
			// this.setAddressShow(bool);
			this.$parent.cartShow = bool;
		},
		//移出购物车
		delGood(goodsInfo) {
			let good = this.goodsList.filter(function(item, index) {
				return item.specId == goodsInfo.specId && item.goodsId == goodsInfo.goodsId;
            })[0];
			fissile_setCart(
				"delete",
				{
					spec_id: good.specId
				},
				{
					project: this.activity,
					shopId: this.shop_id
				}
			);
			this.goodsList = this.goodsList.filter(function(item, index) {
				return item.specId != goodsInfo.specId;
			});
			if (this.goodsList.length == 0) {
				this.payAmount = 0;
				this.discountAmount = 0;
				this.footerTip = `还差<span>${this.canBuyNum}件</span>商品，<span>10元</span>${this.canBuyNum}件带回家`;
				this.$emit("changeCart", true);
				return;
			}
			this.setCartData();
		},
		//增加数量
		addNum(index) {
			let num = this.goodsList.reduce(function(pre, next) {
				return pre + Number(next["num"]);
			}, 0);
			if (this.goodsList[index].num >= this.goodsList[index].buyUpNum) {
				this.$parent.msgTxt =
					"该商品最多可购买" + this.goodsList[index].buyUpNum + "件";
				return;
			}
			if (num >= 30) {
				this.$parent.msgTxt = "购物篮最多能放30件，已经装不下了哦";
				return;
			}
			this.goodsList[index].num += 1;
			// this.goodsList=[...this.goodsList];
			fissile_setCart(
				"change",
				{
					goods_id: this.goodsList[index].goodsId,
					spec_id: this.goodsList[index].specId,
					num: this.goodsList[index].num,
					goods_checked: 1 //购物车商品是否选中
				},
				{
					project: this.activity,
					shopId: this.shop_id
				}
			);
			this.setCartData();
		},
		//减少数量
		minusNum(index) {
			if (this.goodsList[index].num > 1) {
				this.goodsList[index].num -= 1;
				// this.goodsList=[...this.goodsList];
				fissile_setCart(
					"change",
					{
						goods_id: this.goodsList[index].goods_id,
						spec_id: this.goodsList[index].specId,
						num: this.goodsList[index].num,
						goods_checked: 1 //购物车商品是否选中
					},
					{
						project: this.activity,
						shopId: this.shop_id
					}
				);
				this.setCartData();
			}
		},
		//弹出地址选项
		address() {
			this.$parent.cartShow = false;
			this.addressShow = true;
		},
		//获取购物车信息
		getCartInfo() {
            let self = this;
			if (!this.cartObj.goods_id) {
				this.emptyCartShow = true;
				this.footerTip = `还差<span>${this.canBuyNum}件</span>商品，<span>10元</span>${this.canBuyNum}件带回家`;
				return;
			}
			this.emptyCartShow = false;
			let params = {
				addressId: this.addressId ? this.addressId : 0,
				goodsId: this.cartObj.goods_id,
				specId: this.cartObj.spec_id,
				num: this.cartObj.num,
                check: this.cartObj.goods_checked,
                activities: this.cartType==1?'tenFive':'tenTwo',
				os: getQueryString("os")
			};
			Object.assign(params, this.cartObj);
			console.log(params);
			this.$http.get(cartItem, { params }).then(
				res => {
					if (res.data && res.data.status == 1) {
						let result = res.data["data"];
						if (!result["address"] || JSON.stringify(result["address"]) == "{}") {
							this.hasDefaultAddr = false;
						} else {
							this.hasDefaultAddr = true;
							this.defaultAddr = result["address"];
							this.addressId = this.defaultAddr.id;
							this.discountAmount = result["discountAmount"];
							this.payAmount = result["payAmount"];
                        }
                        result["goodsList"] && result["goodsList"].length > 0 ? this.goodsList = result["goodsList"] : '';
						if (result["errorMessage"]) {
							this.$parent.msgTxt = result["errorMessage"];
						}
						this.footerTip = result["tip"];
					} else if (res.data && res.data.status == 0) {
                        let spec_ids = this.cartObj.spec_id.split(",");
                        spec_ids.map(function(item) {
                            fissile_setCart(
                                "delete",
                                {
                                    spec_id: item
                                },
                                {
                                    project: self.activity,
                                    shopId: self.shop_id
                                }
                            );
                        });
                        this.setCartData();
                        this.$parent.cartShow = false;
                        if (res.data && res.data["message"]) {
							this.$parent.msgTxt = res.data["message"];
						} else {
							this.$parent.msgTxt = "操作过快，请重新操作";
						}
                    }else {
						if (res.data && res.data["message"]) {
							this.$parent.msgTxt = res.data["message"];
						} else {
							this.$parent.msgTxt = "网络失败";
						}
                    }
                    

				},
				err => {}
			);
		},
		//获取收货地址
		// getAddressList(){
		// 	this.$http.get(getAddressList).then( res => {
		// 			if (res.data.result == 1) {
		// 				this.addressData=res.data["data"];
		// 				this.defaultAddr = this.addressData.filter(function (item,index) {
		// 					return item.default==1;
		// 				})
		// 				this.addressId=this.defaultAddr["addressId"];
		// 				// this.cartData=[...this.cartData]
		// 			}else{
		// 				console.log('地址请求失败');
		// 			}
		// 			this.setCartData();
		// 		},
		// 		err => {}
		// 	);
		// },
		// 接收选中的地址id
		submitAddress(params) {
			var self = this;
			console.log(params.id, params.addrTxt);
			this.addressId = params.id;
			this.addressShow = false;
			this.changeBoxShow(true);
			//   this.setAddressShow(false);
			//   this.setPromptObj({
			//     show: true,
			//     tittle: "请确认收货地址",
			//     ptmTxt: params.addrTxt,
			//     cancel: function() {
			//       console.log("cancel");
			//       self.setAddressShow(true);
			//     },
			//     success: function() {
			//       console.log("success");
			//     }
			//   });
		},
		// 去支付
		toPay(){  
            // 埋点
           let  goodsIdList = []
           if(this.goodsList.length>0){
            this.goodsList.forEach(item=>{
               if(item.goodsId){
                   goodsIdList.push(item.goodsId);
               }
            })
           }
            eventTrack({
                funType: 'h5'   ,
                pageName: 'ten_page',
                elementId: 'to_pay',
                eventType:'tap',
                actType:this.act_type,
                goodsList:goodsIdList
	          })
            
            if(this.goodsList.length==0){
                this.$parent.msgTxt="请先选取商品";
                return;
            }else if(!this.addressId){
                this.$parent.msgTxt="请添加收货地址";
                return;
            }
             //统计埋点
            let data = {
                code: 'TF205',
                query: {
                    name: "购物篮",
                }
            }
            this.$tapConfig.batchClick(0,data,0)
			this.$emit('toPay', {temp: true, addressId: this.addressId});
		},
		//返回默认地址id
		returnAddressId(params) {
			this.$emit("returnAddressId", params);
		}
	},
	components: {
		slideUpBox,
		addressCheck
	},
	computed: {
		// orderAmount(){
		//     if(this.goodsList.length==0) return 0;
		//     let total=this.goodsList.reduce(function(pre,next) {
		//         return pre + next["num"]*next["price"]
		//     },0)
		//     return total;
		// }
	}
};
</script>

<style scoped lang="scss">
.cart {
	.cartBox {
		width: 100%;
		position: relative;
		overflow: hidden;
		.line {
			width: 100%;
		}
		.top {
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid #e5e5e5;
			text-align: center;
		}
		.close-btn {
			position: absolute;
			right: 0;
			top: 0;
			width: 42px;
			height: 42px;
			img {
				width: 16px;
				height: 16px;
			}
		}

		.wrapper {
			max-height: 440px;
			overflow-y: auto;
			.address {
				width: 100%;
				height: 85px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 15px 0 15px;
				text-align: center;
				.origin {
					flex: 1;
					text-align: left;
					width: 100%;
					.info {
						font-size: 16px;
						color: #333333;
						margin-bottom: 10px;
					}
					.detail {
						font-size: 13px;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.empty {
					flex: 1;
					.tip {
						font-size: 13px;

						color: #ee0000;
					}
				}
				img {
					width: 8px;
				}
			}
			.empty-cart {
				font-size: 16px;
				text-align: center;
				line-height: 26px;
				padding: 20px 0 50px;
			}
			.goodsList {
				padding: 0 13px 47px 13px;
				.goodsInfo {
					display: flex;
					height: 106px;
					overflow: hidden;
					margin: 12px 0 14px 0;
					border-bottom: 1px solid #e5e5e5;

					img {
						float: left;
						width: 90px;
						height: 90px;
						border: 1px solid #ccc;
					}
					.cont {
						float: left;
						flex: 1;
						font-size: 13px;
						color: #333333;
						margin-left: 12px;
						.col {
							display: flex;
							justify-content: space-between;
							align-items: center;
                            height: 34px;
							.title {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
								line-height: 17px;
								text-align: left;
							}
							img {
								width: 14px;
								height: 14px;
								border: 0;
							}
						}
						.sku {
							font-size: 11px;
							color: #999999;
							text-align: left;
							margin: 7px 0 14px 0;
						}
						.price {
							display: flex;
							justify-content: space-between;
							align-items: baseline;
							small {
								font-size: 14px;
								color: #ee0000;
							}
							.num {
								display: flex;
								justify-content: center;
								align-items: center;
								border: 1px solid #e5e5e5;
								border-radius: 3px;
								width: 74px;
								height: 20px;
								text-align: center;
								.minus {
									flex: 1;
								}
								.add {
									flex: 1;
								}
								.val {
									flex: 2;
									border-left: 1px solid #e5e5e5;
									border-right: 1px solid #e5e5e5;
								}
							}
						}
					}
				}
				.goodsInfo:last-child {
					margin-bottom: 0;
				}
			}
			
		}
		.under {
			.goodsList {
				padding-bottom: 78px;
			}
		}
        .underTip {
				font-size: 12px;
				color: #ee0000;
				background: #ffe6de;
				width: 100%;
				height: 32px;
				line-height: 32px;
				text-align: center;
				position: fixed;
				bottom: 48px;
			}
		.buy-submit {
			width: 100%;
			height: 48px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			bottom: 0;
			background: #fff;
			.buy-info {
				flex: 1;
				text-align: left;
				padding-left: 13px;
				font-size: 13px;
				color: #333333;
				letter-spacing: 0px;
				.red {
					color: #ee0000;
					font-size: 13px;
					+ .big {
						font-size: 19px;
					}
				}
				.totalPrice {
					margin-bottom: 3px;
				}
				.coupon {
					font-size: 12px;
					color: #999999;
				}
			}
			.pay {
				height: 48px;
				line-height: 48px;
				flex: 1;
				background-image: linear-gradient(
					-270deg,
					#ff6632 2%,
					#ed1400 100%
				);
				color: #fff;
				font-size: 16px;
				text-align: center;
			}
		}
	}
}
</style>
<style scoped >
 .underTip>>>span{
        font-weight: bold;
   }
</style>
