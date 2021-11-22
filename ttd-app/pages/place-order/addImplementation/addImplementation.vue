<template>
  <view class="add-im">
    <custom-navbar title="添加实施工作" />

    <back-container>
      <template #headerSlot>
        <offer-head title="实施与维修" text="电子产品的实施与维修工作" />
      </template>

      <view class="add-imple">
        <checkd-item :value="value" label="下单类型" :list="[{text: '实施', value: '1'}, {text: '维修', value: '2'}]" @change="change" />

        <view class="add-i-item">
          <view class="add-i-lable">服务内容</view>
          <view class="add-i-midle">请选择</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">品牌</view>
          <view class="add-i-midle">请选择</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">型号</view>
          <input class="add-i-midle" placeholder="可选输入" placeholder-class="input-placeholder" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">数量</view>
          <view class="add-i-midle">
            <my-number-box v-model="value1" />
          </view>
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">工作周期</view>
          <view class="add-i-midle">9请选择</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>


      </view>

    </back-container>

  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../../receive-order/component/offerHead";
import CheckdItem from "../receiptOrderZy/checkdItem";
import MyNumberBox from "../../receive-order/component/myNumberBox";

export default {
  name: "addImplementation",
  components: { MyNumberBox, CheckdItem, OfferHead, BackContainer },
  data() {
    return {
      value: '1',
      value1: undefined,
    };
  },
  methods: {
    change(value) {
      this.value = value
    }
  }
}
</script>

<style lang="scss">
.add-im {
  .add-imple {
    box-sizing: border-box;
    padding: 15rpx 0 0 32rpx;

    .add-i-item {
      display: flex;
      align-items: center;
      height: 88rpx;
      padding-right: 32rpx;

      &:not(:nth-last-child(1)) {
        border-bottom: 1rpx solid #EBEDF0;
      }

      .add-i-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .add-i-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }

      .add-i-right {
        padding-left: 18rpx;
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
@import "../../mine/addressManage/_pageStyle.scss";
</style>
