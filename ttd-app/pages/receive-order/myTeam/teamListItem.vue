<template>
  <view class="team-list-item">

    <image :src="MDicon" class="team-list-img" />

    <view class="team-list-right">
      <view class="team-list-right1">
        <view class="tlr-1">
          <text class="tlr-name">周子喧</text>
          <text class="tlr-phone">18605909636</text>
        </view>
        <view class="tlr-2">
          <text class="tlr-2-item" v-for="i in tagList" :key="i">{{ i }}</text>
        </view>
      </view>
      <view v-if="showDelBtn" class="team-list-right2" @click="$emit('del')">删除</view>
      <uni-icons size="18" class="team-list-right3" type="forward" color="#BDBDBD" />
    </view>

  </view>
</template>
<script>
import MDicon from '../../../static/mine/MDicon.png';

export default {
  name: "teamListItem",
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
    showDelBtn: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="scss">
.team-list-item {
  padding: 32rpx 0 0 32rpx;
  display: flex;

  .team-list-img {
    width: 96rpx;
    height: 96rpx;
    border-radius: 8rpx;
    padding-right: 20rpx;
  }

  .team-list-right {
    padding-bottom: 32rpx;
    border-bottom: 1rpx solid #EBEDF0;
    flex: 1;
    display: flex;

    .team-list-right1 {
      flex: 1;

      .tlr-1 {
        .tlr-name {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
        }

        .tlr-phone {
          padding-left: 16rpx;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
          line-height: 36rpx;
        }
      }

      .tlr-2 {
        margin-top: 16rpx;
        display: flex;

        .tlr-2-item {
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

    .team-list-right2 {
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

    .team-list-right3 {
      align-self: center;
      padding: 0 32rpx 0 16rpx;
    }
  }
}
</style>