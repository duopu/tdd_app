<template>
  <view class="state-tab-list">
    <view class="tab-item" v-for="i in stateList" :key="i.value" @click="$emit('change', i.value)">
      <text class="tab-name" :class="activeValue == i.value ? 'active-name' : ''">{{ i.name }}</text>
      <view class="tab-boder" :class="activeValue == i.value ? 'active-boder' : ''" />
    </view>
  </view>
</template>
<script>
export default {
  name: "stateTabList",
  props: {
    stateList: {
      type: Array,
      default() {
        return [
          { name: '待报价', value: 10 },
          { name: '待确认', value: 20 },
          { name: '待开始', value: 30 },
          { name: '待完工', value: 40 },
          { name: '已完工', value: 50 },
          { name: '已取消', value: 90 },
        ]
      }
    },
    activeValue: {
      type: Number,
      default: 1
    }
  }
}
</script>
<style scoped lang="scss">
.state-tab-list {
  display: flex;
  height: 152rpx;
  padding: 32rpx 20rpx;
  box-sizing: border-box;
  justify-content: space-between;

  .tab-item {
    line-height: 88rpx;

    .tab-name {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #EDEDED;
    }

    .active-name {
      color: white;
    }

    .tab-boder {
      width: 80rpx;
      height: 6rpx;
      background: transparent;
      border-radius: 3rpx;
    }

    .active-boder {
      background: #FFFFFF;
    }
  }
}
</style>