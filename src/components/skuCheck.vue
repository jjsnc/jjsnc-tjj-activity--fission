<style lang="scss" scoped>
.skuCheck {
	.skuBox {
		padding: pxTorem(13px);
	}
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
	.goodsInfo {
		min-height: pxTorem(90px);
		overflow: hidden;
		img {
			float: left;
			width: pxTorem(90px);
			height: pxTorem(90px);
			border: 1px solid #ccc;
		}
		div {
			float: left;
			width: pxTorem(180px);
			margin-left: pxTorem(13px);
			padding-top: pxTorem(12px);
			font-size: pxTorem(18px);
			line-height: pxTorem(20px);
			color: #000000;
			font-weight: 600;
			text-align: left;
			p {
				margin-top: pxTorem(10px);
				color: #666;
				font-size: pxTorem(13px);
				line-height: pxTorem(16px);
				font-weight: 300;
			}
            
        .num{
            clear: both;
            padding-top: 11px;
            font-size: 14px;
            font-weight: 400;
            margin-left: 0;
            text-align: center;
            display: flex;
            color: #333;
            .num-step{
                font-size: 13px;
                width: auto;
                // height: 20px;
                padding-top: 0;
                margin-left: 0;
                .stepper {
                    width: 74px;
                    height: 20px;
                    border: 1px solid #E5E5E5;
                    clear: both;
                    padding: 0;
                    font-weight: 400;
                    
                }
            }
        }
		}
	}
	.sku_box {
		background-color: #fff;
		margin-top: pxTorem(4px);
		max-height: pxTorem(300px);
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		.sku_item {
			padding-left: 0;
			padding-right: 0;
			margin-top: pxTorem(26px);
			.goods_tit {
				margin-bottom: pxTorem(12px);
			}
			ul {
				display: -webkit-flex;
				display: flex;
				-webkit-flex-wrap: wrap;
				flex-wrap: wrap;
				li {
					min-width: pxTorem(58px);
					height: pxTorem(30px);
					padding: pxTorem(9px) pxTorem(17px);
					font-size: pxTorem(12px);
					line-height: pxTorem(12px);
					text-align: center;
					background-color: #f5f5f5;
					color: #333333;
					border-radius: pxTorem(3px);
					margin-right: pxTorem(12px);
					margin-top: pxTorem(10px);
					border: 1px solid transparent;
					// border: 1px solid #9B9B99;
					&.sku-disabled {
						color: #ccc;
						border: 1px dashed #ccc;
					}
				}
				.sku_act {
					background-color: #ff6632;
					// border: 1px solid #C8431A;
					color: #fff;
				}
			}
		}
	}
	.buy-submit {
		width: 100%;
		height: pxTorem(45px);
		margin-top: pxTorem(28px);
		background: -webkit-linear-gradient(-132deg, #ed1400 0%, #ff6632 100%);
		background: linear-gradient(-132deg, #ed1400 0%, #ff6632 100%);
		font-size: pxTorem(18px);
		line-height: pxTorem(45px);
		text-align: center;
		color: #fff;
	}
}
</style>

<template>
	<div class="skuCheck">
		<slideUpBox :show="skuShow" @changeBoxShow="changeBoxShow()">
			<div class="skuBox" v-if="Object.keys(data).length > 0">
				<div class="close-btn" @click.stop="changeBoxShow(false)">
					<img src="../assets/images/common/icon_close@2x.png" alt>
				</div>
				<div class="goodsInfo">
					<img :src="(skuImg ? skuImg : data.img320url||data.img640Url||data.goodsCover)" alt>
					<div>
						<small v-if="showPrice">¥</small>
						<span v-if="showPrice">{{(skuPrice ? skuPrice : data.price||data.minGroupPrice||data.minPrice)}}</span>
						<p class="place-choose">{{LackSku}}</p>
                        <div class="num" v-show="numShow">
                            <span>数量：</span>
                            <div class="num-step">
                                <stepper @stepperChange="stepperChange" :num="num" :max="data.limitNum||data.stockNum"></stepper>
                            </div>
                        </div>
					</div>
				</div>
				<div class="sku_box">
					<div class="sku_item" v-for="(item, index) in data.showSku" :key="index">
						<div class="goods_tit">{{item.label}}</div>
						<ul>
							<li
								:class="[checkedSkus[index] == i ? 'sku_act' : '', !sku.show ? 'sku-disabled' : '']"
								v-for="(sku, i) in item.list"
								:key="i"
								@click.self="checkSku(index,i)"
							>{{sku.value}}</li>
						</ul>
					</div>
				</div>
				<div class="buy-submit" @click.self="skuSubmit()">确定</div>
			</div>
		</slideUpBox>
	</div>
</template>


<script>
// import { mapGetters, mapMutations } from 'vuex';
import slideUpBox from "@/components/slideUpBox";
import stepper from "@/components/stepper";
export default {
	name: "skuCheck",
	components: {
        slideUpBox,
        stepper
	},
	data() {
		return {
			skuImg: "",
			skuPrice: "",
			specId: "",
			checkedSkus: [], // 选中sku的聚合
			LackSku: "", // 缺省sku的文字描述
			msgTxt: true,
			num: 1,
		};
	},
	props: {
		data: {
			type: Object,
			default: {}
		},
		skuShow: {
			type: Boolean,
			default: false
        },
		numShow: {
			type: Boolean,
			default: false
        },
        showPrice: {
            type: Boolean,
			default: true
        }
	},
	watch: {
		data() {
			// console.log(111);
			if (this.data.show && typeof this.data.show == "object") {
                this.editObj();
                this.defaultCheck();
				return;
			}
            this.initSku();
            this.defaultCheck();
		}
	},
	created() {
		// this.initSku();
	},
	computed: {
		// 使用对象展开运算符将 getter 混入 computed 对象中
		// ...mapGetters([
		//     'msgTxt',
		//     'skuShow',
		// ])
	},
	methods: {
		// ...mapMutations([
		//     'setMsgTxt',
		//     'setSkuShow',
        // ]),
        defaultCheck(){
            let lackNum = 0;
            this.data.showSku.map((item,index) => {
                if(item.len <= 1){
                    this.checkSku(index,0);
                }
            })
        },
        stepperChange(val){
            this.num = Number(val);
        },
		changeBoxShow(bool) {
			// this.setSkuShow(bool)
			this.$parent.skuShow = !this.$parent.skuShow;
		},
		// 处理sku数据格式
		editObj() {
            this.skuImg = "";
			let obj = this.data.show;
			let arr = [];
			for (let key in obj) {
				arr.push(obj[key]);
			}
			this.data.showSku = arr;
			this.initSku();
		},
		// 初始化
		initSku(bool) {
            this.num=1;
			let _arr = this.data.showSku;
			_arr = _arr.map(item => {
				item.list = item.list.map(sku => {
                    item.len = item.list.length;
					return {
						value: typeof sku == "object" ? sku.value : sku,
						show: true
					};
				});
				return item;
			});
			this.data.showSku = _arr;
			// console.log(this.data);
			if (!bool) {
				this.checkedSkus = [];
				this.checkedSkus.length = this.data.showSku.length;
				this.LackSku = "请选择" + this.data.showSku[0].label;
			}
			this.$forceUpdate();
		},
		// 选中sku
		checkSku(type, index) {
			if (!this.data.showSku[type].list[index].show) return;
			this.checkedSkus[type] == index
				? (this.checkedSkus[type] = undefined)
				: (this.checkedSkus[type] = index);
			this.$forceUpdate();
			let lackLaber = "";
			let allSkuTxt = "";
			for (let i = 0; i < this.checkedSkus.length; i++) {
				if (
					this.checkedSkus[i] == undefined ||
					this.checkedSkus[i] == null
				) {
					lackLaber = this.data.showSku[i].label;
					break;
				} else {
					allSkuTxt +=
						this.data.showSku[i].label +
						":" +
						this.data.showSku[i].list[this.checkedSkus[i]].value +
						" ";
					console.log(this.data.showSku[i]);
				}
			}
			// lackLaber ? this.LackSku = '请选择' + lackLaber : this.LackSku = allSkuTxt;
			this.filterSku(this.data.showSku[type].list[index].value, type);
			if (lackLaber) {
				this.LackSku = "请选择" + lackLaber;
				this.specId = "";
				this.skuImg = "";
				this.skuPrice = "";
			} else {
				this.LackSku = allSkuTxt;
				this.allSkuChecked();
			}
		},
		// 筛选sku
		filterSku(value, type) {
			let self = this;
			let isAct =
				typeof this.checkedSkus[type] == "number" ? true : false;
			let showSku = this.data.showSku;
			let spec = this.data.spec;
			if (isAct) {
				//点亮sku
				let len = this.checkedSkus.length;
				for (var item = 0; item < len; item++) {
					let _val =
						typeof this.checkedSkus[item] == "number"
							? showSku[item].list[this.checkedSkus[item]].value
							: "";
					if (_val != value) {
						let hasSpec = spec.filter(
							i => i.skuSize == value || i.color == value
						);
						self.data.showSku[item].list = self.data.showSku[
							item
						].list.map(i => {
							let len = hasSpec.filter(
								j => j.skuSize == i.value || j.color == i.value
							).length;
							len > 0 ? (i.show = true) : (i.show = false);
							return i;
						});
					}
				}
			} else if (
				this.checkedSkus.filter(i => typeof i == "number").length < 1
			) {
				//取消点亮的sku
				this.initSku();
			} else {
				this.checkedSkus.map((item, index) => {
					if (typeof item == "number") {
						self.initSku(true);
						self.filterSku(
							self.data.showSku[index].list[item].value,
							index
						);
					}
				});
			}
		},
		allSkuChecked() {
			let showSku = this.data.showSku;
			let skuNames = [];
			skuNames = this.checkedSkus.map((item, index) => {
				return showSku[index].list[item].value;
			});
			let _sku = this.data.spec.filter(
				item =>
					skuNames.indexOf(item.color) >= 0 &&
					skuNames.indexOf(item.skuSize) >= 0
			)[0];
			this.specId = _sku.specId;
            this.skuImg = _sku.smallImgUrl;
            if(this.data.spec.length<2)
                this.skuPrice = this.data.price||this.data.minGroupPrice||this.data.minPrice;
            else
			    this.skuPrice = _sku.groupPrice || 0;
			this.$nextTick();
			console.log(this.specId);
		},
		// sku确定
		skuSubmit() {
			let success = true;
			for (let i = 0; i < this.checkedSkus.length; i++) {
				if (
					this.checkedSkus[i] == undefined ||
					this.checkedSkus[i] == null
				) {
					success = false;
                    // this.setMsgTxt(this.LackSku);
                    console.log(this.$msgBox)
                    this.$msgBox.msgTxt(this.LackSku);
					break;
				}
			}
			// 成功后传skuid给上一页面
			if (success) {
                console.log(this.specId);
				this.$emit("submitSku", { id: this.specId, img: this.skuImg ,num:this.num, goodsId:this.data.goodsId});
			}
		}
	}
};
</script>