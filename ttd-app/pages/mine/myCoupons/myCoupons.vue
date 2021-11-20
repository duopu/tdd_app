<template>
	<view>
		<custom-navbar title="我的优惠券" />

    <back-container>
      <template v-slot:headerSlot>
        <blue-tab :active-key="activeKey" :list="tabList" @change="change" />
      </template>
    </back-container>
	</view>
</template>

<script>
	import BackContainer from "../addressManage/component/backContainer";
  import BlueTab from "../addressManage/component/blueTab";
  export default {
		name: "myCoupons",
    components: { BlueTab, BackContainer },
    data() {
			return {
        activeKey: '1',
        tabList: [
          { text: '未使用', key: '1' },
          { text: '已使用', key: '2' },
          { text: '已过期', key: '3' },
        ]
			};
		},
    methods: {
      change(data) {
        this.activeKey = data;
      }
    }
	}
</script>

<style lang="scss">

</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
