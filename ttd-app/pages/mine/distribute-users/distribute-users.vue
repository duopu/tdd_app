<!-- 我的分销 -->
<template>
	<view class="distribute page-container">
		<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/invite-transparent-image.png" mode="widthFix" class="image-transparent"></image>
		<scroll-view scroll-y="true" class="scroll-content">
			<view class="title">{{userName}}邀请了{{subordinateList.length}}人</view>
			<view class="box flex-center-between" v-for="(item, index) in subordinateList" :key="index">
				<text class="name">{{item.userName}}</text>
				<text class="phone flex-1">{{item.userPhone}}</text>
				<text class="time">{{item.addTime}}</text>
				<uni-icons type="forward" class="icon-arrow" color="#9D9D9D"></uni-icons>
			</view>
			<view class="no-more">已经到头了~</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			subordinateList:[],
			userName:'',
			userId:'',
		};
	},
	onLoad(option) {
		this.userId = option.userId;
		this.userName = option.userName;
	},
	onReady() {
		this.queryMySubordinate();
	},
	methods:{
		
		// 查询此人 邀请到的人
		queryMySubordinate(){

			this.$http.post('/b/distinvitationrecord/queryListByDistId',{id:this.userId},true).then(res=>{
				this.subordinateList = res;
			})
		},
	}
};
</script>

<style src="./style.scss" scoped lang="scss"></style>
