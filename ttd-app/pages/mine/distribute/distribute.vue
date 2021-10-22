<!-- 我的分销 -->
<template>
	<view class="distribute page-container">
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-transparent-image.png" mode="widthFix" class="image-transparent"></image>
		<scroll-view scroll-y="true" class="scroll-content">
			<view class="title">我的邀请人</view>
			<view class="box flex-center-between">
				<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/default/index-demo.png" mode="aspectFill" class="avatar-image"></image>
				<view class="message">
					<text class="name">张达</text>
					<text class="phone">154****4844</text>
				</view>
				<text class="time">10-20 00:03</text>
			</view>
			<view class="title">我邀请了{{mySubordinateList.length}}人</view>
			<view class="box flex-center-between" v-for="(item, index) in mySubordinateList" :key="index">
				<text class="name">{{item.name}}</text>
				<text class="phone flex-1">154****4844</text>
				<text class="time">10-20 00:03</text>
			</view>
			<view class="no-more">已经到头了~</view>
		</scroll-view>
		<button class="btn flex-center"><uni-icons size="22" type="scan" class="icon" color="#8C4C31" @click="scanCodeAction"></uni-icons>扫码绑定邀请人</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			myInviter:{},
			mySubordinateList:[],
		};
	},
	onReady() {
		this.queryMyInviter();
		this.queryMySubordinate();
	},
	methods:{
		
		// 查询我的邀请人
		queryMyInviter(){
			
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
			    }
			});
		}
	}
};
</script>

<style src="./style.scss" scoped lang="scss"></style>
