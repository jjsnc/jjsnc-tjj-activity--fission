<style lang="scss" scoped>
.newAddress {
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
	&.newAddress-show {
		opacity: 1;
		visibility: visible;
		.addr-cont {
			-webkit-transform: translate(-50%, -50%) scale(1, 1);
			transform: translate(-50%, -50%) scale(1, 1);
		}
	}
	.addr-cont {
		width: pxTorem(329px);
		padding: pxTorem(20px) pxTorem(13px);
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%) scale(0, 0);
		transform: translate(-50%, -50%) scale(0, 0);
		-webkit-transition: all 0.2s;
		transition: all 0.2s;
		border-radius: pxTorem(6px);
		background-color: #fff;
		.a-c-close {
			position: absolute;
			right: pxTorem(20px);
			top: pxTorem(16px);
			width: pxTorem(19.9px);
			height: pxTorem(19.9px);
			padding: pxTorem(4px);
			img {
				width: 100%;
				height: 100%;
			}
		}
		.a-c-title {
			margin-top: pxTorem(12px);
			font-size: pxTorem(20px);
			line-height: pxTorem(28px);
			text-align: center;
			color: #191919;
			font-weight: 600;
		}
		input::-webkit-input-placeholder {
			color: #9b9b9b;
		}
		.a-c-input {
			height: pxTorem(31px);
			margin-top: pxTorem(22px);
			border-bottom: pxTorem(1px) solid #d8d8d8;
			display: -webkit-flex;
			display: flex;
			div {
				-webkit-flex: 1;
				flex: 1;
				height: pxTorem(21px);
				float: left;
				&:last-child {
					border-left: pxTorem(1px) solid #d8d8d8;
					padding-left: pxTorem(13px);
				}
				input {
					width: 100%;
					height: pxTorem(21px);
					border: 0;
					font-size: pxTorem(15px);
					line-height: pxTorem(21px);
				}
			}
		}
		.a-c-area {
			padding: pxTorem(13.9px) 0 pxTorem(13.9px);
			font-size: pxTorem(15px);
			line-height: pxTorem(21px);
			border-bottom: pxTorem(1px) solid #d8d8d8;
			img {
				width: pxTorem(6px);
				height: pxTorem(12px);
				float: right;
			}
		}
		.a-c-addrDetail {
			width: 100%;
			height: pxTorem(21px);
			margin-top: pxTorem(32px);
			// padding-right: 1.94rem;
			border: 0;
			resize: none;
			font-size: pxTorem(15px);
			line-height: pxTorem(21px);
			vertical-align: middle;
		}
		.a-c-btn-box {
			margin-top: pxTorem(32px);
			padding-top: pxTorem(20px);
			border-top: pxTorem(1px) solid #d8d8d8;
			.a-c-btn {
				width: 100%;
				height: pxTorem(44px);
				background: -webkit-linear-gradient(
					-132deg,
					#ed1400 0%,
					#ff6632 90%
				);
				background: linear-gradient(-132deg, #ed1400 0%, #ff6632 90%);
				font-size: pxTorem(17px);
				line-height: pxTorem(44px);
				text-align: center;
				color: #fff;
				border-radius: pxTorem(6px);
			}
		}
	}
}
</style>

<template>
	<div :class="['newAddress', newAddrShow ? 'newAddress-show' : '']" @click.self="closeNewAddr()" ref="newAddress">
		<div class="addr-cont" v-show="!citySelectShow">
			<div class="a-c-close" @click.stop="closeNewAddr()">
				<img src="@/assets/images/common/icon_close@2x.png" alt>
			</div>
			<div class="a-c-title">添加新收货地址</div>
			<div class="a-c-input">
				<div class="a-c-name">
					<input type="text" placeholder="姓名" v-model="userName">
				</div>
				<div class="a-c-tel">
					<input type="tel" placeholder="电话" v-model="userTel">
				</div>
			</div>
			<div class="a-c-area" @click.stop="openCitySelect()">
				{{userCitysTxt}}
				<img src="@/assets/images/common/icon_more@2x.png" alt>
			</div>
			<input class="a-c-addrDetail" type="text" placeholder="详细地址（如街道、小区、乡镇、村）" v-model="userDescAddr">
			<div class="a-c-btn-box">
				<div class="a-c-btn" @click.stop="creatAddr()">保存</div>
			</div>
		</div>
		<citySelect @citySelectSuccess="citySelectSuccess" :citySelectShow="citySelectShow"></citySelect>
		<msgBox :msgTxt="msgTxt"></msgBox>
	</div>
