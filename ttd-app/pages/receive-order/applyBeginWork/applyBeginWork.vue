<template>
  <view>
    <custom-navbar title="申请开始工作" />

    <back-container>
      <template #headerSlot>
        <offer-head />
      </template>

      <view class="abw">
        <view class="abw-1">
          <view class="abw-12">
            <text>订单金额：</text>
            <my-price :scale="0.8" price="8000.00" />
          </view>
          <view class="abw-11">待完成</view>
        </view>

        <quoted-iten />

        <add-remark @input="input" :value="remark1" />
      </view>

    </back-container>

    <view class="abw-progress">
      <view class="abwp-title">工作进度</view>

      <view class="abwp-body">
        <view class="abwp-l">
          <image class="abwp-lt1" src="/static/mine/applyJob1.svg" />
          <view class="abwp-lt3" />
          <image class="abwp-lt1" src="/static/mine/applyJob.svg" />
        </view>
        <view class="abwp-r">
          <view class="abwp-r1">
            <text class="abwp-r1l">开始工作</text>
            <text class="abwp-r1r">重新定位</text>
          </view>
          <map class="abwp-rmap"></map>

          <view class="abwp-rmap-text">南京市玄武区新街口街道长江路社区中山路18号南京市玄武区新街口街道长江路社区中山路18号</view>

          <view class="abwp-rtime">2021-07-12 13:37</view>

          <upload-list upload-icon="2" :img-list="[1, 3, 4, 5]" />

          <view class="iamaline" />

          <view class="abwp-rend-text">结束工作</view>
        </view>
      </view>

      <view class="abwp-bottom">
        <view class="abwp-bo-1">
          <image src="/static/mine/iconCircleAdd.svg" class="apply-add-jia" />
          <view class="abwp-bo-1text">添加位置</view>
        </view>

        <upload-list upload-text="添加照片" />

        <upload-list upload-icon="2" />

      </view>
    </view>

    <view style="height: 300rpx" />

    <iphonex-bottom>
      <big-btn button-text="提交申请" />
    </iphonex-bottom>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../component/offerHead";
import AddRemark from "../component/addRemark";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import MyPrice from "../component/myPrice";
import QuotedIten from "../component/quotedIten";
import BigBtn from "../../mine/addressManage/component/bigBtn";
import MDicon from '../../../static/mine/MDicon.png';
import UploadList from "../component/uploadList";

export default {
  name: "applyBeginWork",
  components: {
    UploadList,
    BigBtn,
    QuotedIten,
    MyPrice,
    IphonexBottom,
    AddRemark,
    OfferHead,
    BackContainer
  },
  data() {
    return {
      remark1: '',
      MDicon,
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
.abw {
  padding-bottom: 34rpx;

  .abw-1 {
    @include flexBetween;
    height: 96rpx;
    background-color: white;
    padding: 24rpx 32rpx;
    box-sizing: border-box;

    .abw-12 {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #969799;
      line-height: 36rpx;
    }

    .abw-11 {
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

.abw-progress {
  background: #FFFFFF;
  margin-top: 30rpx;

  .abwp-title {
    height: 88rpx;
    @include flexBetween;
    padding: 0 32rpx 0 0;
    margin-left: 32rpx;
    border-bottom: 1rpx solid #EAECEF;
  }

  .abwp-body {
    padding: 32rpx 32rpx 12rpx 32rpx;
    display: flex;

    .abwp-l {
      display: flex;
      flex-direction: column;
      align-items: center;

      .abwp-lt1 {
        flex-shrink: 0;
        width: 48rpx;
        height: 48rpx;
        border-radius: 100%;
        border: 2rpx solid #2C3580;
        box-sizing: border-box;
        padding: 6rpx;
      }

      .abwp-lt3 {
        height: 100%;
        width: 2rpx;
        background-color: #EDEDED;
      }
    }

    .abwp-r {
      margin-left: 16rpx;
      .abwp-r1 {
        height: 48rpx;
        margin-bottom: 24rpx;
        @include flexBetween;

        .abwp-r1l {
          font-size: 32rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 40rpx;
        }

        .abwp-r1r {
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #4F4F4F;
          line-height: 32rpx;
        }
      }

      .abwp-rmap {
        height: 200rpx;
        width: 622rpx;
      }

      .abwp-rmap-text {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #969799;
        line-height: 36rpx;
        margin: 16rpx 0;
      }

      .abwp-rtime {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #969799;
        line-height: 36rpx;
        margin-bottom: 32rpx;
      }

      .iamaline {
        width: 100%;
        height: 1rpx;
        border-bottom: 1rpx solid #EBEDF0;
        padding-top: 18rpx;
      }

      .abwp-rend-text {
        font-size: 32rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 40rpx;
        padding: 32rpx 0 10rpx 0;
      }
    }
  }

  .abwp-bottom {
    padding: 16rpx 32rpx 16rpx 96rpx;

    .abwp-bo-1 {
      @include flexCenter;
      flex-direction: column;
      width: 622rpx;
      height: 200rpx;
      background: #F3F4F5;
      margin-bottom: 32rpx;

      .apply-add-jia {
        width: 48rpx;
        height: 48rpx;
      }

      .abwp-bo-1text {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 36rpx;
        margin-top: 8rpx;
        color: #3340A0;
      }
    }
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
