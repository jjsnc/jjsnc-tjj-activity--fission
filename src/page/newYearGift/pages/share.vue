<template>
    <div :class="['share', shareShow ? 'share-show' : '']" @click.self.stop="closeShare()">
        <div class="share-cont">
            <div class="s-c-close" @click.stop="closeShare()" >
                <img src="../assets/images/close@2x.png"/>
            </div>
            <div class="s-c-con">
                <div class="s-c-title">淘集集送礼新方式</div>
                <div class="s-c-goods">
                    <img :src="goods.imgUrl"/>
                    <div class="s-c-goods-info">
                        <div class="s-c-goods-title">{{goods.goodsName}}</div>
                        <div class="s-c-goods-price"><span>￥</span><span class="price">{{goods.groupPrice}}</span><span class="origin"></span></div>
                        <div class="s-c-goods-tip">满{{goods.lotteryNum}}人参与，立刻开奖</div>
                    </div>
                </div>
                <div class="s-c-tip">*参与到达设定人数自动开奖，必有1位好友中奖</div>
                <div class="s-c-label">传达心意，送句祝福</div>
                <input type="text" placeholder="我从淘集集上选了一件礼物送大家，20个字…" class="s-c-input" v-model="sendMsg" @blur="inputBlur">
                <div class="s-c-btn" @click="shareWx">
                    <img src="../assets/images/redpacket_share@2x.png" />
                </div>
            </div>
        </div>
   </div>
</template>

<script >
export default {
   name: '',
   props: {
        shareShow: {
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
           sendMsg:this.goods.shareBlessing
       }
   },
   created() {
       
   },
   
   methods: {
       closeShare(){
           this.$parent.shareShow = false;
       },
       shareWx(){
           let obj={
               title:"我发起了礼物抽奖给大家，快来免费抢！",
               content:this.goods.goodsName+"\n"+this.goods.lotteryNum+"人参与，必有1人中奖",
               shareUrl:location.origin + '/newYearGift/view/v1_0_0/luckyDetail/',
               imgUrl:this.goods.imgUrl,
               share_blessing:this.sendMsg?this.sendMsg:"我从淘集集上选了一件礼物送大家，祝大家天天好心情！"
            };
           this.$emit("sendShare",obj)
       },
       inputBlur(){
            if(this.sendMsg.length>=25){
               this.sendMsg=this.sendMsg.slice(0,25)
            }
            if(this.sendMsg.length==0){
                    this.sendMsg="我从淘集集上选了一件礼物送大家，祝大家天天好心情！";
            }
       }
   },
   components: {}
}
</script>

<style scoped lang="scss">
.share {
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
    &.share-show {
        opacity: 1;
        visibility: visible;
        z-index: 998;
        .share-cont {
            -webkit-transform: translate(-50%, -50%) scale(1, 1);
            transform: translate(-50%, -50%) scale(1, 1);
        }
        
    }
     .share-cont {
        width: 327px;
        height: 456px;
        background: url('../assets/images/redpacket@2x.png');
        background-size: 100% 100%;
        padding: 30px;
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
                font-size: 20px;
                color: #EC3138;
                text-align: center;
                font-weight: bold;
                margin-top: 16px;
            }
            .s-c-goods{
                margin-top: 24px;
                display: flex;
                img{
                    width: 120px;
                    height: 120px;
                    margin-right: 10px;
                    border: 0;
                }
                .s-c-goods-info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 5px 0;
                    .s-c-goods-title{
                        font-size: 13px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        margin-bottom: 30px;
                    }
                    .s-c-goods-price{
                        color: #EE0000 ;
                        font-size: 12px;
                        .price{
                            font-size: 24px;
                            margin-right: 10px;
                            font-weight: bold;
                        }
                        .origin{
                            color: #999999;
                            text-decoration: line-through;
                        }
                    }
                    .s-c-goods-tip{
                        color: #EE0000 ;
                        font-size: 12px;
                    }
                }
            }
            .s-c-tip{
                margin: 10px 0 23px ;
                text-align: center;
                padding: 8px 0;
                background: #FDE9D9;
                font-size: 11px;
                color: #FF6632;
            }
            .s-c-label{
                font-size: 12px;
                margin-bottom: 6px;
            }
            .s-c-input{
                -webkit-appearance: none;
                width:100%;
                height: 36px;
                line-height: 36px;
                background: #fff;
                border: 1px solid #D8D8D8;
                font-size: 12px;
                padding-left: 10px;
            }
            .s-c-btn{
                width: 238px;
                height: 54px;
                margin: 56px auto 0 auto;
                img{
                    width: 100%;
                }
            }
        }
    }
}
</style>
