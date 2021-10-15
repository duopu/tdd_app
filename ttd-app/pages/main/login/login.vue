<!--登录-->
<template>
	<view class="page-container flex-column-center">
		<image src="../../../static/logo.png" mode="aspectFill" class="image-logo"></image>
		<text class="name">妥妥弟</text>
		<template v-if="type == 'login'">
			<view class="name-view flex">
				<text>姓名： </text>
				<input type="text" v-model="name" placeholder="请输入姓名" />
			</view>
			<button class="btn primary" open-type="getPhoneNumber"
				@getphonenumber="bindgetphonenumber">微信号码一键登录</button>
		</template>

		<!-- 登录结果 -->
		<view v-if="type == 'tip'" class="login-result">
			<view class="describe">登录成功!您还没有注册师傅资质。快去接单吧！</view>
			<view class="flex-center btn-group">
				<button class="btn grey" @click="onBack">返回</button>
				<button class="btn primary" @click="onRegister">注册师傅</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'login',
				code: '',
				name: '',
			};
		},
		onReady() {
			this.getAuthCode();
		},
		methods: {
			getAuthCode() {
				uni.login({
					provider: 'oauth',
					success: res => {
						console.log('oauth', res);
						this.code = res.code;

					},
					fail: () => {
						console.log('faild');
					},
					complete: () => {}
				});
			},
			// 返回
			onBack() {
				uni.navigateBack({})
			},
			// 去注册
			onRegister() {
				uni.redirectTo({
					url: '/pages/main/apply/apply'
				});
			},
			// 用户授权手机号的回调
			bindgetphonenumber(data) {
				const info = data.detail;
				console.log('用户授权手机号的回调', info);
				this.type = 'tip'
				const param = {
					code: this.code,
					encryptedData: info.encryptedData,
					iv: info.iv
				};

				this.$http.post('/core/grant/miniPhone', param, true).then(res => {
					this.loginHandle(res);
				}).catch(err => {
					this.getAuthCode();
				});
			}
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
