<template>
	<view class="my-integral">
		<custom-navbar title="我的积分" />
		<back-container>
			<template v-slot:headerSlot>
				<view class="integral-top">
					<view class="integral-top-num">积分</view>
					<view class="integral-top-ac">
						<view class="integral-top-number">{{ balance }}</view>
						<view class="integral-top-btn" @click="toMall">积分商城</view>
					</view>
				</view>
			</template>

			<view class="integral-center">
				<view class="integral-item" @click="toIntegralListPage()">
					<view class="edit-lable">积分明细</view>
					<!-- <view class="edit-midle">查看更多</view> -->
					<!-- <uni-icons class="edit-right" type="arrowright" size="18" color="#969799" /> -->
				</view>

				<view class="detail-item" v-for="(item, index) in integralList" :key="index">
					<view class="detail-item-left">
						<view class="item-left1">{{ showIntegralType(item.type) }}</view>
						<view class="item-left2">{{ item.addTime }}</view>
					</view>
					<view class="detail-item-right" :class="i === 1 ? 'detail-item-right-minus' : ''">
						{{ `${item.actNum ? '+ ' : ''}${item.actNum}`}}</view>
				</view>
				<list-empty v-if="!integralList.length" />
			</view>
		</back-container>

		<iphonex-bottom>
			<view class="reservate-item">
				<view class="reservate-item-left">完成订单奖励积分</view>
				<view class="reservate-item-right" @click="toOrder">去下单</view>
			</view>

			<view class="reservate-item">
				<view class="reservate-item-left">邀请新用户奖励积分</view>
				<view class="reservate-item-right" @click="toInvite">去邀请</view>
			</view>
		</iphonex-bottom>
	</view>
</template>
<script>
	import BackContainer from "../addressManage/component/backContainer";
	import IphonexBottom from "../addressManage/component/iphonexBottom";
	import BottomOperate from "../addressManage/component/bottomOperate";
	import ListEmpty from "../../place-order/orderList/listEmpty";

	export default {
		name: 'myIntegral',
		components: {
			ListEmpty,
			BottomOperate,
			IphonexBottom,
			BackContainer
		},
		data() {
			return {
				balance: 0,
				integralList: [],
			};
		},
		onReady() {},
		onShow() {
			this.refresh();
		},
		onPullDownRefresh() {
			this.refresh();
		},
		methods: {
			refresh() {
				this.queryIntegralInfo();
				this.queryIntegralList();
			},
			queryIntegralInfo() {
				this.$http.get('/b/integral/query', {}, true)
					.then(res => {
						uni.stopPullDownRefresh();
						this.balance = res.balance;
					}).catch((e) => {
						uni.stopPullDownRefresh();
					})
			},
			queryIntegralList() {
				const param = {
					pageSize: 100,
					sortInfos: [{
						field: 'addTime',
						sort: 'desc'
					}]
				}
				this.$http.post('/b/integralrecord/queryPageList', param, true)
					.then(res => {
						this.integralList = res.dataList;
					})
			},
			showIntegralType(t) {
				if (t == 1) {
					return '签到';
				} else if (t == 2) {
					return '订单';
				} else if (t == 3) {
					return '订单抵扣';
				} else if (t == 4) {
					return '手动赠送';
				}
				return '';
			},
			toIntegralListPage() {
				uni.navigateTo({
					url: '/pages/mine/addressManage/addressManage'
				})
			},
			toMall() {
				uni.showModal({
					title: '',
					content: '敬请期待哦',
					showCancel: false,
				})
			},
			toOrder() {
				uni.switchTab({
					url: '/pages/place-order/index/index'
				});
			},
			toInvite() {
				uni.navigateTo({
					url: '/pages/mine/invite/invite'
				});
			},
		},
	}
</script>
<style lang="scss" scoped>
	.my-integral {
		.integral-top {
			height: 276rpx;
			box-sizing: border-box;
			padding: 60rpx 32rpx 48rpx 64rpx;

			.integral-top-num {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 36rpx;
			}

			.integral-top-ac {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.integral-top-number {
					font-size: 96rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 113rpx;
				}

				.integral-top-btn {
					width: 128rpx;
					height: 48rpx;
					border-radius: 32rpx;
					border: 2rpx solid #EDEDED;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.integral-center {
			box-sizing: border-box;
			padding: 15rpx 32rpx 0 32rpx;

			.integral-item {
				display: flex;
				align-items: center;
				height: 88rpx;

				.edit-lable {
					flex-shrink: 0;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #323335;
				}

				.edit-midle {
					margin-left: auto;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #BDBDBD;
					text-align: right;
				}

				.edit-right {
					padding-left: 18rpx;
				}
			}

			.detail-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 28rpx 0;
				border-top: 1rpx solid #EBEDF0;

				.detail-item-left {
					.item-left1 {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #323335;
						line-height: 36rpx;
					}

					.item-left2 {
						margin-top: 18rpx;
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #828282;
						line-height: 32rpx;
					}
				}

				.detail-item-right {
					font-size: 32rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FF3B30;
					line-height: 40rpx;
				}

				.detail-item-right-minus {
					color: #34C759
				}
			}
		}

		.reservate-item {
			height: 118rpx;
			background: #FFFBE8;
			padding: 0 32rpx;
			@include flexBetween;

			.reservate-item-left {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #323335;
				line-height: 36rpx;
			}

			.reservate-item-right {
				width: 144rpx;
				height: 64rpx;
				background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
				border-radius: 32rpx;
				@include flexCenter;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #ECEDF9;
	}
</style>
