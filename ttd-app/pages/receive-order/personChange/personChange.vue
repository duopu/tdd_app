<template>
  <view>
    <custom-navbar title="人员变更" />

    <back-container>
      <member-title :show-right="false" title="目前成员" />
      <view class="pc-01">
        <view class="pc-01-item" v-for="i in 4" :key="i">
          <image class="pc-01-img" :src="MDicon" />
          <view class="pc-01-name">孙慧</view>
        </view>
      </view>
    </back-container>

    <view class="pc-02">
      <member-title right-text="选择人员" />
      <team-list-item v-for="i in 6" />
    </view>

    <iphonex-bottom>
      <big-btn />
    </iphonex-bottom>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import MemberTitle from "../myTeam/memberTitle";
import MDicon from '../../../static/mine/MDicon.png';
import TeamListItem from "../myTeam/teamListItem";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "personChange",
  components: { BigBtn, IphonexBottom, TeamListItem, MemberTitle, BackContainer },
  data() {
    return {
      MDicon
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.pc-01 {
  padding: 32rpx;
  display: flex;
  flex-flow: wrap row;

  .pc-01-item {
    margin-right: 58rpx;
    width: 127rpx;

    &:nth-of-type(4n + 4) {
      margin: 0;
    }

    .pc-01-img {
      width: 127rpx;
      height: 127rpx;
      border-radius: 8rpx;
    }

    .pc-01-name {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      text-align: center;
      margin-top: 16rpx;
      color: #323232;
      line-height: 36rpx;
    }
  }
}

.pc-02 {
  background-color: white;
  margin: 32rpx 0 200rpx 0;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
