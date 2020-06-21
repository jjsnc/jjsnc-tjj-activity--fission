// 十元五件 API接口请求文件管理

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
let baseUrl = `${apiHost}/randomGift.php${v}`;


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
// 参与年货领取
export let addLuck = `${transpond}/wap-annual-addLuck/showLoading/1`;
// 开奖后领取年货创建订单
export let createOrder = `${transpond}/wap-annual-createOrder/showLoading/1`;
// 创建订单
export let orderAdd = `${transpond}/wap-annual-createAnnual/showLoading/1`;
// 精品推荐
export let recommendList = `${JAVAtranspond}/home/showLoading/1`;

// 抽奖券详情
export let prizeDetail = `${baseUrl}/random/detail/showLoading/1`;
// 15-3优惠券
export let fullLottery = `${baseUrl}/random/fullLottery/showLoading/1`;
// 中奖晒单列表
export let orderShareList = `${baseUrl}/random/orderShare/showLoading/1`;
// 绑定地址ID
export let bindAddAddress = `${baseUrl}/random/addAddress/showLoading/1`;
// 往期晒单图片
export let orderShareImg = `${baseUrl}/random/orderShareImg/showLoading/1`;
// 滚动条
export let scrollPop = `${baseUrl}/random/scroll/showLoading/1`;

