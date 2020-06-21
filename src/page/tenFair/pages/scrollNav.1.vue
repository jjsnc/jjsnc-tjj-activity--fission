<template>
    <div :class="['scroll-nav-box' , isSticky && fixedTop.flag ? 'isSticky' : '']" :style="isSticky && fixedTop.flag ? 'top: '+fixedTop.top + 'px' : ''" ref="scrollNavBox">
        <ul :class="['scroll-nav', fixed ? 'fixed' : '']" :style="fixed ? 'top: '+fixedTop.top + 'px' : ''" ref="scrollNavUl">
            <li
                :class="[activityNav == nav.shopId ? activityClass : '']"
                v-for="(nav, index) in navs"
                :key="index"
                @click.stop="navClisk(nav.shopId)"
            >
            <div class="shop">
                <div class="icon">
                    <img :src="nav.shopIcon" alt=""/>
                    <div v-if="navData['cartNavData'][nav.shopId]" class="horn" >
                        {{navData['cartNavData'][nav.shopId]}}
                    </div>
                </div>
                <p>{{navs[index].shopName}}</p>
            </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.scroll-nav-box{
    position: relative;
    width: 100%;
    height: 104px;
    background: #fff;
    &.isSticky{
        position: sticky;
        top: 0;
        z-index: 5;
    }
    overflow-x: hidden;
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
	white-space: nowrap;;
	display: flex;
	flex-wrap: nowrap;
    color: #666;
    font-size: 12px;
    &.fixed{
        position: fixed;
        z-index: 5;
    }
	li {
		position: relative;
        margin: 16px 6px 0 6px;
        &:first-child{
            margin-left: 0;
        }
		&.activity-2 {
			font-size: 1.125rem;
			font-weight: bold;
			&::after {
				display: block;
			}
		}
        &.activity-0,&.activity-3{
            // font-size: 1.125rem;
			font-weight: bold;
            color: #FF8232;
			&::after {
				display: block;
                background: #FF8232;
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
			background: #FFF1B0;
        }
        .shop{
            width: 72px;
            height: 88px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: 48px;
                height: 48px;
                img{
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
                }
            }
            p{
                text-align: center;
                width: 100%;
                margin-top: 12px;                   
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
        }
	}
    &::-webkit-scrollbar,&::-webkit-scrollbar-track,&::-webkit-scrollbar-thumb,&::-webkit-scrollbar-button,&::-webkit-scrollbar-track-piece,&::-webkit-scrollbar-corner {
        width:0;
        display: none;
        background-color:none;
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
            isSticky: false,
		};
	},
	watch: {
		navData() {
			this.init();
		}
	},
	created() {
        this.init();
        if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
            // 支持 sticky
            this.isSticky = true;
        }
	},
	methods: {
		init() {
            this.navs = this.navData.data;
            if(!this.navs || this.navs.length < 1) return;
			this.activityClass = "activity-" + this.navData.type;
			if (this.navs.length > 0) {
				this.activityNav = this.navs[0].shopId;
			} else {
				activityNav = 0;
			}
		},
		navClisk(id) {
            if(this.activityNav==id)return;
            this.activityNav = id;
            // let temp=this.navs.find(item=>item.shopId==id);
			// this.activityClass = "activity-" + this.navs.indexOf(temp);            
            this.$emit("navChange", id);
            this.$nextTick(() => {
                let activeNav = document.querySelector("."+this.activityClass);
                // let _w = this.$refs.scrollNavBox.scrollLeft +  activeNav.offsetLeft - this.$refs.scrollNavBox.offsetWidth / 2 +  activeNav.offsetWidth / 2;
                // this.$refs.scrollNavUl.scrollTo(_w,0);

                let _w = 0;
                if(this.$refs.scrollNavUl.scrollTo){
                    _w = this.$refs.scrollNavBox.scrollLeft + activeNav.offsetLeft - this.$refs.scrollNavBox.offsetWidth / 2 + activeNav.offsetWidth / 2;
                    this.$refs.scrollNavUl.scrollTo(_w, 0);
                }else{
                    _w = activeNav.offsetLeft - this.$refs.scrollNavBox.offsetWidth / 2 + activeNav.offsetWidth / 2;
                    this.$refs.scrollNavUl.scrollLeft = _w;
                }
            })
            
		}
    },
	mounted() {
        // document.body.parentNode.style.overflowX = "hidden";
        document.querySelectorAll(".scroll-nav")[0].parentNode.style.overflowX = "hidden";
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
};
</script>
