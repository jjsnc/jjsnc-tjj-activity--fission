/*
 * @Author: Arthur_xu 
 * @Date: 2018-05-10 11:15:19 
 * @Last Modified by: Arthur_xu
 * @Last Modified time: 2018-12-17 19:42:34
 */


import global from '../assets/js/common/config'
import http from './http'
// import * as user from './user'

// const apiObj = {
//   user
// }


const install = function (Vue, options) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  // Object.defineProperties(Vue.prototype, {
  //   $fetch: {
  //     get() {
  //       return apiObj
  //     }
  //   }
  // })

  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('longtap', {
    // bind(el, binding, vnode, oldVnode) {
    //   // 逻辑...
    // }
    bind: function (el, binding) {
      new vueTouch(el, binding, "longtap");
    }
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }

  Vue.prototype.$global=global;
  Vue.prototype.$http=http;
}


function vueTouch(el,binding,type){
  var _this=this;
  this.obj=el;
  this.binding=binding;
  this.touchType=type;
  this.vueTouches={x:0,y:0};
  this.vueMoves=true;
  this.vueLeave=true;
  this.longTouch=true;
  this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
  this.obj.addEventListener("touchstart",function(e){
      _this.start(e);
  },false);
  this.obj.addEventListener("touchend",function(e){
      _this.end(e);
  },false);
  this.obj.addEventListener("touchmove",function(e){
      _this.move(e);
  },false);
};

vueTouch.prototype={
  start:function(e){
      this.vueMoves=true;
      this.vueLeave=true;
      this.longTouch=true;
      this.vueTouches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
      this.time=setTimeout(function(){
          if(this.vueLeave&&this.vueMoves){
              this.touchType=="longtap"&&this.vueCallBack(this.binding.value,e);
              this.longTouch=false;
          };
      }.bind(this),1000);
  },
  end:function(e){
      var disX=e.changedTouches[0].pageX-this.vueTouches.x;
      var disY=e.changedTouches[0].pageY-this.vueTouches.y;
      clearTimeout(this.time);
      if(Math.abs(disX)>10||Math.abs(disY)>100){
          this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);
          if(Math.abs(disX)>Math.abs(disY)){
              if(disX>10){
                  this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e);
              };
              if(disX<-10){
                  this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e);
              };
          }else{
              if(disY>10){
                  this.touchType=="swipedown"&&this.vueCallBack(this.binding.value,e);
              };
              if(disY<-10){
                  this.touchType=="swipeup"&&this.vueCallBack(this.binding.value,e);
              };  
          };
      }else{
          if(this.longTouch&&this.vueMoves){
              this.touchType=="tap"&&this.vueCallBack(this.binding.value,e);
              this.vueLeave=false
          };
      };
  },
  move:function(e){
      this.vueMoves=false;
  }
};
export default {
  install
}
