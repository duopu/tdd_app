<template>
  <view>
    <custom-navbar title="报价" />

    <back-container>
      <template #headerSlot>
        <offer-head />
      </template>

      <view class="offer-detail">
        <view class="od-it" v-for="i in 5" :key="i">
          <view class="od-1">
            <image :src="MDicon" class="od-1image" />
            <view class="od-1right">
              <view class="od-1right-top">
                <text class="od-1tag">标签</text>
                <text class="od-1time">2021-08-26 12:40</text>
              </view>
              <view class="od-1content">问题</view>
              <view class="od-1img-list">
                <image :src="MDicon" class="od-1img-item" v-for="i in 7" :key="i" />
              </view>
            </view>
          </view>

          <view class="od-1 od-2">
            <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/reply.svg" class="od-1image" />
            <view class="od-1right">
              <view class="od-1right-top">
                <text class="od-1tag od-2tag">发单者回复</text>
                <text class="od-1time">2021-08-26 12:40</text>
              </view>
              <view class="od-2text">可以的话，多少写点！ 方便工作人员快速排队故障。</view>
              <view class="od-1img-list">
                <image :src="MDicon" class="od-1img-item" v-for="i in 7" :key="i" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </back-container>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../component/offerHead";

export default {
  name: "offerDetail",
  components: { OfferHead, BackContainer },
  data() {
    return { MDicon: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png' };
  }
}
</script>
<style lang="scss">
.offer-detail {
  background-color: #ECEDF9;

  .od-it {
    margin-bottom: 32rpx;
    padding-left: 32rpx;
    background-color: white;

    .od-1 {
      padding-top: 32rpx;
      display: flex;

      .od-1right {
        margin-left: 20rpx;
        border-bottom: 1rpx solid #EBEDF0;

        .od-1content {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
          margin: 32rpx 0 16rpx 0;
        }
      }
    }

    .od-1image {
      flex-shrink: 0;
      margin-top: 5rpx;
      width: 32rpx;
      height: 32rpx;
    }

    .od-1right-top {
      @include flexBetween;
      padding-right: 32rpx;

      .od-1tag {
        height: 40rpx;
        border-radius: 8rpx;
        border: 2rpx solid #EDEDED;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #4F4F4F;
        padding: 0 12rpx;
        @include flexCenter;
      }

      .od-1time {
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 32rpx;
      }

      .od-2tag {
        background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
        color: #FFFFFF;
      }
    }

    .od-2text {
      padding: 32rpx 0 32rpx 32rpx;
      box-sizing: border-box;
      margin: 36rpx 0 16rpx 0;
      background: #F3F4F5;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 36rpx;
    }

    .od-1img-list {
      display: flex;
      flex-flow: row wrap;
      padding-bottom: 32rpx;

      .od-1img-item {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        margin: 0 20rpx 20rpx 0;
      }
    }
  }
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
