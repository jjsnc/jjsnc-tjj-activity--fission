<style lang="scss" scoped>
.flyInAnimate {
	position: fixed;
	width: 50px;
	height: 50px;
	z-index: 2;
	-webkit-transform: translate(0, 0) rotateZ(0) scale(1);
	transform: translate(0, 0) rotateZ(0) scale(1);
	border-radius: 50%;
	overflow: hidden;
	&.flyTransition {
		-webkit-transition: all 1s;
		transition: all 1s;
		// transform: rotateZ(1440deg) scale(0.4);
		// transform: rotateZ(1440deg) scale(0.4);
	}
	.fly-img {
		width: 100%;
		height: 100%;
	}
}
</style>

<template>
	<div
		:class="[flyData.show ? '' : 'flyTransition' , 'flyInAnimate']"
		:style="[Object.assign(flyData.start,{opacity:1}),flyData.show ? '' : Object.assign(flyData.end,{opacity:0})]"
	>
		<img v-if="flyData.img" class="fly-img" :src="flyData.img ? flyData.img : ''" alt>
	</div>
</template>

<script>
export default {
	name: "flyInAnimate",
	props: {
		flyData: {
			type: Object,
			default: {
				show: false,
				img: "",
				start: {},
				end: {}
			}
		}
	},
	data() {
		return {};
	},
	watch: {
		flyData() {
			let self = this;
			if (self.flyData.show) {
				// setTimeout(() => {
				self.flying();
				// },30)
			}
			this.$forceUpdate();
		}
	},
	created() {
		this.$forceUpdate();
	},
	methods: {
		flying() {
			let self = this;
			self.$forceUpdate();
			setTimeout(() => {
				self.$parent.flyData.show = false;
				self.$forceUpdate();
			}, 30);
		}
	}
};
</script>