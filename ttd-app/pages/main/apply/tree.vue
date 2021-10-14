<!-- 树形列表 -->
<template>
	<view class="page-container tree">
		<!--搜索-->
		<custom-search-input class="search-content"></custom-search-input>
		<!-- 选中区域 -->
		<view class="title flex-center-start">已选项</view>
		<view class="select-content">
			<view class="item" v-for="(item,index) in ['','','','','','','']" :key="index">选项1</view>
		</view>
		<view class="title flex-center-start">选择列表</view>
		<!-- 树形 -->
		<scroll-view scroll-y="true" class="scroll-content">
			
		</scroll-view>
		<!-- 提交 -->
		<button class="btn btn-save">提交</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" src="./style.scss" scoped></style>
