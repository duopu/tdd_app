<template>
	<view class="header">
		<view class="order-dtl-1">
		  <view class="order-dtl-12">
		    <text v-if="order.state >= 30 && order.state != 90">订单金额：</text>
		
		    <my-price v-if="order.state >= 30 && order.state != 90" :scale="0.9" :price="isPlaceOrder ? (order.payAmount / 100) : (order.quoteAmount / 100)" />
		  </view>
		  <view 
			 class="order-dtl-11"
			 :class="{
          'order-state-yellow': [20, 30, 40].includes(order.state),
          'order-state-green': [50].includes(order.state),
          'order-state-red': [90].includes(order.state),
        }">{{ $tool.orderState(order.state) }}</view>
		</view>
		<view class="offer-2">
		  <view class="offer-21">联系人：{{ order.orderAddress.name }} {{ order.state >= 30 && order.state != 90 ? order.orderAddress.phone : '' }}</view>
		  <view class="offer-21">报价周期：{{ (order.quotationStart || '').slice(0, 10) }}{{ order.quotationStart ? ' 至 ' : ''}}{{ (order.quotationEnd || '').slice(0, 10) }}</view>
		  <view class="offer-21">工作周期：{{ (order.workStart || '').slice(0, 10) }} 至 {{ (order.workEnd || '').slice(0, 10) }}</view>
		  <view class="offer-21">工作地址：{{ order.orderAddress.province }} {{ order.orderAddress.city }} {{ order.orderAddress.district }} {{ order.orderAddress.address }}</view>
		  <view class="offer-21">工作内容：{{ order.detail }}</view>
		  <view v-if="showIntegral" class="offer-21">积分抵扣：¥{{ integralAmout / 100 }}</view>
		  <view v-if="showCoupon" class="offer-21">优惠券：{{ couponName }}</view>
		  <view v-if="order.remark" class="offer-21">备注：{{ order.remark }}</view>
		</view>
	</view>
</template>
<script>
import MyPrice from "./myPrice.vue";
	
export default {
  name: "quotedIten",
	components: { MyPrice },
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
			orderOfferList: [],
		},
		isPlaceOrder: {
		  type: Boolean,
		  default: true,
		},
		showPrice: {
		  type: Boolean,
		  default: true,
		},
	},
	computed: {
		showIntegral() {
			const integral = (this.order.orderOfferList || []).find((o) => o.offerType == 2);
			return this.isPlaceOrder && (integral != undefined);
		},
		integralAmout() {
			const integral = (this.order.orderOfferList || []).find((o) => o.offerType == 2);
			return integral ? integral.offerAmount : 0
		},
		showCoupon() {
			const coupon = (this.order.orderOfferList || []).find((o) => o.offerType == 1);
			return this.isPlaceOrder && (coupon != undefined);
		},
		couponName() {
			const coupon = (this.order.orderOfferList || []).find((o) => o.offerType == 1);
			return coupon ? coupon.offerName : '';
		},
	},
}
</script>
<style scoped lang="scss">
.header {
	.order-dtl-1 {
		@include flexBetween;
		height: 96rpx;
		background-color: white;
		padding: 24rpx 32rpx;
		box-sizing: border-box;
				
		.order-dtl-12 {
		  display: flex;
		  align-items: center;
		  font-size: 28rpx;
		  font-family: PingFang SC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #969799;
		  line-height: 36rpx;
		}
				
		.order-dtl-11 {
		  width: 116rpx;
		  height: 48rpx;
		  background: #5AC8FA;
		  border-radius: 8rpx;
		  font-size: 28rpx;
		  font-family: PingFang SC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #FFFFFF;
		  @include flexCenter;
		}
		.order-state-yellow {
		  background-color: #FF9500;
		}
		
		.order-state-green {
		  background-color: #34C759;
		}
		
		.order-state-red {
		  background-color: #FF3B30;
		}
	}
	
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
}
</style>
