<!-- 树形列表 -->
<template>
	<view class="page-container select-lists">
		<!--搜索-->
		<custom-search-input class="search-content"></custom-search-input>
		<!-- 面包屑 -->
		<scroll-view scroll-x="true" class="breadcrumb"  scroll-into-view="current">
			<block v-for="(item,index) in ['','','','','','']">
				<text class="previous text">返回上一级</text>
				<uni-icons class="icon" type="arrowright" color="#999999"></uni-icons>
			</block>
			<text id="current" class="active text">当前</text>
		</scroll-view>
		<!-- 选中区域 -->
		<view class="title flex-center-start">已选项</view>
		<view class="select-content">
			<view class="item" v-for="(item,index) in ['','','','','','','']" :key="index">选项1</view>
		</view>
		<view class="title flex-center-start">选择列表</view>
		<!-- 树形 -->
		<scroll-view scroll-y="true" class="scroll-content">
			<!-- 要选择的样式 -->
			<view class="list-item flex-center-start" v-for="(item,index) in ['','','','','','','']" :key="index">
				<text class="radio" :class="{'on':index === 0}"></text>
				<text>选项一</text>
			</view>
			<!-- 有下一级的样式 -->
			<view class="list-item flex-center-between" v-for="(item,index) in ['','']" :key="index">
				<text>选项二</text>
				<uni-icons type="arrowright" class="icon-arrow" size="14" color="#333333"></uni-icons>
			</view>
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
