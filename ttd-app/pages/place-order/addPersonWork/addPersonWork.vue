<template>
  <view class="add-im">
    <custom-navbar title="添加人员工作" />

    <back-container>
      <template #headerSlot>
        <offer-head title="各类专业人员" text="各类形形式式的专业人员" />
      </template>

      <view class="add-imple">

        <view class="add-i-item">
          <view class="add-i-lable">人员岗位</view>
          <view class="add-i-midle">请输入</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">人员数量</view>
          <view class="add-i-midle">
            <uni-number-box v-model="value1" />
          </view>
        </view>

      </view>
      <view class="add-i-aline" />

      <add-remark label="要求：" required />

      <view class="up-list up-list1">
        <upload-list upload-text="添加照片" />
        <upload-list upload-text="拍照" />
        <upload-list />
        <upload-list upload-text="添加语音" />
      </view>
    </back-container>

    <view class="add-im-tips">上传完整清晰图片、视频，以便师傅更快接单</view>

    <iphonex-bottom>
      <big-btn />
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../../receive-order/component/offerHead";
import CheckdItem from "../receiptOrderZy/checkdItem";
import AddRemark from "../../receive-order/component/addRemark";
import UploadList from "../../receive-order/component/uploadList";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "addPersonWork",
  components: { BigBtn, IphonexBottom, UploadList, AddRemark, CheckdItem, OfferHead, BackContainer },
  data() {
    return {
      value: '1',
      value1: undefined,
    };
  },
  methods: {
    change(value) {
      this.value = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../addImplementation/_addImplementation.scss";
</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
