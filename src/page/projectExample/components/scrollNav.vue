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
                :class="[activityNav == nav.cate_id ? activityClass : '']"
                v-for="(nav, index) in navs"
                :key="index"
                @click.stop="navClisk(nav.cate_id)"
            >{{navs[index].cate_name}}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.scroll-nav-box {
    position: relative;
    width: 100%;
    height: 60px;
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
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 1rem 12px;
    white-space: nowrap;
    background-color: #fff;
    background: #e94e4a;
    &.fixed {
        position: fixed;
        z-index: 5;
    }
    li {
        font-size: 14px;
        position: relative;
        display: inline-block;
        text-align: center;        
        border-radius: 12.5px;
        color: #fff;
        margin-right: 8px;
        padding: 5px 10px;
        &.activity-3 {
            font-weight: bold;
            color: #ff6632;
            background: #fff1b0;
            
        }
    }
}
</style>

<script>
export default {
    name: "",
    props: {
        navData: {
            type: Object,
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
            navs: [],
            activityClass: "",
            activityNav: 0,
            fixed: false,
            isSticky: false
        };
    },
    watch: {
        navData() {
            this.init();
        }
    },
    created() {
        this.init();
        if (
            CSS.supports("position", "sticky") ||
            CSS.supports("position", "-webkit-sticky")
        ) {
            // 支持 sticky
            this.isSticky = true;
        }
    },
    methods: {
        init() {
            this.navs = this.navData.data;
            if (!this.navs || this.navs.length < 1) return;
            this.activityClass = "activity-" + this.navData.type;
            if (this.navs.length > 0) {
                this.activityNav = this.navs[0].cate_id;
            } else {
                activityNav = 0;
            }
            this.moveNav();
        },
        navClisk(id) {
            this.activityNav = id;
            this.$emit("navChange", id);
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
            window.addEventListener("scroll", () => {
                // let el = document.body || document.documentElement;
                let _top =
                    document.body.scrollTop ||
                    document.documentElement.scrollTop;
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
