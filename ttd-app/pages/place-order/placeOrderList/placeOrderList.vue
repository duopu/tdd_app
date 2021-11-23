<template>
  <view>
    <custom-navbar title="发单列表" />

    <back-container>
      <template #headerSlot>

        <state-tab-list @change="changeVal" :active-value="value" />
      </template>

      <view class="plo-list">
        <view class="plo-item" v-for="i in 2" :key="i">
          <view class="plo-itop">
            <text class="plo-itop-name">安装</text>
            <text class="plo-itop-state"
                  :class="{
                    'plo-state-yellow': [2, 3, 4].includes(value),
                    'plo-state-green': [5].includes(value),
                    'plo-state-red': [6].includes(value),
                  }"
            >待报价
            </text>
          </view>

          <view class="plo-imiddle">

            <view class="state1-tip" v-if="value === 1">
              <view class="plo-im-c">距离报价结束还有</view>
              <text class="plo-im-r">2</text>
              <view class="plo-im-c plo-im-c2">天</view>
              <text class="plo-im-num">12</text>
              <text class="plo-im-mao">:</text>
              <text class="plo-im-num">12</text>
              <text class="plo-im-mao">:</text>
              <text class="plo-im-num">12</text>
            </view>

            <view class="state1-tip" v-if="value === 2">
              <view class="plo-im-c">已报价：</view>
              <corner-mark num="2" color="#2C3580" />
              <view class="plo-im-c plo-im-c2">人</view>
              <view class="plo-im-c">未报价：</view>
              <corner-mark num="3" color="#2C3580" />
              <view class="plo-im-c">人</view>
            </view>

            <view class="state1-tip" v-if="value === 3">
              <view class="plo-im-3red">等待承接方开始工作</view>
            </view>

            <view class="state1-tip" v-if="value === 6">
              <corner-mark num="!" color="#FF3B30" />
              <view class="plo-im-3red plo-im-3red-mar">取消原因：工程纠纷</view>
            </view>

          </view>

          <view class="plo-content">
            <view class="plo-ct">报价周期：2021-09-09 至 2021-10-09</view>
            <view class="plo-ct">工作周期：2021-12-01 至 2021-12-09</view>
            <view class="plo-ct">工作地址： 江苏省 南京市 雨花台区 新兴路 12号</view>
            <view class="plo-ct">工作内容：交换机、路由器、摄像头</view>
          </view>

          <view class="plo-bottom" :class="{'no-mar-bottom': [6].includes(value)}">
            <view class="plo-btn1" v-if="[1, 2, 3, 4].includes(value)">取消订单</view>
            <view class="plo-btn1" v-if="[1, 2].includes(value)">查看问题</view>
            <view class="choose-change-btn" v-if="[2].includes(value)">选价</view>
            <view class="choose-change-btn" v-if="[2].includes(value)">付款</view>
            <view class="plo-btn1" v-if="[3, 4].includes(value)">审核人员</view>
            <view class="plo-btn1" v-if="[3, 4, 5].includes(value)">投诉</view>
            <view class="plo-btn1" v-if="[5].includes(value)">开必票</view>
            <view class="plo-btn1" v-if="[5].includes(value)">去评价</view>
            <view class="choose-change-btn" v-if="[3].includes(value)">确认开始</view>
            <view class="choose-change-btn" v-if="[4].includes(value)">确认完工</view>
          </view>

        </view>
      </view>
    </back-container>
  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import StateTabList from "./stateTabList";
import CornerMark from "../../receive-order/component/cornerMark";

export default {
  components: { CornerMark, StateTabList, BackContainer },
  data() {
    return {
      value: 1
    };
  },
  computed: {
    state() {
      return 1
    }
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

      .plo-state-yellow {
        background-color: #FF9500;
      }

      .plo-state-green {
        background-color: #34C759;
      }

      .plo-state-red {
        background-color: #FF3B30;
      }
    }

    .plo-imiddle {
      .state1-tip {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 80rpx;
        background: #FFFBE8;
        margin: 15rpx 32rpx 0 32rpx;
        padding: 24rpx 32rpx;

        .plo-im-c {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
        }

        .plo-im-c2 {
          margin-right: 32rpx;
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

        .plo-im-3red {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #FF3B30;
        }

        .plo-im-3red-mar {
          margin-left: 8rpx;
        }
      }
    }

    .plo-content {
      margin: 15rpx 32rpx 32rpx 32rpx;
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
      padding: 0 32rpx 32rpx 32rpx;

      .plo-btn1 {
        padding: 0 30rpx;
        height: 64rpx;
        border-radius: 32rpx;
        border: 2rpx solid #EDEDED;
        margin-left: 8rpx;
        @include flexCenter;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #4F4F4F;
      }

      .choose-change-btn {
        padding: 0 30rpx;
        height: 64rpx;
        border-radius: 32rpx;
        border: 2rpx solid #2C3580;
        margin-left: 8rpx;
        color: #2C3580;
        @include flexCenter;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
      }
    }

    .no-mar-bottom {
      padding-bottom: 0;
    }
  }
}
</style>


<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

</style>
