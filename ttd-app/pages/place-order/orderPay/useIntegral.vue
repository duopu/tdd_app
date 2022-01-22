<template>
  <modal-box title="使用积分数量" ref="modelBox" @confirm="onConfirm">
    <template #slot1>
      <view class="use-integral">
        <view class="use-in">
          <view class="use-in1">现有积分</view>
          <view class="use-in2">{{ balance }}</view>
        </view>

        <view class="use-in3">
          <text>使用</text>
          <view class="use-in5">
            <input class="use-in6" type="number" :value="integral ? integral : ''" @input="onInput" />
          </view>
          <text>积分，抵扣 <text class="use-in4">{{ integral / 100 }}</text>元</text>
        </view>

        <view class="use-in7">规则：1 积分兑 0.01 元，当前订单最多可使用 {{ maxIntegral }} 积分</view>
      </view>
    </template>
  </modal-box>
</template>
<script>
import ModalBox from "../choosePrice/modalBox";

export default {
  name: "useIntegral",
  components: { ModalBox },
	props: {
		balance: 0,
		maxIntegral: 0,
	},
	data() {
		return {
			integral: 0,
		}
	},
  methods: {
    show() {
      this.$refs.modelBox.show();
    },
    hide() {
      this.$refs.modelBox.hide();
    },
		onInput(e) {
			this.integral = Number(e.target.value);
		},
		onConfirm() {
			if (this.integral > this.balance) {
				uni.showToast({ title: '输入积分超过现有积分', icon: 'none' })
				return;
			}
			if (this.integral > this.maxIntegral) {
				uni.showToast({ title: '输入积分超过最大可用积分', icon: 'none' })
				return;
			}
			this.$emit('onConfirm', this.integral);
			this.$refs.modelBox.hide();
		},
  }
}
</script>
<style scoped lang="scss">
.use-integral {
  .use-in {
    width: 526rpx;
    height: 156rpx;
    box-sizing: border-box;
    padding: 26rpx;
    background: rgba(255, 149, 0, 0.1);
    border-radius: 8rpx;
    @include flexCenter;
    flex-direction: column;
    margin: auto;

    .use-in1 {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 32rpx;
    }

    .use-in2 {
      margin-top: 10rpx;
      font-size: 52rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #FF9500;
      line-height: 64rpx;
    }
  }

  .use-in3 {
    margin: 32rpx 0 0 0;
    justify-content: center;
    display: flex;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    align-items: center;

    .use-in5 {
      width: 108rpx;
      height: 56rpx;
      background: #F3F4F5;
      box-sizing: border-box;
      padding: 5rpx 20rpx;
      border-radius: 8rpx;
      margin: 0 16rpx;

      .use-in6 {

      }
    }
    .use-in4 {
      display: inline-block;
      font-size: 36rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #FF3B30;
      margin: 0 16rpx;
    }
  }

  .use-in7 {
    padding: 16rpx 0 62rpx 0;
    text-align: center;
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 32rpx;
  }
}
</style>
