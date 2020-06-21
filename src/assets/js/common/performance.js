import {getNetType} from './utils.js'
// 页面性能监控
const performanceObj = {
    postUrl: '/safety.php/index/performance',
    init(){
        this.perf = window.performance || window.msPerformance || window.webkitPerformance;
        this.onloadFn = typeof window.onload == 'function' ? window.onload : null;
        this.bindEvent();
    },
    postData(params){
        console.log(params)
        Vue.prototype.$http.post(this.postUrl,{appLog:1,logData:params});
    },
    bindEvent(){
        let self = this;
        window.onload = () => {
            self.onloadFn ? self.onloadFn() : '';
            let timing = {
                status: 0, // 状态值，0为非正常上报，1为成功上报
                title: document.title,
                userAgent: navigator.userAgent,
                logTime: new Date().getTime(),
                netType: getNetType(),
                message: '不支持performance属性',
                uri: location.href,
            }
            if(self.perf){
                let time = self.perf.timing;
                if(time){
                    setTimeout(function(){
                        timing.status = 1;
                        let lackKey = '';
                        let redirectEnd,
                            redirectStart,
                            domainLookupEnd,
                            domainLookupStart,
                            responseEnd,
                            requestStart,
                            connectEnd,
                            connectStart,
                            domComplete,
                            domLoading,
                            domInteractive,
                            domContentLoadedEventEnd,
                            domContentLoadedEventStart,
                            loadEventEnd,
                            loadEventStart,
                            navigationStart;

                        typeof time.redirectEnd == 'number' ? redirectEnd = time.redirectEnd : lackKey += 'redirectEnd、';
                        typeof time.redirectStart == 'number' ? redirectStart = time.redirectStart : lackKey += 'redirectStart、';
                        typeof time.domainLookupEnd == 'number' ? domainLookupEnd = time.domainLookupEnd : lackKey += 'domainLookupEnd、';
                        typeof time.domainLookupStart == 'number' ? domainLookupStart = time.domainLookupStart : lackKey += 'domainLookupStart、';
                        typeof time.responseEnd == 'number' ? responseEnd = time.responseEnd : lackKey += 'responseEnd、';
                        typeof time.requestStart == 'number' ? requestStart = time.requestStart : lackKey += 'requestStart、';
                        typeof time.connectEnd == 'number' ? connectEnd = time.connectEnd : lackKey += 'connectEnd、';
                        typeof time.connectStart == 'number' ? connectStart = time.connectStart : lackKey += 'connectStart、';
                        typeof time.domComplete == 'number' ? domComplete = time.domComplete : lackKey += 'domComplete、';
                        typeof time.domLoading == 'number' ? domLoading = time.domLoading : lackKey += 'domLoading、';
                        typeof time.domInteractive == 'number' ? domInteractive = time.domInteractive : lackKey += 'domInteractive、';
                        typeof time.domContentLoadedEventEnd == 'number' ? domContentLoadedEventEnd = time.domContentLoadedEventEnd : lackKey += 'domContentLoadedEventEnd、';
                        typeof time.domContentLoadedEventStart == 'number' ? domContentLoadedEventStart = time.domContentLoadedEventStart : lackKey += 'domContentLoadedEventStart、';
                        typeof time.loadEventEnd == 'number' ? loadEventEnd = time.loadEventEnd : lackKey += 'loadEventEnd、';
                        typeof time.loadEventStart == 'number' ? loadEventStart = time.loadEventStart : lackKey += 'loadEventStart、';
                        typeof time.navigationStart == 'number' ? navigationStart = time.navigationStart : lackKey += 'navigationStart、';

                        timing.message = lackKey ? '不支持'+lackKey+'属性' : '';
                        typeof redirectEnd == 'number' && typeof redirectStart == 'number' ? timing.redirect = (redirectEnd - redirectStart) : ''; //重定向时间
                        domainLookupEnd && domainLookupStart ? timing.dnsTime = (domainLookupEnd - domainLookupStart) : ''; //DNS解析时间
                        connectEnd && connectStart ? timing.tcpTime = (connectEnd - connectStart) : ''; //TCP完成握手时间
                        responseEnd && requestStart ? timing.httpTime = (responseEnd - requestStart) : ''; //HTTP请求响应完成时间
                        domLoading && navigationStart ? timing.domLoadBefore = (domLoading - navigationStart) : ''; //DOM开始加载前所花费时间
                        domComplete && domLoading ? timing.domComplete = (domComplete - domLoading) : ''; //DOM加载完成时间
                        domInteractive && domLoading ? timing.domInteractive = (domInteractive - domLoading) : ''; //DOM结构解析完成时间
                        domContentLoadedEventEnd && domContentLoadedEventStart ? timing.scriptLoaded = (domContentLoadedEventEnd - domContentLoadedEventStart) : ''; //脚本加载时间
                        loadEventStart ? timing.onloadTime = ((loadEventEnd || new Date().getTime()) - loadEventStart) : ''; //onload事件时间
                        navigationStart ? timing.allLoaded = ((loadEventEnd || new Date().getTime()) - navigationStart) : ''; //页面完全加载时间
                        console.log(JSON.stringify(timing));
                        self.postData(timing);
                    },0)
                    return;
                }else{
                    timing.message = '不支持performance.timing属性';
                };
            };
            self.postData(timing)
        }
    }
}

performanceObj.init();
