import {_commonQuery} from '@/assets/js/common/utils';

let commonQuery = _commonQuery();

let projectName = 'freeCharge';

let page = process.env.PAGE ? process.env.PAGE : projectName;

let secondP = (page == projectName ? '' : `/${projectName}`);
console.log('page='+page)

export let toGoodsDetail = `${secondP}/goodsDetail${commonQuery}`;

export let toMainFree = `${secondP}/home${commonQuery}`;

export let toMyFree = `${secondP}/home/myFree${commonQuery}`;

export let toShare = `${secondP}/share${commonQuery}`;

export let toHome = `${secondP}/home${commonQuery}`;