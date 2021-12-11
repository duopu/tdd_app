<template>
  <view>

    <custom-navbar title="发单" />

    <back-container>
      <template #headerSlot>
        <offer-head title="维修" text="订单编号：924795438953234324" />
      </template>

      <view class="order-fini">
        <view class="order-fini-1">
          <view class="order-fini-12">
            <text>订单金额：</text>
            <my-price :scale="0.9" price="8000.00" />
          </view>
          <view class="order-fini-11">已完成</view>
        </view>

        <quoted-iten :order="order"/>
				
      </view>
    </back-container>

    <view class="order-fini-5">
      <view class="fini-51">
        <text class="fini-51l">订单金额</text>
        <view class="fini-51r">
          <my-price show-yang :price="order.payAmount / 100" scale="1" />
        </view>
      </view>

      <view class="fini-51" @click="toSelectCoupon">
        <text class="fini-51l">优惠券</text>
        <text class="fini-51m">{{ couponName || '请选择' }}</text>
        <uni-icons type="arrowright" size="17" color="#969799" />
      </view>

      <view class="fini-51">
        <text class="fini-51l">
          积分（
          <text class="fini-51l-red">{{ integralBalance }}</text>
          ）
        </text>
        <text class="fini-51m">{{ integral || '请选择' }}</text>
        <uni-icons type="arrowright" size="17" color="#969799" />
      </view>

      <view class="fini-51" @click="toSelectInvoice">
        <text class="fini-51l">发票抬头</text>
        <text class="fini-51m">{{ invoice.name || '请选择' }}</text>
        <uni-icons type="arrowright" size="17" color="#969799" />
      </view>


      <view class="fini-51">
        <view class="fini-51m">
          <checkd-item label="发票类型" :value="invoiceType" @change="change" />
        </view>
      </view>

    </view>

    <view class="fini-5tips">不同发票类型支付的额外费用不同</view>


    <view class="order-fini-5">
      <view class="fini-51">
        <text class="fini-51l">支付方式</text>
      </view>

      <view  v-for="i in payList" :key="i.wayId" @click="changePayWay(i.wayId)">
				<view v-if="i.show" class="fini-51">
					<image :src="i.picPath" class="bank-img-style" />
					<text class="fini-51l fini-51kl">{{ i.label }}</text>
					<text class="fini-51m" />
					<image v-if="payWay == i.wayId" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/radioSelect.svg" class="circle-filled1" />
					<image v-else src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/radioEmpty.svg" class="circle-filled1" />
				</view>
      </view>

    </view>


    <view class="order-fini-botb" />

    <iphonex-bottom>
      <view class="order-fini-btn-box">
        <text class="order-fini-total-fee">总金额：</text>
        <my-price :price="showPayAmount()" />
        <view class="order-fini-calcel">取消</view>
        <view class="order-fini-sure" @click="createOrder">支付</view>
      </view>
    </iphonex-bottom>
  </view>
</template>
<script>
import config from '../../../utils/config.js';
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../../receive-order/component/offerHead";
import MyPrice from "../../receive-order/component/myPrice";
import QuotedIten from "../../receive-order/component/quotedIten";
import AddRemark from "../../receive-order/component/addRemark";
import OfferContentCard from "../../receive-order/component/offerContentCard";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
import MemberTitle from "../../receive-order/myTeam/memberTitle";
import EvaluateCard from "../../receive-order/myTeam/evaluateCard";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import CheckdItem from "../receiptOrderZy/checkdItem";

