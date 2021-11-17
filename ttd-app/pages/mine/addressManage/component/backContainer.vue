<template>
  <view class="back-container">
    <view class="container-header" :style="{minHeight: headerHeight + 'rpx'}">
      <slot name="headerSlot">
        <!--  demo <view v-slot:headerSlot><view>headerSlot</view></view>-->
      </slot>
    </view>
    <view class="container-body" :style="{minHeight: bodyHeight + 'rpx'}">
      <view :style="{width: '750rpx', height: bodyHeight + 'rpx'}"/>
      <slot></slot>
    </view>
  </view>
</template>
<script>
export default {
  name: "backContainer",
  props: {
    // 顶部深色区域最小高度 单位 rpx
    headerHeight: {
      type: Number,
      default: () => {
        return 48
      }
    },
    // 白色区域最小高度 单位 rpx
    bodyHeight: {
      type: Number,
      default: 17
    },
    // 顶部深色区域样式
    headerStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 白色区域样式
    bodyStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped lang="scss">
.back-container {
  width: 750rpx;
  background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);

  .container-header {
  }

  .container-body {
    background-color: white;
    border-radius: 16rpx 16rpx 0 0;
  }
}
</style>
