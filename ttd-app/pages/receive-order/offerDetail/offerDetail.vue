<template>
  <view>
    <custom-navbar title="报价" />

    <back-container>
      <template #headerSlot>
        <offer-head />
      </template>

      <view class="offer-detail">
        <view class="od-1">
          <image :src="MDicon" class="od-1image" />


        </view>
      </view>
    </back-container>

  </view>
</template>

<script>
import MDicon from '../../../static/mine/MDicon.png';
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../component/offerHead";

export default {
  name: "offerDetail",
  components: { OfferHead, BackContainer },
  data() {
    return {MDicon};
  }
}
</script>

<style lang="scss">
.offer-detail {

}
</style>
