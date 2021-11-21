<template>
  <view class="receipt">
    <custom-navbar title="发单子页" />

    <back-container>
      <template #headerSlot>
        <offer-head text="添加维修和实施工作" />
      </template>

      <view class="receipt-addr">
        <view class="receipt-ac-item">
          <view class="receipt-ac-lable">下单模式</view>
          <view class="receipt-ac-midle">请选择</view>
          <uni-icons class="receipt-ac-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="receipt-ac-item">
          <view class="receipt-ac-lable">承接人手机号</view>
          <input class="receipt-ac-midle" placeholder="可选输入" placeholder-class="input-placeholder" />
        </view>

        <view class="receipt-ac-item">
          <view class="receipt-ac-lable">报价周期</view>
          <view class="receipt-ac-midle">9/23 - 11/22</view>
          <uni-icons class="receipt-ac-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="receipt-ac-item">
          <view class="receipt-ac-lable">工作周期</view>
          <view class="receipt-ac-midle">9请选择</view>
          <uni-icons class="receipt-ac-right" type="arrowright" size="18" color="#969799" />
        </view>

        <checkd-item :value="value111" @change="change" />

      </view>
    </back-container>

    <view class="address-box">
      <member-title title="工作地址：" :show-right="false" />
      <view class="address-bi">
        <image :src="MDicon" class="address-img" />
        <view class="address-right">
          <view class="address-rt">
            <text class="address-rt1">李元霸</text>
            <text class="address-rt2">13251441886</text>
            <uni-icons type="arrowright" size="18" color="#969799" />
          </view>
          <view class="address-rb">江苏省 南京市 雨花台区 铁心桥街道大周路32号软件谷科创城</view>
        </view>
      </view>
    </view>

    <view class="require-box">
      <member-title title="工作需求：" right-text="添加工作" />
      <view class="require-white">
        <offer-content-card v-for="(i, index) in 5" :key="i" right-type="0"
                            :show-last-border-bottom="index < (5 -1)" />
      </view>
    </view>

    <iphonex-bottom>
      <big-btn />
    </iphonex-bottom>
  </view>
</template>

<script>
import MDicon from '../../../static/mine/MDicon.png';
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../../receive-order/component/offerHead";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";
import CheckdItem from "./checkdItem";
import MemberTitle from "../../receive-order/myTeam/memberTitle";
import OfferContentCard from "../../receive-order/component/offerContentCard";

export default {
  name: 'receiptOrderZy',
  components: { OfferContentCard, MemberTitle, CheckdItem, BigBtn, IphonexBottom, OfferHead, BackContainer },
  data() {
    return {
      value111: 1,
      MDicon,
    }
  },
  methods: {
    change(data) {
      this.value111 = data
    },
    operateSave() {
      console.log('operateSave');
    },
    operateDel() {
      console.log('operateDel');
    },
  }
}
</script>
<style lang="scss" scoped>
.receipt {
  .receipt-addr {
    box-sizing: border-box;
    padding: 15rpx 0 0 32rpx;

    .receipt-ac-item {
      display: flex;
      align-items: center;
      height: 88rpx;
      padding-right: 32rpx;

      &:not(:nth-last-child(1)) {
        border-bottom: 1rpx solid #EBEDF0;
      }

      .receipt-ac-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .receipt-ac-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }

      .receipt-ac-right {
        padding-left: 18rpx;
      }
    }
  }

  /deep/ .input-placeholder {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
  }

  .address-box {
    margin-top: 16rpx;

    .address-bi {
      padding: 32rpx;
      background-color: white;
      display: flex;

      .address-img {
        flex-shrink: 0;
        width: 96rpx;
        height: 96rpx;
        background: #F3F4F5;
        border-radius: 8rpx;
        margin-right: 16rpx;
      }

      .address-right {
        flex: 1;

        .address-rt {
          display: flex;
          align-items: center;

          .address-rt1 {
            flex: 1;
            font-size: 28rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #323232;
            line-height: 40rpx;
          }

          .address-rt2 {
            flex-shrink: 0;
            font-size: 28rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #969799;
            line-height: 36rpx;
          }
        }

        .address-rb {
          width: 414rpx;
          margin-top: 16rpx;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #969799;
          line-height: 36rpx;
        }
      }
    }
  }

  .require-box {
    margin: 16rpx 0 200rpx 0;

    .require-white {
      background-color: white;
      padding-left: 32rpx;
    }
  }
}
</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
