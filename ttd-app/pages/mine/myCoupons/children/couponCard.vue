<template>
  <view class="coupon-card">

    <view class="c-card1">
      <view class="c-card1-money">200</view>
      <view class="c-card1-mj">满100减30</view>
    </view>

    <view class="c-card2">
      <view class="c-card21">
        <view class="c-card24" :class="minusType == '1' ? 'c-card24-red' : ''">满减</view>
        <view class="c-card25">双十一特别放送券</view>
      </view>
      <view class="c-card22">用途</view>
      <view>
        <view class="c-card23">
          <text class="c-card23-text">2021-01-15 - 2021-3-4</text>
          <uni-icons :type="spread ? 'arrowup' : 'arrowdown'" color="#BDBDBD" size="12" @click="changeSpread" />
        </view>
        <text v-if="spread" class="c-card23-text">我是折叠信息我是折叠信息我是折叠信息我是折叠信息</text>
      </view>
    </view>

    <view class="c-card3">
      <view class="c-card31" />
      <view class="c-card32" />
      <view class="c-card33" />
    </view>

    <view class="c-card4">使用</view>

  </view>
</template>
<script>
export default {
  name: "couponCard",
  props: {
    minusType: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      spread: false
    }
  },
  methods: {
    changeSpread() {
      this.spread = !this.spread
    }
  }
}
</script>
<style scoped lang="scss">
.coupon-card {
  display: flex;
  width: 686rpx;
  box-sizing: border-box;
  min-height: 192rpx;
  background: #FFF2DF;
  border-radius: 16rpx;
  padding: 0 20rpx;

  .c-card1 {
    align-self: center;
    flex-shrink: 0;
    text-align: center;

    .c-card1-money {
      font-size: 52rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #FF3B30;
      line-height: 64rpx;
    }

    .c-card1-mj {
      margin-top: 16rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FF3B30;
      line-height: 32rpx;
    }
  }

  .c-card2 {
    padding: 32rpx 0;
    flex: 1;
    margin-left: 26rpx;

    .c-card21 {
      display: flex;

      .c-card24 {
        min-width: 64rpx;
        height: 32rpx;
        background: #34C759;
        border-radius: 8rpx;
        @include flexCenter;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 32rpx;
        margin-right: 16rpx;
      }

      .c-card24-red {
        background: #FF3B30;
      }

      .c-card25 {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
        line-height: 36rpx;
      }
    }

    .c-card22 {
      margin: 18rpx 0;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 32rpx;
    }

    .c-card23 {
      @include flexBetween;
    }

    .c-card23-text {
      font-size: 20rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #828282;
      line-height: 28rpx;
    }
  }

  .c-card3 {
    flex-shrink: 0;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    .c-card31 {
      width: 20rpx;
      height: 10rpx;
      background-color: white;
      border-radius: 0 0 10rpx 10rpx;
    }

    .c-card32 {
      height: calc(100% - 20rpx);
      width: 0;
      border-left: 2rpx dashed white;
    }

    .c-card33 {
      width: 20rpx;
      height: 10rpx;
      background-color: white;
      border-radius: 10rpx 10rpx 0 0;
    }
  }

  .c-card4 {
    flex-shrink: 0;
    margin-left: 8rpx;
    align-self: center;
    width: 116rpx;
    height: 64rpx;
    background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
    border-radius: 32rpx;
    @include flexCenter;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
}
</style>
