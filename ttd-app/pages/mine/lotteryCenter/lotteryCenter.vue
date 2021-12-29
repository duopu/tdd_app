<template>
	<view class="lottery-page">
		<custom-navbar title="抽奖中心" />
		<view>
			<view class="luck-draw-view">
				<view class="wheel-box-det" @click="checkRule">查看规则</view>
				<LuckyWheel class="LuckyWheel" ref="myLucky" width="560rpx" height="560rpx" :blocks="blocks"
					:prizes="prizes" :buttons="buttons" :defaultStyle="defaultStyle" @start="startCallBack"
					@end="endCallBack" />

				<view class="count-text">
					你还有
					<text class="count-num-text">{{ lotteryCount }}</text>
					次抽奖机会
				</view>

				<wyb-noticeBar v-if="notices.length > 0" class="notice-bar" :text="notices" type="vert" color="#f5a300"
					bgColor="transparent" time="2000" :showIcon="false" :showMore="false" />
			</view>

			<view class="wheel-boo0">
				<view class="wheel-boo1">中奖记录</view>
				<view class="wheel-boo2" v-for="i in lotteryList" :key="i.id">
					<view class="wheel-boo3">
						<view class="wheel-boo31">{{ i.prize }}</view>
						<view class="wheel-boo32">{{ i.prizeTime }}</view>
					</view>
					<view class="wheel-boo4">{{ i.state == 1 ? '未发放' : i.state == 2 ? '物流快递中' : '已发放'}}</view>
				</view>

				<list-empty v-if="!lotteryList.length" />
			</view>

		</view>
	</view>
</template>

<script>
	import HxrWheel from "./hxrWheel";
	import ListEmpty from "../../place-order/orderList/listEmpty";
	import LuckyWheel from '@lucky-canvas/uni/lucky-wheel' // 大转盘

	export default {
		name: "lotteryCenter",
		components: {
			ListEmpty,
			HxrWheel,
			LuckyWheel
		},
		data() {
			return {

				blocks: [{
					padding: '6px',
					background: '#FF5B2D'
				}],
				prizes: [],
				defaultStyle: {
					position: 'relative',
					left: '100rpx',
					top: '200rpx'
				},
				buttons: [{
					radius: '50%',
					imgs: [{
						src: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/s-dial_pointer.png',
						width: '140rpx',
						height: '140rpx',
						top: '-70rpx'
					}]
				}],
				notices: [],
				lotteryCount: 0,
				lotteryList: [],
			};
		},
		onShow() {
			this.refresh();
		},
		methods: {

			// 点击抽奖按钮触发回调
			startCallBack() {
				// 调抽奖接口
				this.$http.post('/b/lottery/startLottery', {})
					.then(res => {
						// 先开始旋转
						this.$refs.myLucky.play()
						// 后端返回的中奖索引
						const index = this.prizes.findIndex((p) => p.id == res);
						// 使用定时器来模拟请求接口
						setTimeout(() => {
							// 调用stop停止旋转并传递中奖索引
							this.$refs.myLucky.stop(index)
						}, 2000)
					})
			},
			// 抽奖结束触发回调
			endCallBack(prize) {
				// 奖品详情
				console.log('奖品详情',prize);
				this.$tool.showToast(`恭喜您获得了 ${prize.fonts[0].text}`)
				this.queryLotteryCount();
				this.queryLotteryList();
			},
			refresh() {
				this.queryLotteryCount();
				this.queryPriceList();
				this.queryNoticeInfo();
				this.queryLotteryList();
			},
			// 查询剩余抽奖次数
			queryLotteryCount() {
				this.$http.post('/b/lottery/remainLotteryNum', {})
					.then(res => {
						this.lotteryCount = res || 0;
					})
			},
			// 查询奖品列表
			queryPriceList() {
				this.$http.post('/b/lottery/prizeList', {})
					.then(res => {
						this.prizes = res.map((pri, index) => {
							const background = index % 2 == 1 ? '#50CA12' : '#FFB42C';
							uni.downloadFile({
								url: pri.icon, //仅为示例，并非真实的资源
								success: (res) => {
									if (res.statusCode === 200) {
										const tempFilePath = res.tempFilePath;
										const temp = [...this.prizes]
										temp.splice(index, 1, {
											...this.prizes[index],
											imgs: [{
												src: tempFilePath,
												width: '30px',
												height: '30px',
												top: '40px'
											}]
										})
										this.prizes = temp
										console.log('下载成功', res.tempFilePath);
									}
								}
							});
							return {
								range: pri.point,
								background,
								id: pri.id,
								fonts: [{
									text: pri.name,
									top: '10px',
									fontColor: '#ffffff',
									fontSize: '16px',
									wordWrap: false
								}]
							}
						});
						console.log('bkb', this.prizes);
					})
			},
			// 查询跑马灯显示信息
			queryNoticeInfo() {
				this.$http.get('/core/softconf/winning', {})
					.then(res => {
						this.notices = res.winningList || [];
					})
			},
			// 查询中奖记录
			queryLotteryList() {
				this.$http.post('/b/lottery/queryPageList', {
						pageSize: 100,
						sortInfos: [{
							field: 'prizeTime',
							sort: 'desc',
						}]
					})
					.then(res => {
						this.lotteryList = res.dataList || [];
					})
			},
			checkRule() {
				uni.showModal({
					title: '抽奖规则',
					content: '给我中！给我中！给我中！给我中！给我中！给我中！给我中！给我中！给我中！',
					showCancel: false,
					confirmText: '我知道了',
				})
			},
			start() {
				this.$refs.hxrWheel.begin(4);
			},
			startLottery() {
				this.$http.post('/b/lottery/startLottery', {})
					.then(res => {})
			},
		}
	}
