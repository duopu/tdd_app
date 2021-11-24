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

        <quoted-iten />

        <add-remark @input="input" :value="remark1" />
      </view>
    </back-container>

    <view class="order-dtl-5">
      <view class="order-dtl-51">工作内容</view>
      <view class="order-dtl-52">
        <offer-content-card :right-type="4" show-last-border-bottom />

        <offer-content-card :right-type="5" show-last-border-bottom />
      </view>
      <view class="order-dtl-53">
        <text class="order-dtl-531">展开更多</text>
        <uni-icons class="oc-arrow" type="arrowright" size="18" color="#969799" />
      </view>
    </view>

    <view class="order-dtl-6">
      <text class="order-dtl-6t">咨询</text>
      <text class="order-dtl-6tmid">3 个问题 4个回答</text>
      <uni-icons color="#969799" size="18" type="arrowright" />
    </view>

    <view class="order-dtl-6">
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
      remark1: ''
    };
  },
  methods: {
    input(value) {
      this.remark1 = value;
    }
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
