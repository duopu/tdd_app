<template>
  <view class="invoice-card">
    <view class="invoice-card-left">
      <view class="invoice-card-left-top">
        <view class="cil-top1">{{ invoice.invoiceType == 1 ? '专票' : '普票' }}</view>
        <view class="cil-top2">{{ invoice.principalName }}</view>
      </view>
      <view class="invoice-card-left-middle">申请时间：{{ invoice.addTime }}</view>
      <view class="invoice-card-left-end">
        <view class="cil-end1">付款方：</view>
        <text>{{ invoice.payerName }}</text>
      </view>
    </view>
    <view class="invoice-card-right">{{ invoice.allTotalAmount / 100 }}</view>
  </view>
</template>
<script>
export default {
  name: "invoiceCard",
	props: {
		invoice: {},
	}
}
</script>
<style scoped lang="scss">
.invoice-card {
  background-color: white;
  box-sizing: border-box;
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;

  .invoice-card-left {
    flex: 1;

    .invoice-card-left-top {
      display: flex;
      align-items: center;

      .cil-top1 {
        min-width: 72rpx;
        height: 40rpx;
        border-radius: 8rpx;
        border: 2rpx solid #EDEDED;
        margin-right: 16rpx;
        @include flexCenter;
      }

      .cil-top2 {
        font-size: 28rpx;
        font-family: PingFang Sin-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
        line-height: 36rpx;
      }
    }

    .invoice-card-left-middle {
      font-size: 24rpx;
      font-family: PingFang Sin-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 36rpx;
      margin-top: 16rpx;
    }

    .invoice-card-left-end {
      display: flex;

      .cil-end1 {
        flex-shrink: 0;
      }

      font-size: 24rpx;
      font-family: PingFang Sin-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 36rpx;
      margin-top: 16rpx;
    }
  }

  .invoice-card-right {
    flex-shrink: 0;
    padding-left: 36rpx;
    font-size: 36rpx;
    font-family: PingFang Sin-Medium, PingFang SC;
    font-weight: 500;
    color: #FF3B30;
  }
}
</style>