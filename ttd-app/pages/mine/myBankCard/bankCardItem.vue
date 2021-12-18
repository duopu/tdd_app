<template>
  <view class="bc-item" @click="$emit('click')" :style="{ backgroundColor: backgroundColor }">
    <image src="http://jycrm.bm001.com/favicon.png" class="bc-left"></image>
    <view class="bc-midle">
      <view class="bc-midle-name">{{ item.householderName }}</view>
      <view class="bc-midle-bank-name">开户行：{{ item.bankName }}</view>
      <view class="bc-midle-bank-name">银行卡号：{{ item.bankCardNo }}</view>
    </view>
    <uni-icons v-if="i === 1" type="circle-filled" size="22" color="#FF3B30" />
    <uni-icons v-else-if="i === 2" type="arrowright" size="22" color="#969799" />
    <uni-icons v-else type="circle" size="22" color="#969799" />
  </view>
</template>
<script>
export default {
  name: "bankCardItem",
  props: {
    item: {
      type: Object,
      default() {
        return {
          householderName: '',
          bankName: '',
          bankCardNo: '',
        }
      }
    },
    i: {
      type: Number,
      default: 1
    },
    backgroundColor: {
      type: String,
      default() {
        return '#FFFFFF';
      }
    }
  }
}
</script>
<style scoped lang="scss">
.bc-item {
  height: 193rpx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 32rpx;
  margin-bottom: 33rpx;

  .bc-left {
    width: 96rpx;
    height: 96rpx;
    border-radius: 8rpx;
    margin-right: 16rpx;
  }

  .bc-midle {
    flex: 1;

    .bc-midle-name {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323233;
      line-height: 40rpx;
      margin-bottom: 16rpx;
    }

    .bc-midle-bank-name {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 36rpx;
    }
  }
}
</style>
