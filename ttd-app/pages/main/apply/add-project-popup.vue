<!-- 添加项目 -->
<template>
	<uni-popup type="bottom" :safeArea="false" ref="popup">
		<view class="popup-content">
			<view class="title">添加项目</view>
			<scroll-view scroll-y="true" class="scroll-content">
				<view class="row flex-center-between">
					<text class="text">参与项目</text>
					<input class="input" v-model="name" maxlength="50" placeholder-class="input-placeholder" type="text" placeholder="请输入项目名称">
				</view>
				<view class="row flex-between">
					<text class="text">履历</text>
					<textarea class="profile-text" v-model="content"  placeholder="请输入履历" />
				</view>
			</scroll-view>
			<view class="bottom flex-center-between">
				<button class="btn btn-cancel" @click="close">取消</button>
				<button class="btn btn-confirm" @click="confirmAction">确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'AddProjectPopup',
	data() {
		return {
			name:'',
			content:'',
		};
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 提交项目信息 
		confirmAction(){
			if(this.name.length == 0){
				this.$tool.showToast('请输入项目名称');
				return;
			}
			
			// if(this.content.length == 0){
			// 	this.$tool.showToast('请输入项目履历');
			// 	return;
			// }
			
			this.$emit('confirmProjectData',{
				name:this.name,
				content:this.content
			})
			this.name = '';
			this.content = '';
			this.close();
		}
	}
};
</script>

<style lang="scss" src="./popup.scss" scoped></style>
