<!-- 我的邀请 -->
<template>
	<view class="invite">
		<!-- 查看详情 -->
		<view class="details" @click="watchDetail">查看详情</view>
		<!-- image text -->
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-text.png" class="image-text" mode="widthFix"></image>
		<!-- 参加人数 -->
		<view class="flex-center number-box">
			<view class="number">
				已有
				<text>1000+</text>
				用户参与活动
			</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<image :src="qrCodeImg" mode="aspectFill" class="image-code"></image>
			<!-- 规则 -->
			<view class="rule">
				<text class="title">活动规则：</text>
				<view class="message">邀请新人扫码注册妥妥弟，将获得1000积分。并且邀请新用户将成为你的分销下级，您将享受他5%的收益。</view>
			</view>
			<!-- 分享 -->
			<view class="share flex-center-between">
				<button class="item" open-type="share">
					<image class="image-item" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-wx.png" mode="aspectFill"></image>
					<text>分享到微信</text>
				</button>
				<!-- <view class="item flex-1 flex-column-center">
						<image class="image-item" src="../../../static/invite-friend.png" mode="aspectFill"></image>
						<text>分享到朋友圈</text>
					</view> -->
				<view class="item" @click="downloadToAlbum">
					<image class="image-item" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-download.png" mode="aspectFill"></image>
					<text>下载至相册</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import config from '../../../utils/config.js';

export default {
	data() {
		return {
			qrCodeImg: '',
			title: '',
			page: 'pages/home/index/index',
			scene: ''
		};
	},
	onReady() {
		this.queryQrcode();
	},
	onShareAppMessage() {
		console.log('分享配置', `${this.page}?${this.scene}`);
		return {
			title: '妥妥弟邀请您',
			page: `${this.page}?${this.scene}`,
			imageUrl: ''
		};
	},
	methods: {
		// 查询用户小程序二维码
		queryQrcode() {
			console.log(this.$store.state.user.id);
			const userId = this.$store.state.user.id;
			// 二维码携带参数
			const mapInfo = {
				sourceType: 2,
				shareUserId: userId
			};
			this.$http
				.post('/core/contentmapping/add', { content: JSON.stringify(mapInfo) }, true)
				.then(res => {
					const contentMapId = res.id;
					const param = {
						appId: config.appId,
						page: this.page,
						scene: `contentMapId=${contentMapId}`
					};
					return this.$http.post('/crm/wechatminiwxa/getWxaCodeUnlimit', param, true);
				})
				.then(res => {
					this.qrCodeImg = res.miniUrl;
				});

			// 小程序分享携带参数
			const mapInfo2 = {
				sourceType: 3,
				shareUserId: userId
			};
			this.$http.post('/core/contentmapping/add', { content: JSON.stringify(mapInfo2) }, true).then(res => {
				const contentMapId = res.id;
				this.scene = `contentMapId=${contentMapId}`;
			});
		},
		// 下载至相册
		downloadToAlbum() {},
		// 查看邀请详情
		watchDetail() {
			uni.navigateTo({
				url: '/pages/mine/distribute/distribute'
			});
		}
	}
};
</script>

<style lang="scss" src="./style.scss" lang="scss"></style>
