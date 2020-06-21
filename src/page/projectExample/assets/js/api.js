
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';
let baseUrl = `${apiHost}/freeCharge.php${v}`;
// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;
// 校验登录token
export let checkToken = `${JAVAtranspond}/user-checkAccessToken/host_type/2`;

