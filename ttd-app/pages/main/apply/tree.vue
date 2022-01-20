<!-- 树形列表 -->
<template>
	<view class="page-container select-lists">
		<!--搜索-->
		<custom-search-input class="search-content" v-model="searchText" @search="onSearchAction"></custom-search-input>
		<text class="tip-text">如果下面类别没有您要的内容，可以点“自定义”按钮添加</text>
		<template v-if="type == 1">
			<!-- 面包屑 -->
			<scroll-view scroll-x="true" class="breadcrumb" scroll-into-view="current">
				<text id="current" class="active text" @click="gotoNodeTreeHeader">开始</text>
				<uni-icons class="icon" type="arrowright" color="#999999"></uni-icons>
				<block v-for="(node,index) in nodesLink">
					<text class="previous text" @click="changeLinkLocation(index)">{{node.name}}</text>
					<uni-icons class="icon" type="arrowright" color="#999999"></uni-icons>
				</block>
			</scroll-view>
			<!-- 选中区域 -->
			<view class="title flex-center-start">已选项</view>
			<view class="select-content">
				<view class="item" v-for="item in selectNodeList" :key="item.id">{{item.name}}</view>
			</view>
		</template>

		<view class="title flex-center-start">选择列表</view>
		<!-- 树形 -->
		<scroll-view scroll-y="true" class="scroll-content">

			<template v-for="node in nodeList">
				<!-- 有下一级的样式 -->
				<view class="list-item flex-center-between" :key="node.id"
					v-if="node.childrenIdList && node.childrenIdList.length > 0 && type == 1"
					@click="showNextNodeList(node)">
					<text>{{node.name}}</text>
					<uni-icons type="arrowright" class="icon-arrow" size="14" color="#333333"></uni-icons>
				</view>
				<!-- 要选择的样式 -->
				<view class="list-item flex-center-start" v-else :key="node.id" @click="selectNode(node)">
					<text class="radio" :class="{'on':selectNodeList.find(n=>n.id == node.id)}"></text>
					<text>{{type == 1 ? node.name : node.nodeLink}}</text>
				</view>
			</template>
			<empty-view :tipText="dictInfo.emptyTip" v-if="nodeList.length == 0"></empty-view>

		</scroll-view>
		<!-- 提交 -->
		<view class="flex row">
			<button class="btn btn-save flex-1" @click="customItemData">{{dictInfo.customTitle}}</button>
			<button class="btn btn-save flex-1" @click="submitAction">提交</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 树的选择链路
				nodesLink: [],
				// 当前展示的节点列表
				nodeList: [],
				// 已经选中的节点列表
				selectNodeList: [],
				// 数据类型  skill：技能树  userrole:岗位树
				sourceType: '',
				// type 1 树形选择操作， type 0 搜索选择操作
				type: 1,
				// 搜索文字
				searchText: '',
				// 选择类型 single：单选   multiple：多选
				selectType:'multiple',
				// 信息字典
				sourceDict: {
					skill: {
						listUrl: '/b/skill/queryListByPid',
						queryUrl: '/b/skill/queryNodeLinkList',
						submitKey: 'submitSelectSkillTree',
						navTitle: '选择技能',
						customTitle: '自定义技能',
						customPlaceholder: '请输入技能名称',
						emptyTip: '请点击下方“自定义技能”按钮，添加技能；感谢您为平台新增加一个技能！',
					},
					userrole: {
						listUrl: '/b/userrole/queryListByPid',
						queryUrl: '/b/userrole/queryNodeLinkList',
						submitKey: 'submitSelectUserroleTree',
						navTitle: '选择岗位',
						customTitle: '自定义岗位',
						customPlaceholder: '请输入岗位名称',
						emptyTip: '请点击下方“自定义岗位”按钮，添加岗位；感谢您为平台新增加一个岗位！',
					},
					equipmenttool: {
						listUrl: '/b/equipmenttool/queryListByPid',
						queryUrl: '/b/equipmenttool/queryNodeLinkList',
						submitKey: 'submitSelectEquipmenttoolTree',
						navTitle: '选择工具',
						customTitle: '自定义工具',
						customPlaceholder: '请输入工具名称',
						emptyTip: '请点击下方“自定义工具”按钮，添加工具；感谢您为平台新增加一个工具！',
					}
				}
			};
		},
		onLoad(option) {
			this.sourceType = option.type;
			this.selectType = option.selectType || 'multiple'
			this.queryNodeList()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.dictInfo.navTitle
			})
		},
		computed: {
			fatherNode() {
				return this.nodesLink[this.nodesLink.length - 1] || {}
			},
			dictInfo() {
				return this.sourceDict[this.sourceType];
			}
		},
		methods: {
			// 查询节点列表
			queryNodeList() {
				if (this.type == 1) {
					const param = {
						pid: this.fatherNode.id,
						userType: 1,
					}
					this.$http.post(this.dictInfo.listUrl, param, true).then(res => {
						this.nodeList = res;
					})
				} else {
					this.$http.post(this.dictInfo.queryUrl, {
						nameLike: this.searchText
					}, true).then(res => {
						this.nodeList = res;
					})
				}
			},
			// 查看下一层列表
			showNextNodeList(node) {
				this.nodesLink = [...this.nodesLink, node];
				this.queryNodeList();
				this.selectNodeList = []
			},
			// 选中了选项
			selectNode(node) {
				if(this.selectType == 'multiple'){
					if (this.type == 1) {
						let select = !!this.selectNodeList.find(n => n.id == node.id);
						if (select) {
							this.selectNodeList = this.selectNodeList.filter(n => n.id != node.id);
						} else {
							this.selectNodeList = [...this.selectNodeList, node];
						}
					} else {
						this.selectNodeList = [node]
					}
				}else if(this.selectType == 'single'){
					this.selectNodeList = [node]
				}
			},
			// 面包屑导航操作
			changeLinkLocation(index) {
				if (index == this.nodesLink.length - 1) return;
				this.selectNodeList = [];
				this.nodesLink = this.nodesLink.filter((n, i) => i <= index);
				this.queryNodeList();
			},
			// 展示树 选择最开始的样子
			gotoNodeTreeHeader() {
				this.selectNodeList = [];
				this.nodesLink = [];
				this.queryNodeList();
			},
			// 搜索
			onSearchAction(searchText) {
				if (searchText.length) {
					this.type = 0;
				} else {
					this.type = 1;
				}
				this.searchText = searchText;
				this.selectNodeList = [];
				this.nodesLink = [];
				this.queryNodeList();
			},
			// 自定义事件
			customItemData() {
				uni.showModal({
					title: this.dictInfo.customTitle,
					editable: true,
					content: this.searchText,
					placeholderText: this.dictInfo.customPlaceholder,
					success: (res) => {
						if (res.confirm) {
							if (res.content) {
								this.selectNodeList = [{
									name: res.content
								}];
								this.submitAction();
							}
						}
					}
				})
			},
			// 提交事件
			submitAction() {
				console.log('树型选择页面 提交事件', this.selectNodeList);
				uni.$emit(this.dictInfo.submitKey, this.selectNodeList)
				uni.navigateBack({})
			}

		}
	};
</script>

<style lang="scss" src="./style.scss" scoped></style>
