<template>
    <div :class="['pop', popShow ? 'pop-show' : '']" @click.self.stop="closePop()">
        <div class="pop-cont">
            <div class="s-c-close" @click.stop="closePop()" >
                <img src="../assets/images/close@2x.png"/>
            </div>
            <div class="s-c-con">
                <div class="s-c-title">礼物被别人抢走啦，别气馁，</div>
                <div class="s-c-title">小桃给你准备了一份小心意。</div>
                <div class="s-c-goods">
                    <div>
                        <span >￥</span><span class="big">3</span>
                    </div>
                </div>
                <div class="s-c-btn" @click="closePop">
                    我收下啦
                </div>
                <div class="s-c-tips">
                    已放入我的优惠券，下单可使用
                </div>
            </div>
        </div>
   </div>
</template>

<script >
export default {
   name: '',
   props: {
        popShow: {
            type: Boolean,
            default: false
        },
        goods:{
            type: Object,
            dafault: {}
        }
    },
   data() {
       return {
       }
   },
   created() {
       
   },
   
   methods: {
       closePop(){
           this.$parent.popShow = false;
       },
      
      
   },
   components: {}
}
</script>

<style scoped lang="scss">
.pop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    opacity: 0;
    visibility: hidden;
    &.pop-show {
        opacity: 1;
        visibility: visible;
        z-index: 998;
        .pop-cont {
            -webkit-transform: translate(-50%, -50%) scale(1, 1);
            transform: translate(-50%, -50%) scale(1, 1);
        }
        
    }
     .pop-cont {
        width: 315px;
        height: 335px;
        padding: 21px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) scale(0, 0);
        transform: translate(-50%, -50%) scale(0, 0);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        border-radius: 6px;
        .s-c-close {
            position: absolute;
            right: 20px;
            top: -38px;
            width: 25px;
            height: 25px;
            img {
                width: 100%;
                // height: 100%;
            }
            &::after {
                content: "";
                display: block;
                position: absolute;
                border-left: 1px solid #ffffff;
                width: 1px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                height: 13px;
                left: 0;
                right: 0;
                margin: auto;
                bottom: -13px;
            }
        }
        .s-c-con {            
            font-size: 14px;
            color: #333;
            p {
                line-height: 20px;
                margin-top: 20px;
                text-align: left;
                .red {
                    color: #ee0000;
                }
            }
            .s-c-title{
                font-size: 18px;
                color: #333;
                text-align: center;
                font-weight: bold;
                margin-bottom: 5px;
            }
            .s-c-goods{
                margin: 40px auto 0 auto;
                display: flex;
                justify-content: center;
                align-items: baseline;
                font-size: 24px;
                color: #FFE8D6;
                width: 180px;
                height: 100px;
                line-height: 100px;
                background: url(../assets/images/popCouponBg.png);
                background-size: 100% 100%;
                div{
                    margin-left: -35px;
                    padding-top: 5px;
                    .big{
                        font-size: 48px;
                        color: #FFE8D6;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: 46px;
                    }
                }
            }
  
            .s-c-btn{
                background-image: linear-gradient(-90deg, #FE603D 0%, #FD3725 100%);
                box-shadow: 0 3px 6px 0 rgba(165,59,48,0.29);
                border-radius: 4px;
                width: 100%;
                height: 45px;
                line-height: 45px;
                margin: 40px auto 0 auto;
                font-size: 18px;
                color: #FFFFFF;
                letter-spacing: 1.4px;
                text-align: center;
            }
            .s-c-tips{
                margin-top: 10px;
                font-size: 14px;
                color: #757575;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
}
</style>
