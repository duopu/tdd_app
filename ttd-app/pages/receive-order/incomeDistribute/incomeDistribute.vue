<template>
  <view>
    <custom-navbar title="收益分配" />

    <back-container>
      <template #headerSlot>
        <offer-head />
      </template>

      <view class="offer">

<!--        <view class="ind-1">
          <view class="ind-12">
            <text>订单金额：</text>
            <my-price :scale="0.9" price="8000.00" />
          </view>
          <view class="ind-11">待完成</view>
        </view>-->

        <order-title-sd order-state="待完成" price="10" />

        <quoted-iten :order="order"/>

      </view>

    </back-container>

    <view class="ind-5">
      <view class="ind-51">工作成员</view>
      <view class="ind-52">
        <offer-content-card
            v-for="(item, index) in memberList"
            :key="index"
						:title="item.name"
						:image="item.headImgUrl"
						:specItem="[{label: '手机号：', value: item.phone}]"
            :right-type="item.amount ? 1 : 3"
						:price="item.amount / 100"
            :show-last-border-bottom="index < (memberList.length -1)"
						@onChange="changePrice(item)"
        />
      </view>
    </view>

    <view style="height: 300rpx" />

    <iphonex-bottom>
      <bottom-price-and-btn v-if="order.leaderFlag == 1" all-text="已分配" sure-text="确认分配" :price="getQuoteCount(3)" @onCancel="cancelDistribute" @onConfirm="submitDistribute">
        <view class="ind-8">
          <text class="ind-81">已分配</text>
          <corner-mark :num="getQuoteCount(1)" />
          <text class="ind-81">未分配</text>
          <corner-mark :num="getQuoteCount(2)" color="#828282" />
          <text class="ind-81">未分配金额:</text>
          <my-price :price="getQuoteCount(4)" :scale="0.8" />
        </view>
      </bottom-price-and-btn>
			<view v-else-if="showConfirm">
			  <big-btn buttonText="确认分配" @click="confirmDistribute"/>
			  <big-btn buttonText="拒绝分配" @click="refuseDistribute"/>
			</view>
    </iphonex-bottom>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../component/offerHead";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
import OfferContentCard from "../component/offerContentCard";
import AddRemark from "../component/addRemark";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import CornerMark from "../component/cornerMark";
import MyPrice from "../component/myPrice";
import QuotedIten from "../component/quotedIten";
import BottomPriceAndBtn from "../component/bottomPriceAndBtn";
import BigBtn from "../../mine/addressManage/component/bigBtn";
import OrderTitleSd from "../applyBeginWork/orderTitleSd";

export default {
  name: "incomeDistribute",
  components: {
    OrderTitleSd,
		BigBtn,
    BottomPriceAndBtn,
    QuotedIten,
    MyPrice,
    CornerMark,
    IphonexBottom,
    AddRemark,
    OfferContentCard,
    UniIcons,
    OfferHead,
    BackContainer,
  },
  data() {
    return {
			id: '',
			showConfirm: true,
			order: {},
			totalAmount: 0,
			memberList: [],
    };
  },
	onLoad(option) {
		if (option.id) {
			this.id = option.id;
			this.queryOrderInfo();
			this.queryTotalAmount();
			this.queryAlreadyDistribute();
		}
	},
  methods: {
		queryOrderInfo() {
			this.$http.post('/b/orderreceive/query', { id: this.id }, true)
			.then(res => {
			  this.order = res;
				this.leaderFlag = res.leaderFlag == 1;
			})
		},
		queryTotalAmount() {
			this.$http.post('/b/ordersettlement/queryCanSettlementAmount', { id: this.id }, true)
			.then(res => {
				this.totalAmount = res;
			})
		},
		queryAlreadyDistribute() {
			this.$http.post('/b/ordersettlement/queryTeamMemberDistributorAmountList', { id: this.id }, true)
			.then(res => {
				this.memberList = res;
				const user = this.$store.state.user;
				let mySelf = (res || []).filter((m) => m.id == user.id);
				// this.showConfirm = mySelf[0].confirmState != 1 && mySelf[0].confirmState != 2;
			})
		},
		changePrice(person) {
			uni.showModal({
				title: '分配金额',
				editable: true,
				placeholderText: '请输入分配金额',
				success: (res) => {
					if (res.confirm) {
						person.amount = Number(res.content) * 100;
					}
				}
			})
		},
		getQuoteCount(type) {
			const distributeList = this.memberList.filter((w) => w.amount);
			let amount = 0;
			distributeList.forEach((q) => {
				amount = amount + Number(q.amount);
			})
			if (type == 1) {
				// 已分配
				return distributeList.length;
			} else if (type == 2) {
				// 未分配
				return this.memberList.length - distributeList.length;
			} else if (type == 3) {
				// 已分配金额
				return amount / 100;
			} else {
				// 未分配金额
				return (this.totalAmount - amount) / 100;
			}
		},
		cancelDistribute() {
			uni.navigateBack({});
		},
		// 队长分配收益
		submitDistribute() {
			const params = {
				receiverOrderId: this.id,
				distributorInfoList: this.memberList.map((m) => {
					return { distributorAmount: m.amount, customerId: m.id }
				}),
			};
			this.$http.post('/b/ordersettlement/teamOrderAmountDistributor', params, true)
			.then(res => {
			  uni.showToast({
			  	title: '分配收益成功',
					success: () => {
						uni.navigateBack({});
					}
			  })
			})
		},
		// 队员确认分配收益
		confirmDistribute() {
			this.$http.post('/b/ordersettlement/confirm', { id: this.id }, true)
			.then(res => {
			  uni.showToast({
			  	title: '确认分配收益成功',
					success: () => {
						uni.navigateBack({});
					}
			  })
			})
		},
		// 队员拒绝分配收益
		refuseDistribute() {
			this.$http.post('/b/ordersettlement/refuse', { id: this.id }, true)
			.then(res => {
			  uni.showToast({
			  	title: '拒绝分配收益成功',
					success: () => {
						uni.navigateBack({});
					}
			  })
			})
		},
  }
}
</script>
<style lang="scss">
.offer {
  padding-bottom: 34rpx;

  .ind-1 {
    @include flexBetween;
    height: 96rpx;
    background-color: white;
    padding: 24rpx 32rpx;
    box-sizing: border-box;

    .ind-12 {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #969799;
      line-height: 36rpx;
    }

    .ind-11 {
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

.ind-5 {
  background-color: white;
  margin: 30rpx 0 32rpx 0;

  .ind-51 {
    width: 750rpx;
    height: 88rpx;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
  }

  .ind-52 {
    margin-left: 32rpx;
    border-top: 1rpx solid #EAECEF;
    border-bottom: 1rpx solid #EAECEF;
  }
}

.ind-8 {
  display: flex;
  align-items: center;
  height: 80rpx;
  background: #FFFBE8;

  .ind-81 {
    margin: 0 12rpx 0 32rpx;
  }
}

</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

.placeholder-class {
  font-size: 28rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #828282;
  line-height: 36rpx;
}
</style>
