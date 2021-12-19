<template>
  <view>
    <custom-navbar title="消息详情" />

    <back-container>
      <view class="message-detail">
        <view class="m-detail1">{{ message.title }}</view>
        <view class="m-detail2">{{ message.addTime }}</view>
        <view class="m-detail3">{{ message.content }}</view>
      </view>
    </back-container>
  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";

export default {
  name: "messageDetail",
  components: { BackContainer },
  data() {
    return {
			id: 0,
			message: {},
		};
  },
	onLoad(option) {
		if (option.id) { // 编辑地址
		  this.id = Number(option.id);
			this.queryMessageInfo();
		}
	},
	methods: {
		queryMessageInfo() {
			this.$http.post('/core/sitemessage/query', { id: this.id }, true)
				.then(res => {
					this.message = res;
				})
		},
	}
}
</script>
<style lang="scss">
.message-detail {
  .m-detail1 {
    margin: 45rpx 32rpx 20rpx 32rpx;
    text-align: center;
    font-size: 36rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #323335;
    line-height: 44rpx;
  }

  .m-detail2 {
    font-size: 24rpx;
    padding-bottom: 32rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 32rpx;
    border-bottom: 1rpx solid #ECEDF9;
    text-align: center;
  }

  .m-detail3 {
    padding: 32rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
    line-height: 48rpx;
  }
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
