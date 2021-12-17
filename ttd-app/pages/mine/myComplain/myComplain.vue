<template>
  <view class="my-complain">

    <custom-navbar title="我的投诉" />

    <back-container>
      <template v-slot:headerSlot>
        <blue-tab :active-key="activeKey" @change="change" />
      </template>

      <view class="complain-list">
        <complain-card v-for="i in complainList" :key="i.id" :complain="i" :card-type="activeKey" />
      </view>
    </back-container>
  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import BlueTab from "../addressManage/component/blueTab";
import ComplainCard from "./children/complainCard";

export default {
  name: "myComplain",
  components: { ComplainCard, BlueTab, BackContainer },
  data() {
    return {
      activeKey: 1,
			complainList: [],
    };
  },
	onReady() {
		this.queryComplainList();
	},
  methods: {
    change(data) {
      this.activeKey = data;
			this.queryComplainList();
    },
		queryComplainList() {
			this.$http.post('/b/ordercomplain/queryPageList', { state: this.activeKey }, true)
			.then(res => {
			  this.complainList = res.dataList;
			})
		},
  }
}
</script>
<style lang="scss" scoped>
.my-complain {

  .complain-list {
    background-color: #ECEDF9;
  }
}
</style>
<style lang="scss">
page {
  background-color: #ECEDF9;
  max-height: 100vh;
  overflow-y: scroll;
}
</style>
