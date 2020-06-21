<style lang="scss" scoped>
    .topDanmu{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: pxTorem(30px);
        line-height: pxTorem(30px);
        overflow: hidden;
        background-color: #FFEAB7;
        ul{
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            li{
                position: absolute;
                left: 100%;
                top: 0;
                width: 100%;
                height: 100%;
                font-size: pxTorem(13px);
                white-space:nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
                &.nowDanmu{
                    transition: left 6s linear;
                    left: -100%;
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
            <li v-for="(item, index) in dataObj" :key="index" :class="danmuIndex == (index+1) ? 'nowDanmu' : ''">
                <img v-if="item.userIcon" v-lazy="item.userIcon" alt="">
                <img v-else src="../assets/images/icon_mygoods1@2x.png" alt="">
                <span>{{item.user }}等3人{{item.time}}秒前成团返现{{item.price}}元</span>
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
                this.timeroutTimer = setTimeout(() => {
                    this.danmuIndex++;
                    this.intervalTimer ? clearInterval(this.intervalTimer) : '';
                    this.intervalTimer = setInterval(() => {
                        if(this.danmuIndex >= this.dataObj.length){
                            this.danmuIndex = 1;
                        }else{
                            this.danmuIndex++;
                        }
                        // console.log(this.danmuIndex);
                    },6000)
                },300)
            }
        }
    }
</script>



