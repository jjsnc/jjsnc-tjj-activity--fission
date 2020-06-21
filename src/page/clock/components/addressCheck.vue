<style lang="scss" scoped>
.addressCheck {
	.close-btn {
		position: absolute;
		right: 0;
		top: 0;
		padding: pxTorem(13px);
		width: pxTorem(42px);
		height: pxTorem(42px);
		img {
			width: pxTorem(16px);
			height: pxTorem(16px);
		}
	}
	.addressTit {
		width: 100%;
		height: pxTorem(52px);
		font-size: pxTorem(16px);
		line-height: pxTorem(52px);
		color: #333333;
		text-align: center;
		border-bottom: 1px solid #e5e5e5;
	}
	.addressList {
		width: 100%;
		max-height: pxTorem(350px);
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		ul {
			padding-left: pxTorem(15px);
			li {
				width: 100%;
				height: pxTorem(62px);
				padding-right: pxTorem(15px);
				border-bottom: 1px solid #e5e5e5;
				display: -webkit-flex;
				display: flex;
				-webkit-justify-content: space-between;
				justify-content: space-between;
				-webkit-align-items: center;
				align-items: center;
				.addressInfo {
					-webkit-flex: 0 0 pxTorem(290px);
					flex: 0 0 pxTorem(290px);
					p {
						width: pxTorem(290px);
						margin-bottom: pxTorem(6px);
						font-size: pxTorem(13px);
						// line-height: pxTorem(13px);
						color: #333333;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						&:last-child {
							margin-bottom: 0;
						}
					}
				}
				.defaultIcon {
					width: pxTorem(6px);
					height: pxTorem(12px);
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.addAddress {
			height: pxTorem(63px);
			padding: 0 pxTorem(15px);
			font-size: pxTorem(13px);
			line-height: pxTorem(17px);
			color: #ee0000;
			display: -webkit-flex;
			display: flex;
			-webkit-justify-content: space-between;
			justify-content: space-between;
			-webkit-align-items: center;
			align-items: center;
			img {
				width: pxTorem(6px);
				height: pxTorem(12px);
			}
		}
	}
}
</style>

<template>
	<div class="addressCheck">
		<slideUpBox :show="addressShow" @changeBoxShow="changeBoxShow()">
			<div class="close-btn" @click.stop="changeBoxShow(false)">
				<img src="@/assets/images/common/icon_close@2x.png" alt>
			</div>
			<div class="addressTit">选择收货地址</div>
			<div class="addressList">
				<ul>
					<li
						v-for="(item, index) in addressData"
						:key="index"
						@click.stop="checkAddress(item.addressId)"
					>
						<div class="addressInfo">
							<p>{{item.consignee}} {{item.mobile}}</p>
							<p>{{item.provinceText + item.cityText + item.districtText + item.address}}</p>
						</div>
						<div class="defaultIcon">
							<!--  v-if="addressId == item.addressId" -->
							<img src="@/assets/images/common/icon_more@2x.png" alt>
						</div>
					</li>
				</ul>
				<div class="addAddress" @click.stop="newAddress()">
					添加新收获地址
					<img src="@/assets/images/common/icon_more@2x.png" alt>
				</div>
			</div>
		</slideUpBox>
		<newAddress @postNewAddr="postNewAddr" :newAddrShow="newAddrShow"></newAddress>
		<msgBox :msgTxt="msgTxt"></msgBox>
	</div>
</template>


<script>
import { getQueryString, _getUserInfo } from "@/assets/js/common/utils.js";
import slideUpBox from "@/components/slideUpBox";
import newAddress from "@/components/newAddress";
import msgBox from "@/components/msgBox";
import { getAddressList, editAddress } from "@/page/tenFair/assets/js/api.js";
export default {
	name: "addressCheck",
	components: {
		slideUpBox,
		newAddress,
		msgBox
	},
	data() {
		return {
			addressId: "",
			addressData: [],
			newAddrShow: false,
            msgTxt: "",
            user_info: _getUserInfo()
		};
	},
	props: {
		addressShow: {
			type: Boolean,
			default: true
        },
        setDefault: {
			type: Boolean,
			default: true
		},
	},
	watch: {
		addressShow() {
			if (this.addressShow && this.addressData.length < 1) {
				this.getData();
				this.$forceUpdate();
			}
		}
	},
	created() {
        if(this.user_info.user_id){
            // this.getData();
        }
	},
	computed: {
	},
	methods: {
		// 获取地址列表
		getData(fn) {
			let self = this;
			this.$http.get(getAddressList, {}).then(
				res => {
					if (res.data && res.data.result == 1) {
                        self.addressData = res.data["data"];
                        if(!self.addressData.length){self.newAddress()}
						self.defaultAddr = self.addressData.filter(function(
							item,
							index
						) {
							return item.default == 1;
						});
						// this.addressId=this.defaultAddr["addressId"];
						this.$emit("returnAddressId", {
							addressId: self.defaultAddr[0] ? self.defaultAddr[0]["addressId"] : 0
						});
						// this.cartData=[...this.cartData]
						typeof fn == "function" ? fn() : "";
					} else {
						console.log("地址请求失败");
						this.msgTxt =
							res.data && res.data.message
								? res.data.message
								: "地址请求失败";
					}
					// this.setCartData();
				},
				err => {}
			);
		},
		// 修改收货地址
		editAddress(params, fn) {
			this.$http.get(editAddress, { params }).then(res => {
				console.log(res);
				let data = res.data || {};
				if (data.result == 1) {
					console.log("chenggong");
					typeof fn == "function" ? fn() : "";
				} else {
					console.log(123);
					this.msgTxt =
						data && data.message ? data.message : "选择地址失败";
				}
			});
		},
		changeBoxShow(bool) {
			this.$parent.addressShow = bool;
		},
		// 选择收货地址
		checkAddress(id) {
			this.addressId = id;
			let addr = this.addressData.filter(item => item.addressId == id)[0];
            console.log(addr);
            this.$emit("submitAddress", {
                id: id,
                addrTxt:
                    addr.consignee +
                    "，" +
                    addr.mobile +
                    "，" +
                    addr.provinceText +
                    addr.cityText +
                    addr.districtText +
                    addr.address
            });
		},
		// 新增收货地址
		newAddress() {
			this.$parent.addressShow = false;
			this.newAddrShow = true;
		},
		// 接受新增地址信息
		postNewAddr(obj) {
			this.getData();
			this.newAddrShow = false;
			this.$emit("submitAddress", { id: obj.id, addrTxt: obj.addrTxt });
		}
	}
};
</script>