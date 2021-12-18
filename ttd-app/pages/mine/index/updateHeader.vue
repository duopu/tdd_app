<template>
  <view class="up-head-model" v-if="visible">

    <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconClose.svg" @click="hide"
           class="up-head-model-close" />

    <view class="up-head-model-box">
      <view class="up-head-text">修改头像</view>

      <view class="up-head-add">
        <image class="up-head-add-pic" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadAdd.svg" />
      </view>

      <view class="up-head-model-btn" @click="hide">保存</view>
    </view>
  </view>
</template>
<script>
export default {
  name: "updateHeader",
  data() {
    return {
      visible: true,
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
.up-head-model {
  position: fixed;
  left: 0;
  top: 0;
  width: 750rpx;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  @include flexCenter;
  flex-direction: column;

  .up-head-model-close {
    margin: 0 64rpx 32rpx 64rpx;
    align-self: flex-end;
    width: 48rpx;
    height: 48rpx;
  }

  .up-head-model-box {
    width: 622rpx;
    //height: 772rpx;
    background: #FFFFFF;
    border-radius: 32rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    .up-head-text {
      font-size: 36rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #323335;
      line-height: 44rpx;
      margin: 48rpx auto 64rpx auto;
    }

    .up-head-add {
      width: 312rpx;
      height: 312rpx;
      background: #F3F4F5;
      border-radius: 156rpx;
      @include flexCenter;

      .up-head-add-pic {
        width: 156rpx;
        height: 156rpx;
      }
    }
  }

  .up-head-model-btn {
    width: 526rpx;
    height: 72rpx;
    margin: 96rpx 0 48rpx 0;
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
