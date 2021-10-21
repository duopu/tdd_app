<!-- 我的 -->
<template>
	<view class="page-container">
		<scroll-view class="scroll-content" scroll-y="true">
			<!-- 头部 -->
			<view class="top">
				<image class="image-bg" src="../../../static/mine.png" mode="aspectFill"></image>
				<view class="content flex-1 flex-center-between">
					<image class="avatar-image" src="../../../static/default/index-demo.png" mode="aspectFill"></image>
					<view class="right flex-1">
						<text class="name text-ellipis">可乐要加冰</text>
						<navigator url="" class="flex describe">
							我的积分
							<text class="color-yellow">8888</text>
						</navigator>
					</view>
					<view class="flex-column-center turntable">
						<image src="../../../static/turntable.png" mode="aspectFill" class="image-turntable"></image>
						<view class="text">
							剩余抽奖次数
							<text class="color-red">2</text>
							次
						</view>
					</view>
				</view>
			</view>
			<view class="white padding">
				<!-- 签到 -->
				<view class="flex-center menu">
					<view class="item first flex-1 flex-column-center">
						<image src="../../../static/default/index-demo.png" class="image-item"></image>
						<text class="text text-ellipis">签到打卡</text>
					</view>
					<view class="item second flex-1 flex-column-center">
						<image src="../../../static/default/index-demo.png" class="image-item"></image>
						<text class="text text-ellipis">我的优惠券</text>
					</view>
					<view class="item three flex-1 flex-column-center">
						<image src="../../../static/default/index-demo.png" class="image-item"></image>
						<text class="text text-ellipis">我的钱包</text>
					</view>
				</view>
				<!-- 广告位 -->
				<image class="advertise-image" src="../../../static/default/advertise.png" mode="aspectFill"></image>
			</view>
			<!-- 承接方 -->
			<view class="white">
				<view class="lists-item flex-center-between">
					<image src="" mode="aspectFill" class="icon-image"></image>
					<text class="flex-1">积分商城</text>
					<uni-icons type="forward" class="icon-arrow" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<image src="" mode="aspectFill" class="icon-image"></image>
					<text class="flex-1">我的服务地址</text>
					<uni-icons type="forward" class="icon-arrow" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<image src="" mode="aspectFill" class="icon-image"></image>
					<text class="flex-1">实名认证</text>
					<uni-icons type="forward" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<image src="" mode="aspectFill" class="icon-image"></image>
					<text class="flex-1">我的银行卡</text>
					<uni-icons type="forward" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<image src="" mode="aspectFill" class="icon-image"></image>
					<text class="flex-1">发票信息</text>
					<uni-icons type="forward" color="#9D9D9D"></uni-icons>
				</view>
			</view>
			<!-- 帮助中心 -->
			<view class="white">
				<view class="lists-item flex-center-between">
					<text class="flex-1">帮助中心</text>
					<uni-icons type="forward" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<text class="flex-1">联系我们</text>
					<uni-icons type="forward" color="#9D9D9D"></uni-icons>
				</view>
				<view class="lists-item flex-center-between">
					<text class="flex-1">关于</text>
					<uni-icons type="forward" color="#9D9D9D"></uni-icons>
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
		this.$tool.actionForLogin();
	}
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
