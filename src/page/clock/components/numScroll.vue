<!-- props 只传入value 即可 -->
<template>
    <div ref="number" class="wrap-container">
        <div class="wrap" :key="index" v-bind:style="wrapStyle"  v-for="(item, index) in numData">
            <ul class="list scroll" :class="'scroll'+item">
                <li :key="index" v-for="(i , index) in baseNum" v-bind:style="styleObject">{{i}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "num",
    props: {
        value: {
            default: 6000,
            type: Number
        }
    },
    data() {
        return {
            numData: [],
            baseNum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            styleObject: {
                width: "22px",
                height: "30px",
                lineHeight: "30px"
            },
            wrapStyle: {
                height: "30px"
            }
        };
    },
    methods: {
        toArray() {
            this.numData = [...String(this.value)];
        }
    },
    mounted() {
        this.toArray();
    },
    watch: {
        value: function(val, oldVal) {
            val !== oldVal ? this.toArray() : "";
        }
    }
};
</script>

<style scoped lang="scss">
.wrap-container {
    display: inline-block;
    margin-top: 10px;
}
.wrap {
    width: 22px;
    height: 30px;
    display: inline-block;
    vertical-align: top;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 18px;
    color: #fff;
    background: #333333;
    border-radius: 2px;
    margin-right: 5px;
}

.wrap:last-child {
    margin-right: 0;
}

.list {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
}

.list li {
    list-style: none;
    color: #fff;
    text-align: center;
    float: left;
    box-sizing: border-box;
}

@keyframes move9 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -900%, 0);
    }
}

@keyframes move8 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -800%, 0);
    }
}

@keyframes move7 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -700%, 0);
    }
}

@keyframes move6 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -600%, 0);
    }
}

@keyframes move5 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -500%, 0);
    }
}

@keyframes move4 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -400%, 0);
    }
}

@keyframes move3 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -300%, 0);
    }
}

@keyframes move2 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -200%, 0);
    }
}

@keyframes move1 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, -100%, 0);
    }
}

.scroll {
    animation-duration: 0.5s;
    animation-timing-function: linear;
}

.scroll9 {
    animation-name: move9;
    transform: translate3d(0, -900%, 0);
}

.scroll8 {
    animation-name: move8;
    transform: translate3d(0, -800%, 0);
}

.scroll7 {
    animation-name: move7;
    transform: translate3d(0, -700%, 0);
}

.scroll6 {
    animation-name: move6;
    transform: translate3d(0, -600%, 0);
}

.scroll5 {
    animation-name: move5;
    transform: translate3d(0, -500%, 0);
}

.scroll4 {
    animation-name: move4;
    transform: translate3d(0, -400%, 0);
}

.scroll3 {
    animation-name: move3;
    transform: translate3d(0, -300%, 0);
}

.scroll2 {
    animation-name: move2;
    transform: translate3d(0, -200%, 0);
}

.scroll1 {
    animation-name: move1;
    transform: translate3d(0, -100%, 0);
}
</style>
