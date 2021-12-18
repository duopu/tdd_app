<template>
  <view class="team-card">
    <image class="team-card-img" :src="team.teamLogo" />
    <view class="team-card-dtl team-card-nm">
      <view class="team-card-1">
        <text class="team-card-name">{{ team.teamName || '' }}</text>
        <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconEditWhite.svg" v-if="showEdit" @click="edit" class="icon-sty"  />
        <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/teamView.svg" v-if="showView" @click="$emit('onComment')" class="icon-sty"  />
        <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconSet.svg" v-if="showSetting" @click="$emit('onSetting')" class="icon-sty" />
      </view>

      <view class="team-card-dz">队长：{{ team.leaderName || '' }}</view>

      <view class="team-card-dtl">{{ team.teamIntroduce || '' }}</view>

    </view>

    <edit-team ref="editTeam" :logo="team.teamLogo" :title="team.teamName" :intro="team.teamIntroduce" @onSave="updateTeam" />
  </view>
</template>
<script>
import EditTeam from "./editTeam";

export default {
  name: "teamCard",
  components: { EditTeam },
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
		team: {
			teamLogo: '',
			teamName: '',
			teamIntroduce: '',
			leaderName: '',
		}
  },
  methods: {
    edit() {
      this.$refs.editTeam.show();
    },
		updateTeam(teamLogo, teamName, teamIntroduce) {
			this.$emit('onSave', teamLogo, teamName, teamIntroduce);
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
        width: 36rpx;
        height: 36rpx;
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

  .team-card-nm {
    flex: 1;
  }
}
</style>
