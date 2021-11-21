<template>
	<view>

    <custom-navbar title="团队详情" />

    <back-container>
      <template v-slot:headerSlot>
        <team-card />
      </template>
      <view class="team-dtl">
        <member-title :show-right="false" title="评价" />
        <evaluate-card v-for="i in 5" :key="i" />
      </view>
    </back-container>

	</view>
</template>

<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
  import TeamCard from "../myTeam/teamCard";
  import EvaluateCard from "../myTeam/evaluateCard";
  import MemberTitle from "../myTeam/memberTitle";
  export default {
		name: "teamDetail",
    components: { MemberTitle, EvaluateCard, TeamCard, BackContainer },
    data() {
			return {

			};
		}
	}
</script>
<style lang="scss" scoped>
.team-dtl {
  background-color: white;
  margin-bottom: 100rpx;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
