<template>
  <view class="evaluate-card">

    <image :src="MDicon" class="evaluate-img" />

    <view class="eva-right">
      <view class="eva-right-1">
        <text class="eva-right-name">吴县平</text>

        <my-star />
      </view>
    </view>


  </view>
</template>
<script>
import MDicon from '../../../static/mine/MDicon.png';
import MyStar from "./myStar";

export default {
  name: "evaluateCard",
  components: { MyStar },
  data() {
    return {
      MDicon
    }
  }
}
</script>
<style scoped lang="scss">
.evaluate-card {
  padding: 32rpx 0 0 32rpx;
  display: flex;

  .evaluate-img {
    width: 96rpx;
    height: 96rpx;
    border-radius: 8rpx;
    padding-right: 20rpx;
  }


}
</style>