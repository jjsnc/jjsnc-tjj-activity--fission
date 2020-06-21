<style lang="scss" scoped>
.luckyDetail{
    bottom: inherit;
    height: 100%;
}
    .redBags{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #000;
        color: #fff;
        .redBags-box{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 338px;
            height: 369px;
            padding-top: 38px;
            background-image: url(./../assets/images/lotto_bg@2x.png);
            background-size: cover;
            text-align: center;
            animation: redBags 1.2s infinite;
            .sponsor-info{
                margin-bottom: 21px;
                color: #FFF1B0;
                font-size: 18px;
                line-height: 18px;
                img{
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    margin-bottom: 10px;
                }
            }
            .redBags-tip{
                margin-bottom: 6px;
                font-size: 14px;
                color: #FFF1B0;
                line-height: 16px;
            }
            .redBags-wishes{
                width: 277px;
                height: 80px;
                margin: 0 auto 11px;
                padding: 12px 29.5px 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: url(./../assets/images/lotto_bg2@2x.png);
                background-size: cover;
                font-size: 14px;
                color: #713F01;
                line-height: 20px;
                p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            .redBags-btn{
                width: 238px;
                height: 54px;
                margin: 0 auto;
                background-image: url(./../assets/images/redpacket_chou@2x.png);
                background-size: cover;
            }
        }
    }
    @keyframes redBags{
        0%{transform: translate(-50%,-50%) rotateZ(0) scale(1,1)}
        20%{transform: translate(-50%,-50%) rotateZ(5deg) scale(1.05,1.05)}
        40%{transform: translate(-50%,-50%) rotateZ(-5deg) scale(1,1)}
        60%{transform: translate(-50%,-50%) rotateZ(5deg) scale(1,1)}
        80%{transform: translate(-50%,-50%) rotateZ(-5deg) scale(1,1)}
        100%{transform: translate(-50%,-50%) rotateZ(0) scale(1,1)}
    }
    .lucky-content{
        min-height: 100%;
        padding-top: 26px;
        padding-bottom: 20px;
        background-color: rgb(219, 35, 49);
        background-image: url(./../assets/images/nianhuo_bg2@2x.png);
        background-size: 100% auto;
        background-position: top center;
        background-repeat: no-repeat;
        color: #333;
        .lucky-stats{
            margin-bottom: 16px;
            font-size: 20px;
            color: #FFF1B0;
            text-align: center;
            line-height: 20px;
        }
        .sponsor-info{
            height: 112px;
            text-align: center;
            img{
                display: block;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                margin: 0 auto 4px;
            }
            .sponsor-wishes-tit{
                font-size: 14px;
                line-height: 16px;
                margin-bottom: 5px;
            }
            .sponsor-wishes{
                margin: 0 auto;
                width: 80%;
                font-size: 14px;
                line-height: 18px;
                font-weight: bolder;
            }
        }
        .goods-box{
            width: 360px;
            height: 140px;
            margin: 18px auto 10px;
            padding: 8px;
            background-color: #fff;
            border-radius: 4px;
            display: flex;
            .goods-img{
                flex: 0 0 124px;
                height: 124px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .goods-info{
                flex: 1;
                padding: 5px 0;
                margin-left: 9px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .goods-name{
                    font-size: 14px;
                    line-height: 22px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .goods-price{
                    font-size: 18px;
                    color: #e00;
                    line-height: 18px;
                    small{
                        font-size: 12px;
                    }
                }
            }
        }
        .user-box{
            width: 360px;
            margin: 0 auto 16px;
            padding: 26px 20px;
            background-color: #fff;
            border-radius: 4px;
            .user-box-tip{
                // font-weight: bold;
                font-size: 16px;
                text-align: center;
                line-height: 16px;
            }
            &.show-all{
                .user-list{
                    max-height: initial;
                }
                .user-box-more{
                    transform: rotateZ(180deg);
                }
            }
            .user-list{
                display: flex;
                justify-content: center;
                padding-top: 10px;
                flex-wrap: wrap;
                max-height: 126px;
                overflow: hidden;
                .user-item{
                    flex: 0 0 48px;
                    height: 48px;
                    margin: 10px 10px 0;
                    border-radius: 50%;
                    overflow: hidden;
                    &:last-child{
                        margin-right: 0;
                    }
                    &:first-child{
                        margin-left: 0;
                    }
                    &:nth-child(5n){
                        margin-right: 0;
                    }
                    &:nth-child(5n+1){
                        margin-left: 0;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
            }
            .user-box-more{
                width: 38px;
                height: 11px;
                padding: 0 10px;
                margin: 14px auto 0;
                background-image: url(./../../../assets/images/common/icon_more_down@2x.png);
                background-size: 18px 11px;
                background-position: center center;
                background-repeat: no-repeat;
                transition: all .3s;
            }
        }
        .success-user-box{
            width: 360px;
            margin: 0 auto 16px;
            padding: 26px 20px;
            background-color: #fff;
            border-radius: 4px;
            .user-box-tip{
                margin-bottom: 10px;
                font-weight: bold;
                font-size: 16px;
                color: #FF6632;
                text-align: center;
                line-height: 16px;
            }
            .user-box-time{
                margin-bottom: 20px;
                font-size: 12px;
                color: #757575;
                text-align: center;
                line-height: 12px;
            }
            .lucky-user{
                width: 61px;
                height: 70px;
                padding-top: 19px;
                padding-left: 6px;
                margin: 0 auto;
                background-image: url(./../assets/images/icon_hg@2x.png);
                background-size: cover;
                img{
                    width: 48px;
                    height: 48px;
                    display: block;
                    border-radius: 50%
                }
            }
            .user-list{
                width: 216px;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                overflow: hidden;
                .user-item{
                    flex: 0 0 32px;
                    height: 32px;
                    margin: 14px 7px 0;
                    border-radius: 50%;
                    overflow: hidden;
                    &:last-child{
                        margin-right: 0;
                    }
                    &:first-child{
                        margin-left: 0;
                    }
                    &:nth-child(5n){
                        margin-right: 0;
                    }
                    &:nth-child(5n+1){
                        margin-left: 0;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
            }
            .user-box-more{
                width: 38px;
                height: 11px;
                padding: 0 10px;
                margin: 14px auto 0;
                background-image: url(./../../../assets/images/common/icon_more_down@2x.png);
                background-size: 18px 11px;
                background-position: center center;
                background-repeat: no-repeat;
                transition: all .3s;
            }
        }
        .lucky-btn{
            width: 340px;
            height: 64px;
            margin: 0 auto;
            font-size: 16px;
            color: #713F01;
            letter-spacing: 2px;
            text-align: center;
            line-height: 52px;
            font-weight: bold;
            background-image: url(./../assets/images/redpacket_free@2x.png);
            background-size: cover;
        }
        .invite-txt{
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            color: #FFF1B0;
            padding-bottom: 6px;
        }
        // 更多商品列表
        .goods-more{
            width: 95.7%;
            margin: 10px auto 0;
            padding: 15px 10px;
            background: #FFFFFF;
            border-radius: 6px;
            .goods-more-title{
                width: 305px;
                margin: 0 auto 15px;
                font-weight: bold;
                font-size: 18px;
                color: #EE0000;
                letter-spacing: 2.4px;
                text-align: center;
                line-height: 24px;
                background: url(./../assets/images/left@3x.png) left center no-repeat,
                            url(./../assets/images/right@3x.png) right center no-repeat;
                background-size: 84px auto;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li{
                    flex: 0 0 165px;
                    // height:15.2rem;
                    margin-top: 0.38rem;
                    background-color: #fff;
                    position: relative;
                    .db12{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 2.31rem;
                        height: 2.13rem;
                    }
                    img{
                        display: block;
                        width: 165px;
                        height: 165px;
                    }
                    .other_goods_name{
                        padding: 0 0.5rem;
                        width: 165px;
                        height: 2rem;
                        margin: 0.25rem 0 9px;
                        font-size: 0.75rem;
                        color: #333;
                        line-height: 1rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .u-like-btm{
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        padding: 0 0.5rem 0.44rem;
                        .u-like-info{
                            // height: 1.14rem;
                            p{
                                font-size: 16px;
                                font-weight: bold;
                                color: #EE0000;
                                small{
                                    font-size: 10px;
                                }
                            }
                        }
                        .u-like-btn{
                            flex: 0 0 66px;
                            height: 26px;
                            font-size: 12px;
                            color: #713F01;
                            line-height: 26px;
                            text-align: center;
                            background-image: linear-gradient(-90deg, #FACEA0 0%, #FDEABF 100%);
                            border-radius: 4px;
                        }
                    }
                }
            }
        }
        // 领取成功弹窗
        .lucky-success-box{
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
            background-color: rgba(0, 0, 0, .5);
            .lucky-success-cont{
                width: 327px;
                height: 456px;
                padding-top: 45px;
                position: relative;
                top: 50%;
                margin: 0 auto;
                transform: translateY(-50%);
                border-radius: 10px;
                background-image: url(./../assets/images/redpacket@2x.png);
                background-size: cover;
                text-align: center;
                .l-s-close{
                    position: absolute;
                    top: -38px;
                    right: 18px;
                    width: 25px;
                    height: 38px;
                    background-image: url(./../assets/images/close@2x.png);
                    background-size: cover;
                }
                .l-s-stats{
                    margin-bottom: 25px;
                    font-size: 20px;
                    color: #FF6632;
                    line-height: 20px;
                    font-weight: bold;
                }
                .l-s-img{
                    margin-bottom: 17.5px;
                    width: 142.5px;
                    height: 142.5px;
                }
                .l-s-tip1{
                    margin-bottom: 12px;
                    font-size: 16px;
                    color: #333333;
                    line-height: 24px;
                    font{
                        color: #FF6632;
                    }
                }
                .l-s-tip2{
                    font-size: 11px;
                    color: #757575;
                    line-height: 11px;
                }
                .l-s-btn{
                    position: absolute;
                    left: calc(50% - 119px);
                    bottom: 11px;
                    width: 238px;
                    height: 54px;
                    background-image: url(./../assets/images/redpacket_choose@2x.png);
                    background-size: cover;
                }
            }
        }
    }
</style>

<template>
    <div class="luckyDetail">
        <div v-show="haveData" style="height: 100%;">

            <!-- 红包（未领取） -->
            <div v-if="luckyData.isTips" class="redBags" @touchmove.prevent>
                <div class="redBags-box">
                    <div class="sponsor-info">
                        <img :src="luckyData.shareUserIcon" alt="">
                        <p>{{luckyData.shareUserName}}</p>
                    </div>
                    <div class="redBags-tip">{{luckyData.tipsText}}</div>
                    <div class="redBags-wishes">
                        <p>{{luckyData.shareBlessing}}</p>
                    </div>
                    <div class="redBags-btn" @click="joinLuck"></div>
                </div>
            </div>
            <!-- 详情（已领取） -->
            <div v-else class="lucky-content">
                <div class="lucky-stats">
                    <span v-if="luckyData.status == 1 && myLucky">恭喜你抢到了礼物!</span>
                    <span v-else-if="luckyData.status == 1 && !myLucky">很遗憾，礼物被别人抢走啦～</span>
                    <span v-else-if="luckyData.status == 2">很遗憾，送礼已失效～</span>
                    <span v-else-if="luckyData.status == 3 && myLucky">礼物超时未领取，已失效</span>
                    <span v-else-if="luckyData.status == 3 && !myLucky">很遗憾，礼物被别人抢走啦～</span>
                    <span v-else-if="luckyData.status == 4 && myLucky">恭喜你抢到了礼物!</span>
                    <span v-else-if="luckyData.status == 4 && !myLucky">很遗憾，礼物被别人抢走啦～</span>
                    <span v-else>参与成功，等待开奖</span>
                </div>
                <!-- 祝福 -->
                <div class="sponsor-info">
                    <img :src="luckyData.shareUserIcon" alt="">
                    <p class="sponsor-wishes-tit">{{luckyData.shareUserName}}送出一份礼物给大家 —</p>
                    <p class="sponsor-wishes">{{luckyData.shareBlessing}}</p>
                </div>
                <!-- 礼物信息 -->
                <div class="goods-box">
                    <div class="goods-img">
                        <img :src="luckyData.goodsImg" alt="">
                    </div>
                    <div class="goods-info">
                        <div class="goods-name">{{luckyData.goodsName}}</div>
                        <div class="goods-price"><small>¥</small>{{luckyData.shopPrice}}</div>
                    </div>
                </div>
                <!-- 未开奖用户列表 -->
                <div v-if="luckyData.status == 0 || luckyData.status == 2" :class="['user-box', showAll ? 'show-all' : '']">
                    <div class="user-box-tip">
                        <span v-if="luckyData.status == 0">已有{{luckyData.currentNum}}人参与，{{luckyData.maxNum}}人参与立即开奖</span>
                        <span v-if="luckyData.status == 2">3小时内没有足够用户参与抽奖，已失效</span>
                    </div>
                    <div class="user-list">
                        <div class="user-item" v-for="(item,index) in luckyData.userIconArr" :key="index">
                            <img :src="item" :alt="item"/>
                        </div>
                    </div>
                    <div v-if="luckyData.userIconArr.length > 10" class="user-box-more" @click="toggleShowAll"></div>
                </div>
                <!-- 已开奖用户列表 -->
                <div v-else-if="luckyData.status == 1 || luckyData.status == 3 || luckyData.status == 4" class="success-user-box">
                    <div class="user-box-tip">{{luckyData.userHitArr.nickname}}运气爆棚，抢到了这件礼品</div>
                    <div class="user-box-time">{{luckyData.userHitArr.createTime}}</div>
                    <div class="lucky-user">
                        <li><img :src="luckyData.userHitArr.avatar" alt=""></li>
                    </div>
                    <div class="user-list">
                        <div class="user-item" v-for="(item,index) in luckyData.userIconArr" :key="index">
                            <img :src="item" :alt="item"/>
                        </div>
                    </div>
                </div>
                
                <div v-if="luckyData.status == 1 && myLucky" class="lucky-btn" @click="getAnnual">
                    <span>免费领取礼物</span>
                </div>
                <div v-else class="lucky-btn" @click="toDownload">
                    <span v-if="luckyData.status == 2">去看看免费礼物</span>
                    <span v-else>我也要免费送礼物</span>
                </div>
                <!--  v-if="luckyData.status == 0 " -->
                <div class="invite-txt">
                    你的好友也可以通过此链接参与到本次抽奖中哦
                </div>
                <!-- 领取礼物成功弹窗 -->
                <div v-show="successShow" class="lucky-success-box" @touchmove.prevent>
                    <div class="lucky-success-cont">
                        <div class="l-s-close" @click="closeSuccess"></div>
                        <div class="l-s-stats">礼物领取成功!</div>
                        <img class="l-s-img" :src="luckyData.goodsImg" alt="">
                        <div class="l-s-tip1">
                            可前往<font>淘集集App</font>——我的订单<br>中查看物流详情。
                        </div>
                        <div class="l-s-tip2">礼尚往来，可以挑选一份礼物免费送给好友哦！</div>
                        <div class="l-s-btn" @click="toDownload"></div>
                    </div>
                </div>
                <!-- 更多礼物精选 -->
                <div class="goods-more" v-if="goodsListData.length > 0">
                    <div class="goods-more-title">免费礼物精选</div>
                    <ul>
                        <li v-for="(item, index) in goodsListData" :key="index" @click="toDownload">
                            <img class="lazy" v-lazy="item.imgUrl" alt="">
                            <div class="other_goods_name">{{item.goodsName}}</div>
                            <div class="u-like-btm">
                                <div class="u-like-info">
                                    <p><small>¥</small>{{item.groupPrice}}</p>
                                </div>
                                <div class="u-like-btn">免费送礼</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <singleBtnAlert :alertObj="alertObj"></singleBtnAlert> -->
        <prompt :promptObj="promptObj"></prompt>
        <addressCheck
            v-if="luckyData.status == 1 && myLucky"
			@submitAddress="submitAddress"
			@returnAddressId="returnAddressId"
			:addressShow="addressShow"
            :setDefault="false"
            :data="addressDefalut"
		></addressCheck>
        <lucyLess :popShow="popShow"></lucyLess>
    </div>
</template>

<script>
    // import singleBtnAlert from '@/components/singleBtnAlert'
    import prompt from '@/components/prompt'
    import addressCheck from '@/components/addressCheck'
    import lucyLess from './lucyLess'
    import {getQueryString, _getTjjUuid, jump2Login, _getUserInfo } from '@/assets/js/common/utils'
    import {luckInfo, addLuck, goodsList, createOrder, wxLogin, checkToken} from './../assets/js/api.js'
    import {toDownload} from './../assets/js/url.js'
    import Wechat_api from '@/assets/js/common/wechat_api.js?v=1'
    // import '@/assets/js/common/jweixin-1.4.0.js'
    export default {
        name: 'luckyDetail',
        components: {
            // singleBtnAlert,
            addressCheck,
            prompt,
            lucyLess
        },
        data(){
            return {
                annual_id: getQueryString('annual_id'),
                luckyData: {},
                addressDefalut:[],
                goodsListData: [], //更多礼物列表
                page: 1,
                isLoadMore: false,
                haveData: false,
                showAll: false,
                successShow: false,
                alertObj: {},
                promptObj: {},
                addressShow: false,
                popShow:false,
                myLucky: false,
                uuid: _getTjjUuid(),
                user_info: _getUserInfo()
            }
        },
        created(){
            if(getQueryString('wxLoginBack') == 0){
                this.$msgBox.msgTxt(decodeURI(getQueryString('wxLoginMessage')) || '微信授权登录失败，请退出重新进入');
                return;
            }
            if(this.user_info.uuid && this.user_info.token && this.user_info.user_id){
                this.checkToken();
                return;
            }
            jump2Login({loginParams:`/annual_id/${this.annual_id}`});
        },
        methods: {
            checkToken(){
                let params = {
                    app_resource: 0
                };
                this.$http.get(checkToken,{params}).then(res => {
                    console.log(res)
                    let data = res.data;
                    if(data && data.result == 1){ // 登录未失效
                        this.getData();
                        this.getGoodsList();
                        return;
                    }else if(data && data.result == 0){
                        jump2Login({loginParams:`/annual_id/${this.annual_id}`});
                    }else{
                        this.$msgBox.msgTxt((res && res.data && res.data.message) || '网络错误');
                    }
                })
            },
            // 请求礼物详情数据
            getData(){
                let params = {
                    annual_id: this.annual_id
                }
                this.$http.get(luckInfo, {params}).then(res => {
                    console.log(res,'请求礼物数据')
                    let data = res.data;
                    if(data && data.result == 1){
                        this.haveData = true;
                        this.luckyData = data.data;
                        if(this.luckyData.status == 1||this.luckyData.status == 3||this.luckyData.status == 4){
                            let my_user_id = this.user_info.user_id;
                            this.myLucky = (my_user_id == this.luckyData.userHitArr['userId']);
                        }
                        // if(this.luckyData.status != 2 && this.luckyData.status != 0 &&  !this.myLucky){
                        //     this.popShow=true;
                        // }
                        // 初始化分享
                        new Wechat_api({
                            shareJson: {
                                title: '我发起了礼物抽奖给大家，快来免费抢！', // 分享标题
                                link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: this.luckyData.goodsImg, // 分享图标
                                desc: this.luckyData.goodsName+"\n"+this.luckyData.maxNum+"人参与，必有1人中奖",
                            }
                        })

                        // 数据埋点
                        let data_s = {
                            code: 'NH1',
                            query: {
                                name: "免费送礼物",
                            }
                        };
                        switch (this.luckyData.status) {
                            case '0': //0 抽奖进行中　
                                data_s.extra = {
                                    param1: this.luckyData.isTips ? 10 : 4
                                }
                                console.log(data_s.extra)
                                break;
                            case '1': //1开奖成功　
                                data_s.extra = {
                                    param1: this.myLucky ? 6 : 5
                                }
                                break;
                            case '2': //2开奖失败 
                                data_s.extra = {
                                    param1: 8
                                }
                                break;
                            case '3': //3:超过3个小时消失未领取 
                                data_s.extra = {
                                    param1: 9
                                }
                                break;
                            case '4': //4领取成功
                                data_s.extra = {
                                    param1: 7
                                }
                                break;
                            default:
                                break;
                        }
                        this.$tapConfig.batchClick(0,data_s,0)
                    }else{
                        this.$msgBox.msgTxt((res && res.data && res.data.message) || '网络错误');
                    }
                })
            },
            // 参加礼物抽奖
            joinLuck(){
                let params = {
                    annual_id: this.annual_id
                }
                this.$http.get(addLuck, {params}).then(res => {
                    console.log(res)
                    let data = res.data;
                    if(data && data.result == 1){
                        this.getData();
                    }else{
                        this.$msgBox.msgTxt((res && res.data && res.data.message) || '网络错误');
                    }
                })

                // 数据埋点
                let data_s = {
                    code: 'NH2_1',
                    query: {
                        name: "打开连接页面",
                    }
                };
                this.$tapConfig.batchClick(0,data_s,0);
                
            },
            // 获取更多礼物数据
            getGoodsList(){
                if(this.isLoadMore || this.page > 3 || this.page < 1) return
                this.isLoadMore = true;
                let params = {page: this.page};
                this.$http.get(goodsList,{params}).then(res => {
                    console.log(res)
                    let data = res.data;
                    if(data && data.result == 1){
                        this.page = data.nextPage;
                        // this.page < data.totalPage ? this.page++ : '';
                        this.goodsListData = this.goodsListData.concat(data.goodsList);
                        setTimeout(() => {
                            this.isLoadMore = false;
                        },1000)

                    // 错误日志上报
                  try {
                       if(errorLogUpload && !this.goodsListData){
                        errorLogUpload({
                            logLevel: 3,
                            errType: 21,
                            apiError: {
                                params: JSON.stringify(params),
                                uri: location.href,
                                apiUri: goodsList,
                                data: JSON.stringify(data),
                                message: "商品列表请求失败",
                                method: 'get',
                                code: 200
                                }
                            })
                    }
                    } catch (error) {
                        
                    }

                    }else{
                        this.$msgBox.msgTxt((res && res.data && res.data.message) || '网络错误');
                    }
                })
            },
            // 领取礼物创建订单
            createOrder(id){
                let params = {
                    is_post: 1,
                    address_id: id,
                    annual_id: this.annual_id
                }
                this.$http.get(createOrder,{params}).then(res => {
                    console.log(res)
                    let data = res.data;
                    if(data && data.result == 1){
                        this.successShow = true;
                    }else{
                        this.$msgBox.msgTxt((res && res.data && res.data.message) || '网络错误');
                    }
                })
            },
            // 切换是否展示所有参加用户
            toggleShowAll(){
                this.showAll = !this.showAll;
            },
            // 关闭领取成功
            closeSuccess(){
                this.successShow = false;
                // this.alertObj = {
                //     show: true,
                //     tittle: '您需要在<font style="color: #FF6632;">淘集集App</font>内才可以<br>发起免费送礼物哦~',
                //     alertTxt: '快去下载App，免费送更多礼物给好友吧！',
                //     callBack: null,
                // }
            },
            // 领取礼物
            getAnnual(){
                this.addressShow = true;
            },
            // 选中收货地址确认弹窗
            submitAddress(params){
                console.log(params)
                let self = this;
                this.promptObj = {
                    show: true,
                    tittle: "请确认收货地址",
                    ptmTxt: params.addrTxt,
                    cancel: function() {
                        console.log("cancel");
                        self.addressShow = false;
                    },
                    success: function() {
                        self.addressShow = false;
                        console.log("success");
                        console.log(self)
                        self.createOrder(params.id)
                    }
                }
            },
            // 返回已选中收货地址
            returnAddressId(id){
                console.log(id)
            },
            toDownload(){
                // 数据埋点
                let data_s = {
                    code: 'NH1_1',
                    query: {
                        name: "免费送礼物",
                    }
                };
                this.$tapConfig.batchClick(0,data_s,0);

                this.$router.push(toDownload);
            },
            // 邀请好友
            shareToFriend(){
                this.$msgBox.msgTxt('点击右上角分享，邀请好友参与抽奖');
            }
        },
        mounted(){
            let self = this;
            window.addEventListener("scroll", function(){
                let el = document.body || document.documentElement;
                let _top = document.body.scrollTop || document.documentElement.scrollTop,
                    maxH = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),
                    _H = window.innerHeight;
                let _h = maxH - _H;
                if (_top > _h - 200 && !self.isLoadMore && self.page > 0 && self.page < 4) {
                    console.log("more");
                    self.getGoodsList();
                }
            });
            
        } 
    }
</script>
