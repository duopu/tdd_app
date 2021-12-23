<!-- 首页 -->
<template>
	<view>
		<!-- 搜索 -->
		<home-search v-model="searchVal" :message-num="messageCount" @message="toMessage" @change="change11" />

		<!-- 横向菜单 -->
		<view class="home-her">
			<view class="home-her-item" v-for="(item, index) in menuItemLists" :key="index" @click="onMenuItem(index)">
				<image :src="swiperIndex == index? item.selectImage :  item.image" class="home-her-image" />
				<view :class="['home-her-text', swiperIndex === index ? 'home-her-text-ac' : '']">{{ item.text }}</view>
				<view :class="['home-her-line', swiperIndex === index ? 'home-her-line-ac' : '']" />
			</view>

			<view class="home-her-end" />
		</view>

		<!-- 滚动 单个 -->
		<view class="home-single">
			<view class="home-item-box">
				<view class="home-item" v-for="(item, subIndex) in itemList" :key="subIndex">
					<image class="home-item-img" :src="item.icon" />
					<view class="home-item-text">{{ item.name }}</view>
				</view>
			</view>
			<view class="home-item-bottom"></view>
		</view>

		<view class="home-mnum">
			<view class="home-mnum1">
				<view class="home-mnum2">
					<view class="home-mnum4">
						<text class="home-mnum5">{{ oneItem.number || ''}}</text>
						<text class="home-mnum7">{{oneItem.unit || ''}}</text>
					</view>
					<view class="home-mnum6">{{oneItem.label || ''}}</view>
				</view>

				<view class="home-mnum3" />

				<view class="home-mnum2">
					<view class="home-mnum4">
						<text class="home-mnum5 home-mnum8">{{ twoItem.number  || ''}}</text>
						<text class="home-mnum7">{{twoItem.unit || ''}}</text>
					</view>
					<view class="home-mnum6">{{twoItem.label || ''}}</view>
				</view>
			</view>

			<view class="home-bo-line" />

			<view class="home-bo">
				<view class="home-bo1">
					<view class="home-bo2">
						<text class="home-bo3">{{ threeItem.number  || ''}}</text>
						<text class="home-bo4">{{threeItem.unit || ''}}</text>
					</view>
					<view class="home-bo5">{{threeItem.label || ''}}</view>
				</view>
				<view class="home-bo1-line" />
				<view class="home-bo1">
					<view class="home-bo2">
						<text class="home-bo3">{{ fourItem.number }}</text>
						<text class="home-bo4">{{fourItem.unit}}</text>
					</view>
					<view class="home-bo5">{{fourItem.label}}</view>
				</view>
				<view class="home-bo1-line" />
				<view class="home-bo1">
					<view class="home-bo2">
						<text class="home-bo3">{{ fiveItem.number  || ''}}</text>
						<text class="home-bo4">{{fiveItem.unit || ''}}</text>
					</view>
					<view class="home-bo5">{{fiveItem.label || ''}}</view>
				</view>
			</view>
		</view>

		<!-- 滚动 单个 -->
		<!--		<swiper class="swiper menu-content" :current="swiperIndex" @change="swiperChange">
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
        -->

		<!-- 广告 -->
		<swiper class="advertise-swiper" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#ffffff"
			:indicator-dots="true" :autoplay="true" :interval="3000" :duration="600">
			<swiper-item class="swiper-item" v-for="(banner, index) in bannerList" :key="index">
				<image class="image-advertise" :src="banner.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="advertise">
			<image class="image-advertise" @click="toInvite"
				src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/imageButtonList1.png"
				mode="aspectFill" />
			<image class="image-advertise" @click="toSign"
				src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/imageButtonList2.png"
				mode="aspectFill" />
		</view>
	</view>
</template>

