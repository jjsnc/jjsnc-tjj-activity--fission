<style lang="scss" scoped>
.slideUpBox {
	position: fixed;
	top: 0;
	left: 0;
	visibility: hidden;
	opacity: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	transition: opacity 0.3s;
	&.slideUpBox-show {
		visibility: visible;
		opacity: 1;
		.slideUp {
			bottom: 0;
		}
	}
	.slideUp {
		position: absolute;
		left: 0;
		bottom: -100%;
		width: 100%;
		// min-height: pxTorem(245px);
		max-height: pxTorem(500px);
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		background-color: #fff;
		transition: bottom 0.3s;
		// padding: pxTorem(13px);
        // overscroll-behavior: contain;
	}
}
</style>

<template>
	<div :class="['slideUpBox', show ? 'slideUpBox-show' : '']" @click.self="changeBoxShow()" @touchmove.self.stop.prevent>
		<div class="slideUp">
			<slot></slot>
		</div>
	</div>
</template>
<script>
// import betterScroll from '@/components/betterScroll'
import {_disScroll} from "@/assets/js/common/utils.js";
export default {
    name: "slideUpBox",
    data(){
        return {
            top: 0,
        }
    },
    components: {
        // betterScroll
    },
	props: {
		show: {
			type: Boolean,
			default: false
		}
    },
    watch: {
        show(){
            _disScroll(this.show);
            // let _body = document.getElementsByTagName('body')[0];
            // if(this.show){
            //     this.top = window.scrollY;
            //     document.body.style.overflow = 'hidden';
            //     document.documentElement.style.overflow = 'hidden';
            // }else{
            //     document.body.style.overflow = 'auto';
            //     document.documentElement.style.overflow = 'auto';
            //     document.body.style['-webkit-overflow-scrolling'] = 'touch';
            //     document.documentElement.style['-webkit-overflow-scrolling'] = 'touch';
            //     window.scrollTo(0,this.top);
            // }
        }
    },
    mounted() {
        _disScroll(this.show);
    },
	methods: {
		changeBoxShow() {
			this.$emit("changeBoxShow", false);
        },
	}
};
</script>