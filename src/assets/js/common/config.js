/*
 * @Author: Arthur_xu 
 * @Date: 2018-05-23 15:54:49 
 * @Last Modified by: Arthur_xu
 * @Last Modified time: 2018-07-27 15:27:49
 */

//域名
// const serverUrl = '/api' //开发
const serverUrl = 'http://' + window.location.host + '/index.php/Jufu/ApiData/index' //打包
// //版本号
// const g = '3_1_0'
// //移动端请求
// const is_wap = '1'
//图片服务器地址
var img_url = window.location.host.indexOf('fission.taojiji.com') >= 0 ? 'https://static.shandjj.com' : window.location.host.indexOf('mtest.dabanyx') >= 0 ? 'http://static.sdjjia.com' : '';
//用户id
let uid = '';
// let uid = localStorage.getItem('uid')
//用户名
let user = '';
// let user = localStorage.getItem('user')
//设备类型
let device = '';
// let device= localStorage.getItem('device')

export default {
    serverUrl,
    img_url,
    uid,
    user,
    device
}
