<template>
  <view class="dde">
    <custom-navbar title="分销详情" />
    <view class="dde-1">
      <view class="dde-2">我的邀请人</view>

      <view class="dde-3">
        <image class="dde-31" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/dis-weixin.png" />
        <view class="dde-32">
          <view class="dde-33">张大</view>
          <view class="dde-34">189****5088</view>
        </view>
        <view class="dde-35">10-20 00:03</view>
      </view>

      <view class="dde-2">我邀请了 4 人</view>

      <view class="dde-4" v-for="i in 3" :key="i">
        <view class="dde-41">李连杰</view>
        <view class="dde-42">189****5088</view>
        <view class="dde-43">10-20 00:03</view>
      </view>

      <view class="dde-5">已经到头了~</view>

      <view class="dde-6">
        <image class="dde-61" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/saoma-icon.svg" />
        扫码绑定邀请人
      </view>

    </view>
  </view>
</template>
<script>
export default {
  name: "distributionDetail",
  data() {
    return {};
  }
}
</script>
<style lang="scss" scoped>
.dde {
  min-height: 100vh;
  overflow-y: scroll;
  width: 750rpx;
  background: linear-gradient(180deg, #F9694E 0%, #E32C4E 100%);

  .dde-1 {
    padding: 0 24rpx;
    box-sizing: border-box;

    .dde-2 {
      margin: 58rpx 0 24rpx 0;
      font-size: 32rpx;
      font-family: PingFang SC-Heavy, PingFang SC;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 38rpx;
    }

    .dde-3 {
      display: flex;
      align-items: center;
      height: 148rpx;
      box-sizing: border-box;
      background: #FEFAE3;
      padding: 0 32rpx;
      border-radius: 16rpx;

      .dde-31 {
        width: 96rpx;
        height: 96rpx;
        border-radius: 48rpx;
        margin-right: 24rpx;
      }

      .dde-32 {
        flex: 1;
        .dde-33 {
          font-size: 32rpx;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #8C4C31;
          line-height: 40rpx;
        }

        .dde-34 {
          margin-top: 8rpx;
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #8C4C31;
          line-height: 36rpx;
        }
      }

      .dde-35 {
        flex-shrink: 0;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #DE6C26;
      }
    }

    .dde-4 {
      height: 88rpx;
      margin-bottom: 16rpx;
      display: flex;
      align-items: center;
      padding: 0 32rpx;
      background: #FEFAE3;
      border-radius: 16rpx;
      .dde-41 {
        font-size: 32rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #8C4C31;
      }

      .dde-42 {
        flex: 1;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #8C4C31;
      }

      .dde-43 {
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #DE6C26;
      }
    }

    .dde-5 {
      padding-top: 8rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FEFAE3;
      text-align: center;
      line-height: 36rpx;
    }

    .dde-6 {
      margin: 200rpx 16rpx;
      width: 670rpx;
      height: 96rpx;
      background: linear-gradient(180deg, #FFEC93 0%, #FFAF4D 100%);
      box-shadow: 0 8px 12px 2px rgba(110,0,0,0.25);
      border-radius: 61rpx;
      @include flexCenter;
      border: 4rpx solid #F9B47E;
      font-size: 36rpx;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #8C4C31;

      .dde-61 {
        padding: 4rpx 10rpx 0 0;
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
}
</style>
<style>
page {

}
</style>
