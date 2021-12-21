<template>
	<view>
		<view class="oc-card" @click="$emit('onClick')">
			<image :src="image" class="oc-card-img" />
			<view class="oc-middle">
				<view class="oc-middle-title">{{ title }}</view>
				<view class="oc-middle-text" v-for="i in specItem" :key="i.label">
					{{ i.label }} {{ i.value }}
				</view>
			</view>

			<view class="oc-right-set" v-if="rightType == 2" @click="$emit('onChange')">设置报价</view>

			<view class="oc-right-set" v-if="rightType == 3" @click="$emit('onChange')">分配金额</view>

			<view class="oc-right" v-if="rightType == 1">
				<my-price :price="price" />
				<view class="oc-right-btn" @click="$emit('onChange')">修改</view>
			</view>

			<view v-if="rightType == 4" class="oc-right4">未报价</view>
			<!-- <view v-if="rightType == '5'" class="oc-right4 oc-right5">已选价</view> -->
			<view class="oc-right" v-if="rightType == 5">
				<my-price :price="price" />
			</view>


			<view class="oc-right" v-if="rightType == 6">
				<my-price :price="price" />
				<view class="oc-right-text" :class="{
						'right-text-green': state == 1,
						'right-text-red': state == 2,
					}">{{ state == 0 ? '未确认' : state == 1 ? '已确认' : '已拒绝' }}</view>
			</view>

			<uni-icons v-if="rightType == 0" class="oc-arrow" type="arrowright" size="20" color="#BDBDBD" />
		</view>
		<view v-if="showLastBorderBottom" class="oc-bottom" />
	</view>
</template>
<script>
	import MyPrice from "./myPrice";

	export default {
		name: "offerContentCard",
		components: {
			MyPrice
		},
		props: {
			// 是否展示最后一项的边框线
			showLastBorderBottom: {
				type: Boolean,
				default: false
			},
			// 右边区域类型 0 不显示按钮区域 1 修改按钮+价格   2 设置报价  3 分配金额  4 未选价  5 已选价
			rightType: {
				type: Number,
				default: 1
			},
			image: {
				type: String,
				default: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-4.png',
			},
			title: {
				type: String,
				default: '实施',
			},
			specItem: {
				type: Array,
				default () {
					return [{
							label: '技能：',
							value: '服务器'
						},
						{
							label: '品牌/型号：',
							value: '华为/p30'
						},
						{
							label: '数量：',
							value: '100'
						},
					]
				}
			},
			price: {
				type: String,
				default: ''
			},
			state: {
				type: Number,
				default: 0,
			}
		},
	}
</script>
<style scoped lang="scss">
	.oc-card {
		width: 718rpx;
		display: flex;
		box-sizing: border-box;
		padding: 32rpx 32rpx 32rpx 0;

		.oc-card-img {
			width: 96rpx;
			height: 96rpx;
			background: #F3F4F5;
			border-radius: 8rpx;
			margin-right: 20rpx;
		}

		.oc-middle {
			flex: 1;

			.oc-middle-title {
				margin-bottom: 16rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #323335;
				line-height: 36rpx;
			}

			.oc-middle-text {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #828282;
				line-height: 36rpx;
			}
		}

		.oc-right {
			align-self: center;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;

			.oc-right-btn {
				@include flexCenter;
				width: 80rpx;
				height: 48rpx;
				border-radius: 32rpx;
				border: 2rpx solid #EDEDED;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4F4F4F;
			}

			.oc-right-text {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #5AC8FA;
			}

			.right-text-green {
				color: #34C759;
			}

			.right-text-red {
				color: #FF3B30;
			}
		}

		.oc-right-set {
			align-self: center;
			flex-shrink: 0;
			@include flexCenter;
			width: 172rpx;
			height: 64rpx;
			border-radius: 32rpx;
			border: 2rpx solid #EDEDED;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #4F4F4F;
		}

		.oc-arrow {
			align-self: center;
			margin-left: 12rpx;
		}

		.oc-right4 {
			width: 116rpx;
			color: white;
			align-self: center;
			height: 48rpx;
			background: #FF3B30;
			border-radius: 8rpx;
			@include flexCenter;
		}

		.oc-right5 {
			background: #34C759;
		}
	}

	.oc-bottom {
		width: 606rpx;
		height: 1rpx;
		background-color: #EAECEF;
		margin-left: auto;
	}
</style>
