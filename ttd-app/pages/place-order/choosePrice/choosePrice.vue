<template>
  <view>
    <custom-navbar title="选价" />

    <back-container>

      <view class="chp">
        <view class="chp-1" v-for="i in 4" :key="i">
          <view class="chp-11">
            <image class="chp-13" :src="MDicon" />

            <view class="chp-14">
              <view class="chp-15">
                <text class="chp-16">黑涩会</text>
                <text class="chp-17">团队</text>
              </view>
              <my-star />
              <view class="chp-18">
                <text class="chp-181">已报项：3</text>
                <text class="chp-181">未报项：2</text>
              </view>

              <view class="chp-19">
                <text class="chp-191">已报项：3</text>
                <my-price scale="0.8" price="8000.00" />
              </view>
            </view>

            <image v-if="i == 1" src="/static/mine/checkBoxChecked.svg" class="chp-193-right3" />
            <image v-else src="/static/mine/checkBoxEmpty.svg" class="chp-193-right3" />

          </view>
          <view class="chp-2">
            今天一天过得不错吧？梦想是不是更远了？
          </view>

          <view class="cps-aline" />
        </view>
      </view>
    </back-container>

    <iphonex-bottom>
      <view class="chp-b1">
        <view class="chp-b2">
          <text class="chp-b21">已选报价</text>
          <corner-mark class-name="mark-marr" num="3" color="#2C3580" />
          <text class="chp-b21">份（已报 10 项，未报 1 项，重复 4 项）</text>
        </view>
        <view class="chp-b3">
          <text class="chp-b31">总金额：</text>
          <my-price price="8000.01" scale="0.9" />
          <view class="chp-b32">确认选价</view>
        </view>
      </view>
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import MDicon from '../../../static/mine/MDicon.png';
import MyStar from "../../receive-order/myTeam/myStar";
import MyPrice from "../../receive-order/component/myPrice";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import CornerMark from "../../receive-order/component/cornerMark";

export default {
  name: "choosePrice",
  components: { CornerMark, IphonexBottom, UniIcons, MyPrice, MyStar, BackContainer },
  data() {
    return {
      MDicon
    };
  }
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
      margin-left: auto;
      @include flexCenter;
    }
  }
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

.mark-marr {
  margin: 0 8rpx;
}
</style>
