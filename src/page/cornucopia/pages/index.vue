<style lang="scss" scoped>
    ::-webkit-scrollbar{
        width: 0px;
        height: 0px;
        background-color: #f9f9f9;
    }

    .fix:after{
        content: '';
        display: block;
        clear: both;
    }

    .fix{
        zoom: 1;
    }

    .ell{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .myCornucopia {
        background-image: linear-gradient(0deg, #B61C09 5%, #E42A1E 85%);
        /*height: 100vh;*/
        width: 100vw;
        /*overflow: auto;*///要使用页面滚动
    }
    .wrapper{
        background-image: linear-gradient(0deg, #B61C09 5%, #E42A1E 85%);
        width: 100vw;
    }

    .fixPublic {
        position: fixed;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        top: 0;
        left: 0;
        right: 0;
        height: 34px;
        line-height: 34px;
        padding-left: 15px;
        background: #FFECD6;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #B00702;
        letter-spacing: 0;

        .closePublic {
            width: 18px;
            height: 18px;
            padding: 5px 15px;
            box-sizing: content-box;
        }
    }

    .gapPublic {
        height: 34px;
    }


    .tabFunMain{
        position: relative;
        .playStrategy{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: url("../assets/images/icon_gl@2x.png") no-repeat center;
            width: 50px;
            height: 54px;
            background-size: 100%;
        }
    }

    .tabFunPart {
        display: flex;
        justify-content: space-between;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #FFD9AA;
        letter-spacing: 0;
        line-height: 14px;
        padding: 0 57px;
        margin-bottom: 11px;

        .li {

        }

        .tabIco {
            width: 48px;
            height: 48px;
        }

        .text {
            margin-top: 8px;
        }
    }


    .part-title{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #B00702;
        letter-spacing: 0;
        height: 22px;
        line-height: 22px;
    }

    .dynamicPart {
        width: 345px;
        height: 116px;
        background: #fff;
        margin: 0 auto 13px;
        border-radius: 12px;
        padding: 13px 0 17px 0;

        .dynamicTitle{
            padding-left: 15px;
        }

        .dynamicMain{
            overflow-y: hidden;
            overflow-x :auto;
            padding-left: 15px;
            -webkit-overflow-scrolling: touch;
        }

        .list{
            margin-top: 9px;
            text-align: center;
            white-space: nowrap;
        }

        .dynamic-item{
            padding-right: 10px;
            display: inline-block;
        }

        .avatorBox{

        }

        .avator{
            width: 44px;
            height: 44px;
            border-radius: 50%;
        }

        .dynamic-btn{
            font-family: PingFangSC-Regular;
            transform: translate3d(0,-4px,0);
           /* margin-top: -4px;*/
            z-index: 9;
            font-size: 11px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            width: 54px;
            height: 18px;
            line-height: 18px;
            background-image: linear-gradient(-90deg, #FF7C6C 0%, #FF463A 93%);
            box-shadow: 0 3px 8px 0 rgba(255,106,92,0.31);
            border-radius: 10px;
            .scaleFontSize{
                width: 108px;
                height: 36px;
                line-height: 36px;
                transform: scale3d(0.5,0.5,0.5);
                transform-origin: 0 0 0;
                font-size: 20px;
            }
        }
    }



    .rankingBottomGap{
        height: 11px;
    }


    .rankingPart {
        width: 345px;
        margin: 0 auto 0;
        background: #FFFFFF;
        border-radius: 12px;
        padding: 13px 20px 17px 15px;
        .itemRank{
            display: flex;
            height: 75px;
            align-items: center;
            justify-content: space-between;
            position: relative;
        }

        .itemRank:after{
            position: absolute;
            left: 0;
            top: 74px;
            content: '';
            display: block;
            width: 100%;
            height: 1px ;
            background-color: #F0ECE1;
            transform: scale3d(1,0.5,0.5);
        }

        .itemRank:last-of-type:after{
            display: none;
        }

        .itemRankSub{
            display: flex;
            height: 100%;
            align-items: center;
        }
        .rank123Logo{
            width: 29px;
            height: 24px;
            text-align: center;
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #999999;
            letter-spacing: 0;
            margin-right: 15px;
        }
        .avator{
            width: 34px;
            height: 34px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .name{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            height: 22px;
            line-height: 22px;
            width: 137px;
        }

        .changed_num{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            letter-spacing: 0;
            height: 20px;
            line-height: 20px;
            margin-top: 4px;
            width: 137px;
        }

        .wealth{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            text-align: right;
            height: 22px;
            line-height: 22px;
            width: 80px;
        }


        .btnRank-layout{
            width: 58px;
            height: 22px;
            margin-top: 4px;
            float: right;
        }

        .btnRank{
            width: 58px;
            height: 22px;
            line-height: 22px;
            background-image: linear-gradient(90deg, #FF6452 0%, #FF463A 100%);
            box-shadow: 0 2px 5px 0 rgba(252,94,75,0.34);
            border-radius: 11px;
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
        }
    }

</style>

<template>
    <div class="myCornucopia">
        <msgBox :msgTxt="msgTxt"></msgBox>
        <pullUpBox class="wrapper" :data="rankingList" @loadMore="loadData">
            <div class="gapPublic" v-if="!isNotice"></div>
            <div class="fixPublic" v-if="!isNotice" @click="openNotice">打开推送通知，实时接收财气领取提醒！
                <img src="../assets/images/close_icon_red@2x.png" alt="" class="closePublic" @click.stop="isNotice=true">
            </div>
            <mainPart :wealth_list="wealth_list" :bubbleList="bubbleList" :my_wealth="my_wealth" @bubbleTap="bubbleTap" ref="mainPart"></mainPart>



            <!--功能选择部分-->
            <div class="tabFunMain">
                <ul class="tabFunPart">
                    <li v-for="(item,index) in tabFunList" @click="tabFunTap(item)" class="li" :key="index">
                        <div><img :src="item.img" alt="" class="tabIco"></div>
                        <div class="text">{{item.text}}</div>
                    </li>
                </ul>
                <!--玩法攻略-->
                <div class="playStrategy" @click="playStrategyShow=true"></div>
            </div>


            <!--我的动态-->
            <div class="dynamicPart" v-if="dynamicList.length">
                <div class="part-title dynamicTitle">我的动态</div>
                <div class="dynamicMain">
                    <ul class="list fix">
                        <li v-for="(item,index) in dynamicList" class="dynamic-item" :key="index" @click="toCheckingFriends(item)">
                            <div class="avatorBox">
                                <img :src="item.avatar" alt="" class="avator" :onerror="imgError">
                            </div>
                            <div class="dynamic-btn">
                                <div class="scaleFontSize">领走{{item.wealth}}财气</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!--排行榜-->
            <div class="rankingPart" v-if="rankingList.length">
                <div class="part-title">排行榜</div>
                <ul>
                    <li v-for="(item,index) in rankingList" :key="index" class="itemRank" @click="toCheckingFriends(item)">
                        <div class="itemRankSub">
                            <div class="rank123Logo">
                                <img src="../assets/images/no1@2x.png" alt="" v-if="index==0" class="rank123Logo">
                                <img src="../assets/images/no2@2x.png" alt="" v-if="index==1" class="rank123Logo">
                                <img src="../assets/images/no3@2x.png" alt="" v-if="index==2" class="rank123Logo">
                                <div v-if="index>2" class="rank123Logo">{{index+1}}</div>
                            </div>
                            <div class="avator">
                                <!--<img  alt="" class="avator" v-lazy="item.avatar" :key="item.avator"/>-->
                                <img  alt="" class="avator" :src="item.avatar"  :onerror="imgError"/>
                            </div>
                            <div>
                                <div class="name ell">{{item.nickname || item.user_name}}</div>
                                <div class="changed_num ell">免费兑换了{{item.changed_num || 0}}件宝贝</div>
                            </div>
                        </div>

                        <div>
                            <div class="wealth ell">{{item.wealth}}财气</div>
                            <div class="btnRank-layout">
                                <div class="btnRank" v-if="item.is_receivable == 1 && item.userId != user_id">收Ta的</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="rankingBottomGap"></div>
            <playStrategy :modelShow.sync="playStrategyShow"></playStrategy>
        </pullUpBox>
    </div>
</template>

<script>
    import msgBox from '@/components/msgBox'
    import { myDynamic, charts,myCornucopia,getBubble } from "./../assets/js/api.js";
    import {getQueryString, changeTitle,shareToWxMini,jump2home,_disScroll} from '@/assets/js/common/utils'
    import {toList,toCheckingFriends} from '../assets/js/url.js'

    import mainPart from '../components/bubble'
    import bubbleMin , { transTime} from '@/page/cornucopia/assets/mixin/bubble'
    import playStrategy from './rulePopup'
    import pullUpBox from "@/components/pullUpBox";
    export default {
        name: 'myCornucopia',
        mixins:[bubbleMin],
        data() {
            return {
                user_id:getQueryString('user_id'),
                uuid:getQueryString('uuid'),
                token:getQueryString('token'),
                os:getQueryString('os'),
                inviter:getQueryString('inviter'),
                playStrategyShow:false,
                my_wealth:-1,//不能為0
                isNotice: true,
                title: '聚宝盆',
                msgTxt: '',
                wealth_list: [],
                tabFunList: [
                    {
                        text: '邀友领财气',
                        img: require('../assets/images/icon_hyzcq@2x.png'),
                        fun: 'invitation'
                    },
                    {
                        text: '下单赚财气',
                        img: require('../assets/images/icon_xdzcq@2x.png'),
                        fun: 'order'
                    },
                    {
                        text: '财气兑宝贝',
                        img: require('../assets/images/icon_jbpdh@2x.png'),
                        fun: 'exchange'
                    },
                ],
                bubbleList: [],
                dynamicList:[],
                rankingList:[],
                next_page_rank:1,
                // imgError:require('../assets/images/user_head@2x.png'),
                imgError: 'this.src="' + require('../assets/images/user_head@2x.png') + '"'
            }
        },
        watch:{
            playStrategyShow(){
                _disScroll(this.playStrategyShow)
            }
        },
        components: {
            mainPart,
            msgBox,
            playStrategy,
            pullUpBox
        },
        mounted(){
            _disScroll(this.playStrategyShow)
        },
        activated(){

        },
        created() {
            // this.testData();
            this.initData();

            //是否开启通知   先判断 ios 还是安卓
            try {
                if(getQueryString("session_id")){
                    this.isNotice = true;
                } else if (getQueryString("os") == "ios") {
                    this.isNotice = getPushStatus();
                } else {
                    this.isNotice = Number(JS.getPushStatus());
                }
            } catch (error) {
                console.log('浏览器打开')
            }
        },
        methods: {
            testData(){
                setTimeout(() => {
                    this.bubbleList = [
                        {
                            wealth: 2,
                            time: 0,
                            bubble_cate:'每日签到'
                        },
                        {
                            wealth: 2,
                            time: 0,
                            bubble_cate:'每日签到'
                        },
                        {
                            wealth: 2,
                            time: 5,
                            bubble_cate:'每日签到'
                        },
                        {
                            wealth: 2,
                            time: 0,
                            bubble_cate:'每日签到'
                        },
                        {
                            wealth: 2,
                            time: 0,
                            bubble_cate:'每日签到'
                        },
                        {
                            wealth: 2,
                            time: 0,
                            bubble_cate:'每日签到'
                        },
                        {
                            wealth: 2,
                            time: 0,
                            bubble_cate:'每日签到'
                        },
                        {
                            wealth: 2,
                            time: 2000,
                            bubble_cate:'每日签到'
                        },
                        // {
                        //     wealth: 2,
                        //     time: 0,
                        //     bubble_cate:'每日签到'
                        // },
                        // {
                        //     wealth: 2,
                        //     time: 0,
                        //     bubble_cate:'每日签到'
                        // },
                    ];
                    this.setBubbleList();
                    this.wealth_list = [
                        {
                            img_url: require('../assets/images/banner_01@2x.png'),
                            notArrivedImg:require('../assets/images/banner_01_gray@2x.png'),
                            wealth: 100,
                        },
                        {
                            img_url: require('../assets/images/banner_02@2x.png'),
                            notArrivedImg:require('../assets/images/banner_01_gray@2x.png'),
                            wealth: 300,
                        },
                        {
                            img_url: require('../assets/images/banner_03@2x.png'),
                            notArrivedImg:require('../assets/images/banner_01_gray@2x.png'),
                            wealth: 600,
                        },
                        {
                            img_url: require('../assets/images/banner_04@2x.png'),
                            notArrivedImg:require('../assets/images/banner_01_gray@2x.png'),
                            wealth: 1200,
                        },
                        {
                            img_url: require('../assets/images/banner_05@2x.png'),
                            notArrivedImg:require('../assets/images/banner_01_gray@2x.png'),
                            wealth: 2000,
                        }
                    ];
                    this.dynamicList=[
                        {
                            user_id:1,
                            avatar:'',//
                            wealth:'1',//领走财气值
                        },
                        {
                            user_id:1,
                            avatar:require('../assets/images/1.png'),//
                            wealth:'1',//领走财气值
                        },
                        {
                            user_id:1,
                            avatar:require('../assets/images/1.png'),//
                            wealth:'1',//领走财气值
                        },
                        {
                            user_id:1,
                            avatar:require('../assets/images/1.png'),//
                            wealth:'1',//领走财气值
                        },
                        {
                            user_id:1,
                            avatar:require('../assets/images/1.png'),//
                            wealth:'1',//领走财气值
                        },
                        {
                            user_id:1,
                            avatar:require('../assets/images/1.png'),//
                            wealth:'1',//领走财气值
                        },
                        {
                            user_id:1,
                            avatar:require('../assets/images/1.png'),//
                            wealth:'1',//领走财气值
                        },
                        {
                            user_id:1,
                            avatar:require('../assets/images/1.png'),//
                            wealth:'1',//领走财气值
                        },
                    ];
                    this.rankingList=[
                        {
                            user_id:'',
                            nickname:'',//用户昵称  用户昵称为空的时候拿用户名
                            user_name:'ddd用户昵称为空的时候拿用户名',//用户名
                            avatar:require('../assets/images/1.png'),
                            wealth:'555',//财气
                            is_receivable:'1',//1可收取  0不可收取
                            changed_num:'44444',//兑换商品数量
                        },
                        {
                            user_id:'',
                            nickname:'',//用户昵称为空的时候拿用户名
                            user_name:'ddd',//用户名
                            avatar:require('../assets/images/1.png'),
                            wealth:'5555',//财气
                            is_receivable:'0',//1可收取  0不可收取
                            changed_num:'444',//兑换商品数量
                        },
                        {
                            user_id:'',
                            nickname:'',//用户昵称为空的时候拿用户名
                            user_name:'ddd',//用户名
                            avatar:require('../assets/images/1.png'),
                            wealth:'dd555',//财气
                            is_receivable:'0',//1可收取  0不可收取
                            changed_num:'4',//兑换商品数量
                        },
                        {
                            user_id:'',
                            nickname:'',//用户昵称为空的时候拿用户名
                            user_name:'ddd',//用户名
                            avatar:require('../assets/images/1.png'),
                            wealth:'555',//财气
                            is_receivable:'1',//1可收取  0不可收取
                            changed_num:'44444',//兑换商品数量
                        },
                        {
                            user_id:'',
                            nickname:'',//用户昵称为空的时候拿用户名
                            user_name:'ddd',//用户名
                            avatar:require('../assets/images/1.png'),
                            wealth:'55dddd5',//财气
                            is_receivable:'1',//1可收取  0不可收取
                            changed_num:'4',//兑换商品数量
                        }
                    ];
                }, 1500);

                setTimeout(()=>{
                    this.my_wealth = 2226
                },2000)

            },
            initData(){
                this.myCornucopiaAjax();
                this.myDynamicAjax();
                this.chartsAjax();
            },
            loadData() {
                console.log('加载更多');
                if(this.next_page_rank != 0){
                    this.chartsAjax();
                }
            },
            //我的动态
            myDynamicAjax(){
                let params = {
                    user_id:this.user_id,
                    uuid:this.uuid,
                    token:this.token,
                };
                this.$http.get(myDynamic, { params }).then(res => {
                    if (res.data.result == 1) {
                        this.dynamicList = res.data;
                    } else {
                        this.msgTxt = res.message;
                    }
                }).catch(error=>{
                    console.log(error);
                    this.msgTxt = '请稍后再试';
                });
            },
            //排行榜
            chartsAjax(){
                let params = {
                    user_id:this.user_id,
                    uuid:this.uuid,
                    token:this.token,
                    page:this.next_page_rank
                };
                this.$http.get(charts, { params }).then(res => {
                    if (res.data.result == 1) {
                        // this.rankingList = res.data.data.list.map(item=>{
                        //     item.error=this.imgError;
                        //     item.src=item.avatar;
                        //     return item
                        // });
                        this.rankingList = this.rankingList.concat(res.data.data.list);
                        this.next_page_rank = res.data.data.next_page
                    } else {
                        this.msgTxt = res.message;
                    }
                }).catch(error=>{
                    console.log(error);
                    this.msgTxt = '请稍后再试';
                });
            },
            //我的聚宝盆
            myCornucopiaAjax(){
                let params = {
                    user_id:this.user_id,
                    uuid:this.uuid,
                    token:this.token,
                    os:this.os,
                    inviter:this.inviter
                };
                this.$http.get(myCornucopia, { params }).then(res => {
                    if (res.data.result == 1) {
                        let data = res.data.data;
                        this.my_wealth = data.my_wealth;
                        this.nickname = data.nickname;
                        this.wealth_list = data.wealth_list;
                        this.bubbleList = data.bubble_list.splice(0,10);
                        this.setTitle();
                        this.setBubbleList();
                    } else {
                        this.msgTxt = res.data.message;
                    }
                }).catch(error=>{
                    console.log(error);
                    this.msgTxt = '请稍后再试';
                });
            },
            //领取气泡
            getBubbleAjax(item){
                item.collectSuccess = true;
                this.bubbleList = this.bubbleList.filter((itemP)=>{
                    return itemP
                });
                let params = {
                    user_id:this.user_id,
                    uuid:this.uuid,
                    token:this.token,
                    os:this.os,
                    bubble_id:item.bubble_id,
                };
                this.$http.get(getBubble, { params }).then(res => {
                    if (res.data.result == 1) {
                        this.my_wealth = res.data.data.total_wealth;
                        let timer = setTimeout(()=>{
                            this.bubbleList = this.bubbleList.filter((itemP,index)=>{
                                return itemP.bubble_id != item.bubble_id
                            });
                            clearTimeout(timer)
                        },2000)
                    } else {
                        item.collectSuccess = false;
                        this.msgTxt = res.data.message;
                    }
                }).catch(error=>{
                    item.collectSuccess = false;
                    console.log(error);
                    this.msgTxt = '请稍后再试';
                });
            },
            bubbleTap(item){
                if(item.time!=0){
                    let minute = transTime(item.time).minute;
                    minute = minute>1 ? minute:'1';
                    this.msgTxt = parseInt(minute)+ '分钟后可收取'
                }else{
                    this.getBubbleAjax(item)
                }
            },
            tabFunTap(item) {
                switch (item.fun) {
                    case 'invitation':
                        let url = 'https://'+ location.host+'/cornucopia/view/'+process.env.VERSION +'/index/user_id/'+ this.user_id + '/uuid' +this.uuid + '/token' + this.token +'/inviter' + this.user_id + '/os' + this.os;
                        let miniUrl = '/packageA/pages/home/activity/cornucopia/cornucopia?user_id='+this.user_id + '&uuid='+this.uuid + '&token' + this.token + '&inviter' + this.user_id
                        shareToWxMini({
                            content: '真的有个聚宝盆，每天来看看，就有宝贝免费拿哦~',
                            title: '淘集集',
                            wxMiniPath: miniUrl,
                            miniPath:miniUrl,
                            shareUrl: url,
                            imgUrl: require('../assets/images/icon_share@2x.png'),
                            // isMiniFn: () => {
                            //     this.msgTxt = '请使用自带的分享功能哦～';
                            // }
                        });
                        break;
                    case 'order':
                        jump2home();
                        break;
                    case 'exchange':
                        this.$router.push(toList);
                        break
                }

            },
            setTitle() {
                let title = this.nickname + '的聚宝盆' || '聚宝盆';
                this.$route.meta.title = title;
                changeTitle(title);
            },
            openNotice(){
                if (getQueryString("session_id")) {//小程序没有通知

                } else {
                    try {
                        // 先判断 ios 还是安卓
                        if (getQueryString("os") == "ios") {
                            if (!Number(getPushStatus())) {
                                startPushSet();//开启通知
                            } else {
                                this.msgTxt = " 已经设置过消息通知";
                            }
                        } else {
                            if (!Number(JS.getPushStatus())) {
                                startPushSet();//开启通知
                            } else {
                                this.msgTxt = " 已经设置过消息通知";
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            toCheckingFriends(item){
                if(item.userId != this.user_id){
                    this.$router.push(
                        `${toCheckingFriends}/gf_user_id/`+item.userId,
                    );
                }
            }
        },
    }
</script>
