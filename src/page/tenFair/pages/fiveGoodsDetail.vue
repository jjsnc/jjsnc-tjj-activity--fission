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
                    <div class="now-price"  v-if="goodsData.price">
                        <span class="icon">¥</span><span v-if="goodsData.price.indexOf('.')>-1">{{String(goodsData.price).substr(0,goodsData.price.indexOf('.'))}}</span><span v-else>{{goodsData.price}}</span><span class="small-number" v-if="goodsData.price" v-show="goodsData.price.indexOf('.')>-1" >{{String(goodsData.price).substr(goodsData.price.indexOf('.'))}}</span>
                    </div>
                    <div class="old-price">¥{{goodsData.shopPrice}}</div>
                    <!-- <div class="postage">包邮</div> -->
                    <div class="need-people">{{goodsData.groupCount}}</div>
                    <!-- <div v-if="goodsData.activityDate" class="sale-num">
                        {{goodsData.buyButtonTextTo}} x2 <small>{{goodsData.activityDate}}</small>
                    </div>
                    <div v-else class="sale-num">
                        {{goodsData.buyButtonTextTo}}
                    </div>-->
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
            <!-- 三包服务 -->
            <div class="ensure">
                <div class="ensure_logo">
                    <img v-lazy="goodsData.payImage" />
                </div>
            </div>
            <!-- 商品大图 -->
            <div class="goods_img">
                <div v-for="(item, index) in goodsData.image" :key="index">
                    <img v-lazy="item.img640url" alt style="opacity: 1;">
                </div>
            </div>
        </div>
		<!-- 底部按钮 -->
		<footer>
			<div class="footer-tip" v-html="footerTip"></div>
			<div>
				<div class="back-shop" @click.self="backShop">返回店铺</div>
				<div :class="['add-goods',noStock ? 'noStock' : '']" @click.self="addToCart">加入购物篮</div>
			</div>
		</footer>
		<!-- 购物篮icon -->
		<div :class="[shake ? 'shake' : '' , 'cartIcon']" @click="openCart" ref="cartIcon">
			<img src="../assets/images/icon_basket copy@2x.png" alt>
			<p>{{cartNum}}</p>
		</div>
		<skuCheck :data="goodsData" @submitSku="submitSku" :skuShow="skuShow"></skuCheck>
		<cartBasket
			:data="cartObj"
			@submitCart="submitCart"
			@toPay="toPay"
			@changeCart="setCartData"
			:cartShow="cartShow"
            act_type='1'
		></cartBasket>
		<flyInAnimate :flyData="flyData"></flyInAnimate>
		<payTypeBox :show="payTypeShow" @myPayType="myPayType"></payTypeBox>
	</div>
</template>

<script >
import { toHome } from "./../assets/js/url.js";
import {
	getQueryString,
	userAppPay,
	fissile_setCart,
    fissile_getCart,
    _getUserInfo,
    check_login
} from "@/assets/js/common/utils.js";
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import Target from '@/assets/js/common/shence';
import { goodsDetail, orderAdd, danmuList, secondGoodsDetail } from "./../assets/js/api.js";
import banner from "@/components/swiper";
import skuCheck from "@/components/skuCheck";
import cartBasket from "@/components/cartBasket";
import flyInAnimate from "@/components/flyInAnimate";
import payTypeBox from "@/components/payType";
import topDanmu from "@/components/topDanmu";

