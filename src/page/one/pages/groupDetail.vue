<style scoped lang="scss">
.wrapper {
    background: #e94e4a;
    min-height: 100%;
    width: 100%;
    padding: 10px 0;
    position: relative;
}
</style>
<template>
    <div class="wrapper">
        <components :is="isModel"></components>
        <oneList v-show="isModel=='share'&&status!=3"></oneList>
        <recommendList v-show="isModel=='myShare'&&status!=1||isModel=='share'&&status==3"></recommendList>
        <scrollBaskInfo v-show="isModel=='myShare'&&status==1"></scrollBaskInfo>
    </div>
</template>

<script >
import myShare from "./myShare";
import share from "./share";
import recommendList from "../components/recommendList";
import scrollBaskInfo from "../components/scrollBaskInfo";
import oneList from "../components/oneList";
import { shareDetail, getGroupId } from "./../assets/js/api.js";
import { getQueryString, _getUserInfo } from "@/assets/js/common/utils";
import App from "@/assets/js/common/wap.app.js";

export default {
    name: "groupDetail",
    data() {
        return {
            user_info: _getUserInfo(),
            // origin:getQueryString("twoList")?0:1,
            isModel:
                // getQueryString("user_id") == _getUserInfo()["user_id"]
                getQueryString("myShare") ? "myShare" : "share",
            status: 0
        };
    },
    watch: {
        $route(to, from) {
            console.log(this.$route);
        }
    },
    created() {},
    mounted() {},
    methods: {
        // 获取getGroupId
        _getGroupId() {
            let self = this;
            let params = {
                order_no: this.order_no
            };
            this.$http.post(getGroupId, params).then(res => {
                if (res.data && res.data.result == 1) {
                    self.group_id = res.data.group_id;
                    self.group_id == 0 && self._it.next().done == false
                        ? ""
                        : self.getShareDetail();
                } else {
                    self.msgTxt = res.data.message || "获取groupId 失败";
                }
                new Wechat_api({
                    shareJson: {
                        title: "3人成团，全员免单，快来一起免单购物！", // 分享标题
                        link: `${location.origin}/freeCharge/view/${
                            process.env.VERSION
                        }/index/s_user_id/${self.s_user_id}/group_id/${
                            self.group_id
                        }`,
                        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        desc: "免单特权，机不可失！"
                    },
                    hideShareType: 1
                });
            });
        },

        // 获取分享详情
        getShareDetail() {
            let self = this;
            const params = {
                group_id: this.group_id,
                s_user_id: this.s_user_id,
                order_no: this.order_no
            };
            this.$http.get(shareDetail, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    data = data.data;
                    self.countDown = parseInt(data.countDown);
                    self.goodsInfo = data.goodsInfo;
                    self.orderId = data.orderId;
                    self.userId == data.isGroup
                        ? (self.isGroup = 1)
                        : (self.isGroup = 0);
                    self.status = parseInt(data.groupStatus);
                    // self.isGroup == 0 ? self.beShared() : ""; //被分享页面埋点
                    // self.userInfo = data.userInfo;
                    self.joinNum = data.joinNum;
                    self.lackNum = 3 - self.joinNum;

                    self.groupUserInfo = self.userInfo.filter(item => {
                        return item.userId == data.isGroup;
                    })[0];
                    if (self.countDown > 0) {
                        self._contDown(self.countDown);
                    }
                } else {
                    this.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
                console.log("这里需要初始化微信分享数据ok");
                new Wechat_api({
                    shareJson: {
                        title: "3人成团，全员免单，快来一起免单购物！", // 分享标题
                        link: `${location.origin}/freeCharge/view/${
                            process.env.VERSION
                        }/index/s_user_id/${self.s_user_id}/group_id/${
                            self.group_id
                        }`,
                        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        desc: "免单特权，机不可失！"
                    },
                    hideShareType: 1
                });
            });
        }
    },
    components: {
        myShare,
        share,
        oneList,
        recommendList,
        scrollBaskInfo
    }
};
</script>

