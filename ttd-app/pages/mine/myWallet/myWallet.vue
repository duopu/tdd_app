<template>
  <view class="my-wallet">
    <custom-navbar title="我的积分" />
    <back-container>
      <template v-slot:headerSlot>
        <view class="wallet-top">
          <view class="wallet-rule">查看提现规则</view>
          <view class="wallet-top-num">
            我的余额
            <uni-icons type="eye-slash-filled" class="eye-slash-filled" size="16" color="#ffffff" />
          </view>
          <view class="wallet-top-ac">
            <view class="wallet-top-number">2343</view>
            <view class="wallet-top-btn">提现</view>
          </view>
        </view>
      </template>

      <view class="wallet-center">
        <view class="wallet-item">
          <view class="edit-lable">收支明细</view>
          <view class="edit-midle">查看更多</view>
          <uni-icons class="edit-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="wallet-detail-item" v-for="i in 3" :key="i">
          <view class="wallet-detail-item-left">
            <view class="wallet-item-left1">新用户注册</view>
            <view class="wallet-item-left2">+ 800</view>
          </view>
          <view class="wallet-detail-item-right">
            <view class="wallet-item-right1">2021-06-26 02:17</view>
            <view class="wallet-item-right2">交易成功</view>
          </view>
        </view>
      </view>
    </back-container>

    <iphonex-bottom :show-common-area="false" />
  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BottomOperate from "../addressManage/component/bottomOperate";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";

export default {
  name: 'myWallet',
  components: { UniIcons, BottomOperate, IphonexBottom, BackContainer },
}
</script>
<style lang="scss" scoped>
.my-wallet {
  .wallet-top {
    height: 276rpx;
    box-sizing: border-box;
    padding: 30rpx 32rpx 48rpx 64rpx;

    .wallet-rule {
      font-size: 24rpx;
      text-align: right;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }

    .wallet-top-num {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 36rpx;

      .eye-slash-filled {
        margin-left: 24rpx;
      }
    }

    .wallet-top-ac {
      display: flex;
      justify-content: space-between;
      margin-top: 10rpx;

      .wallet-top-number {
        font-size: 96rpx;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 113rpx;
      }

      .wallet-top-btn {
        margin-top: 20rpx;
        width: 116rpx;
        height: 64rpx;
        border-radius: 32rpx;
        border: 2rpx solid #EDEDED;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        @include flexCenter;
      }
    }
  }

  .wallet-center {
    box-sizing: border-box;
    padding: 15rpx 32rpx 0 32rpx;

    .wallet-item {
      display: flex;
      align-items: center;
      height: 88rpx;

      .edit-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .edit-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }

      .edit-right {
        padding-left: 18rpx;
      }
    }

    .wallet-detail-item {
      padding: 28rpx 0;
      min-height: 140rpx;
      box-sizing: border-box;
      border-top: 1rpx solid #EBEDF0;

      .wallet-detail-item-left {
        @include flexBetween;

        .wallet-item-left1 {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
        }

        .wallet-item-left2 {
          font-size: 32rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 40rpx;
        }
      }

      .wallet-detail-item-right {
        margin-top: 18rpx;
        @include flexBetween;

        .wallet-item-right1 {
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
          line-height: 32rpx;
        }

        .wallet-item-right2 {
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #34C759;
          line-height: 32rpx;
        }
      }
    }
  }
}
</style>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
