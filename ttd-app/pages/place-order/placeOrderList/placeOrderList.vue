<template>
  <view>
    <custom-navbar title="发单列表" />

    <back-container>
      <template #headerSlot>

        <state-tab-list @change="changeVal" :active-value="value" />
      </template>

      <view class="plo-list">
        <view class="plo-item" v-for="i in 3" :key="i">
          <view class="plo-itop">
            <text class="plo-itop-name">安装</text>
            <text class="plo-itop-state">待报价</text>
          </view>

          <view class="plo-imiddle">
            <view class="state1-tip">
              <text class="plo-im-c">距离报价结束还有</text>
              <text class="plo-im-r">2</text>
              <text class="plo-im-c">天</text>
              <text class="plo-im-num">12</text>
              <text class="plo-im-mao">:</text>
              <text class="plo-im-num">12</text>
              <text class="plo-im-mao">:</text>
              <text class="plo-im-num">12</text>
            </view>
          </view>

          <view class="plo-content">
            <view class="plo-ct">报价周期：2021-09-09 至 2021-10-09</view>
            <view class="plo-ct">工作周期：2021-12-01 至 2021-12-09</view>
            <view class="plo-ct">工作地址： 江苏省 南京市 雨花台区 新兴路 12号</view>
            <view class="plo-ct">工作内容：交换机、路由器、摄像头</view>
          </view>

          <view class="plo-bottom">
            <view class="plo-btn1">取消订单</view>
            <view class="plo-btn1">查看问题</view>
          </view>

        </view>
      </view>
    </back-container>
  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import StateTabList from "./stateTabList";

export default {
  components: { StateTabList, BackContainer },
  data() {
    return {
      value: 1
    };
  },
  methods: {
    changeVal(val) {
      this.value = val
    }
  }
}
</script>

<style lang="scss" scoped>
.plo-list {
  background-color: #F3F4F5;

  .plo-item {
    margin-bottom: 32rpx;
    background-color: white;

    .plo-itop {
      height: 88rpx;
      @include flexBetween;
      padding-right: 32rpx;
      margin-left: 32rpx;
      border-bottom: 1rpx solid #EAECEF;

      .plo-itop-name {
        font-size: 32rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .plo-itop-state {
        padding: 0 16rpx;
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

    .plo-imiddle {
      .state1-tip {
        box-sizing: border-box;
        height: 80rpx;
        background: #FFFBE8;
        margin: 15rpx 32rpx;
        padding: 24rpx 32rpx;

        .plo-im-c {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;

          &:nth-child(2) {
            padding-right: 20rpx;
          }
        }

        .plo-im-r {
          margin: 0 6rpx;
          color: #FF3B30;
        }

        .plo-im-num {
          width: 40rpx;
          height: 40rpx;
          background: #FF3B30;
          border-radius: 8rpx;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          margin: 0 6rpx;
        }

        .plo-im-mao {
          width: 34rpx;
          height: 32rpx;
          text-align: center;
        }
      }
    }

    .plo-content {
      margin: 0 32rpx;
      padding: 16rpx 32rpx;
      min-height: 240rpx;
      box-sizing: border-box;
      background: #F3F4F5;

      .plo-ct {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 52rpx;
      }
    }

    .plo-bottom {
      display: flex;
      justify-content: flex-end;
      padding: 32rpx;

      .plo-btn1 {
        min-width: 172rpx;
        height: 64rpx;
        border-radius: 32rpx;
        border: 2rpx solid #EDEDED;
        margin-left: 8rpx;
        @include flexCenter;
      }
    }
  }
}
</style>


<style lang="scss">
@import "../../mine/addressManage/_grayPageStyle.scss";

</style>
