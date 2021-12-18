<template>
  <view>
    <custom-navbar title="帮助详情" />

    <back-container>
      <view class="help-detail">
        <view class="h-detail1">复工复产，如何做好一天的防护</view>
        <view class="h-detail2">2021-10-24 10:00</view>
        <view class="h-detail3">毫无疑问，比亚迪在中国新能源市场的表现，已经与特斯拉平分秋色，甚至在销量层面已经赶超特斯拉。
          然而在几年前，特斯拉还未曾将比亚迪当过对手，甚至马斯克对比亚迪的印象为：没有什么好产品。
          日前，有网友扒出一段数年前的视频，关于马斯克接受采访，对特斯拉评价的内容。
          主持人问道：你如何评价比亚迪，马斯克没有直接回答，反而是直接大笑。随后又反问道，你见过比亚迪的车辆吗？“我不认为比亚迪有什么好的产品”，这也是马斯克对比亚迪最原始的印象之一。
        </view>

        <view class="h-detail4">
          <upload-list
              hide-upload-btn
              :show-delete="false"
              :img-list="[
                  'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-back.png',
                  'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-back.png',
              ]"
          />
        </view>
      </view>
    </back-container>
  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import UploadList from "../../receive-order/component/uploadList";

export default {
  name: "helpDetail",
  components: { UploadList, BackContainer }
}
</script>
<style lang="scss">
.help-detail {
  .h-detail1 {
    margin: 45rpx 32rpx 20rpx 32rpx;
    text-align: center;
    font-size: 36rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #323335;
    line-height: 44rpx;
  }

  .h-detail2 {
    font-size: 24rpx;
    padding-bottom: 32rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 32rpx;
    text-align: center;
  }

  .h-detail3 {
    padding: 32rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
    line-height: 48rpx;
    border-top: 1rpx solid #ECEDF9;
    border-bottom: 1rpx solid #ECEDF9;
  }

  .h-detail4 {
    padding: 32rpx 16rpx 16rpx 32rpx;
  }
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
