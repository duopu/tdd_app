<template>
  <view>
    <custom-navbar title="报价" />

    <back-container>
      <template #headerSlot>
        <offer-head :title="$tool.orderType(order.orderType)" :text="`订单编号：${order.id}`" />
      </template>

      <view class="offer">

        <quoted-iten :order="order"/>
		
      </view>

    </back-container>

    <view class="offer-8900" v-if="order.receiverType == 2">
      <member-title title="参与人员" :show-right="!isPlaceOrder" right-text="选择人员" @add="toSelectPerson"/>
      <team-list-item v-for="(i, index) in memberList"
			 :key="i.userId"
			 :member="i" 
			 :showDelete="!isPlaceOrder" 
			 @onDelete="removePerson(i)" 
			 @onClick="toPersonDetail(i)"
			/>
    </view>

    <view class="offer-5">
      <view class="offer-51">工作内容</view>
      <view class="offer-52">
        <offer-content-card
				 v-for="(item, index) in showWorkList"
				:key="index"
				:right-type="isPlaceOrder ? 5 : item.quoteAmount ? 1 : 2"
				:title="getItemTitle(item)"
				:specItem="getSpecList(item)"
				:price="item.quoteAmount / 100"
        :show-last-border-bottom="index < (showWorkList.length - 1)"
				@onChange="changeQuote(item)"
				/>
      </view>
      <view v-if="workList.length > 5" class="offer-53" @click="showWork">
        <text class="offer-531">{{ showWorkMore ? '收起' : '展开更多' }}</text>
        <uni-icons class="oc-arrow" type="arrowright" size="20" color="#BDBDBD" />
      </view>
    </view>

    <view class="offer-7">
      <add-remark @input="inputChange" :value="remark" />
    </view>

    <view style="height: 300rpx" />

    <iphonex-bottom v-if="!isPlaceOrder">
      <bottom-price-and-btn :price="getQuoteCount(3)" @onCancel="cancelQuote" @onConfirm="submitQuote">
        <view class="offer-8">
          <text class="offer-81">已报价</text>
          <corner-mark :num="getQuoteCount(1)" />
          <text class="offer-81">未报价</text>
          <corner-mark :num="getQuoteCount(2)" color="#828282" />
        </view>
      </bottom-price-and-btn>
    </iphonex-bottom>

  </view>
</template>
<script>
import config from '../../../utils/config.js';
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
import MemberTitle from "../myTeam/memberTitle";
import TeamListItem from "../myTeam/teamListItem";

