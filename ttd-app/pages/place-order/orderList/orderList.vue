<template>
	<view>
		<custom-navbar title="订单列表" />

		<back-container>
			<template #headerSlot>

				<state-tab-list @change="changeVal" :active-value="value" />
			</template>

			<view class="plo-list">
				<list ref="list" class="plo-list" loadmoreoffset="200" @loadmore="loadMore">
					<view class="plo-item" v-for="(item, index) in orderList" :key="index" @click="toOrderDetail(item)">
						<view class="plo-itop">
							<text class="plo-itop-name">
								{{ $tool.orderType(item.orderType) }} {{ item.teamName ? `(${item.teamName})` : '' }}
							</text>
							<text class="plo-itop-state" :class="{
                    'plo-state-yellow': [20, 30, 40].includes(value),
                    'plo-state-green': [50].includes(value),
                    'plo-state-red': [90].includes(value),
                  }">{{ $tool.orderState(item.state) }}
							</text>
						</view>

						<view class="plo-imiddle">

							<view class="state1-tip" v-if="value === 10">
								<view class="plo-im-c">距离报价结束还有</view>
								<text class="plo-im-r">{{ getCountDownDay(item.quotationEnd, 'day') }}</text>
								<view class="plo-im-c plo-im-c2">天</view>
								<text class="plo-im-num">{{ getCountDownDay(item.quotationEnd, 'hour') }}</text>
								<text class="plo-im-mao">:</text>
								<text class="plo-im-num">{{ getCountDownDay(item.quotationEnd, 'minute') }}</text>
								<text class="plo-im-mao">:</text>
								<text class="plo-im-num">{{ getCountDownDay(item.quotationEnd, 'second') }}</text>
							</view>

							<view class="state1-tip" v-if="value === 20 && isPlaceOrder">
								<view class="plo-im-c">已报价：</view>
								<corner-mark :num="item.quoteNum" color="#2C3580" />
								<view class="plo-im-c plo-im-c2">人</view>
								<view class="plo-im-c">未报价：</view>
								<corner-mark :num="item.unQuoteNum" color="#2C3580" />
								<view class="plo-im-c">人</view>
							</view>

							<view class="state1-tip" v-if="item.subState == 5 || (item.subState == 4 && isPlaceOrder)">
								<view v-if="isPlaceOrder" class="plo-im-3red">
									{{ item.subState == 4 ? '等待承接方开始工作' : '承接方开始工作,等待您的确认' }}</view>
								<view v-else class="plo-im-3red">{{ item.subState == 4 ? '' : '等待用户确认开始' }}</view>
							</view>

							<view class="state1-tip" v-if="item.subState == 7 || (item.subState == 6 && isPlaceOrder)">
								<view v-if="isPlaceOrder" class="plo-im-3red">
									{{ item.subState == 6 ? '等待承接方完成工作' : '承接方完成工作,等待您的确认' }}</view>
								<view v-else class="plo-im-3red">{{ item.subState == 6 ? '' : '等待用户确认完工' }}</view>
							</view>

							<view class="state1-tip" v-if="!isPlaceOrder && item.settleState == 1">
								<view class="plo-im-3red">已支付{{ item.settleAmount / 100 }}元</view>
							</view>

							<view class="state1-tip" v-if="value === 90">
								<image
									src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/warningTanhao.svg"
									class="warn-tanhao" />
								<view class="plo-im-3red plo-im-3red-mar">
									取消原因：{{item.publishCancelReason || item.receiveCancelReason }}</view>
							</view>
						</view>

						<view class="plo-content">
							<view class="plo-ct">报价周期：{{ item.quotationStart.slice(0, 10) }} 至
								{{item.quotationEnd.slice(0, 10)}}</view>
							<view class="plo-ct">工作周期：{{ item.workStart.slice(0, 10) }} 至
								{{ item.workEnd.slice(0, 10) }}</view>
							<view class="plo-ct">
								工作地址：{{ item.orderAddress.province }} {{ item.orderAddress.city }}
								{{ item.orderAddress.district }} {{ item.orderAddress.address }}
							</view>
							<view class="plo-ct">工作内容：{{ item.detail }}</view>
						</view>

						<!-- 发单方 -->
						<view v-if="isPlaceOrder">
							<view class="plo-bottom" :class="{'no-mar-bottom': [90].includes(value)}">
								<view class="plo-btn1" v-if="[10, 20, 30].includes(value)"
									@tap.stop="cancelOrderTip(item)">取消订单</view>
								<!-- 待报价 待确认 -->
								<view class="plo-btn1"
									v-if="[10, 20].includes(value) || (item.state == 30 && item.subState == 4)"
									@tap.stop="toQuestionPage(item)">查看问题</view>
								<!-- 待确认 -->
								<view class="choose-change-btn" v-if="item.state == 20 && item.subState == 3"
									@tap.stop="toChoosePrice(item)">选价</view>
								<!-- <view class="choose-change-btn" v-if="item.state == 20 && item.subState == 3" @tap.stop="toPayOrder(item)">付款</view> -->
								<!-- 待开始 -->
								<view class="plo-btn1" v-if="item.applyOrderMemberFlag" @tap.stop="toReviewTeam(item)">
									审核人员</view>
								<view class="plo-btn1" v-if="[30, 40, 50].includes(value)"
									@tap.stop="toComplainPage(item)">投诉</view>
								<view class="choose-change-btn" v-if="item.state == 30 && item.subState == 5"
									@tap.stop="toOrderWork(item)">确认开始</view>
								<!-- 待完工 -->
								<view class="choose-change-btn" v-if="item.state == 40 && item.subState == 6"
									@tap.stop="toPayPartMoney(item)">部分付款</view>
								<view class="choose-change-btn" v-if="item.state == 40 && item.subState == 7"
									@tap.stop="toOrderWork(item)">确认完工</view>
								<!-- 已完工 -->
								<!-- <view class="plo-btn1" v-if="[50].includes(value)" @tap.stop="toOrderInvoice(item)">开发票</view> -->
								<view class="plo-btn1" v-if="[50].includes(value)" @tap.stop="toOrderComment(item)">去评价
								</view>

							</view>
						</view>
						<!-- 接单方 -->
						<view v-else>
							<view class="plo-bottom" :class="{'no-mar-bottom': [90].includes(value)}">
								<view class="plo-btn1" v-if="[10, 20, 30].includes(value)"
									@tap.stop="cancelOrderTip(item)">取消订单</view>
								<!-- 待报价 待确认 -->
								<view class="plo-btn1" v-if="[10, 20].includes(value)" @tap.stop="toQuestionPage(item)">
									咨询</view>
								<view class="plo-btn1" v-if="[10, 20].includes(value)" @tap.stop="toQuoteOrder(item)">
									去报价</view>
								<!-- 待确认 -->
								<view class="plo-btn1" v-if="[20].includes(value)" @tap.stop="toQuoteOrder(item)">修改报价
								</view>
								<!-- 待开始 -->
								<view class="plo-btn1"
									v-if="[30, 40].includes(value) && item.subState != 7 && item.receiverType == 2"
									@tap.stop="toReviewTeam(item)">变更人员</view>
								<view class="plo-btn1" v-if="[30, 40, 50].includes(value)"
									@tap.stop="toComplainPage(item)">投诉</view>
								<view class="choose-change-btn" v-if="[30].includes(value) && item.subState == 4"
									@tap.stop="toOrderWork(item)">申请开始</view>
								<!-- 待完工 -->
								<view class="choose-change-btn"
									v-if="item.receiverType == 2 && (item.settleState == 1 || item.settleState == 2)"
									@tap.stop="toDistributionIncome(item)">收益分配</view>
								<view class="choose-change-btn" v-if="[40].includes(value) && item.subState == 6"
									@tap.stop="toOrderWork(item)">申请完工</view>
							</view>
						</view>

					</view>
				</list>

				<list-empty v-if="!orderList.length" text2="去下一单试试……" />

			</view>
		</back-container>

		<!-- 取消原因 -->
		<modal-box ref="modalBox">
			<template #slot1>
				<view class="cancel-order-model">
					<view class="com-tip">{{ cancelWarning }}</view>
					<view class="com-tip-title">
					</view>
				</view>
			</template>
		</modal-box>

	</view>
