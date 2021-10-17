<!-- 我的 -->
<template>
	<view class="">
		<coming-soon v-if="demo"></coming-soon>

		<scroll-view scroll-y="true" v-else>
			<!-- 头部 -->
			<view class="top">
				<image class="image-bg" src="../../../static/mine.png" mode="aspectFill"></image>
			</view>
			<!-- 承接方 -->
			<view class="white">
				<view class="lists-item flex-center-between">
					<text class="flex-1">我的服务地址</text>
					<uni-icons type="arrow" class="icon-arrow" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<text class="flex-1">实名认证</text>
					<uni-icons type="arrow" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<text class="flex-1">我的邀请</text>
					<uni-icons type="arrow" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<text class="flex-1">修改密码</text>
					<uni-icons type="arrow" color="#9D9D9D"></uni-icons>
				</view>
			</view>
			<!-- 帮助中心 -->
			<view class="white">
				<view class="lists-item flex-center-between">
					<text class="flex-1">帮助中心</text>
					<uni-icons type="arrow" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<text class="flex-1">检查更新</text>
					<uni-icons type="arrow" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<text class="flex-1">关于</text>
					<uni-icons type="arrow" color="#9D9D9D"></uni-icons>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				demo: true
			};
		},
		onReady() {
			this.$tool.actionForLogin()
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
