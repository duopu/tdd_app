<template>
  <view class="switch-title">
    <text class="switch-text">{{ title }}</text>

    <view class="member-switch" v-if="showSwitch" @click="$emit('changeSwitch')">
      <uni-icons size="20" class="icon-style" v-if="switchValue" type="circle-filled" color="#1059FA" />
      <uni-icons size="20" class="icon-style" v-else type="circle" color="#1059FA" />
    </view>
  </view>
</template>
<script>
export default {
  name: "titleWithSwitch",
  props: {
    title: {
      type: String,
      default: '团队成员'
    },
    showSwitch: {
      type: Boolean,
      default: false
    },
    switchValue: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="scss">
.switch-title {
  height: 88rpx;
  margin: 0 0 0 32rpx;
  box-sizing: border-box;
  @include flexBetween;
  border-bottom: 1rpx solid #EBEDF0;

  .switch-text {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
    line-height: 36rpx;
  }

  .member-switch {
    padding-right: 32rpx;
  }
}
</style>
