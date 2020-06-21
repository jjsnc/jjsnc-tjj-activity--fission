// 十元五件 API接口请求文件管理

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';

// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
let baseUrl = `${apiHost}/tenFair.php${v}`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 店铺列表
export let shopList = `${transpond}/wap-tenFair-shopList/showLoading/1`;
// 首页列表弹幕
export let danmuList = `${transpond}/wap-tenFair-stockInfo`;
// 商品列表
export let goodsList = `${transpond}/wap-tenFair-goodsList/showLoading/1`;
// 一级商品详情
export let goodsDetail = `${transpond}/goods-info/showLoading/1`;
// 二级商品详情
export let secondGoodsDetail = `${transpond}/goods-secondDetail`;
// 十元五件购物车
export let cartItem = `${transpond}/WapCart-cartItem/showLoading/1`;
// 十元五件创建订单
export let orderAdd = `${transpond}/WapOrder-add/showLoading/1`;
// 请求收货地址
export let getAddressList = `${transpond}/wap-AddressWap-addressList`;
// 新增收货地址
export let addAddress = `${transpond}/Address-add/showLoading/1`;
// 修改收货地址
export let editAddress = `${transpond}/Address-edit/showLoading/1`;
// 分享图片
export let shareImg = `${baseUrl}/Image/shareImg`;
