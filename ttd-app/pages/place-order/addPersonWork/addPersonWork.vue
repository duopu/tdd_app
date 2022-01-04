<template>
  <view class="add-im">
    <custom-navbar :title="`${isEdit ? '添加' : '查看'}人员工作`" />

    <back-container>
      <template #headerSlot>
        <offer-head title="各类专业人员" text="各类形形式式的专业人员" />
      </template>

      <view class="add-imple">

        <view class="add-i-item">
          <view class="add-i-lable">人员岗位</view>
          <view class="add-i-midle" :class="cateName ? 'add-i-acc' : ''" @click="roleSelect">{{ cateName ||  '请选择' }}</view>
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view class="add-i-item">
          <view class="add-i-lable">人员数量</view>
          <view class="add-i-midle">
            <uni-number-box v-model="number" :disabled="!isEdit"/>
          </view>
        </view>

      </view>
      <view class="add-i-aline" />

      <add-remark label="要求：" required :value="requireInfo" @input="infoChange" />

			<!-- 上传文件 -->
			<up-file v-model="orderResourceList" :modal="isEdit ? 'select' : 'show'"/>

    </back-container>

    <view class="add-im-tips" v-if="isEdit">
			<red-star />上传完整清晰图片、视频，以便师傅更快接单
		</view>

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
import RedStar from "../../receive-order/component/redStar";
import UploadList from "../../receive-order/component/uploadList";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "addPersonWork",
  components: { BigBtn, IphonexBottom, UploadList, AddRemark, RedStar, CheckdItem, OfferHead, BackContainer },
  data() {
    return {
			isEdit: true,
			cateId: '', // 人员类型id
			cateName: '', // 人员类型
			number: 0, // 面积
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
				this.number = work.number;
				this.requireInfo = work.requireInfo;
				this.orderResourceList = work.orderResourceList;
		})
	},
	mounted() {
		uni.$on('submitSelectUserroleTree',(userroleList)=>{
			console.log('userroleList',userroleList);
			this.cateId = userroleList[0].id || '';
			this.cateName = userroleList[0].name || '';
		})
	},
	destroyed() {
		uni.$off('submitSelectUserroleTree');
	},
	methods: {
		roleSelect() {
			if (!this.isEdit) return;
			uni.navigateTo({
				url:`/pages/main/apply/tree?type=userrole`
			})
		},
		infoChange(t) {
			if (!this.isEdit) return;
			this.requireInfo = t;
		},
	  onSubmit() {
			if (!this.requireInfo) {
				uni.showToast({ title: '请输入要求', icon: 'none' })
				return;
			}
			if (this.orderResourceList.length == 0) {
				uni.showToast({ title: '请上传资料', icon: 'none' })
				return;
			}
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
