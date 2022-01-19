<template>
	<view>
		<custom-navbar title="我的团队"/>

    <back-container>
      <template v-slot:headerSlot>
        <team-card
				 :team="team"
				 :showEdit="team.leaderFlag"
				 :showSetting="team.leaderFlag"
				 @onSave="updateTeam"
				 @onComment="toCommentPage"
				 @onSetting="toSettingPage"
				/>
      </template>

      <earning-nums :order="orderNum" :total="totalProfits" :avg="avgProfits"/>

    </back-container>

    <view class="my-team">
      <member-title :showRight="team.leaderFlag" @add="showInvite"/>

      <team-list-item v-for="(item, i) in memberList" :member="item" :showDelete="team.leaderFlag" @onClick="toPersonDetail(item)" @onDelete="removePerson(item.id)"/>
    </view>

    <invite-member-model ref="inviteMemberModel" :list="searchList" @onSearch="searchPerson" @onConfirm="invitePerson"/>

	</view>
</template>
<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
  import TeamCard from "./teamCard";
  import EarningNums from "./earningNums";
  import MemberTitle from "./memberTitle";
  import TeamListItem from "./teamListItem";
  import InviteMemberModel from "./inviteMemberModel";
  export default {
		name: "myTeam",
    components: { InviteMemberModel, TeamListItem, MemberTitle, EarningNums, TeamCard, BackContainer },
		data() {
			return {
				id: '',
				team: {
					teamLogo: '',
					teamName: '',
					teamIntroduce: '',
					leaderFlag: false,
				},
				orderNum: 0,
				totalProfits: 0,
				avgProfits: 0,
				memberList: [],
				searchList: [],
			}
		},
		onLoad(option) {
			if (option.id) {
			  this.id = option.id;
				this.refresh()
			}
		},
		onReady() {},
		onPullDownRefresh() {
			this.refresh();
		},
		methods: {
			refresh() {
				this.queryTeamInfo();
				this.queryTeamMember();
				this.queryTeamProfits();
			},
			queryTeamInfo() {
				this.$http
					.post('/b/teaminfo/query', { id: this.id }, true)
					.then(res => {
						uni.stopPullDownRefresh();
						this.team = res;
						if (this.team.leaderFlag) {
							this.checkTeamSetting();
						}
					}).catch((e) => {
				    uni.stopPullDownRefresh();
			    })
			},
			queryTeamMember() {
				this.$http
					.post('/b/teammember/queryList', { id: this.id }, true)
					.then(res => {
						this.memberList = res;
					});
			},
			queryTeamProfits() {
				this.$http
					.post('/b/teaminfo/teamProjectStatistics', { id: this.id }, true)
					.then(res => {
						this.orderNum = res.completeOrderCount;
						this.totalProfits = res.allOrderQuotaAmount / 1000;
						this.avgProfits = res.quotaAmountAvgMonth / 1000;
					});
			},
			checkTeamSetting() {
				uni.getStorage({
					key: 'TeamSettingTip',
					success: (res) => {
						console.log('TeamSettingTip res ', res);
					},
					fail: (res) => {
						uni.showModal({
							title: '提示',
							content: '请先去设置接单位置、距离，开启团队接单',
							confirmText: '去设置',
							success: (res) => {
								if (res.confirm) {
									this.toSettingPage();
								}
							},
							complete: () => {
								uni.setStorage({
									key: 'TeamSettingTip',
									data: 'TeamSettingTip',
								})
							}
						})
					}
				})
			},
			updateTeam(teamLogo, teamName, teamIntroduce) {
				if (!teamName) {
					uni.showToast({ title:  '请输入团队名称', icon:  'none' });
					return;
				}
				if (!teamIntroduce) {
					uni.showToast({ title:  '请输入团队介绍', icon:  'none' });
					return;
				}
				const params = {
					id: this.id,
					teamLogo,
					teamName,
					teamIntroduce,
				}
				this.$http.post('/b/teaminfo/update', params, true)
				.then(res => {
					uni.showToast({ title:  '修改成功' });
					this.queryTeamInfo();
				})
			},
			removePerson(id) {
				uni.showModal({
					content: '确定要删除该成员吗?',
					success: (res) => {
						if (res.confirm) {
							this.$http.post('/b/teammember/delete', { id }, true)
							.then(res => {
								uni.showToast({ title:  '删除成功' });
								this.queryTeamMember();
							})
						}
					}
				})
			},
			showInvite() {
				this.$refs.inviteMemberModel.show();
			},
			searchPerson(phone) {
				if (!phone) {
					uni.showToast({ title: '请输入手机号', icon: 'none' });
					return;
				}
				this.$http.post('/b/customer/queryList', { phone }, true)
				.then(res => {
					this.searchList = res;
				})
			},
			invitePerson(inviteeId) {
				if (!inviteeId) {
					uni.showToast({ title: '请先查找被邀请人', icon: 'none' });
					return;
				}
				this.$http.post('/b/teammember/invitationMember', { inviteeId }, true)
				.then(res => {
					uni.showToast({ title: '邀请成功' })
					this.$refs.inviteMemberModel.hide();
				})
			},
			toCommentPage() {
				uni.navigateTo({
					url: `/pages/receive-order/teamDetail/teamDetail?id=${this.id}`,
				})
			},
			toSettingPage() {
				uni.navigateTo({
					url: `/pages/receive-order/orderToSet/orderToSet?isTeam=1`
				})
			},
			toSelectPersonPage() {
				uni.navigateTo({
					url: `/pages/receive-order/selectPerson/selectPerson?id=${this.id}`
				})
			},
			toPersonDetail(item) {
				uni.navigateTo({
					url: `/pages/receive-order/peopleDetail/peopleDetail?id=${item.userId}`
				})
			}
		},
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
