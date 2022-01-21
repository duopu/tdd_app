<template>
	<view class="offer-head">
		<view class="oh-title">{{ title }}</view>
		<view class="content flex-center-start">
			<view class="oh-text">{{ text }}</view>
			<image v-if="copyText" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/icon/copy.png" class="copy-icon" @click="copyAction"></image>
		</view>
	</view>
</template>
<script>
	export default {
		name: "offerHead",
		props: {
			title: {
				type: String,
				default: '维修'
			},
			text: {
				type: String,
				default: '订单编号：--'
			},
			copyText:{
				type: String,
				default: ''
			}
		},
		methods:{
			copyAction(){
				uni.setClipboardData({
				    data: this.copyText,
				    success:  () => {
				        this.$tool.showSuccess('成功复制到剪贴板')
				    }
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	.offer-head {
		background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);
		width: 750rpx;
		height: 162rpx;
		box-sizing: border-box;
		padding: 32rpx 48rpx;

		.oh-title {
			font-size: 36rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 42rpx;
		}
		
		.content{
			.oh-text {
				font-size: 24rpx;
				margin-top: 12rpx;
				font-family: PingFang SC-Light, PingFang SC;
				font-weight: 300;
				color: rgba(255, 255, 255, 0.6);
				line-height: 32rpx;
			}
			
			.copy-icon{
				width: 40rpx;
				height: 40rpx;
				margin-left: 20rpx;
			}
		}
		
	}
</style>
