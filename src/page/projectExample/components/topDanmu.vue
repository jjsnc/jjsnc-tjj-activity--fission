<style lang="scss" scoped>
.topDanmu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    color: #fff;
    ul {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #fde9d9;
        li {
            position: absolute;
            padding: 0 10px;
            top: 25px;
            max-width: 90%;
            height: 100%;
            font-size: pxTorem(13px);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all 0.3s;
            color: #333;
            opacity: 0;
            &.nowDanmu {
                top: 0;
                opacity: 1;
            }
            &.prev {
                top: -25px;
            }
            img {
                width: pxTorem(21px);
                height: pxTorem(21px);
                border-radius: 50%;
                vertical-align: super;
            }
            span {
                display: inline-block;
                width: 232px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>

<template>
    <div class="topDanmu">
        <ul>
            <li
                v-for="(item, index) in dataObj"
                :key="index"
                :class="[danmuIndex == (index) ? 'nowDanmu' : '', prevIndex == index ? 'prev' : '']"
            >
                <img v-if="item.userIcon" v-lazy="item.userIcon" alt>
                <img v-else src="../assets/images/icon_mygoods1@2x.png" alt>
                <span>{{item.user }}等3人{{item.time}}秒前成团返现{{item.price}}元</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "topDanmu",
    data() {
        return {
            timeNum: 0,
            time: "",
            danmuIndex: 0,
            prevIndex: 0,
            intervalTimer: null,
            timeroutTimer: null
        };
    },
    props: {
        dataObj: Array
    },
    watch: {
        dataObj() {
            this.init();
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.timeroutTimer ? clearTimeout(this.timeroutTimer) : "";
            this.danmuIndex = 0;
            this.prevIndex =
                this.danmuIndex - 1 < 0
                    ? this.dataObj.length - 1
                    : this.danmuIndex - 1;
            this.intervalTimer ? clearInterval(this.intervalTimer) : "";
            this.intervalTimer = setInterval(() => {
                if (this.danmuIndex >= this.dataObj.length - 1) {
                    this.danmuIndex = 0;
                } else {
                    this.danmuIndex++;
                }
                this.prevIndex =
                    this.danmuIndex - 1 < 0
                        ? this.dataObj.length - 1
                        : this.danmuIndex - 1;
            }, 3000);
        }
    }
};
</script>



