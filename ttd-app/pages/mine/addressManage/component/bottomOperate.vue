<template>
  <view class="bottom-operate">
    <view class="bottom-operate-btn bottom-operate-del" @click="$emit('operateDel')">删除</view>
    <view class="bottom-operate-btn bottom-operate-save" @click="$emit('operateSave')">保存</view>
  </view>
</template>
<script>
export default {
  name: "bottomOperate"
}
</script>
<style scoped lang="scss">
.bottom-operate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100rpx;
  padding: 0 32rpx;
  background: #FFFFFF;

  .bottom-operate-btn {
    width: 330rpx;
    height: 80rpx;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF3B30;
  }

  .bottom-operate-del {
    font-size: 28rpx;
    background: #FFFFFF;
    border: 2rpx solid #EDEDED;
  }

  .bottom-operate-save {
    color: #FFFFFF;
    background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
  }
}
</style>
