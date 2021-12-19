<template>
	<view class="add-im">
		<custom-navbar title="添加实施工作" />

		<back-container>
			<template #headerSlot>
				<offer-head title="实施与维修" text="电子产品的实施与维修工作" />
			</template>

			<view class="add-imple">
				<checkd-item :value="type" label="下单类型" :list="[{text: '实施', value: '1'}, {text: '维修', value: '2'}]"
					@change="changeType" />

				<view class="add-i-item">
					<view class="add-i-lable">服务内容</view>
					<view class="add-i-midle" @click="skillSelect"> {{ cateName || '请选择' }}</view>
					<uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
				</view>

				<view class="add-i-item">
					<view class="add-i-lable">品牌</view>
					<view class="add-i-midle" @click="brandSelect">{{ brand || '请选择' }}</view>
					<uni-icons class="add-i-right" type="arrowright" size="18" color="#969799" />
				</view>

				<view class="add-i-item">
					<view class="add-i-lable">型号</view>
					<input class="add-i-midle input-sty" :value="model" @input="modelChange" placeholder="可选输入"
						placeholder-class="input-placeholder" />
				</view>

				<view class="add-i-item">
					<view class="add-i-lable">数量</view>
					<view class="add-i-midle">
						<uni-number-box v-model="number" />
					</view>
				</view>
			</view>

			<view class="add-i-aline" />

			<add-remark label="要求：" required :value="requireInfo" @input="infoChange" />

			<view class="up-list">
				<upload-list upload-text="添加图片" @upload="chooseImage" />
				<!-- <upload-list upload-icon="4" upload-text="拍照" /> -->
				<upload-list upload-icon="2" @upload="chooseFile" />
				<upload-list upload-icon="3" upload-text="添加语音" @upload="startRecord" />
				<upload-list upload-icon="3" upload-text="添加语音" @upload="endRecord" />
			</view>
		</back-container>

		<view class="add-im-tips">上传完整清晰图片、视频，以便师傅更快接单</view>

		<iphonex-bottom>
			<big-btn @click="onSubmit" />
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

	const recorderManager = uni.getRecorderManager();

	export default {
		name: "addImplementation",
		components: {
			BigBtn,
			IphonexBottom,
			UploadList,
			AddRemark,
			CheckdItem,
			OfferHead,
			BackContainer
		},
		data() {
			return {
				type: '1', // 类别 1、实施，2、维修
				cateId: '', // 需求分类ID
				cateName: '', // 需求名称
				brand: '', // 品牌
				brandId: '', // 品牌编号
				model: '', // 型号
				number: 0, // 数量
				requireInfo: '', // 备注
				orderResourceList: [], // {	resourceType: 1, // 资源类型 1、图片视频 2、语音 3、文件    url: ''  }

				skillList: [], // 服务类型数据源
				brandList: [], // 品牌类型数据源
			};
		},
		onLoad(option) {
			let self = this;
			// 监听上级页面传入数据
			const eventChannel = self.getOpenerEventChannel();
			eventChannel.on('editWork', (work) => {
				console.log('editWork ', work);
				this.type = work.type;
				this.cateId = work.cateId;
				this.cateName = work.cateName;
				this.brand = work.brand;
				this.brandId = work.brandId;
				this.model = work.model;
				this.number = work.number;
				this.requireInfo = work.requireInfo;
				this.orderResourceList = work.orderResourceList;
			})
			// 监听录音事件
			recorderManager.onStop(function(res) {
				console.log('recorder stop' + JSON.stringify(res));
				const path = res.tempFilePath;
				self.uploadImage(path, 2);
			});
		},
		onReady() {},
		mounted() {
			uni.$on('submitSelectSkillTree', (skillList) => {
				console.log('skillList', skillList);
				this.skillList = skillList || [];
				this.cateId = this.skillList[0].id;
				this.cateName = this.skillList[0].name;
			})
			uni.$on('submitBrandList', brandList => {
				console.log('brandList ', brandList);
				this.brandList = brandList;
				this.brand = this.brandList[0];
			})
		},
		destroyed() {
			uni.$off('submitSelectSkillTree');
			uni.$off('submitBrandList');
		},
		methods: {
			changeType(value) {
				this.type = value
			},
			modelChange(e) {
				this.model = e.target.value;
			},
			skillSelect() {
				uni.navigateTo({
					url: `/pages/main/apply/tree?type=skill`
				});
			},
			brandSelect() {
				if (this.skillList.length == 0) {
					this.$tool.showToast('请先选择技能')
				} else {
					uni.navigateTo({
						url: `/pages/main/apply/list?type=brand&skillId=${this.skillList[0].id || ''}`
					})
				}
			},
			infoChange(t) {
				this.requireInfo = t;
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
					success: function(res) {
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
				this.$http.upload({
						path
					}, true)
					.then(res => {
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
	@import "../../mine/addressManage/_inputStyle.scss";
	@import "./_addImplementation.scss";
</style>

<style lang="scss">
	@import "../../mine/addressManage/_pageStyle.scss";
</style>
