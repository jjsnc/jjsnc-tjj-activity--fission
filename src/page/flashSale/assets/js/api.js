// 限时抢购 API接口请求文件管理

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
let baseUrl = `${apiHost}/flashSale.php${v}`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;
// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;

// 商品列表分类
export let tagsList = `${transpond}/wap-goods-TgMsGoodsListTab/showLoading/1`;
// 商品列表搜索
export let tgMsGoodsList = `${transpond}/wap-goods-TgMsGoodsList/showLoading/1`;
// 一级商品详情
export let goodsDetail = `${JAVAtranspond}/goodsDetail/showLoading/1/host_type/11`;
export let timeFiles = `${JAVAtranspond}/timeFiles/showLoading/1/host_type/11`;
export let buyingSpree = `${JAVAtranspond}/buyingSpree/showLoading/1/host_type/11`;
// 打卡推送接口
export let userSubscriber = `${JAVAtranspond}/userSubscriber//showLoading/1/host_type/11`;
// 首页列表弹幕
export let danmuList = `${JAVAtranspond}/scrollBar/host_type/11`;
// 首页列表弹幕
export let scrollBar = `${transpond}/wap-tenFair-stockInfo`;



// 二级商品详情
export let secondGoodsDetail = `${transpond}/goods-secondDetail`;
// 请求收货地址
export let getAddressList = `${transpond}/wap-AddressWap-addressList`;
// 新增收货地址
export let addAddress = `${transpond}/Address-add/showLoading/1`;
// 修改收货地址
export let editAddress = `${transpond}/Address-edit/showLoading/1`;
// 创建订单
export let orderAdd = `${baseUrl}/Flash/create_order/showLoading/1`;