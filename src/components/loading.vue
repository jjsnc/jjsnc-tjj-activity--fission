<template>
	<transition>
		<div class="loading-wrap" v-show="isShow">
			<div class="loading">
				<Loading class="loading-bar" color="white"/>
				<span class="text">加载中...</span>
			</div>
		</div>
	</transition>
</template>
<script>
import { Loading   } from 'vant';
export default {
    name: "loading",
    components: {
        Loading
    },
	data() {
		return {
			isShow: false
		};
	},

	created() {},
	methods: {
		show() {
			this.isShow = true;
		},
		hide() {
			const self = this;
			setTimeout(() => {
				self.isShow = false;
			}, 2000);
		}
	}
};
</script>
<style lang="scss" scoped>
.loading-wrap {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 96px;
		height: 96px;
		padding: 15px;
		background: rgba(0, 0, 0, 0.7);
		transform: translate3d(-50%, -50%, 0);
		border-radius: 5px;
		text-align: center;

		.text {
			position: absolute;
			left: 0;
			bottom: 15px;
			width: 100%;
			text-align: center;
			font-size: 12px;
			color: #eee;
		}

		.loading-bar {
			width: 40px;
			height: 40px;
			margin: 0 auto;
		}
	}
}
</style>
