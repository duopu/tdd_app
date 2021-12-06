<template>
  <view class="address-item" @click="$emit('onClick', address)">
    <name-header :style="{margin: '32rpx 20rpx 32rpx 32rpx'}" :text="address.name.split(0, 1)" />
    <view class="item-right">
      <view class="item-right1">
        <view class="item-right1-1">
          <view class="item-default" v-if="address.defaultFlag == 1" >默认</view>
          <view class="item-right1-12">{{  address.name }}</view>
          <view class="item-right1-13">{{ address.phone }}</view>
        </view>
        <view class="item-right1-2">{{ address.province + address.city + address.district + address.address}}</view>
      </view>
      <image class="item-right3" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconEditGray.svg" hover-stop-propagation @click="$emit('rightClick', address.id)" />
      <right-img-icon />
    </view>
  </view>
</template>
<script>
import NameHeader from "./nameHeader";
import RightImgIcon from "./rightImgIcon";

export default {
  name: "addressItem",
  components: { RightImgIcon, NameHeader },
	props: {
		address: {
			address: '',
			city: '',
			cityId: 0,
			customerId: '',
			defaultFlag: 0,
			district: '',
			districtId: 0,
			id: 0,
			latitude: 0,
			longitude: 0,
			name: '',
			phone: '',
			province: '',
			provinceId: 0,
		}
	}
}
</script>
<style scoped lang="scss">
.address-item {
  width: 750rpx;
  min-height: 160rpx;
  box-sizing: border-box;
  display: flex;

  .item-right {
    flex: 1;
    box-sizing: border-box;
    padding: 32rpx 32rpx 32rpx 0;
    border-top: 1rpx solid #EBEDF0;
    display: flex;
    align-items: center;

    .item-right1 {
      flex: 1;

      .item-right1-1 {
        display: flex;

        .item-default {
          width: 64rpx;
          height: 32rpx;
          background: #FF9500;
          text-align: center;
          border-radius: 8rpx;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 32rpx;
        }

        .item-right1-12 {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
          padding: 0 16rpx;
        }

        .item-right1-13 {
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
          line-height: 36rpx;
        }
      }

      .item-right1-2 {
        margin-top: 16rpx;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 32rpx;
      }
    }

    .item-right3 {
      padding: 0 15rpx;
      width: 48rpx;
      height: 48rpx;
    }
  }
}
</style>
