<template>
  <view>

    <custom-navbar title="订单详情" />

    <back-container>
      <template #headerSlot>
        <offer-head :title="$tool.orderType(order.orderType)" :text="`订单编号：${order.id}`" />
      </template>

      <view class="order-dtl">

        <quoted-iten :order="order"/>

      </view>
    </back-container>

    <view class="order-dtl-5">
      <view class="order-dtl-51">工作内容</view>
      <view class="order-dtl-52">

				<offer-content-card
				  v-for="(item, index) in showWorkList"
				  :key="index"
				  :right-type="item.quoteAmount ? 5 : 4"
				  :title="getItemTitle(item)"
				  :specItem="getSpecList(item)"
					:image="itemImage"
				  :price="item.quoteAmount / 100"
				  :show-last-border-bottom="index < (showWorkList.length - 1)"
					@onClick="checkItem(item)"
				  @onChange="changeQuote(item)"
				/>

      </view>
			<view v-if="workList.length > 5" class="order-dtl-53" @click="showWork">
			  <text class="order-dtl-531">{{ showWorkMore ? '收起' : '展开更多' }}</text>
			  <uni-icons class="oc-arrow" type="arrowright" size="20" color="#BDBDBD" />
			</view>
    </view>
		
		<view class="offer-9" v-if="order.receiverId">
			<view class="offer-91" >
				<view class="offer-91-text">承接方</view>
				<view class="offer-91-icon" :class="{
					'offer-91-icon-yellow': order.receiverType == 1
				}">{{ order.receiverType == 1 ? '个人' : '团队' }}</view>
			</view>
			<view class="offer-92">
				<view class="offer-92-item" v-if="order.receiverType == 1" @click="toPersonDetail(order.receiverId)">
				  <image v-if="order.receiverHeadImgUrl" class="offer-92-img" :src="order.receiverHeadImgUrl" />
				  <image v-else class="offer-92-img" src='https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png' />
				  <view class="offer-92-name">{{ order.receiverUserName }}</view>
				</view>
				<view class="offer-92-item" v-else v-for="(i, index) in memberList" :key="i.userId" @click="toPersonDetail(i.userId)">
				  <image v-if="i.headImgUrl" class="offer-92-img" :src="i.headImgUrl" />
				  <image v-else class="offer-92-img" src='https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png' />
				  <view class="offer-92-name">{{ i.userName }}</view>
				</view>
			</view>
		</view>

    <view class="order-dtl-6" @click="toQuestionPage">
      <text class="order-dtl-6t">咨询</text>
      <text class="order-dtl-6tmid">{{ order.questionNum }} 个问题 {{ order.answerNum }}个回答</text>
      <uni-icons color="#969799" size="18" type="arrowright" />
    </view>

    <view class="order-dtl-6" @click="toTeamChangeList">
      <text class="order-dtl-6t">人员变更</text>
      <text class="order-dtl-6tmid">{{ order.memberChangeNum }} 次人员变更</text>
      <uni-icons color="#969799" size="18" type="arrowright" />
    </view>

    <view class="order-dtl-team">
      <member-title :show-right="false" title="评价" />
      <evaluate-card v-for="i in commentList" :key="i" :comment="i"/>
			<list-empty v-if="!commentList.length" />
    </view>

    <view class="order-dtl-botb" />

    <iphonex-bottom>
			<!-- 发单方 -->
			<view v-if="isPlaceOrder" class="order-dtl-btn-box">
				<view class="order-dtl-btn1" v-if="[10, 20, 30].includes(order.state)" @click="cancelOrderTip">取消订单</view>
				<!-- 待报价 待确认 -->
				<view class="order-dtl-btn1" v-if="[10, 20].includes(order.state) || (order.state == 30 && order.subState == 4)" @click="toQuestionPage">查看问题</view>
				<!-- 待确认 -->
				<view class="order-dtl-btn1 order-dtl-btn2" v-if="order.state == 20 && order.subState == 3" @click="toChoosePrice">选价</view>
				<!-- <view class="order-dtl-btn1 order-dtl-btn2" v-if="order.state == 20 && order.subState == 3" @click="toPayOrder">付款</view> -->
				<!-- 待开始 -->
				<view class="order-dtl-btn1" v-if="order.applyOrderMemberFlag" @click="toReviewTeam">审核人员</view>
				<view class="order-dtl-btn1" v-if="[30, 40, 50].includes(order.state)" @click="toComplainPage">投诉</view>
				<view class="order-dtl-btn1 order-dtl-btn2" v-if="order.state == 30 && order.subState == 5" @click="toOrderWork">确认开始</view>
				<!-- 待完工 -->
				<view class="order-dtl-btn1 order-dtl-btn2" v-if="order.state == 40 && order.subState == 6" @click="toPayPartMoney">部分付款</view>
				<view class="order-dtl-btn1 order-dtl-btn2" v-if="order.state == 40 && order.subState == 7" @click="toOrderWork">确认完工</view>
				<!-- 已完工 -->
				<!-- <view class="order-dtl-btn1" v-if="[50].includes(order.state)" @click="toOrderInvoice">开发票</view> -->
				<view class="order-dtl-btn1" v-if="[50].includes(order.state)" @click="toOrderComment">去评价</view>
			</view>
			<!-- 接单方 -->
			<view v-else class="order-dtl-btn-box">
				<view class="order-dtl-btn1" v-if="[10, 20, 30].includes(order.state)" @click="cancelOrderTip">取消订单</view>
				<!-- 待报价 待确认 -->
				<view class="order-dtl-btn1" v-if="[10, 20].includes(order.state)" @click="toQuestionPage">咨询</view>
				<view class="order-dtl-btn1" v-if="[10].includes(order.state)" @click="toQuoteOrder">去报价</view>
				<!-- 待确认 -->
				<view class="order-dtl-btn1" v-if="[20].includes(order.state)" @click="toQuoteOrder">修改报价</view>
				<!-- 待开始 -->
				<view class="order-dtl-btn1" v-if="[30, 40].includes(order.state) && order.subState != 7 && order.receiverType == 2" @click="toReviewTeam">变更人员</view>
				<view class="order-dtl-btn1" v-if="[30, 40, 50].includes(order.state)" @click="toComplainPage">投诉</view>
				<view class="order-dtl-btn1 order-dtl-btn2" v-if="[30].includes(order.state) && order.subState == 4" @click="toOrderWork">申请开始</view>
				<!-- 待完工 -->
				<view class="order-dtl-btn1 order-dtl-btn2" v-if="order.receiverType == 2 && (order.settleState == 1 || order.settleState == 2)" @click="toDistributionIncome">收益分配</view>
				<view class="order-dtl-btn1 order-dtl-btn2" v-if="[40].includes(order.state) && order.subState == 6" @click="toOrderWork">申请完工</view>
			</view>
    </iphonex-bottom>
  </view>
