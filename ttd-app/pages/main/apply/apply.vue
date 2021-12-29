<!-- 申请承接方 -->
<template>
	<view class="page-container apply">
		<view class="tips">
			所有非必填项，按您的实际情况填写；填写内容关乎您接单的数量，请尽可能把您信息都上传，加大匹配订单成功率！
		</view>
		<!-- 内容 -->
		<scroll-view scroll-y="true" class="scroll-content" :scroll-top="scrollTop">
			<!-- 基本信息 -->
			<view class="title flex-center-start">基本信息</view>
			<view class="white">
				<custom-input-row label-text="姓名">
					<input class="input" placeholder-class="input-placeholder" type="text" placeholder="请输入姓名"
						:value="name" @input="nameChange" :disabled="true" />
				</custom-input-row>
				<custom-input-row label-text="手机号码" >
					<input always-embed="true" class="input" placeholder-class="input-placeholder" type="number"
						placeholder="请输入手机号码" :value="phone"  :disabled="true" />
				</custom-input-row>
				<custom-input-row label-text="备用手机号码">
					<input always-embed="true" class="input" placeholder-class="input-placeholder" type="number"
						placeholder="请输入备用手机号码" :value="contactPhone" @input="contactPhoneChange"  />
				</custom-input-row>
				<custom-input-row label-text="身份证" >
					<input always-embed="true" class="input" placeholder-class="input-placeholder" type="idcard"
						placeholder="请输入身份证号" :value="idCard" @input="idCardChange" :disabled="true" />
				</custom-input-row>
			</view>
			<!-- 简介 -->
			<view class="title flex-center-start m-top-16">简介</view>
			<view class="white">
				<textarea class="profile-text" maxlength="200" placeholder="请输入简介" placeholder-class="input-placeholder"
					:value="remark" @input="remarkChange" />
			</view>
			<!-- 从业信息 -->
			<view class="title flex-center-start m-top-16">从业信息</view>
			<!-- 技能 -->
			<view class="white list m-top-16">
				<view class="tip-lable"></view>
				<custom-input-row :required="true" label-text="技能"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item, index) in skillData" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">{{item.name}}</view>
						<view class="describe">{{item.brandList.join('、')}}</view>
					</view>
					<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/delete.png" mode="aspectFill"
						class="image-delete" @click="deleteSkill(index)"></image>
				</view>
				<button class="btn btn-add" @click="openPopup('technologyPopup')">新增技能</button>
			</view>
			<!-- 岗位 -->
			<view class="white list m-top-16">
				<custom-input-row :required="true" label-text="岗位"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item, index) in userroleData" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">{{item.name}}</view>
						<view class="describe">{{item.softwareconfList.join('、')}}</view>
					</view>
					<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/delete.png" mode="aspectFill"
						class="image-delete" @click="deleteSoftwareconf(index)"></image>
				</view>
				<button class="btn btn-add" @click="openPopup('staffPopup')">新增人员</button>
			</view>
			<!-- 项目 -->
			<view class="white list m-top-16">
				<custom-input-row :required="true" label-text="项目"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item, index) in projectData" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">行业名称：{{item.name}}</view>
						<view class="describe">履历：{{item.content}}</view>
					</view>
					<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/delete.png" mode="aspectFill"
						class="image-delete" @click="deleteProject(index)"></image>
				</view>
				<button class="btn btn-add" @click="openPopup('projectPopup')">新增项目</button>
			</view>
			<!-- 工具 -->
			<view class="white list m-top-16">
				<custom-input-row :required="true" label-text="工具"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item, index) in toolData" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">{{item.name}}</view>
						<view class="describe">是否租赁：{{item.leaseFlag ? '是' : '否'}}</view>
					</view>
					<image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/delete.png" mode="aspectFill"
						class="image-delete" @click="deleteTool(index)"></image>
				</view>
				<button class="btn btn-add" @click="openPopup('toolsPopup')">新增工具</button>
			</view>
		</scroll-view>
		<!-- 底部保存 -->
		<button class="btn primary btn-save" @click="submitApply">提交</button>
		<!-- 添加技能 -->
		<add-technology-popup ref="technologyPopup" @confirmSkillData="confirmSkillData"></add-technology-popup>
		<!-- 添加人员 -->
		<add-staff-popup ref="staffPopup" @confirmUserroleData="confirmUserroleData"></add-staff-popup>
		<!-- 添加项目 -->
		<add-project-popup ref="projectPopup" @confirmProjectData="confirmProjectData"></add-project-popup>
		<!-- 添加工具 -->
		<add-tools-popup ref="toolsPopup" @confirmToolData="confirmToolData"></add-tools-popup>
	</view>
