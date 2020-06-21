/* 
**调用prompt组件时需注意： 父组件传入的参数名必须为promptObj 
*/
<style lang="scss" scoped>
.prompt {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 998;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	-webkit-transition: opacity 0.2s;
	transition: opacity 0.2s;
	opacity: 0;
	visibility: hidden;
	&.prompt-show {
		opacity: 1;
		visibility: visible;
		.promptCont {
			-webkit-transform: translate(-50%, -50%) scale(1, 1);
			transform: translate(-50%, -50%) scale(1, 1);
		}
	}
	.promptCont {
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%) scale(0, 0);
		transform: translate(-50%, -50%) scale(0, 0);
		transform-origin: center center;
		-webkit-transition: transform 0.2s;
		transition: transform 0.2s;
		width: pxTorem(310px);
		background-color: #fff;
		border-radius: pxTorem(10px);
		.ptmTitle {
			margin-top: pxTorem(22px);
			font-size: pxTorem(16px);
			line-height: pxTorem(22px);
			color: #333333;
			text-align: center;
		}
		.tittleImg {
			margin-top: pxTorem(13px);
			img {
				display: block;
				width: pxTorem(66px);
				height: pxTorem(66px);
				margin: 0 auto;
				border-radius: 50%;
			}
		}
		.ptmTxt {
			width: pxTorem(271px);
			margin: pxTorem(18px) auto;
			font-size: pxTorem(14px);
			line-height: pxTorem(19px);
			color: #333333;
			text-align: center;
			&.noTitle {
				margin: pxTorem(31px) auto;
			}
		}
		.ptmBtns {
			border-top: 1px solid #e1e1e1;
			width: 100%;
			height: pxTorem(45px);
			-webkit-display: flex;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
			div {
				-webkit-flex: 1;
				flex: 1;
				height: pxTorem(32px);
				font-size: pxTorem(16px);
				line-height: pxTorem(32px);
				color: #333333;
				text-align: center;
				border-right: 1px solid #e1e1e1;
				&:last-child {
					border-right: 0;
				}
				&.ptmSub {
					color: #ff6632;
				}
			}
		}
	}
}
</style>

<template>
	<div :class="['prompt', promptObj.show ? 'prompt-show' : '']">
		<div class="promptCont">
			<div class="ptmTitle" v-show="promptObj.tittle">{{promptObj.tittle}}</div>
			<div class="tittleImg" v-show="promptObj.tittleImg">
				<img v-lazy="promptObj.tittleImg" alt>
			</div>
			<div
				:class="['ptmTxt', !promptObj.tittle && !promptObj.tittleImg ? 'noTitle' : '']"
			>{{promptObj.ptmTxt}}</div>
			<div class="ptmBtns">
				<div @click.stop="cancel()">{{promptObj.btns && promptObj.btns[0] ? promptObj.btns[0] : '取消'}}</div>
				<div
					class="ptmSub"
					@click.stop="success()"
				>{{promptObj.btns && promptObj.btns[1] ? promptObj.btns[1] : '确认'}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import {_disScroll} from "@/assets/js/common/utils.js";
// import { mapGetters, mapMutations } from 'vuex'
export default {
	name: "prompt",
	data() {
		return {
			pShow: false
		};
	},
	props: {
        promptObj: Object ,// 父组件传入的参数名必须为promptObj
        goodsData:Object,
        spec_id:[Number, String]
    },
    watch: {
        promptObj(){
            _disScroll(this.promptObj.show);
        }
    },
	computed: {},
	created() {
		// console.log(this.promptObj)
	},
	methods: {
		initPtm() {},
		cancel() {
			this.$parent.promptObj.show = false;
			typeof this.$parent.promptObj.cancel == "function"
				? this.$parent.promptObj.cancel()
				: "";
		},
		success() {
              eventTrack( {
                    funType: 'h5',
                    pageName: 'confirm',
                    elementId: 'yes',
                    eventType:'tap',
                    activityTitle:'限时抢购',
                    goodsId:this.goodsData.goodsId,
                    goodsName:this.goodsData.goodsName,
                    skuId:this.spec_id
             })
            
			this.$parent.promptObj.show = false;
			typeof this.$parent.promptObj.success == "function"
				? this.$parent.promptObj.success()
				: "";
		}
	}
};
</script>