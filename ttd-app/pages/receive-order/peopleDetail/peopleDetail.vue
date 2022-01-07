<template>
	<view>
		<custom-navbar title="人员详情" />

		<view class="pd-top">
			<view v-if="realAuthFlag" class="pd-top1">
				<image class="pd-top1-img"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/trophy-icon.svg" />
				<text class="pd-top1-text">已实名认证</text>
			</view>
		</view>

		<view class="pd-header">
			<image v-if="headImgUrl" :src="headImgUrl" class="pd-header-img" />
			<image v-else src="'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png'"
				class="pd-header-img" />
			<view class="pd-header-text" v-if="userType == 'self'" @click="editHeader">
				<image class="pd-header-edit-image"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconEditBlack.svg" />
				<text class="pd-header-edtext">编辑头像</text>
			</view>

			<view class="pd-header-name">
        <text class="name-text">{{ name }}</text>
        <uni-rate :value="4" size="20" :margin="5" readonly allow-half />
      </view>

			<view class="pd-header-phone pd-header-phone1">
				<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/linkPhoneIcon.svg"
					class="pd-header-edit-icon" />
				<text class="pd-header-phonenum">手机号：{{ hideInfo ? '--' : `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7, 11)}`}}</text>
			</view>

			<view class="pd-header-phone">
				<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/linkPeopleIcon.svg"
					class="pd-header-edit-icon" />
				<text class="pd-header-phonenum">
					身份证：{{ idCard && !hideInfo ? `${ idCard.slice(0, 6) } ${ idCard.slice(6, 14) } ${ idCard.slice(14, 18) }` : '--' }}
				</text>
			</view>

			<view v-if="intro" class="pd-header-info">{{ intro }}</view>
		</view>

		<view class="pd-skill" v-for="(item, index) in allList" :key="index">
			<member-title :show-right="false" :title="item.title" />
			<view class="pd-skill-item" v-for="(s, i) in item.data" :key="i">
				<view class="pd-skill-it1">{{ index == 2 ? s.projectName : s.nodeLink }}</view>
				<view class="pd-skill-it2">
					<text v-if="index == 0" class="pd-skill-it3" v-for="b in s.brandList" :key="b">{{ b }}</text>
					<text v-if="index == 1" class="pd-skill-it3" v-for="b in s.softwareList" :key="b">{{ b }}</text>
					<text v-if="index == 2" class="pd-skill-it3">{{ s.resume }}</text>
					<text v-if="index == 3" class="pd-skill-it3">{{ s.leaseFlag == 1 ? '租赁' : '' }}</text>
				</view>
			</view>
		</view>

		<view class="pd-comment">
			<member-title :show-right="false" title="评价" />
			<evaluate-card v-for="i in commentList" :key="i.id" :comment="i" />
			<list-empty v-if="!commentList.length" />
		</view>

		<update-header ref="updateHeader" :url="headImgUrl" @onSave="updateHeader"/>

	</view>
</template>
<script>
	import UpdateHeader from "./updateHeader";
	import MemberTitle from "../myTeam/memberTitle";
	import EvaluateCard from "../myTeam/evaluateCard";
	import ListEmpty from "../../place-order/orderList/listEmpty";

	export default {

		name: "peopleDetail",
		components: {
			ListEmpty,
			EvaluateCard,
			MemberTitle,
			UpdateHeader
		},
		data() {
			return {
				hideInfo: false,
				id: '',
				idCard: '',
				headImgUrl: '',
				name: '',
				phone: '',
				intro: '',
				realAuthFlag: 0, // 是否实名认证 0：否 1：是
				allList: [{
						title: '技能',
						data: []
					}, // 技能
					{
						title: '岗位',
						data: []
					}, // 岗位
					{
						title: '项目',
						data: []
					}, // 项目列表
					{
						title: '工具',
						data: []
					}, // 工具
				],
				commentList: [], // 评论列表
				userType: 'people' // 查看用户类型   people：看别人    self：看自己
			};
		},
		onLoad(option) {
			if (option.id) { // 人员信息
				this.id = option.id;
				this.userType = 'people'
			} else { // 自己的信息
				this.id = this.$store.state.user.id
				this.userType = 'self'
			}
			if (option.hideInfo) {
				this.hideInfo = option.hideInfo == '1';
			}
			this.queryPersonInfo();
			this.queryComments();
		},
		methods: {
			queryPersonInfo() {
				this.$http
					.post('/b/customer/queryDetailInfo', {
						id: this.id,
					}, true)
					.then(res => {
						this.idCard = res.idCard;
						this.headImgUrl = res.headImgUrl;
						this.name = res.name;
						this.phone = res.phone;
						this.intro = res.intro || '';
						this.realAuthFlag = res.realAuthFlag == 1;
						this.allList[0].data = res.skillSet;
						this.allList[1].data = res.userRoleSet;
						this.allList[2].data = res.projectSet;
						this.allList[3].data = res.toolSet;
					});
			},
			queryComments() {
				this.$http
					.post('/b/ordercomment/queryPageList', {
						userId: this.id,
						userType: 1,
						pageSize: 100,
						sortInfos: [{
							field: 'addTime',
							sort: 'desc',
						}]
					}, true)
					.then(res => {
						this.commentList = res.dataList;
					});
			},
			// 编辑头像
			editHeader() {
				this.$refs.updateHeader.show()
			},
			updateHeader(headImgUrl) {
				this.$http
					.post('/b/customer/updateHeadImg', {
						headImgUrl,
					}, true)
					.then(res => {
						this.$refs.updateHeader.hide();
						uni.showToast({ title: '更新成功' });
						this.queryPersonInfo();
						this.$store.dispatch('queryUserInfo');
					});
			},
		},
	}
