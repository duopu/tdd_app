<!--登录-->
<template>
	<view class="page-container flex-column-center">
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/logo.png" mode="aspectFill" class="image-logo"></image>

		<button class="btn green" @click="loginAction">微信一键登录</button>

		<button class="btn primary" @click="onRegister">注册</button>
	</view>
</template>

<script>
	import config from '../../../utils/config.js';

	export default {
		data() {
			return {
				code: '',
			};
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
			// 去注册页面
			onRegister() {
				uni.redirectTo({
					url: '/pages/main/register/register'
				});
			}
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
