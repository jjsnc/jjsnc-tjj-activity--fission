import {_commonQuery} from '@/assets/js/common/utils';

let commonQuery = _commonQuery();

let projectName = 'projectExample';

let page = process.env.PAGE ? process.env.PAGE : projectName;

let secondP = (page == projectName ? '' : `/${projectName}`);

export let toGoodsDetail = `${secondP}/goodsDetail${commonQuery}`;

export let toList = `${secondP}/home/homeList${commonQuery}`;

export let toGroup = `${secondP}/home/homeGroup${commonQuery}`;

export let toShare = `${secondP}/share${commonQuery}`;

export let toHome = `${secondP}/home/homeList${commonQuery}`;
