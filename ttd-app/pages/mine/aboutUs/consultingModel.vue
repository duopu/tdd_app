<template>
  <view class="cons-model" v-if="visible">
    <view class="cons-model-back" @click="hide" />
    <view class="cons-model-bottom">
      <view class="cmb-title">
        <view class="cmb-title-left"></view>
        <view class="cmb-title-middle"></view>
        <view class="cmb-title-right"></view>
      </view>

      view.
    </view>
  </view>
</template>
<script>
export default {
  name: "consultingModel",
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  }
}
</script>
<style scoped lang="scss">
.cons-model {
  width: 750rpx;
  height: 100vh;
  position: fixed;
  z-index: 102;
  left: 0;
  top: 0;
  display: flex;
  flex-flow: column wrap;

  .cons-model-back {
    flex: 1;
  }
  .cons-model-bottom {

  }
}
</style>
