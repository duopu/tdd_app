<template>
  <model-slot v-if="visible" ref="modelSlot" @sure="hide" @hide="hide" title="提问">

    <template #slot1>
      <view class="qus-model-input">
        <view class="qus-model-input-title">相关工作</view>
        <view class="qus-model-inputs">交互机</view>
        <uni-icons size="18" color="#BDBDBD" type="right" />
      </view>

      <add-remark label="内容：" :value="value" placeholder="可以的话，多少写点！方便工作人员快速排队故障。" />

      <view class="qus-model-img-box">
        <upload-list upload-text="添加图片" @upload="chooseImage" />
      </view>

    </template>

  </model-slot>
</template>
<script>
import AddRemark from "../../receive-order/component/addRemark";
import ModelSlot from "../../mine/aboutUs/modelSlot";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
import UploadList from "../component/uploadList";

export default {
  name: "askQuestionsModel",
  components: { UploadList, UniIcons, ModelSlot, AddRemark },
  data() {
    return {
      visible: true,
      value: '',
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    chooseImage() {

    }
  }
}
</script>
<style scoped lang="scss">
.qus-model-input {
  height: 88rpx;
  display: flex;
  align-items: center;
  margin-left: 32rpx;
  padding-right: 32rpx;
  border-bottom: 1rpx solid #EAECEF;
  border-top: 1rpx solid #EAECEF;

  .qus-model-input-title {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
  }

  .qus-model-inputs {
    flex: 1;
    text-align: right;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    padding-right: 16rpx;
  }
}

.qus-model-img-box {
  margin: 32rpx;
}
</style>
