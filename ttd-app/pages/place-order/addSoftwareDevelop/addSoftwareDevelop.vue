<template>
  <view class="add-im">
    <custom-navbar :title="`${isEdit ? '添加' : '查看'}软件开发`" />

    <back-container>
      <template #headerSlot>
        <offer-head title="软件开发" text="寻找各类型程序猿、设计湿等，为改变世界而奋斗" />
      </template>

      <view class="add-imple">

        <view class="add-i-item">
          <view class="add-i-lable">类别</view>
					<!-- <picker class="add-i-midle" @change="softwareSelect" :disabled="!isEdit" :value="cateName" :range="softwareList" range-key="name"> -->
					  <view class="add-i-midle" :class="cateName ? 'add-i-acc' : ''" @click="softwareSelect">{{ cateName || '请选择' }}</view>
					<!-- </picker> -->
          <uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
        </view>


      </view>
      <view class="add-i-aline" />

      <add-remark label="要求：" required :value="requireInfo" @input="infoChange"  />

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
import RedStar from "../../receive-order/component/redStar";
import UploadList from "../../receive-order/component/uploadList";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "addSoftwareDevelop",
  components: { BigBtn, IphonexBottom, UploadList, AddRemark, RedStar, CheckdItem, OfferHead, BackContainer },
  data() {
    return {
			isEdit: true,
			cateId: '', // 软件类型id
			cateName: '', // 软件类型
			requireInfo: '', // 备注
      orderResourceList: [], // {	resourceType: 1, // 资源类型 1、图片视频 2、语音 3、文件    url: ''  }

			softwareList: [],
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
				this.requireInfo = work.requireInfo;
				this.orderResourceList = work.orderResourceList;
		})
  },
	onReady() {
		this.querySoftwareList();
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
		querySoftwareList() {
			this.$http.post('/b/softwareconf/queryList', {}, true)
			.then(res => {
			  this.softwareList = res;
			})
		},
		softwareSelect(e) {
			if (!this.isEdit) return;
			uni.navigateTo({
				url:`/pages/main/apply/tree?type=userrole&selectType=single`
			})
			// const index = e.target.value;
			// this.cateId = this.softwareList[index].id;
			// this.cateName = this.softwareList[index].name;
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
