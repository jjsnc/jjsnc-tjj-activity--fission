<style lang="scss" scoped>
    .scroll-nav-box{
        position: relative;
        width: 100%;
        &.isSticky{
            position: sticky;
            top: 0;
            z-index: 5;
        }
    }
    .scroll-nav {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0 1rem;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        line-height: 2.75rem;
        white-space: nowrap;;
        display: flex;
        flex-wrap: nowrap;
        background-color: #fff;
        border-bottom: 1px solid #F0F0F0;
        &.fixed{
            position: fixed;
            z-index: 5;
        }
        li {
            position: relative;
            padding: 0 0.75rem;
            &.activity-2 {
                font-size: 1.125rem;
                font-weight: bold;
                &::after {
                    display: block;
                }
            }
            &.activity-3{
                font-size: 1.125rem;
                font-weight: bold;
                color: #FF6632;
                &::after {
                    display: block;
                    background: #FF6632;
                }
            }
            &::after {
                display: none;
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 1.88rem;
                height: 0.19rem;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                background: #ffde60;
            }
        }
    }
    .sortType{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0.9rem;
        position: absolute;
        top: 2.7rem;
        left: 0;
        width: 100%;
        background: #fff;
        li{
            padding: 15px 0;
            position: relative;
            flex: 1;
            text-align: center;
            &.act{
                font-size: 14px;
                font-weight: bold;
                color: #333;
                &::after {
                    display: block;
                    background: #FF3932;;
                }
            }
            &::after {
                display: none;
                content: "";
                position: absolute;
                bottom: 4px;
                left: 50%;
                width: 54px;
                height: 0.19rem;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                background: #FF3932;;
            }
        }
    }
    .swiperList{
        width: 100%;
        height: 100%;
        .item-list{
            width: 100%;
            height: 100%;
        }
    }
</style>


<template>
    <div class='swiperNavList' ref='swiperNavList'>
        <!-- <scrollNav
            class="nav"
            :fixedTop="fixedTop"
            :navData="datas.navData"
            :scrollShow="scrollShow"
            @navChange="navChange"
            ref="nav"
        ></scrollNav> -->

        <div :class="['scroll-nav-box' , isSticky && fixedTop.flag ? 'isSticky' : '']" :style="`${isSticky && fixedTop.flag ? 'top: '+fixedTop.top + 'px' : ''}; height:${bigDatas.hasSort? '5.4rem' : '2.7rem'};`" ref="scrollNavBox">
            <ul :class="['scroll-nav', fixed ? 'fixed' : '']" :style="fixed ? 'top: '+fixedTop.top + 'px' : ''" ref="scrollNavUl">
                <li
                    :class="[activityNav == nav.nav.cate_id || activityNav == nav.nav.id ? activityClass : '']"
                    v-for="(nav, index) in allData"
                    :key="index"
                    @click.stop="navClick((nav.nav.cate_id || nav.nav.id), index)"
                >{{nav.nav.cate_name || nav.nav.name}}</li>
            </ul>
            <ul v-if="bigDatas.hasSort" :class="['sortType' , isSticky && fixedTop.flag ? 'isSticky' : '']" :style="isSticky && fixedTop.flag ? 'top: 2.7rem' : ''">
                <li :class="{act:bigDatas.data[actIndex].sortType==1}" @click="changeSort(1)">推荐排序</li>
                <li :class="{act:bigDatas.data[actIndex].sortType==2}" @click="changeSort(2)">人气排序</li>
            </ul>
        </div>

        <swiper class="swiperList" :options="swiperOption" ref="swiperList" :style="`height: ${boxHeight}`">
            <!-- 幻灯内容 -->
            <slot></slot>
        </swiper>
    </div>
</template>

