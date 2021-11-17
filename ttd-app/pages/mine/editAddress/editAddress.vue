<template>
  <view class="edit-address">
    <custom-navbar title="编辑地址" />
    <back-container>
      <view class="edit-addr">
        <map
            style="width: 686rpx;height: 344rpx;margin: 0 32rpx 16rpx 0;"
            :latitude="latitude"
            :longitude="longitude"
            :markers="covers"
        />

        <view class="edit-item">
          <view class="edit-lable">所在地区</view>
          <view class="edit-midle">请选择</view>
          <uni-icons class="edit-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="edit-item">
          <view class="edit-lable">详细地址</view>
          <input class="edit-midle" placeholder="请输入" placeholder-class="input-placeholder" />
        </view>

        <view class="edit-item">
          <view class="edit-lable">联系人</view>
          <input class="edit-midle" placeholder="请输入" placeholder-class="input-placeholder" />
        </view>

        <view class="edit-item">
          <view class="edit-lable">联系电话</view>
          <input class="edit-midle" placeholder="请输入" placeholder-class="input-placeholder" />
        </view>

      </view>
    </back-container>

    <view class="edit-address-tips">所在位置：经度：129 纬度：48</view>

    <!-- 底部按钮 -->
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
  name: 'editAddress',
  components: { BottomOperate, IphonexBottom, BackContainer },
  data() {
    return {
      id: 0, // 使用 marker点击事件 需要填写id
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [{
        latitude: 39.909,
        longitude: 116.39742,
      }, {
        latitude: 39.90,
        longitude: 116.39,
      }]
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
.edit-address {
  .edit-addr {
    box-sizing: border-box;
    padding: 15rpx 0 32rpx 32rpx;

    .edit-item {
      display: flex;
      align-items: center;
      height: 88rpx;
      padding-right: 32rpx;
      border-bottom: 1rpx solid #EBEDF0;

      .edit-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .edit-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }

      .edit-right {
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

  .edit-address-tips {
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 32rpx;
    margin: 16rpx 32rpx;
  }
}
</style>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
