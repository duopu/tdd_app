<template>
	<view class="my-complain">
    <custom-navbar title="我的投诉" />
		<back-container>
      <template v-slot:headerSlot>
        <blue-tab />
      </template>

    </back-container>
	</view>
</template>

<script>
	import BackContainer from "../addressManage/component/backContainer";
  import BlueTab from "../addressManage/component/blueTab";
  export default {
		name: "myComplain",
    components: { BlueTab, BackContainer },
    data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
.my-complain {

}
</style>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
