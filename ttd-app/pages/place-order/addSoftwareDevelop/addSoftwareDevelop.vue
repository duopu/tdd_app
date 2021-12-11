<template>
  <view class="add-im">
    <custom-navbar title="添加软件开发" />

    <back-container>
      <template #headerSlot>
        <offer-head title="软件开发" text="寻找各类型程序猿、设计湿等，为改变世界而奋斗" />
      </template>

      <view class="add-imple">

        <view class="add-i-item">
          <view class="add-i-lable">类别</view>
					<picker class="add-i-midle" @change="softwareSelect" :value="cateName" :range="softwareList" range-key="name">
					  <view class="add-i-midle">{{ cateName || '请选择' }}</view>
					</picker>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>


      </view>
      <view class="add-i-aline" />

      <add-remark label="要求：" required :value="requireInfo" @input="infoChange"  />

      <view class="up-list up-list1">
        <upload-list upload-text="添加图片" @upload="chooseImage"/>
        <!-- <upload-list upload-icon="4" upload-text="拍照" /> -->
        <upload-list upload-icon="2" @upload="chooseFile"/>
        <upload-list upload-icon="3" upload-text="添加语音" @upload="startRecord"/>
        <upload-list upload-icon="3" upload-text="添加语音" @upload="endRecord"/>
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
  name: "addSoftwareDevelop",
  components: { BigBtn, IphonexBottom, UploadList, AddRemark, CheckdItem, OfferHead, BackContainer },
  data() {
    return {
			cateId: '', // 软件类型id
			cateName: '', // 软件类型
			requireInfo: '', // 备注
      orderResourceList: [], // {	resourceType: 1, // 资源类型 1、图片视频 2、语音 3、文件    url: ''  }
			
			softwareList: [],
    };
  },
  onLoad() {
  	let self = this;
		// 监听上级页面传入数据
		const eventChannel = self.getOpenerEventChannel();
		eventChannel.on('editWork', (work) => {
		    console.log('editWork ', work);
				this.cateId = work.cateId;
				this.cateName = work.cateName;
				this.requireInfo = work.requireInfo;
				this.orderResourceList = work.orderResourceList;
		})
		// 监听录音事件
  	recorderManager.onStop(function (res) {
  		console.log('recorder stop' + JSON.stringify(res));
     const path = res.tempFilePath;
  		self.uploadImage(path, 2);
    });
  },
	onReady() {
		this.querySoftwareList();
	},
  methods: {
		querySoftwareList() {
			this.$http.post('/b/softwareconf/queryList', {}, true)
			.then(res => {
			  this.softwareList = res;
			})
		},
		softwareSelect(e) {
			const index = e.target.value;
			this.cateId = this.softwareList[index].id;
			this.cateName = this.softwareList[index].name;
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
		infoChange(t) {
			this.requireInfo = t;
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
