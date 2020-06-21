// 十元五件 API接口请求文件管理

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
let baseUrl = `${apiHost}/secKill.php${v}`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 首页列表弹幕
export let danmuList = `${transpond}/wap-tenFair-stockInfo`;
// 商品列表搜索
export let tgMsGoodsList = `${transpond}/wap-goods-TgMsGoodsList/showLoading/1`;
// 一级商品详情
export let goodsDetail = `${transpond}/wap-goods-TgMsGoodsInfo/showLoading/1`;
// 二级商品详情
export let secondGoodsDetail = `${transpond}/goods-secondDetail`;
// 请求收货地址
export let getAddressList = `${transpond}/wap-AddressWap-addressList`;
// 新增收货地址
export let addAddress = `${transpond}/Address-add/showLoading/1`;
// 修改收货地址
export let editAddress = `${transpond}/Address-edit/showLoading/1`;
// 创建订单
export let orderAdd = `${transpond}/WapOrder-add/showLoading/1`;

// 这里的地址使用的是 抽iphone 的地址  接口出来需要更换  jjsnc 卓文选
// 绑定地址ID
export let bindAddAddress = `${baseUrl}/random/addAddress/showLoading/1`;

// 接口聚宝盆公共部分
let cornucopiaBaseUrl = `${apiHost}/cornucopia.php${v}`;
//我的动态
export let myDynamic = `${cornucopiaBaseUrl}/bubble/dynamic/1`;
//排行榜
export let charts = `${cornucopiaBaseUrl}/bubble/charts/1`;
//我的聚宝盆
export let myCornucopia = `${cornucopiaBaseUrl}/bubble/myCornucopia/showLoading/1`;
//好友聚宝盆
export let friendCornucopia = `${cornucopiaBaseUrl}/cornucopia/friend_cornucopia/showLoading/1`;
//偷财气
export let getWealth = `${cornucopiaBaseUrl}/cornucopia/get_wealth/1`;
//领取气泡
export let getBubble = `${cornucopiaBaseUrl}/bubble/getBubble/1`;
//  jjsnc start 
//商品列表
export let goodList = `${cornucopiaBaseUrl}/cornucopia/goods_list/showLoading/1`;
//兑换商品
export let exchange_goods = `${cornucopiaBaseUrl}/cornucopia/exchange_goods/showLoading/1`;
//  jjsnc end
