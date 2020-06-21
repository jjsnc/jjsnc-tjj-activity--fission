/* 
** cj
** 淘集集价格模板 小数点之后的数字变小
** 参数priceObj 为Object类型
** 参数priceObj.price 价格，Number
** 参数priceObj.bigFont 整数部分字体大小，默认1rem，String
** 参数priceObj.smallFont 小数部分字体大小，默认0.75rem，String
 */
<template>
    <span class="priceNum">
        <span :style="'font-size:' + priceObj.bigFont">{{this.intNum}}</span><span v-if="this.decimalNum" :style="'font-size:' + priceObj.smallFont">.{{this.decimalNum}}</span>
    </span>
</template>

<script>
    export default {
        name: 'priceNum',
        data(){
            return {
                intNum: 0,
                decimalNum: 0
            }
        },
        props: {
            priceObj: {
                type: Object,
                default: {
                    price: 0.00,
                    bigFont: '1rem',
                    smallFont: '0.75rem'
                }
            }
        },
        watch: {
            priceObj(){
                // console.log(this.priceObj)
                this.init();
            }
        },
        created(){
            // console.log(this.priceObj)
            this.init();
        },
        methods: {
            init(){
                let numArr = String(this.priceObj.price).split('.');
                this.intNum = numArr[0];
                this.decimalNum = numArr[1] ? numArr[1] : 0;
            }
        }
    }
</script>