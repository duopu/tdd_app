<!--登录-->
<template>
	<view class="page-container flex-column-center">
		<image src="../../../static/default/index-demo.png" mode="aspectFill" class="image-logo"></image>
		<text class="name">妥妥地</text>
		<button v-if="isLogin" class="btn primary" @click="onLogin">微信号码一键登录</button>
		<!-- 登录结果 -->
		<view v-else class="login-result">
			<view class="describe">登录成功，您还没有注册师傅资质。快去接单吧！</view>
			<view class="flex-center btn-group">
				<button class="btn grey" @click="onBack">返回</button>
				<button class="btn primary" @click="onRegister">去注册</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLogin: true
		};
	},
	methods: {
		// 微信授权登录
		onLogin() {
			this.isLogin = false;
		},
		// 返回
		onBack() {},
		// 去注册
		onRegister() {
			this.isLogin = true;
		}
	}
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
