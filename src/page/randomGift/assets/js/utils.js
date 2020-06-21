
//剩余时间倒计时 时间戳 (秒级)
//使用事例
//countDown(1477808630,callback())
export const countDown = (time, callback) => {
    /*
     time:剩余时间时间戳  如:1477808630
    */
    callback(transTime(time));
    let mycount = setInterval(function () {
        time = parseInt(time) - 1;
        if (time >= 0) {
            callback(transTime(time));
        } else {
            clearInterval(mycount);
        }
    }, 1000);
}

function transTime(time) {
    let d = 0; //天数
    let h = 0; //小时
    let m = 0; //分钟
    let s = 0; //秒数
    let day = 0 // 天数

    if (time >= 0) {
        day = Math.floor(time / 60 / 60 / 24);
        h = toTwo(parseInt(Math.floor(time / 60 / 60 % 24)) + parseInt(d * 24));
        m = toTwo(Math.floor(time / 60 % 60));
        s = toTwo(Math.floor(time % 60));
        return {
            "day": day,
            "hour": h,
            "minute": m,
            "second": s
        }
    }
}

//用于时间补位
function toTwo(obj) {
    if (obj < 10) {
        obj = '0' + obj;
    }
    return obj;
}