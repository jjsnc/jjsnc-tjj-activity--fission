/* 
** vue 监听报错方法
*/

export const errorHandler = (err, vm, info) => {
    // console.log(err, vm, info)
    // console.log(Object.getOwnPropertyNames(err))
    // console.log(err.stack,err.stack.match(/at\sVueComponent.created\s\(\S+\)/))
    if(!errorLogUpload) return;
    let stack = err.stack || '',
        errComponent = stack.match(/at\sVueComponent.created\s\(\S+\)/),
        errMsg = errComponent ? err.message + ' ' +errComponent : err.message
    
    errorLogUpload({
        logLevel: 4,
        errType: 11, // 11为代码报错，12为资源报错，21为api参数报错，21为api其他报错
        apiError:{
            message: errMsg,
            uri: vm ? `${location.origin}/${process.env.PAGE}/view/${process.env.VERSION}${vm.$route.fullPath}` : location.href,
        }
    });
}
