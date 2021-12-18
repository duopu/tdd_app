<template>
  <view class="modal-box" :style="{ zIndex: zIndex }" v-if="visible">

    <view class="modal-box1">
      <view class="modal-box2">{{ title }}</view>

      <view class="modal-center">
        <view class="center-msg" v-if="centerMsg">{{ centerMsg }}</view>
        <slot name="slot1" />
        <slot name="slot2" />
      </view>

      <view class="modal-box3">
        <view class="modal-box6 modal-box4" @click="hide">{{ cancelText }}</view>
        <view class="modal-box6 modal-box5" @click="show">{{ okText }}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "modalBox",
  props: {
    // 弹窗的高度 默认999
    zIndex: {
      type: [String, Number],
      default: '999'
    },
    // 弹窗头文字
    title: {
      type: String,
      default: '提示'
    },
    // 确定按钮文字
    okText: {
      type: String,
      default: '确认'
    },
    // 取消文字按钮
    cancelText: {
      type: String,
      default: '取消'
    },
    // 默认提示文字 和 slot 二选一
    centerMsg: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.$emit('show')
      this.visible = true
    },
    hide() {
      this.$emit('hide')
      this.visible = false
    }
  }
}
</script>
<style scoped lang="scss">
.modal-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  @include flexCenter;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-box1 {
    width: 622rpx;
    min-height: 300rpx;
    background-color: white;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;

    .modal-box2 {
      text-align: center;
      font-size: 32rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #323233;
      line-height: 44rpx;
      margin: 48rpx 0 16rpx 0;
    }

    .modal-center {
      flex: 1;

      .center-msg {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #969799;
        text-align: center;
        line-height: 40rpx;
      }
    }

    .modal-box3 {
      display: flex;

      .modal-box6 {
        width: 50%;
        border-top: 1rpx solid #EBEDF0;
        height: 96rpx;
        @include flexCenter;
        font-size: 32rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323233;
      }

      .modal-box4 {
        border-bottom-left-radius: 16rpx;
      }

      .modal-box5 {
        color: #2C3580;
        border-left: 1rpx solid #EBEDF0;
        border-bottom-right-radius: 16rpx;
      }
    }
  }
}
</style>
