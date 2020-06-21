<style scoped lang="scss">
.list {
    height: 100%;
    // background: #fff;
    // padding-top: 16px;
    .ruleImg {
        position: fixed;
        width: 54px;
        // height: 62px;
        right: 14px;
        top: 0;
        z-index: 4;
    }
      &.mt30{
        margin-top: 30px;
    }
    .container {
        width: 100%;
        padding-bottom: 48px;
        .top {
            position: relative;
            padding-left: 10px;
            border-left: 3px solid #fff1b0;
            color: #fff1b0;
            font-size: 16px;
        }
        .empty-data{
                color: #999;
                text-align: center;
                font-size: 16px;
                img{
                    width: 204px;
                    margin:30px auto 22px auto;
                }
            }
        .goods-list {
            padding: 12px 10px ;
           
            li {
                margin-top: 12px;
                display: flex;
                background: #fff;
                border-radius: 8px;
                align-items: center;
                height: 130px;
                &:first-child {
                    margin-top: 0;
                }
                .list-item-left {
                    flex: 0 0 120px;
                    height: 130px;
                    padding: 10px 0px 10px 10px;
                    position: relative;
                    .goods-status {
                        width: 48px;
                        height: 48px;
                        position: absolute;
                        top: -5px;
                        right: -5px;
                    }
                    .goods-img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .list-item-right {
                    flex: 1;
                    padding: 10px 14px;
                    .goods-name {
                        width: 207px;
                        margin-bottom: 14px;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 17px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .goods-middle {
                        margin-bottom: 20px;
                        font-size: 11px;
                        color: #ee0000;
                        letter-spacing: 0;
                        line-height: 11px;
                        display: flex;
                        justify-content: space-between;
                        .time {
                            font-size: 12px;
                            color: #757575;
                            letter-spacing: 0;
                            line-height: 18px;
                            span {
                                color: #ff6632;
                            }
                            img{
                                width: 20px;
                                height: 20px;
                            }
                        }
                        .tip {
                            font-size: 12px;
                            color: #ee0000;
                            line-height: 18px;
                            font-weight: bold;
                        }
                    }
                    .goods-bottom {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        .goods-detail {
                            font-size: 14px;
                            color: #ff5a32;
                            border: 1px solid #ff5a32;
                            border-radius: 4px;
                            width: 60px;
                            height: 32px;
                            text-align: center;
                            line-height: 32px;
                            margin-right: 10px;
                        }
                        .goods-btn {
                            width: 84px;
                            background-image: linear-gradient(90deg, #FF7219 0%, #FF0D0D 100%);
                            border-radius: 4px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #fff;
                            text-align: center;                            
                        }
                        .goods-share{
                            background-image: linear-gradient(-180deg, #92EA35 0%, #5CCF23 100%);
                            border-radius: 4px;
                            font-size: 14px;
                            color: #fff;
                            padding: 0 13px;
                        }
                        .userIcon{
                            display: flex;
                            flex: 1;
                            img{
                                width: 20px;
                                height: 20px;
                                border-radius: 20px;
                                margin-left: -5px;
                                border: 1px solid #fff;
                            }
                        }
                    }
                }
            }
        }
         .goodsAcitve{
              padding-bottom: 0;
            }   
        .shrinkage{
            width: 100%;
            height: 50px;
            // line-height: 40px;
            font-size: 15px;
            color: #FF6632;
            display: flex;
            justify-content: center;
            padding-top:12px ;
            // align-items: center;
            img{
                width: 11px;
                height: 6px;
                margin-left: 5px;
                margin-top: 6px;
            }
        }
    }
    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        display: flex;
        .active {
            background: #fde9d9;
        }
    }
}
.iPhoneX{
    .list{
        .container{
            padding-bottom: 68px;
        }
    }
}
</style>
<template>
    <div class="list"  :class='["list",$parent.danmuData.length > 0 ? "mt30" : ""]'>
        <img src="../assets/images/icon_strategy@2x.png" class="ruleImg" @click.stop="popRule" />
            <div class="container">
                <!-- <div class="top">
                    送礼记录
                </div> -->
                <div v-show="isEmpty" class="empty-data">
                    <img src="../assets/images/quesheng@2x.png"  />
                    <div>抱歉～这里空空如也</div>
                </div>
                <ul class="goods-list" :class="{goodsAcitve:list.length>5}">
                    <li v-for="(item, index) in list" :key="index" v-show="shrink&&index<5 || !shrink">
                        <div class="list-item-left">
                            <img v-lazy="item.goods_img" class="goods-img"/>
                            <img src="../assets/images/fail@2x.png" class="goods-status" v-if="item.status=='3'" />
                            <img src="../assets/images/success@2x.png" class="goods-status"  v-if="item.status=='4'" />
                        </div>
                        <div class="list-item-right">
                            <div class="goods-name">{{item.goods_name}}</div>
                            <div class="goods-middle" v-if="item.status=='2'">
                                <div class="time"><span>{{item.time}}</span>后拼团失效</div>
                                <div class="tip">待成团</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='3'">
                                <div class="time"></div>
                                <div class="tip">免单失败</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='4'">
                                <div class="time">
                                     可前往我的订单查看物流详情
                                    <!-- <img :src="item.userIcon"  /> -->
                                </div>
                                <div class="tip">免单成功</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='1'">
                               <div class="time"><span>{{item.time_order}}</span>后取消订单</div>
                                <div class="tip" >待支付</div>
                            </div>
                            
                            <div class="goods-bottom">
                                <div  v-if="item.status=='4'" class="userIcon">
                                    <template v-for="(i,count) in item.user_icon" >
                                        <img :src="i"  :key="count" v-if="i"/>
                                        <img src="../assets/images/toux@2x.png"  :key="count" v-else/>
                                    </template>
                                </div>
                                <div class="goods-detail" v-if="item.status!='1'" @click="toShareDetail(item.group_id,item.s_user_id)" style="height:32px;line-height: 32px;">
                                    详情
                                </div>
                                <div class="goods-share" v-bind:style="classObject" @click.stop="share(item)"  v-if="item.status=='2'">邀请好友拼团</div>
                                <div class="goods-btn" v-bind:style="classObject" @click.stop="goPay(item)"  v-if="item.status=='1'">去支付</div>
                                <div class="goods-btn" v-bind:style="classObject" @click.stop="popSku(item)"  v-if="item.status=='3'">重新购买</div>
                                <div class="goods-btn" v-bind:style="classObject" @click.stop="popSku(item)"  v-if="item.status=='4'">再来一单</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="shrinkage" v-show="shrink&&!isEmpty&&list.length>5" @click="shrink=false">
                    <p>查看全部记录</p>
                    <img src="../assets/images/back_icon@2x.png"/>
                </div>
                <div class="shrinkage" v-show="!shrink&&!isEmpty&&list.length>5" @click="shrink=true">
                    <p>收起</p>
                    <img src="../assets/images/back_icon_up@2x.png" />
                </div>
                <guessLike
                    ref="guessLike"
                    :groupStatus="groupStatus"
                    :isGroup="isGroup"
                ></guessLike>
            </div>
        <rule :ruleShow="ruleShow"></rule>
        <payTypeBox :show="payTypeShow" :payChoose="payChoose" @myPayType="myPayType"></payTypeBox>
        <buySystem :goodsData="goodsData" @buySubmit="buySubmit" :buyStart="buyStart"></buySystem>
    </div>
</template>

<script >
import payTypeBox from "@/components/payType";
import msgBox from "@/components/msgBox";
import guessLike from "../components/guessLike";
import buySystem from "../components/buySystem";
import { shareToWx,getQueryString,getEnvironment,userAppPay,_getUserInfo,check_login} from "@/assets/js/common/utils.js";
import { myGoodsList,orderAdd,goodsDetail } from "./../assets/js/api.js";
import { toGoodsDetail,toShare } from "./../assets/js/url.js";
import Wechat_api from "@/assets/js/common/wechat_api.js";
import H5Pay from "@/assets/js/common/H5pay";
import rule from "./rule";
export default {
    name: "myFree",
    props:{
        is_update:{
            type:Boolean,
            default:false
        }
    },
    components: {
        rule,
        msgBox,
        buySystem,
        guessLike,
        payTypeBox
    },
    data() {
        return {
           classObject: {
                'height': "32px",
                'line-height': "32px"
            },
            page: 1,
            hasData: false, //页面无数据不显示，只显示加载loading
            ruleShow: false, //规则
            list: [], //店铺列表
            buyStart: false,//规格地址是否显示
            isEmpty: false,
            shareData:{},//分享确认框显示内容
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            groupStatus:0,
            payType:0,
            payTypeShow:false,
            payChoose: 0, //0所有 3微信 1支付宝
            isGroup:1,
            cate_id:"",
            shrink:true,
            user_info: _getUserInfo(),
            goodsData: {}, //所选商品数据(含sku)
        };
    },
    watch: {
        is_update(){
            this.getData();
        }
    },
    created() {
        // let self=this;
        // new Wechat_api({
        //     shareJson: {
        //         title: "3人成团，全员免单，快来一起免单购物！", // 分享标题
        //         link:`${location.origin}/freeCharge/view/${process.env.VERSION}/index/s_user_id/${self.user_info.user_id}/group_id/${getQueryString("group_id")}`,
        //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //         desc: "免单特权，机不可失！"
        //     },
        //     hideShareType: 1
        // });
        this.getData();
    },
    mounted(){
        let _this=this;
        // 先判断 ios 还是安卓
        if (getQueryString("os") == "ios") {

            window.removePayToUrgency=function(){
                _this.buyStart = false;
                _this.payTypeShow = false;
                _this.$parent.msgTxt ="支付失败";    

            }
        }else if(getQueryString("os") == "android") {
            JS.removePayToUrgency=function(){
                _this.buyStart = false;
                _this.payTypeShow = false;
                _this.$parent.msgTxt ="支付失败" ;   
            }
        }
    },
    methods: {
        popRule() {
            this.ruleShow = true;
        },
        // 我的支付方式
        myPayType(id) {
            console.log("支付方式:" + id);
            this.payType = id;
            let self=this;
            this.pay(self.goodsItem)
        },
        getData() {
            if (this.page < 1) return;
            this.$http.get(myGoodsList, {}).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    if(data.data){
                        this.list = this.list.concat(data.data);
                        this.transtotime()
                    }

                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }
                } else {
                    this.$parent.msgTxt =
                        (res && res.data && res.data.message) ||
                        "商品列表请求失败";
                }
            });
        },

        // getDataRequest(params){
        //     this.$http.get(myGoodsList, { params }).then(res => {
        //         let data = res.data;
        //         if (data && data.result == 1) {
        //             this.list = data.data;
        //             this.page = data.nextPage;
        //             if (this.list.length < 1) {
        //                 this.isEmpty = true;
        //             } else {
        //                 this.isEmpty = false;
        //             }
        //         } else {
        //             this.$parent.msgTxt =
        //                 (res && res.data && res.data.message) ||
        //                 "商品列表请求失败";
        //         }
        //     });
        // },
        // 去发起分享页
        toShareDetail(group_id,s_user_id){
            if(!s_user_id){
                s_user_id=this.user_info.user_id
            }
            this.$router.push(
                `${toShare}/group_id/${group_id}/s_user_id/${s_user_id}`,
            );
        },
        share(goods) {
            let self=this;
            if(this.platForm==1){
                let obj={
                    title:"我发起了免单购物，3人参团，全团免单！限时3小时，快来抢！",
                    content:goods["goods_name"] + "\n" + "免单特权，机不可失！",
                    shareUrl:`${location.origin}/freeCharge/view/${process.env.VERSION}/index/s_user_id/${self.user_info.user_id}/group_id/${goods["group_id"]}`,
                    imgUrl:goods["goods_img"],
                };
                shareToWx(obj);
            }else if(this.platForm==0){
               this.$parent.msgTxt = "请点击右上角···转发给好友哦。";
            }
        },
        toTwo(obj){
            if (obj < 10) {
                obj = '0' + obj;
            }
            return obj;     
        },
        transtotime(){
            let h = 0; //小时
            let m = 0; //分钟
            let s = 0; //秒数
            let self = this;
            let mycount = setInterval(()=>{
                let arr = self.list;
                let count = 0;
                // let temp = 0;
                for(let key in arr){
                    let time = parseInt(arr[key]["group_time"]);
                    let time_order = parseInt(arr[key]["order_time"]);
                    if(time_order>0){
                        time_order = parseInt(time_order) - 1;
                        h = this.toTwo(Math.floor((time_order / 60 / 60) % 24));
                        m = this.toTwo(Math.floor((time_order / 60) % 60));
                        s = this.toTwo(Math.floor((time_order) % 60));
                        arr[key]["time_order"]=  h + ":" + m + ":" + s;
                        arr[key]["order_time"]=  time_order;
                    }
                    if(time>0){
                        time = parseInt(time) - 1;
                        h = this.toTwo(Math.floor((time / 60 / 60) % 24));
                        m = this.toTwo(Math.floor((time / 60) % 60));
                        s = this.toTwo(Math.floor((time) % 60));
                        arr[key]["time"]=  h + ":" + m + ":" + s;
                        arr[key]["group_time"]=  time;
                    }else{
                        // if(temp!=count&&arr[key]['status']=='0'){
                            // self.getDataRequest({page:1});
                        // }
                        // temp=count++;
                    }
                    self.list = arr;

                }
                if(count==arr.length) clearInterval(mycount);
                self.$forceUpdate()
            },1000)
        },
        //规格弹框
        popSku(goods) {
            if (!check_login()) return;
            if (parseInt(getQueryString("is_first")==1)) {
                this.$parent.downloadPopShow=true;
                return;
            }
            const params = {
                goods_id: goods.goods_id,
                cate_id: goods["cate_id"]
            }
            this.cate_id=goods["cate_id"];
            this.$http.get(goodsDetail, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.goodsData = data.goods_info;
                    if (!this.goodsData["totalStock"]) {
                        this.$parent.msgTxt = "该商品没有库存或已下架";
                        return;
                    }
        
                    this.buyStart = true;
                }else{
                    this.$parent.msgTxt = data.message;
                }
            });
            // this.goodsData = goods;
        },
        buySubmit(buyObj){
            this.createOrder(buyObj);
        },
        createOrder(obj) {
            let self = this;
            let os = getQueryString("os");
            this.payType=obj.payType;
            let params = {
                version:  getQueryString("version"),
                user_id: this.user_info["user_id"],
                goods_id: this.goodsData["goodsId"],
                spec_id: obj.spec_id,
                address_id: obj.address_id,
                payment_id: obj.payType,
                cate_id: this.cate_id,
                num: 1,
                os: os
            };
            if(this.platForm==0){
                params["platForm"]="wechat";
            }
            this.$http.post(orderAdd, params).then(res => {
                let data = res.data;
                if (data["status"] == 1) {
                    this.pay(data.data);
                }else if(data["status"] == -5){
                    this.$parent.downloadPopShow=true;
                } else {
                    this.$parent.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        goPay(item){
            this.payTypeShow=true;
            if(this.platForm == 0){
                this.payChoose = 3;
            }
            this.goodsItem=item;
        },
        pay(item){
            let self=this;
             if (this.platForm == 1) {
                userAppPay({
                    orderNo: item.orderNo||item.order_no,
                    goodsName: item.orderName||item.goods_name,
                    payType: self.payType,
                    price: item.payAmount||item.goods_price,
                    linkUrl: `${location.origin}/freeCharge/view/${process.env.VERSION}/share/order_no/${item.orderNo||item.order_no}/s_user_id/${self.user_info.user_id}`,
                    webLinkUrl: `${location.origin}/freeCharge/view/${process.env.VERSION}/share/order_no/${item.orderNo||item.order_no}/s_user_id/${self.user_info.user_id}`
                });
            } else if (this.platForm == 0) {
                //微信内置
                H5Pay.init("wxpayIn", {
                    order_no: item.orderNo||item.order_no,
                    goods_name: item.orderName||item.goods_name,
                    payNo: item.orderNo||item.order_no,
                    successFn: () => {
                        console.log('successFn')
                        window.location.href=`${location.origin}/freeCharge/view/${process.env.VERSION}/share/order_no/${item.orderNo||item.order_no}/s_user_id/${self.user_info.user_id}`
                    }
                });
            }
        }
    },

};
</script>

