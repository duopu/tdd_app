<!-- 首页 -->
<template>
	<view class="page-container">
		<!-- 搜索 -->
		<view class="flex-center top">
			<image mode="aspectFill" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/search-white.png"
				class="image-logo"></image>
			<input class="flex-1 input" type="text" value="" placeholder-class="input-placeholder"
				placeholder="请输入服务类型名称" />
		</view>
		<!-- 横向菜单 -->
		<view class="flex-center-start menu">
			<view class="item flex-column-center" v-for="(item, index) in menuItemLists" :key="index"
				@click="onMenuItem(index)">
				<image :src="item.image" mode="aspectFill" class="image"></image>
				<text class="text">{{ item.text }}</text>
			</view>
		</view>
		<!-- 滚动 单个 -->
		<swiper class="swiper menu-content" :current="swiperIndex" @change="swiperChange">
			<swiper-item class="swiper-item" v-for="(itemList, index) in itemListList" :key="index">
				<view class="menu-arrow" :style="{ left: getArrowLeftDistance(index) }"></view>
				<scroll-view scroll-y="true" class="scroll-content">
					<view class="menu-lists">
						<view class="item flex-column-center" v-for="(item, subIndex) in itemList" :key="subIndex"
							@click="onItemClick(item)">
							<image :src="item.icon" mode="aspectFill" class="image"></image>
							<text class="text">{{ item.name }}</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 广告 -->
		<swiper class="advertise-swiper" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#ffffff"
			:indicator-dots="true" :autoplay="true" :interval="3000" :duration="600">
			<swiper-item class="swiper-item" v-for="(banner, index) in bannerList" :key="index">
				<image class="image-advertise" :src="banner.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- <text>{{ testText }}</text> -->
	</view>
</template>

<script>
	import config from '../../../utils/config.js';
	export default {
		data() {
			return {
				swiperIndex: 0,
				// 菜单项
				menuItemLists: [{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/home_icon_implement.png',
						text: '实施'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/home_icon_maintenance.png',
						text: '维修'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/home_icon_survey.png',
						text: '勘测'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/home_icon_Renttohire.png',
						text: '租聘'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/home_icon_training.png',
						text: '培训'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/home_icon_personnel.png',
						text: '人员'
					}
				],
				// 菜单内容
				itemListList: [],
				bannerList: [],
				//
				testText: 'asd'
			};
		},
		onLoad(option) {
			// this.testText = JSON.stringify(option);
			console.log('启动页传参', option);
			if (option.contentMapId) {
				this.$http.post('/core/contentmapping/query', {
					id: option.contentMapId
				}).then(res => {
					const data = JSON.parse(res.content);
					uni.setStorage({
						key: config.storageKeys.inviteInfoStorage,
						data
					});
				});
			} else if (option.scene) {
				// scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
				const contentMapId = decodeURIComponent(option.scene)
				console.log('scene',contentMapId);
				
				this.$http.post('/core/contentmapping/query', {
					id: contentMapId
				}).then(res => {
					const data = JSON.parse(res.content);
					uni.setStorage({
						key: config.storageKeys.inviteInfoStorage,
						data
					});
				});
			}
		},
		onReady() {
			this.queryHomeItemData();
			this.queryBannerData();
		},
		onShow() {
			this.$store.dispatch('queryApproveDetail');
		},
		methods: {
			// 查询首页选项数据
			queryHomeItemData() {
				const param = {
					pageNum: 0,
					pageSize: 1000
				};
				this.$http.post('/b/homepageconf/queryList', param).then(res => {
					const dataList = res.dataList;
					const itemListList = [];
					itemListList.push(dataList.filter(m => m.module == 1));
					itemListList.push(dataList.filter(m => m.module == 2));
					itemListList.push(dataList.filter(m => m.module == 3));
					itemListList.push(dataList.filter(m => m.module == 4));
					itemListList.push(dataList.filter(m => m.module == 5));
					itemListList.push(dataList.filter(m => m.module == 6));
					this.itemListList = itemListList;
				});
			},
			// 查询首页banner数据
			queryBannerData() {
				this.$http.post('/b/bannerconf/queryList', {
					module: 1
				}).then(res => {
					this.bannerList = res;
				});
			},
			// 计算箭头的位置
			getArrowLeftDistance(index) {
				const distance = (100 / this.menuItemLists.length) * index + 100 / (this.menuItemLists.length * 2);
				return `${distance}%`;
			},
			// 切换菜单列表
			onMenuItem(index) {
				this.swiperIndex = index;
				if (this.swiperIndex > 1) {
					this.$tool.actionForLogin();
				}
			},
			// swiper 切换
			swiperChange(event) {
				this.swiperIndex = event.detail.current;
			},
			// item 点击事件
			onItemClick(item) {
				this.$tool.actionForLogin(() => {
					const user = this.$store.state.user;
					if (user.masterWorkFlag) {
						this.$tool.showToast('火速开发中，敬请期待');
					} else {
						let tipText = '下单功能内测中，请您稍等；接单方先完善信息，订单快马加鞭向您赶来！';
						let navUrl = '/pages/main/apply/apply';
						const approveDetail = this.$store.state.approveDetail;
						const approveState = approveDetail.approveState;
						switch (approveState) {
							case -1:
								tipText = '下单功能内测中，请您稍等；接单方先完善信息，订单快马加鞭向您赶来！';
								navUrl = '/pages/main/apply/apply';
								break;
							case 0:
								tipText = '审核中（一般1至3个工作日）请您等待，谢谢！';
								navUrl = '';
								break;
							case 1:
								tipText = '审核通过，你可以开始接单了！如要添加修改已申请信息，可以点修改后再提交';
								navUrl = '/pages/main/apply/apply';
								break;
							case 2:
								tipText = `审核被退回！有需要您修改的信息，请修改后再提交，谢谢！拒绝理由：${approveDetail.refusalReason}`;
								navUrl = '/pages/main/apply/apply';
								break;
						}
						this.$tool.showModal('提示', tipText, () => {
							if (navUrl) {
								uni.navigateTo({
									url: navUrl
								});
							}
						});
					}
					console.log('eee');
				});
			}
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
