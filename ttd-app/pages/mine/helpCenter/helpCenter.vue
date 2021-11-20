<template>
  <view>
    <custom-navbar title="帮助中心" />

    <back-container>
      <view class="help-center">
        <view class="help-center-item" v-for="i in 5" :key="i">
          <view class="hc-title">海淀公园强迫闲逛人员背防疫手册？别再传了！</view>
          <view class="hc-text">美国总统特朗普21日在密歇根州福特工厂视察时被媒体拍到仍未佩戴口罩，而此前，不管是福特公司还是该州官员都提出了希望他戴口罩的要求。</view>
          <view class="hc-img-box">
            <image v-for="i in 3" class="hc-img-item" :src="IDcardBack" :key="i" />
          </view>
        </view>
      </view>
    </back-container>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import IDcardBack from '../../../static/mine/idcard-back.png';

export default {
  name: "helpCenter",
  components: { BackContainer },
  data() {
    return {
      IDcardBack,
    };
  }
}
</script>

<style lang="scss">
.help-center {
  background-color: #F6F7F7;

  .help-center-item {
    box-sizing: border-box;
    padding: 32rpx;
    background-color: white;
    margin-bottom: 32rpx;

    .hc-title {
      font-size: 36rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #323335;
      line-height: 44rpx;
    }

    .hc-text {
      font-size: 32rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 48rpx;
      margin: 16rpx 0;
    }

    .hc-img-box {
      display: flex;
      flex-flow: row wrap;

      .hc-img-item {
        flex-shrink: 0;
        width: 128rpx;
        height: 128rpx;
        margin: 0 16rpx 0 0;
      }
    }
  }
}
</style>
<style>
page {
  max-height: 100vh;
  overflow-y: scroll;
}
</style>
