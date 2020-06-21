import {_commonQuery} from '@/assets/js/common/utils';

let commonQuery = _commonQuery();

let page = process.env.PAGE ? process.env.PAGE : 'tenFair';

let secondP = (page == 'tenFair' ? '' : '/tenFair');
console.log('page='+page)

export let toShopDetail = `${secondP}/shopDetail${commonQuery}`;

export let toTwoGoodsDetail = `${secondP}/twoGoodsDetail${commonQuery}`;

export let toFiveGoodsDetail = `${secondP}/fiveGoodsDetail${commonQuery}`;

export let toShopList = `${secondP}${commonQuery}`;

export let toHomeTwo = `${secondP}/home/twoList${commonQuery}`;

export let toHome = `${secondP}/home${commonQuery}`;
