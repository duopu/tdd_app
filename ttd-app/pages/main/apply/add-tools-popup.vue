<!-- 添加工具 -->
<template>
	<uni-popup type="bottom" :safeArea="false" ref="popup">
		<view class="popup-content">
			<view class="title">添加工具</view>
			<scroll-view scroll-y="true" class="scroll-content">
				<view class="row flex-center-between" @click="selectEquipmenttool">
					<text class="text">选择工具</text>
					<view class="flex-1 tag-list">
						<view class="item flex-center" v-for="(item, index) in toolList" :key="index">
							<text class="flex-1 text-ellipis">{{item.name}}</text>
							<!-- <uni-icons type="clear" class="icon-close" color="#DA1A00"></uni-icons> -->
						</view>
					</view>
					<image class="icon-arrow" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/icon/icon-arrow-right-black.svg" mode="aspectFill"></image>
				</view>
				<view class="row flex-center-between">
					<text class="text">是否租赁</text>
					<view class="flex tools-radio">
						<view class="item flex-center" @click="()=>leaseFlag=1">
							<text class="radio" :class="{on:leaseFlag==1}"></text>
							<text>租赁</text>
						</view>
						<view class="item flex-center" @click="()=>leaseFlag=0">
							<text class="radio" :class="{on:leaseFlag==0}"></text>
							<text>不租赁</text>
						</view>
					</view>
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
	name: 'AddToolsPopup',
	data() {
		return {
			toolList:[],
			leaseFlag:0
		};
	},
	mounted() {
		uni.$on('submitSelectEquipmenttoolTree',(toolList)=>{
			this.toolList  = toolList || [];
		})
	},
	destroyed() {
		uni.$off('submitSelectEquipmenttoolTree');
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
		// 选择工具
		selectEquipmenttool(){
			uni.navigateTo({
				url:`/pages/main/apply/tree?type=equipmenttool`
			})
		},
		// 确定按钮点击事件
		confirmAction(){
			if(this.toolList.length == 0){
				this.$tool.showToast('请选择设备');
				return;
			}
			
			const toolData = this.toolList.map(tool=>{
				return {
					...tool,
					leaseFlag:this.leaseFlag
				}
			})
			this.$emit('confirmToolData',toolData);
			this.toolList = [];
			this.close();
		}
	}
};
</script>

<style lang="scss" src="./popup.scss" scoped></style>
