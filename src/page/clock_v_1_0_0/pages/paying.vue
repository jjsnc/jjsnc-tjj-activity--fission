<template>
  <div class="container-paying">
    支付中,请稍后...
  </div>
</template>

<script>
import { getQueryString} from "@/assets/js/common/utils.js";

  import H5Pay from '../assets/js/pay'
  export default {
    name: 'paying',
    data () {
      return {
        wxPayData:{
          appId:getQueryString("appId"),
          timeStamp:getQueryString("timeStamp"),
          nonceStr:getQueryString("nonceStr"),
          package:getQueryString("package"),
          signType:getQueryString("signType"),
          paySign:getQueryString("paySign")
        },
        order_no:getQueryString("order_no")
      }
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        const self = this;
        H5Pay.initInWxPay(self.wxPayData, self.order_no);
      }
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container-paying {
    width: 100%;
    padding-top: 66px;
    text-align: center;
    color: #999;
    font-size: 14px;

    .loading {
      margin: 0 auto 30px;
    }
  }

</style>
