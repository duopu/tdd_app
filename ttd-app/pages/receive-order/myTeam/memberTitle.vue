<template>
  <view class="member-title">
    <text class="member-text">{{ title }}</text>

    <view class="member-right" v-if="showRight" @click="$emit('add')">
<!--      <uni-icons size="15" class="icon-style" type="plus" color="#1059FA" />-->
      <image src="/static/mine/iconCircleAdd.svg" class="icon-style" />
      <text class="member-right-text">{{ rightText }}</text>
    </view>
  </view>
</template>
<script>
export default {
  name: "memberTitle",
  props: {
    title: {
      type: String,
      default: '团队成员'
    },
    rightText: {
      type: String,
      default: '邀请成员'
    },
    showRight: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="scss">
.member-title {
  height: 88rpx;
  margin: 0 0 0 32rpx;
  box-sizing: border-box;
  @include flexBetween;
  border-bottom: 1rpx solid #EBEDF0;

  .member-text {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
    line-height: 36rpx;
  }

  .member-right {
    flex-shrink: 0;
    @include flexCenter;

    .icon-style {
      width: 32rpx;
      height: 32rpx;
    }

    .member-right-text {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #1059FA;
      line-height: 36rpx;
      padding: 0 32rpx 0 16rpx;
    }
  }
}
</style>
