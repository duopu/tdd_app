<!--登录-->
<template>
	<view class="page-container flex-column-center">
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/logo.png" mode="aspectFill"
			class="image-logo"></image>
		<text class="invite-text" v-if="inviteInfo.shareUserId">邀请人：{{inviteInfo.shareUserName}}</text>
		<view class="name-view flex">
			<text>姓名： </text>
			<input type="text" v-model="name" placeholder="注册请输入姓名" />
		</view>

		<button class="btn primary" open-type="getPhoneNumber" @getphonenumber="registerAction">微信号码一键注册</button>

		<view class="tip-view">
			<view class="tip-text">
				注册即表示同意<text class="link-text" @click="navAgreement('userAgreement')">《用户协议》</text>和
				<text class="link-text" @click="navAgreement('privacyAgreement')">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../../utils/config.js';

	export default {
		data() {
			return {
				// code
				code: '',
				name: '',
				// 邀请信息
				inviteInfo: {},
				// 协议版本号
				agreementDate: '',
			};
		},
		onReady() {
			uni.getStorage({
				key: config.storageKeys.inviteInfoStorage,
				success: (res) => {
					this.inviteInfo = res.data;
				}
			})
			// 获取code
			this.getAuthCode();

			this.loadAgreementData();
		},
		methods: {
			// 获取code
			getAuthCode() {
				uni.login({
					provider: 'oauth',
					success: res => {
						console.log('获取code', res);
						this.code = res.code;
					},
					fail: () => {
						console.log('faild');
					},
					complete: () => {}
				});
			},
			// 注册操作
			registerAction(data) {
				if (!this.name) {
					this.$tool.showToast('注册操作需要输入姓名')
				} else if (/\d/.test(this.name)) {
					this.$tool.showToast('姓名中不能含有数字')
				} else {
					this.bindgetphonenumber(data)
				}
			},
			// 用户授权手机号的回调
			bindgetphonenumber(data) {
				const info = data.detail;
				console.log('ad', info);
				const param = {
					appId: config.appId,
					code: this.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					loginName: this.name,
					userType: 1,
					...this.inviteInfo,
				};
				this.$http.post('/core/grant/miniPhone', param, true).then(res => {
					const user = {
						...res.user,
						token: res.token
					}
					this.$tool.login(user)
					this.$tool.showToast('注册成功', () => {
						uni.navigateBack({})
					})

					// 更新协议版本号
					uni.setStorageSync(config.storageKeys.agreementVersionStorage, this.agreementDate)
				}).catch(err => {
					this.$tool.showToast('注册错误，请重试一次')
					this.getAuthCode();
				});
			},
			loadAgreementData(localVersion) {
				this.$http.get('/core/softconf/agreement').then(res => {
					this.agreementDate = res.date;
				})
			},
			// 去协议页面
			navAgreement(type) {
				uni.navigateTo({
					url: `/pages/home/agreement/agreement?type=${type}`
				})
			},
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
