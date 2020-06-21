<template>
	<div id="app"  :class="{iPhoneX:iPhoneX}">
		<transition name="fade" mode="out-in">
                <router-view class="router-view"></router-view>
		</transition>
	</div>
</template>

<style lang="scss">
#app {
	min-height: 100%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
    &.iPhoneX{
        min-height: calc(100% - 20px) !important;
    }
}
.fade-enter-active{
    opacity: 1;
	transition: opacity .5s ease;
}
.fade-leave-active {
    opacity: 0;
}
.fade-enter{
    opacity: 0;
}
.fade-enter,
.fade-leave-active {
	opacity: 0!important;
}
.router-view {
    background-color: #f9f9f9;
    min-height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.iPhoneX{
    .router-view {
	    bottom: 20px;
        min-height: calc(100% - 20px) !important;
    }
}
</style>

<script>
import { is_weixin, checkBrowser,getQueryString} from "@/assets/js/common/utils.js";
export default {
    data() {
        return {
            iPhoneX: false,
            WeixinJSBridge: null
        };
    },
    watch: {
        $route(to,from){
            if(!is_weixin()) return;
            if(to.name == 'share'){
                this.WeixinJSBridge ? this.WeixinJSBridge.call('showOptionMenu') : '';
                if(checkBrowser().versions.ios && !sessionStorage.getItem('refresh')){
                    sessionStorage.setItem('refresh',1)
                    location.assign(location.origin+"/"+this.$router.options.base+to.fullPath);
                }else{
                    sessionStorage.removeItem('refresh')
                }
            }else{
                if(from.name=="share" && to.name == "todayFree" && getQueryString("isNew")&&checkBrowser().versions.android&& !sessionStorage.getItem("androidRefresh")){
                    sessionStorage.setItem("androidRefresh",1);
                    location.replace(location.href);
                }
                this.WeixinJSBridge ? this.WeixinJSBridge.call('hideOptionMenu') : '';
            }
        }
    },
    mounted() {
    },
    methods: {
        deviceType() {
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isIOS) {
                if (screen.height == 812 && screen.width == 375) {
                    //是iphoneX
                    this.iPhoneX = true;
                } else {
                    //不是iphoneX
                    this.iPhoneX = false;
                }
            }
        }
    },
	created() {
        let self = this;
        
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 通过下面这个API隐藏右上角按钮
            // WeixinJSBridge.call('hideOptionMenu');
            console.log(self.$route)
            self.WeixinJSBridge = WeixinJSBridge;
            if(self.$route.name == 'share'){
                WeixinJSBridge ? WeixinJSBridge.call('showOptionMenu') : '';
            }else{
                WeixinJSBridge ? WeixinJSBridge.call('hideOptionMenu') : '';
            }
        });
	}
};
</script>
