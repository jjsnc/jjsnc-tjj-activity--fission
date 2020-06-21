<template>
    <div>
        <payTypeBox :show="payTypeShow" :payChoose="payChoose" @myPayType="myPayType"></payTypeBox>
        <skuCheck :data="goodsData" @submitSku="submitSku" :skuShow="skuShow"></skuCheck>
        <addressCheck @submitAddress="selectedAddress" :addressShow="addressShow" :data="[]" :setDefault="false"></addressCheck>
        <prompt :promptObj="promptObj"></prompt>
        <msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>

<script>
import skuCheck from "@/components/skuCheck";
import addressCheck from "@/components/addressCheck";
import payTypeBox from "@/components/payType";
import prompt from "@/components/prompt";
import msgBox from "@/components/msgBox";
import { getEnvironment } from "@/assets/js/common/utils.js";
import {blackList} from "./../assets/js/api.js";
export default {
    data(){
        return {
            spec_id: 0,
            address_id: 0,
            payType: 0,
            platForm: getEnvironment(),
            payTypeShow: false,
            skuShow: false,
            addressShow: false,
            payChoose: 0,
            promptObj: {
                show: false,
                tittle: "请确认您的收货地址",
                ptmTxt: "",
                success: this.requestBlackList
            },
            msgTxt: "",
        }
    },
    props: {
        goodsData: {
            type: Object,
            default: {}
        },
        buyStart: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        goodsData(){
            console.log(this.goodsData)
        },
        buyStart(){
            if(this.buyStart){
                if (this.goodsData.spec.length < 2) {
                    let _spec = this.goodsData.spec[0];
                    this.spec_id = _spec.specId;
                    this.addressShow = true;
                }else{
                    this.skuShow = true;
                }
                this.$parent.buyStart = false;
            }
        },
    },
    components: {
        skuCheck,
        addressCheck,
        payTypeBox,
        prompt,
        msgBox
    },
    methods: {
        // 接收选中的skuid
        submitSku(obj) {
            this.spec_id = obj.id;
            this.skuShow = !this.skuShow;
            // this.shareData["imgUrl"] = obj.img;
            this.addressShow = true;
        },
        // 获取用户当前选择的地址
        selectedAddress(selectAddress) {
            this.promptObj.ptmTxt = selectAddress.addrTxt;
            this.address_id = selectAddress.id;
            this.promptObj.show = true;
        },
        //支付方式弹框
        popPay() {
            this.addressShow = false;
            if (this.platForm == 0) {
                this.payChoose = 3;
            }
            this.payTypeShow = true;
            let params = {
                app_resource: 0
            };
        },
        //风控接口
        requestBlackList() {
            let self=this;
            let params={
                address_id:this.address_id,
            }
            this.$http.get(blackList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.popPay();
                }else{
                    this.msgTxt=data.message;
                }
            })
        },
        // 我的支付方式
        myPayType(id) {
            console.log("支付方式:" + id);
            this.payType = id;
            this.$emit('buySubmit',{
                payType: this.payType,
                address_id: this.address_id,
                spec_id: this.spec_id,
            })
        },
    },
    
}
</script>