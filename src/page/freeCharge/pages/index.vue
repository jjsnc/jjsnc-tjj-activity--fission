<style lang="sass" scoped>

</style>
<template>
    <div>
        <msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>
<script>
import msgBox from "@/components/msgBox.vue";
import { getQueryString,  _getUserInfo,} from "@/assets/js/common/utils.js";
import {jump2Login} from "./../assets/js/utils";
import { diffPage,checkToken} from "./../assets/js/api.js";
export default {
    name: "index",
    components: {
        msgBox
    },
    data() {
        return {
            msgTxt: "",
            user_info: _getUserInfo(),
        };
    },
    created() {
        if (!localStorage.getItem("hasAuthForFree")) {
            jump2Login({
                loginParams: "/s_user_id/" + getQueryString("s_user_id") + "/group_id/" + getQueryString("group_id")
            });
            localStorage.setItem("hasAuthForFree", 1);
            return;
        }
        if (getQueryString("wxLoginBack") == 0) {
            this.msgTxt =
                decodeURI(getQueryString("wxLoginMessage")) ||
                "微信授权登录失败，请退出重新进入";
            return;
        }
        if (
            this.user_info.uuid &&
            this.user_info.token &&
            this.user_info.user_id
        ) {
            this.checkToken();
            return;
        }
        jump2Login({
            loginParams: "/s_user_id/" + getQueryString("s_user_id") + "/group_id/" + getQueryString("group_id")
        });
    },
    methods: {
        checkToken() {
            let params = {
                app_resource: 0
            };
            this.$http.get(checkToken, { params }).then(res => {
                console.log(res);
                let data = res.data;
                if (data && data.result == 1) {
                    // 登录未失效
                    this.toDiffPage();
                    return;
                } else if (data && data.result == 0) {
                    jump2Login({
                        loginParams: "/s_user_id/" + getQueryString("s_user_id") + "/group_id/" + getQueryString("group_id")
                    });
                } else {
                    this.msgTxt =
                        (res && res.data && res.data.message) || "网络错误";
                }
            });
        },
        toDiffPage(){
            //   let params = {
            //     group_id: getQueryString("group_id"),
            //     s_user_id: getQueryString("s_user_id")
            // };
            window.location.href = diffPage + "/group_id/" + getQueryString("group_id") + "/s_user_id/"+ getQueryString("s_user_id")
            // this.$http.get(diffPage, { params }).then(res => {
            //     console.log(res);
            // })
        }
    }
};
</script>


