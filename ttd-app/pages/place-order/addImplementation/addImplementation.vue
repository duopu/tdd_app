<template>
  <view class="add-im">
    <custom-navbar title="添加实施工作" />

    <back-container>
      <template #headerSlot>
        <offer-head title="实施与维修" text="电子产品的实施与维修工作" />
      </template>

      <view class="add-imple">
        <checkd-item :value="value" label="下单类型" :list="[{text: '实施', value: '1'}, {text: '维修', value: '2'}]"
                     @change="change" />

        <view class="add-i-item">
          <view class="add-i-lable">服务内容</view>
          <view class="add-i-midle">请选择</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">品牌</view>
          <view class="add-i-midle">请选择</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">型号</view>
          <input class="add-i-midle" placeholder="可选输入" placeholder-class="input-placeholder" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">数量</view>
          <view class="add-i-midle">
            <uni-number-box v-model="value1" />
          </view>
        </view>

      </view>

      <view class="add-i-aline" />

      <add-remark label="要求：" required />

      <view class="up-list">
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
  name: "addImplementation",
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
@import "./_addImplementation.scss";
</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
