<!-- 我的邀请 -->
<template>
	<view class="invite">
		<!-- 查看详情 -->
		<view class="details" @click="watchDetail">查看详情</view>
		<!-- image text -->
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-text4.png" class="image-text"
			mode="widthFix"></image>
		<!-- 参加人数 -->
		<!-- <view class="flex-center number-box">
			<view class="number">
				已有
				<text>1000+</text>
				用户参与活动
			</view>
		</view> -->
		<!-- 内容 -->
		<view class="content">
			<image :src="qrCodeImg" mode="aspectFit" class="image-code"></image>
			<!-- 规则 -->
			<view class="rule">
				<text class="title">两次分佣机会：</text>
				<view class="message">1、您直接推荐给朋友A，A在平台上下单或接单，您可以得到一笔分佣。</view>
				<view class="message">2、您推荐的朋友A注册了，A再推荐给他的朋友B，B在平台上下单或接单，您还可以得到一笔分佣。</view>
			</view>
			<!-- 分享 -->
			<view class="share flex-center-between">
				<button class="item" open-type="share">
					<image class="image-item"
						src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-wx.png"
						mode="aspectFill"></image>
					<text>分享到微信</text>
				</button>
				<!-- <view class="item flex-1 flex-column-center">
						<image class="image-item" src="../../../static/invite-friend.png" mode="aspectFill"></image>
						<text>分享到朋友圈</text>
					</view> -->
				<view class="item" @click="downloadToAlbum">
					<image class="image-item"
						src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-download.png"
						mode="aspectFill"></image>
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
			this.$tool.actionForLogin();
		},
		onShareAppMessage() {
			const configObj = {
				title: '妥妥弟邀请您',
				path: `/${this.page}?${this.scene}`
			}
			console.log('分享配置2', configObj);
			return configObj;
		},
		methods: {
			// 查询用户小程序二维码
			queryQrcode() {
				console.log(this.$store.state.user);
				const user = this.$store.state.user;
				// 二维码携带参数
				const mapInfo = {
					sourceType: 2,
					shareUserId: user.id,
					shareUserName: user.name,
				};
				this.$http
					.post('/core/contentmapping/add', {
						content: JSON.stringify(mapInfo)
					}, true)
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
					shareUserId: user.id,
					shareUserName: user.name,
				};
				this.$http.post('/core/contentmapping/add', {
					content: JSON.stringify(mapInfo2)
				}, true).then(res => {
					const contentMapId = res.id;
					this.scene = `contentMapId=${contentMapId}`;
				});
			},
			// 下载至相册
			downloadToAlbum() {
				const bgUrl = 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/invite_share_bg.png';
				const param = {
					bgImg:bgUrl,
					picModelList:[
						{
							width:350,
							height:350,
							type:1,
							x:200,
							y:860,
							content:this.qrCodeImg
						}
					]
				}
				
				this.$http.post('/core/upload/composeSharePic',param,true).then(res=>{
					console.log('上传',res);
					this.downloadAndSaveImage(res);
				})
			},
			// 图片 下载并保存到相册
			downloadAndSaveImage(downLoadUrl){
				uni.downloadFile({
					url: downLoadUrl, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
							const tempFilePath = res.tempFilePath;
							uni.saveImageToPhotosAlbum({
								filePath: tempFilePath,
								success: () => {
									this.$tool.showSuccess('已保存至相册，快分享给好友吧！')
								}
							});
						} else {
							this.$tool.showToast('图片获取失败')
						}
					}
				});
			},
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
