<template>
  <view class="address-manage">
    <custom-navbar title="地址管理" />
    <back-container>
	  <view>
		<address-item v-for="(item, index) in addressList" :key="index" :address="item" @rightClick="rightClick" />
	  </view>
	</back-container>
  </view>
</template>

<script>
import config from '../../../utils/config.js';
import BackContainer from './component/backContainer';
import AddressItem from './component/addressItem';

export default {
  components: { AddressItem, BackContainer },
  data() {
	  return {
	    addressList: []
	  };
  },
  onReady() {},
  onShow() {
	this.queryAddressData();
  },
  methods: {
	  rightClick(id) {
	    uni.navigateTo({ url: `/pages/mine/editAddress/editAddress?id=${id}` });
	  },
	  queryAddressData() {
	    this.$http.post('/b/customeraddress/queryPageList', {
			  pageSize: 1000,
			  }, true)
		  .then(res => {
		    this.addressList = res.dataList;
		  })
	  }
  }
}
</script>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
