import {_commonQuery} from '@/assets/js/common/utils';

let commonQuery = _commonQuery();

let page = process.env.PAGE ? process.env.PAGE : 'mystery';

let secondP = (page == 'mystery' ? '' : '/mystery');
console.log('page='+page)

export let toGoodsDetail = `${secondP}/goodsDetail${commonQuery}`;

