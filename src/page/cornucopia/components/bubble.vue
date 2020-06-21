<template>
    <div class="mainPart">
        <div class="main">
            <div class="img2019Gap"></div>
            <div class="img2019"></div>
            <div class="swipePart">
                <swiper :options="swipeOption" ref="mySwiper" v-if="wealth_list.length && my_wealth>=0">
                    <!-- 幻灯内容 -->
                    <swiper-slide v-for="(item,index) in wealth_list" :key="index" class="swipe-item">
                        <img :src="item.img_url" style="width:100%" class="swipe-item-img"/>
                        <!--<img :src="item.notArrivedImg" style="width:100%" class="swipe-item-img" v-if="my_wealth<item.wealth"/>-->
                        <div class="swipeItemMark" v-if="my_wealth<item.wealth">还需{{item.wealth-my_wealth}}财气解锁此铭牌</div>
                    </swiper-slide>
                </swiper>
            </div>
            <div style="position: relative">
                <!--气泡-->
                <div class="bubblePart">
                    <div class="bubbleLayout"  :class="item.collectSuccess ? 'collectSuccess' : ''"  :key="index" v-for="(item,index) in bubbleList" :style="{top:item.top,left:item.left}" @click="bubbleTap(item)">
                        <template v-if="pageType=='friend'">
                            <template v-if="item.time==0">
                                <template v-if="item.getFriendWealth || item.is_steal == 0">
                                    <div  class="getFriendWealth" v-if="item.getFriendWealth">+{{item.getFriendWealth}}财气</div>

                                    <div class="unActiveBox bubbleBox move" :style="{'animation-delay':item.delay}">
                                        <div class="bubbleIco unActiveBubble">
                                            <div class="score-unActiveBox">{{item.wealth}}</div>
                                            <div class="text-unActiveBox">{{item.time==0 ? "财气" : item.time}}</div>
                                        </div>
                                        <div class="desc" v-if="item.bubble_cate">{{item.bubble_cate}}</div>
                                    </div>

                                </template>

                                <template v-else>
                                    <div class="activeBox bubbleBox move" :style="{'animation-delay':item.delay}">
                                        <div class="bubbleIco activeBubble">
                                            <div class="score">{{item.wealth}}</div>
                                            <div class="text">{{item.time==0 ? "财气" : item.time}}</div>
                                        </div>
                                        <div class="desc" v-if="item.bubble_cate">{{item.bubble_cate}}</div>
                                        <div class="desc" v-if="item.is_steal == 1">可收取</div>
                                    </div>
                                </template>

                            </template>
                            <template v-else>
                                <div class="unActiveBox bubbleBox move">
                                    <div class="bubbleIco unActiveBubble">
                                        <div class="text">还剩</div>
                                        <div class="time">{{item.time | transTime}}</div>
                                    </div>
                                    <div class="desc" v-if="item.bubble_cate">{{item.bubble_cate}}</div>
                                </div>
                            </template>
                        </template>


                        <template v-else>
                            <template v-if="item.time==0">
                                    <div class="activeBox bubbleBox move" :style="{'animation-delay':item.delay}">
                                        <div class="bubbleIco activeBubble">
                                            <div class="score">{{item.wealth}}</div>
                                            <div class="text">{{item.time==0 ? "财气" : item.time}}</div>
                                        </div>
                                        <div class="desc" v-if="item.bubble_cate">{{item.bubble_cate}}</div>
                                    </div>
                            </template>
                            <template v-else>
                                <div class="unActiveBox bubbleBox move">
                                    <div class="bubbleIco unActiveBubble">
                                        <div class="text">还剩</div>
                                        <div class="time">{{item.time | transTime}}</div>
                                    </div>
                                    <div class="desc" v-if="item.bubble_cate">{{item.bubble_cate}}</div>
                                </div>
                            </template>
                        </template>
                    </div>

                </div>

                <!--财富盆-->
                <div class="potPart" style="line-height: 40px">
                    <div class="potImgBox"><img :src="potImg" alt="" class="potImg"></div>
                    <div class="potBtn" :class="my_wealth>=600 ? 'wealthLargeText' : ''" v-if="my_wealth>0"><span>聚宝盆可用</span><numberMove :number="my_wealth"></numberMove><span>财气</span></div>
                    <div class="potBtn noWealthText" v-if="my_wealth<=0">还没有财气哦，快去搜集吧</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numberMove from './numberMove'
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import bubbleMin  from '@/page/cornucopia/assets/mixin/bubble'
    let scale = document.body.clientWidth / 375;
    export default {
        name: "bubble",
        mixins:[bubbleMin],
        components:{
            swiper,
            swiperSlide,
            numberMove
        },
        data(){
            return{
                swipeOption: {
                    width: 327 * scale,
                    height: 102 * scale,
                    initialSlide: 0,//显示第几张
                    direction: "horizontal",
                    loop: false,
                    centeredSlides: true,
                    slidesOffsetBefore: 24 * scale,//距离左侧距离
                    spaceBetween: 10 * scale,//图片之间的间隙
                },
            }
        },
        props:{
            wealth_list:{
                type: Array,
                default:[],
            },
            bubbleList:{
                type: Array,
                default:[],
            },
            my_wealth:{
                type: [Number,String],
                default:-1,
            },
            pageType:{
                type:String,
                default:''
            }
        },
        computed: {
            potImg() {
                let my_wealth = this.my_wealth;
                if (my_wealth <= 0) {
                    return require('../assets/images/jubaopen@2x.png')
                } else if(my_wealth <= 100){
                    return require('../assets/images/jubaopen01@2x.png')
                }else if (my_wealth <= 300) {
                    return require('../assets/images/jubaopen02@2x.png')
                } else if(my_wealth <= 600){
                    return require('../assets/images/jubaopen03@2x.png')
                }else if(my_wealth <= 1200){
                    return require('../assets/images/jubaopen04@2x.png')
                }else if(my_wealth <= 2000){
                    return require('../assets/images/jubaopen05@2x.png')
                }else{
                    return require('../assets/images/jubaopen05@2x.png')
                }
            },
        },
        watch:{
            bubbleList:{
                handler(newValue, oldValue) {
                    // for (let i = 0; i < newValue.length; i++) {
                    //     if (oldValue[i] != newValue[i]) {
                    //         this.setInitialSlide()
                    //     }
                    // }
                    if(newValue != oldValue){
                        this.setInitialSlide()
                    }
                },
                deep: true
            },
            my_wealth(newValue,oldValue){
                if(newValue != oldValue){
                    this.setInitialSlide()
                }
            }
        },
        methods:{
            bubbleTap(item){
                this.$emit('bubbleTap',item);
            },
            setInitialSlide(){
                // console.log(111);
                let initialSlide = 0;
                this.wealth_list.forEach((item,index)=>{
                    if(this.my_wealth >= item.wealth){
                        initialSlide =  index;
                    }
                });
                this.swipeOption.initialSlide = initialSlide;
            }
        },
        created() {

        },

    }