</template>

<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
	import StateTabList from "./stateTabList";
	import CornerMark from "../../receive-order/component/cornerMark";
	import ListEmpty from "./listEmpty";
	import ModalBox from "../choosePrice/modalBox";
	import AddRemark from "../../receive-order/component/addRemark";
	import dayjs from 'dayjs'

	export default {
		components: {
			AddRemark,
			ModalBox,
			ListEmpty,
			CornerMark,
			StateTabList,
			BackContainer
		},
		data() {
			return {
				isPlaceOrder: true,
				value: 10, // state 状态 10待报价，20待确认，30待开始，40待完工，50已完成，90已取消
				orderList: [],
				cancelItem: {},
				cancelWarning: '',
				page: 0,
				isNoMore: true,
			};
		},
		computed: {
			state() {
				return 10
			}
		},
		onLoad(option) {
			if (option.isPlaceOrder) {
				this.isPlaceOrder = option.isPlaceOrder == '1';
			}
			if (option.state) {
				this.value = Number(option.state);
			}
		},
		onReady() {},
		onShow() {
			this.onRefresh();
		},
		onPullDownRefresh() {
			this.onRefresh();
		},
		onReachBottom() {
			this.loadMore();
		},
		methods: {
			changeVal(val) {
				this.value = val;
				this.onRefresh();
			},
			onRefresh() {
				this.page = 0;
				this.queryOrderList();
			},
			loadMore() {
			    // this.$refs["list"].resetLoadmore();
			    console.log('loadmore ');
			    if (this.isNoMore) return;
			    this.queryOrderList(true);
		    },
		    resetLoadMore() {
			    this.$refs["list"].resetLoadmore();
		    },
            queryOrderList(loadMore = false) {
                const url = this.isPlaceOrder ? '/b/ordermaster/queryPageList' : '/b/orderreceive/queryPageList';
                this.$http.post(url, {
                    state: this.value,
				    pageNum: loadMore ? (this.page + 1) : this.page,
				    sortInfos: [{
					    field: 'addTime',
					    sort: 'desc',
				    }]
                }, true)
                    .then(res => {
                        uni.stopPullDownRefresh();
                        this.orderList = loadMore ? this.orderList.concat(res.dataList) : res.dataList;
						this.page = res.pageNum;
						this.isNoMore = res.dataList.length < res.pageSize;
                    }).catch((e) => {
                        uni.stopPullDownRefresh();
                })
            },
			getCountDownDay(time, type) {

				const now = dayjs().valueOf();
				const end = dayjs(time).valueOf();
				// 时间差
				const leftTime = end - now;
				console.log('过期时间',time,leftTime);
				
				if (leftTime <= 0) return '-';

				if (type == 'day') {
					return Math.floor(leftTime / 1000 / 60 / 60 / 24);
				} else if (type == 'hour') {
					const hour = Math.floor(leftTime / 1000 / 60 / 60 % 24);
					return hour.toString().length == 2 ? hour : `0${hour}`;
				} else if (type == 'minute') {
					const minute = Math.floor(leftTime / 1000 / 60 % 60);
					return minute.toString().length == 2 ? minute : `0${minute}`;
				} else if (type == 'second') {
					const second = Math.floor(leftTime / 1000 % 60);
					return second.toString().length == 2 ? second : `0${second}`;
				}
				return '';
			},

			// 取消订单
			cancelOrderTip(item) {
				//TODO 临时添加 联调结束后自行删除
				// this.cancelItem = item;
				// if (item.state == 10 || item.state == 20) {
				// 	this.cancelWarning = '取消订单会影响您的声誉，影响后续发单。您确定要取消订单吗？'
				// } else {
				// 	this.cancelWarning = '取消订单会影响您的声誉，影响后续发单，并会扣除部分款项。您确定要取消订单吗？'
				// }
				//    this.$refs.modalBox.show()
				// return;

				let warning = '取消订单会影响您的声誉，影响后续发单，并会扣除部分款项。您确定要取消订单吗？'
				if (item.state == 10 || item.state == 20) {
					warning = '取消订单会影响您的声誉，影响后续发单。您确定要取消订单吗？'
				}
				uni.showModal({
					title: '提示',
					content: warning,
					success: (res) => {
						if (res.confirm) {
							this.cancelOrder(item.id);
						}
					}
				})
			},
			cancelOrder(id) {
				const url = this.isPlaceOrder ? '/b/ordermaster/publishCancel' : '/b/orderreceive/receiveCancel';
				this.$http.post(url, {
						id
					}, true)
					.then(res => {
						uni.showToast({
							title: '订单已取消'
						});
						this.queryOrderList();
					})
			},
			// 订单详情
			toOrderDetail(item) {
				uni.navigateTo({
					url: `/pages/place-order/orderDetail/orderDetail?id=${item.id}&isPlaceOrder=${this.isPlaceOrder ? 1 : 0}`,
				})
			},
			// 查看问题/咨询
			toQuestionPage(item) {
				uni.navigateTo({
					url: `/pages/receive-order/questionAnswer/questionAnswer?isPlaceOrder=${this.isPlaceOrder ? 1 : 0}&id=${item.id}&orderType=${item.orderType}`,
				})
			},
			// 变更/审核人员
			toReviewTeam(item) {
				uni.navigateTo({
					url: `/pages/receive-order/personChange/personChange?isPlaceOrder=${this.isPlaceOrder ? 1 : 0}&id=${item.id}`,
				})
			},
			// 投诉
			toComplainPage(item) {
				uni.navigateTo({
					url: `/pages/receive-order/complaint/complaint?id=${item.id}`,
				})
			},
			// 开始/结束工作
			toOrderWork(item) {
				uni.navigateTo({
					url: `/pages/receive-order/applyBeginWork/applyBeginWork?isPlaceOrder=${this.isPlaceOrder ? 1 : 0}&id=${item.id}`,
				})
			},
			/*
			 *  发单方
			 */
			// 选价
			toChoosePrice(item) {
				uni.navigateTo({
					url: `/pages/place-order/choosePrice/choosePrice?id=${item.orderMasterId}&orderId=${item.id}&itemCount=${item.itemIdList.length}`,
				})
			},
			// 付款
			toPayOrder(item) {
				uni.navigateTo({
					url: `/pages/place-order/orderPay/orderPay?id=${item.id}`,
				})
			},
			// 部分付款
			toPayPartMoney(item) {
				uni.showModal({
					title: '部分付款',
					editable: true,
					placeholderText: '请输入金额',
					success: (res) => {
						if (res.confirm) {
							const amount = Number(res.content) * 100;
							this.payMoney(item.id, amount, item.quoteAmount);
						}
					}
				})
			},
			payMoney(id, amount, totalMount) {
				if (amount > totalMount) {
					uni.showToast({
						title: '部分付款金额不能大于报价金额',
						icon: 'none'
					})
					return;
				}
				const params = {
					amount,
					receiverOrderId: id,
				}
				this.$http.post('/b/ordersettlement/partialSettlement', params, true)
					.then(res => {
						uni.showToast({
							title: '部分付款成功'
						});
						this.queryOrderList();
					})
			},
			// 评价订单
			toOrderComment(item) {
				uni.navigateTo({
					url: `/pages/place-order/evaluationOrder/evaluationOrder?id=${item.id}`,
				})
			},
			// 开发票   1: 选择发票抬头
			toOrderInvoice(item) {
				uni.navigateTo({
					url: `/pages/mine/chooseLookUp/chooseLookUp`,
					events: {
						onSelect: (invoice) => {
							this.applyInvoice(item, invoice);
						}
					}
				})
			},
			// 2: 开发票
			applyInvoice(item, invoice) {
				const params = {
					invoiceId: invoice.id,
					receiveOrderId: item.id,
				}
				this.$http.post('/b/orderinvoice/applyInvoice', params, true)
					.then(res => {
						uni.showToast({
							title: '开票成功',
							success: () => {
								this.queryOrderList();
							}
						})
					})
			},
			/*
			 *  接单方
			 */
			// 去报价
			toQuoteOrder(item) {
				uni.navigateTo({
					url: `/pages/receive-order/offer/offer?id=${item.id}`,
				})
			},
			// 分配收益
			toDistributionIncome(item) {
				uni.navigateTo({
					url: `/pages/receive-order/incomeDistribute/incomeDistribute?id=${item.id}`,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.plo-list {
		background-color: #F3F4F5;

		.plo-item {
			margin-bottom: 32rpx;
			background-color: white;

			.plo-itop {
				height: 88rpx;
				@include flexBetween;
				padding-right: 32rpx;
				margin-left: 32rpx;
				border-bottom: 1rpx solid #EAECEF;

				.plo-itop-name {
					font-size: 32rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #323335;
				}

				.plo-itop-state {
					padding: 0 16rpx;
					height: 48rpx;
					background: #5AC8FA;
					border-radius: 8rpx;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					@include flexCenter;
				}

				.plo-state-yellow {
					background-color: #FF9500;
				}

				.plo-state-green {
					background-color: #34C759;
				}

				.plo-state-red {
					background-color: #FF3B30;
				}
			}

			.plo-imiddle {
				.state1-tip {
					box-sizing: border-box;
					display: flex;
					align-items: center;
					height: 80rpx;
					background: #FFFBE8;
					margin: 15rpx 32rpx 0 32rpx;
					padding: 24rpx 32rpx;

					.plo-im-c {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #323335;
					}

					.plo-im-c2 {
						margin-right: 32rpx;
					}

					.plo-im-r {
						margin: 0 6rpx;
						color: #FF3B30;
					}

					.plo-im-num {
						width: 40rpx;
						height: 40rpx;
						background: #FF3B30;
						border-radius: 8rpx;
						display: inline-flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin: 0 6rpx;
					}

					.plo-im-mao {
						width: 34rpx;
						height: 32rpx;
						text-align: center;
					}

					.plo-im-3red {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF3B30;
					}

					.plo-im-3red-mar {
						margin-left: 8rpx;
					}
				}

				.warn-tanhao {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.plo-content {
				margin: 15rpx 32rpx 32rpx 32rpx;
				padding: 16rpx 32rpx;
				min-height: 240rpx;
				box-sizing: border-box;
				background: #F3F4F5;

				.plo-ct {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #828282;
					line-height: 52rpx;
				}
			}

			.plo-bottom {
				display: flex;
				justify-content: flex-end;
				padding: 0 32rpx 32rpx 32rpx;

				.plo-btn1 {
					padding: 0 30rpx;
					height: 64rpx;
					border-radius: 32rpx;
					border: 2rpx solid #EDEDED;
					margin-left: 8rpx;
					@include flexCenter;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #4F4F4F;
				}

				.choose-change-btn {
					padding: 0 30rpx;
					height: 64rpx;
					border-radius: 32rpx;
					border: 2rpx solid #2C3580;
					margin-left: 8rpx;
					color: #2C3580;
					@include flexCenter;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
				}
			}

			.no-mar-bottom {
				padding-bottom: 0;
			}
		}
	}

	.cancel-order-model {
		.com-tip {
			min-height: 88rpx;
			background: rgba(255, 149, 0, 0.1);
			box-sizing: border-box;
			padding: 26rpx 48rpx;
			border-radius: 8rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FF3B30;
		}

		.com-tip-title {
			margin: 0 50rpx 56rpx 50rpx;

			.com-tip-title1 {
				margin: 16rpx 0;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 36rpx;
			}

			.com-tip-input-box {
				height: 76rpx;
				box-sizing: border-box;
				padding: 20rpx 32rpx;
				background: #F3F4F5;
				border-radius: 8rpx;

				.com-tip-input {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
			}
		}
	}
</style>
<style lang="scss">
	@import "../../mine/addressManage/_pageStyle.scss";
	@import "../../mine/addressManage/_commonPlaceholder.scss";
</style>
