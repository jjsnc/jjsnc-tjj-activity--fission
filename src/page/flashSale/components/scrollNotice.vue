<template>
    <div class="notice-component">
        <div class="list-wrap">
            <ul class="list" :class="{active:animate}">
                <li class="item" :key="index" v-for="(item, index) in noticeListCopy">
                    <img class="my-img" v-if="item.userPhoto" v-lazy="item.userPhoto">
                    <img class="my-img" v-else src="../assets/images/toux@2x.png">
                    <span class="text">{{item.userNickName }}{{item.userBuyTime}}秒前抢到了{{item.goodsName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
   danmuList
} from "./../assets/js/api.js";
export default {
    name: "scrollNotice",
    data() {
        return {
            animate: false,
            noticeList:[],
            noticeListCopy: []
        };
    },
    created() {

        
        this.getNoticeDate()
        
    },
    methods: {
        showMarquee() {
            this.animate = true;
            setTimeout(() => {
                this.noticeListCopy.push(this.noticeListCopy[0]);
                this.noticeListCopy.shift();
                this.animate = false;
            }, 500);
        },
        getNoticeDate(){
            let self = this;
           this.$http.get(danmuList).then(res => {
                     self.noticeList = res.data.data;
                     self.noticeListCopy = self.noticeListCopy.concat(self.noticeList);
                     setInterval(self.showMarquee, 2000);
                });
        }
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.notice-component {
    display: inline-block;
    width: 236px;
    background: #fff;
    border-radius: 6px;
    margin: 0 auto;
    .list-wrap {
        display: block;
        height: 20px;
        position: relative;
        overflow: hidden;
        .list {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            &.active {
                transition: all 0.5s;
                margin-top: -20px;
            }
            .item {
                // display: flex;
                height: 20px;
                line-height: 20px;
                text-align: right;
                .my-img {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                .text {
                    vertical-align: middle;
                    display: inline-block;
                    box-sizing: border-box;
                    max-width:210px;
                    flex: 147px;
                    font-size: 12px;
                    line-height: 20px;
                    padding-left: 8px;
                    font-size: 12px;
                    color: #666666;
                    letter-spacing: 0;
                    text-align: left;
                    letter-spacing: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>