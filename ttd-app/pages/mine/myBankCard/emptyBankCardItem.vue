<template>
  <view class="empty-bankcard">
    <image class="empty-b-img"
           src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/no-bankcard-icon.svg" />
    <view class="empty-b-center">
      <view class="empty-b-name">未绑定银行卡</view>
      <view class="empty-b-bank-name">请先添加默认银行卡</view>
    </view>
    <view class="empty-b-add" @click="$emit('add')">去添加</view>
  </view>
</template>
<script>
export default {
  name: "emptyBankCardItem"
}
</script>
<style scoped lang="scss">
.empty-bankcard {
  box-sizing: border-box;
  padding: 32rpx;
  display: flex;
  background: #F3F4F5;
  align-items: center;

  .empty-b-img {
    width: 96rpx;
    height: 96rpx;
    margin-right: 16rpx;
  }

  .empty-b-center {
    flex: 1;

    .empty-b-name {
      font-size: 32rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 40rpx;
    }

    .empty-b-bank-name {
      margin-top: 16rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #BDBDBD;
      line-height: 32rpx;
    }
  }

  .empty-b-add {
    width: 144rpx;
    height: 64rpx;
    border-radius: 32rpx;
    border: 2rpx solid #1059FA;
    @include flexCenter;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #1059FA;
  }
}
</style>
