<!--登录-->
<template>
	<view class="page-container flex-column-center">
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/logo.png" mode="aspectFill" class="image-logo"></image>
		<text class="invite-text" v-if="inviteInfo.shareUserId">邀请人：{{inviteInfo.shareUserName}}</text>
		<view class="name-view flex">
			<text>姓名： </text>
			<input type="text" v-model="name" placeholder="注册请输入姓名" />
		</view>

		<button class="btn primary" open-type="getPhoneNumber" @getphonenumber="registerAction">微信号码一键注册</button>
	</view>
</template>

<script>
	import config from '../../../utils/config.js';

	export default {
		data() {
			return {
				code: '',
				name: '',
				inviteInfo:{},
			};
		},
		onReady() {
			uni.getStorage({
				key:config.storageKeys.inviteInfoStorage,
				success: (res) => {
					this.inviteInfo = res.data;
				}
			})
			// 获取code
			this.getAuthCode();
		},
		methods: {
			// 获取code
			getAuthCode(){
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
				} else if(/\d/.test(this.name)){
					this.$tool.showToast('姓名中不能含有数字')
				}else{
					this.bindgetphonenumber(data)
				}
			},
			// 用户授权手机号的回调
			bindgetphonenumber(data) {
				const info = data.detail;
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
				}).catch(err => {
					this.$tool.showToast('注册错误，请重试一次')
					this.getAuthCode();
				});
			}
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
