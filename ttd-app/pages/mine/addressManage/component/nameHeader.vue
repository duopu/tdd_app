<template>
  <view class="name-header" :style="style">
    <!-- 有头像展示头像 没头像展示姓名第一个字 -->
    <image class="name-header-image" v-if="image" :src="image" />
    <text class="name-header-text" v-else>{{ name }}</text>
  </view>
</template>
<script>
export default {
  name: "nameHeader",
  props: {
    // 头像链接
    image: {
      type: String,
      default: ''
    },
    // 没头像时展示姓名的第一个字 computed.name
    text: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    name() {
      return this.text?.substr(0, 1) || ''
    }
  }
}
</script>
<style scoped lang="scss">
.name-header {
  width: 96rpx;
  height: 96rpx;
  font-size: 48rpx;
  border-radius: 50%;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  color: #828282;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F3F4F5;

  .name-header-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
