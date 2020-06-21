import {
    _commonQuery,
    getQueryString
} from '@/assets/js/common/utils';

let commonQuery = _commonQuery();

let projectName = 'randomGift';

let page = process.env.PAGE ? process.env.PAGE : projectName;

let secondP = (page == projectName ? '' : `/${projectName}`);

export let toShopDetail = `${secondP}/shopDetail${commonQuery}`;

export let toGoodsDetail = `${secondP}/goodsDetail${commonQuery}`;

export let toRule = `/rule`;

export let toIndex = `/index`;

export let toDrylingList = `/dryingList/${commonQuery}`;