export default {
    name: "fiveGoodsDetail",
    components: {
        banner,
        cartBasket,
        skuCheck,
        flyInAnimate,
        topDanmu,
        payTypeBox
    },
    data() {
        return {
            haveData: false,
            banners: [],
            userId: _getUserInfo().user_id,
            shopId: getQueryString('shop_id'),
            goodsId: getQueryString('goods_id'),
            goodsData: {}, //一级商品详情数据
            secondGoodsData: {}, //二级商品详情数据
            skuShow:false, //规格选择框是否显示
            cartShow:false, //购物篮是否显示
            mySpecId: '', // 我的规格id
            cartObj:{}, //购物车数据
            cartNum: '', //购物车商品数量
            addressId: '', // 当前地址
            danmuData:[],//弹幕数据
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
            footerTip: '还差<span>5件</span>商品，<span>10元</span>带回家',
            allCount: 0, //购物篮总件数
            noStock: false,
        };
    },
    created() {
        this.getData();
        this.setCartData();
        this.getDanmuData();
    },
    methods: {
        // 获取当前商品已有数量
        setMyGoodsNum(){
            this.myGoodsNum = 0;
            if(Object.keys(this.cartObj).length < 1) return;
            let _goods = this.cartObj.goods_id.split(',');
            let _nums = this.cartObj.num.split(',');
            _goods.map((item,index) => {
                if(item == this.goodsId){
                    this.myGoodsNum += Number(_nums[index]);
                }
            })
        },
        //  设置购物车数据
        setCartData(){
            let userCart = fissile_getCart();
            if(Object.keys(userCart).length > 0 && userCart['tenFair'] && userCart['tenFair'][this.shopId] ){
                this.cartObj = userCart['tenFair'][this.shopId];
            }
            this.setCartNum();
            this.setMyGoodsNum();
        },
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
                    this.shence.commodityDetailTrack({
                        goodsDetailType:'活动商祥页_10元5件',
                        refer:'活动页十元五件',
                        commodityID: this.goodsData.goodsId,
                        commodityName: this.goodsData.name,
                        firstCommodity: "",
                        secondCommodity: "",
                        commodityNumber:'1',
                        pricePerCommodity: this.goodsData.groupPrice,
                        storeID:'',
                        storeName: '',
                    })
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
                                message: "商品信息失败",
                                method: 'get',
                                code: 200
                                }
                            })
                    }
                    } catch (error) {
                        
                    }


                    // 新的埋点
                   eventTrack({
                     funType: 'h5'   ,
                     pageName: 'good_detail',
                     elementId: 'pv',
                     eventType:'view',
                     goodsId: this.goodsData.goodsId,
                     goodsName:this.goodsData.name,
                     actType:'1',
                     firstPage:'ten_page'
                    })
                }else{
                    this.$msgBox.msgTxt((data && data.message) ? data.message : '网络失败');
                }
            })
        },
        // 获取二级商品详情信息
        getSecondData(){
            const params = {
                goods_id: this.goodsId,
                supplier_id: this.goodsData.supplierId,
                state: this.goodsData.state,
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
                                message: "二级商品列表失败",
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
            let params={
                type:1
            }
            this.$http.get(danmuList,{params}).then(res=>{
                console.log(res.data.shopList)
                if(res.data.result==1){
                    this.danmuData=res.data.items;
                }
            },err=>{})
        },
        // 设置购物车数量
        setCartNum(){
            if(this.cartObj.goods_id && this.cartObj.num){
                let _num = this.cartObj.num.split(',');
                let _count = 0;
                _num.map((item) => {
                    _count += Number(item);
                })
                this.allCount = _count;
                if(_count % 5 == 0){
                    this.cartNum = _count + '/' + _count;
                    this.footerTip = '已选'+'<span>'+_count+'件'+'</span>'+'商品，去支付 ¥'+'<span>'+_count*2+'</span>';
                }else{
                    this.cartNum = _count + '/' + (Math.floor(_count / 5) + 1) * 5;
                    this.footerTip = '还差'+'<span>'+(5 - _count % 5)+"件"+'</span>'+'商品，'+'<span>'+(Math.floor(_count / 5) + 1) * 10+'元'+'</span>'+
                    // (Math.floor(_count / 5) + 1) * 5+
                    '带回家';
                }
            }else{
                this.cartNum = '0/5';
                this.footerTip= '还差<span>5件</span>商品，<span>10元</span>带回家';
            }
        },
        // 返回店铺操作
        backShop(){
            //  this.$router.replace(`${toHome}`);
            history.back();
        },
        // 加入购物篮
        addToCart(){
        if (!check_login()) return;
           eventTrack({
                funType: 'h5'   ,
                pageName: 'good_detail',
                elementId: 'cart',
                eventType:'tap',
                goodsId: this.goodsData.goodsId,
                goodsName:this.goodsData.name,
                actType:'1',
                firstPage:'ten_page'
            }) 
             this.shence.addToShoppingcartTrack({
                commodityID: this.goodsData.goodsId,
                commodityName: this.goodsData.name,
                firstCommodity: "",
                secondCommodity: "",
                pricePerCommodity: this.goodsData.groupPrice,
                commodityNumber:'1',
                refer: '活动页十元五件',
                currentPage: '活动商祥页_10元5件',
            })
            if(this.noStock){
                this.$msgBox.msgTxt( '该商品没有库存或已下架');
                return;
            }
            if(this.myGoodsNum >= this.goodsData.buyupnum){
                this.$msgBox.msgTxt('该商品最多可购买'+this.goodsData.buyupnum+'件');
                return;
            }
            if(this.allCount>=30){
                this.$msgBox.msgTxt("购物篮最多能放30件，已经装不下了哦");
                return ;
            }
            //统计埋点
            let data = {
                code: 'TF204',
                query: {
                    name: "十元五件商品详情页",
                }
            }
            this.$tapConfig.batchClick(0,data,0)
            if(this.goodsData.spec.length < 2){
                let _spec = this.goodsData.spec[0];
                this.mySpecId = _spec.specId;
                // 执行飞入动画
                this.flyAnimate(_spec.smallImgUrl);
                return;
            }
            this.popSku();
        },
        //打开购物篮
        openCart(){
            if (!check_login()) return;
            if(this.cartNum == '0/5'){
                this.$msgBox.msgTxt('还没有任何商品，快去添加吧~');
                return;
            }
            this.cartShow=true;
        },  
        //规格弹框
        popSku(){
            this.skuShow=!this.skuShow;
        },  
        // 接收选中的skuid
        submitSku(obj) {
            console.log("skuid: " + obj.id);
            this.mySpecId = obj.id;
            this.skuShow=!this.skuShow;
            // 执行飞入动画
            this.flyAnimate(obj.img);
            
        },
        // 飞入动画
        flyAnimate(img){
            let _r = window.innerWidth / 2;
            let _b = window.innerHeight - _r;
            let _toR = _r - 10;
            let _toB = _b - 116;
            this.flyData = {
                show: true,
                img: img,
                start: {'right': _r + 'px','bottom': _b + 'px'},
                end: {
                        webkitTransform: `translate(${_toR}px,${_toB}px) rotateZ(1440deg) scale(0.4)`,
                        transform: `translate(${_toR}px,${_toB}px) rotateZ(1440deg) scale(0.4)`
                    },
            };
            fissile_setCart(
                'add',
                {
                    goods_id:this.goodsId,
                    spec_id:this.mySpecId,
                    num: 1,
                    goods_checked: 1//购物车商品是否选中
                },
                {
                    "project":"tenFair",
                    "shopId":this.shopId,
                }
            )
            this.shake = true;
            this.setCartData();
        },
        // 监听css3动画
        animationEnd(){
            this.shake = false;
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
        // 去支付
        toPay(obj){
            this.payTypeShow = true;
            this.addressId = obj.addressId;
        },
        // 创建订单
        createOrder(){
            this.payTypeShow = false;
            let self = this;
            let os = getQueryString('os'),
                cartObj = this.cartObj;
            let params = {
                activities: 'tenFive',
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
                console.log(data);
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
                                "shopId":self.shopId,
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
                            orderNo:data.data.orderNo,
                            actType:'1',
                            firstPage:'ten_page'
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
        }
    },
    mounted(){
        let self = this;
        this.$refs.cartIcon && this.$refs.cartIcon.addEventListener('animationend', function(){
            self.animationEnd();
        })
        // document.getElementsByClassName('goodsDetail')[0].addEventListener('scroll',function(){
        //     console.log(this.scrollTop,this.scrollHeight)
        // })
           this.shence = new Target({
            "dom":"",
            "productDom":"",
            "data":"",
        });
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
        padding-bottom: 80.5px;
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
                .small-number{
                    font-size: 23px;
                }
                .icon{
                    font-size: 20px;
                }
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
				background-color: #ccc;
			}
		}
	}
	.cartIcon {
		width: 66px;
		height: 66px;
		position: fixed;
		bottom: 116px;
		right: 10px;
		z-index: 66;
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


<style scoped >
 .footer-tip>>>span{
        font-weight: bold;
   }
</style>
