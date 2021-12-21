<template>
  <view class="complain-card">
    <view class="cl-item">
      <view class="cl-item1">
        <view class="cl-item1-left">订单：{{ complain.receiveOrderId }}</view>
        <view class="cl-item1-right" :class="cardType == '0' ? 'cl-item1-right-ac' : ''">{{ cardType == '0' ? '待处理' : '已处理'}}</view>
      </view>
      <view class="cl-item2">投诉内容：</view>
      <view class="cl-item3">{{ complain.detail }}</view>
      <view class="cl-item4">{{ cardType == '1' ? '投诉时间：' : '' }}{{ complain.addTime }}</view>
    </view>

    <view class="cl-item-bottm" v-if="cardType == '1'">
      <view class="cl-item-bottm1">处理结果：{{ complain.processContent }}</view>
      <view class="cl-item-bottm2">处理时间：{{ complain.processTime }}</view>
    </view>
		<!-- 投诉的图片列表 -->
		<up-file v-model="complain.resourceList" :modal="show"/>
  </view>
</template>
<script>
export default {
  name: "complainCard",
  props: {
		complain: {},
    cardType: {
      type: Number,
      default: undefined
    }
  }
}
</script>
<style scoped lang="scss">
.complain-card {
  margin-bottom: 32rpx;
  padding-bottom: 16rpx;
  background-color: white;

  .cl-item {
    box-sizing: border-box;
    padding: 32rpx 32rpx 16rpx 32rpx;

    .cl-item1 {
      @include flexBetween;

      .cl-item1-left {
        font-size: 32rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
        line-height: 40rpx;
      }

      .cl-item1-right {
        min-width: 116rpx;
        height: 48rpx;
        background: #FF9500;
        border-radius: 8rpx;
        @include flexCenter;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }

      .cl-item1-right-ac {
        background-color: #34C759;
      }
    }

    .cl-item2 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
      margin: 20rpx 0 16rpx 0;
    }

    .cl-item3 {
      background: #F3F4F5;
      border-radius: 4rpx;
      box-sizing: border-box;
      padding: 24rpx 32rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 36rpx;
    }

    .cl-item4 {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 32rpx;
      margin-top: 16rpx;
    }
  }

  .cl-item-bottm {
    border-top: 1rpx solid #EDEDED;
    margin: 0 0 0 32rpx;
    padding-top: 16rpx;

    .cl-item-bottm1 {
      margin-right: 32rpx;
      background: #FFFBE8;
      box-sizing: border-box;
      padding: 22rpx 32rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FF3B30;
      line-height: 36rpx;
    }

    .cl-item-bottm2 {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 32rpx;
      padding: 16rpx 32rpx;
      text-align: right;
    }
  }
}
</style>