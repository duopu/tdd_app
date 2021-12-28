<template>
	<view class="agreement-view">
		<view class="title">{{title}}</view>
		<view class="content" v-for="text in content">{{text}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: [],
				type: '',
			};
		},
		onLoad(option) {
			this.type = option.type;
			this.loadAgreementData()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.type == 'userAgreement' ? '用户协议' : '隐私政策'
			})
		},
		methods: {
			loadAgreementData() {
				this.$http.get('/core/softconf/agreement').then(res => {
					this.title = res[this.type].title;
					this.content = res[this.type].content.split(';');
				})
			},
		}
	}
</script>

<style lang="scss">
	view {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		box-sizing: border-box;
		position: relative;
	}

	.agreement-view {
		background-color: #FFFFFF;
		min-height: 100vh;

		.title {
			color: #333333;
			font-size: 36rpx;
			font-weight: bold;
			align-self: center;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
		}

		.content {
			color: #666666;
			font-size: 28rpx;
			margin-top: 10rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
		}
	}
</style>
