<style lang="scss" scoped>
.citySelect .cs-close {
	position: absolute;
	right: pxTorem(13.1px);
	top: pxTorem(13.1px);
	width: pxTorem(15.9px);
	height: pxTorem(15.9px);
	img {
		width: pxTorem(15.9px);
		height: pxTorem(15.9px);
	}
}
.citySelect .cs-top {
	height: pxTorem(43px);
	padding: 0 pxTorem(13px);
	display: -webkit-flex;
	display: flex;
	border-bottom: 1px solid #e5e5e5;
}
.citySelect .cs-top div {
	position: relative;
	line-height: pxTorem(43px);
	margin-right: pxTorem(16px);
}
.citySelect .cs-top div::after {
	content: "";
	display: block;
	position: absolute;
	left: 0;
	bottom: -1px;
	width: 100%;
	height: pxTorem(2px);
	background-color: transparent;
}
.citySelect .cs-top div.cs-choosing::after {
	background-color: #ff6632;
}
.citySelect ul {
	max-height: pxTorem(281px);
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}
.citySelect ul li {
	height: pxTorem(40px);
	padding-left: pxTorem(13px);
	line-height: pxTorem(40px);
	border-bottom: 1px solid #e5e5e5;
	position: relative;
}
.citySelect ul li img {
	content: "";
	display: block;
	position: absolute;
	right: pxTorem(13px);
	top: pxTorem(14px);
	width: pxTorem(6px);
	height: pxTorem(12px);
}
.citySelect ul li:last-child {
	border-bottom: 0;
}

/* iphoneX 适配 */
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	.citySelect {
		padding-bottom: pxTorem(34px);
	}
}
</style>

<template>
	<div class="citySelect">
		<slideUpBox :show="citySelectShow" @changeBoxShow="changeBoxShow()">
			<div class="cs-close" @click.stop="changeBoxShow(false)">
				<img src="@/assets/images/common/icon_close@2x.png" alt>
			</div>
			<div class="cs-top">
				<div :class="checkIndex == 0 ? 'cs-choosing' : ''" @click.stop="manual(0)">{{provTxt}}</div>
				<div :class="checkIndex == 1 ? 'cs-choosing' : ''" @click.stop="manual(1)">{{cityTxt}}</div>
				<div :class="checkIndex == 2 ? 'cs-choosing' : ''" @click.stop="manual(2)">{{areaTxt}}</div>
			</div>
			<ul>
				<li v-for="(item, index) in listData" :key="index" @click.stop="checkCity(item)">
					{{item.name}}
					<img src="@/assets/images/common/icon_more@2x.png" alt>
				</li>
			</ul>
		</slideUpBox>
	</div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex';
import cityData from "@/assets/js/common/region.js";
import slideUpBox from "@/components/slideUpBox";
export default {
	name: "citySelect",
	components: {
		slideUpBox
	},
	data() {
		return {
			listData: [],
			provTxt: "请选择",
			cityTxt: "请选择",
			areaTxt: "请选择",
			checkIndex: 0,
			idsArr: [],
			namesArr: []
			// img_url: this.$global.img_url
		};
	},
	props: {
		citySelectShow: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		// 使用对象展开运算符将 getter 混入 computed 对象中
		// ...mapGetters([
		//     'citySelectShow',
		// ])
	},
	created() {
		this.listData = cityData;
	},
	methods: {
		// ...mapMutations([
		//     'setNewAddrShow',
		//     'setCitySelectShow',
		// ]),
		changeBoxShow(bool) {
			// this.setCitySelectShow(bool);
			this.$parent.citySelectShow = bool;
		},
		// 选中地址
		checkCity(obj) {
			switch (this.checkIndex) {
				case 0:
					this.provTxt = obj.name;
					this.checkIndex = 1;
					this.idsArr = [obj.id];
					this.namesArr = [obj.name];
					this.cityTxt = "请选择";
					this.areaTxt = "请选择";
					this.cityNext();
					break;
				case 1:
					this.cityTxt = obj.name;
					this.checkIndex = 2;
					this.idsArr = [this.idsArr[0], obj.id];
					this.namesArr = [this.namesArr[0], obj.name];
					this.areaTxt = "请选择";
					this.cityNext();
					break;
				case 2:
					this.areaTxt = obj.name;
					this.idsArr = [this.idsArr[0], this.idsArr[1], obj.id];
					this.namesArr = [
						this.namesArr[0],
						this.namesArr[1],
						obj.name
					];
					this.successCheck();
					break;
				default:
					break;
			}
		},
		// 筛选当前显示地址列表
		cityNext(ids) {
			let self = this;
			let idsArr = ids ? ids : this.idsArr;
			let len = idsArr.length;
			let citys, areas;
			switch (len) {
				case 0:
					this.listData = cityData;
					self.$forceUpdate();
					break;
				case 1:
					citys = cityData.filter(item => item.id == idsArr[0])[0]
						.childs;
					this.listData = citys;
					self.$forceUpdate();
					break;
				case 2:
					citys = cityData.filter(item => item.id == idsArr[0])[0]
						.childs;
					areas = citys.filter(item => item.id == idsArr[1])[0]
						.childs;
					this.listData = areas;
					self.$forceUpdate();
					break;
				default:
					break;
			}
		},
		// 手动切换地址选择
		manual(type) {
			console.log(type, this.idsArr.length);
			if (type > this.idsArr.length) return;
			this.checkIndex = type;
			switch (type) {
				case 0:
					this.cityNext([]);
					break;
				case 1:
					this.cityNext([this.idsArr[0]]);
					break;
				case 2:
					this.cityNext([this.idsArr[0], this.idsArr[1]]);
					break;
				default:
					break;
			}
		},
		// 三级联动选择完成
		successCheck() {
			console.log(this.idsArr, this.namesArr);
			this.$emit("citySelectSuccess", {
				ids: this.idsArr,
				names: this.namesArr
			});
			// this.setCitySelectShow(false);
			this.$parent.citySelectShow = false;
		}
	}
};
</script>