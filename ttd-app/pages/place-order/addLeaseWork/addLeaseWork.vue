<template>
  <view class="add-im">
    <custom-navbar :title="`${isEdit ? '添加' : '查看'}租赁工作`" />

    <back-container>
      <template #headerSlot>
        <offer-head title="租赁工作" text="租赁各种大小型机动车或专业特种用车" />
      </template>

      <view class="add-imple">

        <view class="add-i-item">
          <view class="add-i-lable">设备</view>
          <view class="add-i-midle" :class="cateName ? 'add-i-acc' : ''" @click="deviceSelect">{{ cateName || '请选择' }}</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">使用路径距离</view>
          <input class="add-i-midle input-sty" :value="distance" :disabled="!isEdit" @input="inputChange" placeholder="请输入" placeholder-class="input-placeholder" />
          <text class="add-i-unit">公里</text>
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">数量</view>
          <view class="add-i-midle">
            <uni-number-box v-model="number" :disabled="!isEdit" />
          </view>
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
  name: "addLeaseWork",
  components: { BigBtn, IphonexBottom, UploadList, AddRemark, CheckdItem, OfferHead, BackContainer },
  data() {
    return {
			isEdit: true,
			distance: 0, // 距离
			number: 0, // 数量
			cateId: '', // 设备类型id
			cateName: '', // 设备类型
			requireInfo: '', // 备注
      orderResourceList: [], // {	resourceType: 1, // 资源类型 1、图片视频 2、语音 3、文件    url: ''  }
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
				this.distance = work.distance;
				this.number = work.number;
				this.requireInfo = work.requireInfo;
				this.orderResourceList = work.orderResourceList;
		})
  },
	mounted() {
		uni.$on('submitSelectEquipmenttoolTree',(toolList)=>{
			this.cateId = toolList[0].id || '';
			this.cateName = toolList[0].name || '';
		})
	},
	destroyed() {
		uni.$off('submitSelectEquipmenttoolTree');
	},
  methods: {
		deviceSelect() {
			if (!this.isEdit) return;
			uni.navigateTo({
				url:`/pages/main/apply/tree?type=equipmenttool`
			})
		},
		inputChange(e) {
			this.distance = e.target.value;
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
