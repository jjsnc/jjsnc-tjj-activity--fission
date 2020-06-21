<template>
    <div class="list"  :class='["list",$parent.danmuData.length > 0 ? "mt30" : ""]'>
        <pullUpBox class="wrapper" :data="list" @loadMore="loadData">
            <div class="container">
                <div class="top">
                    送礼记录
                </div>
                <div v-show="list.length < 1" class="empty-data">
                    <img src="../assets/images/quesheng@2x.png"  />
                    <div>抱歉～这里空空如也</div>
                </div>
                <ul class="goods-list">
                    <li v-for="(item, index) in list" :key="index" @click="toGiving(item.annualId)" >
                        <div class="list-item-left">
                            <img :src="item.goodsImg" class="goods-img"/>
                            <img src="../assets/images/label_fail@2x.png" class="goods-status" v-if="item.status=='2'" />
                            <img src="../assets/images/label_success@2x.png" class="goods-status"  v-if="item.status=='1'||item.status=='4'||item.status=='3'" />
                        </div>
                        <div class="list-item-right">
                            <div class="goods-name">{{item.goodsName}}</div>
                            <div class="goods-middle" v-if="item.status=='0'">
                                <div class="time"><span>{{item.time}}</span>后送礼失败</div>
                                <div class="tip">还差{{item.num}}人开奖</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='2'">
                                <div class="time"></div>
                                <div class="tip">未达到开奖人数</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='3'">
                                <div class="time">
                                     领取礼物好友
                                    <img :src="item.userIcon"  />
                                </div>
                                <div class="tip">送礼已超时</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='1'||item.status=='4'">
                                <div class="time">
                                    领取礼物好友
                                    <img :src="item.userIcon"  />
                                </div>
                                <div class="tip">送礼成功</div>
                            </div>
                            
                            <div class="goods-bottom">
                                <div class="goods-detail">
                                    送礼详情
                                </div>
                                <div class="goods-share" @click.stop="share(item,0)"  v-if="item.status=='0'">送给更多好友</div>
                                <div class="goods-btn" @click.stop="share(item,1)"  v-if="item.status!='0'">再次赠送</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </pullUpBox>
        <share :shareShow="shareShow" :goods="shareData" @sendShare="sendShare" ref="myShare"></share>
    </div>
</template>

