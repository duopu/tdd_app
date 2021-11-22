<template>
  <view>
    <custom-navbar title="发单主页" />

    <back-container>
      <template v-slot:headerSlot>
        <view class="place-order">
          <view class="po-1" v-for="i in list" :key="i.title">
            <view class="po-11">{{ i.num }}</view>
            <view class="po-12">{{ i.title }}</view>
          </view>

          <view class="po-2" />

          <view class="po-1 po-16">
            <view class="po-11">
              <uni-icons type="email-filled" size="20" color="white" />
            </view>
            <view class="po-12 po-13">所有订单</view>
          </view>
        </view>
      </template>
    </back-container>

  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";

export default {
  components: { BackContainer },
  data() {
    return {
      list: [
        { num: 0, title: '待确认' },
        { num: 5, title: '待确认' },
        { num: 1, title: '待确认' },
        { num: 3, title: '待确认' },
      ],
    };
  }
}
</script>

<style lang="scss">
.place-order {
  display: flex;
  padding: 48rpx 36rpx 64rpx 46rpx;

  .po-1 {
    min-width: 116rpx;
    height: 116rpx;
    margin-right: 12rpx;

    .po-11 {
      font-size: 52rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 64rpx;
      text-align: center;
    }

    .po-12 {
      margin-top: 16rpx;
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      line-height: 36rpx;
    }

    .po-13 {
      margin-top: 10rpx;
    }
  }

  .po-16 {
    margin: 0 0 0 22rpx;
  }

  .po-2 {
    width: 2rpx;
    height: 104rpx;
    background: #FFFFFF;
    opacity: 0.15;
  }
}
</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
