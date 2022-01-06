<!--登录-->
<template>
	<view class="page-container flex-column-center">
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/logo.png" mode="aspectFill"
			class="image-logo"></image>

		<button class="btn green" @click="loginAction">微信一键登录</button>

		<button class="btn primary" @click="onRegister">注册</button>

		<view class="tip-view">
			<view class="tip-text">
				登录即表示同意<text class="link-text" @click="navAgreement('userAgreement')">《用户协议》</text>和
				<text class="link-text" @click="navAgreement('privacyAgreement')">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../../utils/config.js';

	export default {
		data() {
			return {
				code: '',
				// 协议版本号
				agreementDate: '',
			};
		},
		onReady() {
			this.loadAgreementData();
		},
		methods: {
			// 登录操作
			loginAction() {
				uni.login({
					provider: 'oauth',
					success: res => {
						const code = res.code;
						const param = {
							appId: config.appId,
							code
						};
						this.$http.post('/core/grant/miniPhone', param, true).then(res => {
							const user = {
								...res.user,
								token: res.token
							}
							this.$tool.login(user)
							this.$tool.showToast('登录成功', () => {
								uni.navigateBack({})
								// 更新协议版本号
								uni.setStorageSync(config.storageKeys.agreementVersionStorage,
									this.agreementDate)
							})
						}).catch(err => {
							this.getAuthCode();
						});
					},
					fail: () => {
						console.log('faild');
					},
					complete: () => {}
				});
			},
			loadAgreementData(localVersion) {
				this.$http.get('/core/softconf/agreement').then(res => {
					this.agreementDate = res.date;
				})
			},
			// 去注册页面
			onRegister() {
				uni.redirectTo({
					url: '/pages/main/register/register'
				});
			},
			// 去协议页面
			navAgreement(type) {
				uni.navigateTo({
					url: `/pages/home/agreement/agreement?type=${type}`
				})
			},
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
