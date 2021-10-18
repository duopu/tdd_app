<!-- 申请承接方 -->
<template>
	<view class="page-container apply">
		<!-- 内容 -->
		<scroll-view scroll-y="true" class="scroll-content">
			<!-- 基本信息 -->
			<view class="title flex-center-start">基本信息</view>
			<view class="white">
				<custom-input-row label-text="姓名" :required="true">
					<input class="input" placeholder-class="input-placeholder" type="text" placeholder="请输入姓名"
						v-model="name" />
				</custom-input-row>
				<custom-input-row label-text="手机号码" :required="true">
					<input class="input" placeholder-class="input-placeholder" type="number" placeholder="请输入手机号码"
						v-model="phone" />
				</custom-input-row>
				<custom-input-row label-text="身份证" :required="true">
					<input class="input" placeholder-class="input-placeholder" type="idcard" placeholder="请输入身份证号"
						v-model="idCard" />
				</custom-input-row>
			</view>
			<!-- 简介 -->
			<view class="title flex-center-start m-top-16">简介</view>
			<view class="white"><textarea class="profile-text" maxlength="200" placeholder="请输入简介"
					placeholder-class="input-placeholder" v-model="remark" /></view>
			<!-- 从业信息 -->
			<view class="title flex-center-start m-top-16">从业信息</view>
			<!-- 技能 -->
			<view class="white list m-top-16">
				<view class="tip-lable">所有非必填项，按您的实际情况填写</view>
				<custom-input-row :required="true" label-text="技能"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item, index) in skillData" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">{{item.name}}</view>
						<view class="describe">{{item.brandList.join('、')}}</view>
					</view>
					<image src="../../../static/delete.png" mode="aspectFill" class="image-delete"
						@click="deleteSkill(index)"></image>
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
					<image src="../../../static/delete.png" mode="aspectFill" class="image-delete"
						@click="deleteSoftwareconf(index)"></image>
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
					<image src="../../../static/delete.png" mode="aspectFill" class="image-delete"
						@click="deleteProject(index)"></image>
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
					<image src="../../../static/delete.png" mode="aspectFill" class="image-delete"
						@click="deleteTool(index)"></image>
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
				name: '',
				phone: '',
				idCard: '',
				remark: '',
				// 技能列表
				skillData: [],
				// 人员列表
				userroleData: [],
				// 项目列表
				projectData: [],
				// 工具列表
				toolData: [],
				// 保存的tag
				saveTag: false
			};
		},
		computed: {
			watchData() {
				this.name;
				this.phone;
				this.idCard;
				this.remark;
				this.skillData;
				this.userroleData;
				this.projectData;
				this.toolData;
				if (this.saveTag) this.saveInfoStorage()
			}
		},
		onReady() {
			this.recoveryInfoStorage()
			this.saveTag = true;
		},
		methods: {
			// 打开弹窗
			openPopup(refName) {
				this.$refs[refName].open();
			},
			// 添加技能
			confirmSkillData(data) {
				this.skillData = [...this.skillData, ...data];
			},
			// 删除技能
			deleteSkill(index) {
				this.skillData = this.skillData.filter((v, i) => i != index)
			},
			// 添加人员
			confirmUserroleData(data) {
				this.userroleData = [...this.userroleData, ...data];
			},
			// 删除人员
			deleteSoftwareconf(index) {
				this.userroleData = this.userroleData.filter((v, i) => i != index)
			},
			// 添加项目
			confirmProjectData(data) {
				this.projectData = [...this.projectData, data]
			},
			deleteProject(index) {
				this.projectData = this.projectData.filter((v, i) => i != index)
			},
			// 添加工具
			confirmToolData(data) {
				this.toolData = [...this.toolData, ...data];
			},
			// 删除工具
			deleteTool(index) {
				this.toolData = this.toolData.filter((v, i) => i != index)
			},
			// 提交申请
			submitApply() {
				console.log(this.$data);
				if (!this.name) {
					this.$tool.showToast('请输入姓名');
				} else if (!this.phone) {
					this.$tool.showToast('请输入手机号');
				} else if (!this.idCard || this.idCard.length !== 18) {
					this.$tool.showToast('请输入正确的身份证号');
				} else if (this.skillData.length == 0 && this.userroleData.length == 0 && this.toolData.length == 0) {
					this.$tool.showToast('请输入从业信息');
				} else {
					const param = {
						name: this.name,
						phone: this.phone,
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
							uni.navigateBack({})
						})
					})
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
						const data = res.data
						this.name = data.name;
						this.phone = data.phone;
						this.idCard = data.idCard;
						this.remark = data.remark;
						this.skillData = data.skillData;
						this.userroleData = data.userroleData;
						this.projectData = data.projectData;
						this.toolData = data.toolData;
					},
					fail: () => {
						const user = this.$store.state.user;
						this.name = user.name;
						this.phone = user.phone;
					}
				})
			}
		}
	};
</script>

<style src="./style.scss" scoped lang="scss"></style>
