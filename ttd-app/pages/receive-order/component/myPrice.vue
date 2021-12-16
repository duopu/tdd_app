<template>
  <view class="my-price" :class="className" :style="{transform: `scale(${scale})`}">
    <text class="yang" v-if="showYang">￥</text>
    <text class="my-price-zheng">{{ zheng }}</text>
    <text class="my-price-fen">.{{ fen }}</text>
  </view>
</template>
<script>
export default {
  name: "myPrice",
  props: {
    price: {
      type: Number,
      default: 0
    },
    scale: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    },
    showYang: Boolean,
  },
  computed: {
    zheng() {
      return this.price ? (this.price?.toString()?.split('.')?.[0] || '0') : '0'
    },
    fen() {
      return this.price ? (`${this.price?.toString()?.split('.')?.[1] || '0' }00`.slice(0, 2)) : '00'
    }
  }
}
</script>
<style scoped lang="scss">
.my-price {
  .yang {
    color: #828282;
    font-size: 24rpx;
    padding-right: 10rpx;
  }

  .my-price-zheng {
    font-size: 36rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #FF3B30;
    line-height: 44rpx;
  }

  .my-price-fen {
    font-size: 24rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #FF3B30;
    line-height: 44rpx;
  }
}
</style>
