<template>
	<div id="app"  :class="{iPhoneX:iPhoneX}">
		<transition name="fade" mode="out-in">
            <!-- <keep-alive> -->
                <router-view class="router-view"></router-view>
            <!-- </keep-alive> -->
            <!-- <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view> -->
		</transition>
	</div>
</template>

<style lang="scss">
#app {
	min-height: 100%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// text-align: center;
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
	// transition: opacity .2s ease;
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
export default {
    data() {
        return {
            iPhoneX: false
        };
    },
    mounted() {
        this.deviceType();
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
		
	}
};
</script>
