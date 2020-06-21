<template>
    <div class="numberMove" style="height: 40px;line-height: 40px">
        <!--{{number}}-->
        <!--<span class="show"></span>-->
        <div>
            <ul class="list" :class="'move'+ numberStr.toString().substring(index,index+1)" v-for="(itemP,index) in numberStr.toString().length" :key="index" style="height: 400px">
                <template v-if="numberStr.toString().substring(index,index+1)==','">,</template>
                <template v-else><li v-for="(item,index) in 10" :key="index">{{index}}</li></template>
            </ul>
        </div>
    </div>
</template>

<script>
    import {toThousands} from  '@/page/cornucopia/assets/js/utils'
    export default {
        name: "numberMove",
        props: {
            number: {
                default: "000",
                type: [Number, String]
            }
        },
        computed: {
            numberStr(){
                let numberStr = toThousands(this.number);
                return numberStr
            },
            move0() {
                let str = this.number.toString();
                let num = str.substring(str.length - 1, str.length);
                if (num && num != -1) {
                    let move = -44 * num;
                    return {
                        transform: `translateY(${move}px)`,
                        transition: `transform 2s`
                    }
                }
            },
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .move {
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }

    @for $i from 0 to 10 {
        .move#{$i} {
            animation-name: move+$i;
            @extend .move
        }

        @keyframes move#{$i} {
            from {

            }

            to {
                transform: translateY(-$i*10%);
                /*transform: translateY(-$i*40px);*/
            }
        }

    }




    .numberMove {
        font-size: 20px;
        overflow: hidden;
        display: inline-block;
        letter-spacing: 0;
    }

    .show {
        height: 40px;
    }

    li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .list {
        float: left;
        /*height: 400px;*/
    }
</style>
