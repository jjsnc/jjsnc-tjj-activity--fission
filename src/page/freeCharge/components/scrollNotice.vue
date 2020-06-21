<template>
    <div class="notice-component">
        <h3 class="title-3">
            <span class="text">TA们正在免单购物</span>
        </h3>
        <div class="list-wrap" v-bind:style="wrapStyle">
            <ul class="list" :class="{active:animate}">
                <li class="item" :key="index" v-for="(item, index) in noticeList">
                    <img class="my-img" v-if="item.userIcon" :src="item.userIcon">
                    <img class="my-img" v-else src="../assets/images/toux@2x.png">
                    <span class="text">[拼团成功]{{item.user}}等{{item.user_num}}人免单返现{{item.price}}元</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { shareDanmuList } from "./../assets/js/api.js";
export default {
    name: "scrollNotice",
    data() {
        return {
            animate: false,
            noticeList: [],
            noticeListLen: ""
        };
    },
    created() {
        this.getDanmuList();
    },
    computed: {
        wrapStyle() {
            let length = this.noticeListLen ;
            let styleObj = {};
            if (length > 4) {
                styleObj = { height: 4 * 44 + "px" };
            } else if (length == 1) {
                styleObj = { height: 1 * 44 + "px" };
            } else {
                styleObj = { height: (length - 1) * 44 + "px" };
            }

            return styleObj;
        }
    },
    methods: {
        // 获取面单购物进行中用户
        getDanmuList() {
            let self = this;
            this.$http.get(shareDanmuList).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    self.noticeList = data.data;
                    self.noticeListLen = self.noticeList.length;
                    self.noticeListLen > 1  ? setInterval(this.showMarquee, 2000) : "";
                } else {
                   console.log(data.message)
                }
            });
        },
        showMarquee() {
            this.animate = true;
            setTimeout(() => {
                this.noticeList.push(this.noticeList[0]);
                this.noticeList.shift();
                this.animate = false;
            }, 500);
        }
    },
    mounted() {},
    watch: {}
};
</script>
<style lang="scss" scoped>
.notice-component {
    width: 354px;
    background: #fff;
    border-radius: 6px;
    margin: 0 auto;
    padding-bottom: 10px;
    .title-3 {
        height: 54px;
        line-height: 54px;
        font-size: 18px;
        color: #ff6632;
        text-align: center;
        align-items: center;
        font-weight: bold;
        .text {
            padding: 0 6px;
        }
        &::before {
            content: "";
            display: inline-block;
            width: 87px;
            height: 12px;
            background: url("../assets/images/left@2x.png");
            background-size: 87px 12px;
        }
        &::after {
            content: "";
            display: inline-block;
            width: 87px;
            height: 12px;
            background: url("../assets/images/right@2x.png");
            background-size: 87px 12px;
            background-repeat: no-repeat;
            vertical-align: middle;
        }
    }
    .list-wrap {
        display: block;
        position: relative;
        overflow: hidden;
        .list {
            padding: 0 20px;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            &.active {
                transition: all 0.5s;
                margin-top: -44px;
            }
            .item {
                display: flex;
                height: 36px;
                line-height: 36px;
                margin-bottom: 8px;
                .my-img {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                }
                .text {
                    box-sizing: border-box;
                    width: 280px;
                    flex: 280px;
                    font-size: 14px;
                    line-height: 36px;
                    padding-left: 8px;
                    color: #333333;
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