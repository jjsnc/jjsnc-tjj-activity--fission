<style lang="scss" scoped>
    .singleBtnAlert{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 998;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        -webkit-transition: opacity .2s;
        transition: opacity .2s;
        opacity: 0;
        visibility: hidden;
        &.alert-show{
            opacity: 1;
            visibility: visible;
            .alertCont{
                -webkit-transform: translate(-50%, -50%) scale(1, 1);
                transform: translate(-50%, -50%) scale(1, 1);
            }
        }
        .alertCont{
            position: absolute;
            top: 50%;
            left: 50%;
            padding: 40px 20px 0;
            -webkit-transform: translate(-50%, -50%) scale(0, 0);
            transform: translate(-50%, -50%) scale(0, 0);
            transform-origin: center center;
            -webkit-transition: transform .2s;
            transition: transform .2s;
            width: pxTorem(310px);
            background-color: #fff;
            border-radius: pxTorem(10px);
            .alertTitle{
                // margin-top: pxTorem(22px);
                font-size: pxTorem(18px);
                line-height: pxTorem(26px);
                color: #333333;
                text-align: center;
                font-weight: bold;
            }
            .tittleImg{
                margin-top: pxTorem(13px);
                img{
                    display: block;
                    width: pxTorem(66px);
                    height: pxTorem(66px);
                    margin: 0 auto;
                    border-radius: 50%;
                }
            }
            .alertTxt{
                width: pxTorem(271px);
                margin: 20px auto 30px;
                font-size: pxTorem(14px); 
                line-height: pxTorem(19px);
                color: #757575;
                text-align: center;
                &.noTitle{
                    margin: pxTorem(31px) auto;
                }
            }
            .alertBtns{
                width: 100%;
                height: pxTorem(42px);
                margin: 0 auto pxTorem(22px);
                font-size: pxTorem(16px);
                line-height: pxTorem(42px);
                text-align: center;
                color: #fff;
                background: -webkit-linear-gradient(-132deg, #ED1400 0%, #FF6632 90%);
                background: linear-gradient(-132deg, #ED1400 0%, #FF6632 90%);
                border-radius: pxTorem(6px);
            }
        }
    }
</style>

<template>
    <div :class="['singleBtnAlert', pShow ? 'alert-show' : '']">
        <div class="alertCont">
            <div class="alertTitle" v-show="alertObj.tittle" v-html="alertObj.tittle"></div>
            <div class="tittleImg" v-show="alertObj.tittleImg">
                <img v-lazy="alertObj.tittleImg" alt="">
            </div>
            <div :class="['alertTxt', !alertObj.tittle && !alertObj.tittleImg ? 'noTitle' : '']"  v-html="alertObj.alertTxt">
            </div>
            <div class="alertBtns" @click.stop="cancel()">
                {{alertObj.btnTxt && alertObj.btnTxt ? alertObj.btnTxt : '确定'}}
            </div>
        </div>
    </div>
</template>

<script>
    import {_disScroll} from "@/assets/js/common/utils.js";
    export default{
        name: 'singleBtnAlert',
        data(){
            return {
                pShow: false
            }
        },
        props: {
            alertObj: {
                type: Object,
                default: {
                    show: false,
                    tittle: '',
                    alertTxt: '',
                    callBack: null,
                }
            }
        },
        watch: {
            alertObj(){
                _disScroll(this.alertObj.show);
                if(!this.alertObj.show){
                    this.pShow = this.alertObj.show;
                }
                this.$forceUpdate();
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.pShow = this.alertObj.show;
                    },0)
                })
            }
        },
        created(){
            // console.log(this.alertObj)
        },
        methods: {
            // ...mapMutations([
            //     'setAlertObj',
            // ]),
            initPtm(){
                this.$parent.alertObj = {
                    show: false,
                    tittle: '',
                    alertTxt: '',
                    callBack: null,
                }
                // this.setAlertObj({
                //     show: false,
                //     tittle: '',
                //     alertTxt: '',
                //     callBack: null,
                // });
            },
            cancel(){
                typeof this.alertObj.callBack == 'function' ? this.alertObj.callBack() : '';
                this.initPtm();
            }
        }
    }
</script>