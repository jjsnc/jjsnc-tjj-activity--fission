<template>
    <swiper class="swiperList" :options="swiperOption" ref="swiperList">
        <!-- 幻灯内容 -->
        <slot></slot>
    </swiper>
</template>

<script>
import { swiper } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");
export default {
    name: 'swiperList',
    props:{
        datas:Array,
        slideIndex:Number
    },
    components: {
        swiper,
    },
    data() {
        return {
            swiperOption: {
                
 
            },
        };
    },
    watch:{
        slideIndex(){
             this.swiper.slideTo(this.slideIndex, 300, false)
        }
    },
    created(){
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
                        self.$emit('changeIndex', this.activeIndex);
                        // console.log(this.activeIndex); //切换结束时，告诉我现在是第几个slide
                    }
                },
        }
    },
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
        swiper() {
            return this.$refs.swiperList.swiper;
        }
    },
}
</script>

<style lang="scss" scoped>
    .swiperList{
        width: 100%;
        height: 100%;
        .item-list{
            width: 100%;
            height: 100%;
        }
    }
</style>
