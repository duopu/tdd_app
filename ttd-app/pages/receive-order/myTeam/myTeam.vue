<template>
	<view>
		<custom-navbar title="我的团队"/>

    <back-container>
      <template v-slot:headerSlot>
        <team-card />
      </template>

      <earning-nums />

    </back-container>

    <view class="my-team">
      <member-title />

      <team-list-item v-for="i in 2" />
    </view>

	</view>
</template>
<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
  import TeamCard from "./teamCard";
  import EarningNums from "./earningNums";
  import MemberTitle from "./memberTitle";
  import TeamListItem from "./teamListItem";
  export default {
		name: "myTeam",
    components: { TeamListItem, MemberTitle, EarningNums, TeamCard, BackContainer }
	}
</script>
<style lang="scss" scoped>
.my-team {
  background-color: white;
  margin: 32rpx 0 200rpx 0;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
