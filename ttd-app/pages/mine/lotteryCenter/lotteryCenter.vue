<template>
  <view>

    <custom-navbar title="抽奖中心" />

    <view>
      <view class="wheel-box">
        <view class="wheel-box-det">查看规则</view>


        <hxr-wheel @start="start" ref="hxrWheel" />

        <view class="wheel-box-det1">
          你还有
          <text class="wheel-box-det2">3</text>
          次抽奖机会
        </view>
      </view>

      <view class="wheel-boo0">
        <view class="wheel-boo1">中奖记录</view>
        <view class="wheel-boo2" v-for="i in 5" :key="i">
          <view class="wheel-boo3">
            <view class="wheel-boo31">电脑一台</view>
            <view class="wheel-boo32">2021-11-03 23:24</view>
          </view>
          <view class="wheel-boo4">待处理</view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import HxrWheel from "./hxrWheel";

export default {
  name: "lotteryCenter",
  components: { HxrWheel },
  data() {
    return {};
  },
  methods: {
    start() {
      this.$refs.hxrWheel.begin(3);
    }
  }
}
</script>

<style lang="scss">
.wheel-box {
  padding: 100rpx 36rpx;
  box-sizing: border-box;

  .wheel-box-det {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 36rpx;
    text-align: right;
  }

  .wheel-box-det1 {
    width: 342rpx;
    height: 76rpx;
    @include flexCenter;
    margin: 32rpx auto 0 auto;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 200rpx;

    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;

    .wheel-box-det2 {
      padding: 0 16rpx;
      display: inline-block;
      color: #FF3B30;
    }
  }
}

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
