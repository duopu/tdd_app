<template>
  <view class="edit-invoice">

    <custom-navbar title="发票信息添加" />

    <back-container>
      <view class="edit-in-addr">
        <view class="edit-in-ac-item">
          <view class="edit-in-ac-lable">公司名称</view>
          <input class="edit-in-ac-midle" placeholder="请务必输入" placeholder-class="input-placeholder" />
        </view>

        <view class="edit-in-ac-item">
          <view class="edit-in-ac-lable">统一税号</view>
          <input class="edit-in-ac-midle" placeholder="请务必输入" placeholder-class="input-placeholder" />
        </view>

        <view class="edit-in-ac-item">
          <view class="edit-in-ac-lable">单位地址</view>
          <input class="edit-in-ac-midle" placeholder="请输入" placeholder-class="input-placeholder" />
        </view>

        <view class="edit-in-ac-item">
          <view class="edit-in-ac-lable">开户银行</view>
          <input class="edit-in-ac-midle" placeholder="请输入" placeholder-class="input-placeholder" />
        </view>

        <view class="edit-in-ac-item">
          <view class="edit-in-ac-lable">银行帐户</view>
          <input class="edit-in-ac-midle" placeholder="请输入" placeholder-class="input-placeholder" />
        </view>

        <view class="up-box">
          <view class="up-box-title">营业执照</view>
          <view class="up-box-area">
            <view class="up-box-center">
              <image class="up-box-center-image" :src="addImage" />
              <view class="up-box-center-text">添加照片</view>
            </view>
          </view>
        </view>

      </view>
    </back-container>

    <iphonex-bottom>
      <bottom-operate @operateDel="operateDel" @operateSave="operateSave" />
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BottomOperate from "../addressManage/component/bottomOperate";
import addImage from '../../../static/mine/upload-image-icon.svg';

export default {
  name: 'editInvoice',
  components: { BottomOperate, IphonexBottom, BackContainer },
  data() {
    return {
      addImage,
    }
  },
  methods: {
    rightClick() {
      console.log(123);
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
.edit-invoice {
  .edit-in-addr {
    box-sizing: border-box;
    padding: 15rpx 0 0 32rpx;

    .edit-in-ac-item {
      display: flex;
      align-items: center;
      height: 88rpx;
      padding-right: 32rpx;

      &:not(:nth-last-child(1)) {
        border-bottom: 1rpx solid #EBEDF0;
      }

      .edit-in-ac-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .edit-in-ac-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }
    }

    .up-box {
      padding-bottom: 48rpx;

      .up-box-title {
        margin: 46rpx 0 32rpx 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        text-align: center;
        color: #323335;
      }

      .up-box-area {
        @include flexCenter;
        width: 480rpx;
        height: 320rpx;
        background: #F3F4F5;
        margin: 0 auto 0 104rpx;

        .up-box-center {
          text-align: center;

          .up-box-center-image {
            width: 48rpx;
            height: 48rpx;
          }

          .up-box-center-text {
            font-size: 24rpx;
            font-family: PingFang SC-Light, PingFang SC;
            font-weight: 300;
            color: #828282;
          }
        }
      }
    }
  }

  /deep/ .input-placeholder {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
  }
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
