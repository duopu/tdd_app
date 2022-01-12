<template>
	<view class="agreement-view">
		<view class="title">{{argument.title}}</view>
		<text class="content">{{argument.content}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				argument: {}
			};
		},
		onLoad(option) {
			this.title = option.title;

		},
		onReady() {
			this.loadAgreementData()
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
			loadAgreementData() {
				this.$http.get('/core/softconf/agreement2').then(res => {
					this.argument = res.agreementList.find(a => a.title == this.title);
					console.log(this.argument);
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
	  background-color: #ECEDF9;
	  max-height: 100vh;
	  overflow-y: scroll;
	}
	
	view {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		box-sizing: border-box;
	}

	.agreement-view {
		background-color: #FFFFFF;
		overflow: scroll;
		overflow-y: scroll;
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
			margin-bottom: 60rpx;
			line-height: 34rpx;
		}
	}
</style>
