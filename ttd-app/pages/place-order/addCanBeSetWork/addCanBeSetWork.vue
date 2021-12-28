<template>
  <view class="add-im">
    <custom-navbar :title="`${isEdit ? '添加' : '查看'}勘设工作`" />

    <back-container>
      <template #headerSlot>
        <offer-head title="勘察设计" text="为工程项目进行测量、勘探、试验和鉴定、评价的工作" />
      </template>

      <view class="add-imple">

        <view class="add-i-item">
          <view class="add-i-lable">面积</view>
          <input class="add-i-midle input-sty" :value="number" :disabled="!isEdit" @input="inputChange" placeholder="请输入" placeholder-class="input-placeholder" />
          <text class="add-i-unit">平方</text>
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">工作类别</view>
					<picker class="add-i-midle" :disabled="!isEdit" @change="workChange" :value="cateName" :range="workList">
            <view class="add-i-midle">{{ cateName || '请选择' }}</view>
					</picker>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

      </view>
      <view class="add-i-aline" />

			<add-remark label="要求：" required :value="requireInfo" @input="infoChange" />
			
			<!-- 上传文件 -->
			<up-file v-model="orderResourceList" :modal="isEdit ? 'select' : 'show'"/>

    </back-container>

    <view class="add-im-tips" v-if="isEdit">上传完整清晰图片、视频，以便师傅更快接单</view>

    <iphonex-bottom v-if="isEdit">
      <big-btn @click="onSubmit"/>
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../../receive-order/component/offerHead";
import CheckdItem from "../placeOrder/checkdItem";
import AddRemark from "../../receive-order/component/addRemark";
import UploadList from "../../receive-order/component/uploadList";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "addCanBeSetWork",
  components: { BigBtn, IphonexBottom, UploadList, AddRemark, CheckdItem, OfferHead, BackContainer },
  data() {
    return {
			isEdit: true,
			cateId: '', // 勘测类型id
			cateName: '', // 勘测类型
			number: 0, // 数量
			requireInfo: '', // 备注
			orderResourceList: [], // {	resourceType: 1, // 资源类型 1、图片视频 2、语音 3、文件    url: ''  }

			workList: [], // 勘测类型数据源
    };
  },
	onLoad(option) {
		if (option.isEdit) {
			this.isEdit = option.isEdit ==  '0' ? false : true;
		}
		// 监听上级页面传入数据
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.on('editWork', (work) => {
		    console.log('editWork ', work);
				this.cateId = work.cateId;
				this.cateName = work.cateName;
				this.number = work.number;
				this.requireInfo = work.requireInfo;
				this.orderResourceList = work.orderResourceList;
		})
	},
	onReady() {
		this.queryWorkList();
	},
  methods: {
	 queryWorkList() {
		  this.$http.post('/b/ordermaster/settingCateList', {}, true)
		  .then(res => {
			  this.workList = res;
		  })
	  },
		workChange(e) {
			const index = e.target.value;
			this.cateName = this.workList[index];
		},
		inputChange(e) {
			this.number = e.target.value;
		},
		infoChange(t) {
			if (!this.isEdit) return;
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
@import "../../mine/addressManage/_inputStyle.scss";
</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
