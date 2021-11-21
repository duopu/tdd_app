<template>
  <view class="people-item-item">

    <image :src="MDicon" class="people-item-img" />

    <view class="people-item-right">
      <view class="people-item-right1">
        <view class="people-lkj-1">
          <text class="people-lkj-name">周子喧</text>
          <text class="people-lkj-phone">18605909636</text>
        </view>
        <view class="people-lkj-2">
          <text class="people-lkj-2-item" v-for="i in tagList" :key="i">{{ i }}</text>
        </view>
      </view>

      <uni-icons size="22"
                 class="people-item-right3"
                 :type="checked ? 'circle-filled' : 'circle'"
                 :color="checked ? '#2C3580' : '#BDBDBD'"
      />
    </view>

  </view>
</template>
<script>
import MDicon from '../../../static/mine/MDicon.png';

export default {
  name: "peopleItem",
  data() {
    return {
      MDicon
    }
  },
  props: {
    tagList: {
      type: Array,
      default() {
        return ['技能1', '技能2', '技能3']
      }
    },
    checked: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="scss">
.people-item-item {
  padding: 32rpx 0 0 32rpx;
  display: flex;

  .people-item-img {
    width: 96rpx;
    height: 96rpx;
    border-radius: 8rpx;
    padding-right: 20rpx;
  }

  .people-item-right {
    padding-bottom: 32rpx;
    border-bottom: 1rpx solid #EBEDF0;
    flex: 1;
    display: flex;

    .people-item-right1 {
      flex: 1;

      .people-lkj-1 {
        .people-lkj-name {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
        }

        .people-lkj-phone {
          padding-left: 16rpx;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
          line-height: 36rpx;
        }
      }

      .people-lkj-2 {
        margin-top: 16rpx;
        display: flex;

        .people-lkj-2-item {
          padding: 0 8rpx;
          height: 32rpx;
          background: #EDEDED;
          border-radius: 8rpx;
          @include flexCenter;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #4F4F4F;
          margin-right: 8rpx;
        }
      }
    }

    .people-item-right2 {
      align-self: center;
      width: 80rpx;
      height: 48rpx;
      border-radius: 32rpx;
      border: 2rpx solid #EDEDED;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #4F4F4F;
      @include flexCenter;
    }

    .people-item-right3 {
      align-self: center;
      padding: 0 32rpx 0 16rpx;
    }
  }
}
</style>
