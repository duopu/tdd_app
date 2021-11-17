<template>
  <view class="my-integral">
    <custom-navbar title="我的积分" />
    <back-container>
      <template v-slot:headerSlot>
        <view class="integral-top">
          <view class="integral-top-num">积分</view>
          <view class="integral-top-ac">
            <view class="integral-top-number">2343</view>
            <view class="integral-top-btn">积分商城</view>
          </view>
        </view>
      </template>

      <view class="integral-center">
        <view class="integral-item">
          <view class="edit-lable">收支明细</view>
          <view class="edit-midle">查看更多</view>
          <uni-icons class="edit-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="detail-item" v-for="i in 3" :key="i">
          <view class="detail-item-left">
            <view class="item-left1">注册登录</view>
            <view class="item-left2">2021-05-17 03:25</view>
          </view>
          <view class="detail-item-right" :class="i === 1 ? 'detail-item-right-minus' : ''">+ 800</view>
        </view>
      </view>
    </back-container>

    <iphonex-bottom>
      <view class="reservate-item">
        <view class="reservate-item-left">完成订单奖励积分</view>
        <view class="reservate-item-right">去下单</view>
      </view>

      <view class="reservate-item">
        <view class="reservate-item-left">邀请新用户奖励积分</view>
        <view class="reservate-item-right">去下单</view>
      </view>
    </iphonex-bottom>
  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BottomOperate from "../addressManage/component/bottomOperate";

export default {
  name: 'myIntegral',
  components: { BottomOperate, IphonexBottom, BackContainer },
}
</script>
<style lang="scss" scoped>
.my-integral {
  .integral-top {
    height: 276rpx;
    box-sizing: border-box;
    padding: 60rpx 32rpx 48rpx 64rpx;

    .integral-top-num {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 36rpx;
    }

    .integral-top-ac {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .integral-top-number {
        font-size: 96rpx;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 113rpx;
      }

      .integral-top-btn {
        width: 128rpx;
        height: 48rpx;
        border-radius: 32rpx;
        border: 2rpx solid #EDEDED;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .integral-center {
    box-sizing: border-box;
    padding: 15rpx 32rpx 0 32rpx;

    .integral-item {
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

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28rpx 0;
      border-top: 1rpx solid #EBEDF0;

      .detail-item-left {
        .item-left1 {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
        }
        .item-left2 {
          margin-top: 18rpx;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
          line-height: 32rpx;
        }
      }
      .detail-item-right {
        font-size: 32rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FF3B30;
        line-height: 40rpx;
      }

      .detail-item-right-minus {
        color: #34C759
      }
    }
  }

  .reservate-item {
    height: 118rpx;
    background: #FFFBE8;
    padding: 0 32rpx;
    @include flexBetween;

    .reservate-item-left {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }

    .reservate-item-right {
      width: 144rpx;
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
}
</style>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