</template>

<script>
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
import ListEmpty from "../orderList/listEmpty";

export default {
  name: 'orderDetail',
  components: { ListEmpty, IphonexBottom, EvaluateCard, MemberTitle, UniIcons, OfferContentCard, AddRemark, QuotedIten, MyPrice, OfferHead, BackContainer },
  data() {
    return {
			id: '',
			isPlaceOrder: true,
			order: {},
			itemImage: '',
			workList: [],
			showWorkList: [],
			showWorkMore: false,
			memberList: [], // 承接方团队人员
			commentList: [], // 评价
    };
  },
	onLoad(option) {
		if (option.id) {
		  this.id = option.id;
			this.queryOrderInfo();
			this.queryWorkList();
			this.queryCommentList();
			this.queryMemberList();
		}
		if (option.isPlaceOrder) {
			this.isPlaceOrder = option.isPlaceOrder ==  '1';
		}
	},
  methods: {
    queryOrderInfo() {
			this.$http.post('/b/orderreceive/query', { id: this.id }, true)
			.then(res => {
			  this.order = res;
				this.queryItemImg();
			})
		},
		queryItemImg() {
			this.$http.post('/b/ordermaster/orderTypeImg', {})
				.then(res => {
					const item = res.filter((i) => i.type == this.order.orderType)[0];
					this.itemImage = item ? item.icon : '';
					console.log('itemImage ',this.itemImage);
				})
		},
		queryWorkList() {
			this.$http.post('/b/orderquote/receiveQuoteDetail', { id: this.id })
			.then(res => {
			  this.workList = res.orderItemList;
				this.showWorkList = this.workList.slice(0, 5);
				console.log('showWorkList ', this.showWorkList);
			})
		},
		queryMemberList() {
			this.$http.post('/b/ordermember/queryMemberListAndApplyInfo', { id: this.id }, true)
			.then(res => {
				this.memberList = (res.curtOrderMemberList || []).map((m) => {
					return {
						headImgUrl: m.headImgUrl,
						userName: m.name,
						phone: m.phone,
						skills: m.skills,
						userId: m.id,
					}
				});
			})
		},
		queryCommentList() {
			this.$http
				.post('/b/ordercomment/queryByReceiverOrderId', { id: this.id })
				.then(res => {
					this.commentList = res;
				});
		},
		getOrderIdText() {
			return `订单编号：${ this.id }`
		},
		showWork() {
			this.showWorkMore = !this.showWorkMore;
			if (this.showWorkMore) {
				this.showWorkList = this.workList;
			} else {
				this.showWorkList = this.workList.slice(0, 5);
			}
		},
		getItemTitle(work) {
			if (work.itemType == 1) {
				return work.type == 1 ? '实施' : '维修';
			} else if (work.itemType == 2) {
				return '勘测';
			} else if (work.itemType == 3) {
				return work.cateName;
			} else if (work.itemType == 4) {
				return work.cateName;
			} else if (work.itemType == 5) {
				return work.cateName;
			}
			return '';
		},
		getSpecList(work) {
			if (work.itemType == 1) {
				// 实施
				return [
					{ label: '技能：', value: work.cateName },
					{ label: '品牌/型号：', value: `${work.brand}/${work.model ? work.model : '-'}` },
					{ label: '数量：', value: work.number },
				];
			} else if (work.itemType == 2) {
				// 勘测
				return [
					{ label: '面积：', value: work.number },
				];
			} else if (work.itemType == 3) {
				// 人员岗位
				return [
					{ label: '数量：', value: work.number },
				];
			} else if (work.itemType == 4) {
				// 设备
				return [
					{ label: '数量：', value: work.number },
					{ label: '使用路程：', value: work.distance },
				];
			}
			return [];
		},
		// 查看工作内容
		checkItem(work) {
			const typeArray = [
				'/pages/place-order/addImplementation/addImplementation?isEdit=0',
				'/pages/place-order/addCanBeSetWork/addCanBeSetWork?isEdit=0',
				'/pages/place-order/addPersonWork/addPersonWork?isEdit=0',
				'/pages/place-order/addLeaseWork/addLeaseWork?isEdit=0',
				'/pages/place-order/addSoftwareDevelop/addSoftwareDevelop?isEdit=0',
			];
			uni.navigateTo({
				url: typeArray[this.order.orderType - 1],
				success: (res) => {
					// 通过eventChannel向被打开页面传送数据
					res.eventChannel.emit('editWork', work);
				}
			})
		},
		
		// 查看承接方个人详情
		toPersonDetail(userId) {
			uni.navigateTo({
				url: `/pages/receive-order/peopleDetail/peopleDetail?id=${userId}&hideInfo=${
					this.order.state == 10 || this.order.state == 20 || this.order.state == 90 ? 1 : 0}`
			})
		},
		// 人员变更记录
		toTeamChangeList() {
			uni.navigateTo({
				url: `/pages/receive-order/changeRecord/changeRecord?id=${this.id}`,
			})
		},
		
		// 取消订单
		cancelOrderTip() {
			let warning = '取消订单会影响您的声誉，影响后续发单，并会扣除部分款项。您确定要取消订单吗？'
			if (this.order.state == 10 || this.order.state == 20) {
				warning = '取消订单会影响您的声誉，影响后续发单。您确定要取消订单吗？'
			}
			uni.showModal({
				title: '提示',
				content: warning,
				success: (res) => {
					if (res.confirm) {
						this.cancelOrder();
					}
				}
			})
		},
		cancelOrder() {
			const url = this.isPlaceOrder ? '/b/ordermaster/publishCancel' : '/b/orderreceive/receiveCancel';
			this.$http.post(url, { id: this.id }, true)
			.then(res => {
				const timer = setTimeout(() => {
					timer && clearTimeout(timer);
					uni.showToast({ title: '订单已取消' });
				}, 500)
				this.queryOrderList();
			})
		},
		// 查看问题/咨询
		toQuestionPage() {
			uni.navigateTo({
				url: `/pages/receive-order/questionAnswer/questionAnswer?isPlaceOrder=${this.isPlaceOrder ? 1 : 0}&id=${this.id}&orderType=${this.order.orderType}`,
			})
		},
		// 变更/审核人员
		toReviewTeam() {
			uni.navigateTo({
				url: `/pages/receive-order/personChange/personChange?isPlaceOrder=${this.isPlaceOrder ? 1 : 0}&id=${this.id}`,
			})
		},
		// 投诉
		toComplainPage() {
			uni.navigateTo({
				url: `/pages/receive-order/complaint/complaint?id=${this.id}`,
			})
		},
		// 开始/结束工作
		toOrderWork() {
			uni.navigateTo({
				url: `/pages/receive-order/applyBeginWork/applyBeginWork?isPlaceOrder=${this.isPlaceOrder ? 1 : 0}&id=${this.id}`,
			})
		},
		/* 
		  *  发单方 
		 */
		// 选价
		toChoosePrice() {
			uni.navigateTo({
				url: `/pages/place-order/choosePrice/choosePrice?id=${this.order.orderMasterId}&orderId=${this.id}&itemCount=${this.order.itemIdList.length}`,
			})
		},
		// 付款
		toPayOrder() {
			uni.navigateTo({
				url: `/pages/place-order/orderPay/orderPay?id=${this.id}`,
			})
		},
		// 部分付款
		toPayPartMoney() {
			uni.showModal({
				title: '部分付款',
				editable: true,
				placeholderText: '请输入金额',
				success: (res) => {
					if (res.confirm) {
						const amount = Number(res.content) * 100;
						this.payMoney(this.id, amount, this.order.quoteAmount);
					}
				}
			})
		},
		payMoney(id, amount, totalMount) {
			if (amount > totalMount) {
				uni.showToast({ title: '部分付款金额不能大于报价金额', icon: 'none'})
				return;
			}
			const params = {
				amount,
				receiverOrderId: id,
			}
			this.$http.post('/b/ordersettlement/partialSettlement', params, true)
			.then(res => {
				const timer = setTimeout(() => {
					timer && clearTimeout(timer);
					uni.showToast({ title: '部分付款成功' });
				}, 500)
				this.queryOrderList();
			})
		},
		// 评价订单
		toOrderComment() {
			uni.navigateTo({
				url: `/pages/place-order/evaluationOrder/evaluationOrder?id=${this.id}`,
			})
		},
		// 开发票   1: 选择发票抬头
		toOrderInvoice() {
			uni.navigateTo({
				url: `/pages/mine/chooseLookUp/chooseLookUp`,
				events: {
					onSelect: (invoice) => {
						this.applyInvoice(invoice);
					}
				}
			})
		},
		// 2: 开发票
		applyInvoice(invoice) {
			const params = {
				invoiceId: invoice.id,
				receiveOrderId: this.id,
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
		toQuoteOrder() {
			uni.navigateTo({
				url: `/pages/receive-order/offer/offer?id=${this.id}`,
			})
		},
		// 分配收益
		toDistributionIncome() {
			uni.navigateTo({
				url: `/pages/receive-order/incomeDistribute/incomeDistribute?id=${this.id}`,
			})
		}
  }
}
</script>

<style lang="scss" scoped>

.order-dtl {
  padding-bottom: 32rpx;
}


.order-dtl-5 {
  background-color: white;
  margin: 30rpx 0 32rpx 0;

  .order-dtl-51 {
    width: 750rpx;
    height: 88rpx;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
  }

  .order-dtl-52 {
    margin-left: 32rpx;
    border-top: 1rpx solid #EAECEF;
    border-bottom: 1rpx solid #EAECEF;
  }

  .order-dtl-53 {
    height: 80rpx;
    padding: 0 32rpx;
    @include flexBetween;
    background: #FFFFFF;

    .order-dtl-531 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #1889F9;
    }
  }
}

.order-dtl-6 {
  display: flex;
  height: 88rpx;
  align-items: center;
  background: #FFFFFF;
  margin-bottom: 32rpx;
  padding: 0 32rpx;

  .order-dtl-6t {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
  }

  .order-dtl-6tmid {
    flex: 1;
    text-align: right;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
  }
}

.offer-9 {
	background-color: white;
	margin: 32rpx 0;
	
	.offer-91 {
		height: 80rpx;
		padding: 0 32rpx;
		@include flexBetween;
		
		.offer-91-text {
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
		}
		
		.offer-91-icon {
			padding: 0 12rpx;
			height: 40rpx;
			background: #2C3580;
			border-radius: 8rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			@include flexCenter;
		}
		.offer-91-icon-yellow {
			background-color: #FF9500;
		}
	}

  .offer-92 {
		padding: 32rpx;
		display: flex;
		flex-flow: wrap row;
		
		.offer-92-item {
		  margin-right: 58rpx;
		  width: 127rpx;
		
		  &:nth-of-type(4n + 4) {
		    margin: 0;
		  }
		
		  .offer-92-img {
		    width: 127rpx;
		    height: 127rpx;
		    border-radius: 8rpx;
		  }
		
		  .offer-92-name {
		    font-size: 28rpx;
		    font-family: PingFang SC-Regular, PingFang SC;
		    font-weight: 400;
		    text-align: center;
		    margin-top: 16rpx;
		    color: #323232;
		    line-height: 36rpx;
		  }
		}
	}
}

.order-dtl-team {
  background-color: white;
  margin: 32rpx 0 100rpx 0;
}

.order-dtl-botb {
  height: 200rpx;
}

.order-dtl-btn-box {
  height: 128rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 0 32rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .order-dtl-btn1 {
    height: 64rpx;
    padding: 0 30rpx;
    @include flexCenter;
    border-radius: 32rpx;
    border: 2rpx solid #EDEDED;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
    margin-left: 8rpx;
  }

  .order-dtl-btn2 {
    color: #2C3580;
    border-color: #2C3580;
  }
}

</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
