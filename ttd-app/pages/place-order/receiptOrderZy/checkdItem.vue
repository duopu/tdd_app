<template>
  <view class="check-item">
    <view class="check-lable">{{ label }}</view>

    <view class="check-midle">

      <view class="check-midle-item"
            v-for="i in list"
            :key="i.value"
            @click="$emit('change', i.value)"
      >

        <uni-icons :type="value == i.value ? 'circle-filled' : 'circle'"
                   size="17"
                   :color="value == i.value ? '#3340A0' : '#969799'"
        />

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

      .check-text {
        padding: 0 32rpx 0 18rpx;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
      }
    }
  }
}
</style>