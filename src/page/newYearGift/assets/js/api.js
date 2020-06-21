// 十元五件 API接口请求文件管理

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
let baseUrl = `${apiHost}/newYearGift.php${v}`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;

// 首页列表弹幕
export let danmuList = `${transpond}/wap-annual-getTip`;
// 商品列表分类
export let tagsList = `${transpond}/wap-annual-getCategory/showLoading/1`;
// 免费送年货商品列表
export let goodsList = `${transpond}/wap-annual-getGoodsList/showLoading/1`;
// 我的送礼列表
export let myGoodsList = `${transpond}/wap-annual-myAnnual/showLoading/1`;

// 一级商品详情
export let goodsDetail = `${transpond}/goods-info/showLoading/1`;
// 二级商品详情
export let secondGoodsDetail = `${transpond}/goods-secondDetail`;
// 请求收货地址
export let getAddressList = `${transpond}/wap-AddressWap-addressList`;
// 新增收货地址
export let addAddress = `${transpond}/Address-add/showLoading/1`;
// 修改收货地址
export let editAddress = `${transpond}/Address-edit/showLoading/1`;
// 抽奖信息接口（用户已经抽奖则为抽奖详情如果未抽奖则为抽奖弹窗信息）
export let luckInfo = `${transpond}/wap-annual-luckInfo/showLoading/1`;
// 参与年货领取
export let addLuck = `${transpond}/wap-annual-addLuck/showLoading/1`;
// 开奖后领取年货创建订单
export let createOrder = `${transpond}/wap-annual-createOrder/showLoading/1`;
// 创建订单
export let orderAdd = `${transpond}/wap-annual-createAnnual/showLoading/1`;
// 微信授权登录
export let wxLogin = `${baseUrl}/Login/wxLogin`;
// 校验登录token
export let checkToken = `${JAVAtranspond}/user-checkAccessToken/host_type/2`;
