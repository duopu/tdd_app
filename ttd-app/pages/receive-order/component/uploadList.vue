<template>
  <view class="upload-list">

    <!-- 拍照 和 图片上传 回显 -->
    <template v-if="uploadIcon == 1 || uploadIcon == 4">
      <view class="upload-item" v-for="(i, index) in fileList" :key="index">
        <image v-if="i" :src='i' class="upload-item-pic" />
        <image v-else src='https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png'
               class="upload-item-pic" />
        <view class="delete-img" v-if="showDelete" @click="deleteFile(index)">
          <uni-icons class="delete-icon" size="8" type="closeempty" color="white" />
        </view>
      </view>
    </template>

    <!-- pdf 和 语音的回显 -->
    <template v-if="uploadIcon == 2 || uploadIcon == 3">
      <view class="upload-item" v-for="(i, index) in fileList" :key="index">
        <image
            :src='`https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/${uploadIcon == 2 ? "pdf-huixian-icon" : "yuyin-huixian-icon"}.png`'
            class="upload-item-file-size"
        />
        <view class="upload-item-file-name">
          {{ uploadIcon == 2 ? (i.fileName || (`pdf${index + 1}`)) : `语音${index + 1}` }}
        </view>

        <view class="delete-img" v-if="showDelete" @click="deleteFile(index)">
          <uni-icons class="delete-icon" size="8" type="closeempty" color="white" />
        </view>
      </view>
    </template>

    <!-- 上传按钮 -->
    <view class="upload-item upload-item-ic" @click="upload" v-if="!hideUploadBtn">
      <image v-if="uploadIcon == 1"
             src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadImageJia.svg"
             class="upload-icon-imgss" />
      <image v-if="uploadIcon == 2" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadPdf.svg"
             class="upload-icon-imgss" />
      <image v-if="uploadIcon == 3"
             src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadYuyin.svg"
             class="upload-icon-imgss" />
      <image v-if="uploadIcon == 4"
             src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/uploadImageTake.svg"
             class="upload-icon-imgss" />
      <view class="up-text">{{ uploadText }}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: "uploadList",
  props: {
    // 文件列表  uploadIcon 1 图片  2 pdf  3 语音  4 拍照
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    uploadText: {
      type: String,
      default: '添加文件'
    },
    // 1 图片  2 pdf  3 语音  4 拍照
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
    deleteFile(index) {
      this.$emit('delete-file', index)
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
    border: 2rpx solid #EDEDED;

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

  .upload-item-file-size {
    width: 48rpx;
    height: 48rpx;
    margin: 22rpx 40rpx;
  }

  .upload-item-file-name {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 128rpx;
    height: 40rpx;
    background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
    border-radius: 0 0 4rpx 4rpx;
    text-align: center;
    line-height: 40rpx;
    font-size: 20rpx;
    font-family: PingFang SC-Light, PingFang SC;
    font-weight: 300;
    color: #FFFFFF;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
