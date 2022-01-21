<template>
  <view>
    <custom-navbar title="申请开始工作" />

    <back-container>
      <template #headerSlot>
        <offer-head :title="$tool.orderType(order.orderType)" :text="`订单编号：${order.id}`" />
      </template>

      <view class="abw">

        <quoted-iten :order="order" :isPlaceOrder="isPlaceOrder"/>

      </view>

    </back-container>

    <view class="abw-progress">
      <view class="abwp-title">工作进度</view>

      <view class="abwp-body">
        <view class="abwp-l">
          <image class="abwp-lt1" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/applyJob1.svg" />
          <view class="abwp-lt3" />
          <image v-if="order.subState == 6 || order.subState == 7" class="abwp-lt1" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/applyJob.svg" />
        </view>
        <view class="abwp-r">
          <view class="abwp-r1">
            <text class="abwp-r1l">开始工作</text>
            <text v-if="startApplyInfo.address.latitude && order.subState == 4" class="abwp-r1r" @click="checkLocationPermission(1)">重新定位</text>
          </view>

					<map v-if="startApplyInfo.address.latitude" class="abwp-rmap" :latitude="startApplyInfo.address.latitude" :longitude="startApplyInfo.address.longitude" />
					<view v-else class="abwp-bo-1" @click="checkLocationPermission(1)">
					  <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconCircleAdd.svg" class="apply-add-jia" />
					  <view class="abwp-bo-1text">添加位置</view>
					</view>

          <view class="abwp-rmap-text">
					  {{ startApplyInfo.address.province || '' }} {{ startApplyInfo.address.city || '' }} {{ startApplyInfo.address.district || '' }} {{ startApplyInfo.address.address || '' }}
					</view>

          <view v-if="isPlaceOrder" class="abwp-rtime">{{ startApplyInfo.applyTime }}</view>
					
					<!-- 上传文件 -->
					<up-file v-model="startApplyInfo.resourceList" :modal="order.subState != 4 ? 'show' : 'select'" :showAudio="false"/>

          <!-- <upload-list :hideUploadBtn="order.subState != 4" upload-text="添加照片" :fileList="startApplyInfo.picList" @upload="chooseImage(1)"/> -->

          <view v-if="order.subState == 6 || order.subState == 7" class="iamaline" />

          <view v-if="order.subState == 6 || order.subState == 7" class="abwp-rend-text">结束工作</view>
					<text v-if="completeApplyInfo.address.latitude && order.subState == 6" class="abwp-rend-text" @click="checkLocationPermission(2)">重新定位</text>
        </view>
      </view>

      <view v-if="order.subState == 6 || order.subState == 7" class="abwp-bottom">
        <map v-if="completeApplyInfo.address.latitude" class="abwp-bo-1" :latitude="completeApplyInfo.address.latitude" :longitude="completeApplyInfo.address.longitude" />
        <view v-else class="abwp-bo-1" @click="checkLocationPermission(2)">
          <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconCircleAdd.svg" class="apply-add-jia" />
          <view class="abwp-bo-1text">添加位置</view>
        </view>

				<view class="abwp-rmap-text">
				  {{ completeApplyInfo.address.province || '' }} {{ completeApplyInfo.address.city || '' }} {{ completeApplyInfo.address.district || '' }} {{ completeApplyInfo.address.address || '' }}
				</view>

				<view v-if="isPlaceOrder" class="abwp-rtime">{{ completeApplyInfo.applyTime }}</view>
				
				<!-- 上传文件 -->
				<up-file v-model="completeApplyInfo.resourceList" :modal="order.subState != 6 ? 'show' : 'select'" :showAudio="false"/>
				
        <upload-list :hideUploadBtn="order.subState != 6" upload-text="添加照片" :fileList="completeApplyInfo.picList" @upload="chooseImage(2)"/>

        <upload-list :hideUploadBtn="order.subState != 6" upload-icon="2" @upload="chooseFile(2)"/>

      </view>
    </view>

    <view style="height: 300rpx" />

    <iphonex-bottom>
      <big-btn v-if="isPlaceOrder" :button-text="order.subState == 5 ? '确认开始' : '确认完工'" @click="approveBeginWork"/>
      <big-btn v-else button-text="提交申请" @click="applyBeginWork"/>
    </iphonex-bottom>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../component/offerHead";
import AddRemark from "../component/addRemark";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import MyPrice from "../component/myPrice";
import QuotedIten from "../component/quotedIten";
import BigBtn from "../../mine/addressManage/component/bigBtn";
import UploadList from "../component/uploadList";

