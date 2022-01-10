<template>
  <view>
    <custom-navbar title="我的优惠券" />

    <back-container>
			
			<template v-slot:headerSlot>
			  <blue-tab :active-key="activeKey" :list="tabList" @change="change" />
			</template>

      <view class="my-coupon">
        <view class="my-coupon-item" v-for="(item, i) in couponsList" :key="i">
          <coupon-card 
					:coupon="item" 
					@useCoupon="useCoupon"
					:minus-type="couponType(item)"
					/>
        </view>

        <list-empty v-if="!couponsList.length" />
      </view>
    </back-container>
		
		<iphonex-bottom v-if="isSelect">
		  <big-btn button-text="确定" @click="toSelect"/>
		</iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import BlueTab from "../addressManage/component/blueTab";
import CouponCard from "./children/couponCard";
import ListEmpty from "../../place-order/orderList/listEmpty";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BigBtn from "../addressManage/component/bigBtn";

export default {
  name: "myCoupons",
  components: { ListEmpty, CouponCard, BlueTab, BackContainer, BigBtn, IphonexBottom },
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
			selectList: [],
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
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.on('selectCoupon', (coupon) => {
			if (coupon.id) {
				this.selectList = [coupon];
			}
		});
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
			const params = { 
				minUsePrice: this.isSelect ? this.minUsePrice : undefined,
				orderType: this.isSelect ? this.orderType : undefined,
				state: this.isSelect ? this.state : this.activeKey, 
			  pageSize: 100,
				sortInfos: [{
					field: 'parvalue',
					sort: 'desc',
				}]
			};
			this.$http.post('/b/coupon/queryPageList', params, true)
			.then(res => {
			  this.couponsList = res.dataList;
			})
		},
		couponType(coupon) {
			if (!this.isSelect) {
				return 1;
			} else {
				const index = this.selectList.findIndex((c)  => c.id == coupon.id);
				return index == -1 ? 2 : 3;
			}
		},
		useCoupon(coupon) {
			if (this.isSelect) {
				this.checkSelect(coupon);
			} else {
				uni.switchTab({
				    url: '/pages/place-order/index/index'
				});
			}
		},
		checkSelect(coupon) {
			const index = this.selectList.findIndex((c)  => c.id == coupon.id);
			if (index != -1) {
				this.selectList = [];
			} else {
				this.selectList = [coupon];
			}
		},
		toSelect() {
			const coupon = this.selectList[0];
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('onSelect', coupon ? coupon : {});
			
			uni.navigateBack({});
		},
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
