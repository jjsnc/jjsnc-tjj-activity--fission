<template>
	<div :class="['shop', hasData ? 'hasData':'']">
		<!-- <betterScroll class="wrapper" :data="list" :pullup="true" :pulldown="true"   @scrollToEnd="loadData" @pulldown="refresh"> -->
		<pullUpBox class="wrapper" :data="list" @loadMore="loadData">
			<div>
				<div class="banner">
					<img v-lazy="bannerPic" alt :style="bannerPic?'':'max-height:130px'">
				</div>
				<div class="sortType">
					<!-- <div
                :class="{active:sortType==1}"
                @click="sort(1)"
            >
                <div>推荐排序</div>
                <div class="sort_line">&nbsp;</div>
					</div>-->
					<div :class="{active:sortType==2}" @click="sort(2)">
						<div>
							人气排序
							<img src="../assets/images/icon_triangle1@2x.png" alt v-if="sortType==3">
							<img
								src="../assets/images/icon_triangle2@2x.png"
								alt
								v-if="type_sales==0&&sortType==2"
							>
							<img
								src="../assets/images/icon_triangle3@2x.png"
								alt
								v-if="type_sales==1&&sortType==2"
							>
						</div>
						<div class="sort_line">&nbsp;</div>
					</div>
					<div :class="{active:sortType==3}" @click="sort(3)">
						<div>
							价格排序
							<img src="../assets/images/icon_triangle1@2x.png" alt v-if="sortType==2">
							<img
								src="../assets/images/icon_triangle2@2x.png"
								alt
								v-if="type_price==0&&sortType==3"
							>
							<img
								src="../assets/images/icon_triangle3@2x.png"
								alt
								v-if="type_price==1&&sortType==3"
							>
						</div>
						<div class="sort_line">&nbsp;</div>
					</div>
				</div>
				<div class="goods_container">
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
				</div>
			</div>
		</pullUpBox>
		<!-- </betterScroll> -->
		<footer @click="submitCart(0)">
			<p>{{footerTip}}</p>
		</footer>
		<div class="share" @click="shareFn">
			<img src="../assets/images/icon_share@2x.png">
		</div>
		<div :class="[shake ? 'shake' : '' , 'cartIcon']" @click="openCart" ref="cartIcon">
			<img src="../assets/images/icon_basket copy@2x.png">
			<p>{{cartNum}}</p>
		</div>
		<skuCheck :data="goodsData" @submitSku="submitSku" :skuShow="skuShow"></skuCheck>
		<cartBasket
			@toPay="submitCart"
			:cartShow="cartShow"
			@changeCart="setCartData"
			@returnAddressId="getAddressId"
		></cartBasket>
		<flyInAnimate :flyData="flyData"></flyInAnimate>
		<payTypeBox :show="payTypeShow" @myPayType="myPayType"></payTypeBox>
	</div>
</template>

<script >
import { eventTrack } from "@/assets/js/common/eventTrack.js";
import { toFiveGoodsDetail } from "./../assets/js/url.js";
import {
	goodsList,
	goodsDetail,
	orderAdd,
	shareImg
} from "./../assets/js/api.js";
// import betterScroll from '@/components/betterScroll';
import pullUpBox from "@/components/pullUpBox";
import skuCheck from "@/components/skuCheck";
import cartBasket from "@/components/cartBasket";
import flyInAnimate from "@/components/flyInAnimate";
import {
	getQueryString,
	fissile_setCart,
	fissile_getCart,
	userAppPay,
	shareToWxMini,
    changeTitle,
    _getUserInfo
} from "@/assets/js/common/utils";
import payTypeBox from "@/components/payType";

