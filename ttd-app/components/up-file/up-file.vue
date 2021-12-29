<template>
	<view class="up-file-view">
		<!-- 一排按钮 -->
		<template v-if="modal == 'select'">
			<view class="btn-view" @click="selectImage">
				<image class="btn-icon"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadImageJia.svg"
					mode="aspectFit"></image>
				<view class="btn-text">添加图片</view>
			</view>
			<view class="btn-view" @click="openCamera">
				<image class="btn-icon"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadImageTake.svg"
					mode="aspectFit"></image>
				<view class="btn-text">添加视频</view>
			</view>
			<view class="btn-view" @click="selectFile">
				<image class="btn-icon"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadPdf.svg"
					mode="aspectFit"></image>
				<view class="btn-text">添加文件</view>
			</view>
			<view v-if="showAudio" class="btn-view" @longpress="handleLongPress" @touchend="handleTouchEnd">
				<image class="btn-icon"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadYuyin.svg"
					mode="aspectFit">
				</image>
				<view class="btn-text">长按语音</view>
			</view>
		</template>

		<!-- 资料展示 -->
		<view class="source-item" v-for="item in value" @click="showItemAction(item)">
			<!-- 图片 -->
			<template v-if="item.resourceType == 1">
				<image :src="item.url" mode="aspectFill" class="source-image"></image>
			</template>
			
			<!-- 音频 -->
			<template v-if="item.resourceType == 2">
				<image class="source-icon"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/icon/audio-icon.png"
					mode="aspectFit">
				</image>
				<text class="source-text">音频</text>
			</template>

			<!-- 文件 -->
			<template v-if="item.resourceType == 3">
				<image class="source-icon"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/icon/file-icon.png"
					mode="aspectFit">
				</image>
				<view class="source-text">文件</view>
			</template>
			
			<!-- 视频 -->
			<template v-if="item.resourceType == 4">
				<video :src="item.url" :control="false" class="source-image" :show-play-btn="true" :show-center-play-btn="false"></video>
			</template>

			<uni-icons class="clear-icon" v-if="modal == 'select'" type="clear" :size="24" color="#ff0000" @click="deleteItem(item)"></uni-icons>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext({});

	import dayjs from 'dayjs';

	export default {
		name: "up-file",
		props: {
			modal: {
				type: String,
				default: 'select' // 模式  select:选择文件   show:展示模式
			},
			value: {
				type: Array, // {	resourceType: 1, // 资源类型 1、图片 4：视频 2、语音 3、文件    url: ''  }
				default: () => []
			},
			showAudio: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {};
		},
		mounted() {
			recorderManager.onStart(() => {
				this.startUnix = dayjs().unix();
			})
			recorderManager.onStop((res) => {
				const duration = dayjs().unix() - this.startUnix;
				this.startUnix = 0;
				console.log('recorder 结束', res, duration)

				if (duration < 1) {
					this.$tool.showToast('录音时间太短')
				} else {
					// 发送语音消息
					const file = res.tempFilePath;
					console.log('语音', file);
					this.uploadFile(file, 2)
				}
			})
		},
		methods: {
			// 获取url中的文件名
			getUrlFileName(url) {
				const dirList = url.split('/')
				const name = dirList[dirList.length - 1]
				return name
			},
			// 图片
			selectImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'],
					success: (res) => {
						const path = res.tempFilePaths[0];
						this.uploadFile(path, 1);
					}
				});
			},
			// 视频
			openCamera() {
				uni.chooseVideo({
					maxDuration: 60,
					success: (res) => {
						console.log('视频选择',res);
						const path = res.tempFilePath;
						this.uploadFile(path, 4);
					}
				});
			},
			// 文件
			selectFile() {
				wx.chooseMessageFile({
					count: 1,
					success: (res) => {
						console.log('文件', res);
						const path = res.tempFiles[0].path;
						this.uploadFile(path, 3);
					}
				})
			},

			// 长按录音，监听在页面最外层div，如果是放在button的话，手指上划离开button后获取距离变化有bug
			handleLongPress(e) {
				console.log('语音开始');
				uni.showLoading({
					title: '录音中...'
				})
				recorderManager.start({
					format: 'mp3'
				})
			},
			// 手指离开页面滑动
			handleTouchEnd() {
				console.log('handleTouchEnd 结束');
				uni.hideLoading()
				recorderManager.stop()
			},
			// 上传文件
			uploadFile(path, resourceType) {
				const param = {
					path
				}
				this.$http.upload(param, true).then(url => {
					const resource = {
						resourceType,
						url
					}
					this.commitSourceList([...this.value, resource])
				});
			},
			// 删除文件
			deleteItem(item) {
				const newResourceList = this.resourceList.filter(f => f.url !== item.url)
				this.commitSourceList(newResourceList)
			},
			// 响应文件变化
			commitSourceList(newResourceList) {
				this.$emit('input', newResourceList)
			},
			showItemAction(item) {

				if (item.resourceType == 1) { // 图片
					// 预览图片
					console.log('ff', item);
					uni.previewImage({
						urls: [item.url],
					});
				} else if (item.resourceType == 2) { // 语音
					innerAudioContext.src = item.url;
					innerAudioContext.onPlay(() => {
						console.log('开始播放2',item.url);
					});
					innerAudioContext.onError((res) => {
						console.log(res.errMsg);
						console.log(res.errCode);
					});
					innerAudioContext.play();
				} else if (item.resourceType == 3) { // 文件

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		box-sizing: border-box;
		position: relative;
	}

	.up-file-view {
		padding: 16rpx;
		flex-direction: row;
		flex-wrap: wrap;

		.btn-view {
			width: 128rpx;
			height: 128rpx;
			border-radius: 4rpx;
			border: 2rpx solid #EDEDED;
			justify-content: center;
			align-items: center;
			margin: 16rpx;
			overflow: hidden;

			.btn-icon {
				width: 48rpx;
				height: 48rpx;
			}

			.btn-text {
				color: #828282;
				font-size: 24rpx;
				margin-top: 8rpx;
			}
		}

		.source-item {
			width: 128rpx;
			height: 128rpx;
			border-radius: 4rpx;
			border: 2rpx solid #EDEDED;
			justify-content: flex-end;
			margin: 16rpx;
			align-items: center;

			.source-image {
				width: 128rpx;
				height: 128rpx;
			}

			.source-icon {
				width: 48rpx;
				height: 48rpx;
				margin-bottom: 16rpx;
			}

			.source-text {
				background-color: #3340A0;
				width: 128rpx;
				height: 40rpx;
				color: #FFFFFF;
				font-size: 20rpx;
				line-height: 40rpx;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.clear-icon {
				position: absolute;
				padding: 5rpx;
				top: -20rpx;
				right: -20rpx;
			}
		}
	}
</style>
