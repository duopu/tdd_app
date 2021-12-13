<template>
  <view class="sign-model" v-if="visible">

    <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconClose.svg" @click="hide"
           class="sign-model-close" />

    <view class="sign-model-box">

      <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/sign-coins.svg"
             class="sign-model-add-imag" />

      <view class="success-text">签到成功</view>
      <!-- <view class="success-text1">已经连续签到 2 次</view> -->
      <!-- <view class="success-text2">+&nbsp;&nbsp;<text class="success-text3"> 2</text>&nbsp;&nbsp;分</view> -->

      <view class="sign-model-btn" @click="hide">确定</view>
    </view>
  </view>
</template>
<script>
export default {
  name: "signModel",
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
}
</script>
<style scoped lang="scss">
.sign-model {
  position: fixed;
  left: 0;
  top: 0;
  width: 750rpx;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  @include flexCenter;
  flex-direction: column;

  .sign-model-close {
    margin: 0 64rpx 32rpx 64rpx;
    align-self: flex-end;
    width: 48rpx;
    height: 48rpx;
  }

  .sign-model-box {
    width: 622rpx;
    height: 772rpx;
    background: #FFFFFF;
    border-radius: 32rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;


    .sign-model-add-imag {
      margin: 80rpx 0 64rpx 0;
      width: 217rpx;
      height: 172rpx;
    }

    .success-text {
      font-size: 52rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #34C759;
      line-height: 64rpx;
    }

    .success-text1 {
      font-size: 28rpx;
      margin: 20rpx 0;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }

    .success-text2 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
    }

    .success-text3 {
      font-size: 52rpx;
      color: #FF3B30;
      display: inline-block;
      padding: 0 12rpx;
    }
  }


  .sign-model-btn {
    width: 526rpx;
    height: 72rpx;
    background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
    border-radius: 50rpx;
    @include flexCenter;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    margin-top: 132rpx;
  }
}
</style>
