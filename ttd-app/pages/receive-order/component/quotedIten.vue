<template>
  <view class="offer-2">
    <view class="offer-21">联系人：{{ order.orderAddress.name }} {{ order.orderAddress.phone }}</view>
    <view class="offer-21">报价周期：{{ order.quotationStart.slice(0, 10) }} 至 {{ order.quotationEnd.slice(0, 10) }}</view>
    <view class="offer-21">工作周期：{{ order.workStart.slice(0, 10) }} 至 {{ order.workEnd.slice(0, 10) }}</view>
    <view class="offer-21">工作地址：{{ order.orderAddress.province }} {{ order.orderAddress.city }} {{ order.orderAddress.district }} {{ order.orderAddress.address }}</view>
    <view class="offer-21">工作内容：{{ order.detail }}</view>
    <view v-if="order.remark" class="offer-21">备注：{{ order.remark }}</view>
  </view>
</template>
<script>
export default {
  name: "quotedIten",
	props: {
	  order: {
			orderAddress: {
				address: '',
				city: '',
				district: '',
				province: '',
				name: '',
				phone: '',
			},
			detail: '',
			quotationStart: '',
			quotationEnd: '',
			workStart: '',
			workEnd: '',
			remark: '',
		},
	},
}
</script>
<style scoped lang="scss">
.offer-2 {
  margin-left: 32rpx;
  padding: 24rpx 24rpx 24rpx 0;
  border-top: 1rpx solid #EAECEF;
  border-bottom: 1rpx solid #EAECEF;
  .offer-21 {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
    line-height: 52rpx;
  }
}
</style>
