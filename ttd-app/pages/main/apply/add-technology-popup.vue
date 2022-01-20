<!-- 添加技能 -->
<template>
	<uni-popup type="bottom" :safeArea="false" ref="popup">
		<view class="popup-content">
			<view class="title">添加技能</view>
			<scroll-view scroll-y="true" class="scroll-content">
				<view class="row flex-center-between" @click="selectSkill">
					<text class="text">选择技能</text>
					<view class="flex-1 flex align-end column">
						<view v-for="node in skillList">{{node.name}}</view>
						<view class="" v-if="skillList.length == 0">请选择技能</view>
					</view>

					<image class="icon-arrow"
						src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/icon/icon-arrow-right-black.svg"
						mode="aspectFill"></image>
				</view>
				<view class="row flex-center-between" @click="selectBrand">
					<text class="text">选择品牌</text>
					<view class="flex-1 tag-list">
						<view class="item flex-center" v-for="(item,index) in brandList" :key="index">
							<text class="flex-1 text-ellipis">{{item}}</text>
						</view>
						<view class="" v-if="brandList.length == 0">请选择品牌</view>
					</view>
					<image class="icon-arrow"
						src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/icon/icon-arrow-right-black.svg"
						mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view class="bottom flex-center-between">
				<button class="btn btn-cancel" @click="close">取消</button>
				<button class="btn btn-confirm" @click="confirmAction">确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name: 'AddTechnologyPopup',
		data() {
			return {
				skillList: [],
				brandList: [],
			};
		},
		mounted() {
			uni.$on('submitSelectSkillTree', (skillList) => {
				console.log('skillList', skillList);
				this.skillList = skillList || [];
			})
			uni.$on('submitBrandList', brandList => {
				this.brandList = brandList;
			})
		},
		destroyed() {
			uni.$off('submitSelectSkillTree');
			uni.$off('submitBrandList');
		},
		methods: {
			// 打开弹窗
			open() {
				this.$refs.popup.open();
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close();
			},
			// 选择技能
			selectSkill() {
				uni.navigateTo({
					url: `/pages/main/apply/tree?type=skill`
				})
			},
			// 选择品牌
			selectBrand() {
				if (this.skillList.length == 0) {
					this.$tool.showToast('请先选择技能')
				} else {
					uni.navigateTo({
						url: `/pages/main/apply/list?type=brand&skillId=${this.skillList[0].id || ''}`
					})
				}
			},
			// 删除品牌
			deleteBrand(item) {

			},
			// 确定按钮点击事件
			confirmAction() {
				if (this.skillList.length == 0) {
					this.$tool.showToast('请选择技能');
					return;
				}

				// if(this.brandList.length == 0){
				// 	this.$tool.showToast('请选择品牌');
				// 	return;
				// }

				const skillData = this.skillList.map(skill => {
					return {
						...skill,
						brandList: this.brandList
					}
				})
				this.$emit('confirmSkillData', skillData);
				this.skillList = [];
				this.brandList = [];
				this.close();
			}
		}
	};
</script>

<style lang="scss" src="./popup.scss" scoped></style>
