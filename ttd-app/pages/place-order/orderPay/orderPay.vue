<template>
	<view>
		<custom-navbar title="支付订单" />

		<back-container>
			<template #headerSlot>
				<offer-head :title="$tool.orderType(order.orderType)" :text="`订单编号：${order.id}`" />
			</template>

			<view class="order-fini">
				<quoted-iten :order="order" :isPlaceOrder="true" />
			</view>
		</back-container>

		<view class="order-fini-5">
			<view class="fini-51">
				<text class="fini-51l">订单金额(含税)</text>
				<view class="fini-51r">
					<my-price show-yang :price="order.payAmount / 100" scale="1" />
				</view>
			</view>

			<view class="fini-51" @click="toSelectCoupon">
				<text class="fini-51l">优惠券</text>
				<text class="fini-51m">{{ couponName || '请选择' }}</text>
				<uni-icons type="arrowright" size="17" color="#969799" />
			</view>

			<view class="fini-51" @click="$refs.useIntegral.show()">
				<text class="fini-51l">
					积分（
					<text class="fini-51l-red">{{ integral }}</text>
					）
				</text>
				<text class="fini-51m">{{ integral ? `-${integral / 100}`  : '请选择' }}</text>
				<uni-icons type="arrowright" size="17" color="#969799" />
			</view>

			<!-- <view class="fini-51" @click="toSelectInvoice">
        <text class="fini-51l">发票抬头</text>
        <text class="fini-51m">{{ invoice.name || '请选择' }}</text>
        <uni-icons type="arrowright" size="17" color="#969799" />
      </view> -->

			<!-- 已隐藏（发单时已选择发票类型） -->
			<!-- <view class="fini-51">
        <view class="fini-51m">
          <checkd-item label="发票类型" :value="invoiceType" @change="change" />
        </view>
      </view> -->

		</view>

		<view class="fini-5tips">不同发票类型支付的额外费用不同</view>

		<view class="order-fini-5">
			<view class="fini-51">
				<text class="fini-51l">支付方式</text>
			</view>

			<view v-for="i in payList" :key="i.wayId" @click="changePayWay(i.wayId)">
				<view v-if="i.show" class="fini-51">
					<image :src="i.picPath" class="bank-img-style" />
					<text class="fini-51l fini-51kl">{{ i.label }}</text>
					<text class="fini-51m" />
					<image v-if="payWay == i.wayId"
						src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/radioSelect.svg"
						class="circle-filled1" />
					<image v-else src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/radioEmpty.svg"
						class="circle-filled1" />
				</view>
			</view>

		</view>


		<view class="order-fini-botb" />

		<iphonex-bottom>
			<view class="order-fini-btn-box">
				<text class="order-fini-total-fee">总金额(含税)：</text>
				<my-price :price="showPayAmount()" />
				<view class="order-fini-calcel" @click="toCancel">取消</view>
				<view class="order-fini-sure" @click="createOrder">支付</view>
			</view>
		</iphonex-bottom>

		<dakuan-model ref="daLuanModel" :bankCard="bankCard" :orderNo="order.id" />

		<use-integral ref="useIntegral" :integral="integral" :balance="integralBalance" :maxIntegral="integralUseMax"
			@onConfirm="integralChange" />

	</view>
