<template>
	<view class="receipt">
		<custom-navbar title="发单" top-z-index="9999" />

		<back-container>
			<template #headerSlot>
				<offer-head :title="typeArray[orderType - 1].title" :text="typeArray[orderType - 1].intro" />
			</template>

			<view class="receipt-addr">
				<view class="receipt-ac-item">
					<view class="receipt-ac-lable">下单模式</view>
					<picker class="receipt-ac-midle" @change="orderModeChange" :value="orderModeText" :range="modeArray"
						range-key="title">
						<view>{{ orderModeText || '请选择' }}</view>
					</picker>

					<uni-icons class="receipt-ac-right" type="arrowright" size="18" color="#969799" />
				</view>

				<view v-if="orderMode == 0" class="receipt-ac-item">
					<view class="receipt-ac-lable">承接人手机号</view>
					<input class="receipt-ac-midle input-sty" :value="appointPhone" @input="(e) => onInput(e, 'phone')"
						placeholder="请输入手机号" placeholder-class="input-placeholder" />
				</view>

				<view class="choose-time">
					<view class="receipt-ac-lable">报价截止</view>
					<view :class="['receipt-ac-midle', quoteEnd ? '' : 'middle-placeholder']"
						@click="$refs.datePicker.show()">{{ quoteEnd || '请选择截止日期' }}</view>
					<uni-icons class="receipt-ac-right" type="arrowright" size="18" color="#969799" />
					<uni-datetime-picker ref="datePicker" z-index="100" class="choose-picker" :value="quoteEnd"
						type="datetime" :start="startTime" @change="quoteEndChange" :hide-second="true" />
				</view>

				<my-choose-time v-model="workTime" title="工作周期" format="YYYY-MM-DD HH:mm" placeholder="请选择工作周期" />

				<checkd-item :value="invoiceType" @change="change" />

			</view>
		</back-container>

		<view class="address-box">
			<member-title title="工作地址：" :show-right="false" />
			<view class="address-bi" @click="selectAddress">
				<image src='https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/default-head.svg'
					class="address-img" />
				<view class="address-right">
					<view class="address-rt">
						<text class="address-rt1">{{ orderAddress.name || ''}}</text>
						<text class="address-rt2">{{ orderAddress.phone || ''}}</text>
						<uni-icons type="arrowright" size="18" color="#969799" />
					</view>
					<view class="address-rb">
						{{ orderAddress.province
						 ? `${orderAddress.province} ${orderAddress.city} ${orderAddress.district} ${orderAddress.address}`
						 : '' }}
					</view>
				</view>
			</view>
		</view>

		<view class="require-box dlFlex">
			<view class="title dlFlex">工作需求</view>
			<view class="empty-view dlFlex" v-if="orderItemList.length == 0" @click="toAddWorkPage">
				<image class="empty-img"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/default/noWork.png"
					mode="aspectFit"></image>
				<view class="dlFlex">
					<view class="tipTitle">暂无工作需求</view>
					<view class="tipDesc">可添加多个需求</view>
				</view>
			</view>
			<view class="require-white" v-else>
				<offer-content-card v-for="(i, index) in orderItemList" :key="index" right-type="0"
					:title="getItemTitle(i)" :specItem="getSpecList(i)" :image="itemImage"
					:show-last-border-bottom="index < (orderItemList.length -1)" @onClick="toEditWorkPage(index, i)" />
			</view>

			<view class="add-view dlFlex" @click="toAddWorkPage">
				<image class="addImg"
					src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconCircleAdd.svg"
					mode="aspectFit"></image>
				<view class="text">添加工作</view>
				<uni-icons type="arrowright" size="20" color="#BDBDBD" />
			</view>
		</view>

		<view class="require-bbl">
			<add-remark :value="remark" @input="remarkChange" />

			<view class="top-aline111" />

			<view class="require-order-set21">
				<view class="require-order-set21-title">接单范围</view>
				<input placeholder="请输入接单距离" class="require-input-so input-sty" :value="distance"
					@input="(e) => onInput(e, 'distance')" placeholder-class="placeholder-class" />
				<text class="require-order-set2-unit">公里</text>
			</view>
		</view>

		<bottom-height />

		<iphonex-bottom>
			<big-btn @click="submitCheck" />
		</iphonex-bottom>
	</view>
</template>

