<template>
	<view>

		<custom-navbar title="团队详情" />

		<back-container>
			<template v-slot:headerSlot>
				<team-card :team="team" :showEdit="false" :showView="false" :showSetting="false" />
			</template>
			<view class="team-dtl">
				<member-title :show-right="false" title="评价" />
				<evaluate-card v-for="i in commentList" :key="i.id" :comment="i" :sensitive="true" />
				<list-empty v-if="!commentList.length" />
			</view>
		</back-container>

	</view>
</template>

<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
	import TeamCard from "../myTeam/teamCard";
	import EvaluateCard from "../myTeam/evaluateCard";
	import MemberTitle from "../myTeam/memberTitle";
	import ListEmpty from "../../place-order/orderList/listEmpty";

	export default {
		name: "teamDetail",
		components: {
			ListEmpty,
			MemberTitle,
			EvaluateCard,
			TeamCard,
			BackContainer
		},
		data() {
			return {
				team: {},
				commentList: [],
			};
		},
		onLoad(option) {
			if (option.id) { // 编辑地址
				this.id = option.id;
				this.queryTeamInfo(this.id);
				this.queryTeamComment(this.id);
			}
		},
		methods: {
			queryTeamInfo(id) {
				this.$http
					.post('/b/teaminfo/query', {
						id
					}, true)
					.then(res => {
						this.team = res;
					});
			},
			queryTeamComment(userId) {
				this.$http
					.post('/b/ordercomment/queryPageList', {
						userId,
						userType: 2,
						pageSize: 100,
						sortInfos: [{
							field: 'addTime',
							sort: 'desc',
						}]
					}, true)
					.then(res => {
						this.commentList = res.dataList;
					});
			},
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
