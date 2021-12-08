<template>
  <view>
    <custom-navbar title="申请开始工作" />

    <back-container>
      <template #headerSlot>
        <offer-head />
      </template>

      <view class="abw">
        <view class="abw-1">
          <view class="abw-12">
            <text>订单金额：</text>
            <my-price :scale="0.8" price="8000.00" />
          </view>
          <view class="abw-11">待完成</view>
        </view>

        <quoted-iten :order="order"/>

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
            <text v-if="address.latitude && order.subState == 4" class="abwp-r1r">重新定位</text>
          </view>
					
					<map v-if="address.latitude" class="abwp-rmap" :latitude="address.latitude" :longitude="address.longitude" />
					<view v-else class="abwp-bo-1" @click="getLocation">
					  <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconCircleAdd.svg" class="apply-add-jia" />
					  <view class="abwp-bo-1text">添加位置</view>
					</view>

          <view class="abwp-rmap-text">
					  {{ address.province || '' }} {{ address.city || '' }} {{ address.district || '' }} {{ address.address || '' }}
					</view>

          <view class="abwp-rtime">2021-07-12 13:37</view>

          <upload-list :hideUploadBtn="order.subState != 4" upload-text="添加照片" :img-list="imageList" @upload="chooseImage"/>

          <view class="iamaline" />

          <view v-if="order.subState == 6 || order.subState == 7" class="abwp-rend-text">结束工作</view>
        </view>
      </view>

      <view v-if="order.subState == 6 || order.subState == 7" class="abwp-bottom">
        <view class="abwp-bo-1" @click="getLocation">
          <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconCircleAdd.svg" class="apply-add-jia" />
          <view class="abwp-bo-1text">添加位置</view>
        </view>

        <upload-list :hideUploadBtn="order.subState != 6" upload-text="添加照片" :img-list="imageList" @upload="chooseImage"/>

        <upload-list :hideUploadBtn="order.subState != 6" upload-icon="2" @upload="chooseFile"/>

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
			fileList: [],
			imageList: [],
    };
  },
	onLoad(option) {
		if (option.isPlaceOrder) {
			this.isPlaceOrder = option.isPlaceOrder ==  '1';
		}
		if (option.id) {
			this.id = option.id;
			this.queryOrderInfo();
			this.queryWorkInfo();
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
		queryWorkInfo() {
			this.$http.post('/b/orderreceive/queryApplyDetail', { id: this.id }, true)
			.then(res => {
			  this.order = res;
			})
		},
		getLocation() {
			uni.getLocation({
			    type: 'wgs84',
					geocode: true,
			    success: (res) => {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
							this.address.latitude = res.latitude;
							this.address.longitude = res.longitude;
							// 处理地理地址信息
							this.queryGeoAddressInfo(res.latitude, res.longitude)
			    }
			});
		},
		queryGeoAddressInfo(latitude, longitude) {
			const params = {
				latitude,
				longitude
			}
			this.$http.post('/core/geo/queryRegionByLocation', params, true)
			.then(res => {
				this.address.address = res.street + res.streetNum;
				this.address.city = res.city;
				this.address.cityId = res.cityId;
				this.address.district = res.district;
				this.address.districtId = res.districtId;
				this.address.province = res.province;
				this.address.provinceId = res.provinceId;
			})
		},
		chooseImage() {
			uni.chooseImage({
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    success: (res) => {
							const path = res.tempFilePaths[0];
							this.uploadImage(path, 1);
			    }
			});
		},
		chooseFile() {
			wx.chooseMessageFile({
			  count: 1,
				success: function (res) {
			    const path = res.tempFilePaths[0];
			    this.uploadImage(path, 2);
			  }
			});
		},
		uploadImage(path, type) {
			const param = {
				file: path,
			};
			this.$http.upload({ path }, true)
			.then(res=>{
				if (type == 1) {
					this.imageList.push(res);
				} else {
					this.fileList.push(res);
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
				fileList: this.fileList,
				picList: this.imageList,
				orderAddress: this.address,
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
