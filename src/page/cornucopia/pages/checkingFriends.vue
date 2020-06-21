<template>
    <div class="friends-page">
        <msgBox :msgTxt="msgTxt"></msgBox>
        <div>
            <mainPart :wealth_list="wealth_list" :bubbleList="bubbleList" :my_wealth="my_wealth" @bubbleTap="bubbleTap" :pageType="pageType" ref="mainPart"></mainPart>
        </div>
        <section class="vs-area">
            <div class="title-1">
                <img src="../assets/images/icon_cqcollect@2x.png">
            </div>
            <div class="content">
                <div class="user-info left" :class="gf_steal>my_steal ? 'active' : ''">
                    <div class="img-box">
                        <img class="logo" src="../assets/images/3.png">
                        <img class="bg" src="../assets/images/wing-left@2x.png" v-if="gf_steal>my_steal">
                    </div>
                    <p class="text">
                        <span class="">TA收取你</span>
                        <span class="number">{{gf_steal}}财气</span>
                    </p>
                </div>
                <div class="middle">
                    <img src="../assets/images/vs@2x.png">
                </div>
                <div class="user-info" :class="gf_steal<my_steal ? 'active' : ''">
                    <p class="text">
                        <span>你收取TA</span>
                        <span class="number">{{my_steal}}财气</span>
                    </p>
                    <div class="img-box">
                        <img class="logo" src="../assets/images/4.png">
                        <img class="bg" src="../assets/images/wing@2x.png" v-if="gf_steal<my_steal">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import msgBox from '@/components/msgBox'
    import mainPart from '../components/bubble'
    import bubbleMin, {transTime} from '@/page/cornucopia/assets/mixin/bubble'
    import {getQueryString, changeTitle} from '@/assets/js/common/utils'
    import {friendCornucopia,getWealth } from "./../assets/js/api.js";

    export default {
        name: "addressCheck",
        mixins: [bubbleMin],
        data(){
          return{
              user_id:getQueryString('user_id'),
              uuid:getQueryString('uuid'),
              token:getQueryString('token'),
              os:getQueryString('os'),
              gf_user_id:getQueryString('gf_user_id'),
              pageType:'friend',
              msgTxt:'',
              my_wealth:'200',
              bubbleList: [],
              wealth_list:[],
              my_steal:'',//我偷得财气值
              gf_steal:'',//好友偷我的财气值
          }
        },
        components: {
            mainPart,
            msgBox,
        },
        created() {
            // this.testData();
            this.friendCornucopiaAjax();
        },
        methods: {
            testData(){
                setTimeout(() => {
                    this.wealth_list =  [
                        {
                            img_url: require('../assets/images/banner_01@2x.png'),
                            wealth: 100,
                        },
                    ];
                    this.bubbleList = [
                        {
                            wealth: 2,
                            time: 0,
                            is_steal:1
                        },
                        {
                            wealth: 2,
                            time: 0,
                            is_steal:1
                        },
                        {
                            wealth: 2,
                            time: 5,
                            is_steal:0
                        },
                        {
                            wealth: 2,
                            time: 0,
                            is_steal:1
                        },
                        {
                            wealth: 2,
                            time: 0,
                            is_steal:1
                        },
                        {
                            wealth: 2,
                            time: 0,
                            is_steal:1
                        },
                        {
                            wealth: 2,
                            time: 0,
                            is_steal:1
                        },
                        {
                            wealth: 2,
                            time: 2000,
                            is_steal:0
                        },
                        {
                            wealth: 2,
                            time: 0,
                            is_steal:1
                        },
                        {
                            wealth: 2,
                            time: 0,
                            is_steal:1
                        },
                    ];
                    this.setBubbleList();
                }, 1000)
            },
            //好友的聚宝盆
            friendCornucopiaAjax(){
                let params = {
                    user_id:this.user_id,
                    uuid:this.uuid,
                    token:this.token,
                    os:this.os,
                    gf_user_id:this.gf_user_id
                };
                this.$http.get(friendCornucopia, { params }).then(res => {
                    if (res.data.result == 1) {
                        let data = res.data.data;
                        this.my_wealth = data.gf_wealth;//好友财气值
                        this.gf_info = data.gf_info;//好友信息
                        this.wealth_list = data.wealth_list;

                        // let bubble_list =  [
                        //     {
                        //         wealth:5,
                        //         is_steal:0,
                        //         time:0,
                        //         getFriendWealth:1
                        //     },
                        //     {
                        //         wealth:6,
                        //         is_steal:1,
                        //         time:10
                        //     },
                        // ];
                        // this.bubbleList = bubble_list;

                        this.bubbleList = data.bubble_list;
                        this.setBubbleList();
                        this.my_steal = data.my_steal;
                        this.gf_steal = data.gf_steal;
                        this.setTitle();
                    } else {
                        this.msgTxt = res.message;
                    }
                }).catch(error=>{
                    console.log(error);
                    this.msgTxt = '请稍后再试';
                });
            },
            //偷取气泡
            getWealthAjax(item){
                let params = {
                    user_id:this.user_id,
                    uuid:this.uuid,
                    token:this.token,
                    os:this.os,
                    bubble_id:item.bubble_id,
                    gf_user_id:this.gf_user_id
                };
                this.$http.get(getWealth, { params }).then(res => {
                    if (res.data.result == 1) {
                        item.getFriendWealth=res.data.get_wealth;
                        item.wealth=item.wealth - res.data.get_wealth;
                        this.bubbleList = this.bubbleList.filter((itemP)=>{
                            return itemP
                        });
                    } else {
                        this.msgTxt = res.data.message;
                    }
                }).catch(error=>{
                    console.log(error);
                    this.msgTxt = '请稍后再试';
                });
            },
            bubbleTap(item) {
                if (item.time != 0) {
                    let minute = transTime(item.time).minute;
                    minute = minute > 1 ? minute : '1';
                    this.msgTxt = parseInt(minute) + '分钟后可收取'
                } else {
                    if((item.getFriendWealth && item.getFriendWealth != 0) || item.is_steal == 0){
                        console.log('偷過的不做任何處理')
                    }else{
                        this.getWealthAjax(item);
                    }
                }
            },
            setTitle() {
                let title = this.gf_info.nickname + '的聚宝盆' || '聚宝盆';
                this.$route.meta.title = title;
                changeTitle(title);
            },
        },
    };
