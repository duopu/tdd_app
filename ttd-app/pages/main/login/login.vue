<!--登录-->
<template>
	<view class="page-container flex-column-center">
		<image src="../../../static/logo.png" mode="aspectFill" class="image-logo"></image>
		<text class="name">妥妥弟</text>
		<template v-if="type == 'login'">
			<view class="name-view flex">
				<text>姓名： </text>
				<input type="text" v-model="name" placeholder="注册请输入姓名" />
			</view>
			
			<button class="btn primary" open-type="getPhoneNumber"
				@getphonenumber="registerAction">微信号码一键注册</button>
				
			<button class="btn green" open-type="getPhoneNumber"
				@getphonenumber="loginAction">微信号码一键登录</button>
				
		</template>

		<!-- 登录结果 -->
		<view v-if="type == 'tip'" class="login-result">
			<view class="describe">登录成功!您还没有注册承接方资质。快去注册吧！</view>
			<view class="flex-center btn-group">
				<button class="btn grey" @click="onBack">返回</button>
				<button class="btn primary" @click="onRegister">注册承接方</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../../utils/config.js';
	
	export default {
		data() {
			return {
				type: 'login',
				code: '',
				name: '',
			};
		},
		onReady() {
			this.getAuthCode();
		},
		methods: {
			getAuthCode() {
				uni.login({
					provider: 'oauth',
					success: res => {
						console.log('oauth', res);
						this.code = res.code;

					},
					fail: () => {
						console.log('faild');
					},
					complete: () => {}
				});
			},
			// 返回
			onBack() {
				uni.navigateBack({})
			},
			// 去注册是否有
			onRegister() {
				uni.redirectTo({
					url: '/pages/main/apply/apply'
				});
			},
			// 登录操作
			loginAction(data){
				this.bindgetphonenumber(data)
			},
			// 注册操作
			registerAction(data){
				if(this.name){
					this.bindgetphonenumber(data)
				}else{
					this.$tool.showToast('注册操作需要输入姓名')
				}
			},
			// 用户授权手机号的回调
			bindgetphonenumber(data) {
				const info = data.detail;
				console.log('用户授权手机号的回调', info);
				const param = {
					appId:config.appId,
					code: this.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					loginName:this.name,
					userType:1,
				};

				this.$http.post('/core/grant/miniPhone', param, true).then(res => {
					const user = {...res.user,token:res.token}
					this.$tool.login(user)
					if(user.masterWorkFlag == false){
						this.type = 'tip'
					}else{
						this.$tool.showToast('登录成功',()=>{
							uni.navigateBack({})
						})
					}
				}).catch(err => {
					this.getAuthCode();
				});
			}
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
