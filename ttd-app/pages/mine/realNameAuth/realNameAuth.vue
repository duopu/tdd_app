<template>
  <view>
    <custom-navbar title="实名认证" />

    <back-container>

      <view class="real-name-auth">
        <view class="rn-top">为了保障平台安全，请使用与资金账户一致的身份证进行注册。提交的资料仅用于实名认证，不会用作其他用途，请放心上传。</view>
        <view class="rn-middle" />
        <view class="rn-end">
          <view class="rn-end-text">身份证人像面</view>
          <view class="rn-end-face" @click="chooseImage(1)">
            <image :src="IDcardFace" class="rn-end-img" />
            <view class="take-photo">
              <image :src="takePhotoIcon" class="take-photo-img" />
              <view class="take-photo-text">拍照</view>
            </view>
          </view>
          <view class="rn-end-text">身份证国徽面</view>
          <view class="rn-end-face" @click="chooseImage(2)">
            <image :src="IDcardBack" class="rn-end-img" />
            <view class="take-photo">
              <image :src="takePhotoIcon" class="take-photo-img" />
              <view class="take-photo-text">拍照</view>
            </view>
          </view>
        </view>
      </view>

    </back-container>

    <iphonex-bottom>
      <big-btn @click="commitAuth" />
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BigBtn from "../addressManage/component/bigBtn";
import IDcardFace from '../../../static/mine/idcard-face.png';
import IDcardBack from '../../../static/mine/idcard-back.png';
import takePhotoIcon from '../../../static/mine/take-photo-icon.svg';

export default {
  name: "realNameAuth",
  components: { BigBtn, IphonexBottom, BackContainer },
  data() {
    return {
      IDcardFace,
      takePhotoIcon,
      IDcardBack,
    };
  },
	onReady() {},
	onShow() {
		this.queryAuthInfo();
	},
  methods: {
		queryAuthInfo() {
			this.$http.post('/b/customerrealauth/query', { }, true)
			.then(res => {
			  // uni.showToast({ title: '申请提现成功' })
			})
		},
		chooseImage(index) {
			uni.chooseImage({
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    success: (res) => {
							const path = res.tempFilePaths[0];
							this.uploadImage(index, path);
			    }
			});
		},
		uploadImage(index, path) {
			const param = {
				file: path,
			};
			this.$http.upload({ path }, true)
			.then(res=>{
				if (index == 1) {
					this.IDcardFace = res;
				} else {
					this.IDcardBack = res;
				}
			});
		},
		commitAuth() {
			const params = {
				faceImage: '',
				faceIdcardImage: '',
				backIdcardImage: '',
			}
		  this.$http.post('/b/customerrealauth/realAuth', params, true)
		  .then(res => {
		    uni.showToast({ title: '实名认证已提交' });
		  })
		},
  }
}
</script>

<style lang="scss" scoped>
.real-name-auth {
  padding-bottom: 48rpx;

  .rn-top {
    width: 686rpx;
    height: 160rpx;
    background: #FFFBE8;
    border-radius: 16rpx;
    margin: 16rpx 32rpx 32rpx 32rpx;
    padding: 32rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
    line-height: 32rpx;
  }

  .rn-middle {
    width: 718rpx;
    height: 1rpx;
    background: #EAECEF;
    margin: 0 16rpx;
  }

  .rn-end {
    .rn-end-text {
      text-align: center;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      margin: 32rpx auto;
      line-height: 32rpx;
    }

    .rn-end-face {
      @include flexCenter;
      position: relative;
      width: 480rpx;
      height: 320rpx;
      margin: auto;

      .rn-end-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .take-photo {
        position: relative;
        z-index: 2;

        .take-photo-img {
          width: 48rpx;
          height: 48rpx;
        }

        .take-photo-text {
          font-size: 24rpx;
          font-family: PingFang SC-Light, PingFang SC;
          font-weight: 300;
          color: #828282;
          line-height: 32rpx;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
