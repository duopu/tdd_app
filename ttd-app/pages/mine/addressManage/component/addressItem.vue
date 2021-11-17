<template>
  <view class="address-item">
    <name-header :style="{margin: '32rpx 20rpx 32rpx 32rpx'}" text="李" />
    <view class="item-right">
      <view class="item-right1">
        <view class="item-right1-1">
          <view class="item-default">默认</view>
          <view class="item-right1-12">吴静</view>
          <view class="item-right1-13">13492777304</view>
        </view>
        <view class="item-right1-2">上海市嘉定区马陆镇丰饶路600号</view>
      </view>
      <uni-icons class="item-right3" type="compose" size="30" color="#828282" @click="$emit('rightClick')" />
      <uni-icons class="item-right3" type="arrowright" size="18" color="#BDBDBD" />
    </view>
  </view>
</template>
<script>
import NameHeader from "./nameHeader";

export default {
  name: "addressItem",
  components: { NameHeader }
}
</script>
<style scoped lang="scss">
.address-item {
  width: 750rpx;
  min-height: 160rpx;
  box-sizing: border-box;
  display: flex;

  .item-right {
    flex: 1;
    box-sizing: border-box;
    padding: 32rpx 32rpx 32rpx 0;
    border-top: 1rpx solid #EBEDF0;
    display: flex;
    align-items: center;

    .item-right1 {
      flex: 1;

      .item-right1-1 {
        display: flex;

        .item-default {
          width: 64rpx;
          height: 32rpx;
          background: #FF9500;
          text-align: center;
          border-radius: 8rpx;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 32rpx;
        }

        .item-right1-12 {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
          padding: 0 16rpx;
        }

        .item-right1-13 {
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
          line-height: 36rpx;
        }
      }

      .item-right1-2 {
        margin-top: 16rpx;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 32rpx;
      }
    }

    .item-right3 {
      padding-left: 15rpx;
    }
  }
}
</style>
