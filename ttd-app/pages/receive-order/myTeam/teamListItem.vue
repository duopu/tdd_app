<template>
  <view class="team-list-item">

    <image v-if="member.headImgUrl" :src="member.headImgUrl" class="team-list-img" @click="$emit('onClick')" />
		<image v-else src="/static/mine/MDicon.png" class="team-list-img" />

    <view class="team-list-right" @click="$emit('onClick')" >
      <view class="team-list-right1">
        <view class="tlr-1">
          <text class="tlr-name">{{ member.userName }}</text>
          <text class="tlr-phone">{{ member.phone }}</text>
        </view>
        <view class="tlr-2">
          <text class="tlr-2-item" v-for="i in skillList" :key="i">{{ i }}</text>
        </view>
      </view>
      <view v-if="member.leaderFlag" class="team-list-right2" hover-stop-propagation @click="$emit('onDelete')">删除</view>
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
		member: {
			phone: '',
			userId: '',
			userName: '',
			headImgUrl: '',
			leaderFlag: false,
			skills: [],
		},
    tagList: {
      type: Array,
      default() {
        return ['技能1', '技能2', '技能3']
      }
    },
  },
	computed: {
	  skillList() {
	    return (this.member.skills || []).slice(0, 3);
	  },
	},
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