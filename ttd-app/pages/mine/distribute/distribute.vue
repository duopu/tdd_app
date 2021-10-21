<!-- 我的分销 -->
<template>
	<view class="distribute page-container">
		<image src="../../../static/invite-transparent-image.png" mode="widthFix" class="image-transparent"></image>
		<scroll-view scroll-y="true" class="scroll-content">
			<view class="title">我的邀请人</view>
			<view class="box flex-center-between">
				<image src="../../../static/default/index-demo.png" mode="aspectFill" class="avatar-image"></image>
				<view class="message">
					<text class="name">张达</text>
					<text class="phone">154****4844</text>
				</view>
				<text class="time">10-20 00:03</text>
			</view>
			<view class="title">我邀请了4人</view>
			<view class="box flex-center-between" v-for="(item, index) in ['', '', '', '']" :key="index">
				<text class="name">李连杰</text>
				<text class="phone flex-1">154****4844</text>
				<text class="time">10-20 00:03</text>
			</view>
			<view class="no-more">已经到头了~</view>
		</scroll-view>
		<button class="btn flex-center"><uni-icons size="22" type="scan" class="icon" color="#8C4C31"></uni-icons>扫码绑定邀请人</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style src="./style.scss" scoped lang="scss"></style>
