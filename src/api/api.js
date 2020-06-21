import http from './http'

let apiUrl = '/fission'; //msite 

/* 
** 砍价
*/

// 请求收货地址
export const getAddressList = params => { return http.get(apiUrl + '/address/addressList', {params}).then(res => res.data)};

// 新增收货地址
export const postNewAddress = params => { return http.get(apiUrl + '/address/add', {params}).then(res => res.data)};

// 砍价商品列表
export const getBargainGoodsList = params => { return http.get(apiUrl + '/BargainGoods/bargain_goods_list', {params}).then(res => res.data)};

// 推荐商品列表
export const getRecommendList = params => { return http.get(apiUrl + '/bargain/recommendList', {params}).then(res => res.data)};