<template>
    <div class="notice-component">
        <div class="list-wrap">
            <ul class="list comment-list" :class="{active:animate}">
                <li class="item" :key="index" v-for="(item, index) in noticeListCopy">

                    <div class="comment-list-title">
                        <div class="comment-list-pic">
                            <img class="my-img" v-if="item.avatar" :src="item.avatar">
                            <img class="my-img" v-else src="../assets/images/toux@2x.png">
                        </div>
                        <div class="comment-list-name">{{item.nikename}}</div>
                        <div class="comment-list-time">{{item.baskTime}}</div>
                    </div>
                    <div class="comment-list-cont">{{item.baskContent}}</div>
                    <div class="comment-pics" v-if="item.baskPic && item.baskPic.length > 2">
                        <div v-for="(itemPic,i) in item.baskPic" :key="i" v-if="i < 3">
                            <img :src="itemPic.thumb123" alt>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "scrollBaskInfo",
    data(){
        return{
            noticeList:[
                {
                    src: "../assets/images/3.png",
                    text:
                        "[拼团成功]树尾等1人免单返现128元单返现128元单返现128元"
                }
            ]
        }
    },
    // props: {
    //     noticeList: {
    //         default: [
    //             {
    //                 src: "../assets/images/3.png",
    //                 text:
    //                     "[拼团成功]树尾等1人免单返现128元单返现128元单返现128元"
    //             }
    //         ]
    //     }
    // },
    data() {
        return {
            animate: false,
            noticeListCopy: []
        };
    },
    created() {
        this.noticeListCopy = this.noticeList.concat();
        setInterval(this.showMarquee, 2000);
    },
    methods: {
        showMarquee() {
            this.animate = true;
            setTimeout(() => {
                this.noticeListCopy.push(this.noticeListCopy[0]);
                this.noticeListCopy.shift();
                this.animate = false;
            }, 500);
        }
    },
    mounted() {},
    watch: {
        noticeList() {
            this.noticeListCopy = this.noticeList.concat();
            console.log(this.noticeListCopy);
            this.noticeListCopy.length > 1
                ? setInterval(this.showMarquee, 2000)
                : "";
        }
    }
};
</script>
<style lang="scss" scoped>
.notice-component {
    display: inline-block;
    width: 100%;
    background: #fff;
    border-radius: 6px;
    margin: 0 auto;
    .list-wrap {
        display: block;
        height: 80px;
        position: relative;
        overflow: hidden;
        .list {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            &.active {
                transition: all 0.5s;
                margin-top: -80px;
            }
      
        }
        .comment-list {
			margin-top: 0.88rem;
			li {
                height: 80px;
				margin-bottom: 0.5rem;
				&:last-child {
					margin-bottom: 0;
				}
				.comment-list-title {
					display: -webkit-flex;
					display: flex;
					-webkit-align-items: center;
					align-items: center;
					font-size: 0.75rem;
					color: #757575;
					.comment-list-pic {
						-webkit-flex: 0 0 1.5rem;
						flex: 0 0 1.5rem;
						height: 1.5rem;
						border-radius: 50%;
						overflow: hidden;
						img {
							width: 1.5rem;
							height: 1.5rem;
						}
					}
					.comment-list-name {
						-webkit-flex: 1;
						flex: 1;
						margin-left: 0.5rem;
					}
					.comment-list-time {
						-webkit-flex: 0 0 4rem;
						flex: 0 0 4rem;
						font-size: 0.69rem;
						text-align: right;
						color: #999999;
					}
				}
				.comment-list-cont {
					margin-top: 0.63rem;
					font-size: 13px;
					color: #333333;
					line-height: 1.13rem;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.comment-pics {
					width: 100%;
					margin-top: 0.69rem;
					display: -webkit-flex;
					display: flex;
					div {
						-webkit-flex: 1;
						flex: 1;
						display: block;
						margin-right: 0.38rem;
						&:last-child {
							margin-right: 0;
						}
						img {
							width: 100%;
						}
					}
				}
			}
		}
    }
}
</style>