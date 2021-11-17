<template>
  <view class="blue-tab">
    <view class="tab-one" v-for="i in list" :key="i.text">
      <view class="tab-one-text">{{ i.text }}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: "blueTab",
  props: {
    list: {
      type: Array,
      default() {
        return [
          { text: '处理中', key: '1' },
          { text: '已结束', key: '2' },
        ]
      }
    },
    activeKey: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
.blue-tab {
  width: 750rpx;
  height: 120rpx;
  display: flex;
  justify-content: space-between;

  .tab-one {
    .tab-one-text {

    }
  }
}
</style>
