<template>
	<view>

		<custom-navbar title="我的签到" />

		<back-container>
			<template #headerSlot>
				<view class="sign-in-header">
					<view class="sign-in-h1" v-for="i in list" :key="i.label">
						<view class="sign-in-h11">{{ i.num }}</view>
						<view class="sign-in-h12">{{ i.label }}</view>
					</view>
				</view>
			</template>

			<view class="sign-in-body">
				<view class="sign-in-b-center" :class="signInToday ? 'signed-center' :''" @click="toSign">
					{{ signInToday ? '已' : '' }}签到
				</view>
			</view>
		</back-container>

		<view class="sign-in-end">
			规则：初始签到一次获得{{ startIntegral }}积分，连续签到每次比上次多获得{{ continueIncrIntegral }}积分，最高一次签到获得{{ maxIntegral }}积分。
		</view>

		<sign-model ref="signModel" />
	</view>
</template>
<script>
	import BackContainer from "../addressManage/component/backContainer";
	import SignModel from "./signModel";

	export default {
		name: "signIn",
		components: {
			SignModel,
			BackContainer
		},
		data() {
			return {
				list: [{
						num: 1,
						label: '累计签到次数'
					},
					{
						num: 2,
						label: '累计获得积分'
					},
					{
						num: 13,
						label: '本月获得积分'
					},
				],
				signInToday: false,
				continueIncrIntegral: 0, // 连续签到递增
				maxIntegral: 0, // 签到单次积分上限
				startIntegral: 0, // 签到起始积分
			};
		},
		onReady() {
			this.querySignInfo();
			this.querySignConfig();
		},
		methods: {
			querySignInfo() {
				this.$http.post('/b/signin/queryByUser', {}, true)
					.then(res => {
						this.list[0].num = res.signAccount;
						this.list[1].num = res.signScore;
						this.list[2].num = res.monthScore;
						this.signInToday = res.signInToday;
					})
			},
			querySignConfig() {
				this.$http.post('/b/signin/getSignConfig', {}, true)
					.then(res => {
						this.continueIncrIntegral = res.continueIncrIntegral;
						this.maxIntegral = res.maxIntegral;
						this.startIntegral = res.startIntegral;
					})
			},
			toSign() {
				if (this.signInToday) return;
				this.$http.post('/b/signin/signIn', {}, true)
					.then(res => {
						this.$refs.signModel.show();
						this.querySignInfo();
					})
			}
		}
	}
</script>
<style lang="scss">
	.sign-in-header {
		height: 180rpx;
		display: flex;
		justify-content: space-between;
		padding: 32rpx 42rpx;
		box-sizing: border-box;

		.sign-in-h1 {
			width: 168rpx;
			height: 116rpx;
			text-align: center;

			.sign-in-h11 {
				font-size: 52rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 64rpx;
			}

			.sign-in-h12 {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.6);
				line-height: 36rpx;
				margin-top: 16rpx;
			}
		}
	}

	.sign-in-body {
		@include flexCenter;
		height: 500rpx;

		.sign-in-b-center {
			height: 256rpx;
			width: 256rpx;
			background: linear-gradient(181deg, #FDAB29 0%, #FA9B0C 94%);
			box-shadow: 0 0 20rpx 2rpx rgba(252.00000017881393, 161.20001167058945, 24.99999850988388, 1);
			border-radius: 256rpx;
			border: 2rpx solid #FF9500;

			font-size: 52rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 64rpx;
			@include flexCenter;
		}

		.signed-center {
			background: #EDEDED;
			border: 4rpx solid #BDBDBD;
			color: #BDBDBD;
			box-shadow: none;
		}
	}

	.sign-in-end {
		font-size: 24rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #828282;
		line-height: 32rpx;
		margin: 32rpx;
	}
</style>
<style lang="scss">
	@import "../../mine/addressManage/_grayPageStyle.scss";
</style>
