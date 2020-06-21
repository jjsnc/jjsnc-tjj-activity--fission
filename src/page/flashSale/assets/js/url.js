import {_commonQuery} from '@/assets/js/common/utils';

let commonQuery = _commonQuery();

let projectName = 'flashSale';

let page = process.env.PAGE ? process.env.PAGE : projectName;

let secondP = (page == projectName ? '' : `/${projectName}`);
console.log('page='+page)

export let toSearch = `${secondP}/search${commonQuery}`;

export let toGoodsDetail = `${secondP}/goodsDetail${commonQuery}`;

export let toShopList = `${secondP}${commonQuery}`;

export let toHome = `${secondP}/home${commonQuery}`;