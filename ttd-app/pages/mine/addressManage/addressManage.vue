<template>
  <view class="address-manage">
    <custom-navbar title="地址管理" />
    <back-container>
      <view>
        <address-item v-for="i in 5" :key="i" @rightClick="rightClick" />
      </view>
    </back-container>
  </view>
</template>

<script>
import BackContainer from "./component/backContainer";
import AddressItem from "./component/addressItem";

export default {
  components: { AddressItem, BackContainer },
  data() {
    return {};
  },
  methods: {
    rightClick() {
      uni.navigateTo({ url: `/pages/mine/editAddress/editAddress?id=${123}` })
    }
  }
}
</script>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
