<template>
	<uni-popup ref="popup" type="center" :mask-click="false">
		<view class="agreement-view">
			<view class="title">用户协议和隐私</view>
			<view class="wc-label">欢迎您使用妥妥弟！</view>
			<view class="label-view" >
				请充分阅读<text class="link-text" @click="navAgreement('userAgreement')" >《用户协议》</text>和
				<text class="link-text"  @click="navAgreement('privacyAgreement')">《隐私政策》</text>，点击“同意并继续”代表您已经同意前述协议及约定。
			</view>
			<text class="label-view">妥妥弟将严格保守您的个人信息，确保信息安全。您再点击“同意并继续”前，务必审慎阅读，充分理解协议内容</text>

			<view class="bottom-btn">
				<navigator class="out-btn" target="miniProgram" open-type="exit">拒绝并退出</navigator>
				<view class="confirm-btn" @click="confirmClick">同意并继续</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import config from '../../utils/config.js';

	export default {
		name: "agreement-modal",
		data() {
			return {
				agreementDate: ''
			};
		},
		mounted() {
			this.loadAgreementStorage();
			
			uni.$on('refreshAgreementData',()=>{
				this.loadAgreementStorage();
			})
		},
		methods: {
			loadAgreementStorage(){
				if(this.$store.state.user && this.$store.state.user.token){
					uni.getStorage({
						key: config.storageKeys.agreementVersionStorage,
						success: (res) => {
							this.loadAgreementData(res.data)
						},
						fail: (err) => {
							this.loadAgreementData('null')
						}
					})
				} 
			},
			loadAgreementData(localVersion) {
				this.$http.get('/core/softconf/agreement').then(res => {
					this.agreementDate = res.date;
					if (res.date !== localVersion) {
						// 弹框提示
						this.open();
					}else{
						this.close();
					}
				})
			},
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			// 去协议页面
			navAgreement(type){
				uni.navigateTo({
					url:`/pages/home/agreement/agreement?type=${type}`
				})
			},
			confirmClick() {
				uni.setStorage({
					key: config.storageKeys.agreementVersionStorage,
					data: this.agreementDate
				})
				uni.$emit('refreshAgreementData')
				this.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	view,
	navigator {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		box-sizing: border-box;
		position: relative;
	}

	.agreement-view {
		width: 580rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;

		.title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			align-self: center;
			margin-top: 30rpx;
		}

		.wc-label {
			margin-top: 20rpx;
			color: #666666;
			font-size: 24rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
		}

		.label-view {
			flex-direction: row;
			margin-top: 20rpx;
			color: #666666;
			font-size: 28rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			flex-wrap: wrap;
		}

		.link-text {
			color: $uni-color-primary;
			text-decoration: underline;
		}

		.bottom-btn {
			border-top: 2rpx solid #c8c7cc;
			margin-top: 40rpx;
			height: 100rpx;
			flex-direction: row;
			font-size: 32rpx;
			font-weight: bold;

			.out-btn {
				color: $uni-text-color-placeholder;
				flex: 1;
				border-right: 2rpx solid #c8c7cc;
				justify-content: center;
				align-items: center;
			}

			.confirm-btn {
				color: $uni-color-primary;
				flex: 1;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
