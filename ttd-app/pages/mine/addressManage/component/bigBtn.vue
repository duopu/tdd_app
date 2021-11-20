<template>
  <view class="button-box">
    <view class="big-btn" @click="$emit('click')">{{ buttonText }}</view>
  </view>
</template>
<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: '确定'
    }
  }
}
</script>
<style scoped lang="scss">
.button-box {
  padding: 10rpx 0;
  .big-btn {
    margin: auto;
    width: 686rpx;
    height: 80rpx;
    background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
    border-radius: 200rpx;
    @include flexCenter;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
}
</style>
