<!-- 输入公用组件 -->
<template>
	<view class="input-row">
		<!-- 必填 -->
		<text v-if="required" class="red">*</text>
		<!-- label文本 -->
		<text class="text">{{ labelText }}</text>
		<!-- 自定义内容 -->
		<view class="flex-1">
			<slot></slot>
		</view>
		<!-- 右箭头 -->
		<image v-if="arrow" mode="aspectFill" class="icon-arrow" src="../../static/icon/icon-arrow-right-black.svg"></image>
	</view>
</template>

<script>
export default {
	name: 'custom-input-row',
	props: {
		required: {
			type: Boolean,
			default: false
		},
		arrow: {
			type: Boolean,
			default: false
		},
		labelText: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	}
};
</script>
<style src="./style.scss" scoped lang="scss"></style>
