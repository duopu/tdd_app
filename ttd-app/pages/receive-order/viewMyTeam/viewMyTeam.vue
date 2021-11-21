<template>
  <view>
    <custom-navbar title="我的团队" />

    <back-container>
      <template v-slot:headerSlot>
        <team-card :show-edit="false" :show-setting="false" />
      </template>

      <earning-nums />

    </back-container>

    <view class="my-team">
      <member-title />
      <team-list-item v-for="i in 2" :key="i" :show-del-btn="false" />
    </view>

    <view class="my-team">
      <member-title :show-right="false" title="评价" />
      <evaluate-card v-for="i in 2" :key="i" />
    </view>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import TeamListItem from "../myTeam/teamListItem";
import MemberTitle from "../myTeam/memberTitle";
import EarningNums from "../myTeam/earningNums";
import TeamCard from "../myTeam/teamCard";
import EvaluateCard from "../myTeam/evaluateCard";

export default {
  name: "viewMyTeam",
  components: { EvaluateCard, TeamCard, EarningNums, MemberTitle, TeamListItem, BackContainer },
  data() {
    return {};
  }
}
</script>
<style lang="scss" scoped>
.my-team {
  background-color: white;
  margin: 32rpx 0 0 0;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
