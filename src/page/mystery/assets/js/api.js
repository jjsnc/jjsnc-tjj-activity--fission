// 神秘专区 API接口请求文件管理

// 版本
let v = process.env.VERSION ? '/' + process.env.VERSION : '/v1_0_0';

// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
// let apiHost = process.env.NODE_ENV == 'development' ? '/appApi' : 'https://api-fissile.tjjshop.cn';
let apiHost = process.env.NODE_ENV == 'development' ? '/appApi' : 'https://api-fissile.taojiji.com';
// switch (process.env.NODE_ENV) {
//     case 'development':
//         apiHost = '/appApi';
//         break;
//     case 'production':
//         apiHost = process.env.API_PRODUCTION;
//         break;
//     case 'test':
//         apiHost = process.env.API_TEST;
//         break;
//     default:
//         apiHost = '/appApi';
//         break;

// }
// 接口请求公共部分
let baseUrl = `${apiHost}/index.php`;

// 公共转发接口
let transpond = `${baseUrl}/general/Transpond/request/api_url`;

// 商品列表
export let goodsList = `${transpond}/wap-goods-TgGoodsList/showLoading/1`;
export let goodsInfo = `${transpond}/wap-goods-GoodsInfo/showLoading/1`;

