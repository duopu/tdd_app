<!-- 搜索 -->
<template>
	<view class="flex-center">
		<image src="../../../static/icon/icon_search.svg"></image>
		<input type="text" value="" :placeholder="placeholder"/>
	</view>
</template>

<script>
export default {
	name: 'custom-search-input',
	props: {
		placeholder: {
			type: String,
			default: '请输入'
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss"></style>
