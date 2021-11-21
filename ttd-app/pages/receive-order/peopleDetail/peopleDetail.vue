<template>
  <view>
    <custom-navbar title="人员详情" />

    <view class="pd-top">
      <view class="pd-top1">
        <image class="pd-top1-img" :src="trophyIcon" />
        <text class="pd-top1-text">已实名认证</text>
      </view>
    </view>

    <view class="pd-header">
      <image :src="MDicon" class="pd-header-img" />
      <view class="pd-header-text">
        <uni-icons size="18" type="compose" color="#323335" />
        <text class="pd-header-edtext">编辑信息</text>
      </view>
      <view class="pd-header-name">李娉婷</view>

      <view class="pd-header-phone pd-header-phone1">
        <uni-icons size="15" class="pd-header-edit-icon" type="phone" color="#828282" />
        <text class="pd-header-phonenum">手机号：186 5440 3053</text>
      </view>

      <view class="pd-header-phone">
        <uni-icons size="15" class="pd-header-edit-icon" type="phone" color="#828282" />
        <text class="pd-header-phonenum">身份证：430225 19010509 3064</text>
      </view>

      <view class="pd-header-info">意大利民事保护部门24日发布的数据显示，意大利当天新增新冠死亡病例420例，是3月18日以来最低日增幅，累计死亡病例25969例。</view>
    </view>

  </view>
</template>
<script>
import trophyIcon from '../../../static/mine/trophy-icon.svg';
import MDicon from '../../../static/mine/MDicon.png';

export default {
  name: "peopleDetail",
  data() {
    return {
      trophyIcon,
      MDicon
    };
  }
}
</script>
<style lang="scss" scoped>
.pd-top {
  background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);
  height: 148rpx;
  box-sizing: border-box;
  padding-top: 16rpx;

  .pd-top1 {
    @include flexCenter;
    box-sizing: border-box;
    margin: 0 32rpx 0 auto;
    height: 48rpx;
    width: 200rpx;
    border-radius: 8rpx;
    border: 2rpx solid #828282;

    .pd-top1-img {
      width: 32rpx;
      height: 32rpx;
    }

    .pd-top1-text {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32rpx;
      margin-left: 16rpx;
    }
  }
}

.pd-header {
  padding: 24rpx 32rpx 32rpx 32rpx;
  background-color: white;
  position: relative;

  .pd-header-img {
    background-color: #F3F4F5;
    width: 200rpx;
    height: 200rpx;
    position: absolute;
    left: 48rpx;
    top: -103rpx;
    border-radius: 100%;
  }

  .pd-header-text {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    width: 176rpx;
    height: 48rpx;

    .pd-header-edtext {
      padding: 0 20rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 32rpx;
    }
  }

  .pd-header-name {
    font-size: 52rpx;
    margin-top: 60rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #2C3580;
    line-height: 64rpx;
  }

  .pd-header-phone {
    .pd-header-phonenum {
      padding-left: 16rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }
  }

  .pd-header-phone1 {
    margin: 48rpx 0 16rpx 0;
  }

  .pd-header-info {
    width: 686rpx;
    background: #F3F4F5;
    box-sizing: border-box;
    padding: 32rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 48rpx;
    margin-top: 32rpx;
  }
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
