<style scoped lang="scss">
.nav {
    width: 100%;
    height: 149px;
    position: relative;
    // opacity: 0.74;
    background-image: linear-gradient(-180deg, #FFD48F 0%, #FFC104 100%);
    .tab {
        // padding: 15px 0;
        height: 48px;
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 16px;
        color: #D26F22;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99;
        background-image: linear-gradient(-180deg, #FFD48F 0%, #ffce65 100%);
        background-repeat: no-repeat;
        .item{
            position: relative;
            &.act {
                font-weight: bold;
                color: #794216;
                &::after {
                    display: block;
                    background: #794216;
                }
            }
            &::after {
                display: none;
                content: "";
                position: absolute;
                bottom: -6px;
                left: 50%;
                width: 31px;
                height: 3px;
                border-radius: 3px;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                background: #794216;
            }
            img{
                width: 46px;
                position: absolute;
                top: -11px;
                right: -46px;
            }
        }
    }
    .top{
        width: 100%;
        // position: relative;
        position: absolute;
        bottom: 0;
        top: 48px;
        background-image: linear-gradient(-180deg, #FFD48F 0%, #FFC104 100%);
        .bg{
            width: 100%;
        }
        .rule{
            position: absolute;
            top: 19px;
            right: 0;
            width: 50px;
        }
    }
}
</style>
<template>
    <div :class="['list', hasData ? 'hasData':'']">
        <div class="nav">
            <div class="tab">
                <div :class="{act:origin==1,'item':true}" @click="changeTab(1)">十元五件</div>
                <div :class="{act:origin==0,'item':true}" @click="changeTab(0)">十元两件
                    <img src="../assets/images/pinzhi@2x.png" />
                </div>
            </div>
            <div class="top">
                <img src="../assets/images/10_2@2x.png" v-show="!origin" class="bg">
                <img src="../assets/images/img_bg@2x.png" v-show="origin" class="bg">
                <img src="../assets/images/bg_rules@2x.png" class="rule" @click.self.stop="popRule">
            </div>
        </div>
        <rule :ruleShow="ruleShow1"></rule>
        <rule1 :ruleShow="ruleShow2"></rule1>
        <components :is="isModel" ></components>
    </div>
</template>

<script >
import { eventTrack} from "@/assets/js/common/eventTrack.js";
import { toHomeTwo, toHome} from "./../assets/js/url.js";
import { getQueryString } from "@/assets/js/common/utils";

export default {
    name: "home",
    data() {
        return {
            hasData: false, //页面无数据不显示，只显示加载loading
            origin:getQueryString("twoList")?0:1,
            isModel:getQueryString("twoList")?"twoList":"fiveList",
            ruleShow1:false,
            ruleShow2:false,
        };
    },
    watch: {
        $route(to, from) {
            console.log(this.$route,"111");
            // this.setCartData();
        }
    },
    created() {
          eventTrack({
            funType: 'h5'   ,
            pageName: 'ten_page',
            elementId: 'pv',
            eventType:'view',
            firstPage:'ten_page'
        })
    },
    mounted() {
        //统计埋点
        let data = {
            code: "TF0",
            query: {
                name: "十元五件集市"
            }
        };
        this.$tapConfig.batchClick(0, data, 0);
    },
    methods: {
        //规则弹框
        popRule() {
            if(this.origin)
                this.ruleShow1 = !this.ruleShow;
            else
                this.ruleShow2 = !this.ruleShow;
        },
        changeTab(val){
            if(this.origin==val)return;
            if(val==1){
                this.origin=1;
                this.isModel='fiveList';
                this.$router.replace(`${toHome}`)
            }else{
                this.origin=0;
                this.isModel='twoList';
                this.$router.replace(`${toHomeTwo}`)
            }
        }
        
    },
    components: {
        twoList:resolve => require(['./twoList.vue'], resolve),
        fiveList:resolve => require(['./fiveList.vue'], resolve),
        rule:resolve => require(['./rule.vue'], resolve),
        rule1:resolve => require(['./rule1.vue'], resolve),
    }
};
</script>

