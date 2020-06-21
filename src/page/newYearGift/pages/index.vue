<template>
    <div :class="['main',isWxMini?'wxMin':'']" >
        <topDanmu :dataObj="danmuData" v-if="danmuData.length > 0"></topDanmu>
        <div @click.capture.stop="showPop" v-if="isWxMini">
            <transition>
                <!-- <keep-alive> -->
                    <router-view :key="key"  :is_update="is_update"></router-view>
                <!-- </keep-alive> -->
            </transition>
            <footer>
                <router-link :to="main_url" tag="div" :class="{'active':$route.path.indexOf('/index/myFree')<0}">
                    <img src="../assets/images/gift@2x.png" v-if="$route.path.indexOf('/index/myFree')<0"/>
                    <img src="../assets/images/gift2@2x.png" v-if="$route.path.indexOf('/index/myFree')>-1"/>
                    <span>免费送礼</span>
                </router-link>
                <router-link :to="my_url" tag="div" :class="{'active':$route.path.indexOf('/index/myFree')>-1}">
                    <img src="../assets/images/my_press@3x.png"  v-if="$route.path.indexOf('/index/myFree')>-1"/>
                    <img src="../assets/images/my@2x.png"  v-if="$route.path.indexOf('/index/myFree')<0"/>
                    <span>我的送礼</span>
                </router-link>
            </footer>
        </div>
        <div v-else>
            <transition>
                <!-- <keep-alive> -->
                    <router-view :key="key"  :is_update="is_update"></router-view>
                <!-- </keep-alive> -->
            </transition>
            <footer>
                <router-link :to="main_url" tag="div" :class="{'active':$route.path.indexOf('/index/myFree')<0}">
                    <img src="../assets/images/gift@2x.png" v-if="$route.path.indexOf('/index/myFree')<0"/>
                    <img src="../assets/images/gift2@2x.png" v-if="$route.path.indexOf('/index/myFree')>-1"/>
                    <span>免费送礼</span>
                </router-link>
                <router-link :to="my_url" tag="div" :class="{'active':$route.path.indexOf('/index/myFree')>-1}">
                    <img src="../assets/images/my_press@3x.png"  v-if="$route.path.indexOf('/index/myFree')>-1"/>
                    <img src="../assets/images/my@2x.png"  v-if="$route.path.indexOf('/index/myFree')<0"/>
                    <span>我的送礼</span>
                </router-link>
            </footer>
        
        </div>

        <popAlert :popShow="popShow"></popAlert>
    </div>
</template>

<script >
import topDanmu from "@/components/topDanmu";
import popAlert from "./popAlert";
import {getEnvironment} from "@/assets/js/common/utils";
import {danmuList} from "./../assets/js/api.js";
import {toMainFree,toMyFree} from './../assets/js/url.js'

export default {
    name: "newyearGift",
    data() {
        return {
            danmuData: [], //弹幕数据 
            
            is_update:false,//强制刷新
            isWxMini:false,
            popShow:false,
        };
    },
    created() {
        if(getEnvironment()==2){
            this.isWxMini=true;
        }
        this.getDanmuData();
    },
    directives: {
        trigger:{
            inserted(el,binding){
                el.click();
            }
        }
    },
    methods: {
        showPop(){
            this.popShow=this.isWxMini
        },
        //获取弹幕信息
        getDanmuData(){
            this.$http.get(danmuList).then(res=>{
                if(res.data.result==1){
                    this.danmuData=res.data.items;
                }
            },err=>{})
        },
        //更新组件
        my_update(){
            this.is_update=!this.is_update;
        }
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
            return toMainFree
        },
        my_url(){
            return toMyFree
        }
    },
    components: {
        topDanmu,
        popAlert
    }
};
</script>

<style scoped lang="scss">
.main {
    min-height: 100%;
    background: #db2331;
    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        display: flex;
        background: #f9f9f9;
        color: #fff;
        z-index: 2;
        box-sizing: content-box;
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
             background: #BE010A;
        }
        .active {
            background: #fde9d9;
            color: #db2331;
        }
    }
    
}
.iPhoneX{
    footer {
        padding-bottom: 20px;
    }
}
</style>