export default {
	name: "tenFairShop",
	data() {
		return {
			list: [],
			goodsData: {}, //所选商品数据(含sku)
			goodsId: 0,
			hasData: false,//页面无数据不显示，只显示加载loading
			skuShow: false,
			cartShow: false,
			page: 1, //当前页码
			sortType: 2, //排序类别
			type_sales: 0, //人气排序未点击状态
			type_price: 1, //价格排序未点击状态
			bannerPic: "", //店铺banner
			cartNum: "", //购物车商品数量
			myGoodsNum: 0, //当前商品数量
			cartObj: {}, //购物车数据
			// isLoading:true, //是否正在加载
			shop_id: getQueryString("shop_id"), //店铺id
			shake: false,
			flyData: {
				show: false,
				img: "",
				start: {},
				end: {}
			}, // 飞入动画参数
			payTypeShow: false, // 支付方式选择框是否显示
			payType: "", //支付方式
			isLoadData: true, //是否加载数据
			addressId: 0, //默认地址id
			noStock: false, //是否有库存
			_r: 0,
			_b: 0,
			_toR: 0,
			_toB: 0,
			footerTip: "还差5件商品，享受10元5件优惠",
			wxMiniImg: 'https://fissilestatic.taojiji.com/tenFair/v1_0_0/img/default_bg_share@2x.png',
            shopName: decodeURI(getQueryString("shop_name")),
            user_info: _getUserInfo()
		};
	},
	created() {
        this.getShareImg();
		this.getGoodslist(this.sortType);
		this.setCartData();
		changeTitle(decodeURI(getQueryString("shop_name")));
	},
    mounted(){
        let self = this;
        this.$refs.cartIcon && this.$refs.cartIcon.addEventListener('animationend', function(){
            self.animationEnd();
        })
        //统计埋点
        var data = {
            code: 'TF201',
            query: {
                name: "十元五件集市",
                title1:"店铺"
            },
            extra:{
                param1:getQueryString("shop_id"),
                param2:1
            }
        }
        this.$tapConfig.batchClick(0,data,0)
    },
	methods: {
		//打开购物篮
		openCart() {
			if (this.cartNum == "0/5") {
				this.$msgBox.msgTxt("还没有任何商品，快去添加吧~");
				return;
			}
			this.cartShow = true;
		},
		//规格弹框
		popSku(goodsId) {
			this._r = window.innerWidth - event.clientX;
			this._b = window.innerHeight - event.clientY;
			this._toR = this._r - 10;
			this._toB = this._b - 116;
			this.goodsId = goodsId;
			// this.goodsData=this.list.filter(function (item,index) {
			// 	return item.goodsId==goodsId;
			// })
			if (JSON.stringify(this.cartObj) != "{}") {
				let _num = this.cartObj.num.split(",");
				let _count = 0;
				_count = _num.reduce(function(pre, next) {
					return Number(pre) + Number(next);
				});
				if (_count >= 30) {
					this.$msgBox.msgTxt("购物篮最多能放30件，已经装不下了哦");
					return;
				}
			}
			this.getSku();
        },
        // 获取分享图片
        getShareImg(){
            let params = {shop_id: this.shop_id};
            this.$http.get(shareImg, { params }).then(res => {
                console.log(res.data.data)
                if(res && res.data && res.data.data){
                    this.wxMiniImg = res.data.data;
                }else{

                }
            },err => {
                console.log(err)
            })
        },
		// 提交支付
		submitCart(obj) {
            if(obj&&obj["addressId"]){
                this.addressId = obj.addressId;
            }
            if(!this.addressId){
                this.$msgBox.msgTxt("请至购物车添加收货地址");
                return ;
            }
            if(JSON.stringify(this.cartObj)!="{}"){
                let _num = this.cartObj.num.split(',');
                let _count = 0;
                _count = _num.reduce(function(pre,next) {
                    return Number(pre)+Number(next);
                })
                if(_count==0){
                    this.$msgBox.msgTxt("请先选购商品");
                    return;
                }
            }else{
                this.$msgBox.msgTxt("请先选购商品");
                return
            }
            //统计埋点
            let data = {
                code: 'TF203',
                query: {
                    name: "十元五件集市",
                    title1:"店铺"
                }
            }
            obj?"":this.$tapConfig.batchClick(0,data,0);
			this.payTypeShow = true;
		},
		// 获取当前商品已有数量
		setMyGoodsNum() {
			this.myGoodsNum = 0;
			if (JSON.stringify(this.cartObj) != "{}") {
				let _goods = this.cartObj.goods_id.split(",");
				let _nums = this.cartObj.num.split(",");
				_goods.map((item, index) => {
					if (item == this.goodsId) {
						this.myGoodsNum += Number(_nums[index]);
					}
				});
			}
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
					this.setMyGoodsNum();

					if (this.myGoodsNum >= this.goodsData.buyupnum) {
						//判断是否超出限购数量
						this.$msgBox.msgTxt(`该商品限购${this.goodsData.buyupnum}件`);
					} else {
						if (this.goodsData.spec.length < 2) {
							let _spec = {};
							_spec["img"] = this.goodsData.spec[0].smallImgUrl;
							_spec["id"] = this.goodsData.spec[0].specId;
							// 执行飞入动画
							this.flyAnimate(_spec);
							return;
						}
						this.skuShow = true;
                    }
                    
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
                                    message: "商品详情请求失败",
                                    method: 'get',
                                    code: 200
                                    }
                                })
                        }
                        } catch (error) {
                            
                        }


				} else {
					this.$msgBox.msgTxt(data && data.message ? data.message : "网络失败");
				}
			});
		},
		//排序
		sort(type) {
			this.sortType = type;
			if (type == 2) {
				if (this.type_sales == 1) {
					this.type_sales = 0;
				} else {
					this.type_sales = 1;
				}
			}
			if (type == 3) {
				if (this.type_price == 1) {
					this.type_price = 0;
				} else {
					this.type_price = 1;
				}
            }
            this.list = [];
            this.page = 1;
			this.getGoodslist(this.sortType);
		},
		//获取商品列表
		getGoodslist(type) {
			let params = {};
			if (type == 3) {
				params = {
					page: this.page,
					type_price: this.type_price,
					shop_id: this.shop_id
				};
			} else {
				params = {
					page: this.page,
					type_sales: this.type_sales,
					shop_id: this.shop_id
				};
            }
            if(this.page == 1){
                this.list = [];
            }
			this.$http.get(goodsList, { params }).then(
				res => {
					// console.log(res.data.shopList);
					if (res.data.result == 1) {
                        this.hasData=true;
						if (res.data["goodsList"]) {
                            this.list = this.list.concat(res.data["goodsList"]);
                            console.log(this.list);
						}
                        this.bannerPic = res.data["bannerPic"];
						if (res.data["nextPage"] > 1) {
							this.page = res.data["nextPage"];
						} else {
							return;
                        }
                        
                    // 错误日志上报
                     try {
                           if(errorLogUpload && (this.list.length<=0)){
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


					}
                    this.isLoadData = false;
                    
				},
				err => {}
			);
		},
		loadData() {
			if (!this.isLoadData) {
				this.isLoadData = true;
				this.getGoodslist(this.sortType);
			}
		},
		refresh() {
			console.log("refresh");
			this.page = 1;
			this.list = [];
			this.getGoodslist(this.sortType);
		},
		// 接收选中的skuid
		submitSku(sku) {
			console.log("skuid: " + sku.id);
			//   this.setSkuShow(false);
			//   this.setAddressShow(true);
			this.skuShow = !this.skuShow;
			// this.cartShow = !this.cartShow;
			this.flyAnimate(sku);
		},

		//跳转商品详情
		toGoodsDetail(goods_id) {
			this.$router.push({
				path:
					toGoodsDetail +
					`/shop_id/${this.shop_id}/goods_id/${goods_id}`
			});
		},
        // 飞入动画
        flyAnimate(sku){
            // let _r = window.innerWidth / 2;
            // let _b = window.innerHeight - _r;
            // let _toR = _r - 10;
            // let _toB = _b - 116;
            this.flyData = {
                show: true,
                img: sku.img,
                start: {'right': this._r + 'px','bottom': this._b + 'px'},
                end: {
                        webkitTransform: `translate(${this._toR}px,${this._toB}px) rotateZ(1440deg) scale(0.4)`,
                        transform: `translate(${this._toR}px,${this._toB}px) rotateZ(1440deg) scale(0.4)`
                    },
            };
            fissile_setCart(
                'add',
                {
                    goods_id:this.goodsId,
                    spec_id:sku.id,
                    num: 1,
                    goods_checked: 1//购物车商品是否选中
                },
                {
                    "project":"tenFair",
                    "shopId":this.shop_id,
                }
            )
            this.shake = true;
            this.setCartData();
        },
        //  设置购物车数据
        setCartData(){
            let userCart = fissile_getCart();
            if(Object.keys(userCart).length > 0 && userCart['tenFair'] && userCart['tenFair'][this.shop_id] ){
                this.cartObj = userCart['tenFair'][this.shop_id];
            }
            this.setCartNum();
        },
         // 监听css3动画
        animationEnd(){
            this.shake = false;
        },
         // 设置购物车数量
        setCartNum(){
            if(this.cartObj.goods_id && this.cartObj.num){
                let _num = this.cartObj.num.split(',');
                let _count = 0;
                _count = _num.reduce(function(pre,next) {
                    return Number(pre)+Number(next);
                })
                if(_count % 5 == 0){
                    this.cartNum = _count + '/' + _count;
                    this.footerTip = '已选'+_count+'件商品，去支付 ¥'+_count*2;
                }else{
                    this.cartNum = _count + '/' + (Math.floor(_count / 5) + 1) * 5;
                    this.footerTip = '还差'+(5 - _count % 5)+'件商品，享受'+(Math.floor(_count / 5) + 1) * 10+'元'+(Math.floor(_count / 5) + 1) * 5+'件优惠';
                }
            }else{
                this.cartNum = '0/5';
                this.footerTip= '还差5件商品，享受10元5件优惠';
            }
        },
        //分享
        shareFn(){
            let url = 'https://'+ location.host+'/tenFair/view/'+process.env.VERSION +'/shopDetail/shop_id/'+ this.shop_id;
            shareToWxMini({
                content: '我花10元就买到了5件商品。太划算了，快去看看！',
                title: '我花10元就买到了5件商品。太划算了，快去看看！',
                wxMiniPath: '/pages/activity/ten/shop/shop?shopId='+this.shop_id + '&shopName='+this.shopName,
                shareUrl: url,
                imgUrl: this.wxMiniImg,
                isMiniFn: () => {
                    this.$msgBox.msgTxt('请使用自带的分享功能哦～');
                }
            })
             //统计埋点
            var data = {
                code: 'TF202',
                query: {
                    name: "十元五件集市",
                    title1:"店铺"
                }
                
            }
            this.$tapConfig.batchClick(0,data,0)
        },
        // 我的支付方式
        myPayType(id){
            console.log('支付方式:'+id);
            this.payType = id;
            this.createOrder();
        },
        // 创建订单
        createOrder(){
            this.payTypeShow = false;
            let self = this;
            let token = this.user_info.token,
                uuid = this.user_info.uuid,
                os = getQueryString('os'),
                cartObj = this.cartObj;
            let params = {
                token: token,
                uuid: uuid,
                addressId: this.addressId,
                goodsId: cartObj.goods_id,
                specId: cartObj.spec_id,
                num: cartObj.num,
                check: cartObj.goods_checked,
                paymentId: this.payType,
                os: os,
                is_post: 1,
            }
            this.$http.get(orderAdd, {params}).then(res => {
                let data = res.data;
                // console.log(data);
                if(data.status == 1){
                    // 删除已创建订单的商品
                    let spec_ids = cartObj.spec_id.split(',');
                    spec_ids.map(function(item){
                        fissile_setCart(
                            'delete',
                            {
                                spec_id:item,
                            },
                            {
                                "project":"tenFair",
                                "shopId":self.shop_id,
                            }
                        );
                    })
                    this.setCartData();
                    this.cartShow = false;
                    userAppPay({
                        orderNo: data.data.orderNo,
                        goodsName: data.data.orderName,
                        payType: this.payType,
                        price: data.data.payAmount,
                    });
                 
                     eventTrack({
                            funType: 'h5'   ,
                            pageName: 'pay_tenpage',
                            elementId: 'pay',
                            eventType:'tap',
                            goodsId: cartObj.goods_id,
                            orderNo:data.data.orderNo
                        })
                    // 错误日志上报
                     try {
                           if(errorLogUpload && !data.data.orderNo){
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
                    this.$msgBox.msgTxt(((data && data.message) ? data.message : '网络失败'));
                }
            })
        },
        //刚进页面获取默认地址id
        //返回默认地址id
        getAddressId(params){
            this.addressId=params["addressId"];
        }
  },
  components: {
    // betterScroll,
    skuCheck,
    cartBasket,
    flyInAnimate,
    payTypeBox,
    pullUpBox
  },
  computed: {
      
  },
};
</script>

<style scoped lang="scss">
.shop {
	opacity: 0;
	&.hasData {
		opacity: 1;
	}
	// .wrapper {
	// 	height: 100%;
	// 	overflow-y: auto;
	// 	-webkit-overflow-scrolling: touch;
	// }
	.banner {
		width: 100%;
		img {
			width: 100%;
		}
	}
	.sortType {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 15px;
		color: #333333;
		letter-spacing: 0;
		text-align: center;
		margin-bottom: 10px;
		div {
			height: 44px;
			line-height: 44px;
			flex: 1;
			img {
				width: 8px;
			}
		}
		.active {
			color: #ff6632;
			.sort_line {
				width: 30px;
				height: 2px;
				margin: 0 auto;
				border-bottom: 2px solid #ff6632;
			}
		}
	}
	.goods_container {
		padding: 0 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding-bottom: 48px;
		.good {
			width: 112px;
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
	footer {
		background-image: linear-gradient(-90deg, #f53917 0%, #ff8232 100%);
		font-size: 18px;
		color: #ffffff;
		width: 100%;
		height: 48px;
		line-height: 48px;
		text-align: center;
		position: fixed;
		bottom: 0;
	}
	.share {
		width: 66px;
		height: 66px;
		position: fixed;
		right: 10px;
		bottom: 188px;
		img {
			width: 100%;
		}
	}
	.cartIcon {
		width: 66px;
		height: 66px;
		position: fixed;
		bottom: 116px;
		right: 10px;
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
