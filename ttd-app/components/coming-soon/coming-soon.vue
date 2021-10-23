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
		},
		computed:{
			
			userStateDict(){
				const user = this.$store.state.user;
				
				if(!user.token){
					this.tipText = '请先登录';
					this.btnText = '去登录';
					this.navUrl = '/pages/main/login/login'
				}else {
					// 审核状态 -1：未提交，0：待审核，1：审核通过，2：审核失败
					const approveDetail = this.$store.state.approveDetail
					const approveState = approveDetail.approveState;
					
					switch (approveState){
						case -1:
						this.tipText = '内测中，接单方先请注册完善技能信息。';
						this.btnText = '申请成为承接方，去完善';
						this.navUrl = '/pages/main/apply/apply'
						break
						case 0:
						this.tipText = '审核中（一般1至3个工作日）请您等待，谢谢！';
						this.btnText = '';
						break
						case 1:
						this.tipText = '审核通过，你可以开始接单了！如要添加修改已申请信息，可以点修改后再提交';
						this.btnText = '去修改';
						this.navUrl = '/pages/main/apply/apply'
						break
						case 2:
						this.tipText = `审核被退回！有需要您修改的信息，请修改后再提交，谢谢！拒绝理由：${approveDetail.refusalReason}`;
						this.btnText = '去修改';
						this.navUrl = '/pages/main/apply/apply'
						break
					}
				}
				
				if(user.masterWorkFlag){
					this.tipText = '功能内测中，请您稍等；接单方先完善信息，订单快马加鞭向您赶来！';
					this.btnText = '';
				}else{
					
				}
			}
		},
		methods:{
			
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
