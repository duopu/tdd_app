<template>
  <view>

    <custom-navbar title="发单" />

    <back-container>
      <template #headerSlot>
        <offer-head title="维修" text="订单编号：924795438953234324" />
      </template>

      <view class="order-dtl">
        <view class="order-dtl-1">
          <view class="order-dtl-12">
            <text>订单金额：</text>
            <my-price :scale="0.9" price="8000.00" />
          </view>
          <view class="order-dtl-11">待完成</view>
        </view>

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
				  :price="item.quoteAmount / 100"
				  :show-last-border-bottom="index < (showWorkList.length - 1)"
				  @onChange="changeQuote(item)"
				/>
				
      </view>
			<view v-if="workList.length > 5" class="order-dtl-53" @click="showWork">
			  <text class="order-dtl-531">{{ showWorkMore ? '收起' : '展开更多' }}</text>
			  <uni-icons class="oc-arrow" type="arrowright" size="20" color="#BDBDBD" />
			</view>
    </view>

    <view class="order-dtl-6" @click="toQuestionPage">
      <text class="order-dtl-6t">咨询</text>
      <text class="order-dtl-6tmid">{{ questionNum }} 个问题 {{ answerNum }}个回答</text>
      <uni-icons color="#969799" size="18" type="arrowright" />
    </view>

    <view class="order-dtl-6" @click="toTeamChangeList">
      <text class="order-dtl-6t">人员变更</text>
      <text class="order-dtl-6tmid">3 次人员变更</text>
      <uni-icons color="#969799" size="18" type="arrowright" />
    </view>

    <view class="order-dtl-team">
      <member-title :show-right="false" title="评价" />
      <evaluate-card v-for="i in 2" :key="i" />
    </view>

    <view class="order-dtl-botb" />

    <iphonex-bottom>
      <view class="order-dtl-btn-box">
        <view class="order-dtl-btn1">取消订单</view>
        <view class="order-dtl-btn1">审核人员</view>
        <view class="order-dtl-btn1">投诉</view>
        <view class="order-dtl-btn1 order-dtl-btn2">确认开始</view>
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

export default {
  name: 'orderDetail',
  components: { IphonexBottom, EvaluateCard, MemberTitle, UniIcons, OfferContentCard, AddRemark, QuotedIten, MyPrice, OfferHead, BackContainer },
  data() {
    return {
			id: '',
			isPlaceOrder: true,
			order: {},
			workList: [],
			showWorkList: [],
			showWorkMore: false,
			questionNum: 0, // 问题数
			answerNum: 0, // 回答数
			commentList: [], // 评价
    };
  },
	onLoad(option) {
		if (option.id) {
		  this.id = option.id;
			this.queryOrderInfo();
			this.queryWorkList();
			this.queryCommentList();
			this.queryQuestionCount();
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
		queryCommentList() {
			this.$http
				.post('/b/ordercomment/queryByReceiverOrderId', { id: this.id })
				.then(res => {
					this.commentList = res;
				});
		},
		queryQuestionCount() {
			this.$http
				.post('/b/orderquestionanswer/queryCount', { id: this.id })
				.then(res => {
					this.questionNum = res[0].questionNum;
					this.answerNum = res[0].answerNum;
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
		// 查看问题/咨询
		toQuestionPage() {
			uni.navigateTo({
				url: `/pages/receive-order/offerDetail/offerDetail?id=${this.id}`,
			})
		},
		// 人员变更记录
		toTeamChangeList() {
			uni.navigateTo({
				url: `/pages/receive-order/changeRecord/changeRecord?id=${this.id}`,
			})
		},
  }
}
</script>

<style lang="scss" scoped>

.order-dtl {
  padding-bottom: 32rpx;

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
