<template>
  <view class="earning-nums">

    <view class="e-nums-i">
      <view class="e-nums-iw">
        <text class="e-nums-inum">{{ order }}</text>
        <!-- <text class="e-nums-iunit">k</text> -->
      </view>
      <view class="e-nums-text">完成订单</view>
    </view>

    <view class="e-nums-i">
      <view class="e-nums-iw">
        <text class="e-nums-inum e-nums-inum-ac">{{ avg }}</text>
        <text class="e-nums-iunit">k</text>
      </view>
      <view class="e-nums-text">月平均收益</view>
    </view>

    <view class="e-nums-i">
      <view class="e-nums-iw">
        <text class="e-nums-inum">{{ total }}</text>
        <text class="e-nums-iunit">k</text>
      </view>
      <view class="e-nums-text">总收益</view>
    </view>

  </view>
</template>
<script>
export default {
  name: "earningNums",
	props: {
		order: {
      type: Number,
      default: 0,
    },
		total: {
		  type: Number,
		  default: 0,
		},
		avg: {
		  type: Number,
		  default: 0,
		},
	}
}
</script>
<style scoped lang="scss">
.earning-nums {
  height: 178rpx;
  width: 750rpx;
  box-sizing: border-box;
  padding: 0 84rpx 48rpx 84rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .e-nums-i {
    .e-nums-iw {
      text-align: center;

      .e-nums-inum {
        font-size: 36rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #5AC8FA;
        line-height: 44rpx;
      }

      .e-nums-iunit {
        font-size: 20rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 44rpx;
        color: #2C3580;
        margin-left: 8rpx;
      }

      .e-nums-inum-ac {
        font-size: 52rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #5AC8FA;
        line-height: 64rpx;
      }
    }

    .e-nums-text {
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 36rpx;
      color: #2C3580;
    }
  }
}
</style>