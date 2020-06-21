
/* 
** 调用tost组件时需注意： 父组件传入的参数名必须为msgTxt 
*/

<style lang="scss" scoped>
.msgBox {
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 999;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	-webkit-transition: all 0.2s;
	transition: all 0.2s;
	visibility: hidden;
	opacity: 0;
	// min-width: 40%;
    min-width: 210px;
	max-width: 70%;
	padding: 8px 16px;
	background: #333333;
	color: #fff;
	text-align: center;
	font-size: 14px;
	line-height: 20px;
	border-radius: 13px;
}
.msgBox.msgBox_show {

	visibility: visible;
	opacity: 1;
}
</style>


<template>
	<div :class="['msgBox', msgShow ? 'msgBox_show' : '']">{{msgTxt}}</div>
</template>

<script>
export default {
	data() {
		return {
			msgShow: false,
			hideTimer: "",
			initTimer: ""
		};
	},
	props: {
		msgTxt: String // 父组件传入的参数名必须为msgTxt
	},
	computed: {},
	watch: {
		msgTxt() {
			this.msgShowFn();
		},
		msgShow() {
			if (!this.msgShow) {
				this.initTimer = setTimeout(() => {
					// 父组件传入的参数名必须为msgTxt
					this.$parent && this.$parent.msgTxt ? this.$parent.msgTxt = "" : "";
				}, 200);
			}
		}
	},
	created() {
		this.msgShowFn();
	},
	methods: {
		msgShowFn() {
			if (this.msgTxt) {
				this.msgShow = true;
				clearTimeout(this.hideTimer);
				clearTimeout(this.initTimer);
				this.hideTimer = setTimeout(() => {
					// 父组件传入的参数名必须为msgTxt
					// this.$parent.msgTxt = '';
					this.msgShow = false;
				}, 2000);
			}
			// else{
			//     this.msgShow = false;
			// }
		}
	}
};
</script>