</template>


<script>
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import { _getUserInfo, _inputS, _disScroll } from "@/assets/js/common/utils.js";
// import { addAddress } from "@/page/tenFair/assets/js/api.js";
import { addAddress } from "@/assets/js/common/commonApi.js";
import citySelect from "@/components/citySelect";
import msgBox from "@/components/msgBox";
export default {
	name: "newAddress",
	data() {
		return {
			userName: "",
			userTel: "",
			userCitysIds: [],
			userCitysTxt: "选择地区",
			userDescAddr: "",
			msgTxt: "",
            citySelectShow: false,
            _height: 0
		};
	},
	props: {
		newAddrShow: {
			type: Boolean,
			default: false
        },
        goodSData:{
         type:Object,
         default:{}
        },
        spec_id:[Number, String]
	},
	components: {
		citySelect,
		msgBox
    },
    watch: {
        newAddrShow(){
            _disScroll(this.newAddrShow);
        },
        // citySelectShow(){
        //     _disScroll(this.citySelectShow);
        // }
    },
	computed: {
	},
	methods: {
		closeNewAddr() {

			this.$parent.newAddrShow = false;
		},
		// 打开选择地址控件
		openCitySelect() {
            // this.isStopPrev(false);
			this.citySelectShow = true;
        },
		// 接受地址选择完成返回结果
		citySelectSuccess(obj) {
			console.log(obj.ids, obj.names);
			this.userCitysIds = obj.ids;
			this.userCitysTxt =
				obj.names[0] + " " + obj.names[1] + " " + obj.names[2];
		},
		// 保存新增地址
		creatAddr() {
            let self = this; 
                eventTrack( {
                    funType: 'h5',
                    pageName: 'new_add',
                    elementId: 'save',
                    eventType:'tap',
                    activityTitle:'限时抢购',
                    goodsId:this.goodSData.goodsId,
                    goodsName:this.goodSData.goodsName,
                    skuId:this.spec_id
             })
			let user_id = _getUserInfo().user_id;
			if (!this.userName) {
				this.msgTxt = "请填写姓名";
			} else if (
				!this.userTel ||
				!/^((13[0-9])|(14[5|7|9])|(15([0-9]))|(16[5|6])|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/.test(
					this.userTel
				)
			) {
				this.msgTxt = "请填写合法的手机号";
			} else if (
				!this.userCitysTxt ||
				this.userCitysTxt.indexOf("选择区域") >= 0
			) {
				this.msgTxt = "请选择省市区";
			} else if (!this.userDescAddr) {
				this.msgTxt = "请填写详细地址";
			} else {
				this.$http
					.get(addAddress, {
						params: {
							province: self.userCitysIds[0],
							city: self.userCitysIds[1],
							district: self.userCitysIds[2],
							address: self.userDescAddr,
							consignee: self.userName,
							mobile: self.userTel
						}
					})
					.then(
						res => {
							if (res.data && res.data.result == 1) {
								// this.msgTxt='添加成功';
								this.$emit("postNewAddr", {
									id: res.data.data,
									addrTxt:
										self.userName +
										"，" +
										self.userTel +
										"，" +
										self.userCitysTxt.replace(/\s/g, "") +
										self.userDescAddr
								});
							} else {
								this.msgTxt =
									res.data && res.data.message
										? res.data.message
										: "添加失败";
							}
						},
						err => {}
					);
            }
            
		}
    },
    mounted(){
        _inputS();
        _disScroll(this.newAddrShow);
    }
};
</script>