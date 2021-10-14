<!--列表-->
<template>
	<view class="select-lists page-container">
		<!--搜索-->
		<custom-search-input class="search-content"></custom-search-input>
		<!-- 选中区域 -->
		<view class="title flex-center-start">已选项</view>
		<view class="select-content">
			<view class="item" v-for="(item,index) in ['','','','','','','']" :key="index">选项1</view>
		</view>
		<view class="title flex-center-start">选择列表</view>
		<!-- 内容 -->
		<scroll-view class="scroll-content list" scroll-y="true">
			<view class="list-item flex-center-start" v-for="(item,index) in ['','','','','','','']" :key="index">
				<text class="radio" :class="{'on':index === 0}"></text>
				<text>选项一</text>
			</view>
			<view class="list-item flex-center-start">
				<text class="radio"></text>
				<text>选项二</text>
			</view>
		</scroll-view>
		<!-- 底部 -->
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

<style src="./style.scss" lang="scss" scoped></style>
