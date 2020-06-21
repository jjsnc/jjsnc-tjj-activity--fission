<template>
	<div id="app">
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
</style>

<script>
export default {
	created() {
		document.getElementById("taoLoading").style.display = "none";
	}
};
</script>
