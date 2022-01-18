<!--登录-->
<template>
	<view class="page-container flex-column-center">
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/logo.png" mode="aspectFill"
			class="image-logo"></image>

		<view class="name-view flex">
			<text class="label-text">手机号： </text>
			<input type="text" v-model="phone" :disabled="true" placeholder="请输入手机号" />
		</view>
		<view class="name-view flex">
			<text class="label-text">新密码： </text>
			<input type="text" v-model="loginPassword" placeholder="请输入新登录密码" />
		</view>

		<button class="btn primary" @click="resetAction">设置</button>

		<!-- <view class="tip-view">
			<view class="tip-text">
				登录即表示同意<text class="link-text" v-for="(item,index) in agreementList"
					@click="navAgreement(item.title)">《{{item.title}}》</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import config from '../../../utils/config.js';

	export default {
		data() {
			return {
				// code
				phone: this.$store.state.user.phone,
				// 密码
				loginPassword: '',
				// 协议版本号
				agreementDate: '',
				agreementList: []
			};
		},
		onReady() {
			// this.loadAgreementData();
		},
		methods: {
			
			// 注册操作
			resetAction() {
				 if (!this.loginPassword) {
					this.$tool.showToast('请输入新登录密码')
				} else if (this.loginPassword.length < 6) {
					this.$tool.showToast('密码不能少于6位')
				}  else {
					this.loginTodo()
				}
			},
			// 用户授权手机号的回调
			loginTodo() {
				const param = {
					newLoginPassword:this.$tool.encrypPwd(this.loginPassword),
				}
				this.$http.post('/b/customer/updateLoginPassword',param,true).then(res=>{
					this.$store.dispatch('queryUserInfo');
					this.$tool.showToast('设置成功', () => {
						uni.navigateBack({})
					})
				})
			},
			loadAgreementData(localVersion) {
				this.$http.get('/core/softconf/agreement2').then(res => {
					this.agreementDate = res.date;
					this.agreementList = res.agreementList;
				})
			},
			// 去协议页面
			navAgreement(title) {
				uni.navigateTo({
					url: `/pages/home/agreement/agreement?title=${title}`
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	.page-container{
		padding-top: 200rpx;
		background-color: #FFFFFF;
		justify-content: flex-start;
	}
	.image-logo{
		width: 400rpx;
		height: 400rpx;
	}
	
	.invite-text{
		color: #333333;
		font-size: 28rpx;
	}
	.name{
		margin-top: 20rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	.name-view{
		flex-direction: row;
		align-items: center;
		margin-top: 60rpx;
		color: #333333;
		font-size: 28rpx;
		width:80%;
		height: 60rpx;
		border-bottom-color: #dcdcdc;
		border-bottom-style: solid;
		border-bottom-width: 2rpx;
		
		.label-text{
			width: 140rpx;
		}
	}
	.btn{
		margin-top: 80rpx;
		width:80%;
		height: 85rpx;
		line-height: 85rpx;
		font-size: 28rpx;
		border-radius: 8rpx;
		&.grey{
			background-color: transparent;
			border: 1rpx solid #dcdcdc;
		}
		&.primary{
			color: #FFFFFF;
			background-color: $uni-color-primary;
		}
		&.green{
			color: #FFFFFF;
			background-color: $uni-color-success;
		}
	}
	.login-result{
		margin: 40rpx 100rpx;
		.describe{
			font-size: 28rpx;
			line-height: 1.8;
			color: #999999;
			text-align: center;
		}
		.btn + .btn{
			margin-left: 40rpx;
		}
	}
	
	.tip-view{
	
		display: flex;
		flex-direction: column;
		align-items: stretch;
		box-sizing: border-box;
		position: relative;
		flex: 1;
		justify-content: flex-end;
		padding-bottom: 40rpx;
		
		.link-text {
			color: $uni-color-primary;
			text-decoration: underline;
		}
	}
</style>
