<!-- 发单列表 -->
<template>
	<scroll-view scroll-y="true" class="page-container">
		<!-- 头部 -->
		<view class="top"><custom-menu-list class="custom-menu" :menu-data="menuList" :current-index="index" @change="getMenuIndex"></custom-menu-list></view>
		<!-- 列表 -->
		<view class="list"></view>
	</scroll-view>
</template>

<script>
export default {
	name:'place-order-list',
	data() {
		return {
			index: 1,
			menuList: ['待报价', '待确认', '待开始', '待完工', '已完工', '已取消']
		};
	},
	methods: {
		// 切换菜单
		getMenuIndex(index) {
			this.index = index;
		}
	}
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
