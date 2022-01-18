<script>
	import config from './utils/config.js';

	export default {
		// 全局数据对象
		globalData: {},
		onLaunch: function() {
			uni.getStorage({
				key: config.storageKeys.loginUserKey,
				success: res => {
					const user = res.data;
					console.log('从本地缓存取出用户数据', user);
					this.$store.commit('setUser', user)
					this.$store.dispatch('queryUserInfo')
					
					// 检查是否设置密码
					if(!user.pswSetFlag){
						uni.showModal({
							title:'提示',
							content:'您尚未设置密码，设置密码之后您可以使用手机号、密码登录',
							confirmText:'去设置',
							cancelText:'取消',
							success: (res) => {
								if(res.confirm){
									uni.navigateTo({
										url:'/pages/mine/reset-pwd/reset-pwd'
									})
								}
							}
						})
					}
				}
			});

			// ios端音频不能在静音下播放处理
			let music = wx.setInnerAudioOption({
				obeyMuteSwitch: false,
				success: (res) => {
					console.log("开启静音模式下播放音乐的功能", res);
				},
				fail: (err) => {
					console.log("静音设置失败", err);
				},
			});
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	html,
	body {
		overflow: hidden;
	}

	page {
		height: 100%;
		font-size: 26rpx;
		font-family: system-ui, -apple-system;
		color: #333333;
		background-color: #f6f6f6;
		overflow: hidden;
	}

	// 滚动
	.page-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
	}

	.dlFlex {
		display: flex;
		box-sizing: border-box;
		position: relative;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
	}

	// flex
	.flex {
		display: flex;

		&-center {
			@extend .flex;
			justify-content: center;
			align-items: center;
		}

		&-between {
			@extend .flex;
			justify-content: space-between;
		}

		&-center-start {
			@extend .flex;
			align-items: center;
		}

		&-center-between {
			@extend .flex;
			align-items: center;
			justify-content: space-between;
		}

		&-column-center {
			@extend .flex-center;
			flex-direction: column;
		}
	}

	.flex-1 {
		flex: 1;
	}

	.row {
		flex-direction: row;
	}

	.column {
		flex-direction: column;
	}

	.align-center {
		align-items: center;
	}

	.align-end {
		align-items: flex-end;
	}

	.justify-center {
		justify-content: center;
	}

	.justify-end {
		justify-content: flex-end;
	}

	.m-top-16 {
		margin-top: 16rpx;
	}

	// 文本省略
	.text-ellipis {
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	::-webkit-scrollbar {
		display: none;
	}

	button {
		font-size: 26rpx;
		height: 85rpx;
		line-height: 85rpx;
		border: 0;
		border-radius: 8rpx;

		&::after {
			content: none;
		}
	}
</style>
