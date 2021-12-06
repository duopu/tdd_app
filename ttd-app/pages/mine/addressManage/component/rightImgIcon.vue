<template>
  <view class="right-img">
    <image class="right-img-icon" :class="className" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconRight.svg" />
  </view>
</template>
<script>
export default {
  name: "rightImgIcon",
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
.right-img {
  display: inline-block;
  padding-top: 6rpx;

  .right-img-icon {
    width: 32rpx;
    height: 32rpx;
  }
}
</style>
