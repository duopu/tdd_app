<!-- 添加技能 -->
<template>
	<uni-popup type="bottom" :safeArea="false" ref="popup">
		<view class="popup-content">
			<view class="title">添加人员</view>
			<scroll-view scroll-y="true" class="scroll-content">
				<view class="row flex-center-between">
					<text class="text">选择岗位</text>
					<view class="flex-1"></view>
					<image class="icon-arrow" src="../../../static/icon/icon-arrow-right-black.svg" mode="aspectFill"></image>
				</view>
				<view class="row flex-center-between">
					<text class="text">选择软件</text>
					<view class="flex-1 tag-list">
						<view class="item flex-center" v-for="(item,index) in ['','','']" :key="index">
							<text class="flex-1 text-ellipis">CAD</text>
							<uni-icons type="clear" class="icon-close" color="#DA1A00"></uni-icons>
						</view>
					</view>
					<image class="icon-arrow" src="../../../static/icon/icon-arrow-right-black.svg" mode="aspectFill"></image>
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
	name: 'AddStaffPopup',
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
