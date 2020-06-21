<template>
    <div class="rule">
        <section class="section">
            <h1 class="titie-1">活动规则</h1>
            <ul class="list">
                <li class="item">1、本活动为淘集集APP用户专享，同一微信号、手机号、设备号均视为同一用户，每个用户每场抽奖仅可获得1个抽奖券；</li>
                <li class="item">2、抽奖券会在指定时间开奖，若开奖后7天后用户未领取，则视为放弃领取；</li>
                <li class="item">3、活动结束后中奖结果将通过推送通知用户，并在此页面公示，请注意查看；</li>
                <li class="item">4、送出的奖品保证正品，一经送出，不予更换。</li>
                <li class="item">5、若平台发现存在任何异常行为 (如恶意刷奖等) 的用户，有权取消其参与资格，若奖品已发出将有权收回奖品。</li>
                <li class="item">6、抽奖奖品与Apple Inc.无关。</li>
            </ul>
        </section>
        <section class="section">
            <h1 class="titie-1">抽奖规则</h1>
            <ul class="list">
                <li class="item">每期活动中奖码将在所有参与抽奖用户的抽奖券中随机抽出。</li>
            </ul>
        </section>
    </div>
</template>

<script >
export default {};
</script>

<style scoped lang="scss">
.rule {
    padding: 20px 15px;
    .section {
        .titie-1 {
            font-size: 18px;
            color: #333;
            line-height: 18px;
            font-weight: bold;
            padding-bottom: 15px;
        }
        .list {
            .item {
                padding-bottom: 25px;
                font-size: 14px;
                color: #757575;
                line-height: 22px;
            }
        }
    }
}
</style>