export default {
  name: "applyBeginWork",
  components: {
    UploadList,
    BigBtn,
    QuotedIten,
    MyPrice,
    IphonexBottom,
    AddRemark,
    OfferHead,
    BackContainer,
  },
  data() {
    return {
			id: '',
			isPlaceOrder: false,
			order: {},
			startApplyInfo: {
				address: {
					address: '',
					city: '',
					cityId: 0,
					district: '',
					districtId: 0,
					latitude: 0,
					longitude: 0,
					province: '',
					provinceId: 0,
				},
				resourceList: [],
				applyTime: '',
			},
			completeApplyInfo: {
				address: {
					address: '',
					city: '',
					cityId: 0,
					district: '',
					districtId: 0,
					latitude: 0,
					longitude: 0,
					province: '',
					provinceId: 0,
				},
				resourceList: [],
				applyTime: '',
			},
    };
  },
	onLoad(option) {
		if (option.isPlaceOrder) {
			this.isPlaceOrder = option.isPlaceOrder ==  '1';
		}
		if (option.id) {
			this.id = option.id;
			this.queryOrderInfo();
			this.queryApplyInfo();
		}
	},
	onReady() {},
  methods: {
		queryOrderInfo() {
			this.$http.post('/b/orderreceive/query', { id: this.id }, true)
			.then(res => {
			  this.order = res;
			})
		},
		queryApplyInfo() {
			this.$http.post('/b/orderreceive/queryApplyDetail', { id: this.id }, true)
			.then(res => {
				if (res.startApplyInfo.address) {
			    this.startApplyInfo = res.startApplyInfo;
				}
				if (res.completeApplyInfo.address) {
			    this.completeApplyInfo = res.completeApplyInfo;
				}
			})
		},
		checkLocationPermission(type) {
			uni.authorize({
			    scope: 'scope.userLocation',
			    success: () => {
						this.getLocation(type);
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
											this.getLocation(type);
										}
									})
								}
							}
						})
					},
			})
		},
		getLocation(type) {
			uni.getLocation({
			    type: 'wgs84',
					geocode: true,
			    success: (res) => {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
							if (type == 1) {
								this.startApplyInfo.address.latitude = res.latitude;
								this.startApplyInfo.address.longitude = res.longitude;
							} else {
								this.completeApplyInfo.address.latitude = res.latitude;
								this.completeApplyInfo.address.longitude = res.longitude;
							}

							// 处理地理地址信息
							this.queryGeoAddressInfo(res.latitude, res.longitude, type)
			    }
			});
		},
		queryGeoAddressInfo(latitude, longitude, type) {
			const params = {
				latitude,
				longitude
			}
			this.$http.post('/core/geo/queryRegionByLocation', params, true)
			.then(res => {
				if (type == 1) {
					this.startApplyInfo.address.address = res.street + res.streetNum;
					this.startApplyInfo.address.city = res.city;
					this.startApplyInfo.address.cityId = res.cityId;
					this.startApplyInfo.address.district = res.district;
					this.startApplyInfo.address.districtId = res.districtId;
					this.startApplyInfo.address.province = res.province;
					this.startApplyInfo.address.provinceId = res.provinceId;
				} else {
					this.completeApplyInfo.address.address = res.street + res.streetNum;
					this.completeApplyInfo.address.city = res.city;
					this.completeApplyInfo.address.cityId = res.cityId;
					this.completeApplyInfo.address.district = res.district;
					this.completeApplyInfo.address.districtId = res.districtId;
					this.completeApplyInfo.address.province = res.province;
					this.completeApplyInfo.address.provinceId = res.provinceId;
				}
			})
		},
		chooseImage(type) {
			uni.chooseImage({
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    success: (res) => {
							const path = res.tempFilePaths[0];
							this.uploadImage(path, 1, type);
			    }
			});
		},
		chooseFile() {
			wx.chooseMessageFile({
			  count: 1,
				success: function (res) {
			    const path = res.tempFilePaths[0];
			    this.uploadImage(path, 2, type);
			  }
			});
		},
		uploadImage(path, type1, type2) {
			const param = {
				file: path,
			};
			this.$http.upload({ path }, true)
			.then(res=>{
				if (type1 == 1 && type2 == 1) {
					this.startApplyInfo.picList.push(res);
				} else if (type1 == 1 && type2 == 2) {
					this.completeApplyInfo.picList.push(res);
				} else if (type1 == 2 && type2 == 1) {
					this.startApplyInfo.fileList.push(res);
				} else if (type1 == 2 && type2 == 2) {
					this.completeApplyInfo.fileList.push(res);
				}
			});
		},
		approveBeginWork() {
			const url = `/b/orderreceive/confirm${this.order.subState == 5 ? 'Start' : 'Complete'}`
			this.$http.post(url, { id: this.id }, true)
			.then(res => {
			  uni.showToast({
			  	title: '确认成功',
					success: () => {
						uni.navigateBack({});
					}
			  })
			})
		},
		applyBeginWork() {
			const url = `/b/orderreceive/apply${this.order.subState == 4 ? 'Start' : 'Complete'}`
			
			const params = {
				receiveOrderId: this.id,
				resourceList: this.order.subState == 4 ? this.startApplyInfo.resourceList : this.completeApplyInfo.resourceList,
				orderAddress: this.order.subState == 4 ? this.startApplyInfo.address : this.completeApplyInfo.address,
			};
			this.$http.post(url, params, true)
			.then(res => {
			  uni.showToast({
			  	title: '申请提交成功',
			  	success: () => {
			  		uni.navigateBack({});
			  	}
			  })
			})
		},
  }
}
</script>
<style lang="scss">
.abw {
  padding-bottom: 34rpx;

  .abw-1 {
    @include flexBetween;
    height: 96rpx;
    background-color: white;
    padding: 24rpx 32rpx;
    box-sizing: border-box;

    .abw-12 {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #969799;
      line-height: 36rpx;
    }

    .abw-11 {
      width: 116rpx;
      height: 48rpx;
      background: #34C759;
      border-radius: 8rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      @include flexCenter;
    }
  }

}