</script>

<style lang="scss">
	.lottery-page {}

	.flex {
		display: flex;
		box-sizing: border-box;
		position: relative;
		flex-direction: column;
		align-items: stretch;
	}

	.luck-draw-view {
		@extend .flex;
		height: 870rpx;
		background-image: url('https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/luck-draw-bg.png');
		background-size: 750rpx 870rpx;
		background-repeat: no-repeat;

		.wheel-box-det {
			font-size: 28rpx;
			position: absolute;
			top: 50rpx;
			right: 30rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 36rpx;
		}

		.LuckyWheel {
			align-self: center;
			margin-top: 100rpx;
		}

		.count-text {
			@extend .flex;
			width: 340rpx;
			height: 76rpx;
			border-radius: 38rpx;
			background-color: #ffffff99;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
			align-self: center;
			color: #333333;
			font-size: 28rpx;

			.count-num-text {
				color: #FF3B30;
				font-size: 36rpx;
				font-weight: bold;
				margin-left: 10rpx;
				margin-right: 10rpx;
			}
		}

		.notice-bar {
			@extend .flex;
			width: 480rpx;
			height: 68rpx;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 28rpx;
			align-self: center;
		}
	}

	.wheel-boo0 {
		height: calc(100vh - 870rpx);
		overflow-y: scroll;
		background: white;
		padding-top: 16rpx;
		margin-bottom: 68rpx;

		.wheel-boo1 {
			overflow-y: scroll;
			padding: 0 32rpx;
			height: 88rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #828282;
		}

		.wheel-boo2 {
			padding: 32rpx 32rpx 16rpx 0;
			border-top: 1rpx solid #EDEDED;
			margin-left: 32rpx;
			display: flex;
			align-items: center;


			.wheel-boo3 {
				flex: 1;

				.wheel-boo31 {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #323335;
					line-height: 36rpx;
				}

				.wheel-boo32 {
					margin-top: 16rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #828282;
					line-height: 32rpx;
				}
			}

			.wheel-boo4 {
				width: 116rpx;
				@include flexCenter;
				height: 48rpx;
				background: #FF9500;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
</style>
