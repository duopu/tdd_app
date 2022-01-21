<template>
  <view class="custom-navbar">
    <view class="navbar-top" :style="{ zIndex: topZIndex }">
      <view class="bar1" :style="{height: statusBarHeight + 'px'}"></view>
      <view class="bar2" :style="{height: navbarHeight + 'px'}">
        <view>
          <image v-if="showLeftIcon && hasBack" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/headerBack.svg" class="back" @click="back" />
          <image v-if="showLeftIcon && !hasBack" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/headerHome.svg" class="back to-home"
                 @click="toHome" />
        </view>
        <view class="title">{{ title }}</view>
        <view class="empty" />
      </view>
    </view>
    <view :style="{ width: '100%', height: Number(navbarHeight) + statusBarHeight + 'px' }" />
  </view>
</template>
<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
// #ifdef MP-WEIXIN
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif

export default {
  name: "custom-nav-bar",
  props: {
    // 标题
    title: {
      type: String,
      default: '妥妥弟'
    },
    // 返回回调 默认返回上一页
    goBack: {
      type: Function,
      default: undefined
    },
    // 是否显示左上角按钮
    showLeftIcon: {
      type: Boolean,
      default: true,
    },
    // 高度
    topZIndex: {
      type: Number,
      default: 999
    }
  },
  methods: {
    back() {
      if (this.goBack) {
        this.goBack()
      } else {
        let pages = getCurrentPages(); // 当前路由栈数组
        if (pages?.length < 2) return uni.switchTab({ url: '/pages/home/index/index' }); // 当前路由栈没有页面 返回首页
        uni.navigateBack(); // 默认返回上一页
      }
    },
    // 跳转首页
    toHome() {
      uni.switchTab({ url: '/pages/home/index/index' });
    }
  },
  computed: {
    statusBarHeight() {
      return systemInfo.statusBarHeight
    },
    navbarHeight() {
      // #ifdef APP-PLUS || H5
      return this.height ? this.height : 44;
      // #endif
      // #ifdef MP
      // 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
      // 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
      // return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
      let height = systemInfo.platform == 'ios' ? 44 : 48;
      return this.height ? this.height : height;
      // #endif
    },

    // 当前页面是否有上一页
    hasBack() {
      let pages = getCurrentPages();
      return pages?.length > 1
    }
  }
}
</script>
<style scoped lang="scss">
.custom-navbar {
  .bar1, .bar2 {
    background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);
    width: 750rpx;
  }

  .empty {
    width: 20rpx;
    height: 10rpx;
  }

  .back {
    padding-left: 25rpx;
    width: 40rpx;
    height: 40rpx;
  }

  .to-home {
    padding-left: 20rpx;
    width: 50rpx;
    height: 50rpx;
  }

  .title {
    font-size: 36rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }

  .bar2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar-top {
    width: 750rpx;
    position: fixed;
    //z-index: 999;
    left: 0;
    top: 0;
  }

  .navbar-end {
    width: 750rpx;
    z-index: 1;
    left: 0;
  }
}
</style>
