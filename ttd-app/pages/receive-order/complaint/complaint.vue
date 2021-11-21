<template>
	<view>
		<custom-navbar title="投诉" />

    <back-container>

      <view class="complaint">
        <view class="complaint-text">评价内容：</view>
        <view class="complaint-content">
          可以的话，多少写点！
          方便工作人员快速排队故障。可以的话，多少写点！方便工作人员快速排队故障。
        </view>

        <upload-list upload-text="添加照片" upload-icon="image" :img-list="[1, 2]" />
      </view>

    </back-container>

    <iphonex-bottom>
      <big-btn />
    </iphonex-bottom>

	</view>
</template>
<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
  import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
  import BigBtn from "../../mine/addressManage/component/bigBtn";
  import UploadList from "../component/uploadList";
  export default {
		name: "complaint",
    components: { UploadList, BigBtn, IphonexBottom, BackContainer },
    data() {
			return {
				
			};
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
