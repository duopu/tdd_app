<!-- 横向菜单项 -->
<template>
	<view class="menu">
		<view class="flex-center-between">
			<view class="item text-ellipis" :class="{ on: index === currentIndex }" v-for="(item, index) in menuData" :key="index" @click="changeMenuIndex(index)">{{ item }}</view>
		</view>
		<view class="menu-bar" v-bind:style="{ left: setBarPosition(currentIndex) }"></view>
	</view>
</template>

<script>
export default {
	name: 'custom-menu-list',
	props: {
		// 数组
		menuData: { type: Array, default: () => [] },
		// 当前选中的index
		currentIndex: { type: Number, default: 0 }
	},
	data() {
		return {};
	},
	watch: {},
	methods: {
		// 切换菜单 传入index
		changeMenuIndex(index) {
			if (index === this.currentIndex) return;
			this.$emit('change', index);
		},
		// bar 左侧移动位置
		setBarPosition(value = 0) {
			let screenWidth = 0;
			uni.getSystemInfo({
				success: function(res) {
					screenWidth = res.screenWidth;
				}
			});
			const halfItemLeft = screenWidth / (this.menuData.length * 2) + 'px';
			const _index = ((value / this.menuData.length) * 100).toFixed(2);
			return `calc(${_index}% + ${halfItemLeft})`;
		}
	}
};
</script>

<style scoped lang="scss">
.menu {
	position: relative;
	font-size: 28rpx;
	.item {
		flex: 1;
		color: inherit;
		line-height: 88rpx;
		text-align: center;
		overflow: hidden;
		&.on {
			font-weight: 500;
		}
	}
	&-bar {
		position: absolute;
		bottom: 0;
		width: 60rpx;
		height: 6rpx;
		border-radius: 3rpx;
		transition: left 0.1s ease;
		transform: translateX(-30rpx);
	}
}
</style>
