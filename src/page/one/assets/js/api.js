
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';
let baseUrl = `${apiHost}/Clock.php${v}`;
// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;
// 校验登录token
export let checkToken = `${JAVAtranspond}/user-checkAccessToken/host_type/2`;

// 精品推荐
export let GoodsGoods_list = `${apiHost}/clock.php/v1_0_0/Clock/home/showLoading/1?uuid=2C25C4B0-7167-4180-A4A9-34DB244639C9&os=ios&_t=1557300077&user_id=87038558074237172&token=c5ecb3edc337398_`;

