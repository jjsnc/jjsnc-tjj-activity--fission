<style scoped lang="scss">
.main {
    min-height: 100%;
    background: #f9f9f9;
    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        display: flex;
        background: #f9f9f9;
        color: #757575;
        z-index: 2;
        box-sizing: content-box;
        font-size: 15px;
        box-shadow: 0 -1px 0 0 rgba(234,234,234,0.26);
        div{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            img{
                width: 20px;
                height: 20px;
                margin-right: 6px;
            }
             background: #fff;
        }
        .active {
            background: #FFF7ED;
            color: #FF6632;
        }
    }
    
}
.iPhoneX{
    footer {
        padding-bottom: 20px;
    }
}
</style>

<template>
    <div :class="['main',platForm==0?'wxMin':'']" >
        <topDanmu :dataObj="danmuData" v-if="danmuData.length > 0"></topDanmu>
        <div >
            <transition>
                <!-- <keep-alive> -->
                    <router-view :key="key"  :is_update="is_update"></router-view>
                <!-- </keep-alive> -->
            </transition>
            <footer>
                <router-link :to="main_url" tag="div" :class="{'active':$route.path.indexOf('/home/myFree')<0}">
                    <img src="../assets/images/icon_1goods1@2x.png" v-if="$route.path.indexOf('/home/myFree')<0"/>
                    <img src="../assets/images/icon_1goodsgray@2x.png" v-if="$route.path.indexOf('/home/myFree')>-1"/>
                    <span>今日免单团</span>
                </router-link>
                <router-link :to="my_url" tag="div" :class="{'active':$route.path.indexOf('/home/myFree')>-1}">
                    <img src="../assets/images/icon_mygoodsred@2x.png"  v-if="$route.path.indexOf('/home/myFree')>-1"/>
                    <img src="../assets/images/icon_mygoods1@2x.png"  v-if="$route.path.indexOf('/home/myFree')<0"/>
                    <span>我的免单团</span>
                </router-link>
            </footer>
        </div>
        <msgBox :msgTxt="msgTxt"></msgBox>
        <downLoad :downloadPopShow="downloadPopShow"></downLoad>
        <oldUserPop :oldUserPopShow="oldUserPopShow"></oldUserPop>
    </div>
</template>

<script >
import downLoad from "../components/downLoad";
import oldUserPop from "../components/oldUserPop";
import msgBox from "@/components/msgBox";
import topDanmu from "../components/topDanmu";
import {getEnvironment,_getUserInfo,getQueryString,checkBrowser} from "@/assets/js/common/utils";
import {jump2Login} from "./../assets/js/utils";
import {danmuList,checkToken} from "./../assets/js/api.js";
import {toMainFree,toMyFree} from './../assets/js/url.js'
// import Wechat_api from "@/assets/js/common/wechat_api.js";
export default {
    name: "freeCharge",
    components: {
        topDanmu,
        downLoad,
        oldUserPop,
        msgBox
    },
    data() {
        return {
            danmuData: [], //弹幕数据 
            is_update:false,//强制刷新
            downloadPopShow:false,//下载弹框
            oldUserPopShow:false,//老用户提示
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            user_info: _getUserInfo(),
            msgTxt: "",
        };
    },
    created() {
        console.log(this.$route)
        if(this.platForm==0){
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

        }else{
            this.getDanmuData();
        }
    },
    watch:{
        $route(to,from){
            // if(from.name=="share"&&getQueryString("isNew")&&checkBrowser().versions.android&& sessionStorage.getItem("androidRefresh")){
            //     sessionStorage.setItem("androidRefresh",1);
            //     location.replace(location.href);
            // }
        }

    },
    directives: {
        trigger:{
            inserted(el,binding){
                el.click();
            }
        }
    },
    methods: {
        checkToken() {
            let params = {
                app_resource: 0
            };
            let self=this;
            this.$http.get(checkToken, { params }).then(res => {
                console.log(res);
                // new Wechat_api({
                //     shareJson: {
                //         title: "3人成团，全员免单，快来一起免单购物！", // 分享标题
                //         link:`${location.origin}/freeCharge/view/${process.env.VERSION}/index/s_user_id/${self.user_info.user_id}/group_id/${getQueryString("group_id")}`,
                //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                //         desc: "免单特权，机不可失！"
                //     }
                // });
                let data = res.data;
                if (data && data.result == 1) {
                    // if(this.$router.name=="share"&&getQueryString("isNew")&&checkBrowser().versions.android&& sessionStorage.getItem("androidRefresh")){
                    //     sessionStorage.setItem("androidRefresh",1);
                    //     location.replace(location.href);
                    // }
                    // 登录未失效
                    //统计埋点
                    let data_s = {
                        code: "MD03",
                        query: {
                            name: "被分享者页面"
                        },
                        extra: {
                            param1: 2
                        }
                    };
                    this.$tapConfig.batchClick(0, data_s, 0);
                    if(!getQueryString("isNew")) this.oldUserPopShow=true;
                    // 初始化分享
                    this.getDanmuData();

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
        //获取弹幕信息
        getDanmuData(){
            this.$http.get(danmuList).then(res=>{
                if(res.data.result==1){
                    this.danmuData=res.data.data;
                }
            },err=>{})
        },
        //更新组件
        my_update(){
            this.is_update=!this.is_update;
        },
    },
    //  watch: {
    //     $route(to,from){
    //         if(from.name=="goodsDetail"){
    //             alert(from.name+"21341234");
    //             this.$forceUpdate();
    //         }
    //     }
    // },
    computed: {
        key(){
            return this.$route.name
        },
        main_url(){
            if(getQueryString("isNew"))
                return toMainFree + '/isNew/'+getQueryString("isNew");
            else
                return toMainFree;
        },
        my_url(){
            if(getQueryString("isNew"))
                return toMyFree + '/isNew/'+getQueryString("isNew");
            else
                return toMyFree;
        }
    },
    
};
</script>

