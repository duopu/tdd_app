<template>
  <view class="my-star">
    <uni-icons :size="size"
               v-for="i in fullNum"
               :key="i"
               class="star-i star-full"
               type="star-filled"
               color="#FF9500"
    />

    <uni-icons :size="size"
               class="star-i star-half"
               type="starhalf"
               v-if="halfNum"
               color="#FF9500"
    />

    <uni-icons :size="size"
               v-for="i in emptyNum"
               :key="i"
               class="star-i star-empty"
               type="star"
               color="#FF9500"
    />

    <text class="my-star-num">{{ num }} fullNum:{{fullNum}} halfNum:{{halfNum}}  emptyNum:{{emptyNum}} 分</text>
  </view>
</template>
<script>
export default {
  name: "myStar",
  props: {
    num: {
      type: Number,
      default: 0.1
    },
    size: {
      type: String,
      default: '14'
    },
  },
  computed: {
    fullNum() {
      return parseInt(this.num)
    },
    halfNum() {
      return (this.num - this.fullNum) >= 0
    },
    emptyNum() {
      return 4 - this.fullNum
    }
  }
}
</script>
<style scoped lang="scss">
.my-star {
  display: inline-flex;
  align-items: center;

  .star-i {
    margin-left: 6rpx;
  }
  .star-full {

  }
  .star-half {

  }
  .star-empty {

  }

  .my-star-num {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #969799;
    line-height: 36rpx;
    margin-left: 18rpx;
  }
}
</style>