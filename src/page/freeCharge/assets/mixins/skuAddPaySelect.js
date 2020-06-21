import skuCheck from "@/components/skuCheck";
import msgBox from "@/components/msgBox";
import prompt from "@/components/prompt";
import payTypeBox from "@/components/payType";
import addressCheck from "@/components/addressCheck";
import {
    getQueryString,
    _getUserInfo,
    getEnvironment,
    userAppPay
} from "@/assets/js/common/utils.js";
export default {
    data() {
        return {
            msgTxt: "",
            goods_id: "",
            spec_id: "",
            address_id: "", // 地址id
            goodsItem: {},
            addressShow: false,
            payTypeShow: false,
            skuShow: false,
            promptObj: {
                show: false,
                tittle: "请确认您的收货地址",
                ptmTxt: "",
                success: this.popPay
            },
            payChoose: 0, //0所有 3微信 1支付宝
            platForm: getEnvironment() //平台判断 1、app 2、小程序 0、h5
        };
    },
    methods: {
        // 开始购物
        startShopping(goodsItem) {
            this.goodsItem = goodsItem;
            if (this.goodsItem.spec.length < 2) {
                let _spec = this.goodsItem.spec[0];
                this.spec_id = _spec.specId;
                this.addressShow = true;
            } else {
                this.skuShow = true;
            }
        },
        // 接收选中的skuid
        submitSku(obj) {
            this.spec_id = obj.id;
            this.skuShow = !this.skuShow;
            this.addressShow = true;
        },
        // 获取用户当前选择的地址
        selectedAddress(selectAddress) {
            this.address_id = selectAddress.id;
            this.promptObj.ptmTxt = selectAddress.addrTxt;
            this.promptObj.show = true;
        },
        //支付方式弹框
        popPay() {
            this.addressShow = false;
            if (this.platForm == 0) {
                this.payChoose = 3;
            }
            this.payTypeShow = true;
        },
        // 我的支付方式
        myPayType(id) {
            this.payType = id;
            // 这里直接写订单生成订单的方法即可
        }
    },
    components: {
        skuCheck,
        msgBox,
        addressCheck,
        prompt,
        payTypeBox
    }
};
