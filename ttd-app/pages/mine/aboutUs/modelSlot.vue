<template>
  <view class="cons-model">
    <view class="cons-model-back" @click="hide" />

    <view class="cons-model-bottom">

      <view class="cmb-title">
        <view class="cmb-title-left" />
        <view class="cmb-title-middle">{{ title }}</view>
        <uni-icons class="cmb-title-right" type="closeempty" color="#C8C9CC" size="20" @click="hide" />
      </view>

      <slot name="slot1" />

      <view class="cons-empty" />

      <big-btn @click="sure" />
      <view class="cons-out-class" />
    </view>
  </view>
</template>
<script>
import BigBtn from "../addressManage/component/bigBtn";

export default {
  name: "modelSlot",
  components: { BigBtn },
  props: {
    title: {
      type: String,
      default: '咨询'
    }
  },
  methods: {
    sure() {
      this.$emit('sure')
    },
    hide() {
      this.$emit('hide')
    },
  }
}
</script>
<style scoped lang="scss">
.cons-model {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 102;
  background-color: rgba(0, 0, 0, .7);
  left: 0;
  top: 0;
  display: flex;
  flex-flow: column wrap;

  .cons-model-back {
    flex: 1;
  }

  .cons-model-bottom {
    background-color: white;

    .cmb-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 96rpx;

      .cmb-title-left {
        width: 10rpx;
        height: 10rpx;
      }

      .cmb-title-middle {
        font-size: 32rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #323233;
      }

      .cmb-title-right {
        margin-right: 32rpx;
      }
    }

    .cons-empty {
      width: 100%;
      height: 48rpx;
    }

    .cons-out-class {
      height: 30rpx;
    }
  }
}
</style>
