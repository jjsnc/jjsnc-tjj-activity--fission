// 打卡全额返 API接口请求文件管理

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
let baseUrl = `${apiHost}/clock.php${v}`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;


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


// 创建订单
// export let orderAdd = `${JAVAtranspond}/order/is_post/1/host_type/5/showLoading/1`;
export let orderAdd = `${baseUrl}/Clock/create_order/showLoading/1`;
// 微信授权登录
export let wxLogin = `${baseUrl}/Login/wxLogin`;
// 校验登录token
export let checkToken = `${JAVAtranspond}/user-checkAccessToken/host_type/2`;
// 主页接口
export let punchHome= `${baseUrl}/Clock/home/showLoading/1`;
// 首页商品列表
export let goodsList= `${baseUrl}/Clock/goods_list`;
// 打卡
export let punchAction= `${baseUrl}/Clock/clock/showLoading/1`;
// 更新打卡人数
export let updatePunch= `${baseUrl}/Clock/clock_num`;
// 领取礼物
export let getGiftInfo= `${baseUrl}/Clock/get_gift/showLoading/1`;
// 优惠券信息查询接口
export let getCouponInfo= `${baseUrl}/Clock/coupon_info`;
// 猜你喜欢
export let likeList= `${transpond}/Message-msgRecommend/showLoading/1`;
// 商品详情页
export let goodsInfo = `${baseUrl}/Clock/goods_detail/showLoading/1`;
// 精品推荐
export let recommendList = `${JAVAtranspond}/home/showLoading/1`;
// 商品详情页 弹框
export let userStockInfo = `${baseUrl}/Clock/user_stock_info/showLoading/1`;
// 分享
export let getShareImage = `${baseUrl}/Shareimage/shareImage`;