<template>
	<view>
		<custom-navbar title="关于我们" />

		<back-container>

			<view class="about-us">
				<image class="about-us-img"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/logo-image1.png" />
				<view class="about-us-text">{{ remark }}</view>

				<view class="list-box">
					<view class="list-item-cc" v-for="i in list" :key="i.title">
						<image class="list-item-img" :src="i.url" />
						<view class="list-item-right">
							<view class="list-title">{{ i.title }}</view>
							<view class="list-text">{{ i.text }}</view>
							<view class="list-item-copy">复制</view>
						</view>
					</view>
				</view>
			</view>
		</back-container>

		<consulting-model ref="consultingModel" @confirm="submitQuestion" />

		<!-- <iphonex-bottom z-index="99">
      <big-btn button-text="我要咨询" @click="$refs.consultingModel.show()" />
    </iphonex-bottom> -->
	</view>
</template>

<script>
	import BackContainer from "../addressManage/component/backContainer";
	import IphonexBottom from "../addressManage/component/iphonexBottom";
	import BigBtn from "../addressManage/component/bigBtn";
	import ConsultingModel from "./consultingModel";

	export default {
		name: "aboutUs",
		components: {
			ConsultingModel,
			BigBtn,
			IphonexBottom,
			BackContainer
		},
		data() {
			return {
				remark: '空间布局是体系化视觉设计的起点，和传统的平面设计的不同之处在于，UI 界面的布局空间要基于「动态、体系化」的角度出发展开。我们受到建筑界大师柯布西耶的模度思想的启发，基于「秩序之美」的原则，探索 UI 设计中的动态空间秩序，形成了 Ant Design 的界面布局方式，为设计者构筑具备理性之美的布局空间创造了条件。',
				list: [{
						url: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/weixin-icon1.svg',
						title: '官方微信：',
						text: 'WX29384'
					},
					{
						url: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/qq-icon1.svg',
						title: '官方 QQ：',
						text: '234234u234'
					},
					{
						url: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/sms-icon1.svg',
						title: '电子邮箱：',
						text: 'ikoksdf@oks.com'
					},
				]
			};
		},
		onReady() {
			this.queryAboutUs()
		},
		methods: {
			queryAboutUs() {
				this.$http
					.post('/core/aboutus/query', {}, true)
					.then(res => {
						this.remark = res.remark;
						this.list[0].text = res.wechat;
						this.list[1].text = res.qq;
						this.list[2].text = res.email;
					});
			},
			submitQuestion(params) {
				this.$http
					.post('/b/customerquestion/add', params, true)
					.then(res => {
						uni.showToast({
							title: '您的咨询已提交!'
						});
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.about-us {
		display: flex;
		flex-flow: column wrap;

		.about-us-img {
			width: 686rpx;
			height: 344rpx;
			margin: 50rpx auto 32rpx auto;
		}

		.about-us-text {
			border-top: 1rpx solid #ECEDF9;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 48rpx;
			padding: 32rpx;
			border-bottom: 14rpx solid #ECEDF9;
		}

		.list-box {
			.list-item-cc {
				display: flex;
				align-items: center;

				.list-item-img {
					width: 48rpx;
					height: 48rpx;
					margin: 20rpx 20rpx 20rpx 32rpx;
				}

				.list-item-right {
					flex: 1;
					display: flex;
					height: 88rpx;
					align-items: center;
					border-bottom: 2rpx solid #EAECEF;

					.list-title {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #323335;
					}

					.list-text {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #BDBDBD;
						margin-right: auto;
					}

					.list-item-copy {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #4F4F4F;
						width: 80rpx;
						height: 48rpx;
						border-radius: 32rpx;
						border: 2rpx solid #EDEDED;
						@include flexCenter;
						margin-right: 32rpx;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	@import "../addressManage/_pageStyle.scss";
</style>