<script>
    // import scrollNav from "@/components/scrollNav.vue";
    // import { swiperSlide } from "vue-awesome-swiper";
    // import swiperList from "@/components/swiper.list.vue";
    import { swiper } from "vue-awesome-swiper";
    // import pullUpBox from "@/components/pullUpBox";
    export default {
        name: 'swiperNavList',
        components: {
            // scrollNav,
            swiper
        },
        props: {
            bigDatas: {
                type: Object,
                default: {
                    type: 3,
                    hasSort: false,
                    data: []
                }
            },
        },
        data(){
            return {
                allData: [],
                activityType: 3,
                fixedTop: {
                    flag: true,
                    top: "0"
                },
                scrollShow: true,
                activityClass: "",
                activityNav: 0,
                actIndex: 0,
                fixed: false,
                isSticky: false,
                swiperOption: {},
                boxHeight: 'auto',
                listToTop: false,
                // sort_type:1
            }
        },
        watch: {
        },
        created(){
            this.initData();
            if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
                // 支持 sticky
                this.isSticky = true;
            }

            let self = this;
            self.swiperOption = {
                notNextTick: true,
                    //循环
                    loop: false,
                    //设定初始化时slide的索引
                    initialSlide: self.slideIndex,
                    //自动播放
                    // autoplay: {
                    //     delay: 3000,
                    //     stopOnLastSlide: false,
                    //     disableOnInteraction: true
                    // },
                    //滑动速度
                    speed: 300,
                    //滑动方向
                    direction: "horizontal",
                    //小手掌抓取滑动
                    grabCursor: true,
                    //滑动之后回调函数
                    on: {
                        slideChangeTransitionEnd: function() {
                            self.activityNav = self.allData[this.activeIndex].nav.cate_id || self.allData[this.activeIndex].nav.id;
                            // self.$emit('changeIndex', this.activeIndex);
                            self.navClick(self.activityNav, this.activeIndex);
                            // console.log(this.activeIndex); //切换结束时，告诉我现在是第几个slide
                        }
                    },
            }
        },
        methods: {
            initData(){
                this.allData = this.bigDatas.data;
                this.activityType = this.bigDatas.type;
                if(!this.allData || this.allData.length < 1) return;
                this.activityClass = "activity-" + this.activityType;
                if (this.allData.length > 0) {
                    this.activityNav = this.allData[0].nav.cate_id || this.allData[0].nav.id;
                } else {
                    this.activityNav = 0;
                }
                this.moveNav();
            },
            navClick(id,index) {
                // console.log(id)
                this.swiper.slideTo(index, 300, false);
                this.swiperSlideTo(id,index);
            },
            swiperSlideTo(id,index){
                this.allData[this.actIndex].scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                this.activityNav = id;
                this.actIndex = index;
                this.listToTop = true;
                this.putScrollTop();
                this.$emit("navChange", {id:this.activityNav, index: this.actIndex});
                this.moveNav();
            },
            moveNav(){
                this.$nextTick(() => {
                    let activeNav = document.querySelector("."+this.activityClass);
                    let _w = 0;
                    
                    if(this.$refs.scrollNavUl.scrollTo){
                        _w = this.$refs.scrollNavBox.scrollLeft +  activeNav.offsetLeft - this.$refs.scrollNavBox.offsetWidth / 2 +  activeNav.offsetWidth / 2;
                        this.$refs.scrollNavUl.scrollTo(_w,0);
                    }else{
                        _w = activeNav.offsetLeft - this.$refs.scrollNavBox.offsetWidth / 2 +  activeNav.offsetWidth / 2;
                        this.$refs.scrollNavUl.scrollLeft = _w;
                    }
                })
            },
            changeSort(num){
                this.listToTop = true;
                this.putScrollTop();
                this.$emit("navChange", {id:this.activityNav, sort:num, index: this.actIndex});
            },
            // 设置容器高度
            setBoxHeight(actList){
                this.$nextTick(() => {
                    console.log(this.actIndex)
                    this.boxHeight = (actList.offsetHeight > window.innerHeight/2 ? actList.offsetHeight : window.innerHeight/2) + 'px';
                    if(this.listToTop){
                        this.listToTop = false;
                        this.putScrollTop();
                    }
                })
            },
            putScrollTop(){
                this.$nextTick(() => {
                    let _topH = this.allData[this.actIndex].scrollTop || 0;
                    window.scrollTo ? window.scrollTo(0,_topH) : 
                    document.documentElement.scrollTop = _topH, document.body.scrollTop = _topH;
                    // window.scrollTo(0,this.allData[this.actIndex].scrollTop || 0); //this.$refs.swiperNavList.offsetTop
                })
            }
        },
        // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
        computed: {
            swiper() {
                return this.$refs.swiperList.swiper;
            }
        },
        mounted() {
            if(!this.fixedTop.flag){
                return;
            }
            if(this.isSticky){
                return;
            }
            let self = this;
            this.$nextTick(() => {
                let offsetTop = this.$refs.scrollNavBox.offsetTop;
                let _t = offsetTop - this.fixedTop.top;
                window.addEventListener("scroll", () => {
                    // let el = document.body || document.documentElement;
                    let _top = document.body.scrollTop || document.documentElement.scrollTop;
                    if(_top >= _t){
                        self.fixed = true;
                    }else{
                        self.fixed = false;
                    }
                });
            })
        }
    }
</script>