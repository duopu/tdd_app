<template>
	<view class="back-container">
		<view class="container-header" :style="{minHeight: headerHeight + 'rpx'}">
			<slot name="headerSlot">
				<!-- demo <template v-slot:headerSlot><view>headerSlot</view></template> -->
			</slot>
		</view>
		<view class="container-body" :style="{minHeight: bodyHeight + 'rpx'}">
			<view :style="{width: '750rpx', height: bodyHeight + 'rpx'}" />
			<slot></slot>
		</view>
	</view>
</template>
<script>
	export default {
		name: "backContainer",
		props: {
			// 顶部深色区域最小高度 单位 rpx
			headerHeight: {
				type: Number,
				default: () => {
					return 48
				}
			},
			// 白色区域最小高度 单位 rpx
			bodyHeight: {
				type: Number,
				default: 17
			},
		}
	}
</script>
<style scoped lang="scss">
	.back-container {
		width: 750rpx;
		background-color: #00f;
		background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);

		.container-header {
			
		}

		.container-body {
			background-color: white;
			border-radius: 16rpx 16rpx 0 0;
		}
	}
</style>
