<template>
  <view class="team-card">
    <image class="team-card-img" :src="MDicon" />
    <view class="team-card-dtl">
      <view class="team-card-1">
        <text class="team-card-name">大湾区哥哥</text>
        <uni-icons size="18" v-if="showEdit" @click="edit" class="icon-sty" type="compose" color="#FFFFFF" />
        <uni-icons size="18" v-if="showView" class="icon-sty" type="list" color="#FFFFFF" />
        <uni-icons size="18" v-if="showSetting" class="icon-sty" type="gear-filled" color="#FFFFFF" />
      </view>

      <view class="team-card-dz">队长：杰哥</view>

      <view class="team-card-dtl">我躺在床上看天花板，想着我工作的天花板，只是别人的地板只是别人的地板只是别人的地板。(文字最多两行，多了截掉……)</view>

    </view>

    <edit-team ref="editTeam" />
  </view>
</template>
<script>
import MDicon from '../../../static/mine/MDicon.png';
import EditTeam from "./editTeam";

export default {
  name: "teamCard",
  components: { EditTeam },
  data() {
    return {
      MDicon
    }
  },
  props: {
    showEdit: {
      type: Boolean,
      default: true
    },
    showView: {
      type: Boolean,
      default: true
    },
    showSetting: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    edit() {
      this.$refs.editTeam.show();
    }
  }
}
</script>
<style scoped lang="scss">
.team-card {
  display: flex;
  background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);
  padding: 48rpx 32rpx;

  .team-card-img {
    flex-shrink: 0;
    width: 128rpx;
    height: 128rpx;
    border-radius: 8rpx;
    margin-right: 16rpx;
  }

  .team-card-dtl {
    .team-card-1 {
      display: flex;

      .team-card-name {
        flex: 1;
        font-size: 36rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 44rpx;
      }

      .icon-sty {
        margin-left: 32rpx;
      }
    }

    .team-card-dz {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 36rpx;
      margin: 16rpx 0;
    }

    .team-card-dtl {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32rpx;

      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
