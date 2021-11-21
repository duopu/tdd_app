<template>
  <view class="my-star">
    <!-- 满星 -->
    <uni-icons :size="size"
               v-for="i in fullNum"
               :key="i"
               class="star-i star-full"
               type="star-filled"
               color="#FF9500"
    />

    <!-- 半星 -->
    <uni-icons :size="size"
               class="star-i star-half"
               type="starhalf"
               v-if="halfNum"
               color="#FF9500"
    />

    <!-- 空星 -->
    <uni-icons :size="size"
               v-for="i in emptyNum"
               :key="i"
               class="star-i star-empty"
               type="star"
               color="#FF9500"
    />

    <text class="my-star-num" v-if="showScore">{{ num }} 分</text>
  </view>
</template>
<script>
export default {
  name: "myStar",
  props: {
    // 星星分数 默认 2.5
    num: {
      type: Number,
      default: 2.5
    },
    // 星星大小
    size: {
      type: String,
      default: '15'
    },
    // 是否 显示分数
    showScore: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 满星数量
    fullNum() {
      return parseInt(this.num)
    },
    // 是否有半星
    halfNum() {
      return (this.num - this.fullNum) > 0
    },
    // 空星个数
    emptyNum() {
      return (this.halfNum ? 4 : 5) - this.fullNum
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
