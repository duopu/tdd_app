<template>
  <view>

    <custom-navbar title="抽奖记录" />

    <view>
      <view class="wheel-boo0">
        <view class="wheel-boo1">中奖记录</view>
        <view class="wheel-boo2" v-for="i in lotteryList" :key="i.id">
          <view class="wheel-boo3">
            <view class="wheel-boo31">{{ i.prize }}</view>
            <view class="wheel-boo32">{{ i.prizeTime }}</view>
          </view>
          <view class="wheel-boo4">{{ i.state == 1 ? '未发放' : i.state == 2 ? '物流快递中' : '已发放' }}</view>
        </view>

        <list-empty v-if="!lotteryList.length" />
      </view>

    </view>
  </view>
</template>

<script>
import ListEmpty from "../../../place-order/orderList/listEmpty";

export default {
  name: "lotteryRecord",
  components: { ListEmpty },
  data() {
    return {
      lotteryCount: 0,
      prizeList: [],
      lotteryList: [],
    };
  },
  onShow() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.queryLotteryCount();
      this.queryPriceList();
      this.queryLotteryList();
    },
    queryLotteryCount() {
      this.$http.post('/b/lottery/remainLotteryNum', {})
          .then(res => {
            this.lotteryCount = res || 0;
          })
    },
    queryPriceList() {
      this.$http.post('/b/lottery/prizeList', {})
          .then(res => {
            this.prizeList = res || [];
          })
    },
    queryLotteryList() {
      this.$http.post('/b/lottery/queryPageList', {
        pageSize: 100,
        sortInfos: [{
          field: 'prizeTime',
          sort: 'desc',
        }]
      })
          .then(res => {
            this.lotteryList = res.dataList || [];
          })
    },
    checkRule() {
      uni.showModal({
        title: '抽奖规则',
        content: '给我中！给我中！给我中！给我中！给我中！给我中！给我中！给我中！给我中！',
        showCancel: false,
        confirmText: '我知道了',
      })
    },
    start() {
      this.$refs.hxrWheel.begin(4);
    },
    startLottery() {
      this.$http.post('/b/lottery/startLottery', {})
          .then(res => {
          })
    },
  }
}
</script>

<style lang="scss">

.wheel-boo0 {
  background: white;
  padding-top: 16rpx;
  margin-bottom: 68rpx;

  .wheel-boo1 {
    padding: 0 32rpx;
    height: 88rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
  }

  .wheel-boo2 {
    padding: 32rpx 32rpx 16rpx 0;
    border-top: 1rpx solid #EDEDED;
    margin-left: 32rpx;
    display: flex;
    align-items: center;


    .wheel-boo3 {
      flex: 1;

      .wheel-boo31 {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
        line-height: 36rpx;
      }

      .wheel-boo32 {
        margin-top: 16rpx;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 32rpx;
      }
    }

    .wheel-boo4 {
      width: 116rpx;
      @include flexCenter;
      height: 48rpx;
      background: #FF9500;
      border-radius: 8rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
}
</style>
<style>
page {
  background: #F6F7F7;
  overflow-y: scroll;
}
</style>