.abw-progress {
  background: #FFFFFF;
  margin-top: 30rpx;

  .abwp-title {
    height: 88rpx;
    @include flexBetween;
    padding: 0 32rpx 0 0;
    margin-left: 32rpx;
    border-bottom: 1rpx solid #EAECEF;
  }

  .abwp-body {
    padding: 32rpx 32rpx 12rpx 32rpx;
    display: flex;

    .abwp-l {
      display: flex;
      flex-direction: column;
      align-items: center;

      .abwp-lt1 {
        flex-shrink: 0;
        width: 48rpx;
        height: 48rpx;
        border-radius: 100%;
        border: 2rpx solid #2C3580;
        box-sizing: border-box;
        padding: 6rpx;
      }

      .abwp-lt3 {
        height: 100%;
        width: 2rpx;
        background-color: #EDEDED;
      }
    }

    .abwp-r {
      margin-left: 16rpx;
      .abwp-r1 {
        height: 48rpx;
        margin-bottom: 24rpx;
        @include flexBetween;

        .abwp-r1l {
          font-size: 32rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 40rpx;
        }

        .abwp-r1r {
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #4F4F4F;
          line-height: 32rpx;
        }
      }

			.abwp-bo-1 {
			  @include flexCenter;
			  flex-direction: column;
			  width: 622rpx;
			  height: 200rpx;
			  background: #F3F4F5;
			  margin-bottom: 32rpx;

			  .apply-add-jia {
			    width: 48rpx;
			    height: 48rpx;
			  }

			  .abwp-bo-1text {
			    font-size: 28rpx;
			    font-family: PingFang SC-Regular, PingFang SC;
			    font-weight: 400;
			    line-height: 36rpx;
			    margin-top: 8rpx;
			    color: #3340A0;
			  }
			}

      .abwp-rmap {
        height: 200rpx;
        width: 622rpx;
      }

      .abwp-rmap-text {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #969799;
        line-height: 36rpx;
        margin: 16rpx 0;
      }

      .abwp-rtime {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #969799;
        line-height: 36rpx;
        margin-bottom: 32rpx;
      }

      .iamaline {
        width: 100%;
        height: 1rpx;
        border-bottom: 1rpx solid #EBEDF0;
        padding-top: 18rpx;
      }

      .abwp-rend-text {
        font-size: 32rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 40rpx;
        padding: 32rpx 0 10rpx 0;
      }
    }
  }

  .abwp-bottom {
    padding: 16rpx 32rpx 16rpx 96rpx;

    .abwp-bo-1 {
      @include flexCenter;
      flex-direction: column;
      width: 622rpx;
      height: 200rpx;
      background: #F3F4F5;
      margin-bottom: 32rpx;

      .apply-add-jia {
        width: 48rpx;
        height: 48rpx;
      }

      .abwp-bo-1text {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 36rpx;
        margin-top: 8rpx;
        color: #3340A0;
      }
    }

		.abwp-rmap-text {
		  font-size: 28rpx;
		  font-family: PingFang SC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #969799;
		  line-height: 36rpx;
		  margin: 16rpx 0;
		}

		.abwp-rtime {
		  font-size: 28rpx;
		  font-family: PingFang SC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #969799;
		  line-height: 36rpx;
		  margin-bottom: 32rpx;
		}
  }
}

</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

.placeholder-class {
  font-size: 28rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #828282;
  line-height: 36rpx;
}
</style>