</script>
<style lang="scss" scoped>
	.pd-top {
		background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);
		height: 148rpx;
		box-sizing: border-box;
		padding-top: 16rpx;

		.pd-top1 {
			@include flexCenter;
			box-sizing: border-box;
			margin: 0 32rpx 0 auto;
			height: 48rpx;
			width: 200rpx;
			border-radius: 8rpx;
			border: 2rpx solid #828282;

			.pd-top1-img {
				width: 32rpx;
				height: 32rpx;
			}

			.pd-top1-text {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 32rpx;
				margin-left: 16rpx;
			}
		}
	}

	.pd-header {
		padding: 24rpx 32rpx 32rpx 32rpx;
		background-color: white;
		position: relative;

		.pd-header-img {
			background-color: #F3F4F5;
			width: 200rpx;
			height: 200rpx;
			position: absolute;
			left: 48rpx;
			top: -103rpx;
			border-radius: 100%;
		}

		.pd-header-text {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-left: auto;
			width: 176rpx;
			height: 48rpx;

			.pd-header-edit-image {
				width: 36rpx;
				height: 36rpx;
			}

			.pd-header-edtext {
				padding: 0 16rpx;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #323335;
				line-height: 32rpx;
			}
		}

		.pd-header-name {
			font-size: 52rpx;
			margin-top: 120rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name-text {
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #2C3580;
        line-height: 64rpx;
      }
		}

		.pd-header-phone {
			display: flex;
			align-items: center;

			.pd-header-phonenum {
				padding-left: 16rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #323335;
			}

			.pd-header-edit-icon {
				flex-shrink: 0;
				width: 32rpx;
				height: 32rpx;
			}
		}

		.pd-header-phone1 {
			margin: 48rpx 0 16rpx 0;
		}

		.pd-header-info {
			width: 686rpx;
			background: #F3F4F5;
			box-sizing: border-box;
			padding: 32rpx;
			border-radius: 8rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #828282;
			line-height: 48rpx;
			margin-top: 32rpx;
		}
	}

	.pd-skill {
		background-color: white;
		margin-top: 32rpx;

		.pd-skill-item {
			margin-left: 32rpx;
			border-bottom: 1rpx solid #EBEDF0;
			padding-bottom: 24rpx;

			&:nth-last-child(1) {
				border: none;
			}

			.pd-skill-it1 {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #323335;
				line-height: 36rpx;
				margin: 28rpx 0 20rpx 0;
			}

			.pd-skill-it2 {
				display: inline-flex;
				flex-flow: row wrap;

				.pd-skill-it3 {
					margin-right: 16rpx;
					min-width: 72rpx;
					height: 40rpx;
					border-radius: 8rpx;
					@include flexCenter;
					border: 2rpx solid #EDEDED;
				}
			}
		}
	}

	.pd-comment {
		background-color: white;
		margin: 32rpx 0;
	}
</style>
<style lang="scss">
	@import "../../mine/addressManage/_pageStyle.scss";
</style>
