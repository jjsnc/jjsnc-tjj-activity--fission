
<template>
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- 幻灯内容 -->
        <swiper-slide v-for="(item,index) in banners" :key="index">
            <img :src="item" style="width:100%" />
        </swiper-slide>
        <!-- 分页 -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");
export default {
    name: "banner",
    props:["banners"],
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                //循环
                loop: true,
                //设定初始化时slide的索引
                initialSlide: 0,
                //自动播放
                // autoplay: {
                //     delay: 3000,
                //     stopOnLastSlide: false,
                //     disableOnInteraction: true
                // },
                //滑动速度
                speed: 800,
                //滑动方向
                direction: "horizontal",
                //小手掌抓取滑动
                grabCursor: true,
                //滑动之后回调函数
                on: {
                    slideChangeTransitionEnd: function() {
                        console.log(this.activeIndex); //切换结束时，告诉我现在是第几个slide
                    }
                },
 
                //分页器设置
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    type: "custom",
                    //自定义分页器样式
                    renderCustom: function(swiper, current, total) {
                        const activeColor = "#FF6632";
                        const normalColor = "#EAEAE8";
                        let color = "";
                        let shadow = "";
                        let paginationStyle = "";
                        let html = "";
                        for (let i = 1; i <= total; i++) {
                            if (i === current) {
                                color = activeColor;
                            } else {
                                color = normalColor;
                            }
                            paginationStyle = `background:${color};opacity:1;margin-right:8px;width:8px;height:8px;`;
                            html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
                        }
                        return html;
                    }
                }
            }
        };
    },
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        // console.log(this.swiper)
        // this.swiper.slideTo(3, 1000, false)
    }
};
</script>

<style scoped>
.swiper-container {
    width: 100%;
    overflow: hidden;
}
.swiper-wrapper {
    width: 100%;
}
.swiper-slide {
    width: 100%;
    float: left;
}
</style>
