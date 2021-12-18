<template>
  <view class="upload-list">
    <view class="upload-item" v-for="(i, index) in imgList" :key="index">
      <image v-if="i" :src='i' class="upload-item-pic" />
      <image v-else src='https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png' class="upload-item-pic" />
      <view class="delete-img" v-if="showDelete" @click="deleteImage(index)">
        <uni-icons class="delete-icon" size="8" type="closeempty" color="white" />
      </view>
    </view>
    <view class="upload-item upload-item-ic" @click="upload" v-if="!hideUploadBtn">
      <image v-if="uploadIcon == 1" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadImageJia.svg" class="upload-icon-imgss" />
      <image v-if="uploadIcon == 2" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadPdf.svg" class="upload-icon-imgss" />
      <image v-if="uploadIcon == 3" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadYuyin.svg" class="upload-icon-imgss" />
      <image v-if="uploadIcon == 4" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadImageTake.svg" class="upload-icon-imgss" />
      <view class="up-text">{{ uploadText }}</view>
    </view>
  </view>
</template>
<script>
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";

export default {
  name: "uploadList",
  components: { UniIcons },
  props: {
    imgList: {
      type: Array,
      default() {
        return []
      }
    },
    uploadText: {
      type: String,
      default: '添加文件'
    },
    uploadIcon: {
      type: String,
      default: '1'
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    hideUploadBtn: Boolean,
  },
  methods: {
    deleteImage(index) {
      this.$emit('delete-img', index)
    },
    upload() {
      this.$emit('upload')
    }
  }
}
</script>
<style scoped lang="scss">
.upload-list {
  display: flex;
  flex-flow: row wrap;

  .upload-item {
    position: relative;
    flex-shrink: 0;
    width: 128rpx;
    height: 128rpx;
    border-radius: 4rpx;
    margin: 0 20rpx 16rpx 0;

    .delete-img {
      position: absolute;
      right: 0;
      top: 0;
      background-color: #4F4F4F;
      width: 28rpx;
      height: 28rpx;
      border-radius: 0 0 0 28rpx;

      .delete-icon {
        position: absolute;
        top: -8rpx;
        right: 4rpx;
      }
    }
  }

  .upload-item-pic {
    width: 128rpx;
    height: 128rpx;
    border-radius: 4rpx;
  }

  .upload-item-ic {
    display: flex;
    flex-flow: wrap column;
    align-items: center;
    justify-content: center;
    border: 2rpx solid #EDEDED;
  }

  .upload-icon-imgss {
    width: 48rpx;
    height: 48rpx;
  }

  .up-text {
    font-size: 24rpx;
    font-family: PingFang SC-Light, PingFang SC;
    font-weight: 300;
    color: #828282;
    line-height: 32rpx;
  }
}
</style>
