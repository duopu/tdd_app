<template>
	<view>
		<custom-navbar title="变更记录" />

		<back-container>
			<view class="root-box">
				<view class="cr-item-box" v-for="i in recordList" :key="i.id">
					<view class="cr-item">
						<view class="cr-item-l">
							<view class="cr-item-lpbox">
								<image
									src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/biangengRen.svg"
									class="cr-item-lp" />
							</view>
							<view class="cr-item-line" />
							<view class="cr-item-lpbox">
								<image
									src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/biangengTu.svg"
									class="cr-item-lp" />
							</view>
						</view>

						<view class="cr-item-r">
							<view class="cr-item-r1">
								<view class="cr-item-r11">变更后人员</view>
								<view class="cr-item-r12"
									:class="[approveState(i.approveState).class]">
									{{approveState(i.approveState).text }}
								</view>
							</view>

							<view class="cr-item-r2">{{ i.addTime }}</view>

							<view class="cr-item-r3">
								<view class="cr-item-r31" v-for="m in i.afterMemberList" :key="m.id">
									<image v-if="m.headImgUrl" :src="m.headImgUrl" class="cr-item-r32" />
									<image v-else :src="MDicon" class="cr-item-r32" />
									<view class="cr-item-r33">{{ m.name }}</view>
								</view>
							</view>

							<view class="cr-item-r1">
								<view class="cr-item-r11 cr-item-r11-pre">之前人员</view>
							</view>
						</view>
					</view>

					<view class="cr-item-r3 cr-item-r8">
						<view class="cr-item-r31" v-for="m in i.beforeMemberList" :key="m.id">
							<image v-if="m.headImgUrl" :src="m.headImgUrl" class="cr-item-r32" />
							<image v-else :src="MDicon" class="cr-item-r32" />
							<view class="cr-item-r33">{{ m.name }}</view>
						</view>
					</view>

				</view>

				<list-empty v-if="!recordList.length" />
			</view>
		</back-container>

	</view>
</template>

<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
	import ListEmpty from "../../place-order/orderList/listEmpty";

	export default {
		name: "changeRecord",
		components: {
			ListEmpty,
			BackContainer
		},
		data() {
			return {
				MDicon: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png',
				recordList: [],
			};
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id;
				this.queryRecordList(this.id);
			}
		},
		onReady() {},
		onShow() {},
		methods: {
			approveState(state){
				const stateClass = ['cr-item-orange','','cr-item-red'];
				const stateText = ['待审核','已通过','已拒绝']
				return {
					class:stateClass[state],
					text:stateText[state]
				}
			},
			
			queryRecordList(id) {
				this.$http.post('/b/ordermember/queryRecordList', {
						id,
						pageSize: 1000
					}, true)
					.then(res => {
						this.recordList = res;
					})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.root-box {
		background-color: #ECEDF9;
	}

	.cr-item-box {
		margin-bottom: 32rpx;
		background-color: white;
	}

	.cr-item {
		display: flex;
		padding: 32rpx 0 0 32rpx;

		.cr-item-l {
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;

			.cr-item-lpbox {
				width: 48rpx;
				height: 48rpx;
				flex-shrink: 0;
				border-radius: 100%;
				@include flexCenter;
				border: 1rpx solid #2C3580;
			}

			.cr-item-lp {
				width: 36rpx;
				height: 36rpx;
			}

			.cr-item-line {
				height: 100%;
				width: 1rpx;
				background-color: #EDEDED;
			}
		}

		.cr-item-r {
			flex: 1;
			padding: 0 32rpx 0 16rpx;

			.cr-item-r1 {
				@include flexBetween;

				.cr-item-r11 {
					font-size: 32rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 40rpx;
					color: #2C3580;
				}

				.cr-item-r11-pre {
					padding: 32rpx 0 8rpx 0;
				}

				.cr-item-r12 {
					padding: 0 16rpx;
					height: 48rpx;
					background: #34C759;
					border-radius: 8rpx;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					@include flexCenter;
				}

				.cr-item-orange {
					background: #FF9500;
				}

				.cr-item-red {
					background: #FF3B30;
				}
			}

			.cr-item-r2 {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #969799;
				line-height: 36rpx;
				margin: 16rpx 0 32rpx 0;
			}
		}
	}

	.cr-item-r3 {
		display: flex;
		justify-content: space-between;
		flex-flow: wrap row;
		border-bottom: 1rpx solid #ECEDF9;

		.cr-item-r31 {
			width: 128rpx;

			.cr-item-r32 {
				width: 128rpx;
				height: 128rpx;
				border-radius: 8rpx;
			}

			.cr-item-r33 {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #323232;
				line-height: 36rpx;
				text-align: center;
				padding: 16rpx 0 34rpx 0;
			}
		}
	}

	.cr-item-r8 {
		padding: 36rpx 34rpx 0 96rpx;
	}
</style>

<style lang="scss">
	@import "../../mine/addressManage/_pageStyle.scss";
</style>