export default {
  name: "offer",
  components: {
    TeamListItem,
    MemberTitle,
    BottomPriceAndBtn,
    QuotedIten,
    MyPrice,
    CornerMark,
    IphonexBottom,
    AddRemark,
    OfferContentCard,
    UniIcons,
    OfferHead,
    BackContainer
  },
  data() {
    return {
			id: '',
			isPlaceOrder: false,
			order: {},
			workList: [],
      memberList: [],
			showWorkList: [],
			showWorkMore: false,
      remark: ''
    };
  },
	onLoad(option) {
		if (option.isPlaceOrder) {
			this.isPlaceOrder = option.isPlaceOrder ==  '1';
		}
		if (option.id) {
		  this.id = option.id;
			this.queryOrderInfo();
			this.queryWorkList();
		}
		if (this.isPlaceOrder) {
			this.queryMemberList();
		}
	},
  methods: {
		queryOrderInfo() {
			this.$http.post('/b/orderreceive/query', { id: this.id }, true)
			.then(res => {
			  this.order = res;
				this.remark = res.receiveRemark || '';
			})
		},
		queryWorkList() {
			this.$http.post('/b/orderquote/receiveQuoteDetail', { id: this.id }, true)
			.then(res => {
			  this.workList = res.orderItemList;
				this.showWorkList = this.workList.slice(0, 5);
				console.log('showWorkList ', this.showWorkList);
			})
		},
		queryMemberList() {
			this.$http.post('/b/ordermember/queryMemberListAndApplyInfo', { id: this.id }, true)
			.then(res => {
				this.memberList = (res.applyMemberList || []).map((m) => {
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
    inputChange(value) {
      this.remark = value;
    },
		showWork() {
			this.showWorkMore = !this.showWorkMore;
			if (this.showWorkMore) {
				this.showWorkList = this.workList;
			} else {
				this.showWorkList = this.workList.slice(0, 5);
			}
		},
		changeQuote(work) {
			uni.showModal({
				title: '设置报价',
				editable: true,
				placeholderText: '请输入报价',
				success: (res) => {
					if (res.confirm) {
						work.quoteAmount = Number(res.content) * 100;
						console.log('res ', res.content, work);
					}
				}
			})
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
		getQuoteCount(type) {
			const quoteList = this.workList.filter((w) => w.quoteAmount);
			if (type == 1) {
				// 已报价
				return quoteList.length;
			} else if (type == 2) {
				// 未报价
				return this.workList.length - quoteList.length;
			} else {
				// 已报价金额
				let amount = 0;
				quoteList.forEach((q) => {
					amount = amount + Number(q.quoteAmount);
				})
				return amount / 100;
			}
		},
		toSelectPerson() {
			uni.navigateTo({
				url: `/pages/receive-order/selectPerson/selectPerson`,
				events: {
					onSelect: (members) => {
						this.memberList = members;
					}
				}
			})
		},
		removePerson(person) {
			if (this.isPlaceOrder) return;
			const index = this.memberList.findIndex((p) => p.userId == person.userId);
			this.memberList.splice(index, 1);
		},
		toPersonDetail(person) {
			uni.navigateTo({
				url: `/pages/receive-order/peopleDetail/peopleDetail?id=${person.userId}`
			})
		},
		cancelQuote() {
			uni.navigateBack({});
		},
		submitQuote() {
			uni.showModal({
				title: '提示',
				content: '参与报价需要缴纳报价金额的5%作为保证金,正常开工或者流标之后保证金退回',
				success: (res) => {
					if (res.confirm) {
						this.createQuote();
					}
				}
			})
		},
		createQuote() {
			const params = {
				receiveOrderId: this.id,
				orderQuoteList: this.workList.map((w) => {
					return { price: w.quoteAmount, workId: w.id }
				}),
				memberIdList: this.memberList.map(p=> p.userId),
				remark: this.remark,
			};
			this.$http.post('/b/orderquote/createQuote', params, true)
			.then(res => {
			  // 如果支付金额是0,则不需要缴纳, 大于0,需要缴纳保证金
				if (res.payCash > 0) {
					this.payOrder(res.id);
				} else {
					uni.showToast({
						title: '报价完成',
						success: () => {
							uni.navigateBack({});
						}
					})
				}
			})
		},
		// 支付保证金
		payOrder(orderId) {
			const user = this.$store.state.user;
			const params = {
				appId: config.appId,
				openId: user.openId,
				orderId: orderId,
				wayId: 12, // 12、宁波银行微信小程序支付
			}
			this.$http.post('/core/pay/build4ReceiveOrder', params, true)
			.then(res => {
				// todo:吊起微信支付
				// this.wxPay(res.payResult);

				uni.showToast({
					title: '订单支付完成',
					success: () => {
						uni.navigateBack({});
					}
				})
			})
		},
		wxPay(res) {
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: String(Date.now()),
				nonceStr: 'A1B2C3D4E5',
				package: 'prepay_id=wx20180101abcdefg',
				signType: 'MD5',
				paySign: '',
				success: (res) => {
				    console.log('success:' + JSON.stringify(res));
						uni.showToast({
							title: '订单支付完成',
							success: () => {
								uni.navigateBack({});
							}
						})
				},
				fail: function (err) {
				    console.log('fail:' + JSON.stringify(err));
						uni.showToast({ title: '订单支付完成', });
				},
			});
		}
  }
}
</script>
<style lang="scss">
.offer {
  padding-bottom: 34rpx;

  .offer-1 {
    width: 750rpx;
    height: 96rpx;
    background-color: white;
    padding: 24rpx 32rpx;
    box-sizing: border-box;

    .offer-11 {
      margin-left: auto;
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
  }

}

.offer-5 {
  background-color: white;
  margin: 30rpx 0 32rpx 0;

  .offer-51 {
    width: 750rpx;
    height: 88rpx;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
  }

  .offer-52 {
    margin-left: 32rpx;
    border-top: 1rpx solid #EAECEF;
    border-bottom: 1rpx solid #EAECEF;
  }

  .offer-53 {
    height: 80rpx;
    padding: 0 32rpx;
    @include flexBetween;
    background: #FFFFFF;

    .offer-531 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #1889F9;
    }
  }
}

.offer-7 {
  background-color: white;
  padding-bottom: 32rpx;
}

.offer-8 {
  display: flex;
  align-items: center;
  height: 80rpx;
  background: #FFFBE8;

  .offer-81 {
    margin: 0 12rpx 0 32rpx;
  }
}

.offer-8900 {
  background-color: white;
  margin: 32rpx 0;
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
