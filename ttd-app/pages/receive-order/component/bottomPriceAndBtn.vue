<template>
  <view>
    <slot></slot>
    <view class="offer-9">
      <text class="offer-91">{{ allText }}：</text>
      <my-price :price="price" />
      <view class="offer-92" @click="$emit('onCancel')">取消</view>
      <view class="offer-92 offer-93" @click="$emit('onConfirm')">{{ sureText }}</view>
    </view>
  </view>
</template>
<script>
import MyPrice from "./myPrice";

export default {
  name: "bottomPriceAndBtn",
  components: { MyPrice },
  props: {
    price: {
      type: Number,
      default: 0
    },
    allText: {
      type: String,
      default: '总金额'
    },
    sureText: {
      type: String,
      default: '确认报价'
    },
  }
}
</script>
<style scoped lang="scss">
.offer-9 {
  display: flex;
  padding: 0 32rpx;
  align-items: center;
  height: 100rpx;

  .offer-91 {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
    line-height: 36rpx;
  }

  .offer-92 {
    margin-left: auto;
    height: 80rpx;
    padding: 0 40rpx;
    border-radius: 52rpx;
    border: 2rpx solid #EDEDED;
    @include flexCenter;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
  }

  .offer-93 {
    margin-left: 32rpx;
    background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
    color: #FFFFFF;
  }
}
</style>
