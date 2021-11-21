<template>
  <view>
    <custom-navbar title="接单设置" />

    <back-container>
      <view>
        <title-with-switch show-switch :switch-value="switchValue" @changeSwitch="changeSwitch" />
        <view class="order-set1">
          <view class="order-set11">
            <view class="order-set11-title">接单位置</view>
            <view class="order-set11-addr">上海市黄浦区西藏中路268号来福士广场35层1-8、36层5-8</view>
          </view>
          <text class="order-set12">修改</text>
          <uni-icons size="20" type="arrowright" color="#969799" />
        </view>
      </view>
    </back-container>

    <view class="order-set2">
      <title-with-switch show-switch :switch-value="switchValue" title="开启无范围限制接单" @changeSwitch="changeSwitch" />

      <view class="order-set21">
        <view class="order-set21-title">接单范围</view>
        <input placeholder="请输入" class="input-so" placeholder-class="placeholder-class" />
        <text class="order-set2-unit">公里</text>
      </view>
    </view>

    <iphonex-bottom>
      <big-btn />
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import TitleWithSwitch from "../myTeam/titleWithSwitch";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "orderToSet",
  components: { BigBtn, IphonexBottom, TitleWithSwitch, BackContainer },
  data() {
    return {
      switchValue: false,
    };
  },
  methods: {
    changeSwitch() {
      this.switchValue = !this.switchValue
    }
  }
}
</script>

<style lang="scss" scoped>
.order-set1 {
  padding: 28rpx 32rpx 28rpx 32rpx;
  display: flex;
  align-items: center;

  .order-set11 {
    flex: 1;

    .order-set11-title {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }

    .order-set11-addr {
      margin-top: 18rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 32rpx;
    }
  }

  .order-set12 {
    padding: 0 18rpx 0 100rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
    line-height: 40rpx;
  }

}

.order-set2 {
  margin-top: 32rpx;
  background-color: white;

  .order-set21 {
    height: 88rpx;
    @include flexBetween;
    padding: 0 32rpx;

    .order-set21-title {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }

    .input-so {
      flex: 1;
      text-align: right;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #BDBDBD;
    }

    .order-set2-unit {
      padding-left: 8rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
    }
  }
}

/deep/ .input-placeholder {
  font-size: 28rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #BDBDBD;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

</style>
