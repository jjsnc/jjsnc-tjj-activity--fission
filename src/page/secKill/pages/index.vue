<style lang="scss" scoped>
    .secKill-list{
        padding-top: 61px;
        background-color: #fff;
        .seach-box{
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            right: 0;
            padding: 13px;
            background-color: #fff;
            input{
                width: 100%;
                height: 35px;
                padding: 0 15px 0 30px;
                border: 0;
                outline: 0;
                border-radius: 3px;
                // line-height: 35px;
                // font-size: 14px;
                background-color: #F3F3F3;
                background-image: url(./../assets/images/icon_search@2x.png);
                background-size: 13.6px 13.6px;
                background-repeat: no-repeat;
                background-position: 11px center;
            }
            input::-webkit-input-placeholder {
                /* placeholder颜色  */
                color: #BBBBBB;
                line-height: 22px;
                font-size: 14px;
            }
        }
        .banner-box{
            width: 100%;
            height: 84px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .goods-list{
            padding-top: 12px;
            background-color: #fff;
            li{
                margin-top: 12px;
                display: flex;
                &:first-child{
                    margin-top: 0;
                }
                .list-item-left{
                    flex: 0 0 130px;
                    height: 130px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .list-item-right{
                    flex: 1;
                    padding: 5px 10px;
                    .goods-name{
                        margin-bottom: 13px;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 17px;
                        overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
                    }
                    .goods-tip{
                        margin-bottom: 26px;
                        font-size: 11px;
                        color: #EE0000;
                        letter-spacing: 0;
                        line-height: 11px;
                    }
                    .goods-bottom{
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        .goods-price{
                            font-size: 18px;
                            color: #EE0000;
                            letter-spacing: 0;
                            line-height: 18px;
                            span{
                                font-size: 13px;
                            }
                        }
                        .goods-btn{
                            width: 130px;
                            height: 32px;
                            background-image: linear-gradient(-270deg, #F53917 0%, #FF8232 100%);
                            border-radius: 4px;
                            font-size: 14px;
                            color: #FFFFFF;
                            text-align: center;
                            line-height: 32px;
                            &.dis-goods-btn{
                                background: #C0C0C0;
                            }
                            &.on-goods-btn{
                                &::before{
                                    content: '';
                                    display: inline-block;
                                    position: relative;
                                    top: 2px;
                                    width: 14px;
                                    height: 14px;
                                    margin-right: 5px;
                                    background-image: url(./../assets/images/icon_clock_small@2x.png);
                                    background-size: cover;
                                }
                            }
                        }
                    }
                }
            }
        }
        .empty-data{
            width: 100%;
            margin-top: 50px;
            img{
                display: block;
                width: 180px;
                margin: 0 auto;
            }
            p{
                font-size: 15px;
                color: #757575;
                text-align: center;
                line-height: 21px;
            }
        }
    }
</style>

<template>
    <div class="secKill-list">
        <div class="seach-box" ref="seachBox">
            <form action="">
                <input ref='searchInput' type="search" placeholder="请输入商品名称" readonly @click="toSearch">
            </form>
        </div>
        <pullUpBox :data="listData" @loadMore="loadMore">
            <div class="banner-box">
                <img src="./../assets/images/bg3@2x.png" alt="">
            </div>
            <scrollNav :fixedTop="fixedTop" :navData="navData" @navChange="navChange"></scrollNav>
            <ul class="goods-list">
                <li v-for="(item, index) in listData" :key="index" @click="toGoods(item.linkId, item.title)">
                    <div class="list-item-left">
                        <img :src="item.imgUrl" alt="">
                    </div>
                    <div class="list-item-right">
                        <div class="goods-name">{{item.title}}</div>
                        <div class="goods-tip">每日23点限时1件抢购</div>
                        <div class="goods-bottom">
                            <div class="goods-price"><span>¥</span>{{item.price}}</div>
                            <div v-if="item.soldout == 1" class="goods-btn dis-goods-btn">已抢完,明日再来~</div>
                            <div v-else-if="item.soldout == 2" class="goods-btn">今日23点开抢</div>
                            <div v-else-if="item.soldout == 3" class="goods-btn on-goods-btn">立即秒杀</div>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-show="isEmpty" class="empty-data">
                <img src="./../assets/images/icon_search_empty.png" alt="">
                <p>抱歉，没有找到相关商品～</p>
            </div>
        </pullUpBox>
        <msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>

<script>
    import scrollNav from '@/components/scrollNav'
    import pullUpBox from '@/components/pullUpBox'
    import msgBox from '@/components/msgBox'
    import {tagsList, tgMsGoodsList} from './../assets/js/api.js'
    import {getQueryString} from '@/assets/js/common/utils'
    import {toGoodsDetail, toSearch} from './../assets/js/url.js'
    export default {
        name: 'secKill-list',
        data(){
            return {
                navData: {
                    
                },
                listData: [],
                fixedTop: {
                    flag: true,
                    top: '61'
                },
                page: 1, //分页
                cate: '', //当前分类id
                secretcode: getQueryString('secretcode'),
                msgTxt: '',
                isEmpty: false
            }
        },
        components: {
            scrollNav,
            pullUpBox,
            msgBox
        },
        created(){
            this.getTages();
            this.getData();
        },
        methods: {
            navChange(id){
                this.cate = id;
                this.page = 1;
                this.listData = [];
                this.getData();
            },
            getTages(){
                let params = {
                    
                };
                this.$http.get(tagsList, {params}).then((res) => {
                    let data = res.data;
                    if(data && data.result == 1){
                        data.data.unshift({cate_name: '推荐', cate_id:''})
                        this.navData = {
                            data: data.data,
                            type: 3
                        }
                    }else{
                        this.msgTxt = (res && res.data && res.data.message) || '商品列表请求失败'
                    }
                })
            },
            getData(){
                if(this.page < 1) return;
                let params = {
                    tg_code: decodeURI(this.secretcode),
                    page: this.page,
                };
                if(this.cate){
                    params.cate = this.cate;
                }
                this.$http.get(tgMsGoodsList, {params}).then((res) => {
                    let data = res.data;
                    if(data && data.result == 1){
                        this.listData = this.listData.concat(data.data.data);
                        this.page = data.data.nextPage;
                        if(this.listData.length < 1){
                            this.isEmpty = true;
                        }else{
                            this.isEmpty = false;
                        }
                    }else{
                        this.msgTxt = (res && res.data && res.data.message) || '商品列表请求失败'
                    }
                })
            },
            loadMore(){
                this.getData();
            },
            // 去搜索
            toSearch(){
                this.$router.push(`${toSearch}/secretcode/${this.secretcode}`);
            },
            // 去商品详情页
            toGoods(id,title){
                this.$router.push(`${toGoodsDetail}/goods_id/${id}/goods_name/${title}`);
            },
        },
        mounted(){
            // this.fixedTop.top = this.$refs.seachBox.offsetHeight;
            this.$set(this.fixedTop, 'top', this.$refs.seachBox.offsetHeight)
            // console.log(this.$refs.seachBox.innerHeight)
        }
    }
</script>
