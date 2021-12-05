<template>
  <view class="add-im">
    <custom-navbar title="添加租赁工作" />

    <back-container>
      <template #headerSlot>
        <offer-head title="租赁工作" text="租赁各种大小型机动车或专业特种用车" />
      </template>

      <view class="add-imple">

        <view class="add-i-item">
          <view class="add-i-lable">设备</view>
          <view class="add-i-midle" @click="deviceSelect">请输入</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">使用路径距离</view>
          <input class="add-i-midle" placeholder="请输入" placeholder-class="input-placeholder" />
          <text class="add-i-unit">公里</text>
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

      <view class="up-list up-list1">
        <upload-list upload-text="添加照片" />
        <upload-list upload-text="拍照" />
        <upload-list />
        <upload-list upload-text="添加语音" />
      </view>
    </back-container>

    <view class="add-im-tips">上传完整清晰图片、视频，以便师傅更快接单</view>

    <iphonex-bottom>
      <big-btn @click="onSubmit"/>
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
  name: "addLeaseWork",
  components: { BigBtn, IphonexBottom, UploadList, AddRemark, CheckdItem, OfferHead, BackContainer },
  data() {
    return {
			distance: 0, // 距离
			number: 0, // 数量
			requireInfo: '', // 备注
      orderResourceList: [], // {	resourceType: 1, // 资源类型 1、图片视频 2、语音 3、文件    url: ''  }
			
			toolList: [],
    };
  },
  onLoad() {
  	let self = this;
		// 监听上级页面传入数据
		const eventChannel = self.getOpenerEventChannel();
		eventChannel.on('editWork', (work) => {
		    console.log('editWork ', work);
				this.$data = {
					...work,
				}
		})
		// 监听录音事件
  	recorderManager.onStop(function (res) {
  		console.log('recorder stop' + JSON.stringify(res));
     const path = res.tempFilePath;
  		self.uploadImage(path, 2);
    });
  },
	mounted() {
		uni.$on('submitSelectEquipmenttoolTree',(toolList)=>{
			this.toolList  = toolList || [];
		})
	},
	destroyed() {
		uni.$off('submitSelectEquipmenttoolTree');
	},
  methods: {
		deviceSelect() {
			uni.navigateTo({
				url:`/pages/main/apply/tree?type=equipmenttool`
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
    	    this.uploadImage(path, 3);
    	  }
    	});
    },
    startRecord() {
    	console.log('开始录音');
    	recorderManager.start();
    },
    endRecord() {
      console.log('录音结束');
      recorderManager.stop();
    },
    uploadImage(path, type) {
    	const param = {
    		file: path,
    	};
    	this.$http.upload({ path }, true)
    	.then(res=>{
    		const a = this.orderResourceList.slice();
    		a.push({
    			url: res,
    			resourceType: type,
    		});
    		this.orderResourceList = a.slice();
    	});
    },
    onSubmit() {
    	const work = Object.assign({}, this.$data);
    	console.log('work ', work);
    	const eventChannel = this.getOpenerEventChannel();
    	eventChannel.emit('onEdit', work);
    	uni.navigateBack({});
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
