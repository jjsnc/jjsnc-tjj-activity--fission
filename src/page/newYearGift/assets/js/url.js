import {_commonQuery} from '@/assets/js/common/utils';

let commonQuery = _commonQuery();

let projectName = 'newYearGift';

let page = process.env.PAGE ? process.env.PAGE : projectName;

let secondP = (page == projectName ? '' : `/${projectName}`);
console.log('page='+page)

export let toShopDetail = `${secondP}/shopDetail${commonQuery}`;

export let toGoodsDetail = `${secondP}/goodsDetail${commonQuery}`;

export let toShopList = `${secondP}${commonQuery}`;

export let toLuckyDetail = `${secondP}/luckyDetail${commonQuery}`;

export let toGivingDetail = `${secondP}/givingDetail${commonQuery}`;

export let toDownload = `${secondP}/download${commonQuery}`;

export let toMainFree = `${secondP}/index${commonQuery}`;

export let toMyFree = `${secondP}/index/myFree${commonQuery}`;
