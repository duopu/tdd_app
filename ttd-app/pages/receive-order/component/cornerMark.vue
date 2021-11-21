<template>
  <view class="corner-mark" :class="className" :style="{backgroundColor: color}">{{ num }}</view>
</template>
<script>
export default {
  name: "cornerMark",
  props: {
    num: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#FF3B30'
    }
  }
}
</script>
<style scoped lang="scss">
.corner-mark {
  display: inline-flex;
  min-width: 32rpx;
  height: 32rpx;
  border-radius: 36rpx;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
}
</style>
