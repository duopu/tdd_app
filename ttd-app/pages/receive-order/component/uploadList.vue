<template>
  <view class="upload-list">
    <view class="upload-item" v-for="(i, index) in imgList" :key="i">
      <image :src="MDicon" class="upload-item-pic" />
      <view class="delete-img" @click="deleteImage(index)">
        <uni-icons class="delete-icon" size="8" type="closeempty" color="white" />
      </view>
    </view>
    <view class="upload-item upload-item-ic" @click="upload" v-if="!hideUploadBtn">
      <uni-icons size="20" :type="uploadIcon" color="#BDBDBD" />
      <view class="up-text">{{ uploadText }}</view>
    </view>
  </view>
</template>
<script>
import MDicon from '../../../static/mine/MDicon.png';
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
      default: 'upload'
    },
    hideUploadBtn: Boolean,
  },
  data() {
    return {
      MDicon
    }
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

  .up-text {
    font-size: 24rpx;
    font-family: PingFang SC-Light, PingFang SC;
    font-weight: 300;
    color: #828282;
    line-height: 32rpx;
  }
}
</style>