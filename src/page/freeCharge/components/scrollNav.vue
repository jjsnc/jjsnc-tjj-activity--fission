<template>
    <div :class="['scroll-nav-box' , isSticky && fixedTop.flag ? 'isSticky' : '']" :style="isSticky && fixedTop.flag ? 'top: '+fixedTop.top + 'px' : ''" v-if="scrollShow" ref="scrollNavBox">
        <ul :class="['scroll-nav', fixed ? 'fixed' : '']" :style="fixed ? 'top: '+fixedTop.top + 'px' : ''" ref="scrollNavUl">
            <li
                :class="[activityNav == nav.id ? activityClass : '']"
                v-for="(nav, index) in navs"
                :key="index"
                @click.stop="navClisk(nav.id)"
            >{{navs[index].name}}</li>
        </ul>
        <ul :class="['sortType' , isSticky && fixedTop.flag ? 'isSticky' : '']" :style="isSticky && fixedTop.flag ? 'top: 54px' : ''">
            <li :class="{act:sort_type==1}" @click="changeSort">
                <img src="../assets/images/icon_hot_selected@2x.png" v-if="sort_type==1" />
                <img src="../assets/images/icon_hot@2x.png" v-else/>推荐排序</li>
            <li :class="{act:sort_type==2}" @click="changeSort">
                <img src="../assets/images/icon_crown_default@2x.png"  v-if="sort_type==1" style="width:14px"/>
                <img src="../assets/images/icon_crown@2x.png" v-else style="width:14px"/>人气排序</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.scroll-nav-box{
    position: relative;
    width: 100%;
    height: 96px;
    background: #f9f9f9;
    &.isSticky{
        position: sticky;
        top: 0;
        z-index: 5;
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
        // background-image: linear-gradient(180deg, #F6F6F6 0%, #fff 50%);
        background: #fff;
        color: #757575;
        &.fixed{
            position: fixed;
            z-index: 5;
        }
        li {
            position: relative;
            padding: 0 0.85rem;
            &.activity-2 {
                font-size: 1.125rem;
                font-weight: bold;
                // &::after {
                //     display: block;
                // }
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
                bottom: 5px;
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
        padding: 0 55px;
        position: absolute;
        top: 54px;
        left: 0;
        width: 100%;
        // background: #fff;
        li{
            padding: 15px 0;
            position: relative;
            flex: 1;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: baseline;
            img{
                width:12px; 
                height:12px; 
                margin-right: 5px;
            }
            &.act{
                font-size: 14px;
                font-weight: bold;
                color: #FF6632;
                // &::after {
                //     display: block;
                //     background: #FF6632;;
                // }
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
        },
        scrollShow: {
            type: Boolean,
            default:false
        }
	},
	data() {
		return {
			navs: [],
			activityClass: "",
            activityNav: 0,
            fixed: false,
            isSticky: false,
            sort_type:1,
            bindScroll: false
		};
	},
	watch: {
		navData() {
			this.init();
        },
        scrollShow(){
            if(!this.fixedTop.flag){
                return;
            }
            if(this.isSticky){
                return;
            }
            console.log(this.bindScroll)
            if(this.scrollShow && !this.bindScroll){
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
                        self.bindScroll = true;
                    });
                })
            }
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
				this.activityNav = this.navs[0].id;
			} else {
				activityNav = 0;
			}
		},
		navClisk(id) {
			this.activityNav = id;
            this.$emit("navChange", {id:id,sort:this.sort_type});
            this.$nextTick(() => {
                let activeNav = document.querySelector("."+this.activityClass);
                // let _w = this.$refs.scrollNavBox.scrollLeft +  activeNav.offsetLeft - this.$refs.scrollNavBox.offsetWidth / 2 +  activeNav.offsetWidth / 2;
                // this.$refs.scrollNavUl.scrollTo(_w,0);

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
        changeSort(){
            if(this.sort_type==1){
                this.sort_type=2;
            }else{
                this.sort_type=1;
            }
            this.$emit("navChange", {id:this.activityNav,sort:this.sort_type});
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
        if(!this.$refs.scrollNavBox || this.bindScroll) return;
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
                self.bindScroll = true;
            });
        })
	}
};
</script>
