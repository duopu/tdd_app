<template>
  <view>
    <custom-navbar title="收益分配" />

    <back-container>
      <template #headerSlot>
        <offer-head />
      </template>

      <view class="offer">

        <view class="ind-1">
          <view class="ind-12">
            <text>订单金额：</text>
            <my-price :scale="0.9" price="8000.00" />
          </view>
          <view class="ind-11">待完成</view>
        </view>

        <quoted-iten />

        <add-remark @input="input" :value="remark1" />
      </view>

    </back-container>

    <view class="ind-5">
      <view class="ind-51">工作人员</view>
      <view class="ind-52">
        <offer-content-card
            v-for="(i, index) in 5"
            :key="i"
            :right-type="i"
            :show-last-border-bottom="index < (5 -1)"
        />
      </view>
    </view>

    <view style="height: 300rpx" />

    <iphonex-bottom>
      <bottom-price-and-btn all-text="已分配" sure-text="确认分配" :price="122.01">
        <view class="ind-8">
          <text class="ind-81">已分配</text>
          <corner-mark num="3" />
          <text class="ind-81">未分配</text>
          <corner-mark num="4" color="#828282" />
          <text class="ind-81">未分配金额:</text>
          <my-price price="3129.21" :scale="0.8" />
        </view>
      </bottom-price-and-btn>
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

export default {
  name: "incomeDistribute",
  components: {
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
