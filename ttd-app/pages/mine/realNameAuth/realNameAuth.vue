<template>
	<view>
		<custom-navbar title="实名认证" />

		<back-container>
			<view class="real-name-auth">
				<view class="rn-top">为了保障平台安全，请使用与资金账户一致的身份证进行注册。提交的资料仅用于实名认证，不会用作其他用途，请放心上传。</view>
				<view class="rn-middle" />
				<view class="rn-end">
					<view class="rn-end-text">身份证人像面</view>
					<view class="rn-end-face" @click="chooseImage(1)">
						<view v-if="faceIdcardImage">
							<image :src="faceIdcardImage" class="rn-end-img" />
						</view>
						<view v-else>
							<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-face.png"
								class="rn-end-img" />
							<view class="take-photo">
								<image :src="takePhotoIcon" class="take-photo-img" />
								<view class="take-photo-text">拍照</view>
							</view>
						</view>
					</view>
					<view class="rn-end-text">身份证国徽面</view>
					<view class="rn-end-face" @click="chooseImage(2)">
						<view v-if="backIdcardImage">
							<image :src="backIdcardImage" class="rn-end-img" />
						</view>
						<view v-else>
							<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-back.png"
								class="rn-end-img" />
							<view class="take-photo">
								<image :src="takePhotoIcon" class="take-photo-img" />
								<view class="take-photo-text">拍照</view>
							</view>
						</view>
					</view>
					
					<view class="rn-end-text">需本人胸部以上免冠照，五官清晰可见</view>
					<view class="rn-sf-rl" @click="facePhoto">
						<image :src="userHeader" class="rn-end-img11" mode="aspectFit" />
						<!--上传后图片的样式  放开判断条件 填充图片链接 即可-->
						<image v-if="faceImage" :src="faceImage" class="rn-sf-rlwww" />
					</view>
				</view>
			</view>

		</back-container>

		<bottom-height />

		<iphonex-bottom v-if="state != 1">
			<big-btn buttonText="提交认证" @click="commitAuth" />
		</iphonex-bottom>
	</view>
</template>

<script>
	import BackContainer from "../addressManage/component/backContainer";
	import IphonexBottom from "../addressManage/component/iphonexBottom";
	import BigBtn from "../addressManage/component/bigBtn";
	import BottomHeight from "./bottomHeight";

	export default {
		name: "realNameAuth",
		components: {
			BottomHeight,
			BigBtn,
			IphonexBottom,
			BackContainer
		},
		data() {
			return {
				takePhotoIcon: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/take-photo-icon.svg',
				userHeader: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/user_header.png',
				faceImage: '',
				faceIdcardImage: '',
				backIdcardImage: '',
				state: 0,
			};
		},
		onReady() {
			this.queryAuthInfo();
		},
		onShow() {},
		methods: {
			queryAuthInfo() {
				this.$http.post('/b/customerrealauth/query', {}, true)
					.then(res => {
						this.faceImage = res.faceImage;
						this.faceIdcardImage = res.faceIdcardImage;
						this.backIdcardImage = res.backIdcardImage;
						this.state = res.state;
					})
			},
			chooseImage(index) {
				uni.chooseImage({
					sourceType: ['camera'],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						const path = res.tempFilePaths[0];
						this.uploadImage(index, path);
					}
				});
			},
			uploadImage(index, path) {
				const param = {
					file: path,
				};
				this.$http.upload({
						path
					}, true)
					.then(res => {
						if (index == 1) {
							this.faceIdcardImage = res;
						} else if (index == 2) {
							this.backIdcardImage = res;
						} else {
							this.faceImage = res;
						}
					});
			},
			facePhoto() {
				uni.chooseImage({
					sourceType: ['camera'],
					crop: {
						width: 300,
						height: 300,
					},
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						const path = res.tempFilePaths[0];
						this.uploadImage(3, path);
					}
				});
			},
			commitAuth() {
				if (!this.faceIdcardImage) {
					uni.showToast({
						title: '请上传身份证人像面',
						icon: 'none'
					});
					return;
				}
				if (!this.backIdcardImage) {
					uni.showToast({
						title: '请上传身份证国辉面',
						icon: 'none'
					});
					return;
				}
				if (!this.faceImage) {
					uni.showToast({
						title: '请上传人像照片',
						icon: 'none'
					});
					return;
				}
				const params = {
					faceImage: this.faceImage,
					faceIdcardImage: this.faceIdcardImage,
					backIdcardImage: this.backIdcardImage,
				}
				uni.showLoading({
					title: '认证提交中...',
					mask: true,
				})
				this.$http.post('/b/customerrealauth/realAuth', params)
					.then(res => {
						this.$store.dispatch('queryAuthenticationInfo');
						this.$store.dispatch('queryUserInfo');
						uni.hideLoading();
						uni.showToast({
							title: '实名认证已成功',
							success: () => {
								uni.navigateBack({});
							}
						});
					}).catch((e) => {
						uni.hideLoading();
						uni.showModal({
							title: '认证失败',
							content: e.message,
							confirmText: '重新认证',
							success: (res) => {
								if (res.confirm) {
									this.faceImage = '';
									this.faceIdcardImage = '';
									this.backIdcardImage = '';
								}
							}
						})
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.real-name-auth {
		padding-bottom: 48rpx;

		.rn-top {
			width: 686rpx;
			height: 160rpx;
			background: #FFFBE8;
			border-radius: 16rpx;
			margin: 16rpx 32rpx 32rpx 32rpx;
			padding: 32rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #323335;
			line-height: 32rpx;
		}

		.rn-middle {
			width: 718rpx;
			height: 1rpx;
			background: #EAECEF;
			margin: 0 16rpx;
		}

		.rn-end {
			.rn-end-text {
				text-align: center;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #323335;
				margin-top: 32rpx;
				margin-bottom: 18rpx;
				line-height: 32rpx;
			}

			.rn-end-face {
				@include flexCenter;
				position: relative;
				width: 480rpx;
				height: 320rpx;
				margin: auto;

				.rn-end-img {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}

				.take-photo {
					position: relative;
					z-index: 2;

					.take-photo-img {
						width: 48rpx;
						height: 48rpx;
					}

					.take-photo-text {
						font-size: 24rpx;
						font-family: PingFang SC-Light, PingFang SC;
						font-weight: 300;
						color: #828282;
						line-height: 32rpx;
					}
				}
			}
		}
	}

	.rn-sf-rl {
		margin: 0 auto;
		width: 236rpx;
		height: 330rpx;
		background: #F3F4F5;
		border-radius: 16rpx;
		position: relative;
		opacity: 0.8;
		@include flexCenter;

		.rn-sf-rlwww {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		.rn-end-img11 {
			width: 236rpx;
			height: 330rpx;
		}
	}
</style>

<style lang="scss">
	@import "../addressManage/_pageStyle.scss";
</style>
