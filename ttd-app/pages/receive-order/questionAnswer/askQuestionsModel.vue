<template>
  <model-slot v-if="visible" ref="modelSlot" @sure="confirm" @hide="hide" title="提问">

    <template #slot1>
      <view v-if="showType">
				<view v-if="orderType == 2 || orderType == 5" class="qus-model-input">
				  <view class="qus-model-input-title">相关工作</view>
					<picker class="qus-model-inputs" @change="pickerChange" :range="typeList">
				    <view class="qus-model-inputs">{{ questionJob || type || '请选择' }}</view>
					</picker>
				  <uni-icons size="18" color="#BDBDBD" type="right" />
				</view>
				<view v-else class="qus-model-input" @click="$emit('onSelect')">
					<view class="qus-model-input-title">相关工作</view>
					<view class="qus-model-inputs">{{ questionJob || '请选择' }}</view>
					<uni-icons size="18" color="#BDBDBD" type="right" />
				</view>
			</view>

      <add-remark label="内容：" :value="content" @input="contentChange" placeholder="可以的话，多少写点！方便工作人员快速排队故障。" />

      <view class="qus-model-img-box">
        <upload-list upload-text="添加图片" :imgList="pictureList" @upload="chooseImage" />
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
	props: {
		showType: {
			type: Boolean,
			default: false,
		},
		orderType: {
			type: Number,
			default: 1,
		},
		typeList: {
			type: Array,
			default: [],
		},
		questionJob: {
			type: String,
			default: '',
		}
	},
  data() {
    return {
      visible: false,
			type: '',
      content: '',
			pictureList: [],
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
		confirm() {
			this.$emit('onConfirm', {
				questionJob: this.questionJob || this.type,
				content: this.content,
				pictureList: this.pictureList,
			})
		},
		pickerChange(e) {
			const index = e.target.value;
			this.type = this.typeList[index];
		},
		contentChange(value) {
			this.content = value;
		},
    chooseImage() {
    	uni.chooseImage({
    	    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    	    success: (res) => {
    					const path = res.tempFilePaths[0];
    					this.uploadImage(path);
    	    }
    	});
    },
    uploadImage(path) {
    	const param = {
    		file: path,
    	};
    	this.$http.upload({ path }, true)
    	.then(res=>{
    		this.pictureList.push(res);
    	});
    },
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
