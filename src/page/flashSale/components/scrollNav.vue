<template>
    <div
        :class="['scroll-nav-box' , isSticky && fixedTop.flag ? 'isSticky' : '']"
        :style="isSticky && fixedTop.flag ? 'top: '+fixedTop.top + 'px' : ''"
        ref="scrollNavBox"
    >
        <ul
            :class="['scroll-nav', fixed ? 'fixed' : '']"
            :style="fixed ? 'top: '+fixedTop.top + 'px' : ''"
            ref="scrollNavUl"
        >
            <li
                :class="[activityNav == item.cate_id ? activityClass : '']"
                v-for="(item, index) in navs"
                :key="index"
                @click.stop="navClisk(item.cate_id)"
            >
                <div class="time"   v-bind:style="styleMiddle28">{{item.activityDate}}</div>
                <div class="status" v-if="item.cate_status==0">即将开抢</div>
                <div class="status" v-else-if="item.cate_status==1">已开抢</div>
                <div class="status" v-else>抢购进行中</div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.scroll-nav-box {
    position: relative;
    width: 100%;
    height: 122px;
    &.isSticky {
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
    padding: 0 14px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    // display: flex;
    // flex-wrap: nowrap;

    &.fixed {
        position: fixed;
        z-index: 5;
    }
    li {
        position: relative;
        display: inline-block;
        // width: 68px;
        text-align: center;
        color: #ffc0aa;
        padding: 0 4px;
        &:first-child {
            padding-left: 0;
        }

        .time {
            font-size: 19px;
            width: 64px;
            margin: 0 auto;
        }
        .status {
            padding-top: 5px;
        }
        &.activity {
            font-weight: bold;
            color: #ff2840;
            .time {
                background: #ffffff;
                border-radius: 14px;
            }
            .status {
                color: #fff;
            }
        }
    }
}
</style>

<script>
import { getQueryString } from "@/assets/js/common/utils.js";
export default {
    name: "",
    props: {
        navData: {
            type: Array,
            default: {}
        },
        fixedTop: {
            type: Object,
            default: {
                flag: true,
                top: 0
            }
        }
    },
    data() {
        return {
            styleMiddle28:{
             'height' : '28px',
             'line-height': '30px',
            },
            navs: [],
            activityClass: "activity",
            activityNav: 0,
            fixed: false,
            isSticky: false
        };
    },
    watch: {
        navData() {
            this.init();
        },
        '$route' (to, from) {
          this.myInitScrollTo();
        }
    },
    mounted() {
        // this.init();
        if (getQueryString("os") == 'ios') {
            if (
                CSS.supports("position", "sticky") ||
                CSS.supports("position", "-webkit-sticky")
            ) {
                // 支持 sticky
                this.isSticky = true;
            }
        }
    },
    methods: {
        init() {
            this.navs = this.navData;
            if (!this.navs || this.navs.length < 1) return;
            if (this.navs.length > 0) {
                let activeArray = this.navs.filter(item => {
                    return item.cate_status == 2;
                });
                if (activeArray.length > 0) {
                    this.activityNav = activeArray[0].cate_id;
                    this.myInitScrollTo();
                } else {
                    this.activityNav = this.navs[0].cate_id;
                    this.myInitScrollTo();
                }
            } else {
                this.activityNav = 0;
            }
        },
        navClisk(id) {
            this.activityNav = id;
            this.$emit("navChange", id);
            this.myInitScrollTo();
        },
        myInitScrollTo() {
            this.$nextTick(() => {
                // alert(document.querySelector)
                let activeNav = document.querySelector(
                    "." + this.activityClass
                );
                let _w = 0;
                if(this.$refs.scrollNavUl.scrollTo){
                    _w =
                        this.$refs.scrollNavBox.scrollLeft +
                        activeNav.offsetLeft -
                        this.$refs.scrollNavBox.offsetWidth / 2 +
                        activeNav.offsetWidth / 2;
                    this.$refs.scrollNavUl.scrollTo(_w, 0);
                }else{
                    _w =
                        activeNav.offsetLeft -
                        this.$refs.scrollNavBox.offsetWidth / 2 +
                        activeNav.offsetWidth / 2;
                    this.$refs.scrollNavUl.scrollLeft = _w;
                }
            });
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
            window.addEventListener("scroll", function() {
                // let el = document.body || document.documentElement;
                let _top = (function() {
                    var scrollTop = 0,
                        bodyScrollTop = 0,
                        documentScrollTop = 0;
                    if (document.body) {
                        bodyScrollTop = document.body.scrollTop;
                    }
                    if (document.documentElement) {
                        documentScrollTop = document.documentElement.scrollTop;
                    }
                    scrollTop =
                        bodyScrollTop - documentScrollTop > 0
                            ? bodyScrollTop
                            : documentScrollTop;
                    return scrollTop;
                })();
                if (_top >= _t) {
                    self.fixed = true;
                } else {
                    self.fixed = false;
                }
            });
        });
    }
};
</script>
