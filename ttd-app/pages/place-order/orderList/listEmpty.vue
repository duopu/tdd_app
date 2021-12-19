<template>
  <view class="list-empty" :style="{ height: height }">
    <!-- TODO 图片待替换 -->
    <image class="list-empty-img" :src="url" />
    <view class="list-empty-text1">{{ text1 }}</view>
    <view class="list-empty-text2">{{ text2 }}</view>
  </view>
</template>
<script>
export default {
  name: "listEmpty",
  props: {
    text1: {
      type: String,
      default: '暂无数据'
    },
    text2: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-back.png'
    },
    height: {
      type: String,
      default: '490rpx'
    }
  }
}
</script>
<style scoped lang="scss">
.list-empty {
  display: flex;
  background-color: white;
  flex-flow: wrap column;
  justify-content: center;
  align-items: center;

  .list-empty-img {
    width: 96rpx;
    height: 96rpx;
  }

  .list-empty-text1 {
    font-size: 32rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
    line-height: 40rpx;
    margin: 16rpx 0;
  }

  .list-empty-text2 {
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
    line-height: 32rpx;
  }
}
</style>
