/*  翻滚效果-弹幕
    参数：dataObj 类型：Array
    dataObj[i].icon 头像
    dataObj[i].message 文字信息
 */
<style lang="scss" scoped>
    .topDanmu{
        position: fixed;
        top: 20px;
        left: 10px;
        z-index: 2;
        width: 100%;
        height: 25px;
        line-height: 25px;
        overflow: hidden;
        color: #fff;
        ul{
            position: relative;
            // width: 100%;
            height: 100%;
            overflow: hidden;
            
            li{
                position: absolute;
                padding: 0 10px;
                // left: 100%;
                // top: 0;
                top: 25px;
                max-width: 90%;
                height: 100%;
                background-color: rgba(0,0,0,.5);
                border-radius: 12.5px;
                font-size: pxTorem(13px);
                white-space:nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
                transition: all .3s;
                opacity: 0;
                &.nowDanmu{
                    top: 0;
                    opacity: 1;
                }
                &.prev{
                    top: -25px;
                }
                img{
                    width: pxTorem(21px);
                    height: pxTorem(21px);
                    border-radius: 50%;
                }
            }
        }
    }
</style>

<template>
    <div class="topDanmu">
        <ul>
            <li v-for="(item, index) in dataObj" :key="index" :class="[danmuIndex == (index) ? 'nowDanmu' : '', prevIndex == index ? 'prev' : '']">
                <img v-lazy="item.icon" alt="">
                <span>{{item.message}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'topDanmu',
        data(){
            return {
                timeNum: 0,
                time: '',
                danmuIndex: 0,
                prevIndex: 0,
                intervalTimer: null,
                timeroutTimer: null,
            }
        },
        props:{
            dataObj: Array,
        },
        watch: {
            dataObj(){
                this.init();
            }
        },
        created() {
            this.init();
        },
        methods: {
            init(){
                this.timeroutTimer ? clearTimeout(this.timeroutTimer) : '';
                this.danmuIndex = 0;
                this.prevIndex = this.danmuIndex - 1 < 0 ? this.dataObj.length-1 : this.danmuIndex - 1;
                // this.timeroutTimer = setTimeout(() => {
                    // this.danmuIndex++;
                    this.intervalTimer ? clearInterval(this.intervalTimer) : '';
                    this.intervalTimer = setInterval(() => {
                        if(this.danmuIndex >= this.dataObj.length-1){
                            this.danmuIndex = 0;
                        }else{
                            this.danmuIndex++;
                        }
                        this.prevIndex = this.danmuIndex - 1 < 0 ? this.dataObj.length-1 : this.danmuIndex - 1;
                        // console.log(this.danmuIndex);
                    },3000)
                // },300)
            }
        }
    }
</script>



