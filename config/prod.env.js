'use strict'

const project = require('../config/project').project

// // 活动类型
// let pageEnv = process.argv.filter(item => item.indexOf('page=') > -1)[0] ? process.argv.filter(item => item.indexOf('page=') > -1)[0] : ''
// let _PAGE = pageEnv.replace('page=','');

// // 版本
// let vEnv = process.argv.filter(item => item.indexOf('version=') > -1)[0] ? process.argv.filter(item => item.indexOf('version=') > -1)[0] : ''
// let _version = vEnv.replace('version=','');

// 当前打包环境
let env = '';
let __env = process.argv.filter(item => item.indexOf('--env=') > -1)[0] ? process.argv.filter(item => item.indexOf('--env=') > -1)[0] : ''
env = __env ? __env.replace('--env=','') : '';

let _PAGE = project.page;
let _version = project.version;

console.log('~~~~~~~'+_PAGE)

module.exports = {
  NODE_ENV: '"production"',
  PAGE: _PAGE ? '\"'+_PAGE+'\"' : '"tjj"',
  VERSION: _version ? '\"'+_version+'\"' : '""',
  RUN_ENV: env ? '\"'+env+'\"' : '""'
}
