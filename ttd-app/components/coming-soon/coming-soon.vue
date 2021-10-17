<template>
	<view class="soon">
		<view class="describe" >{{tipText}}</view>
		<view class="flex-center btn-group">
			<button  class="btn primary" v-if="btnText" @click="actionClick">{{btnText}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"coming-soon",
		data() {
			return {
				tipText:'',
				btnText:'',
				navUrl:''
			};
		},
		mounted() {

			this.checkUserState()
		},
		methods:{
			checkUserState(){
				const user = getApp().globalData.user;
				if(!user.token){
					this.tipText = '请先登录';
					this.btnText = '去登录';
					this.navUrl = '/pages/main/login/login'
				}else if(user.masterWorkFlag){
					this.tipText = '功能内侧中，请您稍等；接单方先完善信息，订单快马加鞭向您赶来！';
					this.btnText = '';
				}else{
					this.tipText = '内测中，接单方先请注册完善技能信息';
					this.btnText = '去完善';
					this.navUrl = '/pages/main/apply/apply'
				}
			},
			actionClick(){
				uni.navigateTo({
					url:this.navUrl
				})
			}
		}
	}
</script>

<style lang="scss">
	.soon{
		margin-top: 100rpx;
		align-items: center;
		align-self: center;
	}
	.describe {
		font-size: 28rpx;
		line-height: 1.8;
		color: #999999;
		text-align: center;
	}
	.btn {
		margin-top: 80rpx;
		width: 80%;
		height: 85rpx;
		font-size: 28rpx;
		line-height: 85rpx;
		text-align: center;
		border-radius: 8rpx;
		&.primary {
			color: #ffffff;
			background-color: $uni-color-primary;
		}
	}
</style>
