<!-- 接单 -->
<template>
  <view>
    <!--  <coming-soon></coming-soon> -->

    <custom-navbar title="接单" :show-left-icon="false" />

    <back-container>

      <template v-slot:headerSlot>
        <view class="receive-order">
          <view class="ro-1" v-for="i in list" :key="i.title">
            <view class="ro-11">{{ i.num }}</view>
            <view class="ro-12">{{ i.title }}</view>
          </view>

          <view class="ro-2" />

          <view class="ro-1 ro-16">
            <view class="ro-11">
              <uni-icons type="email-filled" size="20" color="white" />
            </view>
            <view class="ro-12 ro-13">所有订单</view>
          </view>
        </view>
      </template>

      <view class="ro-3">
        <view class="ro-31" v-for="(i, index) in earningList" :key="i.num">
          <view class="ro-32">
            <text class="ro-33" :class="index == 1 ? 'ro-33-active' : ''">{{ i.num }}</text>
            <text class="ro-34">k</text>
          </view>
          <view class="ro-35">{{ i.title }}</view>
        </view>
      </view>

    </back-container>

    <view class="ro-4">
      <view class="ro-41">我的团队：</view>
      <uni-icons type="plus" color="#1059FA" size="18" />
      <text class="ro-43">创建团队</text>
    </view>

    <view class="ro-5">
      <view class="ro-51" v-for="i in peopleList" :key="i.name">
        <image :src="i.header || MDicon4" class="ro-52" />
        <view class="ro-53">{{ i.name }}</view>
      </view>
    </view>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
import MDicon4 from '../../../static/mine/MDicon-4.png';

export default {
  components: { UniIcons, BackContainer },
  data() {
    return {
      list: [
        { num: 0, title: '待报价' },
        { num: 5, title: '待确认' },
        { num: 1, title: '待开始' },
        { num: 3, title: '待完工' },
      ],
      earningList: [
        { num: 232331, title: '完成订单' },
        { num: 240, title: '完成订单' },
        { num: 232331, title: '完成订单' },
      ],
      peopleList: [
        { name: '钱浩然', header: '' },
        { name: '钱浩然1', header: '' },
        { name: '钱浩然2', header: '' },
        { name: '钱浩然3', header: '' },
        { name: '钱浩然4', header: '' },
        { name: '钱浩然5', header: '' },
        { name: '钱浩然6', header: '' },
      ],
      MDicon4,
    };
  },
  onReady() {
    // this.$tool.actionForLogin()
  }
}
</script>
<style lang="scss" src="./style.scss" scoped>

</style>
<style lang="scss" scoped>
.receive-order {
  display: flex;
  padding: 48rpx 36rpx 64rpx 46rpx;

  .ro-1 {
    min-width: 116rpx;
    height: 116rpx;
    margin-right: 12rpx;

    .ro-11 {
      font-size: 52rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 64rpx;
      text-align: center;
    }

    .ro-12 {
      margin-top: 16rpx;
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      line-height: 36rpx;
    }

    .ro-13 {
      margin-top: 10rpx;
    }
  }

  .ro-16 {
    margin: 0 0 0 22rpx;
  }

  .ro-2 {
    width: 2rpx;
    height: 104rpx;
    background: #FFFFFF;
    opacity: 0.15;
  }
}

.ro-3 {
  height: 195rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 78rpx;

  .ro-31 {
    .ro-32 {
      text-align: center;

      .ro-33 {
        font-size: 36rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #5AC8FA;
        line-height: 44rpx;
      }

      .ro-34 {
        font-size: 20rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 44rpx;
        color: #2C3580;
        padding-left: 8rpx;
      }

      .ro-33-active {
        font-size: 52rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 64rpx;
      }
    }

    .ro-35 {
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 36rpx;
      color: #2C3580;
    }
  }
}

.ro-4 {
  display: flex;
  height: 104rpx;
  padding: 48rpx 32rpx 16rpx 32rpx;
  box-sizing: border-box;

  .ro-41 {
    flex: 1;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
  }

  .ro-43 {
    padding-left: 12rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #1059FA;
  }
}

.ro-5 {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 748rpx;
  height: 244rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 32rpx 0 32rpx 32rpx;

  .ro-51 {
    margin-right: 32rpx;
    width: 128rpx;
    flex-shrink: 0;

    .ro-52 {
      width: 128rpx;
      height: 128rpx;
      border-radius: 8rpx;
    }

    .ro-53 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 36rpx;
      text-align: center;
      color: #323232;
    }
  }
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>