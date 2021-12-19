<template>
  <view>
    <custom-navbar title="帮助详情" />

    <back-container>
      <view class="help-detail">
        <view class="h-detail1">{{ detail.title }}</view>
        <view class="h-detail2">{{ detail.addTime || '' }}</view>
        <view class="h-detail3">{{ detail.detail }}</view>

        <view class="h-detail4">
          <upload-list
              hide-upload-btn
              :show-delete="false"
              :img-list="[
                  'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-back.png',
                  'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-back.png',
              ]"
          />
        </view>
      </view>
    </back-container>
  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import UploadList from "../../receive-order/component/uploadList";

export default {
  name: "helpDetail",
  components: { UploadList, BackContainer },
	data() {
	  return {
			id: 0,
			detail: {},
		};
	},
	onLoad(option) {
		if (option.id) { // 编辑地址
		  this.id = Number(option.id);
			this.queryDetail();
		}
	},
	methods: {
		queryDetail() {
			this.$http.post('/core/supportcenter/query', { id: this.id }, true)
				.then(res => {
					this.detail = res;
				})
		},
	}
}
</script>
<style lang="scss">
.help-detail {
  .h-detail1 {
    margin: 45rpx 32rpx 20rpx 32rpx;
    text-align: center;
    font-size: 36rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #323335;
    line-height: 44rpx;
  }

  .h-detail2 {
    font-size: 24rpx;
    padding-bottom: 32rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 32rpx;
    text-align: center;
  }

  .h-detail3 {
    padding: 32rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
    line-height: 48rpx;
    border-top: 1rpx solid #ECEDF9;
    border-bottom: 1rpx solid #ECEDF9;
  }

  .h-detail4 {
    padding: 32rpx 16rpx 16rpx 32rpx;
  }
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
