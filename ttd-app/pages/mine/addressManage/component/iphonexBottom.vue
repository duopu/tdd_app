<template>
  <view class="iphonex-bottom">
    <view class="common-bottom" v-if="showCommonArea">
      <slot></slot>
    </view>
    <view class="x-bottom" v-if="isIphoneXup" />
  </view>
</template>
<script>
export default {
  name: "iphonexBottom",
  props: {
    // 是否展示按钮区域 默认展示
    showCommonArea: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isIphoneXup: false, // 是x细列 及以上机型
    }
  },
  created() {
    let that = this
    // 获取设备机型
    uni.getSystemInfo({
      success: res => {
        let model = res.model;
        if (/iphone\sx/i.test(model) || (/iphone/i.test(model) && /unknown/.test(model)) || /iphone\s11/i.test(model)) {
          that.isIphoneXup = true;
        } else {
          that.isIphoneXup = false;
        }
      }
    })
  }
}
</script>
<style scoped lang="scss">
.iphonex-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 998;
  width: 750rpx;

  .common-bottom {
    width: 750rpx;
    min-height: 100rpx;
    background: #FFFFFF;
  }

  .x-bottom {
    width: 750rpx;
    height: 68rpx;
    background: #FFFFFF;
  }
}
</style>
