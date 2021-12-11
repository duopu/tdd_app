<template>
  <model-slot v-if="visible" ref="modelSlot" @sure="confirm" @hide="hide">

    <template #slot1>
      <view class="cmb-input">
        <view class="cmb-input-title">电话号码</view>
        <input type="text" :value="phone" class="cmb-inputs" @input="inputChange" placeholder="请输入" />
      </view>

      <add-remark label="咨询内容：" :value="content" @input="contentChange" placeholder="可以的话，多少写点！方便工作人员快速排队故障。" />
    </template>

  </model-slot>
</template>
<script>
import ModelSlot from "./modelSlot";
import AddRemark from "../../receive-order/component/addRemark";

export default {
  name: "consultingModel",
  components: { AddRemark, ModelSlot },
  data() {
    return {
      visible: false,
			phone: '',
      content: '',
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
		inputChange(e) {
			this.phone = e.target.value;
		},
		contentChange(value) {
			this.content = value;
		},
		confirm() {
			this.$emit('confirm', { phone: this.phone, content: this.content });
		}
  }
}
</script>
<style scoped lang="scss">
.cmb-input {
  height: 88rpx;
  display: flex;
  align-items: center;
  margin-left: 32rpx;
  padding-right: 32rpx;
  border-bottom: 1rpx solid #EAECEF;

  .cmb-input-title {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;
  }

  .cmb-inputs {
    flex: 1;
    text-align: right;
  }
}
</style>
