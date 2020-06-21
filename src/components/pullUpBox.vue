<style lang="scss" scoped>
.pullUpBox{
    min-height: 100%;
    &.hasPulldown{
        margin-top: -40px;
    }
    .refresh-txt{
        line-height: 40px;
        font-size: 12px;
        text-align: center;
    }
    .moreText{
        text-align: center;
        font-size: 14px;
        background-color: #fff;
        color: #333;
        line-height: 32px;
    }
}
.iPhoneX{
    .pullUpBox {
        min-height:calc(100% - 20px) !important;
    }
}
</style>

<template>
	<div :class="['pullUpBox', pulldown ? 'hasPulldown' : '']" id="pullUpBox" :style="pullDownStyle">
        <div v-show="pulldown" class="refresh-txt">{{refreshTxt}}</div>
		<slot></slot>
        <div v-show="isLoadMore" class="moreText">{{moreText}}</div>
	</div>
</template>

<script>
export default {
	name: "pullUpBox",
	data() {
		return {
            refreshTxt: '下拉刷新',
            isLoadMore: false,
            inTop: false,
            touchH: 0,
            moveStart: 0,
            movingH: 0,
            pullDownStyle: '',
            moreText: '上拉加载更多'
		};
	},
	props: {
		data: {
			type: Array,
			default: []
        },
        pulldown: {
            type: Boolean,
			default: false
        },
        noData: {
            type: Boolean,
			default: false
        }
	},
	watch: {
		data() {
			this.initScroll();
            this.isLoadMore = false;
        },
        noData(){
            this.noData ? this.moreText = '没有更多了' : this.moreText = '上拉加载更多';
        }
	},
	created() {},
	methods: {
		initScroll() {
			// console.log("init pullUp");
			let self = this;
			window.removeEventListener("scroll", self.scrollFn);
            window.addEventListener("scroll", self.scrollFn);

            // 是否开启下拉刷新
            if(this.pulldown){
                window.addEventListener('touchstart',self.touchStartFn);
                window.addEventListener('touchmove',self.touchMoveFn);
                window.addEventListener('touchend',self.touchEndFn);
            }
		},
		scrollFn(e) {
            if (this.isLoadMore || this.data.length < 1) return;
            let el = document.body || document.documentElement;
			let _top = document.body.scrollTop || document.documentElement.scrollTop,
				maxH = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),
				_H = window.innerHeight;
            let _h = maxH - _H;
			// if (_top > _h - 300) {
			if (_top > (_h - 200)) {
				console.log("more");
				this.isLoadMore = true;
				this.$emit("loadMore", true);
            }
            
            // console.log(this.pulldown, _top)
            if(this.pulldown && _top <= 0){
                console.log('touchH=0')
                // this.moveStart = e.touches[0].pageY;
                this.inTop = true;
            }else if(this.pulldown){
                this.inTop = false;
                this.pullDownStyle = '';
                // this.moveStart = 0;
            }
        },
        touchStartFn(e){
            let _top = document.body.scrollTop || document.documentElement.scrollTop;
            if(_top <= 0){
                this.moveStart = e.touches[0].pageY;
                this.inTop = true;
            }else{
                this.inTop = false;
                this.moveStart = 0;
            }
        },
        touchMoveFn(e){
            if(this.inTop){
                this.movingH = e.touches[0].pageY;
                this.touchH = this.movingH - this.moveStart <= 0 ? 0 : this.movingH - this.moveStart >= 40 ? 40 : this.movingH - this.moveStart;
                this.touchH > 30 ? this.refreshTxt = '松开刷新' : this.refreshTxt = '下拉刷新';
                this.pullDownStyle = `-webkit-transform:translate3d(0,${this.touchH}px,0);
                                      transform:translate3d(0,${this.touchH}px,0);`;
            }else{
                this.moveStart = e.touches[0].pageY;
            }
        },
        touchEndFn(){
            console.log(this.touchH)
            if(this.inTop){
                this.pullDownStyle = `-webkit-transform:translate3d(0,0,0);
                                      transform:translate3d(0,0,0);
                                      -webkit-transition:all ${this.touchH/300}s ease-in-out;
                                      transition:all ${this.touchH/300}s ease-in-out;`;
                this.touchH > 30 ? setTimeout(() => {location.reload()}, 300) : '';
            }
            this.touchH = 0;
        },
	},
	mounted() {
        this.initScroll();
    },
    activated(){
        this.initScroll();
    },
    deactivated(){
        window.removeEventListener("scroll", this.scrollFn);

        window.removeEventListener('touchstart',this.touchStartFn);
        window.removeEventListener('touchmove',this.touchMoveFn);
        window.removeEventListener('touchend',this.touchEndFn);
    }
};
</script>