<template>
  <view class="offer-head">
    <view class="oh-title">{{ title }}</view>
    <view class="oh-text">{{ text }}</view>
  </view>
</template>
<script>
export default {
  name: "offerHead",
  props: {
    title: {
      type: String,
      default: '维修'
    },
    text: {
      type: String,
      default: '订单编号：19089786675643'
    },
  }
}
</script>
<style scoped lang="scss">
.offer-head {
  background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);
  width: 750rpx;
  height: 162rpx;
  box-sizing: border-box;
  padding: 32rpx 48rpx;

  .oh-title {
    font-size: 36rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 42rpx;
  }

  .oh-text {
    font-size: 24rpx;
    margin-top: 12rpx;
    font-family: PingFang SC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.6);
    line-height: 32rpx;
  }
}
</style>