</script>

<style scoped lang="scss">
    .mainPart {
        height: 550px;
        width: 100vw;


    .main {
        background: url("../assets/images/background@2x.png") no-repeat top;
        background-size: 100%;
        height: 448px;
        /*border-top: 1px solid transparent;*/
        position: relative;
        /*overflow: hidden;*/
    }

    .img2019Gap{
        height: 19px;
    }

    .img2019 {
        background: url("../assets/images/my_Wealth_2019@2x.png") no-repeat center;
        background-size: 100%;
        width: 249px;
        height: 70px;
        margin: 0 auto 14px;
    }

    .swipePart {
        height: 102px;
        .swipe-item {
            width: 315px;
            height: 102px;
            line-height: 102px;
        }

        .swipe-item-img {
            width: 100%;
            height: 100%;
        }

        .swipeItemMark {
            background: rgba(0, 0, 0, 0.52);
            border: 3px solid rgba(0, 0, 0, 0.5);
            border-radius: 20px;
            left: 0;
            right: 0;
            top: 0;
            height: 90px;
            line-height: 90px;
            position: absolute;
            font-family: PingFangSC-Medium;
            font-size: 17px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
        }
    }


    .bubblePart {
        height: 165px;
        width: 300px;
        margin: auto;
        position: relative;
        z-index: 99;

        .bubbleLayout {
            position: absolute;
            /*height: 80px;*/
        }

        .bubbleIco {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            text-align: center;
        }

        .bubbleBox {
            width: 60px;
        }

        .activeBox {
            .activeBubble {
                background: url("../assets/images/caiqi_active@2x.png") no-repeat center;
                background-size: 100%;
            }

            .score {
                font-family: DINAlternate-Bold;
                font-size: 21px;
                color: #B00702;
                letter-spacing: 0;
                text-align: center;
                padding-top: 6px;
            }

            .text {
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #B00702;
                letter-spacing: 0;
                text-align: center;
            }

            .desc {
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #FFD9AA;
                letter-spacing: 0;
                text-align: center;
            }
        }


        .unActiveBox {
            .unActiveBubble {
                background: url("../assets/images/caiqi_unactive@2x.png") no-repeat center;
                background-size: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .score-unActiveBox {
                font-family: DINAlternate-Bold;
                font-size: 21px;
                color: #CC7B16;
                letter-spacing: 0;
                text-align: center;
            }

            .text-unActiveBox{
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #CC7B16;
                letter-spacing: 0;
                text-align: center;
                padding-bottom: 8px;
            }


            .text {
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #CC7B16;
                letter-spacing: 0;
                text-align: center;
            }

            .time {
                font-family: DINAlternate-Bold;
                font-size: 14px;
                color: #CC7B16;
                letter-spacing: 0;
                text-align: center;
                padding-bottom: 4px;
            }

            .desc {
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #F7A6A4;
                letter-spacing: 0;
                text-align: center;
            }
        }

        .move {
            animation: moveBubble 1.5s infinite;
            animation-timing-function: linear;
        }

        @keyframes moveBubble {
            0% {
                transform: translate(0px, 0px);
            }
            50% {
                transform: translate(0px, -4px);
            }
            100% {
                transform: translate(0px, 0px);
            }
        }

    }

    .potPart {
        /*width: 375px;*///宽度也是不能随便设置的，vivo撑大父级
        position: absolute;
        top: 120px;
        left: 0;
        right: 0;
        .potImgBox{
            width: 366px;
            height: 230px;
            margin: auto;

            .potImg {
                width: 100%;
                height: 100%;
            }
        }



        .potBtn {
            display: flex;
            align-items: center;
            justify-content: center;
            /*background: url("../assets/images/button_cq@2x.png") no-repeat center;*/
            /*background-size: 100%;*/
            width: 312px;
            height: 50px;
            /*line-height: 40px;*/
            margin: auto;
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #FFE5C4;
            letter-spacing: 0;
            text-align: center;
            position: absolute;
            top: 158px;
            left: 50%;
            transform: translateX(-50%);

            .text {
                font-size: 20px;
            }
        }

        .wealthLargeText{
            top: 160px;
        }

        .noWealthText{
            top: 149px;
        }
    }


    .collectSuccess{
        animation-name: moveCenter,animationHide;
        animation-timing-function: ease-out,linear;
        animation-duration: 0.6s,0.1s;
        animation-fill-mode: forwards,forwards;
        animation-delay: 0s,1s;
    }

    @keyframes moveCenter {
        from{

        }

        to{
            transform: scale(0);
            left:8rem;
            top:10rem
        }
    }



    .getFriendWealth{
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 9999;
        font-family: PingFangSC-Medium;
        font-size: 17px;
        color: #FFF9F0;
        animation-name: getFriendWealth,animationHide;
        animation-timing-function: ease-out,linear;
        animation-duration: 1.5s,0.1s;
        animation-fill-mode: forwards,forwards;
        animation-delay: 0s,2s;
    }

    @keyframes getFriendWealth {
        0%{
            transform: translateY(0);
            opacity: 0.3;
        }


        50%{
            transform: translateY(-18px);
            opacity: 1;
        }


        100%{
            transform: translateY(-26px);
            opacity: 0;
        }
    }

    @keyframes animationHide {
        from{

        }

        to{
            width: 0;
            height: 0;
            display: none;
            z-index: 1;
        }
    }

    }
</style>