export default {
  name: 'orderDetailFinish',
  components: {
    CheckdItem,
    IphonexBottom,
    EvaluateCard,
    MemberTitle,
    UniIcons,
    OfferContentCard,
    AddRemark,
    QuotedIten,
    MyPrice,
    OfferHead,
    BackContainer
  },
  data() {
    return {
			id: '',
			order: {},
			coupon: {},
			couponName: '',
			integral: 0,
			integralBalance: 0,
      invoiceType: 1, // 发票类型 1专票 2普票
			invoice: {},
      payList: [
        { label: '银行支付', leftIcon: 'chat-filled', wayId: 9, show: true, picPath: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/bankCard.svg' },
        { label: '授信支付', leftIcon: 'chat', wayId: 10, show: false, picPath: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/bankPay.svg' },
        { label: '线上支付', leftIcon: 'chatboxes', wayId: 12, show: true, picPath: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/bankUnderline.svg' },
      ],
      payWay: 12,
    };
  },
	onLoad(option) {
		if (option.id) {
			this.id = option.id;
			this.queryOrderInfo();
		}
	},
	onReady() {
		this.queryIntegralInfo();
	},
  methods: {
		queryOrderInfo() {
			this.$http.post('/b/orderreceive/query', { id: this.id }, true)
			.then(res => {
			  this.order = res;
				if ((res.payAmount || 0) > 2000000) {
					this.payList[1].show = true;
				}
			})
		},
		queryIntegralInfo() {
			this.$http.get('/b/integral/query', { }, true)
			.then(res => {
			  this.integralBalance = res.balance;
			})
		},
    change(data) {
      this.invoiceType = data;
    },
    changePayWay(way) {
      this.payWay = way
    },
		showPayAmount() {
			const orderAmount = this.order.payAmount || 0;
			let couponAmount = 0;
			if (this.coupon.couponNature == 3) {
				const discountAmount = orderAmount * this.coupon.discount / 100;
				couponAmount = discountAmount > this.coupon.useMaxPrice ? this.coupon.useMaxPrice : discountAmount;
			} else {
				couponAmount = this.coupon.parvalue || 0;
			}
			// todo: 积分
			const integralAmount = 0;
			
			const totalAmount = (orderAmount - couponAmount - integralAmount) / 100;
			return totalAmount;
		},
		toSelectCoupon() {
			uni.navigateTo({
				url: `/pages/mine/myCoupons/myCoupons?isSelect=1&orderType=${this.order.orderType}&minUsePrice=${this.order.payAmount}&state=0`,
				events: {
					onSelect: (coupon) => {
						this.coupon = coupon;
						if (coupon.couponNature == 3) {
							const discountAmount = (this.order.payAmount || 0) * this.coupon.discount / 100;
							const couponAmount = discountAmount > this.coupon.useMaxPrice ? this.coupon.useMaxPrice : discountAmount;
							this.couponName = `-${couponAmount / 100}`
						} else {
							this.couponName = `-${coupon.parvalue / 100}`;
						}
					}
				}
			})
		},
		toSelectInvoice() {
			uni.navigateTo({
				url: `/pages/mine/chooseLookUp/chooseLookUp`,
				events: {
					onSelect: (invoice) => {
						this.invoice = invoice;
					}
				}
			})
		},
		createOrder() {
			
			if (!this.invoice.id) {
				uni.showToast({ title:  '请选择发票', icon:  'none' });
				return;
			}
			
			const params = {
				couponId: this.coupon.id ? this.coupon.id : undefined,
				customerInvoiceId: this.invoice.id,
				invoiceType: this.invoiceType,
				recivierOrderId: this.id,
				useIntegral: this.integral,
				wayId: this.payWay,
			}
			this.$http.post('/b/order/createOrder', params, true)
			.then(res => {
			  this.payOrder(res.id);
			})
		},
		payOrder(orderId) {
			const user = this.$store.state.user;
			const params = {
				appId: config.appId,
				openId: user.openId,
				orderId: orderId,
				wayId: this.payWay,
			}
			this.$http.post('/core/pay/build4MasterOrder', params, true)
			.then(res => {
			  uni.showToast({
			  	title: '订单支付完成',
					success: () => {
						uni.navigateBack({});
					}
			  })
			})
		}
  }
}
</script>
<style lang="scss" scoped>
.order-fini {
  padding-bottom: 32rpx;

  .order-fini-1 {
    @include flexBetween;
    height: 96rpx;
    background-color: white;
    padding: 24rpx 32rpx;
    box-sizing: border-box;

    .order-fini-12 {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #969799;
      line-height: 36rpx;
    }

    .order-fini-11 {
      width: 116rpx;
      height: 48rpx;
      background: #34C759;
      border-radius: 8rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      @include flexCenter;
    }
  }
}

.order-fini-5 {
  background-color: white;
  margin-top: 32rpx;

  .fini-51 {
    margin-left: 32rpx;
    padding-right: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 88rpx;
    box-sizing: border-box;
    border-bottom: 1rpx solid #EAECEF;

    .fini-51l {
      font-size: 28 prx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;

      .fini-51l-red {
        color: #FF3B30;
      }
    }

    .bank-img-style {
      width: 48rpx;
      height: 48rpx;
    }

    .fini-51kl {
      margin-left: 16rpx;
    }

    .fini-51m {
      flex: 1;
      text-align: right;
      padding-right: 12rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
    }

    .circle-filled1 {
      width: 36rpx;
      height: 36rpx;
      flex-shrink: 0;
    }

    .fini-51r {
      display: flex;
    }
  }
}

.fini-5tips {
  font-size: 24rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #828282;
  line-height: 32rpx;
  padding: 12rpx 32rpx;
}

.order-fini-botb {
  height: 250rpx;
}

.order-fini-btn-box {
  height: 100rpx;
  padding: 0 32rpx;
  display: flex;
  align-items: center;


  .order-fini-total-fee {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
  }

  .order-fini-calcel {
    width: 136rpx;
    @include flexCenter;
    height: 80rpx;
    border-radius: 52rpx;
    border: 2rpx solid #EDEDED;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
    margin-left: auto;
  }

  .order-fini-sure {
    width: 192rpx;
    height: 80rpx;
    background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
    @include flexCenter;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    border-radius: 52rpx;
    color: #FFFFFF;
    margin-left: 32rpx;
  }
}

</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
