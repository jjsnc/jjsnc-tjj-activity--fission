import {_commonQuery} from '@/assets/js/common/utils';

let commonQuery = _commonQuery();

let projectName = 'cornucopia';

let page = process.env.PAGE ? process.env.PAGE : projectName;

let secondP = (page == projectName ? '' : `/${projectName}`);
console.log('page='+page)

export let toMycornucopia = `${secondP}/index${commonQuery}`;

export let toList = `${secondP}/list${commonQuery}`;
export let toCheckingFriends = `${secondP}/checkingFriends${commonQuery}`;

