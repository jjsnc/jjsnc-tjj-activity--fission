<style lang="scss" scoped>
.pay-type {
	.pay-item {
		position: relative;
		width: 100%;
		padding: 1rem;
		color: #666;
		font-size: 0.88rem;
		border-bottom: 1px solid #eee;

		&:after {
			display: none;
			content: "";
			position: absolute;
			top: 50%;
			right: 1.25rem;
			width: 1rem;
			height: 1rem;
			margin-top: -0.5rem;
			// background: url(./../../images/One/icon-selected.png) no-repeat center center;
			background-size: contain;
		}

		&.act:after {
			display: inline-block;
		}

		&:last-child {
			border: none;
		}
		img {
			width: 1.25rem;
			margin-right: 1.25rem;
		}
	}
}
</style>

<template>
	<slideUpBox :show="show" @changeBoxShow="changeBoxShow">
		<div class="pay-type">
			<div class="pay-item" @click.self="myPayType(3)" v-if="payChoose==0||payChoose==3">
				<img src="@/assets/images/common/icon_weixin@2x.png">微信支付
			</div>
			<div class="pay-item" @click.self="myPayType(1)" v-if="payChoose==0||payChoose==1">
				<img src="@/assets/images/common/icon_aliy@2x.png">支付宝支付
			</div>
		</div>
	</slideUpBox>
</template>

<script>
import slideUpBox from "@/components/slideUpBox";
export default {
	name: "payType",
	components: {
		slideUpBox
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		payChoose: {
			type: Number,
			default: 0
		}
	},
	methods: {
		changeBoxShow(bool) {
			console.log(bool);
			this.$parent.payTypeShow = bool;
		},
		myPayType(id) {
			this.$emit("myPayType", id);
		}
	}
};
</script>