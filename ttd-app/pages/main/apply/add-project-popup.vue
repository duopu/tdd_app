<!-- 添加项目 -->
<template>
	<uni-popup type="bottom" :safeArea="false" ref="popup">
		<view class="popup-content">
			<view class="title">添加项目</view>
			<scroll-view scroll-y="true" class="scroll-content">
				<view class="row flex-center-between">
					<text class="text">参与项目</text>
					<input class="input" placeholder-class="input-placeholder" type="text" placeholder="请输入项目名称">
				</view>
				<view class="row flex-between">
					<text class="text">履历</text>
					<textarea class="profile-text" value="" placeholder="请输入履历" />
				</view>
			</scroll-view>
			<view class="bottom flex-center-between">
				<button class="btn btn-cancel" @click="close">取消</button>
				<button class="btn btn-confirm">确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'AddProjectPopup',
	data() {
		return {};
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs['popup'].open();
		},
		// 关闭弹窗
		close() {
			this.$refs['popup'].close();
		}
	}
};
</script>

<style lang="scss" src="./popup.scss" scoped></style>
