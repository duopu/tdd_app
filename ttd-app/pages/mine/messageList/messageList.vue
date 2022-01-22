<template>
	<view>
		<custom-navbar title="列表消息" />
		<back-container>
			<view class="message-list">
				<view class="mist-item" v-for="(message, index) in messageList" :key="index" @click="toDtl(message)">
					<view class="flex-center-between">
						<view class="mist-item1">{{ message.title }}</view>
						<view class="mist-item-state" v-if="!message.readFlag">未读</view>
					</view>
					<view class="mist-item2">{{ message.content }}</view>
					<view class="mist-item3"
						v-if="(message.scenarioType == 1 || message.scenarioType == 2) && message.readFlag == 0">
						<view class="mist-item4" @click="progressMessage(message, 0)">拒绝</view>
						<view class="mist-item4 mist-item5" @click="progressMessage(message, 1)">接受</view>
					</view>
				</view>

				<list-empty v-if="messageList.length == 0" />
			</view>
		</back-container>
	</view>
</template>
<script>
	import BackContainer from "../addressManage/component/backContainer";
	import ListEmpty from "../../place-order/orderList/listEmpty";

	export default {
		name: "messageList",
		components: {
			ListEmpty,
			BackContainer
		},
		data() {
			return {
				messageList: [],
			};
		},
		onReady() {
			this.readMessage();
		},
		onShow() {
			this.queryMessageList()
		},
		methods: {
			readMessage() {
				this.$http.post('/core/sitemessage/readMessage', {
						scenarioTypeList: [0, 3, 4]
					})
					.then(res => {})
			},
			queryMessageList() {
				this.$http.post('/core/sitemessage/queryPageList', {
						pageSize: 100,
						sortInfos: [{
							field: 'addTime',
							sort: 'desc',
						}]
					}, true)
					.then(res => {
						this.messageList = res.dataList || [];
					})
			},
			toDtl(message) {
				if (message.linkPage == 101) {
					const params = JSON.parse(message.linkParamJson);
					// 订单消息
					uni.navigateTo({
						url: `/pages/place-order/orderDetail/orderDetail?id=${params.id}&isPlaceOrder=${params.detailType == 1 ? 1 : 0}`,
					})
				}
				// uni.navigateTo({ url: `/pages/mine/messageDetail/messageDetail?id=${message.id}` })
			},
			progressMessage(message, inviteState) {
				if (message.scenarioType == 1) {
					this.processDealerInvite(message.id, inviteState);
				} else {
					this.processTeamInvite(message.id, inviteState);
				}
			},
			processDealerInvite(id, inviteState) {
				this.$http.post('/core/sitemessage/processDealerInvite', {
						id,
						inviteState,
					}, true)
					.then(res => {
						uni.showToast({
							title: '处理成功',
							success: () => {
								this.queryMessageList();
							}
						})
					})
			},
			processTeamInvite(id, inviteState) {
				this.$http.post('/core/sitemessage/processTeamInvite', {
						id,
						inviteState,
					}, true)
					.then(res => {
						uni.showToast({
							title: '处理成功',
							success: () => {
								this.queryMessageList();
							}
						})
					})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.message-list {
		background-color: #ECEDF9;

		.mist-item {
			background-color: white;
			margin-bottom: 34rpx;

			.mist-item1 {
				font-size: 32rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #323335;
				padding: 24rpx 32rpx 26rpx 32rpx;
			}
			.mist-item-state {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #f0ad4e;
				padding: 24rpx 32rpx 26rpx 32rpx;
			}

			.mist-item2 {
				border-top: 1rpx solid #ECEDF9;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #828282;
				line-height: 44rpx;
				padding: 24rpx 32rpx 24rpx 0;
				margin-left: 32rpx;
			}

			.mist-item3 {
				border-top: 1rpx solid #ECEDF9;
				margin-left: 32rpx;
				display: flex;
				justify-content: flex-end;
				height: 96rpx;
				align-items: center;

				.mist-item4 {
					padding: 0 16rpx;
					height: 48rpx;
					border-radius: 8rpx;
					border: 2rpx solid #BDBDBD;
					font-size: 28rpx;
					@include flexCenter;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #828282;
				}

				.mist-item5 {
					margin: 0 32rpx;
					color: white;
					background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
				}
			}
		}
	}
</style>
<style lang="scss">
	@import "../addressManage/_pageStyle.scss";
</style>
