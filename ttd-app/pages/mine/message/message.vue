<template>
  <view>
    <custom-navbar title="消息" />

    <back-container>

      <view class="message">
        <view class="m-item" v-for="(message, index) in messageList" :key="index" @click="toDtl(message)">
          <view class="mli-left">
            <view class="mli-left1">
              <view :class="['mli-left3', message.readFlag === 1 ? 'mli-left3-ac' : '']">{{ message.readFlag === 1 ? '已读' : '未读' }}</view>
              <view class="mli-left4">{{ message.title }}</view>
            </view>
            <view class="mli-left2">{{ message.addTime }}</view>
          </view>
          <uni-icons type="arrowright" size="20" color="#969799" />
        </view>

        <list-empty v-if="messageList.length == 0" />
      </view>
    </back-container>

  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import ListEmpty from "../../place-order/orderList/listEmpty";

export default {
  name: "message",
  components: { ListEmpty, BackContainer },
  data() {
    return {
			messageList: [],
		};
  },
	onShow() {
		this.queryMessageList()
	},
  methods: {
		queryMessageList() {
			this.$http.post('/core/sitemessage/queryPageList', {
				pageSize: 100,
				sortInfos: [{
					field: 'addTime',
					sort: 'desc',
				}]
			}, true)
				.then(res => {
					this.messageList = res.dataList || [];
				})
		},
    toDtl(message) {
      uni.navigateTo({ url: `/pages/mine/messageDetail/messageDetail?id=${message.id}` })
    }
  }
}
</script>
<style lang="scss" scoped>
.message {
  background-color: #ECEDF9;

  .m-item {
    display: flex;
    align-items: center;
    padding: 32rpx;
    background-color: white;
    margin-bottom: 32rpx;

    .mli-left {
      padding-right: 32rpx;
      flex: 1;

      .mli-left1 {
        display: flex;

        .mli-left3 {
          flex-shrink: 0;
          height: 40rpx;
          background: #34C759;
          border-radius: 8rpx;
          padding: 0 12rpx;
          @include flexCenter;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          margin-right: 16rpx;
        }

        .mli-left3-ac {
          background: #BDBDBD;
          color: #FFFFFF;
        }

        .mli-left4 {
          flex: 1;
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }

      .mli-left2 {
        margin-top: 16rpx;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 36rpx;
      }
    }
  }
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
