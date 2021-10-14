<!-- 首页 -->
<template>
	<view class="page-container">
		<!-- 搜索 -->
		<view class="flex-center top">
			<image mode="aspectFill" src="../../../static/search-white.png" class="image-logo"></image>
			<input class="flex-1 input" type="text" value="" placeholder-class="input-placeholder" placeholder="请输入服务类型名称" />
		</view>
		<!-- 横向菜单 -->
		<view class="flex-center-start menu">
			<view class="item flex-column-center" v-for="(item, index) in menuItemLists" :key="index" @click="onMenuItem(index)">
				<image :src="item.image" mode="aspectFill" class="image"></image>
				<text class="text">{{ item.text }}</text>
			</view>
		</view>
		<!-- 滚动 单个 -->
		<swiper class="swiper menu-content" :current="swiperIndex">
			<swiper-item class="swiper-item" v-for="(item,index) in menuItemLists" :key="index">
				<view class="menu-arrow" :style="getArrowLeftDistance(index)"></view>
				<scroll-view scroll-y="true" class="menu-lists">
					<view class="item flex-column-center" v-for="(subItem, subIndex) in menuLists" :key="subIndex">
						<image :src="subItem.image" mode="aspectFill" class="image"></image>
						<text class="text">{{ subItem.text }}</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 广告 -->
		<swiper class="advertise-swiper" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#ffffff" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="600">
			<swiper-item class="swiper-item"><image class="image-advertise" src="../../../static/default/advertise.png" mode="aspectFill"></image></swiper-item>
			<swiper-item class="swiper-item"><image class="image-advertise" src="../../../static/default/advertise.png" mode="aspectFill"></image></swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperIndex: 0,
			// 菜单项
			menuItemLists: [
				{
					image: '../../../static/default/index-kc.png',
					text: '实施'
				},
				{
					image: '../../../static/default/index-kc.png',
					text: '维修'
				},
				{
					image: '../../../static/default/index-kc.png',
					text: '勘测'
				},
				{
					image: '../../../static/default/index-kc.png',
					text: '租聘'
				},
				{
					image: '../../../static/default/index-kc.png',
					text: '培训'
				},
				{
					image: '../../../static/default/index-kc.png',
					text: '人员'
				}
			],
			// 菜单内容
			menuLists: [
				{
					image: '../../../static/default/index-demo.png',
					text: '网络'
				},
				{
					image: '../../../static/default/index-demo.png',
					text: '储存'
				},
				{
					image: '../../../static/default/index-demo.png',
					text: '储存'
				},
				{
					image: '../../../static/default/index-demo.png',
					text: '储存'
				},
				{
					image: '../../../static/default/index-demo.png',
					text: '储存'
				},
				{
					image: '../../../static/default/index-demo.png',
					text: '储存'
				}
			]
		};
	},
	methods: {
		// 计算箭头的位置
		getArrowLeftDistance(index) {
			const distance = (100 / this.menuItemLists.length) * index + 100 / (this.menuItemLists.length * 2);
			return { left: `${distance}%` };
		},
		// 切换菜单列表
		onMenuItem(index) {
			this.swiperIndex = index;
		}
	}
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
