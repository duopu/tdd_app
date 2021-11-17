<template>
  <view class="bank-account">
    <custom-navbar title="银行账户" />
    <back-container>
      <view class="bank-addr">
        <view class="bank-ac-item">
          <view class="bank-ac-lable">开户行</view>
          <view class="bank-ac-midle">请选择</view>
          <uni-icons class="bank-ac-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="bank-ac-item">
          <view class="bank-ac-lable">开户网点</view>
          <input class="bank-ac-midle" placeholder="可选输入" placeholder-class="input-placeholder" />
        </view>

        <view class="bank-ac-item">
          <view class="bank-ac-lable">户名</view>
          <input class="bank-ac-midle" placeholder="请输入" placeholder-class="input-placeholder" />
        </view>

        <view class="bank-ac-item">
          <view class="bank-ac-lable">卡号</view>
          <input class="bank-ac-midle" placeholder="请输入" placeholder-class="input-placeholder" />
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

export default {
  name: 'bankAccount',
  components: { BottomOperate, IphonexBottom, BackContainer },
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
.bank-account {
  .bank-addr {
    box-sizing: border-box;
    padding: 15rpx 0 0 32rpx;

    .bank-ac-item {
      display: flex;
      align-items: center;
      height: 88rpx;
      padding-right: 32rpx;

      &:not(:nth-last-child(1)) {
        border-bottom: 1rpx solid #EBEDF0;
      }

      .bank-ac-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .bank-ac-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }

      .bank-ac-right {
        padding-left: 18rpx;
      }
    }
  }

  /deep/.input-placeholder {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
  }
}
</style>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
