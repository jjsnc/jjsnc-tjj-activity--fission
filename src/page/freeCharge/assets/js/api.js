// 免单购物 API接口请求文件管理
import {_commonQuery} from '@/assets/js/common/utils';
let commonQuery = _commonQuery();
// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
// let baseUrl = `${apiHost}/newYearGift.php${v}`;
let baseUrl = `${apiHost}/freeCharge.php${v}`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;

// 首页列表弹幕
export let danmuList = `${baseUrl}/Goods/user_stock_info`;
// 商品列表分类
export let tagsList = `${baseUrl}/Goods/cate_list/showLoading/1`;
// 免费送年货商品列表
export let goodsList = `${baseUrl}/Goods/goods_list/showLoading/1`;
// 我的送礼列表
export let myGoodsList = `${baseUrl}/order/order_list/showLoading/1`;
// 微信新老客页面跳转
export let diffPage = `${baseUrl}/Free/diffPage${commonQuery}`;
// 风控接口
export let blackList = `${baseUrl}/Free/blackList/showLoading/1`;
// 商品详情
export let goodsDetail = `${baseUrl}/Goods/goods_detail/showLoading/1`;
// 获取group_id
export let getGroupId = `${baseUrl}/Order/get_group_id/showLoading/1`;

// 创建订单
export let orderAdd = `${baseUrl}/Order/create_order/showLoading/1`;
// 微信授权登录
export let wxLogin = `${baseUrl}/Login/wxLogin`;
// 校验登录token
export let checkToken = `${JAVAtranspond}/user-checkAccessToken/host_type/2`;

// jjsnc start 
// 发起分享详情
export let shareDetail = `${baseUrl}/Free/shareDetail/showLoading/1`;
// 猜你喜欢
export let freeGoodsList = `${baseUrl}/Free/goodsList/showLoading/1`;
//商品列表推荐
export let GoodsGoods_list = `${baseUrl}/Goods/goods_list/showLoading/1`;
// 分享页弹幕
export let shareDanmuList = `${baseUrl}/Goods/user_stock_info`;