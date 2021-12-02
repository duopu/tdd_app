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

        <quoted-iten />

        <add-remark @input="input" :value="remark1" />
      </view>
    </back-container>

    <view class="order-fini-5">
      <view class="fini-51">
        <text class="fini-51l">订单金额</text>
        <view class="fini-51r">
          <my-price show-yang price="2332.22" scale="1" />
        </view>
      </view>

      <view class="fini-51">
        <text class="fini-51l">优惠券</text>
        <text class="fini-51m">请选择</text>
        <uni-icons type="arrowright" size="17" color="#969799" />
      </view>

      <view class="fini-51">
        <text class="fini-51l">
          积分（
          <text class="fini-51l-red">5000</text>
          ）
        </text>
        <text class="fini-51m">请选择</text>
        <uni-icons type="arrowright" size="17" color="#969799" />
      </view>

      <view class="fini-51">
        <text class="fini-51l">订单金额</text>
        <text class="fini-51m">请选择</text>
        <uni-icons type="arrowright" size="17" color="#969799" />
      </view>


      <view class="fini-51">
        <text class="fini-51l">订单金额</text>
        <view class="fini-51m">
          <checkd-item label="发票类型" :value="value22" @change="change" />
        </view>
      </view>

    </view>

    <view class="fini-5tips">不同发票类型支付的额外费用不同</view>


    <view class="order-fini-5">
      <view class="fini-51">
        <text class="fini-51l">支付方式</text>
      </view>

      <view class="fini-51" v-for="i in payList" :key="i.value" @click="changePayWay(i.value)">
        <image :src="i.picPath" class="bank-img-style" />
        <text class="fini-51l fini-51kl">{{ i.label }}</text>
        <text class="fini-51m" />
        <image v-if="payWay == i.value" src="/static/mine/radioSelect.svg" class="circle-filled1" />
        <image v-else src="/static/mine/radioEmpty.svg" class="circle-filled1" />
      </view>

    </view>


    <view class="order-fini-botb" />

    <iphonex-bottom>
      <view class="order-fini-btn-box">
        <text class="order-fini-total-fee">总金额：</text>
        <my-price price="8000.00" />
        <view class="order-fini-calcel">取消</view>
        <view class="order-fini-sure">确定选价</view>
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
      remark1: '',
      value22: 1,
      payList: [
        { label: '银行支付', leftIcon: 'chat-filled', value: 1, picPath: '/static/mine/bankCard.svg' },
        { label: '授信支付', leftIcon: 'chat', value: 2, picPath: '/static/mine/bankPay.svg' },
        { label: '线下支付', leftIcon: 'chatboxes', value: 3, picPath: '/static/mine/bankUnderline.svg' },
      ],
      payWay: 1
    };
  },
  methods: {
    input(value) {
      this.remark1 = value;
    },
    change(data) {
      this.value22 = data
    },
    changePayWay(way) {
      this.payWay = way
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
