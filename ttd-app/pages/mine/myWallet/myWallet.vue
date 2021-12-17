<template>
  <view class="my-wallet">
    <custom-navbar title="我的钱包" />
    <back-container>
      <template v-slot:headerSlot>
        <view class="wallet-top">
          <view class="wallet-rule" @click="showRule">查看提现规则</view>
          <view class="wallet-top-num">
            我的余额
            <uni-icons type="eye-slash-filled" class="eye-slash-filled" size="16" color="#ffffff" @click="changeShowBalanceType()"/>
          </view>
          <view class="wallet-top-ac">
            <view class="wallet-top-number">{{ showBalance ? balance : '***'}}</view>
            <view class="wallet-top-btn" @click="withdrawMoney()">提现</view>
          </view>
        </view>
      </template>

      <view class="wallet-center">
        <view class="wallet-item">
          <view class="edit-lable">收支明细</view>
          <!-- <view class="edit-midle">查看更多</view> -->
          <!-- <uni-icons class="edit-right" type="arrowright" size="18" color="#969799" /> -->
        </view>

        <view class="wallet-detail-item" v-for="(item, index) in balanceList" :key="index">
          <view class="wallet-detail-item-left">
            <view class="wallet-item-left1">{{ item.title }}</view>
            <view class="wallet-item-left2">
						{{ `${item.inOutType == 1 ? '+': '-'} ${item.inOutType == 1 ? (item.inMoney / 100) : (item.payMoney / 100) }`}}
						</view>
          </view>
          <view class="wallet-detail-item-right">
            <view class="wallet-item-right1">{{ item.addTime }}</view>
            <view class="wallet-item-right2">交易成功</view>
          </view>
        </view>
      </view>
    </back-container>

    <iphonex-bottom :show-common-area="false" />
  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BottomOperate from "../addressManage/component/bottomOperate";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";

export default {
  name: 'myWallet',
  components: { UniIcons, BottomOperate, IphonexBottom, BackContainer },
	data() {
	  return {
	    balance: 0,
			balanceList: [],
			showBalance: true,
	  };
	},
	onReady() {
		this.queryBalanceInfo();
		this.queryBalanceList();
	},
	onShow() {},
	methods: {
	  queryBalanceInfo() {
			this.$http.post('/b/account/queryBalance', { }, true)
			.then(res => {
			  this.balance = (res.balance || 0) / 100;
			})
	  },
		queryBalanceList() {
			this.$http.post('/b/account/queryBookKeepPageList', { pageSize: 5 }, true)
			.then(res => {
			  this.balanceList = res.dataList;
			})
		},
		changeShowBalanceType() {
			this.showBalance = !this.showBalance;
		},
		showRule() {
			uni.showModal({
				title: '提现规则',
				content: 'ABCDEFG',
				showCancel: false,
			})
		},
		// 提现申请
		withdrawMoney() {
			this.$http.post('/b/account/withdrawApply', { }, true)
			.then(res => {
			  uni.showToast({ title: '申请提现成功' })
			})
		}
	},
}
</script>
<style lang="scss" scoped>
.my-wallet {
  .wallet-top {
    height: 276rpx;
    box-sizing: border-box;
    padding: 30rpx 32rpx 48rpx 64rpx;

    .wallet-rule {
      font-size: 24rpx;
      text-align: right;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }

    .wallet-top-num {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 36rpx;

      .eye-slash-filled {
        margin-left: 24rpx;
      }
    }

    .wallet-top-ac {
      display: flex;
      justify-content: space-between;
      margin-top: 10rpx;

      .wallet-top-number {
        font-size: 96rpx;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 113rpx;
      }

      .wallet-top-btn {
        margin-top: 20rpx;
        width: 116rpx;
        height: 64rpx;
        border-radius: 32rpx;
        border: 2rpx solid #EDEDED;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        @include flexCenter;
      }
    }
  }

  .wallet-center {
    box-sizing: border-box;
    padding: 15rpx 32rpx 0 32rpx;

    .wallet-item {
      display: flex;
      align-items: center;
      height: 88rpx;

      .edit-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .edit-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }

      .edit-right {
        padding-left: 18rpx;
      }
    }

    .wallet-detail-item {
      padding: 28rpx 0;
      min-height: 140rpx;
      box-sizing: border-box;
      border-top: 1rpx solid #EBEDF0;

      .wallet-detail-item-left {
        @include flexBetween;

        .wallet-item-left1 {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
        }

        .wallet-item-left2 {
          font-size: 32rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 40rpx;
        }
      }

      .wallet-detail-item-right {
        margin-top: 18rpx;
        @include flexBetween;

        .wallet-item-right1 {
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
          line-height: 32rpx;
        }

        .wallet-item-right2 {
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #34C759;
          line-height: 32rpx;
        }
      }
    }
  }
}
</style>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
