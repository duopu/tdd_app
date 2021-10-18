<template>
	<view class="empty-view">
		<image v-if="imageUrl" :src="imageUrl" mode="aspectFit" class="image"></image>
		<text v-if="tipText" class="tipText">{{tipText}}</text>
	</view>
</template>

<script>
	export default {
		name:"empty-view",
		props:{
			tipText:{
				type:String,
				default:''
			},
			imgType:{
				type:String,
				default:''
			}
		},
		computed:{
			imageUrl(){
				
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.empty-view{
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		align-items: center;
		margin-top: 100rpx;
		.image{
			width: 400rpx;
			height: 400rpx;
		}
		.tipText{
			margin-left: 100rpx;
			margin-right: 100rpx;
			color: #F0AD4E;
			font-size: 32rpx;
			margin-top: 30rpx;
		}
	}
	
	
</style>
