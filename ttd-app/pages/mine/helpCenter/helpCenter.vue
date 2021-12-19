<template>
  <view>
    <custom-navbar title="帮助中心" />

    <back-container>
      <view class="help-center">
        <view class="help-center-item" v-for="(item, i) in dataList" :key="i" @click="toDetail(item)">
          <view class="hc-title">{{ item.title }}</view>
          <view class="hc-text">{{ item.detail }}</view>
          <!-- <view class="hc-img-box">
            <image v-for="i in 3" class="hc-img-item" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-back.png" :key="i" />
          </view> -->
        </view>

        <list-empty v-if="!dataList.length" />
      </view>
    </back-container>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import ListEmpty from "../../place-order/orderList/listEmpty";

export default {
  name: "helpCenter",
  components: { ListEmpty, BackContainer },
  data() {
    return {
			dataList: [],
    };
  },
	onShow() {
		this.queryList();
	},
	methods: {
		queryList() {
			this.$http
				.post('/core/supportcenter/queryPageList', { pageSize: 1000 }, true)
				.then(res => {
					this.dataList = res.dataList;
				});
		},
		toDetail(item) {
			uni.navigateTo({
				url: `/pages/mine/helpDetail/helpDetail?id=${item.id}`,
			})
		}
	}
}
</script>

<style lang="scss">
.help-center {
  background-color: #F6F7F7;

  .help-center-item {
    box-sizing: border-box;
    padding: 32rpx;
    background-color: white;
    margin-bottom: 32rpx;

    .hc-title {
      font-size: 36rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #323335;
      line-height: 44rpx;
    }

    .hc-text {
      font-size: 32rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 48rpx;
      margin: 16rpx 0;
    }

    .hc-img-box {
      display: flex;
      flex-flow: row wrap;

      .hc-img-item {
        flex-shrink: 0;
        width: 128rpx;
        height: 128rpx;
        margin: 0 16rpx 0 0;
      }
    }
  }
}
</style>
<style>
page {
  max-height: 100vh;
  overflow-y: scroll;
}
</style>
