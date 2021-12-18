<template>
  <modal-box title="银行打款" ref="modelBox" z-index="1000">
    <template #slot1>
      <view class="kuan-model">
        <view class="kuan-model1">
          <view class="kuan-model3">银行卡号：</view>
          <view class="kuan-model4">
            <view class="kuan-model5">2382 2324 2344 2344</view>
            <view class="kuan-model6">复制</view>
          </view>

          <view class="kuan-model3">订单号：</view>
          <view class="kuan-model4">
            <view class="kuan-model5">TTD2923482349</view>
            <view class="kuan-model6">复制</view>
          </view>
        </view>
        <view class="kuan-model2">请打款到指定银行卡号，并且在备注中输入订单号，方便管理员处理你的订单。</view>
      </view>
    </template>
  </modal-box>
</template>
<script>
import ModalBox from "../choosePrice/modalBox";

export default {
  name: "dakuanModel",
  components: { ModalBox },
  methods: {
    show() {
      this.$refs.modelBox.show();
    },
    hide() {
      this.$refs.modelBox.hide();
    }
  }
}
</script>
<style scoped lang="scss">
.kuan-model {
  .kuan-model1 {
    padding: 32rpx;
    box-sizing: border-box;
    margin: auto;
    width: 526rpx;
    height: 248rpx;
    background: rgba(255, 149, 0, 0.1);
    border-radius: 8rpx;

    .kuan-model3 {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 32rpx;
    }
    .kuan-model4 {
      display: flex;
      align-items: center;
      margin: 8rpx 0 16rpx 0;
      .kuan-model5 {
        flex: 1;
        font-size: 36rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 44rpx;
        color: #2C3580;
      }
      .kuan-model6 {
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #2C3580;
        line-height: 32rpx;
      }
    }
  }

  .kuan-model2 {
    margin: 16rpx 48rpx 50rpx 48rpx;
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 32rpx;
  }
}
</style>
