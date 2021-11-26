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
      </view>
    </back-container>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import BlueTab from "../addressManage/component/blueTab";
import CouponCard from "./children/couponCard";

export default {
  name: "myCoupons",
  components: { CouponCard, BlueTab, BackContainer },
  data() {
    return {
      activeKey: '0',
      tabList: [
        { text: '未使用', key: '0' },
        { text: '已使用', key: '1' },
        { text: '已过期', key: '3' },
      ],
			couponsList: [],
    };
  },
	onReady() {
		this.queryCouponsList();
	},
  methods: {
    change(data) {
      this.activeKey = data;
			this.queryCouponsList();
    },
		queryCouponsList() {
			this.$http.post('/b/coupon/queryPageList', { state: this.activeKey }, true)
			.then(res => {
			  this.couponsList = res.dataList;
			})
		},
		useCoupon(coupon) {
			// todo: 跳转页面
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
