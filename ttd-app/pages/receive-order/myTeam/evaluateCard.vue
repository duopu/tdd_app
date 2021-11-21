<template>
  <view class="evaluate-card">

    <image :src="MDicon" class="evaluate-img" />

    <view class="eva-right">
      <view class="eva-right-1">
        <view class="eva-right-name">吴县平</view>
        <my-star />
      </view>

      <view class="eva-right-2">2021-01-15 07:23:23</view>

      <view class="eva-right-3">
        可以的话，多少写点！
        方便工作人员快速排队故障。
      </view>
    </view>

  </view>
</template>
<script>
import MDicon from '../../../static/mine/MDicon.png';
import MyStar from "./myStar";

export default {
  name: "evaluateCard",
  components: { MyStar },
  data() {
    return {
      MDicon
    }
  }
}
</script>
<style scoped lang="scss">
.evaluate-card {
  padding: 32rpx 0 0 32rpx;
  display: flex;

  .evaluate-img {
    width: 96rpx;
    height: 96rpx;
    border-radius: 8rpx;
    padding-right: 20rpx;
  }

  .eva-right {
    border-bottom: 1rpx solid #EBEDF0;
    padding-right: 32rpx;
    flex: 1;

    .eva-right-1 {
      @include flexBetween;

      .eva-right-name {
        font-size: 32rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #323335;
        line-height: 40rpx;
      }
    }

    .eva-right-2 {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 32rpx;
      margin: 8rpx 0 16rpx 0;
    }

    .eva-right-3 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 36rpx;
      padding-bottom: 32rpx;
    }
  }
}
</style>
