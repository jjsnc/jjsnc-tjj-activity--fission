<style lang="scss" scoped>
.main{
    margin-top: 16px;
    .layout-ul{
        width: 309px;
        overflow-x: scroll;
        padding-left:30px;
    }
    ul{
        list-style: none;
        height: 52px;
        white-space: nowrap;
        display: flex;
        flex-wrap: nowrap;
        li{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 52px;
            .tag{
                width: 21px;
                height: 21px;
                display: block;
            }
            .signed{
                background: url(../assets/images/11@2x.png) no-repeat;
                background-size: 100% 100%;
            }
            .unsigned{
                background: url(../assets/images/22@2x.png) no-repeat;
                background-size: 100% 100%;
            }
            .undone{
                background: url(../assets/images/33@2x.png) no-repeat;
                background-size: 100% 100%;
            }
            .done{
                background: url(../assets/images/44@2x.png) no-repeat;
                background-size: 100% 100%;
                width: 29px;
                height: 29px;
            }
            .line{
                width: 10px;
                height: 1px;
                &.signed{
                    border-top: 1px solid #FF342C;
                }
                &.unsigned{
                    border-top: 1px solid #D9D9D9;
                }
            }
            .now{
                animation: bound 1.5s ;
            }


        }
    }
}

@keyframes bound{
        0%{transform:   scale(1,1); background: url(../assets/images/22@2x.png) no-repeat; background-size: 100% 100%;}
        80%{transform: scale(1.4,1.4); background: url(../assets/images/11@2x.png) no-repeat;background-size: 100% 100%;}
        100%{transform:  scale(1,1); background: url(../assets/images/11@2x.png) no-repeat;background-size: 100% 100%;}
    }
</style>
<template>
    <div class="main" ref="scrollNavBox">
        <slot name="doing"></slot>
        <div ref="scrollNavUl" class="layout-ul">
            <ul>
                <li v-for="(item,index) in origin['dayLength']" :key="index">
                    <div v-if="index < origin['days']" :class="['tag signed',index==origin['days']-1?'now':'']"></div>
                    <div class="line signed" v-if="index < origin['days']"></div>
                    <img src="../assets/images/22@2x.png" v-if="index > origin['days']-1" class="tag unsigned"/>
                    <div class="line unsigned"  v-if="index > origin['days']-1"></div>
                    <img src="../assets/images/33@2x.png" v-if="index == origin['dayLength']-1 && origin['dayLength'] !=origin['days']" class="tag undone"/>
                    <img src="../assets/images/44@2x.png" v-if="index == origin['dayLength']-1 && origin['dayLength'] ==origin['days']" class="tag done"/>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'card',
    components:{

    },
    props:{
        origin: {
			type: Object,
			default: {}
        },
    },
    data(){
        return{

        }
    },
    created(){     
        this.init();

    },
    watch: {
		origin() {
			this.init();
		}
	},
    methods:{
        init() {
            this.$nextTick(() => {
                let activeNav = document.querySelector(".now");
                let _w = this.$refs.scrollNavBox.scrollLeft +  activeNav.offsetLeft - this.$refs.scrollNavBox.offsetWidth / 2 +  activeNav.offsetWidth / 2;
                this.$refs.scrollNavUl.scrollTo(_w,0);
            })
        }
    }
}
</script>


