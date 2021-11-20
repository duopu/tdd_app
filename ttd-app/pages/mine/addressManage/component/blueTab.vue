<template>
  <view class="blue-tab">
    <view class="tab-one" v-for="i in list" :key="i.text" @click="$emit('change', i.key)">
      <view class="tab-one-text" :class="i.key == activeKey ? 'tab-one-active' : ''">{{ i.text }}</view>
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
      default: '1'
    }
  }
}
</script>
<style scoped lang="scss">
.blue-tab {
  width: 750rpx;
  height: 120rpx;
  display: flex;
  justify-content: space-evenly;

  .tab-one {
    height: 88rpx;

    .tab-one-text {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #EDEDED;
      text-align: center;
      line-height: 82rpx;
      border-bottom: 6rpx solid transparent;
      border-bottom-left-radius: 3rpx;
      border-bottom-right-radius: 3rpx;
    }

    .tab-one-active {
      border-bottom-color: white;
      color: white;
    }
  }
}
</style>
