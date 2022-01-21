<template>
	<view>
		<custom-navbar title="发单" :show-left-icon="false" />

		<back-container>
			<template v-slot:headerSlot>
				<view class="place-order">
					<view class="po-1" v-for="i in list" :key="i.title" @click="toOrderList(i.state)">
						<view class="po-11">{{ i.num }}</view>
						<view class="po-12">{{ i.title }}</view>
					</view>

					<view class="po-2" />

					<view class="po-1 po-16" @click="toOrderList(10)">
						<view class="po-11">
							<image class="email-filled11"
								src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/teamView.svg" />
						</view>
						<view class="po-12 po-13">所有订单</view>
					</view>
				</view>
			</template>
		</back-container>

		<view class="place-order-img-box">
			<image class="place-order-img" v-for="(i, index) in imageList" :key="index" :src="i.url"
				@click="publishOrder(i.orderType)" />
		</view>

		<!-- 协议弹层 -->
		<agreement-modal ref="agreementModal"></agreement-modal>
	</view>
</template>

<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";

	export default {
		components: {
			BackContainer
		},
		data() {
			return {
				list: [{
						num: 0,
						title: '待报价',
						state: 10
					},
					{
						num: 0,
						title: '待确认',
						state: 20
					},
					{
						num: 0,
						title: '待开始',
						state: 30
					},
					{
						num: 0,
						title: '待完工',
						state: 40
					},
				],
				imageList: [{
						url: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/place_order__shishi.svg',
						orderType: 1
					},
					{
						url: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/place_order_kanshe.svg',
						orderType: 2
					},
					{
						url: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/place_order__renyuan.svg',
						orderType: 3
					},
					{
						url: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/place_order__zulin.svg',
						orderType: 4
					},
					{
						url: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/place_order__ruanjian.svg',
						orderType: 5
					},
				]
			};
		},
		onShow() {
			this.$tool.actionForLogin(() => {
				this.queryOrderCount();
			});
		},
		onPullDownRefresh() {
			this.$tool.actionForLogin(() => {
				this.queryOrderCount();
			});
		},
		methods: {
			queryOrderCount() {
				this.$http.post('/b/ordermaster/orderNumStatistics', {}, true)
					.then(res => {
						uni.stopPullDownRefresh();
						this.list[0].num = res.unQuoteNum;
						this.list[1].num = res.unConfirmNum;
						this.list[2].num = res.unStartNum;
						this.list[3].num = res.unCompleteNum;
					}).catch((e) => {
						uni.stopPullDownRefresh();
					})
			},
			toOrderList(state) {
				this.$tool.actionForLogin(() => {
					uni.navigateTo({
						url: `/pages/place-order/orderList/orderList?isPlaceOrder=1&state=${state}`,
					})
				});
			},
			publishOrder(orderType) {
				this.$tool.actionForLogin(() => {
					uni.navigateTo({
						url: `/pages/place-order/placeOrder/placeOrder?orderType=${orderType}`,
					})
				});
			},
		}
	}
</script>

<style lang="scss">
	.place-order {
		display: flex;
		padding: 48rpx 36rpx 64rpx 46rpx;

		.po-1 {
			min-width: 116rpx;
			height: 116rpx;
			margin-right: 12rpx;

			.po-11 {
				font-size: 52rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 64rpx;
				text-align: center;
			}

			.email-filled11 {
				width: 50rpx;
				height: 50rpx;
			}

			.po-12 {
				margin-top: 16rpx;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.6);
				line-height: 36rpx;
			}

			.po-13 {
				margin-top: 16rpx;
			}
		}

		.po-16 {
			margin: 0 0 0 22rpx;
		}

		.po-2 {
			width: 2rpx;
			height: 104rpx;
			background: #FFFFFF;
			opacity: 0.15;
		}
	}

	.place-order-img-box {
		background-color: white;
		margin-bottom: 100rpx;
		padding-bottom: 30rpx;

		.place-order-img {
			width: 686rpx;
			height: 228rpx;
			margin: 16rpx 32rpx 0 32rpx;
		}
	}
</style>

<style lang="scss">
	@import "../../mine/addressManage/_pageStyle.scss";
</style>
