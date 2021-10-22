<!-- 添加人员 -->
<template>
	<uni-popup type="bottom" :safeArea="false" ref="popup">
		<view class="popup-content">
			<view class="title">添加人员</view>
			<scroll-view scroll-y="true" class="scroll-content">
				<!-- 选岗位 -->
				<view class="row flex-center-between" @click="selectUserrole">
					<text class="text">选择岗位</text>
					<view class="flex-1 flex align-end column">
						<view  v-for="node in userroleList">{{node.name}}</view>
						<view class="" v-if="userroleList.length == 0">请选择岗位</view>
					</view>
					<image class="icon-arrow" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/icon/icon-arrow-right-black.svg" mode="aspectFill"></image>
				</view>
				<!-- 选软件 -->
				<view class="row flex-center-between" @click="selectSoftwareconf">
					<text class="text">选择软件</text>
					<view class="flex-1 tag-list">
						<view class="item flex-center" v-for="(item,index) in softwareconfList" :key="index">
							<text class="flex-1 text-ellipis">{{item}}</text>
							<!-- <uni-icons type="clear" class="icon-close" color="#DA1A00"></uni-icons> -->
						</view>
						<view class="" v-if="softwareconfList.length == 0">请选择软件</view>
					</view>
					<image class="icon-arrow" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/icon/icon-arrow-right-black.svg" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view class="bottom flex-center-between">
				<button class="btn btn-cancel"  @click="close">取消</button>
				<button class="btn btn-confirm" @click="confirmAction">确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'AddStaffPopup',
	data() {
		return {
			userroleList:[],
			softwareconfList:[],
		};
	},
	mounted() {
		uni.$on('submitSelectUserroleTree',(userroleList)=>{
			console.log('userroleList',userroleList);
			this.userroleList  = userroleList || [];
		})
		uni.$on('submitSoftwareList',softwareconfList=>{
			this.softwareconfList = softwareconfList;
		})
	},
	destroyed() {
		uni.$off('submitSelectUserroleTree');
		uni.$off('submitSoftwareList');
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
		// 选岗位
		selectUserrole(){
			uni.navigateTo({
				url:`/pages/main/apply/tree?type=userrole`
			})
		},
		// 选软件
		selectSoftwareconf(){
			uni.navigateTo({
				url:`/pages/main/apply/list?type=software`
			})
		},
		// 确定按钮点击事件
		confirmAction(){
			
			if(this.userroleList.length == 0){
				this.$tool.showToast('请选择岗位');
				return;
			}
			
			// if(this.softwareconfList.length == 0){
			// 	this.$tool.showToast('请选择软件');
			// 	return;
			// }
			
			const userroleData = this.userroleList.map(user=>{
				return {
					...user,
					softwareconfList:this.softwareconfList
				}
			})
			this.$emit('confirmUserroleData',userroleData);
			this.userroleList = [];
			this.softwareconfList = [];
			this.close();
		}
	}
};
</script>

<style lang="scss" src="./popup.scss" scoped></style>
