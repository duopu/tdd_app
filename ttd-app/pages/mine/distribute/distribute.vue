<!-- 我的分销 -->
<template>
	<view class="distribute page-container">
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-transparent-image.png" mode="widthFix" class="image-transparent"></image>
		<scroll-view scroll-y="true" class="scroll-content">
			<view class="title">我的邀请人</view>
			<view class="box flex-center-between">
				<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/default/index-demo.png" mode="aspectFill" class="avatar-image"></image>
				<view class="message">
					<text class="name">{{myDistInfo.distName || '暂无邀请人'}}</text>
					<text class="phone">{{myDistInfo.distPhone}}</text>
				</view>
				<text class="time">{{myDistInfo.distTime}}</text>
			</view>
			<view class="title">我邀请了{{mySubordinateList.length}}人</view>
			<view class="box flex-center-between" v-for="(item, index) in mySubordinateList" :key="index" @click="watchUserInvite(item)">
				<text class="name">{{item.userName}}</text>
				<text class="phone flex-1">{{item.userPhone}}</text>
				<text class="time">{{item.addTime}}</text>
				<uni-icons type="forward" class="icon-arrow" color="#9D9D9D"></uni-icons>
			</view>
			<view class="no-more">已经到头了~</view>
		</scroll-view>
		<button class="btn flex-center" @click="scanCodeAction" v-if="!myDistInfo.distId">
			<uni-icons size="22" type="scan" class="icon" color="#8C4C31" ></uni-icons>扫码绑定邀请人
		</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mySubordinateList:[],
			myDistInfo:{},
		};
	},
	onReady() {
		this.queryMyInviter();
		this.queryMySubordinate();
	},
	methods:{
		// 查询我的邀请人
		queryMyInviter(){
			const id = this.$store.state.user.id
			this.$http.post('/b/customer/query',{id}).then(res=>{
				this.myDistInfo = res.distInfo
			})
		},
		// 查询我邀请到的人
		queryMySubordinate(){
			const userId = this.$store.state.user.id
			this.$http.post('/b/distinvitationrecord/queryListByDistId',{id:userId},true).then(res=>{
				this.mySubordinateList = res;
			})
		},
		// 扫码绑定邀请人
		scanCodeAction(){
			uni.scanCode({
			    success:  (res) =>{
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
					// 获取映射id
					const contentMapId = res.result.split('=')[1];
					console.log('获取映射 id',contentMapId); 
					// 获取暂存信息
					this.$http.post('/core/contentmapping/query', { id: contentMapId },true).then(res => {
						const data = JSON.parse(res.content);
						return this.$http.post('/b/distinvitationrecord/bindInvitation',{shareUserId:data.shareUserId},true)
					}).then(res=>{
						this.$tool.showSuccess('绑定成功！') 
						this.queryMyInviter();
					})
			    }
			});
		},
		// 查看用户分销信息
		watchUserInvite(item){
			const userName = item.userName;
			const userId = item.userId;
			uni.navigateTo({
				url:`/pages/mine/distribute-users/distribute-users?userName=${userName}&userId=${userId}`
			})
		}
	}
};
</script>

<style src="./style.scss" scoped lang="scss"></style>
