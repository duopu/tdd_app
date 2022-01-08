<template>
 	<view class="edit-address">
 		<custom-navbar title="编辑地址" />
 		<back-container>
 			<view class="edit-addr">
 				<map style="width: 686rpx;height: 344rpx;margin: 0 32rpx 16rpx 0;" :latitude="oLatitude"
 					:longitude="oLongitude" :enable-scroll="false" :enable-zoom="false" :enable-rotate="false" @regionchange="onRegionchange" />

 				<view class="edit-item">
 					<view class="edit-lable">所在地区</view>
					<picker class="edit-midle input-sty" mode="region" @change="onRegionChange">
 					  <view class="edit-midle input-sty">{{ province ? `${province} ${city} ${district}` : '请选择地址'}}</view>
					</picker>
 				</view>

 				<view class="edit-item">
 					<view class="edit-lable">详细地址</view>
 					<input class="edit-midle input-sty" :value="address" @input="onAddressInput" placeholder="请输入"
 						placeholder-class="input-placeholder" />
 				</view>

 				<view class="edit-item">
 					<view class="edit-lable">联系人</view>
 					<input class="edit-midle input-sty" :value="name" @input="onNameInput" placeholder="请输入"
 						placeholder-class="input-placeholder" />
 				</view>

 				<view class="edit-item">
 					<view class="edit-lable">联系电话</view>
 					<input class="edit-midle input-sty" :value="phone" @input="onPhoneInput" placeholder="请输入"
 						placeholder-class="input-placeholder" />
 				</view>
				
				<view class="edit-item-flag">
					<view class="edit-lable">设为默认地址</view>
					<switch style="transform: scale(0.7, 0.7)" color="#3340A0" :checked="defaultFlag" @change="defaultChange"/>
				</view>

 			</view>
 		</back-container>

 		<view class="edit-address-tips">所在位置：经度：{{ longitude }} 纬度：{{ latitude }}</view>

 		<!-- 底部按钮 -->
 		<iphonex-bottom>
 			<bottom-operate @operateDel="operateDel" @operateSave="operateSave" />
 		</iphonex-bottom>
 	</view>
 </template>

 <script>
 	import BackContainer from "../addressManage/component/backContainer";
 	import IphonexBottom from "../addressManage/component/iphonexBottom";
 	import BottomOperate from "../addressManage/component/bottomOperate";

 	export default {
 		name: 'editAddress',
 		components: {
 			BottomOperate,
 			IphonexBottom,
 			BackContainer
 		},
 		data() {
 			return {
 				id: 0, // 使用 marker点击事件 需要填写id
 				title: 'map',
 				address: '',
 				city: '',
 				cityId: 0,
 				customerId: '',
 				defaultFlag: 0,
 				district: '',
 				districtId: 0,
 				name: '',
 				phone: '',
 				province: '',
 				provinceId: 0,
 				latitude: 0,
 				longitude: 0,
 				oLatitude: 0,
 				oLongitude: 0,
 			}
 		},
 		onLoad(option) {
 			if (option.id) { // 编辑地址
 				this.id = Number(option.id);
 				this.queryAddressInfo(this.id);
 			} else {
 				this.checkLocationPermission();
 			}
 		},
 		methods: {
 			queryAddressInfo(id) {
 				this.$http
 					.post('/b/customeraddress/query', {
 						id
 					}, true)
 					.then(res => {
 						this.address = res.address;
 						this.city = res.city;
 						this.cityId = res.cityId;
 						this.defaultFlag = res.defaultFlag;
 						this.district = res.district;
 						this.districtId = res.districtId;
 						this.latitude = res.latitude;
 						this.longitude = res.longitude;
 						this.name = res.name;
 						this.phone = res.phone;
 						this.province = res.province;
 						this.provinceId = res.provinceId;
 						// 用于地图显示
 						this.oLatitude = res.latitude;
 						this.oLongitude = res.longitude;
 					})
 			},
			checkLocationPermission() {
				uni.authorize({
				    scope: 'scope.userLocation',
				    success: () => {
							this.getLocation();
				    },
						fail: (res) => {
							uni.showModal({
								title: '提示',
								content: '您尚未授权获取定位信息，是否打开？',
								confirmText: '去授权',
								success: (res) => {
									if (res.confirm) {
										uni.openSetting({
											success: (res) => {
											  console.log(res.authSetting)
												this.getLocation();
											}
										})
									}
								}
							})
						},
				})
			},
 			getLocation() {
 				console.log('getLocation');
 				uni.getLocation({
 					type: 'gcj02',
 					geocode: true,
 					success: (res) => {
 						console.log('当前位置的经度：' + res);
 						this.latitude = res.latitude;
 						this.longitude = res.longitude;
 						// 用于地图显示
 						this.oLatitude = res.latitude;
 						this.oLongitude = res.longitude;
 						// 处理地理地址信息
 						this.queryGeoAddressInfo(res.latitude, res.longitude)
 					}
 				});
 			},
 			queryGeoAddressInfo(latitude, longitude) {
				if(latitude == 0 || longitude == 0) return;
 				const params = {
 					latitude,
 					longitude,
 				}
 				this.$http.post('/core/geo/queryRegionByLocation', params)
 					.then(res => {
						console.log('eeee',res);
 						this.address = res.formattedAddress.replace(res.province ,'').replace(res.city ,'').replace(res.district ,'');
 						this.city = res.city;
 						this.cityId = res.cityId;
 						this.district = res.district;
 						this.districtId = res.districtId;
 						this.province = res.province;
 						this.provinceId = res.provinceId;
 					})
 			},
			queryLocationByAddress() {
				const address = this.province + this.city + this.city + this.address;
				this.$http.post('/core/geo/queryLocationByAddress', { address })
					.then(res => {
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						// 用于地图显示
						this.oLatitude = res.latitude;
						this.oLongitude = res.longitude;
					})
			},
 			onRegionchange(event) {
				return;
 				console.log('onRegionchange event ', event);
 				if (event.type == 'end') {
 					this.latitude = event.target.centerLocation.latitude;
 					this.longitude = event.target.centerLocation.longitude;
 					// 处理地理地址信息
 					this.queryGeoAddressInfo(this.latitude, this.longitude);
 				}
 			},
			onRegionChange(e) {
				console.log('onRegionChange ', e);
				const region = e.target.value;
				const code = e.target.code[2];
				this.province = region[0];
				this.provinceId = Number(code.slice(0, 2));
				this.city = region[1];
				this.cityId = Number(code.slice(0, 4));
				this.district = region[2];
				this.districtId = Number(code.slice(0, 6));
				this.queryLocationByAddress();
			},
 			onAddressInput(event) {
 				this.address = event.target.value;
				this.queryLocationByAddress();
 			},
 			onNameInput(event) {
 				this.name = event.target.value;
 			},
 			onPhoneInput(event) {
 				this.phone = event.target.value;
 			},
			defaultChange() {
				this.defaultFlag = this.defaultFlag == 1 ? 0 : 1;
			},
 			checkParams() {
 				if (!this.city) {
 					uni.showToast({
 						title: '请选择地址',
 						icon: 'none'
 					});
 					return false;
 				}
 				if (!this.address) {
 					uni.showToast({
 						title: '请输入详细地址',
 						icon: 'none'
 					});
 					return false;
 				}
 				if (!this.name) {
 					uni.showToast({
 						title: '请输入联系人',
 						icon: 'none'
 					});
 					return false;
 				}
 				if (!this.phone) {
 					uni.showToast({
 						title: '请输入联系电话',
 						icon: 'none'
 					});
 					return false;
 				}
 				return true;
 			},
 			// 新增/编辑地址
 			operateSave() {

 				if (!this.checkParams()) return;

 				const params = {
 					id: this.id,
 					address: this.address,
 					cityId: this.cityId,
 					defaultFlag: this.defaultFlag,
 					districtId: this.districtId,
 					latitude: this.latitude,
 					longitude: this.longitude,
 					name: this.name,
 					phone: this.phone,
 					provinceId: this.provinceId,
 				};

 				const url = `/b/customeraddress/${this.id ? 'update' : 'add'}`;

 				this.$http
 					.post(url, params, true)
 					.then(res => {
 						uni.showToast({
 							title: '编辑成功',
 							success: () => {
 								uni.navigateBack({});
 							},
 						});
 					})
 			},
 			// 删除地址
 			operateDel() {

 				uni.showModal({
 					content: '是否删除该地址?',
 					success: (res) => {
 						if (res.confirm) {
 							this.deleleAddress();
 						}
 					}
 				})
 			},
 			deleleAddress() {
 				// todo: 删除地址
 				this.$http
 					.post('/b/customeraddress/delete', {
 						id: this.id
 					}, true)
 					.then(res => {
 						uni.showToast({
 							title: '删除成功',
 							success: () => {
 								uni.navigateBack({});
 							},
 						});
 					})
 			},
 		}
 	}
 </script>
 <style lang="scss" scoped>
 	@import "../../mine/addressManage/_inputStyle.scss";

 	.edit-address {
 		.edit-addr {
 			box-sizing: border-box;
 			padding: 15rpx 0 0rpx 32rpx;

 			.edit-item {
 				display: flex;
 				align-items: center;
 				height: 88rpx;
 				padding-right: 32rpx;
 				border-bottom: 1rpx solid #EBEDF0;

 				.edit-lable {
 					flex-shrink: 0;
 					font-size: 28rpx;
 					font-family: PingFang SC-Regular, PingFang SC;
 					font-weight: 400;
 					color: #323335;
 				}

 				.edit-midle {
 					margin-left: auto;
 					font-size: 28rpx;
 					font-family: PingFang SC-Regular, PingFang SC;
 					font-weight: 400;
 					color: #BDBDBD;
 					text-align: right;
 				}

 				.edit-right {
 					padding-left: 18rpx;
 				}
 			}
			
			.edit-item-flag {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 88rpx;
				padding-right: 32rpx;
				
				.edit-lable {
					flex-shrink: 0;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #323335;
				}
			}
 		}

 		/deep/.input-placeholder {
 			font-size: 28rpx;
 			font-family: PingFang SC-Regular, PingFang SC;
 			font-weight: 400;
 			color: #BDBDBD;
 		}

 		.edit-address-tips {
 			font-size: 24rpx;
 			font-family: PingFang SC-Regular, PingFang SC;
 			font-weight: 400;
 			color: #828282;
 			line-height: 32rpx;
 			margin: 16rpx 32rpx;
 		}
 	}
 </style>
 <style lang="scss">
 	page {
 		background-color: #ECEDF9;
 	}
 </style>
