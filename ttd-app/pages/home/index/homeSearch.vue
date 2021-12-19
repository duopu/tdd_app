<template>
  <view class="hs-navbar">
    <view class="hs-top">
      <view class="hs-bar1" :style="{height: statusBarHeight + 'px'}"></view>
      <view class="hs-bar2" :style="{height: navbarHeight + 'px'}">
        <view class="hs-box">
          <view class="input-box">
            <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/search-white.png" class="input-search-logo" />
            <input type="text"
                   class="input-search"
                   placeholder="请输入服务类型名称"
                   placeholder-class="input-placeholder"
                   v-model="innerValue"
                   @input="change"
            />
          </view>

          <view class="msg-out" @click="$emit('message')">
            <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/home-message-icon.svg" class="msg-img" />
            <view class="msg-num">{{ messageNum }}</view>
          </view>
        </view>
      </view>
    </view>
    <view :style="{ width: '100%', height: Number(navbarHeight) + statusBarHeight + 'px' }" />
  </view>
</template>
<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();

export default {
  name: "homeSearch",
  props: {
    // 消息数量
    messageNum: {
      type: Number,
      default: 1
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      innerValue: ''
    }
  },
  methods: {
    change(e) {
      let _val = e.detail.value;
      this.$emit('change', _val)
      this.$emit('input', _val)
      this.$emit('update:value', _val)
    }
  },
  watch: {
    value: {
      handler(val) {
        this.innerValue = val
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    statusBarHeight() {
      return systemInfo.statusBarHeight
    },
    navbarHeight() {
      let height = systemInfo.platform == 'ios' ? 44 : 48;
      return this.height ? this.height : height;
    },
  }
}
</script>
<style scoped lang="scss">
.hs-navbar {
  .hs-bar1, .hs-bar2 {
    background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);
    width: 750rpx;
  }

  .hs-bar2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hs-top {
    width: 750rpx;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
  }

  .hs-box {
    display: flex;
    align-items: center;
    padding: 0 24rpx;
    .input-box {
      display: flex;
      align-items: center;
      width: 410rpx;
      height: 64rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 124rpx;

      .input-search {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 33rpx;
      }

      .input-search-logo {
        margin: 0 16rpx 0 20rpx;
        width: 32rpx;
        height: 32rpx;
      }
    }

    .msg-out {
      margin-left: 32rpx;
      width: 64rpx;
      height: 64rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 64rpx;
      position: relative;
      @include flexCenter;

      .msg-img {
        width: 32rpx;
        height: 32rpx;
      }

      .msg-num {
        position: absolute;
        right: -10rpx;
        top: -10rpx;
        height: 28rpx;
        background: #5AC8FA;
        border-radius: 28rpx;
        @include flexCenter;
        padding: 0 8rpx;
        font-size: 20rpx;
        box-sizing: border-box;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #2D3680;
      }
    }
  }

  /deep/.input-placeholder {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }

}
</style>
