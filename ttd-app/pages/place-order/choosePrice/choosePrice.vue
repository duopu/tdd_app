<template>
  <view>
    <custom-navbar title="选价" />

    <back-container>

      <view class="chp">
        <view class="chp-1" v-for="(item, index) in quoteList" :key="index" @click="onChange(item)">
          <view class="chp-11">
            <image v-if="item.logo" class="chp-13" :src="item.logo" />
            <image v-else class="chp-13" src='https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png' />

            <view class="chp-14">
              <view class="chp-15">
                <text class="chp-16">{{ item.receiverName }}</text>
                <text v-if="item.receiverType == 2" class="chp-17">团队</text>
                <text v-else class="chp-171">个人</text>
              </view>
              <my-star :num="item.score"/>
              <view class="chp-18">
                <text class="chp-181">已报项：{{ item.quoteNum }}</text>
                <text class="chp-181">未报项：{{ item.unQuoteNum }}</text>
              </view>

              <view class="chp-19">
                <text class="chp-191">报价金额: </text>
                <my-price scale="0.8" :price="item.totalAmount / 100" />
              </view>
            </view>

            <image v-if="showSelect(item)" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/checkBoxChecked.svg" class="chp-193-right3" />
            <image v-else src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/checkBoxEmpty.svg" class="chp-193-right3" />

          </view>

          <view v-if="item.remark" class="chp-2">{{ item.remark }}</view>

          <view class="cps-aline" />
        </view>
      </view>
    </back-container>

    <iphonex-bottom>
      <view class="chp-b1">
        <view class="chp-b2">
          <text class="chp-b21">已选报价</text>
          <corner-mark class-name="mark-marr" :num="selectCount" color="#2C3580" />
          <text class="chp-b21">份（已报 {{ showCount(1) }} 项，未报 {{ showCount(2) }} 项，重复 {{ showCount(3) }} 项）</text>
        </view>
        <view class="chp-b3">
          <text class="chp-b31">总金额：</text>
          <my-price :price="showCount(4)" scale="0.9" />
          <view class="chp-b32 chp-b321" @click="cancelChoose">取消选价</view>
          <view class="chp-b32" @click="confirmPrice">确认选价</view>
        </view>
      </view>
    </iphonex-bottom>

    <!-- 确定选价 -->
    <modal-box ref="choosePriceModal" @confirm="confirmPrice">
      <template #slot1>
        <view class="choose-price-slot">
          <view class="yellow-text">
            你选择的报价中有
            <text class="yellow-text-red">{{ showCount(2) }}</text>
            项未有报价，你可以将未报价的部分单独发包。
          </view>

          <view class="checked-bsx">
            <checkd-item :label="' '" :value="remainItemSetting" @change="((value) => { remainItemSetting = value })" :list="[{ text: '未报项单独发包', value: 2 }, { text: '关闭未报项', value: 1 }]" />
          </view>
        </view>
      </template>
    </modal-box>

  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import MyStar from "../../receive-order/myTeam/myStar";
import MyPrice from "../../receive-order/component/myPrice";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import CornerMark from "../../receive-order/component/cornerMark";
import ModalBox from "./modalBox";
import CheckdItem from "../placeOrder/checkdItem";

