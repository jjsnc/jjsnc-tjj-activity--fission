// webpack-dev-server --inline --progress --config build/webpack.dev.conf.js
const fs = require('fs');

// 活动类型
let pageEnv = process.argv.filter(item => item.indexOf('page=') > -1)[0] ? process.argv.filter(item => item.indexOf('page=') > -1)[0] : ''
let _PAGE = pageEnv.replace('page=','');

// 版本
let vEnv = process.argv.filter(item => item.indexOf('version=') > -1)[0] ? process.argv.filter(item => item.indexOf('version=') > -1)[0] : ''
let _version = vEnv.replace('version=','');

// 写入变量
fs.writeFileSync('./config/project.js', `exports.project = {version: '${_version}',page: '${_PAGE}'}`);
// exports.name = '${_PAGE}'

let exec = require('child_process').execSync;

exec('webpack-dev-server --inline --progress --config build/webpack.dev.conf.js', {stdio: 'inherit'});