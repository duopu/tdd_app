<template>
  <view>
    <custom-navbar title="承接方申请" />

    <view class="upa-list">
      <view class="upa-item" v-for="j in 2" :key="j">
        <view class="upa-item-2">胡一刀</view>

        <view class="upa-item-1">
          <view class="upa-item-31">
            <view class="upa-item-3">
              <view class="upa-item-4">介绍：</view>
              <view class="upa-item-5">上海金发科技发展有限公司上海金发科技发展有限公司</view>
            </view>
            <view class="upa-item-3">
              <view class="upa-item-4">技能：</view>
              <view class="upa-item-9">
                <view class="upa-item-10" v-for="i in 3" :key="i">技能</view>
              </view>
            </view>
            <view class="upa-item-3">
              <view class="upa-item-4">岗位：</view>
              <view class="upa-item-5">2021-10-09 03:58</view>
            </view>
            <view class="upa-item-3">
              <view class="upa-item-4">项目：</view>
              <view class="upa-item-5">描述信息</view>
            </view>
            <view class="upa-item-3">
              <view class="upa-item-4">设备：</view>
              <view class="upa-item-5">描述信息</view>
            </view>
          </view>

          <image class="upa-item-7"
                 :src="`https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/${j == 1 ? 'refused-icon' : 'pass-icon11'}.svg`" />
        </view>

        <view class="upa-item-8" v-if="j == 1">原因：已处理了相关人与事</view>

      </view>
    </view>

    <iphonex-bottom>
      <big-btn button-text="提交申请" />
    </iphonex-bottom>
  </view>
</template>
<script>
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BigBtn from "../addressManage/component/bigBtn";
export default {
  name: "undertakePartyApply",
  components: { BigBtn, IphonexBottom },
  data() {
    return {};
  }
}
</script>
<style lang="scss" scoped>
.upa-list {
  padding-bottom: 200rpx;
  .upa-item {
    background-color: white;
    padding: 32rpx;
    box-sizing: border-box;
    margin-bottom: 32rpx;

    .upa-item-2 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }

    .upa-item-1 {
      display: flex;

      .upa-item-31 {
        flex: 1;

        .upa-item-3 {
          margin-top: 16rpx;
          display: flex;

          .upa-item-4 {
            flex-shrink: 0;
            font-size: 24rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #828282;
            line-height: 36rpx;
          }

          .upa-item-5 {
            font-size: 24rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #828282;
            line-height: 36rpx;
          }

          .upa-item-9 {
            display: flex;

            .upa-item-10 {
              margin-right: 8rpx;
              padding: 0 12rpx;
              @include flexCenter;
              height: 40rpx;
              border-radius: 8rpx;
              border: 2rpx solid #EDEDED;
            }
          }
        }
      }

      .upa-item-7 {
        align-self: center;
        flex-shrink: 0;
        width: 128rpx;
        height: 128rpx;
        margin: 0 16rpx 0 56rpx;
      }
    }

    .upa-item-8 {
      margin-top: 32rpx;
      width: 686rpx;
      box-sizing: border-box;
      padding: 22rpx 32rpx;
      background: #FFFBE8;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FF3B30;
      line-height: 36rpx;
    }
  }
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