</template>

<script>
	import AddTechnologyPopup from './add-technology-popup.vue';
	import AddStaffPopup from './add-staff-popup.vue';
	import AddToolsPopup from './add-tools-popup.vue';
	import AddProjectPopup from './add-project-popup.vue';
	import config from '../../../utils/config.js';
	export default {
		components: {
			AddTechnologyPopup,
			AddStaffPopup,
			AddToolsPopup,
			AddProjectPopup
		},
		data() {
			return {
				// name: '',
				// phone: '',
				contactPhone:'',
				// idCard: '',
				remark: '',
				// 技能列表
				skillData: [],
				// 人员列表
				userroleData: [],
				// 项目列表
				projectData: [],
				// 工具列表
				toolData: [],
				// 滚动的位置
				scrollTop: 0,
			};
		},
		computed: {
			approveDetail() {
				return this.$store.state.approveDetail || {};
			},
			name(){
				console.log('啊大神大所大所',this.$store.state.user);
				return this.$store.state.user.name
			},
			phone(){
				return this.$store.state.user.phone
			},
			idCard(){
				return this.$store.state.user.idCard
			}
		},
		onReady() {
			console.log('啊大神大所大所',this.$store.state.user);
			
			this.recoveryInfoStorage()
		},
		methods: {
			// 姓名改变
			nameChange(e) {
				this.name = e.detail.value;
				this.saveInfoStorage();
			},
			// 手机号改变
			contactPhoneChange(e) {
				this.contactPhone = e.detail.value;
				this.saveInfoStorage();
			},
			// 身份证号改变
			idCardChange(e) {
				this.idCard = e.detail.value;
				this.saveInfoStorage();
			},
			// 简介改变
			remarkChange(e) {
				this.remark = e.detail.value;
				this.saveInfoStorage();
			},
			// 打开弹窗
			openPopup(refName) {
				this.$refs[refName].open();
			},
			// 添加技能
			confirmSkillData(data) {
				this.skillData = [...this.skillData, ...data];
				this.scrollTopAction('skill')
				this.saveInfoStorage();
			},
			// 删除技能
			deleteSkill(index) {
				this.skillData = this.skillData.filter((v, i) => i != index)
				this.saveInfoStorage();
			},
			// 添加人员
			confirmUserroleData(data) {
				this.userroleData = [...this.userroleData, ...data];
				this.scrollTopAction('userrole')
				this.saveInfoStorage();
			},
			// 删除人员
			deleteSoftwareconf(index) {
				this.userroleData = this.userroleData.filter((v, i) => i != index)
				this.saveInfoStorage();
			},
			// 添加项目
			confirmProjectData(data) {
				this.projectData = [...this.projectData, data]
				this.scrollTopAction('project')
				this.saveInfoStorage();
			},
			// 删除姓名
			deleteProject(index) {
				this.projectData = this.projectData.filter((v, i) => i != index)
				this.saveInfoStorage();
			},
			// 添加工具
			confirmToolData(data) {
				this.toolData = [...this.toolData, ...data];
				this.scrollTopAction('tool')
				this.saveInfoStorage();
			},
			// 删除工具
			deleteTool(index) {
				this.toolData = this.toolData.filter((v, i) => i != index)
				this.saveInfoStorage();
			},
			// 提交申请
			submitApply() {
				if (this.skillData.length == 0 && this.userroleData.length == 0 && this.toolData.length == 0) {
					this.$tool.showToast('请输入从业信息');
				} else {
					const param = {
						name: this.name,
						phone: this.phone,
						contactPhone:this.contactPhone,
						idCard: this.idCard,
						remark: this.remark,
					}
					param.skillApplyList = this.skillData.map(s => ({
						skillId: s.id,
						nodeLink: s.name,
						brandList: s.brandList
					}));
					param.userRoleApplyList = this.userroleData.map(u => ({
						userRoleId: u.id,
						nodeLink: u.name,
						softwareList: u.softwareconfList
					}));
					param.projectApplyList = this.projectData.map(p => ({
						projectName: p.name,
						resume: p.content
					}));
					param.toolApplyList = this.toolData.map(t => ({
						toolId: t.id,
						nodeLink: t.name,
						leaseFlag: t.leaseFlag
					}));
					this.$http.post('/b/applyundertaker/apply', param, true).then(res => {

						this.$tool.showToast('申请已提交，等待管理员审核', () => {
							const auth = this.$store.state.authentication.state;
							if (auth == 1) {
								uni.navigateBack({})
							} else {
								uni.showModal({
									title: '提示',
									content: '接单需要实名认证',
									confirmText: '去认证',
									cancelText: '不认证',
									success: (res) => {
										if (res.confirm) {
											uni.replace({
												url: '/pages/mine/realNameAuth/realNameAuth'
											})
										}else{
											uni.navigateBack({})
										}
									}
								})
							}
						})
						// 刷新审核状态
						this.$store.dispatch('queryApproveDetail');
					})
				}
			},
			// 让列表滚动
			scrollTopAction(type) {
				if (type == 'skill') {
					this.scrollTop = this.skillData.length * 62;
				} else if (type == 'userrole') {
					this.scrollTop = this.skillData.length * 62 + 100 + this.userroleData.length * 62;
				} else if (type == 'project') {
					this.scrollTop = this.skillData.length * 62 + 100 + this.userroleData.length * 62 + 100 + this
						.projectData.length * 62;
				} else if (type == 'tool') {
					this.scrollTop = this.skillData.length * 62 + 100 + this.userroleData.length * 62 + 100 + this
						.projectData.length * 62 + 1000 + this.toolData.length * 62;
				}
			},
			// 保存信息到本地
			saveInfoStorage() {
				console.log('保存信息到本地', this.$data);
				uni.setStorage({
					key: config.storageKeys.applyInfoStorage,
					data: this.$data,
					success: () => {
						console.log('保存成功');
					}
				})
			},
			// 从本地拉出信息 安排到页面中
			recoveryInfoStorage() {
				uni.getStorage({
					key: config.storageKeys.applyInfoStorage,
					success: (res) => {
						console.log('从本地拉出信息成功 ', res);
						const data = res.data
						this.contactPhone = data.contactPhone;
						this.remark = data.remark;
						this.skillData = data.skillData;
						this.userroleData = data.userroleData;
						this.projectData = data.projectData;
						this.toolData = data.toolData;
					},
					fail: () => {
						console.log('从本地拉出信息失败 ', this.approveDetail);
						if (this.approveDetail.id) {
							this.contactPhone = this.approveDetail.contactPhone;
							this.remark = this.approveDetail.remark;
							if (this.approveDetail.skillApplyList) {
								this.skillData = this.approveDetail.skillApplyList.map(s => {
									return {
										id: s.skillId,
										name: s.nodeLink,
										brandList: s.brandList
									}
								})
							}
							if (this.approveDetail.userRoleApplyList) {
								this.userroleData = this.approveDetail.userRoleApplyList.map(u => {
									return {
										softwareconfList: u.softwareList,
										id: u.userRoleId,
										name: u.nodeLink
									}
								})
							}

							if (this.approveDetail.projectApplyList) {
								this.projectData = this.approveDetail.projectApplyList.map(p => {
									return {
										name: p.projectName,
										content: p.resume
									}
								})
							}

							if (this.approveDetail.toolApplyList) {
								this.toolData = this.approveDetail.toolApplyList.map(t => {
									return {
										id: t.toolId,
										name: t.nodeLink,
										leaseFlag: t.leaseFlag
									}
								})
							}
						}
					}
				})
			}
		}
	};
</script>

<style src="./style.scss" scoped lang="scss"></style>
