<template>
  <view>
    <custom-navbar title="我的优惠券" />

    <back-container>
			<template v-slot:headerSlot>
			  <blue-tab :active-key="activeKey" :list="tabList" @change="change" />
			</template>

      <view class="my-coupon">
        <view class="my-coupon-item" v-for="(item, i) in couponsList" :key="i">
          <coupon-card :minus-type="i" :coupon="item" @useCoupon="useCoupon" />
        </view>

        <list-empty v-if="!couponsList.length" />
      </view>
    </back-container>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import BlueTab from "../addressManage/component/blueTab";
import CouponCard from "./children/couponCard";
import ListEmpty from "../../place-order/orderList/listEmpty";

export default {
  name: "myCoupons",
  components: { ListEmpty, CouponCard, BlueTab, BackContainer },
  data() {
    return {
      activeKey: '0',
      tabList: [
        { text: '未使用', key: '0' },
        { text: '已使用', key: '1' },
        { text: '已过期', key: '3' },
      ],
			couponsList: [],
			isSelect: false,
			minUsePrice: 0,
			orderType: 0,
			state: 0,
    };
  },
	onLoad(option) {
		if (option.isSelect) {
			this.isSelect = option.isSelect == '1';
		}
		if (option.minUsePrice) {
			this.minUsePrice = Number(option.minUsePrice);
		}
		if (option.orderType) {
			this.orderType = Number(option.orderType);
		}
		if (option.state) {
			this.state = Number(option.state);
		}
	},
	onReady() {},
	onShow() {
		this.queryCouponsList();
	},
  methods: {
    change(data) {
      this.activeKey = data;
			this.queryCouponsList();
    },
		queryCouponsList() {
			let params = { state: this.activeKey };
			if (this.isSelect) {
				params = {
					minUsePrice: this.minUsePrice,
					orderType: this.orderType,
					state: this.state,
				};
			}
			this.$http.post('/b/coupon/queryPageList', params, true)
			.then(res => {
			  this.couponsList = res.dataList;
			})
		},
		useCoupon(coupon) {
			if (this.isSelect) {
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.emit('onSelect', coupon);

				uni.navigateBack({});
			} else {
				uni.switchTab({
				    url: '/pages/place-order/index/index'
				});
			}
		}
  }
}
</script>

<style lang="scss" scoped>
.my-coupon {
  .my-coupon-item {
    box-sizing: border-box;
    margin-left: 32rpx;
    border-bottom: 1rpx solid #F6F6F6;
    padding: 32rpx 32rpx 32rpx 0;

    &:nth-last-child(1) {
      border: none;
    }
  }
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
