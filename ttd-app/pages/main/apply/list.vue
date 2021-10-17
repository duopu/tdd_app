<!--列表-->
<template>
	<view class="select-lists page-container">
		<!--搜索-->
		<!-- <custom-search-input class="search-content"></custom-search-input> -->
		<!-- 选中区域 -->
		<view class="title flex-center-start">已选项</view>
		<view class="select-content">
			<view class="item" v-for="(item,index) in selectDataList" :key="index">{{item}}</view>
		</view>
		<view class="title flex-center-start">选择列表</view>
		<!-- 内容 -->
		<scroll-view class="scroll-content list" scroll-y="true">
			<view class="list-item flex-center-start" v-for="(item,index) in dataList" :key="index"  @click="itemClick(item)">
				<text class="radio" :class="{'on':selectDataList.includes(item)}"></text>
				<text>{{item}}</text>
			</view>
		</scroll-view>
		<!-- 底部 -->
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
				// 数据类型，brand：品牌  software：软件
				sourceType: '',
				// 技能id
				skillId:'',
				// 当前展示的节点列表
				dataList: [],
				// 已经选中的节点列表
				selectDataList: [],
				// 信息字典
				sourceDict:{
					brand:{
						listUrl:'/b/skill/querybrandList',
						submitKey:'submitBrandList',
						navTitle:'选择品牌',
						customTitle:'自定义品牌',
						customPlaceholder:'请输入品牌名称',
					},
					software:{
						listUrl:'/b/softwareconf/queryList',
						submitKey:'submitSoftwareList',
						navTitle:'选择软件',
						customTitle:'自定义软件',
						customPlaceholder:'请输入软件名称',
					}
				}
			};
		},
		onLoad(option) {
			this.sourceType = option.type;
			this.skillId = option.skillId;
			
			this.queryDataList()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.dictInfo.navTitle
			})
		},
		computed: {
			dictInfo(){
				return this.sourceDict[this.sourceType];
			}
		},
		methods: {
			// 查询节点列表
			queryDataList() {
				const param = {}
				if(this.sourceType == 'brand'){
					param.idList = [this.skillId];
				}
				this.$http.post(this.dictInfo.listUrl, param, true).then(res => {
					if(this.sourceType == 'brand'){
						this.dataList = res
					}else if(this.sourceType == 'software'){
						this.dataList = res.map(d=>d.name)
					}
				})
			},
			// 选项选择事件
			itemClick(item){
				if(this.selectDataList.includes(item)){
					this.selectDataList = this.selectDataList.filter(v=>v!=item)
				}else{
					this.selectDataList = [...this.selectDataList,item]
				}
			},
			// 自定义事件
			customItemData() {
				uni.showModal({
					title: this.dictInfo.customTitle,
					editable: true,
					placeholderText: this.dictInfo.customPlaceholder,
					success: (res) => {
						if (res.confirm) {
							this.selectDataList = [res.content];
							this.submitAction();
						}
					}
				})
			},
			// 提交事件
			submitAction() {
				console.log('列表选择页面 提交事件',this.selectDataList);
				uni.$emit(this.dictInfo.submitKey, this.selectDataList)
				uni.navigateBack({})
			}
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
