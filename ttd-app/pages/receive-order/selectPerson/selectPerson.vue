<template>
  <view>
    <custom-navbar title="选择人员" />

    <back-container>
      <view>
        <people-item v-for="i in 3" :key="i" :checked="i == '1'" />
      </view>
    </back-container>

    <iphonex-bottom>
      <view class="choosed-num">
        已选定
        <corner-mark num="2" class-name="choosed-num-mar" color="#FF9500" />
        人
      </view>
      <big-btn />
    </iphonex-bottom>
  </view>
</template>

<script>
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";
import PeopleItem from "../myTeam/peopleItem";
import BackContainer from "../../mine/addressManage/component/backContainer";
import CornerMark from "../component/cornerMark";

export default {
  name: "selectPerson",
  components: { CornerMark, BackContainer, PeopleItem, BigBtn, IphonexBottom },
  data() {
    return {};
  }
}
</script>

<style lang="scss" scoped>
.choosed-num {
  width: 750rpx;
  height: 80rpx;
  background: #FFFBE8;
  padding: 0 32rpx;
  @include flexBetween;
  justify-content: flex-start;
  font-size: 28rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #323335;
}
</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

.choosed-num-mar {
  margin: 0 8rpx;
}
</style>
