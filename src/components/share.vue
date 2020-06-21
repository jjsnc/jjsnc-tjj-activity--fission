<style lang="scss" scoped>
    .share-s1{
        background:rgba(248,248,248,.95);
        padding-bottom: 40px;
    }
    .share-s1 h2{font-size:16px;color:#83868f;line-height:50px;text-align:center;}
    .share-s1 ul{overflow:hidden;margin-bottom:14px;display: -webkit-flex;display: flex;}
    .share-s1 ul:last-child{margin-bottom:0;}
    .share-s1 li{flex: 0 0 33.3%;text-align:center; }
    .share-s1 li > a{display:block;-webkit-tap-highlight-color: rgba(0,0,0,0);}
    .share-s1 li p{font-size:13px;color:#83868f;line-height:26px;margin-top:3px;}
    // .share-s1 li .zan{width:17px;height:17px;background:url(../images/zan.png) no-repeat;background-size:34px; background-position:-17px 0; position:absolute;top:0px;right:-13px;}
    .share-s1 i{display:block;width:54px;height:54px;margin:0 auto;background:url(./../assets/images/common/share_icons.png) no-repeat;background-size:162px auto;position:relative}
    .share-s1 i.pyq{background-position:0 0;}
    .share-s1 i.wx{background-position:-54px 0;}
    .share-s1 i.qq{background-position:-108px 0;}
    .share-s1 i.zoom{background-position:0 -54px;}
    .share-s1 i.wb{background-position:-54px -54px;}
    .share-s1 i.copy{background-position:-108px -54px;}

    .share-s1 .shareCon{padding:0 7%;}
    .share-s1 .btn{width:100%;height:60px;}
    .share-s1 .btn a{display:block;width:100%;line-height:60px;font-size:15px;color:#3c3f46!important;text-align:center;-webkit-tap-highlight-color: rgba(0,0,0,0);}
    .share-s1 img{ pointer-events:none;}
    .share-s2{position:fixed;width:100%;height:100%;left:0;bottom:0;background:rgba(0,0,0,.7);z-index:9999;}
    .share-s2 .share-btn{display:block;width:36%;margin:0 auto;-webkit-tap-highlight-color: rgba(0,0,0,0);}
    .share-s2 .share-btn img{width:100%;}
    .share-s2 .pic1{padding-top:3%;margin-bottom:12%;}
    .share-s2 .pic2{width:64%;margin:0 auto;margin-top:10%;}
    .share-s2 .share-b{position:absolute;width:100%;bottom:4%;}
    .share-s2.bg2{background:rgba(0,0,0,.9)}
    .share-s2 .pic3{margin:5% 0 5%;}
    .share-s1 img{ pointer-events:none;}
    @media screen and (max-height: 480px){
    .share-s2 .pic3{width:94%;margin:5% auto;}
    }
    .float-mask {position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0, 0, 0, 0.5);z-index: 9998;opacity: 0;-webkit-transition-duration: .3s;transition-duration: .3s;visibility: hidden;}
    .mask-visible {visibility: visible;opacity: 1;}
    .share-bg{position: fixed;top: 0;left: 0;z-index: 9999;display: none;width: 100%;height: 100%;background: url(./../assets/images/common/share_icon2@3x.png) no-repeat 1.81rem 2.38rem;background-size: 17.94rem 11.44rem;background-color: rgba(0, 0, 0, 0.7);}

    /*分享成功*/
    .share-s3{ position: fixed; width: 100%; height: 100%; left: 0; top: 0; background: rgba(0,0,0,.6); z-index: 1000;}
    .share-s3 .share-con{ position: absolute; top: 50%; left: 50%; margin-left: -140px; width: 280px; background: #ffffff; border-radius: 5px; z-index:900; transform: translateY(-50%); -webkit-transform: translateY(-50%);}
    .share-s3 .share-con h2{ text-align:center; font-size:16px; line-height:16px; padding:14px 0; background-color:#f8f8f8; color:#ff6666; border-top-left-radius:5px; border-top-right-radius:5px;}
    .share-s3 .share-con h2 i{ display:inline-block; width:16px; height:16px; margin-right:5px; background:url(./../assets/images/common/icon_ok.png) center no-repeat; background-size:16px auto; vertical-align:-2px;}
    .share-s3 .share-con .tuijian{ margin:20px 13px 0; }
    .share-s3 .share-con .tuijian h4{ color:#83868f; font-size:14px; line-height:1; margin-bottom:5px;}
    .share-s3 .share-con .tuijian li{ border-bottom:1px solid #f4f4f4;}
    .share-s3 .share-con .tuijian li a{ display:block; color:#0c0d0e; font-size:14px; line-height:21px; padding:10px 0;}
    .share-s3 .share-con .share-mores{ height:36px; line-height:36px; margin:20px 30px; border-radius:2px; background-color:#e83b3c; text-align:center;}
    .share-s3 .share-con .share-mores a{ display:block; color:#fff; font-size:14px;}
    .share-s3 .share-con .close{ position:absolute; width:32px; height:32px; top:-16px; right:-14px; background:url(./../assets/images/common/fx-colse.png) center no-repeat; background-size:32px auto; z-index:950;}
</style>

<template>
    <div class="allShare">
        <slideUpBox :show="shareShow" @changeBoxShow="changeShareShow()">
            <div class="share-s1">
                <h2>分享到</h2>
                <div class="shareCon">
                    <ul>
                        <li :style="`order:${shareData.navs.indexOf(0) + 1};`" v-show="shareData.navs.indexOf(0) >= 0" class="sns" @click.stop="appShare(0, 'wechatfriends')" data-app="wechatfriends">
                            <a href="javascript:;">
                                <i class="wx"></i>
                                <p>微信好友</p>
                            </a>
                        </li>
                        <li :style="`order:${shareData.navs.indexOf(1) + 1};`" v-show="shareData.navs.indexOf(1) >= 0" class="sns" @click.stop="appShare(1, 'qq')" data-app="qq">
                            <a href="javascript:;">
                                <i class="qq"></i>
                                <p>QQ好友</p>
                            </a>
                        </li>
                        <li :style="`order:${shareData.navs.indexOf(3) + 1};`" v-show="shareData.navs.indexOf(3) >= 0" class="sns" @click.stop="appShare(3, 'qzone')" data-app="qzone">
                            <a href="javascript:;">
                                <i class="zoom"></i>
                                <p>QQ空间</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- <div class="btn" onclick="distIndex.toggleAppShare()"><a href="javascript:;">取消</a></div></div> -->
            </div>
        </slideUpBox>
        <msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>

<script>
import slideUpBox from "@/components/slideUpBox";
import msgBox from "@/components/msgBox";
import App from "@/assets/js/common/wap.app.js";
import { getQueryString, appShare, is_weixin, getEnvironment} from "@/assets/js/common/utils.js";
import AllShare from '@/assets/js/common/superShare.js'
export default {
	name: "allShare",
	data() {
		return {
            superShare: null,
            isWeixin: is_weixin(),
            environment: getEnvironment(),
            msgTxt: '',
        };
	},
	props: {
        shareShow: {
            type: Boolean,
            default: false
        },
		shareData: {
			type: Object,
			default: {
                navs: [0,1,3], //0：微信好友；1：QQ好友；3：QQ空间
            }
		}
    },
    components: {
        slideUpBox,
        msgBox
    },
	created() {
        if(this.environment == 0){ // 非app内部和小程序内部
            this.superShare = new AllShare({
                name: this.shareData.shareTitle || "淘集集",
                desc: this.shareData.shareContent,
                link: this.shareData.shareUrl,
                image: this.shareData.shareImg
            })
        }
    },
	methods: {
        changeShareShow(){
            this.shareShow = !this.shareShow;
        },
		// app分享
		appShare(type, typeTxt) {
            if((this.isWeixin && this.environment == 0) || this.environment == 2){ // 微信内部浏览器或者小程序
                this.msgTxt = '请使用自带分享功能';
            }else if(this.environment == 0){ // 微信外部浏览器
                this.superShare.outShare.weekShare(typeTxt);
            }else{ // app内部
                let appShareObj = {
                    shareType: type,
                    title: this.shareData.shareTitle || "淘集集",
                    content: this.shareData.shareContent,
                    shareUrl: this.shareData.shareUrl,
                    imgUrl: this.shareData.shareImg
                };
                this.shareData.wxMiniPath
                    ? (appShareObj.wxMiniPath = this.shareData.wxMiniPath)
                    : "";
                appShare(appShareObj);
            }

            
		}
	}
};
</script>