<style lang="scss" scoped>
.stepper {
    display: flex;
    .minus,.plus{
        flex: 1;
        background: none;
        border: 0;
        color: #333;
        background: none;

    }
    .minus{
        border-right: 1px solid #E5E5E5;
    }
    .plus{
        border-left: 1px solid #E5E5E5;
    }
    .stepper_input{
        color: #333;
        flex: 2;
        text-align: center;
        border: 0;
    }

}
</style>
<template>
    <div class="stepper">
        <button class="minus" @click="minus" :style="{'width': styl['btWidth'],'height': styl['height'],'line-height': styl['height'],'font-size':styl['fontSize']}">-</button>
        <input type="number" disabled="disabled" class="stepper_input" v-model="number" @change="changeNum" :style="{'width': styl.inWidth,'height': styl.inHeight,'line-height': styl.inHeight,'font-size':styl['fontSize']}">
        <button class="plus" @click="plus" :style="{'width': styl['btWidth'],'height': styl['height'],'line-height': styl['height'],'font-size':styl['fontSize']}">+</button>
    </div>
</template>
<script>
export default {
    name: "stepper",
	components: {
    },
    props:{
        min:{
            type:Number,
            default:1
        },
        max:{
            type:Number,
            default:99
        },
        num:{
            type:Number,
            default:1
        },
        step:{
            type:Number,
            default:1
        },
        styl:{
            type:Object,
            default:() => {
                return {

                    "btWidth":"20px",
                    "inWidth":"34px",
                    "height":"20px",
                    "inHeight":"18px",
                    'fontSize':'13px'
                }
            }
        }
    },
	data() {
		return {
            number: this.num,
		};
    },
    watch:{
        num(){
            this.number=this.num;
        }
    },
    methods:{
        minus(){
            if(Number(this.number) > this.min) this.number= Number(this.number) - this.step;
            if(Number(this.number) <= this.min) {this.$msgBox.msgTxt("不能再少了哦");return;}
            this.$emit("stepperChange",this.number);
        },
        plus(){
            if( Number(this.number) < this.max ) this.number= Number(this.number) + this.step;
            if(Number(this.number) >= this.max ) {this.$msgBox.msgTxt("不能再多了哦");return;}
            this.$emit("stepperChange",this.number);
        },
        changeNum(){
            if( Number(this.number) < this.min) {
                this.$msgBox.msgTxt("不能再少了哦");
                this.number = this.min;
            }
            if( Number(this.number)  > this.max){
                this.$msgBox.msgTxt("不能再多了哦");
                this.number = this.max;
            }
            this.$emit("stepperChange",this.number);
        }

    }
};
</script>


