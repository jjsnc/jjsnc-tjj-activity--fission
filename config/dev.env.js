'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const project = require('../config/project').project

// // 活动类型
// let pageEnv = process.argv.filter(item => item.indexOf('page=') > -1)[0] ? process.argv.filter(item => item.indexOf('page=') > -1)[0] : ''
// let _PAGE = pageEnv.replace('page=','');
// console.log(_PAGE)

// // 版本
// let vEnv = process.argv.filter(item => item.indexOf('version=') > -1)[0] ? process.argv.filter(item => item.indexOf('version=') > -1)[0] : ''
// let _version = vEnv.replace('version=','');


let _PAGE = project.page;
let _version = project.version;

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PAGE: _PAGE ? '\"'+_PAGE+'\"' : '"tjj"',
  VERSION: _version ? '\"'+_version+'\"' : '""',
  RUN_ENV: '"dev"'
})