<script >
import pullUpBox from "@/components/pullUpBox";
import { shareToWx,getQueryString} from "../assets/js/utils.js";
import share from "./share";
import { myGoodsList,orderAdd } from "./../assets/js/api.js";
import { toGivingDetail } from "./../assets/js/url.js";
export default {
    name: "myFree",
    props:{
        is_update:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            page: 1,
            hasData: false, //页面无数据不显示，只显示加载loading
            list: [], //店铺列表
            isLoadData: true, //是否加载数据
            goodsId:"",
            isEmpty: false,
            shareData:{},//分享确认框显示内容
            shareShow: false,//分享
        };
    },
    watch: {
        is_update(){
            this.getData();
        }
    },
    created() {
        this.getData();
        //统计埋点
        let data = {
            code: 'NH1',
            query: {
                name: "免费送礼物",
            },
            extra:{
                param1:3
            }
        }
        this.$tapConfig.batchClick(0,data,0)
    },
    methods: {
        loadData() {
            if (!this.isLoadData) {
				this.isLoadData = true;
				this.getData();
			}
        },

        getData() {
            if (this.page < 1) return;
            let params = {
                page: this.page
            };
            this.$http.get(myGoodsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.list = this.list.concat(data.data);
                    this.transtotime()
                    this.page = data.nextPage;
                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }

                } else {
                    this.$msgBox.msgTxt((res && res.data && res.data.message) ||
                        "商品列表请求失败");
                }
                this.isLoadData = false;
            });
        },

        getDataRequest(params){
            this.$http.get(myGoodsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.list = data.data;
                    this.page = data.nextPage;
                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }


                } else {
                    this.$msgBox.msgTxt((res && res.data && res.data.message) ||
                        "商品列表请求失败");
                }
                this.isLoadData = false;
            });
        },
        // 去商品详情页
        toGiving(id){
            this.$router.push(
                `${toGivingDetail}/annual_id/`+id,
            );
        },
        share(goods,type) {
			this.goodsId = goods.goodsId;
            this.mySpecId=goods.specId;
            
            if(type==0){
                //统计埋点
                let data_s = {
                    code: 'NH1_3',
                    query: {
                        name: "我的送礼记录",
                    },
                    extra:{
                        param1:1
                    }
                }
                this.$tapConfig.batchClick(0,data_s,0);
                let obj={
                    title:"我发起了礼物抽奖给大家，快来免费抢！",
                    content:goods["goodsName"]+"\n"+goods["maxNum"] + "人参与，必有1人中奖",
                    shareUrl:location.origin + '/newYearGift/view/v1_0_0/luckyDetail/annual_id/' + goods["annualId"],
                    imgUrl:goods["goodsImg"],
                    share_blessing:goods["shareBlessing"],
                };
                shareToWx(obj);
            }else {
                //统计埋点
                let data_s = {
                    code: 'NH1_3',
                    query: {
                        name: "我的送礼记录",
                    },
                    extra:{
                        param1:2
                    }
                }
                this.$tapConfig.batchClick(0,data_s,0);
                this.shareData={
                    goodsName:goods["goodsName"],
                    groupPrice:goods["shopPrice"],
                    imgUrl:goods["goodsImg"],
                    lotteryNum:goods["maxNum"],
                    shareBlessing:goods["shareBlessing"],
                };
                this.shareShow=true;
                //统计埋点
                let data = {
                    code: 'NH1',
                    query: {
                        name: "免费送礼物",
                    },
                    extra:{
                        param1:2
                    }
                }
                this.$tapConfig.batchClick(0,data,0)
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
                    let time = arr[key]["times"];
                    if(time>0){
                        time = parseInt(time) - 1;
                        h = this.toTwo(Math.floor((time / 60 / 60) % 24));
                        m = this.toTwo(Math.floor((time / 60) % 60));
                        s = this.toTwo(Math.floor((time) % 60));
                        arr[key]["time"]=  h + ":" + m + ":" + s;
                        arr[key]["times"]=  time;
                        self.list = arr;
                    }else{
                        // if(temp!=count&&arr[key]['status']=='0'){
                            // self.getDataRequest({page:1});
                        // }
                        // temp=count++;
                    }
                }
                if(count==arr.length) clearInterval(mycount);
                self.$forceUpdate()
            },1000)
        },
         // 确认送礼页面分享给微信好友
        sendShare(obj){
            //分享成功回调
            this.createOrder(obj);
        },
        createOrder(obj){
            let self = this;
            let os = getQueryString('os');
            let params = {
                goods_id: this.goodsId,
                spec_id: this.mySpecId,
                share_blessing:obj.share_blessing,
                num: 1,
                os: os,
            }
            this.$http.get(orderAdd, {params}).then(res => {
                let data = res.data;
                if(data["result"] == 1){
                    //统计埋点
                    let data_s = {
                        code: 'NH1_2',
                        query: {
                            name: "确认送礼页面",
                        },
                        extra:{
                            param1:data.annualId
                        }
                    }
                    self.$tapConfig.batchClick(0,data_s,0);
                    obj.shareUrl += 'annual_id/' + data.annualId;
                    shareToWx(obj);
                    this.shareShow = false;
                    // 错误日志上报
                 try {
                       if(errorLogUpload && !data.annualId){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify(params),
                                uri: location.href,
                                apiUri: orderAdd,
                                data: JSON.stringify(data),
                                message: "创建订单失败",
                                method: 'get',
                                code: 200
                                }
                            })
                    }
                    } catch (error) {
                        
                    }


                }else{
                    this.$msgBox.msgTxt((data && data.message) ? data.message : '网络失败');
                }
            })
        },
    },
 
    components: {
        share,
        pullUpBox
    }
};
</script>

<style scoped lang="scss">
.list {
    height: 100%;
    background: #db2331;
    padding-top: 16px;
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
                color: #fff;
                text-align: center;
                font-size: 16px;
                img{
                    width: 204px;
                    margin:110px auto 22px auto;
                }
            }
        .goods-list {
            padding: 12px 8px;
            background-color: #db2331;
            li {
                margin-top: 12px;
                display: flex;
                background: #fff;
                border-radius: 4px;
                align-items: center;
                height: 130px;
                &:first-child {
                    margin-top: 0;
                }
                .list-item-left {
                    flex: 0 0 117px;
                    height: 127px;
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
                    padding: 5px 10px;
                    .goods-name {
                        margin-bottom: 13px;
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
                        }
                    }
                    .goods-bottom {
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;
                        .goods-detail {
                            font-size: 14px;
                            color: #ff5a32;
                            border: 1px solid #ff5a32;
                            border-radius: 4px;
                            width: 84px;
                            height: 32px;
                            text-align: center;
                            line-height: 32px;
                            margin-right: 10px;
                        }
                        .goods-btn {
                            width: 84px;
                            height: 32px;
                            background-image: linear-gradient(
                                -270deg,
                                #fdeabf 0%,
                                #facea0 100%
                            );
                            border-radius: 4px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #713f01;
                            text-align: center;
                            line-height: 32px;
                        }
                        .goods-share{
                            background-image: linear-gradient(-180deg, #3EE945 0%, #18C21F 96%);
                            border-radius: 4px;
                            font-size: 14px;
                            color: #fff;
                            height: 32px;
                            padding: 8px 13px;
                        }
                    }
                }
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