</script>
<style lang="scss" scoped>
    .friends-page {
        background-image: linear-gradient(0deg, #B61C09 5%, #E42A1E 85%);
        height: 100vh;
        padding-bottom: 10px;
        overflow: auto;
        .vs-area {
            width: 345px;
            height: 135px;
            margin: 0 auto;
            padding: 0 15px;
            background: #ffffff;
            border-radius: 16px;

            .title-1 {
                text-align: center;
                padding: 16px 0 14px;

                img {
                    width: 188px;
                    height: 19px;
                }
            }

            .content {
                display: flex;

                .user-info {
                    width: 118px;
                    flex: 0 0 118px;
                    display: flex;

                    .logo {
                        width: 46px;
                        height: 46px;
                        border-radius: 50%;
                    }

                    .img-box {
                        position: relative;

                        .bg {
                            display: none;
                        }
                    }

                    .text {
                        padding-top: 6px;
                        font-size: 14px;
                        color: #999999;
                        letter-spacing: 0;
                        text-align: center;

                        .number {
                            display: inline-block;
                            padding-top: 2px;
                            font-family: PingFangSC-Semibold;
                            font-size: 16px;
                        }
                    }
                }

                .user-info.active {
                    .img-box {
                        .bg {
                            display: block;
                            width: 51px;
                            height: 54px;
                            position: absolute;
                            top: -8px;
                            right: -5px;
                        }
                    }

                    .text {
                        color: #ff463a;
                    }
                }

                .left.user-info.active {
                    .bg {
                        top: -6/5px;
                        left: -5px;
                    }
                }

                .middle {
                    flex: 1;
                    text-align: center;
                    line-height: 46px;

                    img {
                        width: 38px;
                        height: 30px;
                    }
                }
            }
        }
    }
</style>


