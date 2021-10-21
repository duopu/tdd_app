<!-- 我的邀请 -->
<template>
	<scroll-view scroll-y="true" class="invite">
		<image class="invite-bg" src="../../../static/invite-bg.jpg" mode="widthFix"></image>
		<!-- 查看详情 -->
		<view class="details">查看详情</view>
		<!-- image text -->
		<image src="../../../static/invite.png" class="image-text" mode="widthFix"></image>
		<!-- 参加人数 -->
		<view class="flex-center number-box">
			<view class="number">
				已有
				<text>5000+</text>
				用户参与活动
			</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<image class="image-content-bg" src="../../../static/invite-content.png" mode="widthFix"></image>
			<view class="invite-message">
				<image src="../../../static/default/code.png" mode="aspectFill" class="image-code"></image>
				<!-- 规则 -->
				<view class="rule">
					<text class="title">活动规则：</text>
					<view class="message">邀请新人扫码注册妥妥弟，将获得1000积分。并且邀请新用户将成为你的分销下级，您将享受他5%的收益。</view>
				</view>
				<!-- 分享 -->
				<view class="share flex-center-between">
					<view class="item flex-1 flex-column-center">
						<image class="image-item" src="../../../static/invite-wx.png" mode="aspectFill"></image>
						<text>分享到微信</text>
					</view>
					<view class="item flex-1 flex-column-center">
						<image class="image-item" src="../../../static/invite-friend.png" mode="aspectFill"></image>
						<text>分享到朋友圈</text>
					</view>
					<view class="item flex-1 flex-column-center">
						<image class="image-item" src="../../../static/invite-download.png" mode="aspectFill"></image>
						<text>下载至相册</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" src="./style.scss" lang="scss"></style>
