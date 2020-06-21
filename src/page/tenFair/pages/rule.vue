<template>
	<div :class="['rule', ruleShow ? 'rule-show' : '']" @click.self.stop="closeRule()">
		<div class="rule-cont">
			<div class="r-c-close" @click.stop="closeRule()">
				<img src="@/assets/images/common/close@3x.png" alt>
			</div>
			<div class="r-c-title">十元五件集市规则</div>
			<div class="r-c-con">
				<p>1、用户可以随意选择一家
					<span class="red">10元5件</span>集市中的店铺，在店铺挑选
					<span class="red">5件</span>商品，即可享受
					<span class="red">10元</span>包邮到家的优惠。
				</p>
				<p>2、必须为同一家店铺的
					<span class="red">5件</span>商品，不支持跨店选择。如选择的商品不足
					<span class="red">5件</span>，会按照每件商品的价格单独计算订单金额。
				</p>
				<p>3、订单支付后可前往我的订单查看物流详情。</p>
				<p>4、
					<span class="red">10元5件</span>订单，在商品发货前取消单件商品会导致此订单全部取消。
				</p>
				<p>5、对物流、商品有疑问或者需要修改收货地址，请联系客服处理。</p>
			</div>
		</div>
	</div>
</template>

<script >
export default {
	name: "tenFairRule",
	data() {
		return {};
	},
	props: {
		ruleShow: {
			type: Boolean,
			default: false
		}
	},
	created() {},
	methods: {
		closeRule() {
			this.$parent.ruleShow1 = false;
		}
	},
	components: {}
};
</script>

<style scoped lang="scss">
.rule {
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	-webkit-transition: opacity 0.2s;
	transition: opacity 0.2s;
	opacity: 0;
	visibility: hidden;
	&.rule-show {
		opacity: 1;
		visibility: visible;
		z-index: 998;
		.rule-cont {
			-webkit-transform: translate(-50%, -50%) scale(1, 1);
			transform: translate(-50%, -50%) scale(1, 1);
		}
	}
	.rule-cont {
		width: pxTorem(309px);
		padding: pxTorem(30px) pxTorem(24px);
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%) scale(0, 0);
		transform: translate(-50%, -50%) scale(0, 0);
		-webkit-transition: all 0.2s;
		transition: all 0.2s;
		border-radius: pxTorem(6px);
		background-color: #fff;
		.r-c-close {
			position: absolute;
			right: pxTorem(20px);
			top: -pxTorem(38px);
			width: pxTorem(25px);
			height: pxTorem(25px);
			img {
				width: 100%;
				height: 100%;
			}
			&::after {
				content: "";
				display: block;
				position: absolute;
				border-left: 1px solid #ffffff;
				width: 1px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				height: 13px;
				left: 0;
				right: 0;
				margin: auto;
				bottom: -13px;
			}
		}
		.r-c-title {
			margin-top: pxTorem(12px);
			font-size: pxTorem(18px);
			line-height: pxTorem(28px);
			text-align: center;
			color: #191919;
			font-weight: 600;
		}
		.r-c-con {
			font-size: 14px;
			color: #666666;
			p {
				line-height: 20px;
				margin-top: 20px;
				text-align: left;
				.red {
					color: #ee0000;
                    font-weight: bold;
				}
			}
		}
	}
}
</style>