</template>
<script>
	import config from '../../../utils/config.js';
	import BackContainer from "../../mine/addressManage/component/backContainer";
	import OfferHead from "../../receive-order/component/offerHead";
	import MyPrice from "../../receive-order/component/myPrice";
	import QuotedIten from "../../receive-order/component/quotedIten";
	import AddRemark from "../../receive-order/component/addRemark";
	import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
	import MemberTitle from "../../receive-order/myTeam/memberTitle";
	import EvaluateCard from "../../receive-order/myTeam/evaluateCard";
	import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
	import CheckdItem from "../placeOrder/checkdItem";
	import UseIntegral from "./useIntegral";
	import DakuanModel from "./dakuanModel";

	export default {
		name: 'orderDetailFinish',
		components: {
			DakuanModel,
			UseIntegral,
			CheckdItem,
			IphonexBottom,
			EvaluateCard,
			MemberTitle,
			UniIcons,
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
				integralUseMax: 0, // 最多使用积分额度  (百分比)
				integralBalance: 0, // 积分余额
				invoiceType: 1, // 发票类型 1专票 2普票
				invoice: {},
				payList: [{
						label: '银行支付（对公打款）',
						leftIcon: 'chat-filled',
						wayId: 9,
						show: true,
						picPath: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/bankCard.svg'
					},
					{
						label: '授信支付',
						leftIcon: 'chat',
						wayId: 10,
						show: false,
						picPath: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/bankPay.svg'
					},
					{
						label: '微信支付',
						leftIcon: 'chatboxes',
						wayId: 12,
						show: true,
						picPath: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/bankUnderline.svg'
					},
				],
				payWay: 12,
				bankCard: '',
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
				this.$http.post('/b/orderreceive/query', {
						id: this.id
					}, true)
					.then(res => {
						this.order = res;
						if ((res.payAmount || 0) > 2000000) {
							this.payList[1].show = true;
						}
						this.queryIntegralConfig();
					})
			},
			queryIntegralInfo() {
				this.$http.get('/b/integral/query', {}, true)
					.then(res => {
						this.integralBalance = res.balance;
					})
			},
			queryIntegralConfig() {
				this.$http.post('/b/systemconfig/queryPlatformIntegralConf', {}, true)
					.then(res => {
						this.integralUseMax = Math.floor(this.order.payAmount * res.consumerDeductPercent / 100);
					})
			},
			change(data) {
				this.invoiceType = data;
			},
			changePayWay(way) {
				this.payWay = way
			},
			integralChange(integral) {
				this.integral = integral;
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
				const integralAmount = this.integral;

				const totalAmount = (orderAmount - couponAmount - integralAmount) / 100;
				return totalAmount;
			},
			toSelectCoupon() {
				uni.navigateTo({
					url: `/pages/mine/myCoupons/myCoupons?isSelect=1&orderType=${this.order.orderType}&minUsePrice=${this.order.payAmount}&state=0`,
					events: {
						onSelect: (coupon) => {
							if (coupon.id) {
								this.coupon = coupon;
								if (coupon.couponNature == 3) {
									const discountAmount = (this.order.payAmount || 0) * this.coupon.discount /
										100;
									const couponAmount = discountAmount > this.coupon.useMaxPrice ? this.coupon
										.useMaxPrice : discountAmount;
									this.couponName = `-${couponAmount / 100}`
								} else {
									this.couponName = `-${coupon.parvalue / 100}`;
								}
							} else {
								this.coupon = {};
								this.couponName = '请选择';
							}
						}
					},
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('selectCoupon', this.coupon);
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
			toCancel() {
				uni.navigateBack({});
			},
			createOrder() {

				// if (!this.invoice.id) {
				// 	uni.showToast({ title:  '请选择发票', icon:  'none' });
				// 	return;
				// }

				const params = {
					couponId: this.coupon.id ? this.coupon.id : undefined,
					// customerInvoiceId: this.invoice.id,
					// invoiceType: this.invoiceType,
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
						console.log('build success ', res);
						if (this.payWay == 9) {
							this.queryBankCardInfo();
						} else if (this.payWay == 10) {
							uni.showModal({
								title: '提示',
								content: '订单已提交，等待客服人员联系',
								showCancel: false,
								success: () => {
									uni.navigateBack({});
								}
							})
						} else {
							this.wxPay(res.payResult);
						}
					})
			},
			wxPay(res) {
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: res.timestamp,
					nonceStr: res.noncestr,
					package: res.packageName,
					signType: 'MD5',
					paySign: res.sign,
					success: (res) => {
						console.log('success:' + JSON.stringify(res));
						uni.showModal({
							title: '提示',
							content: '恭喜您，订单支付成功',
							cancelText: '返回首页',
							confirmText: '查看订单',
							success: (res) => {
								if (res.confirm) {
									uni.redirectTo({
										url: `/pages/place-order/orderDetail/orderDetail?id=${this.id}&isPlaceOrder=1`,
									})
								} else {
									uni.switchTab({
										url: '/pages/home/index/index'
									});
								}
							}
						})
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
						uni.showToast({
							title: '订单支付失败',
							icon: 'none'
						});
					},
				});
			},
			queryBankCardInfo() {
				this.$http.get('/core/softconf/bankcard', {}, true)
					.then(res => {
						this.bankCard = res.card;
						this.$refs.daLuanModel.show();
					});
			},
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
