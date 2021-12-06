<template>
  <view class="check-item">
    <view class="check-lable">{{ label }}</view>

    <view class="check-midle">

      <view class="check-midle-item"
            v-for="i in list"
            :key="i.value"
            @click="$emit('change', i.value)"
      >

        <image v-if="value == i.value" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/radioSelect.svg" class="circle-filled" />
        <image v-else src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/radioEmpty.svg" class="circle-filled" />

        <text class="check-text">{{ i.text }}</text>
      </view>

    </view>

  </view>
</template>
<script>
export default {
  name: "checkdItem",
  props: {
    list: {
      type: Array,
      default() {
        return [
          { text: '专票', value: '1' },
          { text: '普票', value: '2' },
        ]
      }
    },
    value: {
      type: String,
      default: '1'
    },
    label: {
      type: String,
      default: '发票类型'
    }
  }
}
</script>
<style scoped lang="scss">
.check-item {
  height: 88rpx;
  display: flex;
  align-items: center;

  .check-lable {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
  }

  .check-midle {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;

    .check-midle-item {
      display: flex;
      align-items: center;

      .circle-filled {
        width: 36rpx;
        height: 36rpx;
        flex-shrink: 0;
      }

      .check-text {
        padding: 0 32rpx 4rpx 16rpx;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
      }
    }
  }
}
</style>