<script>
	import config from '../../../utils/config.js';
	import HomeSearch from "./homeSearch";

	export default {
		components: {
			HomeSearch
		},
		data() {
			return {
				swiperIndex: 0,
				// 菜单项
				menuItemLists: [{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-0.svg',
						selectImage: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-1.svg',
						text: '实施'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-10.svg',
						selectImage: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-11.svg',
						text: '维修'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-4.svg',
						selectImage: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-5.svg',
						text: '勘测'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-4.svg',
						selectImage: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-5.svg',
						text: '租聘'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-6.svg',
						selectImage: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-7.svg',
						text: '培训'
					},
					{
						image: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-8.svg',
						selectImage: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/tab-icon/Frame-9.svg',
						text: '人员'
					}
				],
				// 菜单内容
				itemListList: [],
				imageButtonList: ['https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/home/imageButtonList1.png'],
				bannerList: [],
				searchVal: '',
				testText: 'asd',
				messageCount: 0,
				oneItem: {},
				twoItem: {},
				threeItem: {},
				fourItem: {},
				fiveItem: {},
			};
		},
		onLoad(option) {
			console.log('启动页传参', option);
			if (option.contentMapId) { // 分享小程序 打开获取的参数
				this.queryContentmapping(option.contentMapId)
			} else if (option.scene) { // 扫码打开小程序  获取的参数
				// scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
				const contentMapId = decodeURIComponent(option.scene)
				console.log('scene contentMapId', contentMapId);
				this.queryContentmapping(contentMapId)
			}
		},
		computed: {
			itemList() {
				return this.itemListList?. [this.swiperIndex]
			}
		},
		onShow() {
			this.refresh();
		},
		onPullDownRefresh() {
			this.refresh();
		},
		methods: {
			change11(data) {
				console.log('data', data);
			},
			refresh() {
				this.queryHomeItemData();
				this.queryBannerData();
				this.queryMessageCount();
				this.queryStatistics();
				this.$store.dispatch('queryApproveDetail');
				this.$store.dispatch('queryAuthenticationInfo');
			},
			// 查找映射数据
			queryContentmapping(contentMapId) {
				this.$http.post('/core/contentmapping/query', {
					id: contentMapId
				}).then(res => {
					const data = JSON.parse(res.content);
					uni.setStorage({
						key: config.storageKeys.inviteInfoStorage,
						data
					});
				});
			},
			// 查询首页选项数据
			queryHomeItemData() {
				const param = {
					pageNum: 0,
					pageSize: 1000
				};
				this.$http.post('/b/homepageconf/queryList', param, true).then(res => {
					uni.stopPullDownRefresh();
					const dataList = res.dataList;
					const itemListList = [];
					itemListList.push(dataList.filter(m => m.module == 1));
					itemListList.push(dataList.filter(m => m.module == 2));
					itemListList.push(dataList.filter(m => m.module == 3));
					itemListList.push(dataList.filter(m => m.module == 4));
					itemListList.push(dataList.filter(m => m.module == 5));
					itemListList.push(dataList.filter(m => m.module == 6));
					this.itemListList = itemListList;
				}).catch((e) => {
					uni.stopPullDownRefresh();
				})
			},
			// 查询首页banner数据
			queryBannerData() {
				this.$http.post('/b/bannerconf/queryList', {
					module: 1
				}).then(res => {
					this.bannerList = res;
				});
			},
			queryMessageCount() {
				this.$http.post('/core/sitemessage/unreadCount', {})
					.then(res => {
						this.messageCount = res;
					});
			},
			queryStatistics() {
				this.$http
					.get('/core/softconf/homePageData')
					.then((res) => {
						if (res.oneItem) this.oneItem = res.oneItem
						if (res.twoItem) this.twoItem = res.twoItem
						if (res.threeItem) this.threeItem = res.threeItem
						if (res.fourItem) this.fourItem = res.fourItem
						if (res.fiveItem) this.fiveItem = res.fiveItem
					})
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
						if (approveState != 1) {
							this.$tool.showModal('提示', tipText, () => {
								if (navUrl) {
									uni.navigateTo({
										url: navUrl
									});
								}
							});
						} else {
							uni.navigateTo({
								url: `/pages/place-order/placeOrder/placeOrder?orderType=${item.type}`,
							})
						}
					}
					console.log('eee');
				});
			},
			toMessage() {
				this.$tool.actionForLogin(() => {
					uni.navigateTo({
						url: '/pages/mine/messageList/messageList'
					})
				});
			},
			toInvite() {
				this.$tool.actionForLogin(() => {
					uni.navigateTo({
						url: '/pages/mine/invite/invite'
					})
				});
			},
			toSign() {
				this.$tool.actionForLogin(() => {
					uni.navigateTo({
						url: '/pages/mine/signIn/signIn'
					})
				});
			},
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>
<style lang="scss">
	@import "../../mine/addressManage/_pageStyle.scss";
</style>
