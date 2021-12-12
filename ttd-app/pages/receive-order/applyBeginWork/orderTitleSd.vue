<template>
  <view class="order-dtl-1">
    <view class="order-dtl-12">
      <text>{{ label }}</text>

      <my-price v-if="showPrice" :scale="0.9" :price="price" />
    </view>
    <view class="order-dtl-11" v-if="showState">{{ orderState }}</view>
  </view>
</template>
<script>
import MyPrice from "../component/myPrice";

export default {
  name: "orderTitleSd",
  components: { MyPrice },
  props: {
    label: {
      type: String,
      default: '订单金额：'
    },
    orderState: {
      type: String,
      default: '待完成'
    },
    price: {
      type: [String, Number],
      default: 1
    },
    showPrice: {
      type: Boolean,
      default: true
    },
    showState: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="scss">
.order-dtl-1 {
  @include flexBetween;
  height: 96rpx;
  background-color: white;
  padding: 24rpx 32rpx;
  box-sizing: border-box;

  .order-dtl-12 {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #969799;
    line-height: 36rpx;
  }

  .order-dtl-11 {
    width: 116rpx;
    height: 48rpx;
    background: #34C759;
    border-radius: 8rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    @include flexCenter;
  }
}
</style>
