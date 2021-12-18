<template>
  <view>
    <custom-navbar title="列表消息" />

    <back-container>

      <view class="message-list">
        <view class="mist-item" v-for="i in 5" :key="i">
          <view class="mist-item1">邀请你加入</view>
          <view class="mist-item2">
            当前，海外共建“一带一路”项目边防控、边生产，全力保障员工健康安全，努力满足当地生产需求，也把各国人民的心连接起来。一些共建“一带一路”项目当地员工分享了他们的抗疫故事和感受　　5月18日，甘再水电站项目的柬方员工正在中央控制室值班。
          </view>
          <view class="mist-item3" v-if="i === 1">
            <view class="mist-item4">拒绝</view>
            <view class="mist-item4 mist-item5">接受</view>
          </view>
        </view>
      </view>
    </back-container>

  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";

export default {
  name: "messageList",
  components: { BackContainer }
}
</script>
<style lang="scss" scoped>
.message-list {
  background-color: #ECEDF9;

  .mist-item {
    background-color: white;
    margin-bottom: 34rpx;

    .mist-item1 {
      font-size: 32rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      padding: 24rpx 32rpx 26rpx 32rpx;
    }

    .mist-item2 {
      border-top: 1rpx solid #ECEDF9;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 44rpx;
      padding: 24rpx 32rpx 24rpx 0;
      margin-left: 32rpx;
    }

    .mist-item3 {
      border-top: 1rpx solid #ECEDF9;
      margin-left: 32rpx;
      display: flex;
      justify-content: flex-end;
      height: 96rpx;
      align-items: center;

      .mist-item4 {
        padding: 0 16rpx;
        height: 48rpx;
        border-radius: 8rpx;
        border: 2rpx solid #BDBDBD;
        font-size: 28rpx;
        @include flexCenter;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
      }

      .mist-item5 {
        margin: 0 32rpx;
        color: white;
        background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
      }
    }
  }
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