export default {
  name: "choosePrice",
  components: { CheckdItem, ModalBox, CornerMark, IphonexBottom, UniIcons, MyPrice, MyStar, BackContainer },
  data() {
    return {
			id: '',
			orderId: '',
			itemCount: 0,
			quoteList: [],
			selectCount: 0,
      remainItemSetting: 1,
			selectList: [],
    };
  },
	onLoad(option) {
		if (option.id) {
		  this.id = option.id;
			this.queryQuoteList();
		}
		if (option.orderId) {
		  this.orderId = option.orderId;
		}
		if (option.itemCount) {
		  this.itemCount = Number(option.itemCount);
		}
	},
	methods: {
		queryQuoteList(id) {
			this.$http.post('/b/orderquote/choosePriceList', { id: this.id }, true)
			.then(res => {
			  this.quoteList = res;
			})
		},
		showSelect(quote) {
			const index = this.selectList.findIndex((q) => q.id == quote.id);
			return index != -1;
		},
		onChange(quote) {
			const index = this.selectList.findIndex((q) => q.id == quote.id);
			if (index == -1) {
				this.selectList.push(quote);
			} else {
				this.selectList.splice(index, 1);
			}
			this.selectCount = this.selectList.length;
		},
		showCount(type) {
			let count = 0;
			let amount = 0;
			let arr = [];
			this.selectList.forEach((q) => {
				amount  = amount + q.totalAmount;
				count  = count + q.quoteNum;
				arr = arr.concat(q.itemIdList);
			})
			const set = new Set(arr);

			if (type == 1) {
				return count;
			} else if (type == 2) {
				return this.itemCount - set.size;
			} else if (type == 3) {
				return arr.length - set.size;
				// const repeat = arr.reduce((prev, next) => {
				// 	prev[next] = (prev[next] + 1) || 1;
				// 	return prev;
				// }, {});
				// console.log('repeat ', repeat);
				// let repeatCount = 0;
				// Object.values(repeat)..forEach((num) => {
				// 	repeatCount = repeatCount + (num - 1);
				// })
				// return repeatCount;
			}
			return amount / 100;
		},
		toQuoteDetail(item) {
			uni.navigateTo({
				url: `/pages/receive-order/offer/offer?isPlaceOrder=1&id=${item.receiveOrderId}`,
			})
		},
		cancelChoose() {
			uni.navigateBack({});
		},
		onConfirm() {
			const unQuote = this.showCount(2);
			if (unQuote > 0) {
				this.$refs.choosePriceModal.show();
			} else {
				uni.showModal({
					title: '提示',
					content: '您确定提交选价吗?',
					success: (res) => {
						if (res.confirm) {
							this.confirmPrice();
						}
					}
				})
			}
		},
		confirmPrice() {
			const unQuote = this.showCount(2);
			const params = {
				orderMasterId: this.id,
				quoteIdList: this.selectList.map((q) => q.id),
				remainItemSetting: unQuote > 0 ? this.remainItemSetting : undefined, // 确认报价后剩余工作项设置 1 关闭 2 单独发包
			}
			this.$http.post('/b/orderquote/confirmQuote', params, true)
			.then(res => {
				this.$refs.choosePriceModal.hide();
			  // 跳转支付订单
				uni.redirectTo({
					url: `/pages/place-order/orderPay/orderPay?id=${this.orderId}`,
				})
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.chp-1 {
  padding: 32rpx 0 0 32rpx;
  box-sizing: border-box;

  .chp-11 {
    padding-right: 32rpx;
    display: flex;

    .chp-13 {
      width: 128rpx;
      height: 128rpx;
      border-radius: 8rpx;
      margin-right: 16rpx;
    }

    .chp-14 {
      flex: 1;

      .chp-15 {
        display: flex;
        margin-bottom: 20rpx;

        .chp-16 {
          font-size: 32rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323232;
          line-height: 40rpx;
          margin-right: 16rpx;
        }

        .chp-17 {
          height: 40rpx;
          border-radius: 4rpx;
          border: 2rpx solid #2C3580;
					color: #2C3580;
          font-size: 24 rrpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          @include flexCenter;
          padding: 0 8rpx;
        }
				.chp-171 {
					height: 40rpx;
					border-radius: 4rpx;
					border: 2rpx solid #FF9500;
					color: #FF9500;
					font-size: 24 rrpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					@include flexCenter;
					padding: 0 8rpx;
				}
      }

      .chp-18 {
        margin-top: 20rpx;

        .chp-181 {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #969799;
          line-height: 36rpx;
          margin-right: 100rpx;
        }
      }

      .chp-19 {
        display: flex;
        align-items: center;
        margin: 18rpx 0;

        .chp-191 {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #969799;
          line-height: 36rpx;
        }
      }
    }

    .chp-193 {
      align-self: center;
    }

    .chp-193-right3 {
      flex-shrink: 0;
      align-self: center;
      width: 48rpx;
      height: 48rpx;
      margin: 0 0 0 16rpx;
    }
  }

  .chp-2 {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 36rpx;
    width: 542rpx;
    background: #F3F4F5;
    padding: 32rpx;
    margin: 0 32rpx 32rpx auto;
    box-sizing: border-box;
  }

  .cps-aline {
    height: 1rpx;
    background-color: #EBEDF0;
    width: 574rpx;
    margin-left: auto;
    box-sizing: border-box;
  }
}

.chp {
  margin-bottom: 300rpx;
}

.chp-b1 {
  .chp-b2 {
    height: 80rpx;
    background: #FFFBE8;
    padding: 0 32rpx;
    display: flex;
    align-items: center;

    .chp-b21 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
    }
  }

  .chp-b3 {
    height: 100rpx;
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    background: #FFFFFF;

    .chp-b31 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
    }

    .chp-b32 {
      width: 192rpx;
      height: 80rpx;
      border-radius: 40rpx;
      background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      margin-left: 20rpx;
      @include flexCenter;
    }

    .chp-b321 {
      background: white;
      border: 2rpx solid #cccccc;
      color: #999999;
      margin-left: auto;
    }
  }
}

.choose-price-slot {
  .yellow-text {
    background: rgba(255, 149, 0, 0.1);
    border-radius: 8rpx;
    padding: 26rpx 48rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
    line-height: 36rpx;

    .yellow-text-red {
      color: #FF3B30;
    }
  }

  .checked-bsx {
    padding: 20rpx 40rpx 60rpx 0;
  }
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

.mark-marr {
  margin: 0 8rpx;
}
</style>
