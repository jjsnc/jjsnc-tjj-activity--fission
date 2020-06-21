export default {
    methods:{
        setBubbleList() {
            this.bubbleList.forEach((item, index) => {
                item.delay = Math.random() + 's'
            });
            this.setBubbleTime();
            this.setBubblePosition();
        },
        setBubblePosition() {
            let positionArrInit = [];
            positionArrInit[6] =  [
                {
                    left: -10,
                    top: 10
                },
                {
                    left: 65,
                    top: 0
                },
                {
                    left: 120,
                    top: 30
                },
                {
                    left: 190,
                    top: 30
                },
                {
                    left: 245,
                    top: 10
                },
                {
                    left: 20,
                    top: 80
                },
            ];
            positionArrInit[7] =  [
                {
                    left: -10,
                    top: 10
                },
                {
                    left: 65,
                    top: 0
                },
                {
                    left: 120,
                    top: 20
                },
                {
                    left: 190,
                    top: 30
                },
                {
                    left: 245,
                    top: 40
                },
                {
                    left: 20,
                    top: 80
                },
                {
                    left: 90,
                    top: 80
                },
            ];
            positionArrInit[8] =  [
                {
                    left: -10,
                    top: 0
                },
                {
                    left: 55,
                    top: 0
                },
                {
                    left: 115,
                    top: 5
                },
                {
                    left: 185,
                    top: 0
                },
                {
                    left: 250,
                    top: 0
                },
                {
                    left: 20,
                    top: 80
                },
                {
                    left: 90,
                    top: 80
                },
                {
                    left: 210,
                    top: 80
                },
            ];
            positionArrInit[9] =  [
                {
                    left: -10,
                    top: 0
                },
                {
                    left: 55,
                    top: 0
                },
                {
                    left: 115,
                    top: 0
                },
                {
                    left: 185,
                    top: 0
                },
                {
                    left: 245,
                    top: 0
                },


                {
                    left: -15,
                    top: 90
                },
                {
                    left: 50,
                    top: 80
                },
                {
                    left: 120,
                    top: 80
                },
                {
                    left: 180,
                    top: 80
                },
                {
                    left: 250,
                    top: 95
                },

            ];
            positionArrInit[10] =  [
                {
                    left: -10,
                    top: 0
                },
                {
                    left: 55,
                    top: 0
                },
                {
                    left: 115,
                    top: 0
                },
                {
                    left: 185,
                    top: 0
                },
                {
                    left: 245,
                    top: 0
                },


                {
                    left: -15,
                    top: 90
                },
                {
                    left: 50,
                    top: 80
                },
                {
                    left: 120,
                    top: 80
                },
                {
                    left: 180,
                    top: 80
                },
                {
                    left: 250,
                    top: 95
                },

            ];
            let positionArr = [];
            let width = 60;
            let useInitDataIndex = 8;//当大于等于8个气泡的时候，需要用到初始化数据
            const len = this.bubbleList.length;
            if(useInitDataIndex<len){
                useInitDataIndex = len
            }

            switch (len) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    if(6<=useInitDataIndex){
                        positionArr = positionArrInit[6];
                    }
                    break;
                case 7:
                    if(7<=useInitDataIndex){
                        positionArr = positionArrInit[7];
                    }
                    break;
                case 8:
                    if(8<=useInitDataIndex){
                        positionArr = positionArrInit[8];
                    }
                    break;
                case 9:
                    if(9<=useInitDataIndex){
                        positionArr = positionArrInit[9];
                    }
                    break;
                case 10:
                    if(10<=useInitDataIndex){
                        positionArr = positionArrInit[10];
                    }
                    break
            }


            function getPosition() {
                let leftPosition = '';
                let topPosition = '';
                for (let i = 0; i < 1500; i++) {
                    leftPosition = Math.random() * 280-20;
                    topPosition = Math.random() * 110 + 6;
                    if (positionArr.length) {
                        let count = 0;
                        for (let item of positionArr) {
                            if ((item.left + width < leftPosition || item.left - width > leftPosition) || (item.top + width < topPosition || item.top - width > topPosition)) {
                                count++;
                                if (count >= positionArr.length) {
                                    let position = {
                                        left: leftPosition,
                                        top: topPosition,
                                    };

                                    return position
                                }
                            }
                        }
                    } else {
                        let position = {
                            left: leftPosition,
                            top: topPosition,
                        };
                        return position
                    }
                }
            }

            this.bubbleList.forEach((bubble, index) => {
                let position = {left: 0, top: 0};
                if (len >= useInitDataIndex) {
                    position.left = Math.random() * 20 + positionArr[index].left;
                    position.top = Math.random() * 20 + positionArr[index].top;
                } else {
                    if (getPosition()) {
                        position = getPosition();
                    } else {//确保不会出现多个{left: 0, top: 0}
                        position.left=50*index;
                        position.top=15*index;
                    }
                }
                positionArr[index] = position;
                this.bubbleList[index].left = positionArr[index].left / 16 + 'rem';
                this.bubbleList[index].top = positionArr[index].top / 16 + 'rem';
            });


        },
        setBubbleTime(){
            this.bubbleList.forEach((item, index) => {
                let timer =  setInterval(()=>{
                    if(item.time>0){
                        item.time--
                    }else{
                        if(this.pageType == 'friend'){

                        }
                        clearInterval(timer)
                    }
                },1000)
            });
        }
    },
    filters:{
        transTime(value){
            let time = transTime(value);
            return time.minute + ':' + time.second
        }
    }
}


export const transTime = function(time) {
    let d = 0; //天数
    let h = 0; //小时
    let m = 0; //分钟
    let s = 0; //秒数

    if (time >= 0) {
        h = toTwo(parseInt(Math.floor(time / 60 / 60 % 24)) + parseInt(d * 24));
        m = toTwo(Math.floor(time / 60 % 60));
        s = toTwo(Math.floor(time % 60));
        return {
            "hour": h,
            "minute": m,
            "second": s
        }
    }
};


//用于时间补位
function toTwo(obj) {
    if (obj < 10) {
        obj = '0' + obj;
    }
    return obj;
}
