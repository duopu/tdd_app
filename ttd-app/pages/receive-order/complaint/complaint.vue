<template>
	<view>
		<custom-navbar title="投诉" />

    <back-container>

      <view class="complaint">
        <view class="complaint-text">评价内容：</view>
        <view class="complaint-content">
					<input :value="content" @input="onInput" placeholder="可以的话，多少写点！\n方便工作人员快速排队故障。可以的话，多少写点！方便工作人员快速排队故障。" />
        </view>
				
        <upload-list upload-text="添加照片" :img-list="imageList" @upload="chooseImage"/>
				
         <upload-list upload-icon="2" @upload="chooseFile"/>
      </view>

    </back-container>

    <iphonex-bottom>
      <big-btn  @click="commitComplaint()"/>
    </iphonex-bottom>

	</view>
</template>
<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
	import AddRemark from "../component/addRemark";
  import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
  import BigBtn from "../../mine/addressManage/component/bigBtn";
  import UploadList from "../component/uploadList";
  export default {
		name: "complaint",
    components: { UploadList, BigBtn, IphonexBottom, BackContainer },
    data() {
			return {
				id: '',
				content: '',
				fileList: [],
				imageList: [],
			};
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id;
			}
		},
		methods: {
			onInput(e) {
				this.content = e.target.value;
			},
			chooseImage() {
				uni.chooseImage({
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: (res) => {
								const path = res.tempFilePaths[0];
								this.uploadImage(path, 1);
				    }
				});
			},
			chooseFile() {
				wx.chooseMessageFile({
				  count: 1,
					success: function (res) {
				    const path = res.tempFilePaths[0];
				    this.uploadImage(path, 2);
				  }
				});
			},
			uploadImage(path, type) {
				const param = {
					file: path,
				};
				this.$http.upload({ path }, true)
				.then(res=>{
					if (type == 1) {
						this.imageList.push(res);
					} else {
						this.fileList.push(res);
					}
				});
			},
			commitComplaint() {
				const params = {
					detail: this.content,
					fileList: this.fileList,
					picList: this.imageList,
					receiveOrderId: this.id,
				};
				this.$http.post('/b/ordercomplain/add', params, true)
				.then(res => {
				  uni.showToast({
				  	title: '投诉已提交',
						success: () => {
						uni.navigateBack({});
						},
				  });
				})
			}
		}
	}
</script>
<style lang="scss">
.complaint {
  padding: 40rpx 32rpx 16rpx 32rpx;

  .complaint-text {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
    line-height: 36rpx;
  }
  .complaint-content {
    margin: 16rpx 0 32rpx 0;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    height: 144rpx;
    background: #F3F4F5;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 36rpx;
  }
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
