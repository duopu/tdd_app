<template>
  <view class="ii-card">
    <view class="ii-card-left">
      <view class="ii-card-left-title">{{ invoice.name }}</view>
      <view class="ii-card-left-text">统一税号：{{ invoice.dutyNo }}</view>
    </view>

    <!-- 右箭头 -->
    <uni-icons v-if="item.iconType == '1'" type="arrowright" class="ii-card-right" size="18" color="#BDBDBD" />

    <!-- 未选中 -->
    <uni-icons v-if="item.iconType == '2'" type="circle" class="ii-card-right" size="22" color="#BDBDBD" />

    <!-- 选中 -->
    <uni-icons v-if="item.iconType == '3'" type="circle-filled" class="ii-card-right" size="22" color="#FF3B30" />
  </view>
</template>
<script>
export default {
  name: "invoiceInfoCard",
  props: {
		invoice: {},
    item: {
      type: Object,
      default() {
        return {
          iconType: '1',
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.ii-card {
  background-color: white;
  box-sizing: border-box;
  padding: 32rpx;
  margin-bottom: 32rpx;
  @include flexBetween;

  .ii-card-left {
    .ii-card-left-title {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }
    .ii-card-left-text {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 36rpx;
      margin-top: 16rpx;
    }
  }

  .ii-card-right {

  }
}
</style>