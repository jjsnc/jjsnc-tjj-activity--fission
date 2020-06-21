<style lang="scss" scoped>
.scroll-nav-box {
    position: relative;
    width: 100%;
    height: 104px;
    background: #fff;
    &.isSticky {
        position: sticky;
        top: 0;
        z-index: 5;
    }
    overflow-x: hidden;
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track-piece,
    &::-webkit-scrollbar-corner {
        width: 0;
        display: none;
        background-color: none;
    }
}
.scroll-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 1rem 0 0.5rem;
    overflow-x: auto;
    // overflow-y: hidden;
    // -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    // display: flex;
    // flex-wrap: nowrap;
    color: #666;
    font-size: 12px;
    &.fixed {
        position: fixed;
        z-index: 5;
    }
    li {
        position: relative;
        display: inline-block;
        margin: 16px 6px 0 6px;
        &:first-child {
            margin-left: 0;
        }
        &.activity-2 {
            font-size: 1.125rem;
            font-weight: bold;
            &::after {
                display: block;
            }
        }
        &.activity-0,
        &.activity-3 {
            // font-size: 1.125rem;
            font-weight: bold;
            color: #ff8232;
            &::after {
                display: block;
                background: #ff8232;
            }
        }
        &::after {
            display: none;
            content: "";
            position: absolute;
            bottom: 1px;
            left: 50%;
            width: 1.88rem;
            height: 0.19rem;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            background: #fff1b0;
        }
        .shop {
            width: 72px;
            height: 88px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon {
                width: 48px;
                height: 48px;
                img {
                    width: 100%;
                }
                .horn {
                    position: absolute;
                    top: -8px;
                    right: 4px;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    border-radius: 100%;
                    background: red;
                    font-size: 11px;
                    color: #ffffff;
                    letter-spacing: 0;
                    text-align: center;
                    z-index: 6;
                }
            }
            p {
                text-align: center;
                width: 100%;
                margin-top: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track-piece,
    &::-webkit-scrollbar-corner {
        width: 0;
        display: none;
        background-color: none;
    }
}
.swiperList {
    width: 100%;
    height: 100%;
    .item-list {
        width: 100%;
        height: 100%;
    }
}
</style>

<template>
    <div class="swiperNavList" ref="swiperNavList">
        <div
            :class="['scroll-nav-box' , isSticky && fixedTop.flag ? 'isSticky' : '']"
            :style="`${isSticky && fixedTop.flag ? 'top: '+fixedTop.top + 'px' : ''}; height:${bigDatas.hasSort? '134px' : '104px'};`"
            ref="scrollNavBox"
        >
            <ul
                :class="['scroll-nav', fixed ? 'fixed' : '']"
                :style="fixed ? 'top: '+fixedTop.top + 'px' : ''"
                ref="scrollNavUl"
            >
                <li
                    :class="[activityNav == nav.nav.shopId ? activityClass : '']"
                    v-for="(nav, index) in allData"
                    :key="index"
                    @click.stop="navClick((nav.nav.shopId), index)"
                >
                    <div class="shop">
                        <div class="icon">
                            <img :src="nav.nav.shopIcon" alt />
                            <div
                                v-if="nav['cartNavData'][nav.nav.shopId]"
                                class="horn"
                            >{{nav['cartNavData'][nav.nav.shopId]}}</div>
                        </div>
                        <p>{{nav.nav.shopName}}</p>
                    </div>
                </li>
            </ul>
        </div>

        <swiper
            class="swiperList"
            :options="swiperOption"
            ref="swiperList"
            :style="`height: ${boxHeight}`"
        >
            <!-- 幻灯内容 -->
            <slot></slot>
        </swiper>
    </div>
</template>

<script>
import { swiper } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");
export default {
    name: "scrollNav",
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
        }
    },
    data() {
        return {
            allData: [],
            activityType: 3,
            fixedTop: {
                flag: true,
                top: "0"
            },
            scrollShow: true,
            activityClass: "activity-3",
            activityNav: 0,
            actIndex: 0,
            fixed: false,
            isSticky: false,
            swiperOption: {},
            boxHeight: "auto",
            listToTop: false
            // sort_type:1
        };
    },
    watch: {},
    created() {
        this.initData();

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
                    self.activityNav =
                        self.allData[this.activeIndex].nav.shopId ||
                        self.allData[this.activeIndex].nav.id;
                    self.navClick(self.activityNav, this.activeIndex);
                    // console.log(this.activeIndex); //切换结束时，告诉我现在是第几个slide
                }
            }
        };
    },
    watch: {
        allData() {
            this.initData();
        }
    },
    methods: {
        initData() {
            this.allData = this.bigDatas.data;
            this.activityType = this.bigDatas.type;
            if (!this.allData || this.allData.length < 1) return;
            this.activityClass = "activity-" + this.activityType;
            if (this.allData.length > 0) {
                this.activityNav =
                    this.allData[0].nav.shopId || this.allData[0].nav.id;
            } else {
                this.activityNav = 0;
            }
            this.moveNav();
        },
        navClick(id, index) {
            // console.log(id)
            this.swiper.slideTo(index, 300, false);
            this.swiperSlideTo(id, index);
        },
        swiperSlideTo(id, index) {
            this.allData[this.actIndex].scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            this.activityNav = id;
            this.actIndex = index;
            this.listToTop = true;
            this.putScrollTop();
            this.$emit("navChange", {
                id: this.activityNav,
                index: this.actIndex
            });
            this.moveNav();
        },
        moveNav() {
            this.$nextTick(() => {
                let activeNav = document.querySelector(
                    "." + this.activityClass
                );
                let _w = 0;

                if (this.$refs.scrollNavUl.scrollTo) {
                    _w =
                        this.$refs.scrollNavBox.scrollLeft +
                        activeNav.offsetLeft -
                        this.$refs.scrollNavBox.offsetWidth / 2 +
                        activeNav.offsetWidth / 2;
                    this.$refs.scrollNavUl.scrollTo(_w, 0);
                } else {
                    _w =
                        activeNav.offsetLeft -
                        this.$refs.scrollNavBox.offsetWidth / 2 +
                        activeNav.offsetWidth / 2;
                    this.$refs.scrollNavUl.scrollLeft = _w;
                }
            });
        },
        changeSort(num) {
            this.listToTop = true;
            this.putScrollTop();
            this.$emit("navChange", {
                id: this.activityNav,
                sort: num,
                index: this.actIndex
            });
        },
        // 设置容器高度
        setBoxHeight(actList) {
            this.$nextTick(() => {
                console.log(this.actIndex);
                this.boxHeight =
                    (actList.offsetHeight > window.innerHeight / 2
                        ? actList.offsetHeight
                        : window.innerHeight / 2) + "px";
                if (this.listToTop) {
                    this.listToTop = false;
                    this.putScrollTop();
                }
            });
        },
        putScrollTop() {
            this.$nextTick(() => {
                let _topH = this.allData[this.actIndex].scrollTop || 0;
                window.scrollTo
                    ? window.scrollTo(0, _topH)
                    : (document.documentElement.scrollTop = _topH),
                    (document.body.scrollTop = _topH);
                // window.scrollTo(0,this.allData[this.actIndex].scrollTop || 0); //this.$refs.swiperNavList.offsetTop
            });
        }
    },
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
        swiper() {
            return this.$refs.swiperList.swiper;
        }
    },
    mounted() {
        if (!this.fixedTop.flag) {
            return;
        }
        if (this.isSticky) {
            return;
        }
        let self = this;
        this.$nextTick(() => {
            let offsetTop = this.$refs.scrollNavBox.offsetTop;
            let _t = offsetTop - this.fixedTop.top;
            // window.addEventListener("scroll", () => {
            //     // let el = document.body || document.documentElement;
            //     let _top =
            //         document.body.scrollTop ||
            //         document.documentElement.scrollTop;
            //     if (_top >= _t) {
            //         self.fixed = true;
            //     } else {
            //         self.fixed = false;
            //     }
            // });
        });
    }
};
</script>