<script>
	import BackContainer from "../../mine/addressManage/component/backContainer";
	import OfferHead from "../../receive-order/component/offerHead";
	import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
	import BigBtn from "../../mine/addressManage/component/bigBtn";
	import CheckdItem from "./checkdItem";
	import MemberTitle from "../../receive-order/myTeam/memberTitle";
	import OfferContentCard from "../../receive-order/component/offerContentCard";
	import MyChooseTime from "./myChooseTime";
	import AddRemark from "../../receive-order/component/addRemark";
	import dayjs from 'dayjs';
	import BottomHeight from "../../mine/realNameAuth/bottomHeight";

	export default {
		name: 'placeOrder',
		components: {
			BottomHeight,
			AddRemark,
			MyChooseTime,
			OfferContentCard,
			MemberTitle,
			CheckdItem,
			BigBtn,
			IphonexBottom,
			OfferHead,
			BackContainer
		},
		data() {
			return {
				orderType: 1,
				typeArray: [{
						orderType: 1,
						title: '实施与维修',
						intro: '电子产品的实施与维修工作',
						url: '/pages/place-order/addImplementation/addImplementation'
					},
					{
						orderType: 2,
						title: '勘察设计',
						intro: '为工程项目进行测量、勘探、试验和鉴定、评价的工作',
						url: '/pages/place-order/addCanBeSetWork/addCanBeSetWork'
					},
					{
						orderType: 3,
						title: '各类专业人员',
						intro: '各类形形式式的专业人员',
						url: '/pages/place-order/addPersonWork/addPersonWork'
					},
					{
						orderType: 4,
						title: '租赁工作',
						intro: '租赁各种大小型机动车或专业特种用车',
						url: '/pages/place-order/addLeaseWork/addLeaseWork'
					},
					{
						orderType: 5,
						title: '软件开发',
						intro: '寻找各类型程序猿、设计湿等，为改变世界而奋斗',
						url: '/pages/place-order/addSoftwareDevelop/addSoftwareDevelop'
					},
				],
				modeArray: [{
					title: '指定承接人',
					id: 0
				}, {
					title: '匹配承接人',
					id: 1
				}],
				orderMode: 1, // 下单模式 0指定承接人 1匹配承接人
				orderModeText: '匹配承接人',
				appointPhone: '', // 指定承接人手机
				distance: '', // 期望接单距离
				invoiceType: 2, // 发票类型 1专票 2普票
				orderAddress: {
					name: '',
					phone: '',
					province: '',
					city: '',
					district: '',
					address: '',
				}, // 地址
				orderItemList: [], // 工作列表
				itemImage: '',
				quoteTime: [], // 报价周期
				quoteEnd: '',
				workTime: [], // 工作周期
				remark: '', // 备注
			}
		},
		computed: {
			startTime() {
				return dayjs().format('YYYY-MM-DD');
			},
		},
		onLoad(option) {
			if (option.orderType) {
				this.orderType = Number(option.orderType);
			}
		},
		onReady() {
			this.queryDefaultAddress();
			this.queryItemImg();
		},
		methods: {
			queryDefaultAddress() {
				this.$http.post('/b/customeraddress/queryPageList', {
						defaultFlag: 1
					}, true)
					.then(res => {
						if (res.totalCount == 1) {
							this.orderAddress = res.dataList[0];
						}
					})
			},
			queryItemImg() {
				this.$http.post('/b/ordermaster/orderTypeImg', {})
					.then(res => {
						const item = res.filter((i) => i.type == this.orderType)[0];
						this.itemImage = item ? item.icon : '';
						console.log('itemImage ', this.itemImage);
					})
			},
			orderModeChange(e) {
				const index = e.target.value;
				this.orderMode = this.modeArray[index].id;
				this.orderModeText = this.modeArray[index].title;
			},
			quoteEndChange(time) {
				this.quoteEnd = dayjs(time).format('YYYY-MM-DD HH:mm');
			},
			change(data) {
				if (data == 1) {
					this.$tool.showToast('暂不支持专票')
				}
				// this.invoiceType = data
			},
			onInput(e, type) {
				const text = e.target.value;
				if (type == 'phone') {
					this.appointPhone = text;
				} else if (type == 'distance') {
					this.distance = text;
				}
			},
			remarkChange(value) {
				this.remark = value;
			},
			selectAddress() {
				uni.navigateTo({
					url: `/pages/mine/addressManage/addressManage?isSelect=1`,
					events: {
						onSelect: (address) => {
							this.orderAddress = address;
						}
					}
				})
			},
			getItemTitle(work) {
				if (this.orderType == 1) {
					return work.type == 1 ? '实施' : '维修';
				} else if (this.orderType == 2) {
					return '勘测';
				} else if (this.orderType == 3) {
					return work.cateName;
				} else if (this.orderType == 4) {
					return work.cateName;
				} else if (this.orderType == 5) {
					return work.cateName;
				}
				return '';
			},
			getSpecList(work) {
				if (this.orderType == 1) {
					// 实施
					return [{
							label: '技能：',
							value: work.cateName
						},
						{
							label: '品牌/型号：',
							value: `${work.brand}/${work.model ? work.model : '-'}`
						},
						{
							label: '数量：',
							value: work.number
						},
					];
				} else if (this.orderType == 2) {
					// 勘测
					return [{
						label: '面积：',
						value: work.number
					}, ];
				} else if (this.orderType == 3) {
					// 人员岗位
					return [{
						label: '数量：',
						value: work.number
					}, ];
				} else if (this.orderType == 4) {
					// 设备
					return [{
							label: '数量：',
							value: work.number
						},
						{
							label: '使用路程：',
							value: work.distance
						},
					];
				}
				return [];
			},
			toAddWorkPage() {
				uni.navigateTo({
					url: this.typeArray[this.orderType - 1].url,
					events: {
						onEdit: (work) => {
							this.orderItemList.push(work);
						}
					}
				})
			},
			toEditWorkPage(index, work) {
				uni.navigateTo({
					url: this.typeArray[this.orderType - 1].url,
					events: {
						onEdit: (work) => {
							this.orderItemList.splice(index, 1, work);
						}
					},
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('editWork', work);
					}
				})
			},
			checkParams() {
				if (this.orderMode == 0 && !this.appointPhone) {
					uni.showToast({
						title: '请输入指定人的手机号',
						icon: 'none'
					});
					return false;
				}
				const quoteEnd = this.quoteEnd;
				if (!quoteEnd) {
					uni.showToast({
						title: '请选择报价截止日期',
						icon: 'none'
					});
					return false;
				}
				const now = dayjs().valueOf();
				const end = dayjs(quoteEnd).valueOf();
				if (now >= end) {
					uni.showToast({
						title: '报价周期不能早于今天',
						icon: 'none'
					});
					return false;
				}
				const workStart = this.workTime[0];
				if (!workStart) {
					uni.showToast({
						title: '请选择工作周期',
						icon: 'none'
					});
					return false;
				}
				const workStartValue = dayjs(workStart).valueOf();
				if (workStartValue < end) {
					uni.showToast({
						title: '工作开始时间不能早于报价时间',
						icon: 'none'
					});
					return false;
				}

				if (!this.orderAddress.name) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					});
					return false;
				}
				if (this.orderItemList.length == 0) {
					uni.showToast({
						title: '请添加工作',
						icon: 'none'
					});
					return false;
				}

				if (this.distance == 0) {
					uni.showToast({
						title: '接单距离不能为0',
						icon: 'none'
					});
					return false;
				}

				return true;
			},
			submitCheck() {

				this.$tool.actionForAuth(() => {

					if (!this.checkParams()) return;

					uni.showModal({
						title: '提示',
						content: '您确定发布订单吗?',
						success: (res) => {
							if (res.confirm) {
								this.submitOrder();
							}
						}
					})
				});
			},
			submitOrder() {
				const params = {
					appointPhone: this.appointPhone ? this.appointPhone : undefined,
					distance: this.distance ? this.distance : undefined,
					invoiceType: this.invoiceType,
					orderAddress: this.orderAddress,
					orderItemList: this.orderItemList,
					orderMode: this.orderMode,
					orderType: this.orderType,
					quotationStart: dayjs().format('YYYY-MM-DD HH:mm:ss'),
					quotationEnd: this.quoteEnd,
					remark: this.remark,
					workEnd: this.workTime[1],
					workStart: this.workTime[0],
				}
				this.$http
					.post('/b/ordermaster/add', params, true)
					.then(res => {
						uni.showModal({
							title: '提示',
							content: '需求发布成功,等待承接方报价',
							confirmText: '查看订单',
							cancelText: '返回首页',
							success: (res1) => {
								if (res1.confirm) {
									uni.navigateTo({
										url: `/pages/place-order/orderDetail/orderDetail?id=${res.id}&isPlaceOrder=1`,
									})
								} else {
									uni.switchTab({
										url: '/pages/home/index/index'
									});
								}
							}
						})
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../mine/addressManage/_inputStyle.scss";

	.receipt {
		.receipt-addr {
			box-sizing: border-box;
			padding: 15rpx 0 0 32rpx;

			.receipt-ac-item {
				display: flex;
				align-items: center;
				height: 88rpx;
				padding-right: 32rpx;

				&:not(:nth-last-child(1)) {
					border-bottom: 1rpx solid #EBEDF0;
				}

				.receipt-ac-lable {
					flex-shrink: 0;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #323335;
				}

				.receipt-ac-midle {
					margin-left: auto;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					text-align: right;
				}

				.receipt-ac-right {
					padding-left: 18rpx;
				}
			}

			.choose-time {
				display: flex;
				align-items: center;
				height: 88rpx;
				padding-right: 32rpx;
				border-bottom: 1rpx solid #EBEDF0;
				position: relative;
				z-index: 1000;

				.receipt-ac-lable {
					flex-shrink: 0;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #323335;
				}

				.receipt-ac-midle {
					margin-left: auto;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #828282;
					text-align: right;
				}

				.middle-placeholder {
					color: #BDBDBD;
				}

				.receipt-ac-right {
					padding-left: 18rpx;
				}

				// 把picker 藏的远远的  用 ref的方式调用
				.choose-picker {
					position: absolute;
					left: -1000rpx;
					top: 0;
				}
			}
		}

		/deep/ .input-placeholder {
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #BDBDBD;
		}

		.address-box {
			margin-top: 16rpx;

			.address-bi {
				padding: 32rpx;
				background-color: white;
				display: flex;

				.address-img {
					flex-shrink: 0;
					width: 96rpx;
					height: 96rpx;
					background: #F3F4F5;
					border-radius: 8rpx;
					margin-right: 16rpx;
				}

				.address-right {
					flex: 1;

					.address-rt {
						display: flex;
						align-items: center;

						.address-rt1 {
							flex: 1;
							font-size: 28rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #323232;
							line-height: 40rpx;
						}

						.address-rt2 {
							flex-shrink: 0;
							font-size: 28rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #969799;
							line-height: 36rpx;
						}
					}

					.address-rb {
						width: 414rpx;
						margin-top: 16rpx;
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #969799;
						line-height: 36rpx;
					}
				}
			}
		}

		.require-box {
			margin-top: 32rpx;
			background-color: #FFFFFF;

			.title {
				height: 88rpx;
				margin-left: 30rpx;
				justify-content: center;
				color: #333333;
				font-size: 28rpx;
				border-bottom: 1rpx solid #EDEDED;
			}

			.empty-view {
				height: 224;
				justify-content: center;
				align-items: center;
				flex-direction: row;
				height: 224rpx;

				.empty-img {
					width: 96rpx;
					height: 96rpx;
				}

				.tipTitle {
					margin-left: 16rpx;
					color: #333333;
					font-size: 32rpx;
				}

				.tipDesc {
					margin-left: 16rpx;
					color: #bdbdbd;
					font-size: 24rpx;
					margin-top: 10rpx;
				}
			}

			.require-white {
				margin-left: 30rpx;
			}

			.add-view {
				margin-left: 30rpx;
				padding-right: 30rpx;
				height: 80rpx;
				flex-direction: row;
				align-items: center;
				border-top: 1rpx solid #EDEDED;

				.addImg {
					width: 32rpx;
					height: 32rpx;
				}

				.text {
					font-size: 28rpx;
					margin-left: 18rpx;
					color: #3D49AB;
					flex: 1;
				}
			}
		}

		.require-bbl {
			//margin: 0 0 200rpx 0;
			margin-top: 32rpx;
			background-color: white;

			.top-aline111 {
				margin: 30rpx 0 0 32rpx;
				height: 1rpx;
				background-color: #EAECEF;
			}

			.require-order-set21 {
				height: 88rpx;
				@include flexBetween;
				padding: 0 32rpx;

				.require-order-set21-title {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #323335;
					line-height: 36rpx;
				}

				.require-input-so {
					flex: 1;
					text-align: right;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #BDBDBD;
				}

				.require-order-set2-unit {
					padding-left: 8rpx;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #828282;
				}
			}
		}
	}
</style>

<style lang="scss">
	@import "../../mine/addressManage/_pageStyle.scss";
</style>
